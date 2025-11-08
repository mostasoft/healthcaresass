import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function UserPage({ params }) {
  // ✅ Unwrap the params promise
  const { username } = await params;

  if (!username) {
    return <div className="text-red-600">No username provided</div>;
  }

  // ✅ Fetch user from DB
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return <div className="text-red-600">User not found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">Welcome dr {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Subdomain: {user.username}.localhost:3000</p>
      <Link
        href="/dashboard"
        className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
