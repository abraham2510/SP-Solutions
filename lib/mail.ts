import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { SITE_CONTACTS } from "./constants";

export interface EnquiryEmailPayload {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message: string;
  inquiryType?: string | null;
}

/**
 * Creates and configures the Nodemailer transport from environment variables.
 * Returns null if SMTP credentials are missing.
 */
function getEmailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  let pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!user || !pass) {
    return null;
  }

  // Remove spaces if it's a 16-char Gmail app password formatted like "xxxx xxxx xxxx xxxx"
  if (pass.includes(" ") && pass.replace(/\s+/g, "").length === 16) {
    pass = pass.replace(/\s+/g, "");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
  });
}

/**
 * Returns the logo attachment if public/logo.png exists
 */
function getLogoAttachment() {
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    if (fs.existsSync(logoPath)) {
      return [
        {
          filename: "logo.png",
          path: logoPath,
          cid: "spsolutionslogo",
        },
      ];
    }
  } catch (err) {
    console.error("[Nodemailer] Could not resolve logo file:", err);
  }
  return [];
}

/**
 * Sends both Admin Notification and Customer Confirmation emails on inquiry submission.
 */
export async function sendEnquiryNotificationEmails(enquiry: EnquiryEmailPayload): Promise<{
  adminSent: boolean;
  customerSent: boolean;
  error?: string;
}> {
  const transporter = getEmailTransporter();
  const refCode = enquiry.id.slice(-6).toUpperCase();
  const inquiryType = enquiry.inquiryType || "General Inquiry";

  if (!transporter) {
    console.warn(
      "[Nodemailer] SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) not found in environment variables. Email notification skipped."
    );
    return { adminSent: false, customerSent: false, error: "SMTP not configured" };
  }

  const senderEmail = (process.env.SMTP_USER || "abrahambillclinton@gmail.com").trim();
  const senderFrom = {
    name: "SP Solutions",
    address: senderEmail,
  };

  const adminEmail = (
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    SITE_CONTACTS.email.primary
  ).trim();

  const attachments = getLogoAttachment();
  const logoSrc = attachments.length > 0 ? "cid:spsolutionslogo" : "";

  let adminSent = false;
  let customerSent = false;

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. ADMIN NOTIFICATION EMAIL (To Receiver / Sales & Technical Desk)
  // ─────────────────────────────────────────────────────────────────────────────
  try {
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Inquiry Notification</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1E293B; background-color: #F1F5F9; margin: 0; padding: 0; }
          .wrapper { width: 100%; padding: 32px 16px; background-color: #F1F5F9; }
          .container { max-width: 620px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 14px rgba(0, 38, 106, 0.06); }
          .brand-header { background: #FFFFFF; padding: 24px 32px; border-bottom: 3px solid #00266A; text-align: center; }
          .brand-logo { max-height: 52px; width: auto; display: inline-block; }
          .brand-sub { font-size: 11px; font-weight: 700; color: #00266A; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 8px; }
          .banner { background: #00266A; color: #FFFFFF; padding: 18px 32px; }
          .banner-title { font-size: 17px; font-weight: 700; margin: 0 0 4px 0; color: #FFFFFF; letter-spacing: -0.01em; }
          .banner-meta { font-size: 12.5px; color: #D5BD66; margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
          .content { padding: 32px; }
          .badge-row { margin-bottom: 24px; }
          .badge { display: inline-block; padding: 5px 12px; background: #F8FAFC; border: 1px solid #CBD5E1; color: #00266A; border-radius: 6px; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-right: 6px; }
          .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748B; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #E2E8F0; }
          .data-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
          .data-table tr { border-bottom: 1px solid #F1F5F9; }
          .data-table tr:last-child { border-bottom: none; }
          .data-table td { padding: 10px 0; font-size: 13.5px; vertical-align: top; }
          .data-table .label { width: 140px; font-weight: 600; color: #64748B; }
          .data-table .value { color: #0F172A; font-weight: 500; }
          .msg-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #00266A; border-radius: 6px; padding: 18px; margin-bottom: 28px; }
          .msg-body { font-size: 13.5px; color: #334155; white-space: pre-wrap; line-height: 1.6; margin: 0; }
          .btn-container { text-align: center; padding-top: 8px; border-top: 1px solid #E2E8F0; }
          .btn { display: inline-block; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-size: 13px; font-weight: 700; margin: 6px 4px; text-align: center; }
          .btn-primary { background: #00266A; color: #FFFFFF !important; border: 1px solid #00266A; }
          .btn-whatsapp { background: #128C7E; color: #FFFFFF !important; border: 1px solid #075E54; }
          .footer { background: #F8FAFC; padding: 20px 32px; text-align: center; font-size: 11.5px; color: #64748B; border-top: 1px solid #E2E8F0; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <!-- Brand Header with Logo -->
            <div class="brand-header">
              ${
                logoSrc
                  ? `<img src="${logoSrc}" alt="SP Solutions Logo" class="brand-logo" />`
                  : `<h2 style="margin:0; color:#00266A; font-size:22px; font-weight:800;">SP SOLUTIONS</h2>`
              }
              <div class="brand-sub">Industrial Packaging Machinery &amp; Automation Systems</div>
            </div>

            <!-- Banner -->
            <div class="banner">
              <div class="banner-title">New Client Inquiry Received</div>
              <div class="banner-meta">Inquiry Reference: #${refCode} &bull; ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
            </div>

            <!-- Content Area -->
            <div class="content">
              <div class="badge-row">
                <span class="badge">Type: ${inquiryType}</span>
                <span class="badge">Status: Pending Review</span>
                <span class="badge">Desk: Chennai</span>
              </div>

              <div class="section-title">Client Contact Details</div>
              <table class="data-table">
                <tr>
                  <td class="label">Full Name:</td>
                  <td class="value"><strong>${enquiry.name}</strong></td>
                </tr>
                <tr>
                  <td class="label">Email Address:</td>
                  <td class="value"><a href="mailto:${enquiry.email}" style="color: #00266A; text-decoration: underline; font-weight: 600;">${enquiry.email}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone / WhatsApp:</td>
                  <td class="value"><strong>${enquiry.phone || "Not provided"}</strong></td>
                </tr>
                <tr>
                  <td class="label">Company / Entity:</td>
                  <td class="value">${enquiry.company || "Individual / Not specified"}</td>
                </tr>
                <tr>
                  <td class="label">Inquiry Category:</td>
                  <td class="value"><strong>${inquiryType}</strong></td>
                </tr>
                ${
                  enquiry.subject
                    ? `<tr><td class="label">Subject:</td><td class="value">${enquiry.subject}</td></tr>`
                    : ""
                }
              </table>

              <div class="section-title">Inquiry Specifications &amp; Requirements</div>
              <div class="msg-card">
                <p class="msg-body">${enquiry.message}</p>
              </div>

              <!-- Action Links -->
              <div class="btn-container">
                <a href="mailto:${enquiry.email}?subject=RE: SP Solutions Inquiry Ref %23${refCode}" class="btn btn-primary">
                  Reply via Email
                </a>
                ${
                  enquiry.phone
                    ? `<a href="https://wa.me/${enquiry.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                        enquiry.name
                      )},%20thank%20you%20for%20contacting%20SP%20Solutions%20regarding%20${encodeURIComponent(
                        inquiryType
                      )}%20(Ref%20%23${refCode})." target="_blank" class="btn btn-whatsapp">
                        Open WhatsApp Chat
                      </a>`
                    : ""
                }
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              This is an automated notification generated by the SP Solutions Client Portal.<br>
              SP Solutions &bull; ${SITE_CONTACTS.address.singleLine}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: senderFrom,
      to: adminEmail,
      subject: `[SP Solutions] New Inquiry - ${enquiry.name} (${enquiry.company || "Individual"}) - Ref #${refCode}`,
      html: adminHtml,
      replyTo: enquiry.email,
      attachments,
    });
    adminSent = true;
  } catch (adminErr) {
    console.error("[Nodemailer] Failed to send admin notification email:", adminErr);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. CUSTOMER CONFIRMATION EMAIL (To Sender / Inquirer)
  // ─────────────────────────────────────────────────────────────────────────────
  try {
    const customerHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Inquiry Confirmation</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1E293B; background-color: #F1F5F9; margin: 0; padding: 0; }
          .wrapper { width: 100%; padding: 32px 16px; background-color: #F1F5F9; }
          .container { max-width: 620px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 14px rgba(0, 38, 106, 0.06); }
          .brand-header { background: #FFFFFF; padding: 24px 32px; border-bottom: 3px solid #00266A; text-align: center; }
          .brand-logo { max-height: 52px; width: auto; display: inline-block; }
          .brand-sub { font-size: 11px; font-weight: 700; color: #00266A; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 8px; }
          .banner { background: #00266A; color: #FFFFFF; padding: 20px 32px; text-align: center; }
          .banner-title { font-size: 18px; font-weight: 700; margin: 0 0 4px 0; color: #FFFFFF; letter-spacing: -0.01em; }
          .banner-meta { font-size: 12.5px; color: #D5BD66; margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
          .content { padding: 32px; }
          .greeting { font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 12px; }
          .body-text { font-size: 13.5px; color: #475569; margin-bottom: 22px; line-height: 1.65; }
          .summary-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px; }
          .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #EDF2F7; }
          .summary-row:last-child { border-bottom: none; }
          .summary-label { color: #64748B; font-weight: 600; }
          .summary-val { color: #0F172A; font-weight: 700; text-align: right; }
          .contacts-card { background: #00266A; color: #FFFFFF; border-radius: 8px; padding: 22px 24px; text-align: center; margin-bottom: 24px; }
          .contacts-card h4 { margin: 0 0 10px 0; color: #D5BD66; font-size: 12.5px; text-transform: uppercase; letter-spacing: 0.08em; }
          .contacts-card p { margin: 6px 0; font-size: 13px; color: #F1F5F9; }
          .contacts-card a { color: #FFFFFF; font-weight: 700; text-decoration: underline; }
          .footer { background: #F8FAFC; padding: 22px 32px; text-align: center; font-size: 11.5px; color: #64748B; border-top: 1px solid #E2E8F0; line-height: 1.55; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <!-- Brand Header with Logo -->
            <div class="brand-header">
              ${
                logoSrc
                  ? `<img src="${logoSrc}" alt="SP Solutions Logo" class="brand-logo" />`
                  : `<h2 style="margin:0; color:#00266A; font-size:22px; font-weight:800;">SP SOLUTIONS</h2>`
              }
              <div class="brand-sub">Industrial Packaging Machinery &amp; Automation Systems</div>
            </div>

            <!-- Banner -->
            <div class="banner">
              <div class="banner-title">Inquiry Acknowledgment</div>
              <div class="banner-meta">Reference Code: #${refCode}</div>
            </div>

            <!-- Body Content -->
            <div class="content">
              <div class="greeting">Dear ${enquiry.name},</div>
              <p class="body-text">
                Thank you for contacting <strong>SP Solutions</strong>. We have successfully registered your inquiry regarding <strong>${inquiryType}</strong>. Our Chennai sales and engineering team is reviewing your requirements.
              </p>
              <p class="body-text">
                Our application engineer will contact you with machine specifications, layout options, or commercial pricing within <strong>2 business hours</strong>.
              </p>

              <!-- Summary Card -->
              <div class="summary-card">
                <div class="summary-row">
                  <span class="summary-label">Reference ID:</span>
                  <span class="summary-val" style="color:#00266A;">#${refCode}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Category:</span>
                  <span class="summary-val">${inquiryType}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Submission Date:</span>
                  <span class="summary-val">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Assigned Division:</span>
                  <span class="summary-val">Chennai Technical Operations</span>
                </div>
              </div>

              <!-- Corporate Direct Contacts -->
              <div class="contacts-card">
                <h4>Direct Technical Desk</h4>
                <p>Telephone: <a href="${SITE_CONTACTS.phone.primary.tel}">${SITE_CONTACTS.phone.primary.display}</a></p>
                <p>WhatsApp: <a href="${SITE_CONTACTS.whatsapp.getUrl(`Hi SP Solutions, following up on inquiry Ref #${refCode}`)}">${SITE_CONTACTS.whatsapp.display}</a></p>
                <p>Email: <a href="${SITE_CONTACTS.email.mailto}">${SITE_CONTACTS.email.primary}</a></p>
                <p style="font-size: 12px; color: #CBD5E1; margin-top: 8px;">Facility: ${SITE_CONTACTS.address.singleLine}</p>
              </div>
            </div>

            <!-- Corporate Footer -->
            <div class="footer">
              &copy; ${new Date().getFullYear()} SP Solutions. All rights reserved.<br>
              Manufacturer and supplier of Form-Fill-Seal, Pouch Packing, Carton Wrapping &amp; Custom Industrial Automation Lines.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: senderFrom,
      to: enquiry.email,
      subject: `SP Solutions - Inquiry Confirmation [Ref #${refCode}]`,
      html: customerHtml,
      replyTo: adminEmail,
      attachments,
    });
    customerSent = true;
  } catch (custErr) {
    console.error("[Nodemailer] Failed to send customer confirmation email:", custErr);
  }

  return { adminSent, customerSent };
}
