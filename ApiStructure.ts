import { error } from "console"
import { create } from "domain"
import { access } from "fs"
import { Server } from "http"
import { Copy, User } from "lucide-react"
import { NextResponse } from "next/server"
import { json } from "stream/consumers"
import { types } from "util"
import errors from "./lib/handlers/errors"

// Step 1: Basic Error Handling
// Example Without Custom Classes or Functions
// typescript
// Copy code
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email) {
      throw new Error("Email is required");
    }
    if (!body.username) {
      throw new Error("Username is required");
    }

    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = await User.create(body);
    return new Response(JSON.stringify({ success: true, data: newUser }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: { message: error.message } }),
      { status: 500 }
    );
  }
}
Output:
If email is missing:

json
Copy code
{
  "success": false,
  "error": {
    "message": "Email is required"
  }
}
If a user already exists:

json
Copy code
{
  "success": false,
  "error": {
    "message": "User already exists"
  }
}
Problem with this Approach:
Redundancy: Error handling logic is repeated across APIs.
No Categorization: All errors result in 500 Internal Server Error, even for validation issues.
Hard to Extend: Adding more error types or standardized messages becomes tedious.
Step 2: Introduce Custom Error Classes
We create reusable error classes to handle specific types of errors like validation, not found, or unauthorized access.

ValidationError Example
typescript
Copy code
class ValidationError extends Error {
  statusCode: number;
  fieldErrors: Record<string, string[]>;

  constructor(fieldErrors: Record<string, string[]>) {
    super("Validation Error");
    this.statusCode = 400; // Bad Request
    this.fieldErrors = fieldErrors;
  }
}

// Usage
try {
  throw new ValidationError({ email: ["Email is required"] });
} catch (error) {
  console.log(error.message); // Validation Error
  console.log(error.statusCode); // 400
  console.log(error.fieldErrors); // { email: ["Email is required"] }
}
Output (Dry Run):
json
Copy code
{
  "success": false,
  "error": {
    "message": "Validation Error",
    "details": {
      "email": ["Email is required"]
    }
  }
}
Step 3: Create a Unified Error Handler
We extract repetitive error response generation into a single function.

Unified Error Handling Function
typescript
Copy code
const handleError = (error: unknown) => {
  if (error instanceof ValidationError) {
    return {
      status: error.statusCode,
      success: false,
      error: { message: error.message, details: error.fieldErrors },
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      success: false,
      error: { message: error.message },
    };
  }

  return {
    status: 500,
    success: false,
    error: { message: "Unknown error occurred" },
  };
};

// Usage
try {
  throw new ValidationError({ email: ["Email is required"] });
} catch (error) {
  console.log(handleError(error));
}
Output:
json
Copy code
{
  "status": 400,
  "success": false,
  "error": {
    "message": "Validation Error",
    "details": {
      "email": ["Email is required"]
    }
  }
}
Step 4: Add More Error Classes
We can extend this pattern for different error types.

ForbiddenError Example
typescript
Copy code
class ForbiddenError extends Error {
  statusCode: number;

  constructor(message = "Forbidden") {
    super(message);
    this.statusCode = 403; // Forbidden
  }
}

// Usage
try {
  throw new ForbiddenError();
} catch (error) {
  console.log(handleError(error));
}
Output:
json
Copy code
{
  "status": 403,
  "success": false,
  "error": {
    "message": "Forbidden"
  }
}
Step 5: Apply to the API
Let’s refactor the POST method to use these classes and the unified error handler.

Refactored POST Method
typescript
Copy code
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation
    const errors: Record<string, string[]> = {};
    if (!body.email) errors.email = ["Email is required"];
    if (!body.username) errors.username = ["Username is required"];

    if (Object.keys(errors).length > 0) {
      throw new ValidationError(errors);
    }

    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      throw new ForbiddenError("User already exists");
    }

    const newUser = await User.create(body);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(handleError(error));
  }
}
Final Output Examples
Validation Error: Input:

json
Copy code
{}
Output:

json
Copy code
{
  "status": 400,
  "success": false,
  "error": {
    "message": "Validation Error",
    "details": {
      "email": ["Email is required"],
      "username": ["Username is required"]
    }
  }
}
Forbidden Error: Input:

json
Copy code
{
  "email": "test@example.com",
  "username": "testuser"
}
If the user already exists:

json
Copy code
{
  "status": 403,
  "success": false,
  "error": {
    "message": "User already exists"
  }
}
Unexpected Error: If some unexpected issue occurs:

json
Copy code
{
  "status": 500,
  "success": false,
  "error": {
    "message": "Internal Server Error"
  }
}
Advantages of This Approach
Reusability: Classes and the error handler can be reused across the application.
Consistency: All APIs return standardized error responses.
Extendability: You can easily add new error types by creating additional classes.
Readability: Clear and declarative error handling.
