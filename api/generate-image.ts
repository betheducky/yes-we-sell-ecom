import OpenAI from 'openai';
import {VercelRequest, VercelResponse} from '@vercel/node';

const client = new OpenAI({apiKey: process.env['YES_WE_SELL_API_KEY']});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const {productTitle} = req.body;

        if (!productTitle) 
            return res.status(400).json({ error: "Missing productName" });

        const image = await client.images.generate({
            model: 'dall-e-3',
            prompt: `Professional e-commerce photo of ${productTitle} on a white background with soft shadows and realistic lighting.`,
            size: '512x512',
        });

        return res.status(200).json({ imageUrl: image.data![0].url });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}