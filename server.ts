import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY",
    timestamp: new Date().toISOString(),
  });
});

// AI Tutor endpoint
app.post("/api/tutor/chat", async (req, res) => {
  const { message, topic = "Mathematics", level = "Beginner", history = [] } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A message string is required." });
  }

  const ai = getGeminiClient();

  if (ai) {
    try {
      const systemInstruction = `You are LearnX AI Tutor, an elite AI tutor for an EdTech SaaS platform called LearnX AI ("Stop studying everything. Learn what you need.").
Current Topic: ${topic}
Student Learning Level: ${level}

STRICT TUTOR BEHAVIOR GUIDELINES:
1. DO NOT simply dump the raw answer or formulas immediately.
2. First, acknowledge the student's thought process and diagnose their likely misconception.
3. Explain the core concept intuitively at their level (${level}).
4. Provide a clear, real-world or intuitive concrete example.
5. Highlight key concepts using bold text or markdown blocks.
6. Always end with a quick interactive check-for-understanding mini-question with 3-4 labeled options (A, B, C, D) so the student can actively practice.
7. Keep tone encouraging, rigorous yet accessible, like a top university mentor.`;

      const promptHistory = history
        .slice(-6)
        .map((h: { role: string; content: string }) => `${h.role === "user" ? "Student" : "Tutor"}: ${h.content}`)
        .join("\n\n");

      const fullPrompt = `${promptHistory ? `Previous conversation:\n${promptHistory}\n\n` : ""}Student asks: "${message}"\n\nProvide your response following your pedagogical guidelines.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "";
      return res.json({
        reply: replyText,
        source: "gemini",
        level,
        topic,
      });
    } catch (err: any) {
      console.warn("Gemini API call failed, falling back to smart heuristic tutor:", err?.message);
    }
  }

  // Fallback intelligent response for hackathon demo resilience
  const fallback = generateSmartFallbackTutorReply(message, topic, level);
  return res.json({
    reply: fallback,
    source: "fallback-demo",
    level,
    topic,
  });
});

// Fallback tutor generator tailored to user prompt specs
function generateSmartFallbackTutorReply(message: string, topic: string, level: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("domain") || lower.includes("range") || lower.includes("why do we need")) {
    return `### Understanding Domain & Range Intuitively 🎯

Think of a mathematical function like a **vending machine**:
- **Domain** = What valid coins or inputs you can put in. If you insert a wooden token, the machine jams. That token isn't in the domain!
- **Range** = All possible sodas or snacks that can actually come out of the machine.

---

#### Why Does This Matter?
In real software and physics, functions model real constraints. For example, if $t$ is time elapsed in seconds, time cannot be negative ($t \\ge 0$). That boundary is your **domain restriction**.

#### Real-World Example
Consider $f(x) = x^2$:
- You can plug in **any real number** (positive, negative, or zero), so:
  $$\\text{Domain: } (-\\infty, \\infty)$$
- But squaring any real number never produces a negative number! So:
  $$\\text{Range: } [0, \\infty)$$

---

#### 🧠 Quick Check for Understanding:
**If $f(x) = \\sqrt{x - 3}$, what values of $x$ are allowed in the Domain?**

- **A)** Any number: $(-\\infty, \\infty)$
- **B)** Numbers where $x \\ge 3$
- **C)** Only negative numbers: $x < 0$
- **D)** Numbers where $x \\le 3$`;
  }

  if (lower.includes("quadratic") || lower.includes("parabola") || lower.includes("root")) {
    return `### Mastering Quadratic Equations & Symmetry 📐

A quadratic equation is any relationship where the highest power of the variable is $x^2$. 

#### The Key Intuition:
Unlike a flat linear graph ($y = 2x + 1$) that goes straight forever, a quadratic **curves back on itself**, creating a symmetrical U-shape called a **parabola**.

- **Vertex:** The peak or bottom-most turning point (like a basketball reaching maximum height before falling).
- **Roots / Zeros:** The exact points where the curve hits the ground ($y = 0$).

#### Simple Step-by-Step Factoring:
When solving $x^2 - 5x + 6 = 0$:
1. We want two numbers that **multiply to $+6$** and **add to $-5$**.
2. Think through factors: $(-2) \\times (-3) = 6$, and $(-2) + (-3) = -5$.
3. Write: $(x - 2)(x - 3) = 0 \\implies x = 2 \\text{ or } x = 3$.

---

#### 🧠 Mini-Question for You:
**Which of the following points represents the y-intercept of $f(x) = 2x^2 - 4x + 7$?**

- **A)** $(0, 7)$
- **B)** $(0, 2)$
- **C)** $(7, 0)$
- **D)** $(2, -4)$`;
  }

  return `### Tackling ${topic} (${level} Level) 💡

Great question! Let's break this down systematically rather than memorizing dry rules.

#### 1. The Core Misconception
Many students assume formulas exist in a vacuum. In reality, each concept is a shortcut created to solve a physical or logical bottleneck.

#### 2. Concept Breakdown
- **Foundation:** Notice how changing one variable ripples through the entire system.
- **Key Insight:** In **${topic}**, consistency across operations ensures equations remain balanced.
- **Rule of thumb:** Always verify boundary conditions (what happens when input is $0$, $1$, or very large).

---

#### 3. Concrete Example
If we set up a balanced relationship:
$$\\text{Input} \\rightarrow [\\text{Transformation}] \\rightarrow \\text{Output}$$
When you preserve this balance, solving for unknown values becomes a straightforward step-by-step unraveling.

---

#### 🧠 Let's Test Your Instinct:
**Based on this concept, what is the best first step when faced with an unfamiliar problem?**

- **A)** Isolate the known quantities and state boundary constraints
- **B)** Pick arbitrary numbers without checking units
- **C)** Guess the final output immediately
- **D)** Ignore the variable relationships`;
}

// Start server with Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LearnX AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
