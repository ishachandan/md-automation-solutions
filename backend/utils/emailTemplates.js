// Email HTML templates

exports.enquiryConfirmationEmail = (enquiry) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 30px; }
        .info-row { margin: 15px 0; }
        .label { font-weight: bold; color: #1e40af; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; padding: 12px 30px; background: #1e40af; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Enquiry Received</h1>
        </div>
        <div class="content">
          <p>Dear ${enquiry.contactPerson},</p>
          <p>Thank you for your enquiry. We have received your request and our team will review it shortly.</p>
          
          <div class="info-row">
            <span class="label">Enquiry ID:</span> ${enquiry.enquiryId}
          </div>
          <div class="info-row">
            <span class="label">Company:</span> ${enquiry.companyName}
          </div>
          <div class="info-row">
            <span class="label">Industry:</span> ${enquiry.industry}
          </div>
          <div class="info-row">
            <span class="label">Project Type:</span> ${enquiry.projectType}
          </div>
          
          <p>You can track your enquiry status using the Enquiry ID provided above.</p>
          
          <a href="${process.env.FRONTEND_URL}/dashboard" class="button">View My Enquiries</a>
          
          <p>We will get back to you within 24-48 hours.</p>
          
          <p>Best regards,<br>Automation Solutions Team</p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

exports.enquiryNotificationEmail = (enquiry) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 30px; }
        .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 3px solid #dc2626; }
        .label { font-weight: bold; color: #dc2626; display: block; margin-bottom: 5px; }
        .button { display: inline-block; padding: 12px 30px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Enquiry Received</h1>
        </div>
        <div class="content">
          <p><strong>A new enquiry has been submitted and requires your attention.</strong></p>
          
          <div class="info-row">
            <span class="label">Enquiry ID:</span>
            ${enquiry.enquiryId}
          </div>
          <div class="info-row">
            <span class="label">Company:</span>
            ${enquiry.companyName}
          </div>
          <div class="info-row">
            <span class="label">Contact Person:</span>
            ${enquiry.contactPerson}
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            ${enquiry.email}
          </div>
          <div class="info-row">
            <span class="label">Phone:</span>
            ${enquiry.phone}
          </div>
          <div class="info-row">
            <span class="label">Industry:</span>
            ${enquiry.industry}
          </div>
          <div class="info-row">
            <span class="label">Project Type:</span>
            ${enquiry.projectType}
          </div>
          <div class="info-row">
            <span class="label">Budget Range:</span>
            ${enquiry.budgetRange || 'Not specified'}
          </div>
          <div class="info-row">
            <span class="label">Timeline:</span>
            ${enquiry.timeline || 'Not specified'}
          </div>
          <div class="info-row">
            <span class="label">Requirements:</span>
            ${enquiry.requirements}
          </div>
          
          <a href="${process.env.FRONTEND_URL}/admin/enquiries/${enquiry._id}" class="button">View in Admin Panel</a>
        </div>
      </div>
    </body>
    </html>
  `;
};

exports.enquiryStatusUpdateEmail = (enquiry, newStatus) => {
  const statusMessages = {
    'under_review': 'Your enquiry is currently under review by our team.',
    'quote_sent': 'We have sent you a quote. Please check the attached document.',
    'won': 'Congratulations! Your project has been confirmed.',
    'lost': 'Thank you for your interest. Unfortunately, we cannot proceed with this project at this time.'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 30px; }
        .status-badge { display: inline-block; padding: 8px 16px; background: #059669; color: white; border-radius: 20px; margin: 10px 0; }
        .button { display: inline-block; padding: 12px 30px; background: #059669; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Enquiry Status Update</h1>
        </div>
        <div class="content">
          <p>Dear ${enquiry.contactPerson},</p>
          <p>Your enquiry status has been updated.</p>
          
          <p><strong>Enquiry ID:</strong> ${enquiry.enquiryId}</p>
          <p><strong>New Status:</strong> <span class="status-badge">${newStatus.replace('_', ' ').toUpperCase()}</span></p>
          
          <p>${statusMessages[newStatus]}</p>
          
          <a href="${process.env.FRONTEND_URL}/dashboard/enquiries/${enquiry._id}" class="button">View Enquiry Details</a>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>Automation Solutions Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
