// // pages/api/auth/signup/route.js
// import dbConnect from '@/lib/mongodb';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';

// export async function POST(req) {
//   await dbConnect();

//   const { name, email, password } = await req.json();
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const user = await User.create({ name, email, password: hashedPassword });
//     return new Response(JSON.stringify({ message: 'User created', user }), { status: 201 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
//   }
// }
import dbConnect from '@/lib/mongodb';  // MongoDB connection utility
import User from '@/models/User';        // User model
import bcrypt from 'bcryptjs';           // bcrypt for hashing passwords

export async function POST(req) {
  await dbConnect();  // Ensure the database connection

  const { name, email, password } = await req.json();  // Get the user data from the request

  const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

  try {
    // Create a new user with the provided details
    const user = await User.create({ name, email, password: hashedPassword });
    return new Response(
      JSON.stringify({ message: 'User created', user }),
      { status: 201 }
    );
  } catch (error) {
    // If the user already exists or an error occurs, return an error response
    return new Response(
      JSON.stringify({ error: 'User already exists' }),
      { status: 400 }
    );
  }
}
