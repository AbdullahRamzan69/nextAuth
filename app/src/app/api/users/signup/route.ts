import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Please provide username, email, and password" },
                { status: 400 }
            );
        }

        // checking if user exists already
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            const isEmail = existingUser.email === email;
            return NextResponse.json(
                { error: isEmail ? "User with this email already exists" : "Username is already taken" },
                { status: 400 }
            );
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const sanitizedUser = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            isVerified: savedUser.isVerified,
            isAdmin: savedUser.isAdmin,
        };

        // send verification email
        try {
            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        } catch (emailError) {
            console.error("Verification email failed to send:", emailError);
            return NextResponse.json(
                {
                    message: "User created successfully, but failed to send verification email.",
                    success: true,
                    savedUser: sanitizedUser,
                    user: sanitizedUser,
                    emailError: emailError instanceof Error ? emailError.message : "Email error",
                },
                { status: 201 }
            );
        }

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                savedUser: sanitizedUser,
                user: sanitizedUser,
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        console.error("Signup API error:", error);
        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : "Something went wrong in signup",
            },
            {
                status: 500,
            }
        );
    }
}
