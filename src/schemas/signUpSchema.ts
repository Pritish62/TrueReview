import {email, z} from "zod"

export const userNameValidation = z
.string()
.min(2, "usernamer must be atleast 2 character")
.max(20, "username must be no more then 20 character")
.regex(/^[a-zA-Z0-9]+$/, "Username Must not contain special charcters")

export const signUpValidation = z.object({
    username : userNameValidation,
    email: z.string().email({message: "invalide email address"}),
    password: z.string().min(6, {message: "password must be minimum 6 characters"})
})