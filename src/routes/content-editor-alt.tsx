import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEditor } from "@tiptap/react";
import { Redo2, Smartphone, Undo2, X, XCircle } from "lucide-react";
import { useState } from "react";
import RichTextEditor from "reactjs-tiptap-editor";
import type { EditorContent as ContentType } from "@/lib/types";
import {
  BaseKit,
  Bold,
  BulletList,
  FontFamily,
  FontSize,
  Heading,
  Image,
  Indent,
  Italic,
  Link,
  TextAlign,
  Underline,
} from "reactjs-tiptap-editor/extension-bundle";

// Import CSS
import "reactjs-tiptap-editor/style.css";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {
      showOnlyCurrent: true,
    },
  }),
  // Import Extensions Here
  FontFamily,
  FontSize,
  Heading,
  Bold,
  Italic,
  Underline,
  TextAlign,
  BulletList,
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
    HTMLAttributes: {
      class: "aspect-video rounded-xl",
    },
  }),
  Indent,
];

const DEFAULT = "";
const STORAGE_KEY = "editor-content";

export default function CreateContentRouteTwo() {
  const [content, setContent] = useState(DEFAULT);
  const [isMounted, setIsMounted] = useState(false);
  const [phonePreview, setPhonePreview] = useState(true);
  const [editorContent, setEditorContent] = useState("");
  const [step, setStep] = useState(1);
  const [thumbnail, setThumbnail] = useState("");
  const [publishModal, setPublishModal] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Heading,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      FontSize.configure({
        types: ["textStyle"],
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      // Save to local storage on every change
      const content = editor.getHTML();
      setEditorContent(content); // Update content state for preview
      const saveData: ContentType = {
        content,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    },
  });

  const handlePhonePreview = () => {
    if (step === 2) {
      return;
    }
    setPhonePreview((prev) => !prev);
  };

  // handle next step
  const nextStep = () => {
    if (step === 2) {
      setPublishModal(true);
      return;
    }
    setPhonePreview(false);
    setStep(step + 1);
  };

  // handle previous step
  const prevStep = () => {
    if (step === 1) {
      return;
    }
    setStep(step - 1);
  };

  const onChangeContent = (value: any) => {
    setContent(value);
  };

  return (
    <main className="bg-[#f8f8f8] relative">
      <header className="w-full flex items-center justify-between md:px-[5%] py-2 border-b bg-white fixed top-0 left-0 z-50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close Editor</span>
          </Button>
          <span className="text-sm">Close Editor</span>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.commands.undo()}
          >
            <Undo2 className="h-4 w-4" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.commands.redo()}
          >
            <Redo2 className="h-4 w-4" />
            <span className="sr-only">Redo</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePhonePreview}
            className={`${phonePreview ? "bg-gray-400" : "opacity-50"}`}
          >
            <Smartphone className="h-4 w-4" />
            <span className="sr-only">Phone Preview</span>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-P8SMubPV7whKT7i2sliKtKdCWJya0y.png" />
              <AvatarFallback>YE</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Yusrah</span>
              <span className="text-xs text-muted-foreground">Editor</span>
            </div>
          </div>
          <Button
            className="bg-emerald-400 hover:bg-emerald-500"
            onClick={nextStep}
          >
            {step === 2 ? "Publish" : "Next"}
          </Button>
        </div>
      </header>
      <br />
      <br />
      <div className="max-w-screen-2xl mx-auto w-full flex justify-between gap-8 p-8 relative">
        <RichTextEditor
          output="html"
          content={content}
          onChangeContent={onChangeContent}
          extensions={extensions}
          bubbleMenu={{}}
          contentClass={"max-w-7xl w-full"}
        />
        <div className="relative">
          <div className="hidden md:flex w-[320px] flex-shrink-0 fixed right-5 max-h-[calc(80vh-4rem)]">
            <XCircle
              className="absolute top-0 right-0 text-gray-500 cursor-pointer"
              onClick={() => setPhonePreview(false)}
            />
            <div className="relative w-[300px] aspect-[9/19] border-8 border-black rounded-[3rem] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl" />
              <div className="w-full h-full bg-white p-4 overflow-y-auto scroll-bar">
                <div
                  className="prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
