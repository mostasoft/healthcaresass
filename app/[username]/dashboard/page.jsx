import prisma from "@/lib/prisma";

export default async function DashboardPage({ params }) {
  const { username } = await params;

  // Fetch user from DB
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return <div className="text-red-600">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome, Dr. {user.username}</h2>
        <p className="text-gray-700 mb-2">Email: {user.email}</p>
        <p className="text-gray-700 mb-6">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-indigo-50 rounded-xl shadow">
            <h3 className="font-semibold text-indigo-700 mb-2">Your Appointments</h3>
            <p className="text-sm text-gray-600">Coming soon...</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl shadow">
            <h3 className="font-semibold text-green-700 mb-2">Earnings</h3>
            <p className="text-sm text-gray-600">You earned $0 this week.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
