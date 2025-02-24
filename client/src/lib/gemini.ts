import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(geminiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
  systemInstruction:
    "For every prompt that you are given, I want you to add a label to that prompt at the end of your response. Label should be in the format <<<label>>>. This label should put a category on that particular chat interaction. Choose among these labels :General Inquiry, Small Talk, Programming & Tech, Science & Research, AI & Machine Learning, Mathematics, History & Culture, Language & Communication, Health & Wellness, Food & Cooking, Travel & Geography, Hobbies & Leisure, Personal Finance, Business & Entrepreneurship, Movies & TV Shows, Music & Art, Gaming, Job & Career Advice, Productivity & Self-Improvement, Cybersecurity & Privacy ",
});

export default model;
