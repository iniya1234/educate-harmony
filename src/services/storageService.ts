
import { getApiKeys } from './apiConfig';

// Interface for file metadata
export interface FileMetadata {
  name: string;
  contentType: string;
  size: number;
  createdAt: string;
  downloadUrl: string;
}

// Simple implementation of storage service
// In a real app, you would use the Google Cloud Storage SDK or REST API
export class StorageService {
  private bucketName: string;
  private apiKey: string;
  
  constructor(bucketName: string) {
    this.bucketName = bucketName;
    this.apiKey = getApiKeys().GOOGLE_CLOUD_STORAGE_KEY;
    
    if (!this.apiKey) {
      console.warn("Google Cloud Storage API key is not set. Storage functionality will be limited.");
    }
  }
  
  // Mock function to simulate uploading a file
  // In a real app, you would use the Google Cloud Storage API
  async uploadFile(file: File, path: string): Promise<FileMetadata> {
    if (!this.apiKey) {
      throw new Error("Google Cloud Storage API key is not set. Please configure your API keys.");
    }
    
    // In a real implementation, you would upload to GCS here
    // For now, we'll simulate a successful upload with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a mock response
        const metadata: FileMetadata = {
          name: file.name,
          contentType: file.type,
          size: file.size,
          createdAt: new Date().toISOString(),
          downloadUrl: URL.createObjectURL(file), // Local URL for demo purposes
        };
        resolve(metadata);
      }, 1000);
    });
  }
  
  // Mock function to simulate downloading a file
  async downloadFile(filePath: string): Promise<Blob> {
    if (!this.apiKey) {
      throw new Error("Google Cloud Storage API key is not set. Please configure your API keys.");
    }
    
    // In a real implementation, you would download from GCS here
    // For this demo, we'll return a mock blob
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create an empty text file for demo purposes
        const blob = new Blob(['This is a mock downloaded file'], { type: 'text/plain' });
        resolve(blob);
      }, 1000);
    });
  }
  
  // Mock function to simulate listing files
  async listFiles(prefix: string): Promise<FileMetadata[]> {
    if (!this.apiKey) {
      throw new Error("Google Cloud Storage API key is not set. Please configure your API keys.");
    }
    
    // In a real implementation, you would list files from GCS here
    // For this demo, we'll return mock metadata
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create mock file list
        const files: FileMetadata[] = [
          {
            name: 'assignment1.pdf',
            contentType: 'application/pdf',
            size: 1024 * 1024,
            createdAt: new Date().toISOString(),
            downloadUrl: '#',
          },
          {
            name: 'report.docx',
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            size: 2 * 1024 * 1024,
            createdAt: new Date().toISOString(),
            downloadUrl: '#',
          },
        ];
        resolve(files);
      }, 1000);
    });
  }
}

// Create singleton instance
export const storageService = new StorageService('teachassist-assignments');
