import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="min-h-screen">
      <h1>this is a heading</h1>
    </div>
  );
}
