import mongoose, { Schema, Document } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface Massage extends Document {
    content: string;
    createdAt: Date;
}

const massageSchema: Schema<Massage> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    passward: string;
    verifyCode: string;
    isVerified: boolean;
    verifyCodeExpiry: Date;
    isAcceptingMassage: boolean;
    massages: Massage[];
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/.+@.+\..+/, "please enter valid email"]
    },
    passward: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    verifyCode: {
        required: [true, "verify code is required"],
    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, "verify code expirey is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMassage: {
        type: Boolean,
        default: true,
    },
    massages: [massageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;