import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, X } from 'lucide-react';
import { toast } from 'sonner';

interface StoryUploaderProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onFileSelect?: (file: File | null) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_CONTENT_LENGTH = 250000; // ~50k words
const ALLOWED_TYPES = [
  'application/pdf',
  'text/plain',
  'image/png',
  'image/jpeg',
  'image/gif',
];

export function StoryUploader({
  title,
  content,
  onTitleChange,
  onContentChange,
  onFileSelect,
}: StoryUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      onFileSelect?.(null);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File must be under 10MB');
      return;
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Invalid file type. Use PDF, TXT, PNG, JPEG, or GIF');
      return;
    }

    setSelectedFile(file);
    onFileSelect?.(file);
    toast.success(`File "${file.name}" selected`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect?.(null);
  };

  return (
    <div className="space-y-6">
      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="story-title">Story Title</Label>
        <Input
          id="story-title"
          placeholder="Enter a title for your story"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          maxLength={200}
        />
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label>Upload Story File (Optional)</Label>
        <Card
          className={`border-2 border-dashed transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-6">
            {selectedFile ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium mb-1">
                  Drop your file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  PDF, TXT, PNG, JPEG, GIF (max 10MB)
                </p>
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.txt,.png,.jpg,.jpeg,.gif"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select File
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="story-content">Story Content</Label>
          <span className="text-xs text-muted-foreground">
            {wordCount.toLocaleString()} words · {charCount.toLocaleString()}/{MAX_CONTENT_LENGTH.toLocaleString()} chars
          </span>
        </div>
        <Textarea
          id="story-content"
          placeholder="Type or paste your story here..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          maxLength={MAX_CONTENT_LENGTH}
          className="min-h-[300px] font-mono text-sm"
        />
        {charCount > MAX_CONTENT_LENGTH * 0.9 && (
          <p className="text-xs text-amber-600">
            Approaching character limit
          </p>
        )}
      </div>
    </div>
  );
}
