"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NODE_HANDLES_SELECTED_STYLE_CLASSNAME, isValidUrl } from "@/lib/tiptap-utils";
import { Node, NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";
import { Image, Link, Upload, Loader2, X } from "lucide-react";
import { FormEvent, useCallback, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { getAuthHeader } from "@/lib/api";

interface ImagePlaceholderOptions {
  HTMLAttributes: Record<string, unknown>;
  onUpload?: (url: string) => void;
  onError?: (error: string) => void;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imagePlaceholder: {
      insertImagePlaceholder: () => ReturnType;
    };
  }
}

export const ImagePlaceholder = Node.create<ImagePlaceholderOptions>({
  name: "image-placeholder",
  addOptions() {
    return {
      HTMLAttributes: {},
      onUpload: undefined,
      onError: undefined,
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImagePlaceholderComponent, {
      className: NODE_HANDLES_SELECTED_STYLE_CLASSNAME,
    });
  },
  addCommands() {
    return {
      insertImagePlaceholder: () => ({ commands }) => {
        return commands.insertContent({ type: "image-placeholder" });
      },
    };
  },
});

function ImagePlaceholderComponent({ editor, selected }: NodeViewProps) {
  const [isVisible, setIsVisible] = useState(true); // Control overall visibility
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded since it's a new instance
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const uploadImage = useCallback(
    async (file: File) => {
      try {
        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post<{ Location: string }>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              ...getAuthHeader(),
            },
          }
        );

        setUploadedUrl(response.data.Location);
        setPreviewUrl(URL.createObjectURL(file));
      } catch (err) {
        setError("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    []
  );

  const handleInsertImage = () => {
    if (uploadedUrl) {
      editor.chain().focus().setImage({ src: uploadedUrl, alt: altText }).run();
      setIsVisible(false); // Hide entire component after insertion
    }
  };

  const resetState = () => {
    setPreviewUrl(null);
    setUploadedUrl(null);
    setAltText("");
    setError(null);
    setIsExpanded(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleInsertEmbed = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setUrlError(true);
      return;
    }
    editor.chain().focus().setImage({ src: url, alt: altText }).run();
    setIsVisible(false); // Hide entire component after insertion
  };

  if (!isMounted) {
    return (
      <NodeViewWrapper className="w-full my-4">
        <div className="animate-pulse h-32 bg-gray-200 rounded-xl" />
      </NodeViewWrapper>
    );
  }

  if (!isVisible) {
    return null; // Don't render anything after insertion
  }

  return (
    <NodeViewWrapper className="w-full my-4">
      <div className="relative font-sans">
        {!isExpanded ? (
          <div
            onClick={() => setIsExpanded(true)}
            className={cn(
              "group relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 transition-all",
              "bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100",
              "shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]",
              selected && "border-indigo-500 shadow-indigo-200/50",
              isDragActive && "border-indigo-500 bg-indigo-50/50"
            )}
          >
            <div className="relative p-4">
              <Image className="h-8 w-8 text-indigo-600 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800">Drop your image here</p>
              <p className="text-xs text-gray-500">or click to browse (SVG, PNG, JPG, GIF)</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-white border border-gray-100 shadow-lg p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Insert Image</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsVisible(false)} // Close everything when clicking X
                  className="hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "upload" | "url")}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-50 rounded-lg p-1 mb-4">
                  <TabsTrigger
                    value="upload"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    <Upload className="mr-2 h-4 w-4 text-indigo-600" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger
                    value="url"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                  >
                    <Link className="mr-2 h-4 w-4 text-indigo-600" />
                    URL
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                  <div
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={cn(
                      "relative rounded-lg border-2 border-dashed p-8 text-center",
                      "bg-white/80 backdrop-blur-sm",
                      isDragActive && "border-indigo-500 bg-indigo-50/50",
                      error && "border-red-500 bg-red-50/50"
                    )}
                  >
                    {uploadedUrl ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <img
                            src={previewUrl || uploadedUrl}
                            alt="Uploaded preview"
                            className="mx-auto max-h-[200px] rounded-lg object-cover shadow-md"
                          />
                        </div>
                        <Input
                          value={altText}
                          onChange={(e) => setAltText(e.target.value)}
                          placeholder="Alt text (optional)"
                          className="border-gray-200 focus:border-indigo-500"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={resetState}
                            className="border-gray-200 text-gray-700 hover:bg-gray-50"
                          >
                            Remove
                          </Button>
                          <Button
                            onClick={handleInsertImage}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            Insert
                          </Button>
                        </div>
                      </div>
                    ) : uploading ? (
                      <div className="space-y-4">
                        <div className="relative">
                          {previewUrl && (
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="mx-auto max-h-[200px] rounded-lg object-cover shadow-md"
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20 rounded-lg">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="flex cursor-pointer flex-col items-center gap-4"
                      >
                        <Upload className="h-10 w-10 text-indigo-500 transition-transform hover:scale-105" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Click or drag image here</p>
                          <p className="text-xs text-gray-500">Supported formats: SVG, PNG, JPG, GIF</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="image-upload"
                        />
                      </label>
                    )}
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                  </div>
                </TabsContent>

                <TabsContent value="url" className="mt-0">
                  <div className="space-y-4 py-4">
                    <Input
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setUrlError(false);
                      }}
                      placeholder="Paste image URL..."
                      className="border-gray-200 focus:border-indigo-500"
                    />
                    {urlError && <p className="text-xs text-red-600">Please enter a valid URL</p>}
                    <Input
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Alt text (optional)"
                      className="border-gray-200 focus:border-indigo-500"
                    />
                    <Button
                      onClick={handleInsertEmbed}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                      disabled={!url || uploading}
                    >
                      Insert Image
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}

export default ImagePlaceholder;