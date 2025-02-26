import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Underline,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  List,
  ListOrdered,
  Square,
  Gamepad,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import SetButtonModal from "./modals/SetButton";
import { createPortal } from "react-dom";

interface EditorMenuBarProps {
  editor: Editor | null;
}

export function EditorMenuBar({ editor }: EditorMenuBarProps) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt("Enter URL");
    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().toggleLink({ href: url }).run();
  };

  const setBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  const addFontSize = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value) {
      return;
    }
    value = value + "px";
    editor.chain().focus().setFontSize(value).run();
  };

  const [btnModal, setBtnModal] = useState(false);

  const setButton = () => {
    setBtnModal(true);
  };

  return (
    <div className="w-fit flex items-center gap-2 mb-6 p-2 bg-white rounded-lg shadow-lg sticky top-0 z-20">
      <Select
        defaultValue="Montserrat"
        onValueChange={(value) =>
          editor.chain().focus().setFontFamily(value).run()
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Montserrat">Montserrat</SelectItem>
          <SelectItem value="Arial">Arial</SelectItem>
          <SelectItem value="Helvetica">Helvetica</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="mx-2 h-6" />

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={() => editor.chain().focus().setFontSize("16px").run()}
        >
          -
        </Button>
        <input
          type="text"
          className="text-sm w-5"
          placeholder="32"
          maxLength={2}
          onChange={addFontSize}
        />
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={() => editor.chain().focus().setFontSize("32px").run()}
        >
          +
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-2 h-6" />

      <Button
        variant={
          editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
        }
        size="sm"
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-emerald-100 hover:bg-emerald-200 text-black"
            : ""
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <Button
        variant={
          editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
        }
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Button>
      <Button
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("underline") ? "secondary" : "ghost"}
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-2 h-6" />

      <Button
        variant={editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"}
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant={
          editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"
        }
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant={
          editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"
        }
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-2 h-6" />

      <Button
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-2 h-6" />

      <Button variant="ghost" size="icon" onClick={addImage}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("link") ? "secondary" : "ghost"}
        size="icon"
        onClick={setLink}
      >
        <Link2 className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
        size="icon"
        onClick={setBlockquote}
      >
        <Square className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("button") ? "secondary" : "ghost"}
        size="icon"
        onClick={setButton}
      >
        <Gamepad className="h-4 w-4" />
      </Button>

      {btnModal &&
        createPortal(
          <SetButtonModal
            setBtnModal={setBtnModal}
            editor={editor}
          />,
          document.body
        )}
    </div>
  );
}
