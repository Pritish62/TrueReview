import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmails(
    email: string,
    username: string,
    verifyCode: string,

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'TrueReview | verification code ',
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        return { success: true, message: "Verification email send succesfully" }
    }
    catch (emailError) {
        console.error("error sending verification email");
        return { success: false, message: "failed to send verification email" }
    }
}