import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function handler(event: any) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { message, topic = 'Mathematics', level = 'Beginner', history = [] } = payload;

    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'A message string is required.' }),
      };
    }

    const ai = getGeminiClient();
    if (ai) {
      try {
        const systemInstruction = `You are LearnX AI Tutor, an elite Socratic tutor for an EdTech SaaS platform called LearnX AI.
Current Topic: ${topic}
Student Learning Level: ${level}

STRICT TUTOR BEHAVIOR:
1. Do not just dump the raw answer.
2. Acknowledge thought process and guide intuitively.
3. Provide a clear real-world analogy.
4. End with a mini check-for-understanding practice question.`;

        const promptHistory = history
          .slice(-6)
          .map((h: any) => `${h.role === 'user' ? 'Student' : 'Tutor'}: ${h.content}`)
          .join('\n\n');

        const fullPrompt = `${promptHistory ? `Previous conversation:\n${promptHistory}\n\n` : ''}Student asks: "${message}"\n\nProvide your response following your pedagogical guidelines.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const replyText = response.text || '';
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            reply: replyText,
            source: 'gemini',
            level,
            topic,
          }),
        };
      } catch (geminiErr: any) {
        console.warn('Netlify Gemini error:', geminiErr?.message);
      }
    }

    // Heuristic Socratic Fallback
    const fallbackReply = `### Understanding ${topic} Intuitively 🎯

When tackling **${topic}**, always start by breaking down what values are mathematically valid.

#### Socratic Check-for-Understanding:
Suppose you encounter an algebraic fraction $\\frac{1}{x - 3}$. Which value of $x$ breaks the definition?
- **A)** $x = 0$
- **B)** $x = 3$ (division by zero)
- **C)** $x = -3$
- **D)** Any positive number

*What do you think? Reply with your choice or reasoning!*`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        reply: fallbackReply,
        source: 'fallback-demo',
        level,
        topic,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: err?.message || 'Internal Server Error' }),
    };
  }
}
