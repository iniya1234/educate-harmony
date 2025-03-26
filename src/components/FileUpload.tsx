
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, X, AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
}

export function FileUpload({
  accept = ".pdf,.doc,.docx,.txt",
  maxSize = 10,
  maxFiles = 5,
  onFilesSelected,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: File[] = [];
    let oversizedFiles = 0;
    let invalidTypeFiles = 0;

    // Convert accept string to array of valid extensions
    const acceptedTypes = accept.split(",").map(type => type.trim());

    Array.from(selectedFiles).forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        oversizedFiles++;
        return;
      }

      // Check file type
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      if (!acceptedTypes.some(type => type === fileExtension || type === ".*")) {
        invalidTypeFiles++;
        return;
      }

      // Add valid file
      if (files.length + newFiles.length < maxFiles) {
        newFiles.push(file);
      }
    });

    if (oversizedFiles > 0) {
      toast.error(`${oversizedFiles} file(s) exceeded the size limit of ${maxSize}MB`);
    }

    if (invalidTypeFiles > 0) {
      toast.error(`${invalidTypeFiles} file(s) had invalid file types`);
    }

    if (files.length + newFiles.length > maxFiles) {
      toast.warning(`You can only upload a maximum of ${maxFiles} files`);
    }

    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesSelected?.(updatedFiles);
      toast.success(`${newFiles.length} file(s) added successfully`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected?.(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
          isDragging ? "border-primary bg-primary/5" : "border-input",
          "hover:border-primary/50 hover:bg-primary/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <UploadCloud className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Upload files</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Drag and drop files here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Accepted formats: {accept} (Max: {maxSize}MB per file)
            </p>
          </div>
          <Button variant="secondary" size="sm" className="mt-2">
            Select Files
          </Button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          accept={accept}
          multiple={maxFiles > 1}
        />
      </div>

      {files.length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Files ({files.length}/{maxFiles})</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  setFiles([]);
                  onFilesSelected?.([]);
                }}
              >
                Clear All
              </Button>
            </div>
          </div>
          <ul className="divide-y">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Info className="h-3 w-3" />
        <span>Files will be analyzed by AI for feedback generation</span>
      </div>
    </div>
  );
}
