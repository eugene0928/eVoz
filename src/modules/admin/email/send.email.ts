import { conf } from "./conf.email.js";

export const sendEmail = async (email: string, passw: string) => {
    try {
        const transporter = await conf()

        await transporter.sendMail({
            to: email,
            subject: "Noreply",
            html: `This is your code. Use it to change your credentials: <b>${passw}</b>`
        })
    } catch (error: any) {
        throw error
    }
}