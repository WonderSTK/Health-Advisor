import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeHealth(input) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      As an AI health advisor, analyze the following health information and provide recommendations:

      ${input}

      Please provide a structured response in the following JSON format:
      {
        "analysis": "A brief analysis of the overall health situation based on the provided information.",
        "possibleConditions": ["List of possible conditions or health issues based on the symptoms and medications"],
        "recommendations": {
          "lifestyle": ["List of lifestyle recommendations"],
          "diet": ["List of dietary recommendations"],
          "exercise": ["List of exercise recommendations"],
          "medications": ["Any suggestions regarding medications, including potential interactions or adjustments"],
          "followUp": ["Recommendations for follow-up actions or medical consultations"]
        },
        "goalFeedback": ["Feedback on the user's health goals, including suggestions for achieving them"],
        "appointmentPrep": ["Suggestions for preparing for upcoming medical appointments"],
        "urgency": "A rating of urgency (low, medium, high) based on the symptoms and overall health situation",
        "healthTip": "A personalized health tip based on the user's current health situation and goals"
      }

      Ensure all fields are filled with appropriate information. If there's not enough information for a particular field, provide general health advice for that category. Do not include any markdown formatting in your response, just the raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Remove any potential markdown formatting
    text = text.replace(/```json\n?/, '').replace(/\n?```$/, '');

    // Parse the JSON response
    const parsedResponse = JSON.parse(text);

    return parsedResponse;
  } catch (error) {
    console.error("Error in analyzeHealth:", error);
    if (error.message.includes("429")) {
      throw new Error("Too many requests. Please try again later.");
    } else if (error instanceof SyntaxError) {
      console.error("Invalid JSON response:", error);
      throw new Error("Received an invalid response from the AI model. Please try again.");
    } else {
      throw new Error("An error occurred while analyzing health data. Please try again.");
    }
  }
}

export async function generateHealthTip(healthData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Based on the following health information, provide a personalized health tip:

      ${JSON.stringify(healthData)}

      The health tip should be concise, actionable, and relevant to the user's current health situation and goals.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating health tip:", error);
    throw new Error("Failed to generate a health tip. Please try again.");
  }
}