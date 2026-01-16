import z from "zod";


export  const messageSchema = z.object({
    content: z
    .string()
    .min(10, {message: "minimum message size is 10 character"})
    .max(310, {message: "maximum message size is 300 character"})

})