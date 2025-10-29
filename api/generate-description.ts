// @ts-ignore

const OpenAI = require('openai');

module.exports = async (req: any, res: any) => {
    try {

        const client = new OpenAI({
        apiKey: process.env['YES_WE_SELL_API_KEY']
        });

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
        console.error("Error generating description:", err);
        return res.status(500).json({ error: err.message || "Server error" })
    }
}