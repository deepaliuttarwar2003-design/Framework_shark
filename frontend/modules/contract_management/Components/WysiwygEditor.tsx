"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "radix-ui";

const toolbarButtons = [
    { label: "B", command: "bold" },
    { label: "I", command: "italic" },
    { label: "U", command: "underline" },
    { label: "Bullets", command: "insertUnorderedList" },
    { label: "Numbered", command: "insertOrderedList" },
    { label: "Link", command: "createLink" },
    { label: "Undo", command: "undo" },
    { label: "Redo", command: "redo" },
    { label: "file upload", command: "fileUpload" },
    { label: "Image", command: "insertImage" },
    { label: "insertImage", command: "insertImage" },
    { label: "view source", command: "viewSource" },
    { label: "line spacing", command: "lineSpacing" },
    { label: "text color", command: "textColor" },
    { label: "tools", command: "tools" }
];

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function WysiwygEditor({ value, onChange }: Props) {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [html, setHtml] = useState(value);

    useEffect(() => {
        setHtml(value);
    }, [value]);

    const applyCommand = (command: string) => {
        if (command === "createLink") {
            const url = window.prompt("Enter URL:", "https://");
            if (!url) return;
            document.execCommand(command, false, url);
        } else {
            document.execCommand(command, false, undefined);
        }

        const content = editorRef.current?.innerHTML || "";
        setHtml(content);
        onChange(content);
        editorRef.current?.focus();
    };

    const handleInput = () => {
        const content = editorRef.current?.innerHTML || "";
        setHtml(content);
        onChange(content);
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                {toolbarButtons.map((button) => (
                    <Button
                        key={button.command}
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => applyCommand(button.command)}
                    >
                        {button.label}
                    </Button>
                ))}
            </div>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-55 rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-7 text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
