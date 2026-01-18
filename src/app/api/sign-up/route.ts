import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcrypt"
import { sendVerificationEmails } from "@/helper/sendVerificationEmail"
import { success } from "zod";


async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await request.json()


        const existingUserVerifiedByUsername = await UserModel.findOne({
            username, isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already Taken"
            }, {
                status: 400
            })
        }

        const existingUserByEmail = await UserModel.findOne({ email })

        const verifyCode = Math.floor(100000 + Math.random() * 90000).toString()

        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "user already exist with this email"
                }, {status: 400})
            } else{
                const hashedPassward = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassward,
                existingUserByEmail.email = email,
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000),
                existingUserByEmail.save();
            }
        } else {
            const hashedPassward = await bcrypt.hash(password, 10)

            const expiryDate = new Date()

            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassward,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMassage: false,
                massages: [],

            })

            await newUser.save();


            const responseEmail = await sendVerificationEmails(
                email,
                username,
                verifyCode,
            )

            if (!responseEmail.success) {
                return Response.json({
                    success: false,
                    message: responseEmail.message
                }, { status: 500 })
            }

        }
        return Response.json(
            {
                success: true,
                message: "User is registred is successfully"
            },
            {
                status: 500
            }
        )
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