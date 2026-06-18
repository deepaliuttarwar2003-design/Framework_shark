"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const toolbarButtons = [
    { label: "B", command: "bold" },
    { label: "I", command: "italic" },
    { label: "U", command: "underline" },
    { label: "Bullets", command: "insertUnorderedList" },
    { label: "Numbered", command: "insertOrderedList" },
    { label: "Link", command: "createLink" },
    { label: "Undo", command: "undo" },
    { label: "Redo", command: "redo" },
    { label: "Image", command: "insertImage" },
    { label: "View", command: "viewSource" },
    { label: "Spacing", command: "lineSpacing" },
    { label: "Color", command: "textColor" },
    { label: "Tools", command: "tools" },
];

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function WysiwygEditor({ value, onChange }: Props) {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [html, setHtml] = useState(value || "");

    useEffect(() => {
        setHtml(value || "");
    }, [value]);

    const applyCommand = (command: string) => {
        editorRef.current?.focus();

        if (command === "createLink") {
            const url = window.prompt("Enter URL:", "https://");
            if (!url) return;
            document.execCommand(command, false, url);
            return;
        }

        // basic supported commands
        const supportedCommands = [
            "bold",
            "italic",
            "underline",
            "insertUnorderedList",
            "insertOrderedList",
            "undo",
            "redo",
            "insertImage",
        ];

        if (supportedCommands.includes(command)) {
            document.execCommand(command, false);
        }

        const content = editorRef.current?.innerHTML || "";
        setHtml(content);
        onChange(content);
    };

    const handleInput = () => {
        const content = editorRef.current?.innerHTML || "";
        setHtml(content);
        onChange(content);
    };

    return (
        <div className="space-y-3">

            {/* TOOLBAR */}
            <div className="flex flex-wrap gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                {toolbarButtons.map((button, index) => (
                    <Button
                        key={`${button.command}-${index}`}
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => applyCommand(button.command)}
                    >
                        {button.label}
                    </Button>
                ))}
            </div>

            {/* EDITOR */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-40 rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}