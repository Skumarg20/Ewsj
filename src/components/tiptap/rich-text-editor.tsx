// components/tiptap/rich-text-editor.tsx (unchanged from your version)
"use client";
import "./tiptap.css";
import { cn } from "@/lib/utils";
import { ImageExtension } from "@/components/tiptap/extensions/image";
import { ImagePlaceholder } from "@/components/tiptap/extensions/image-placeholder";
import SearchAndReplace from "@/components/tiptap/extensions/search-and-replace";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, type Extension, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TipTapFloatingMenu } from "@/components/tiptap/extensions/floating-menu";
import { FloatingToolbar } from "@/components/tiptap/extensions/floating-toolbar";
import { EditorToolbar } from "./toolbars/editor-toolbar";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

const extensions = [
  StarterKit.configure({
    orderedList: { HTMLAttributes: { class: "list-decimal" } },
    bulletList: { HTMLAttributes: { class: "list-disc" } },
    heading: { levels: [1, 2, 3, 4] },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`;
        case "detailsSummary":
          return "Section title";
        case "codeBlock":
          return "";
        default:
          return "Write, type '/' for commands";
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({ multicolor: true }),
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
  TaskList,
  TaskItem.configure({ nested: true }),
];

type RichTextEditorDemoProps = {
  className?: string;
  initialContent?: JSONContent | string | null;
  onContentChange?: (content: JSONContent) => void;
};

export function RichTextEditorDemo({
  className,
  initialContent,
  onContentChange,
 
}: RichTextEditorDemoProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content:initialContent|| { type: "doc", content: [] },
    editorProps: {
      attributes: { class: "max-w-full max-h-full focus:outline-none" },
    },
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      if (onContentChange) {
        onContentChange(jsonContent);
        console.log("Updated content:", jsonContent);
      }
    },
  });
console.log(initialContent,"this is content comming into editor page")
  if (!editor) return <div className="text-gray-500">Loading editor...</div>;

  return (
    <div
      className={cn(
        "relative max-h-[calc(100vh-6rem)] text-black w-full h-auto bg-white overflow-hidden overflow-y-scroll border bg-card pb-[60px] sm:pb-0 flex flex-col items-center custom-scrollbar",
        className
      )}
    >
      <EditorToolbar editor={editor} />
      <TipTapFloatingMenu editor={editor} />
      <EditorContent
        editor={editor}
        className="h-full w-full bg-white text-black cursor-text sm:p-3 prose prose-sm sm:prose-lg"
      />
    </div>
  );
}