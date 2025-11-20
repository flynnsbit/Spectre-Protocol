import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL } from '../constants';

// Initialize the Gemini API client
// The API key is assumed to be available in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends the current code and a user request to Gemini to generate updated code.
 */
export const modifyGameCode = async (currentCode: string, userRequest: string): Promise<string> => {
  try {
    const systemInstruction = `
      You are an expert HTML5 and JavaScript game developer. 
      The user will provide existing HTML game code and a request to modify it.
      
      Rules:
      1. Return ONLY the valid, complete, and working HTML code.
      2. Do not add any markdown formatting (like \`\`\`html).
      3. Maintain the existing code structure and style.
      4. Ensure all scripts and styles are properly embedded.
    `;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      config: { systemInstruction },
      contents: [
        { role: 'user', parts: [{ text: `Current Code:\n${currentCode}\n\nUser Request:\n${userRequest}` }] }
      ]
    });

    const text = response.text;
    return text || currentCode; // Fallback if response is empty
  } catch (error) {
    console.error("Error generating code:", error);
    throw error;
  }
};
