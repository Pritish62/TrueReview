import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcrypt"
import {sendVerificationEmails} from "@/helper/sendVerificationEmail"


async function POST(request:Request) {
    await dbConnect()
    try {
        const {username, email, password} = await request.json()
    } catch (error) {
        console.error("Error registering User", error);
        return Response.json(
            {
                success: false,
                message: "Error registring user"
            },
            {
                status: 500
            }
        )
    }
}