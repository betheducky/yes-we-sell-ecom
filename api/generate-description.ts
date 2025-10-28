import OpenAI from "openai";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { error } from "console";

const client = new OpenAI({
    apiKey: process.env['YES_WE_SELL_API_KEY']
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const {productTitle} = req.body;

        if(!productTitle)
            return res.status(400).json({ error: 'Missing productTitle' });

        const completion = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{
                role: 'user',
                content: `Write a short, engaging, e-commerce description (1 sentence long) for "${productTitle}". Include 1 point of value and a likely use case delivered with a salesy tone.`,
                },
            ],
        });

        const description = completion.choices[0].message.content;
        return res.status(200).json({ description });
    } catch(err: any) {
        return res.status(500).json({ error: err.message })
    }
}