import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"

interface ConfigOptions {
    host: string
    port: number
    secure: boolean
    auth: {
        user: string
        pass: string
    }
}

@Injectable()
export class NodemailerService {
    private nodemailer!: Transporter
    private configOptions!: ConfigOptions

    constructor(private readonly configService: ConfigService) {
        this.initialize()
    }

    private initialize() {
        this.configOptions = {
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // ⚠️ Deve ser true para porta 465
            auth: {
                user: "ruancosta.ti0805@gmail.com",
                pass: this.configService.get<string>("NODEMAILER_AUTH", ""), // Define um padrão
            }
        }

        this.nodemailer = nodemailer.createTransport(this.configOptions)
    }

    async sendMailToUser(email: string, subject: string, html?: string) {
        if (!this.nodemailer) return

        await this.nodemailer.sendMail({
            from: `Ecommerce <${this.configOptions.auth.user}>`,
            to: email,
            subject,
            html
        })

        console.log(`E-mail enviado para ${email}`)
    }
}
