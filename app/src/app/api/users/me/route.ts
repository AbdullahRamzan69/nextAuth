import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";

export async function GET(request: NextRequest) {
    try {
        await connect();

        const userId = getTokenData(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "User found",
            data: user,
            success: true,
        });

    } catch (error: unknown) {
        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : "Something went wrong fetching user profile",
            },
            {
                status: 400,
            }
        );
    }
}

export async function POST(request: NextRequest) {
    return GET(request);
}
