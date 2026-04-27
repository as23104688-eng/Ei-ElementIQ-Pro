import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const modelName = "gemini-3-flash-preview";

export interface ElementFlashcard {
  symbol: string;
  atomicNumber: number;
  atomicMass: string;
  electronConfiguration: {
    full: string;
    shorthand: string;
  };
  block: string;
  period: number;
  group: number;
  valency: string;
  oxidationStates: string[];
  jeeFact: string;
  mnemonic: string;
}

export interface QuizQuestion {
  question: string;
  answer: string;
  hint: string;
  explanation: string;
  difficulty: "Board" | "JEE Main" | "NEET" | "JEE Advanced";
}

const SYSTEM_INSTRUCTION = `You are ElementIQ Pro, an expert chemistry tutor for Indian high school students (JEE/NEET).
Always mention if a concept is from NCERT. Highlight exceptions. Use Indian exam terminology (s-block, p-block, diagonal relationship, inert pair effect, etc.).
Keep explanations crisp but complete. Use emojis occasionally ⚗️🧪📚.
Encourage the student after every correct answer. If they get it wrong, say "Common mistake!" and explain why.`;

export async function getElementFlashcard(element: string): Promise<ElementFlashcard> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Return data for the element: ${element} in JSON format following the Mode 1 instructions. Ensure the JSON is valid and not truncated.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            symbol: { type: Type.STRING },
            atomicNumber: { type: Type.NUMBER },
            atomicMass: { type: Type.STRING },
            electronConfiguration: {
              type: Type.OBJECT,
              properties: {
                full: { type: Type.STRING },
                shorthand: { type: Type.STRING }
              }
            },
            block: { type: Type.STRING },
            period: { type: Type.NUMBER },
            group: { type: Type.NUMBER },
            valency: { type: Type.STRING },
            oxidationStates: { type: Type.ARRAY, items: { type: Type.STRING } },
            jeeFact: { type: Type.STRING },
            mnemonic: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini Flashcard Error:", err);
    throw err;
  }
}

export async function generateQuizQuestion(difficulty?: string): Promise<QuizQuestion> {
  try {
    const diffPrompt = difficulty ? ` specifically of ${difficulty} level.` : "";
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Generate a fill-in-the-blank chemistry quiz question for JEE/NEET${diffPrompt}. Mix easy (board level) and hard (JEE/NEET level). Ensure valid JSON response.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            answer: { type: Type.STRING },
            hint: { type: Type.STRING },
            explanation: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ["Board", "JEE Main", "NEET", "JEE Advanced"] }
          }
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini Quiz Error:", err);
    throw err;
  }
}

export async function generatePYQ(): Promise<QuizQuestion & { options: string[] }> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: "Generate an actual-style chemistry MCQ (PYQ pattern) for JEE Main/NEET. Provide 4 options (a, b, c, d). Indicate which option is correct. Ensure the JSON is complete and valid.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            answer: { type: Type.STRING, description: "The correct option (e.g., 'a')" },
            hint: { type: Type.STRING },
            explanation: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ["Board", "JEE Main", "NEET", "JEE Advanced"] }
          }
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini PYQ Error:", err);
    throw err;
  }
}

export const chat = ai.chats.create({
  model: modelName,
  config: {
    systemInstruction: SYSTEM_INSTRUCTION + "\n\nAnswer questions clearly with: Concept explanation (board level first, then JEE/NEET depth). Cover Periodic trends: atomic radius, ionization energy, etc. with exceptions and reasons. Mention NCERT-based answers."
  }
});
