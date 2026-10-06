import nodemailer from 'nodemailer';
import User from "@/models/user.model";
import bcryptjs from 'bcryptjs';

interface SendEmailParams {
    email: string;
    emailType: "VERIFY" | "RESET" | "FORGOT" | "FORGOT_PASSWORD" | string;
    userId?: string | { toString(): string };
}

interface ForgotPasswordEmailParams {
    email: string;
    userId?: string | { toString(): string };
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
    try {
        let targetUserId = userId;
        if (!targetUserId && email) {
            const user = await User.findOne({ email });
            if (user) {
                targetUserId = user._id;
            }
        }

        if (!targetUserId) {
            throw new Error("User not found or userId not provided");
        }

        // create a hashed token
        const hashedToken = await bcryptjs.hash(targetUserId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(targetUserId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET" || emailType === "FORGOT" || emailType === "FORGOT_PASSWORD") {
            await User.findByIdAndUpdate(targetUserId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "0682f09451001c",
                pass: "f1ed21759f4aa4",
            },
        });

        const isVerify = emailType === "VERIFY";
        const actionPath = isVerify ? "verifyemail" : "resetpassword";
        const actionText = isVerify ? "verify your email" : "reset your password";
        const subject = isVerify ? "Verify your email" : "Reset your password";
        const actionUrl = `${process.env.DOMAIN}/${actionPath}?token=${hashedToken}`;

        const mailOptions = {
            from: 'abdullah@gmail.com',
            to: email,
            subject: subject,
            html: `<p>Click <a href="${actionUrl}">here</a> to ${actionText}
            or copy and paste the link below in your browser. <br> ${actionUrl}
            </p>`,
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred while sending email");
    }
};

// Dedicated method for sending forgot/reset password email
export const sendForgotPasswordEmail = async ({ email, userId }: ForgotPasswordEmailParams) => {
    return await sendEmail({ email, emailType: "RESET", userId });
};

// Aliases for convenience
export const forgotPassword = sendForgotPasswordEmail;
export const sendResetPasswordEmail = sendForgotPasswordEmail;