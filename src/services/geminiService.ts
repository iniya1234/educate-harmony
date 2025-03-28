
import { API_CONFIG, getApiKeys } from './apiConfig';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Interface for chat completion request
interface ChatCompletionRequest {
  contents: {
    role: string;
    parts: { text: string }[];
  }[];
  generationConfig?: {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
  };
}

// Interface for chat completion response
interface ChatCompletionResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
  }[];
  promptFeedback?: any;
}

// Function to generate chat completion
export const generateChatCompletion = async (
  messages: ChatMessage[],
  options: {
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<string> => {
  const { GEMINI_API_KEY } = getApiKeys();
  
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not set. Please configure your API keys.");
  }

  // Map messages to Gemini format
  const formattedMessages = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : msg.role,
    parts: [{ text: msg.content }]
  }));

  const requestBody: ChatCompletionRequest = {
    contents: formattedMessages,
    generationConfig: {
      temperature: options.temperature || 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: options.maxTokens || 1024
    }
  };

  try {
    const response = await fetch(
      `${API_CONFIG.GEMINI_API_URL}/${API_CONFIG.GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data: ChatCompletionResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response generated from the AI model");
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return aiResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

// Function to analyze assignments
export const analyzeAssignment = async (
  assignmentText: string,
  criteria: string
): Promise<string> => {
  const prompt = `
You are an expert teacher assistant. Please analyze the following assignment based on these criteria: ${criteria}

Assignment: ${assignmentText}

Provide feedback on strengths, areas for improvement, and a suggested grade.
`;
  
  const messages: ChatMessage[] = [
    { role: 'system', content: 'You are an AI teaching assistant specialized in evaluating student assignments fairly and constructively.' },
    { role: 'user', content: prompt }
  ];
  
  return generateChatCompletion(messages, { temperature: 0.3 });
};
