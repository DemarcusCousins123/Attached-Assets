import nodemailer from "nodemailer";

// Create email transporter - using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendContactEmail(
  name: string,
  email: string,
  phone: string | undefined,
  subject: string,
  message: string
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn(
      "Email credentials not configured. Skipping email send. Set EMAIL_USER and EMAIL_PASSWORD environment variables."
    );
    return { success: false, error: "Email not configured" };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "carconnectsnj@gmail.com",
      subject: `New Contact from ${name}: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: String(error) };
  }
}
