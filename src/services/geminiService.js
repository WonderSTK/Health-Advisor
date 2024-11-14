import axios from 'axios';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export const analyzeHealth = async (input) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze the following health information and provide a structured response with these exact headings:
                1. Possible Condition: [Provide the most likely condition based on the information. If uncertain, state "Unable to determine specific condition based on given information."]
                2. Recommended Exercises: [List specific exercises or state "General exercises for overall health: walking, stretching, and light cardio."]
                3. Suggested Medicines: [List medicines if applicable or state "Consult a healthcare professional for appropriate medication."]
                4. Dietary Recommendations: [Provide specific dietary advice or general healthy eating guidelines.]

                Ensure each section is answered, even if with general advice. Here's the health information: ${input}`,
              },
            ],
          },
        ],
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    const sections = result.split(/\d\.\s+/);
    const [, disease, exercise, medicine, food] = sections.map(section => section.split(':')[1]?.trim() || '');

    return { disease, exercise, medicine, food };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};