import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(
    @Body() body: { to: string; subject: string; text: string; html: string },
  ) {
    const { to, subject, text, html } = body;
    try {
      const result = await this.mailService.sendMail(to, subject, text, html);
      return { message: 'Email sent successfully', result };
    } catch (error) {
      return { message: 'Failed to send email', error: error.message };
    }
  }
}
