import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json(
                { error: "Please provide an email" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        await sendEmail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true,
        });

    } catch (error: unknown) {
        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : "Something went wrong sending reset email",
            },
            {
                status: 500,
            }
        );
    }
}
