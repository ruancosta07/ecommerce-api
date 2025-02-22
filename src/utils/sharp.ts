import { Injectable } from "@nestjs/common"
import sharp from "sharp"
@Injectable()
export class SharpFile {
    async sharpImageToWebp(image: Buffer): Promise<Buffer> {
        try {
            const resizedImage = await sharp(image).webp({ quality: 70 }).toBuffer()
            return resizedImage
        } catch (err) {
            console.log(err)
        }
    }
}