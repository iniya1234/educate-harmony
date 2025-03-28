
// API configuration
export const API_CONFIG = {
  GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models",
  GEMINI_MODEL: "gemini-pro",
  STORAGE_API_URL: "https://storage.googleapis.com",
};

// Configuration interface for API keys
export interface ApiKeys {
  GEMINI_API_KEY: string;
  GOOGLE_CLOUD_STORAGE_KEY: string;
}

// Store API keys (in a real app, use environment variables or secure storage)
let apiKeys: ApiKeys = {
  GEMINI_API_KEY: "",
  GOOGLE_CLOUD_STORAGE_KEY: "",
};

// Function to set API keys
export const setApiKeys = (keys: Partial<ApiKeys>) => {
  apiKeys = { ...apiKeys, ...keys };
  // Store in localStorage for persistence
  localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
};

// Function to get API keys
export const getApiKeys = (): ApiKeys => {
  // Try to load from localStorage if available
  const storedKeys = localStorage.getItem('apiKeys');
  if (storedKeys) {
    try {
      const parsedKeys = JSON.parse(storedKeys);
      apiKeys = { ...apiKeys, ...parsedKeys };
    } catch (error) {
      console.error("Error parsing stored API keys:", error);
    }
  }
  return apiKeys;
};
