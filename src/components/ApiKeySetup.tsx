
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setApiKeys, getApiKeys, ApiKeys } from "@/services/apiConfig";
import { toast } from "sonner";
import { Key } from "lucide-react";

export function ApiKeySetup() {
  const [open, setOpen] = useState(false);
  const [formKeys, setFormKeys] = useState<ApiKeys>({
    GEMINI_API_KEY: "",
    GOOGLE_CLOUD_STORAGE_KEY: "",
  });
  const [configured, setConfigured] = useState(false);

  // Load existing keys on mount
  useEffect(() => {
    const storedKeys = getApiKeys();
    setFormKeys(storedKeys);
    
    // Check if keys are configured
    setConfigured(!!storedKeys.GEMINI_API_KEY && !!storedKeys.GOOGLE_CLOUD_STORAGE_KEY);
  }, []);

  const handleSave = () => {
    setApiKeys(formKeys);
    toast.success("API keys saved successfully");
    setConfigured(!!formKeys.GEMINI_API_KEY && !!formKeys.GOOGLE_CLOUD_STORAGE_KEY);
    setOpen(false);
  };

  const handleChange = (key: keyof ApiKeys, value: string) => {
    setFormKeys({
      ...formKeys,
      [key]: value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={configured ? "outline" : "destructive"} size="sm" className="gap-2">
          <Key className="h-4 w-4" />
          {configured ? "API Keys" : "Configure API Keys"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Configuration</DialogTitle>
          <DialogDescription>
            Enter your API keys to enable Gemini AI and Google Cloud Storage functionalities.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="gemini-key">Gemini API Key</Label>
            <Input
              id="gemini-key"
              type="password"
              value={formKeys.GEMINI_API_KEY}
              onChange={(e) => handleChange("GEMINI_API_KEY", e.target.value)}
              placeholder="Enter your Gemini API key"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="storage-key">Google Cloud Storage Key</Label>
            <Input
              id="storage-key"
              type="password"
              value={formKeys.GOOGLE_CLOUD_STORAGE_KEY}
              onChange={(e) => handleChange("GOOGLE_CLOUD_STORAGE_KEY", e.target.value)}
              placeholder="Enter your Google Cloud Storage key"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save keys</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
