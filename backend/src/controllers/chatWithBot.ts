import dotenv from "dotenv";
import type { Request, Response } from "express";

dotenv.config();

const AI_SECRET = process.env.AI_API_KEY ?? "";

interface Description {
  description: string;
  tag: string;
}

interface TopicDescRequest {
  topics?: string[];
}

interface ChatRequest {
  question?: string;
  answer?: string;
  topic?: string;
  difficulty?: string;
}

const generateDescriptionsFromAI = async (topics: string[]): Promise<Record<string, Description>> => {
  const topicList = topics.join(", ");

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Return ONLY a valid JSON object with topic names as keys and objects as values. Each object should contain a description and a tag for the topic. No markdown, no code blocks. Valid JSON only.",
          },
          {
            role: "user",
            content: `Provide one-liner descriptions for these topics: ${topicList}`,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content) as Record<string, Description>;
};

export const topicDesc = async (req: Request<{}, {}, TopicDescRequest>, res: Response): Promise<void> => {
  try {
    const topics = req.body.topics ?? [];

    if (topics.length === 0) {
      res.status(400).json({
        success: false,
        message: "No topics provided",
      });
      return;
    }

    const descriptions = await generateDescriptionsFromAI(topics);

    res.status(200).json({
      success: true,
      descriptions: JSON.stringify(descriptions),
    });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      details: (err as Error).message,
    });
  }
};

export const chatWithBot = async (req: Request<{}, {}, ChatRequest>, res: Response): Promise<void> => {
  try {
    const question = req.body.question ?? "";
    const answer = req.body.answer ?? "";
    const topic = req.body.topic;
    const difficulty = req.body.difficulty;

    if (!topic) {
      res.status(400).json({
        success: false,
        message: "Topic and difficulty are required",
      });
      return;
    }

    let messages: Array<{ role: string; content: string }> = [];

    if (!question && !answer && difficulty === "easy") {
      messages = [
        {
          role: "system",
          content: `
                  You are an AI tutor.
                  
                  Generate ONLY interview-style questions for the given topic.        

                  1) Generate the FIRST question for the given topic.
                  2) Also provide one short helpful pro-tip or hint for answering the question - Keep the pro-tip concise (1 line)

                  Rules:
                  - difficulty : easy (beginner)
                  - Ask only ONE simple question
                  - Respond ONLY in JSON

                  Format:
                  {
                    "question": "string",
                    "proTip": "string"
                  }
                  `,
        },
        {
          role: "user",
          content: `Topic: ${topic}`,
        },
      ];
    } else if (question && answer) {
      messages = [
        {
          role: "system",
          content: `
                You are an AI tutor.

                Generate ONLY interview-style questions for the given topic.

                Your tasks:
                1. Evaluate the user's answer and assign a score from 0 to 100.
                2. Provide the correct answer.
                3. Generate the next question based on the user's performance.
                4. Include both theory-based and practical/code-based questions depending on the topic.
                5. Provide one short helpful pro-tip or hint for answering the question - Keep the pro-tip concise (1 line)

                Difficulty rules:
                - If the answer is correct (score >= 70) → increase difficulty
                - If the answer is fine (score < 70) → keep the SAME difficulty
                - If the answer is incorrect (score <= 40) → decrease difficulty

                Difficulty levels:
                - easy → basic concepts
                - medium → deeper understanding
                - hard → advanced/tricky questions

                Next question rules:
                - Must be related to the same topic
                - Must follow the difficulty rule above
                - Ask only ONE question
                - Keep it clear and specific
                - nextQuestion must be a STRING only

                Correct answer rules:
                - Keep it concise (2-4 lines max)

                IMPORTANT:
                - Respond ONLY in valid JSON
                - No markdown, no extra text

                RESPONSE FORMAT (must match exactly):
                {
                  "score": number,
                  "correctAnswer": "string",
                  "nextQuestion": "string",
                  "proTip": "string",
                  "Difficulty": "easy" | "medium" | "hard"
                }
                `,
        },
        {
          role: "user",
          content: `
                  Topic: ${topic}
                  Question: ${question}
                  User Answer: ${answer}
                  `,
        },
      ];
    } else {
      res.status(400).json({
        error: "Invalid request format",
      });
      return;
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AI_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages,
        }),
      },
    );

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      res.status(500).json({
        error: "Invalid AI response format",
        raw,
      });
      return;
    }

    res.json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
