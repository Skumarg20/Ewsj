import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToolbarProvider } from "./toolbar-provider";
import { Editor } from "@tiptap/core";
import { UndoToolbar } from "./undo";
import { RedoToolbar } from "./redo";

import { HeadingsToolbar } from "./headings";
import { BlockquoteToolbar } from "./blockquote";
import { CodeToolbar } from "./code";
import { BoldToolbar } from "./bold";
import { ItalicToolbar } from "./italic";
import { UnderlineToolbar } from "./underline";
import { StrikeThroughToolbar } from "./strikethrough";
import { LinkToolbar } from "./link";
import { BulletListToolbar } from "./bullet-list";
import { OrderedListToolbar } from "./ordered-list";
import { HorizontalRuleToolbar } from "./horizontal-rule";
import { AlignmentTooolbar } from "./alignment";
import { ImagePlaceholderToolbar } from "./image-placeholder-toolbar";
import { ColorHighlightToolbar } from "./color-and-highlight";
import { SearchAndReplaceToolbar } from "./search-and-replace-toolbar";
import { CodeBlockToolbar } from "./code-block";
import { ChecklistToolbar } from "./check-list";
import { motion } from 'framer-motion';

export const EditorToolbar = ({ editor }: { editor: Editor }) => {
  const toolbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  const groupVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
    className="sticky top-0 z-50 w-full h-12  bg-white shadow-sm text-gray-800 "
    variants={toolbarVariants}
    initial="visible"
    animate="visible"
  >
      <ToolbarProvider editor={editor}>
        <TooltipProvider>
        <ScrollArea className="h-full py-0.5 px-1 sm:px-2">
        <div className="flex items-center gap-1 sm:gap-1 whitespace-nowrap">
              {/* History Group */}
              <motion.div className="flex items-center gap-0.5 sm:gap-1" variants={groupVariants} whileHover="hover">
       
        <UndoToolbar />
        <RedoToolbar />
        <Separator orientation="vertical" className="mx-0.5 sm:mx-1 h-5 sm:h-6 bg-gray-300" />
      </motion.div>

              {/* Text Structure Group */}
              <motion.div className="flex items-center gap-1" variants={groupVariants} whileHover="hover">
                
                <HeadingsToolbar />
                <BlockquoteToolbar />
                <CodeToolbar />
                <CodeBlockToolbar />
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-300" />
              </motion.div>

              {/* Basic Formatting Group */}
              <motion.div className="flex items-center gap-1" variants={groupVariants} whileHover="hover">
                <BoldToolbar />
                <ItalicToolbar />
                <UnderlineToolbar />
                <StrikeThroughToolbar />
                <LinkToolbar />
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-300" />
              </motion.div>

              {/* Lists & Structure Group */}
              <motion.div className="flex items-center gap-1" variants={groupVariants} whileHover="hover">
               <ChecklistToolbar />
                <BulletListToolbar />
                <OrderedListToolbar />
                <HorizontalRuleToolbar />
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-300" />
              </motion.div>

              {/* Alignment Group */}
              <motion.div className="flex items-center gap-1" variants={groupVariants} whileHover="hover">
                
                <AlignmentTooolbar />
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-300" />
              </motion.div>

              {/* Media & Styling Group */}
              <motion.div className="flex items-center gap-1" variants={groupVariants} whileHover="hover">
               
                <ImagePlaceholderToolbar />
                <ColorHighlightToolbar />
                <Separator orientation="vertical" className="mx-1 h-6 bg-gray-300" />
              </motion.div>

              <div className="flex-1 min-w-0" /> {/* Spacer, prevents overflow */}

              {/* Utility Group */}
              <motion.div className="flex items-left gap-1 mr-10 ml-0 " variants={groupVariants} whileHover="hover">
            
                <SearchAndReplaceToolbar />
              </motion.div>
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />{/* Visible scrollbar if needed */}
          </ScrollArea>
        </TooltipProvider>
      </ToolbarProvider>
    </motion.div>
  );
};