import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const user = await prisma.user.create({
      data: { name: "Test", email: "test@example.com" }
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
