
import { useCallback, useState } from "react";
import { generateChatCompletion, ChatMessage } from "@/services/geminiService";
import { getApiKeys } from "@/services/apiConfig";
import { toast } from "sonner";

export interface UseAIOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export function useAI(options: UseAIOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const generateResponse = useCallback(
    async (prompt: string, chatHistory: ChatMessage[] = []): Promise<string> => {
      // Check if API key is configured
      const { GEMINI_API_KEY } = getApiKeys();
      if (!GEMINI_API_KEY) {
        const errorMsg = "Gemini API key is not configured. Please set up your API keys.";
        toast.error(errorMsg);
        setError(errorMsg);
        return errorMsg;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Prepare messages with system prompt if provided
        const messages: ChatMessage[] = [];
        
        if (options.systemPrompt) {
          messages.push({ role: "system", content: options.systemPrompt });
        }
        
        // Add chat history
        messages.push(...chatHistory);
        
        // Add the current prompt
        messages.push({ role: "user", content: prompt });
        
        // Generate completion
        const response = await generateChatCompletion(messages, {
          temperature: options.temperature,
          maxTokens: options.maxTokens,
        });
        
        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to generate AI response";
        setError(errorMessage);
        toast.error(errorMessage);
        return errorMessage;
      } finally {
        setIsLoading(false);
      }
    },
    [options.systemPrompt, options.temperature, options.maxTokens]
  );
  
  return {
    generateResponse,
    isLoading,
    error,
  };
}
