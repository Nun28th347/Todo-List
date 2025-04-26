import User from '../../../../models/User';
import { mongooseConnect } from '../../../../lib/mongoose';

export async function POST(req) {
  await mongooseConnect();
  const { username, password } = await req.json();

  // เช็กว่ามี user นี้อยู่แล้วมั้ย
  const exists = await User.findOne({ username });
  if (exists) {
    return new Response('Username already taken', { status: 400 });
  }

  const newUser = new User({ username, password });
  await newUser.save();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}