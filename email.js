
module.exports = function sendEmail(message) {
    "use strict";
    const nodemailer = require("nodemailer");
    const Config = require('./config')
    // async..await is not allowed in global scope, must use a wrapper
    
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: Config.Host,
        port: Config.Port,
        secure: false, // true for 465, false for other ports
        auth: {
          user: Config.Username, // generated ethereal user
          pass: Config.Password, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: message.from, // sender address
        to: message.to, // list of receivers
        subject: message.subject, // Subject line
        text: message.text, // plain text body
        html: message.html, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      return info.messageId
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>.
    }
    
    main().catch(console.error);
    


}
