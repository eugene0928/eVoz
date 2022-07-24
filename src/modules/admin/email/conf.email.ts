import nodeMailer from "nodemailer";

export const conf = async() => {
    try {
        const transporter = await nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "umid09tuxtayev@gmail.com", // generated ethereal user
                pass: process.env.E_PASS, // generated ethereal password
            },
        });
        return transporter;
    } catch(error: any) {
        throw error
    }
}