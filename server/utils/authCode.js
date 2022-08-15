const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const { emailConfig } = require("./config");

const generateEmailCode = (emailString) => {
  const proxyEmail = emailConfig.neteaseConfig;
  const randomCode = Math.floor(Math.random() * 900000) + 100000;
  const emailAuthCode = CryptoJS.AES.encrypt(
    randomCode.toString(),
    emailConfig.secretKey
  ).toString();
  const htmlString = `<html>
        <head>
            <title>验证码</title>
            <meta charset="UTF-8">
        </head>
        <style type="text/css">
            #container {
                position: relative;
                width: 100%;
                height: 100%;
            }
            .content {
                position: relative;
                height: 300px;
                font-weight: bolder;
            }
        </style>
        <body>
            <div id="container">
              <div class="content">您的验证码为：${randomCode}, 请妥善保管。</div>
            </div>
        </body>
    </html>`;
  const addressee = {
    from: `"韩畅畅"<${proxyEmail.auth.user}>`,
    to: `<${emailString}>`,
    subject: "验证码",
    text: "😊😊😊",
    html: htmlString,
    attachments: [
      {
        filename: "image.png",
        path: "../server/static/image.png",
      },
    ],
  };

  const transporter = nodemailer.createTransport(proxyEmail);
  transporter.sendMail(addressee, (error) => {
    if (error) {
      console.log(error);
    }
    transporter.close();
  });
  return emailAuthCode;
};

module.exports = {
  generateEmailCode,
};
