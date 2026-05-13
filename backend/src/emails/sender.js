const { Resend } = require('resend')

const resend    = new Resend(process.env.RESEND_API_KEY)
const TEAM_EMAIL = process.env.TEAM_EMAIL || 'hello@stafforaglobal.com'
const FROM_EMAIL = 'Staffora Global <onboarding@resend.dev>'

// ── Contact Form ─────────────────────────────────────────────

// Notify Staffora team
async function sendContactNotification({ name, email, phone, company, inquiryType, message }) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    subject: `New Inquiry: ${inquiryType} from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table>
        <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone || 'Not provided'}</td></tr>
        <tr><td><strong>Company:</strong></td><td>${company || 'Not provided'}</td></tr>
        <tr><td><strong>Inquiry Type:</strong></td><td>${inquiryType}</td></tr>
      </table>
      <h3>Message:</h3>
      <p>${message}</p>
    `
  })
}

// Confirm to user
async function sendContactConfirmation({ name, email }) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'We received your inquiry — Staffora Global',
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for reaching out to Staffora Global.</p>
      <p>We have received your inquiry and will get back to you within <strong>24 hours</strong>.</p>
      <p>In the meantime, you can explore our services at stafforaglobal.com.</p>
      <br/>
      <p>Best regards,<br/>Staffora Global Team</p>
    `
  })
}

// ── HR Health Check ──────────────────────────────────────────

async function sendHealthCheckReport({ name, email, overallScore, hiringScore, onboardingScore, performanceScore, retentionScore, hrSetupScore, recommendation }) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Your HR Health Check Report — Score: ${overallScore}/100`,
    html: `
      <h2>Hi ${name}, here is your HR Health Check Report</h2>
      <h3>Overall Score: ${overallScore}/100</h3>
      <table border="1" cellpadding="8">
        <tr><th>Category</th><th>Score</th></tr>
        <tr><td>HR Setup</td><td>${hrSetupScore}%</td></tr>
        <tr><td>Hiring</td><td>${hiringScore}%</td></tr>
        <tr><td>Onboarding</td><td>${onboardingScore}%</td></tr>
        <tr><td>Performance</td><td>${performanceScore}%</td></tr>
        <tr><td>Retention</td><td>${retentionScore}%</td></tr>
      </table>
      <h3>Our Recommendation:</h3>
      <p>${recommendation}</p>
      <br/>
      <p>Ready to take action? <a href="https://stafforaglobal.com/contact">Book a free diagnostic call</a></p>
      <br/>
      <p>Best regards,<br/>Staffora Global Team</p>
    `
  })
}

// ── Job Applications ─────────────────────────────────────────

// Notify team
async function sendApplicationNotification({ name, email, phone, jobTitle, cvUrl, coverNote }) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    subject: `New Application: ${jobTitle} from ${name}`,
    html: `
      <h2>New Job Application</h2>
      <table>
        <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone || 'Not provided'}</td></tr>
        <tr><td><strong>Position:</strong></td><td>${jobTitle}</td></tr>
        <tr><td><strong>CV:</strong></td><td>${cvUrl ? `<a href="${cvUrl}">Download CV</a>` : 'Not uploaded'}</td></tr>
      </table>
      ${coverNote ? `<h3>Cover Note:</h3><p>${coverNote}</p>` : ''}
    `
  })
}

// Confirm to applicant
async function sendApplicationConfirmation({ name, email, jobTitle }) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Application Received — ${jobTitle}`,
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Staffora Global.</p>
      <p>We have received your application and will review it carefully. If your profile matches our requirements, we will reach out within <strong>5-7 business days</strong>.</p>
      <br/>
      <p>Best regards,<br/>Staffora Global Team</p>
    `
  })
}

module.exports = {
  sendContactNotification,
  sendContactConfirmation,
  sendHealthCheckReport,
  sendApplicationNotification,
  sendApplicationConfirmation,
}
