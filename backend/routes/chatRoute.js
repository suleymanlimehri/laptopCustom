import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant that knows a lot about laptops.' },
        { role: 'user', content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('CHAT API ERROR:', error);
    res.status(500).json({ error: 'Something went wrong.', detail: error.message });
  }
});

export default router;
