const fs = require("fs");
const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");


module.exports = class Email {

    constructor(user, url, key=null){
        // this.to = user.email;
        this.to = 'mashraf.14697@gmail.com';
        this.name = user.fullname;
        this.url = url;
        this.from = ``
        this.key = key;
    }

    newTransport(){
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }

    async send(template, subject){
        let html = fs.readFileSync(`${__dirname}/../views/${template}.html`, "utf-8")
                     .replaceAll("{{ name }}", this.name)
                     .replaceAll("{{ url }}", this.url)
                     .replaceAll("{{ key }}", this.key);


        
        // if(this.jobAppliedTo){      // complete the body of notifying employee when apply to job mail here
        //     // html = html.replaceAll() 
        // }

        // Define email options
        const mailOptions = {
            from: this.from,
            to : this.to,
            subject,
            html,
            text: htmlToText.htmlToText(html)
        }
    
        // Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

        async sendWelcome(){
            await this.send(
                "verify_email",
                "Welcome to Egy Recruitment Family, Please Verify your Email"
            )
        }

        async sendPasswordReset(){
            await this.send(
                "reset-password",
                "Your password reset token (valid for only 30 minutes) "
            );
        }

        
}