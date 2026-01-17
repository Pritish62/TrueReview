import { Massage } from "@/models/User";   

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean
    massages?: Array<Massage>
}