import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"


export const sendWelcomeEmail = async (name, email, clientUrl) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Konvo!",
        html: createWelcomeEmailTemplate(name, clientUrl)
    })
    if (error) {
        console.log("Error sending email:", error)
        throw new Error("Failed to send welcome email")
    }
    console.log("Welcome email sent successfully", data)
}