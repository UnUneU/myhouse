
const nodemailer = require('nodemailer');

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '645021001260@mail.rmutk.ac.th',
      pass: 'nisarat6450',
    },
  });

  const emailInfo = await transporter.sendMail({
    from: '645021001260@mail.rmutk.ac.th',
    to: '645021001260@mail.rmutk.ac.th',
    subject: 'Subject of the email',
    text: 'This is the text of your email.',
  });
  console.log('Email sent:', emailInfo.response);
}

module.exports = sendEmail;
