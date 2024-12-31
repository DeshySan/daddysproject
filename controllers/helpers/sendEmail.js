import nodemailer from "nodemailer";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import memberModel from "../../database/memberModel.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.host,
  port: process.env.port,
  secure: false,
  auth: {
    user: process.env.smtp_username,
    pass: process.env.password,
  },
});

export const sendConfirmationEmail = async (email, token) => {
  const confirmationUrl = `http://localhost:1234/api/v1/member/confirm-email?token=${token}`;
  const mailOptions = {
    //to be changed!! Remainder
    from: "ecomm@daddysecom.com.au",
    to: email,
    subject: "Email Confirmation",
    text: `Please click the following link to confirm your email address: ${confirmationUrl}`,
    html: `
         <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #FF9D3D;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              color:white;
            }
            .content {
              padding: 20px;
            }
            .cta-button {
              background-color: #4CAF50;
              color: white;
              padding: 15px 25px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin-top: 20px;
              padding:20px;
              border-radius:10px;
            }
            .footer {
              text-align: center;
              font-size: 14px;
              background-color: #FF9D3D;
              color:white;
              padding: 10px;
    
              border-radius: 0 0 8px 8px;
            }
            .footer a {
              color: white;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
       
              <h1>Email Confirmation</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>Thank you for signing up! Please click the button below to confirm your email address and activate your account.</p>
              <a href="${confirmationUrl}" class="cta-button">Confirm My Email</a>
              <p>If the button doesn't work, you can copy and paste the following link in your browser:</p>
              <p><a href="${confirmationUrl}">${confirmationUrl}</a></p>
            </div>
            <div class="footer">
              <p>Best regards,<br>Daddy's ecommerce</p>
              <p>If you didn't sign up, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Detailed error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error code:", error.code);
  }
};

export const confirmEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    const member = await memberModel.findOne({ email: decode.email });
    member.memberVerified = true;
    await member.save();

    res.status(200).send({ message: "Email has been confirmed" });
  } catch (error) {
    console.log(error);
  }
};
