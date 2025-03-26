// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";
// import cookie from "cookie";

// export async function POST(req) {
//     await connectDB();

//     try {
//         const { email, password } = await req.json();

//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ message: "User not found" }, { status: 404 });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1h",
//         });

//         // Set the JWT token as a cookie in the response
//         const response = NextResponse.json({ message: "Login successful", user }, { status: 200 });
        
//         // Setting the cookie with httpOnly and secure flags
//         response.cookies.set("token", token, {
//             httpOnly: true, // Prevents JavaScript from accessing the token
//             secure: process.env.NODE_ENV === "production", // Only set cookies over HTTPS in production
//             maxAge: 60 * 60, // 1 hour
//             path: "/", // Make the cookie available across the entire site
//         });

//         return response;
//     } catch (error) {
//         return NextResponse.json({ message: "Error logging in", error }, { status: 500 });
//     }
// }




import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(req) {
    await connectDB();  // Connect to MongoDB

    try {
        const { email, password } = await req.json();  // Get email and password from the request

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        // Generate a JWT token with the user ID
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Create the response object
        const response = NextResponse.json({ message: "Login successful", user }, { status: 200 });

        // Set the token as a cookie with security features
        response.cookies.set("token", token, {
            httpOnly: true,  // Prevent JavaScript from accessing the token
            secure: process.env.NODE_ENV === "production",  // Only over HTTPS in production
            maxAge: 60 * 60,  // 1 hour expiration
            path: "/",  // Cookie available across the entire site
        });

        return response;
    } catch (error) {
        // Handle error cases
        return NextResponse.json({ message: "Error logging in", error }, { status: 500 });
    }
}
