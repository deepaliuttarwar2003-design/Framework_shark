"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Blockquote } from "@tiptap/extension-blockquote";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    LinkIcon,
    ImageIcon,
    TableIcon,
    Quote,
    Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    content: string;
    onChange: (value: string) => void;
}

export function WysiwygEditor({
    content,
    onChange,
}: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,

            Underline,

            Image.configure({
                inline: false,
                allowBase64: true,
                HTMLAttributes: {
                    class: "editor-image",
                },
            }),

            Link.configure({
                openOnClick: false,
            }),

            TextStyle,
            Color,
            Highlight,
            HorizontalRule,
            Blockquote,

            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),

            Table.configure({
                resizable: true,
            }),

            TableRow,
            TableHeader,
            TableCell,
        ],
        content,

        immediatelyRender: false,

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt("Enter Image URL");

        if (!url) return;

        if (!url.startsWith("http")) {
            alert("Invalid image URL");
            return;
        }

        editor.chain().focus().setImage({ src: url }).run();
    };

    const addLink = () => {
        const url = window.prompt("Enter URL");

        if (!url) return;

        if (!url.startsWith("http")) {
            alert("Invalid URL");
            return;
        }

        editor.chain().focus().setLink({ href: url }).run();
    };

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="flex flex-wrap gap-2 p-2 border-b bg-muted">
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <UnderlineIcon size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                >
                    <AlignLeft size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                >
                    <AlignCenter size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                >
                    <AlignRight size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addLink}
                >
                    <LinkIcon size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addImage}
                >
                    <ImageIcon size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .insertTable({
                                rows: 3,
                                cols: 3,
                                withHeaderRow: true,
                            })
                            .run()
                    }
                >
                    <TableIcon size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <Quote size={16} />
                </Button>

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    <Minus size={16} />
                </Button>

                <input
                    type="color"
                    onChange={(e) =>
                        editor
                            .chain()
                            .focus()
                            .setColor(e.target.value)
                            .run()
                    }
                />
            </div>

            <EditorContent
                editor={editor}


                className="h-62.5 overflow-y-auto p-4 bg-white"
            />

            // </div>

    );
}