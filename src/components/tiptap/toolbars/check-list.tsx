"use client";

import { CheckSquare } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";

const ChecklistToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, onClick, children, ...props }, ref) => {
		const { editor } = useToolbar();

		if (!editor) return null;

		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							"h-8 w-8 p-0 sm:h-9 sm:w-9",
							editor.isActive("taskList") && "bg-accent",
							className,
						)}
						onClick={(e) => {
							editor.chain().focus().toggleList("taskList", "taskItem").run();
							onClick?.(e);
						}}
						disabled={!editor.can().chain().focus().toggleList("taskList", "taskItem").run()}
						ref={ref}
						{...props}
					>
						{children ?? <CheckSquare className="h-6 w-6" />}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<span>Checklist</span>
				</TooltipContent>
			</Tooltip>
		);
	},
);

ChecklistToolbar.displayName = "ChecklistToolbar";

export { ChecklistToolbar };
