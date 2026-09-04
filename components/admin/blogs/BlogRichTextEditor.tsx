"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { FindAndReplace } from "@tiptap/extension-find-and-replace";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { Button } from "@/components/ui/button";

// --- Tiptap Nodes & Styles ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI Menus & Popovers ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import { ColorHighlightPopover } from "@/components/tiptap-ui/color-highlight-popover";
import { LinkPopover } from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import {
  SearchAndReplace,
  SearchAndReplaceButton,
} from "@/components/tiptap-ui/search-and-replace";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { Code, Eye } from "lucide-react";

interface BlogRichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function BlogRichTextEditor({
  value,
  onChange,
  placeholder = "Write your article content here with rich formatting...",
  minHeight = "360px",
}: BlogRichTextEditorProps) {
  const [showRawHtml, setShowRawHtml] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class:
          "tiptap ProseMirror focus:outline-none p-5 text-sm sm:text-base leading-relaxed text-slate-800",
        "data-placeholder": placeholder,
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      FindAndReplace.configure({
        searchDebounceMs: 400,
        injectCSS: false,
      }),
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 5,
        upload: handleImageUpload,
        onError: (error) => console.error("Editor Image Upload Error:", error),
      }),
    ],
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      onChange(html);
    },
  });

  // Keep editor content in sync when value changes externally (e.g. initial edit load)
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    const currentHtml = editor.getHTML();
    if (value !== currentHtml && !editor.isFocused) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden focus-within:border-[#00266A] focus-within:ring-2 focus-within:ring-[#00266A]/10 transition-all">
      <EditorContext.Provider value={{ editor }}>
        {/* Tiptap Toolbar */}
        <Toolbar
          ref={toolbarRef}
          className="border-b border-slate-200 bg-slate-50/90 backdrop-blur-xs p-1.5 flex-wrap gap-1"
        >
          {/* History */}
          <ToolbarGroup>
            <UndoRedoButton action="undo" />
            <UndoRedoButton action="redo" />
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Headings & Lists */}
          <ToolbarGroup>
            <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
            <ListDropdownMenu
              modal={false}
              types={["bulletList", "orderedList", "taskList"]}
            />
            <BlockquoteButton />
            <CodeBlockButton />
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Typography Formatting */}
          <ToolbarGroup>
            <MarkButton type="bold" />
            <MarkButton type="italic" />
            <MarkButton type="strike" />
            <MarkButton type="code" />
            <MarkButton type="underline" />
            <ColorHighlightPopover />
            <LinkPopover />
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Sub/Superscript */}
          <ToolbarGroup>
            <MarkButton type="superscript" />
            <MarkButton type="subscript" />
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Alignment */}
          <ToolbarGroup>
            <TextAlignButton align="left" />
            <TextAlignButton align="center" />
            <TextAlignButton align="right" />
            <TextAlignButton align="justify" />
          </ToolbarGroup>

          <ToolbarSeparator />

          {/* Media / Image Upload */}
          <ToolbarGroup>
            <ImageUploadButton text="Add Image" />
          </ToolbarGroup>

          <Spacer />

          {/* Search & Replace */}
          <ToolbarGroup>
            <SearchAndReplaceButton
              ref={searchButtonRef}
              aria-expanded={isSearchOpen}
              data-active-state={isSearchOpen ? "on" : "off"}
              onClick={toggleSearch}
            />
          </ToolbarGroup>

          {/* Raw HTML Code View Toggle */}
          <div className="flex items-center pl-1 border-l border-slate-200">
            <Button
              type="button"
              variant={showRawHtml ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowRawHtml(!showRawHtml)}
              className="h-7 text-xs font-semibold gap-1 px-2.5 cursor-pointer text-slate-700 hover:text-slate-900"
              title="Toggle Raw HTML View"
            >
              {showRawHtml ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visual Editor</span>
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5" />
                  <span>HTML</span>
                </>
              )}
            </Button>
          </div>
        </Toolbar>

        {/* Search and Replace Popover */}
        <SearchAndReplace
          open={isSearchOpen}
          onOpen={() => setIsSearchOpen(true)}
          onClose={() => {
            setIsSearchOpen(false);
            searchButtonRef.current?.focus();
          }}
          className="absolute z-30"
        />

        {/* Editor Body */}
        {showRawHtml ? (
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (editor && !editor.isDestroyed) {
                editor.commands.setContent(e.target.value, { emitUpdate: false });
              }
            }}
            style={{ minHeight }}
            className="w-full p-4 font-mono text-xs text-slate-100 bg-slate-900 focus:outline-none resize-y"
            placeholder="Edit raw HTML source code..."
          />
        ) : (
          <div
            style={{ minHeight }}
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#10151C] prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-[#334155] prose-a:text-[#00266A] prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-[#00266A] prose-blockquote:bg-slate-50 prose-blockquote:py-1.5 prose-blockquote:px-3.5 prose-blockquote:rounded-r-lg prose-img:rounded-xl overflow-y-auto"
          >
            <EditorContent editor={editor} role="presentation" />
          </div>
        )}
      </EditorContext.Provider>
    </div>
  );
}
