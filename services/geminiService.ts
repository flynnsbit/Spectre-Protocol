import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL } from '../constants';

/**
 * Sends the current code and a user request to Gemini to generate updated code.
 * Now requires the API key to be passed in, allowing for "Bring Your Own Key" 
 * usage on static hosts like GitHub Pages.
 */
export const modifyGameCode = async (currentCode: string, userRequest: string, apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set it in the settings.");
  }

  try {
    // Initialize the client dynamically with the provided key
    const ai = new GoogleGenAI({ apiKey });

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