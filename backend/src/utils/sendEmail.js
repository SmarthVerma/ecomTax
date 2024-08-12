import nodemailer from 'nodemailer'
import { asyncHandler } from './asyncHandler.js'

const sendEmail = async (options) => {


    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: "gmail",
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    })
    const mailOptions = {
        from: {
            name: "SammyPammy",
            address: process.env.SMPT_MAIL
        },
        to: options.email,
        subject: options.subject,
        html: `<div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-blue-600 text-white text-center">
            <h1 className="text-4xl font-bold">Welcome to Our Service!</h1>
        </div>
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Hello, ${options.name}!</h2>
            <p className="text-gray-700 mb-6 text-3xl">We are here to inform u that your passowrd token is generated</p>
            <p>${options.message}</p>
            <p className="text-gray-700 mb-6">If you have any questions, feel free to reach out to our support team at any time.</p>
            <div className="text-center">
                <a href="#" className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-500">Get Started</a>
            </div>
        </div>
        <div className="p-6 bg-gray-200 text-gray-700 text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>`,

    }

    try {
        const response = await transporter.sendMail(mailOptions)
        // console.log('my response to mail', response)
    } catch (error) {
        console.log('someError in tryCatch of mail', error)
        throw error
    }
}

export { sendEmail }