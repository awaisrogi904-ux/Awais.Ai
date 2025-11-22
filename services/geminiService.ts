import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// In a real production app, the API key would be managed securely on the backend.
// For this client-side demo, we rely on process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash-image';

/**
 * Generates an image from a text prompt.
 */
export const generateImageFromText = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { text: prompt },
          { text: "Produce a high-resolution, photorealistic 1024x1024 image based on the prompt. Use cinematic lighting, high detail, realistic textures, and natural color grading. Avoid text/letters in the image. Provide a neutral background and focus on subject clarity." }
        ],
      },
    });

    // Extract image from response parts
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

/**
 * Edits an existing image based on a text prompt.
 */
export const editImageWithPrompt = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    // Extract clean base64 string (remove data:image/png;base64, prefix)
    const base64Data = base64Image.split(',')[1];
    const mimeType = base64Image.substring(base64Image.indexOf(':') + 1, base64Image.indexOf(';'));

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                }
            },
            {
                text: `Edit this image. Instruction: ${prompt}. Maintain the original aspect ratio and core subject unless instructed otherwise.`
            }
        ],
      },
    });

    // Extract image from response parts
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }

    throw new Error("No edited image returned from Gemini.");

  } catch (error) {
    console.error("Gemini Edit Error:", error);
    throw error;
  }
};

/**
 * Helper to read a file as Base64
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};