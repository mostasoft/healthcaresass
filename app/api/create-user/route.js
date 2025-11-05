import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { username } = await req.json();

    if (!username) {
      return new Response(JSON.stringify({ error: "Username required" }), {
        status: 400,
      });
    }

    // Check if username already exists
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      return new Response(JSON.stringify({ error: "Username already exists" }), {
        status: 400,
      });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        email: `${username}@test.com`,
        password: "defaultpassword123",
      },
    });

    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (error) {
    console.error("API create-user error:", error); // ✅ logs to Vercel
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
