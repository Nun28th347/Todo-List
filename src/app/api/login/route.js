import User from '../../../../models/User';
import { mongooseConnect } from '../../../../lib/mongoose';

export async function POST(req) {
  await mongooseConnect();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return new Response('Invalid credentials', { status: 401 });
  }

  return new Response(JSON.stringify({
    success: true,
    userId: user._id
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}