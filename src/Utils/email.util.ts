import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
 
    private transporter: nodemailer.Transporter = nodemailer.createTransport({

        service: `gmail`,

        auth: {

            user: process.env.COMPANY_EMAIL,
            pass: process.env.COMPANY_PASS
        }

    });

    async sendEmail(to: string, subject: string, message: string) {
  
        try {

            await this.transporter.sendMail({
                from: process.env.COMPANY_EMAIL,
                to,
                subject,
                html: message
            });
            
        } catch (error) {
            console.error('Error sending email:', error);
            
        }
    }
}
