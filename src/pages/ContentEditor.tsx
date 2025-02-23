import "@/styles/editor.css";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@tiptap/extension-font-size";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Undo2, Redo2, X, Smartphone } from "lucide-react";
import type { EditorContent as ContentType } from "@/lib/types";
import { MetaContent } from "@/components/MetaContent";
import { CreateContent } from "@/components/CreateContent";
import PublishPostModal from "@/components/modals/PublishPost";
import { extractThumbnailAndSlug } from "@/lib/utils";

const STORAGE_KEY = "editor-content";

export default function ContentEditor() {
  const [isMounted, setIsMounted] = useState(false);
  const [phonePreview, setPhonePreview] = useState(true);
  const [editorContent, setEditorContent] = useState("");
  const [step, setStep] = useState(1);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [publishModal, setPublishModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "aspect-video rounded-xl",
        },
      }),
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

  // switch case to render different step in creating content
  const renderStep = useMemo(() => {
    switch (step) {
      case 2:
        const data = { thumbnail, slug };
        console.log(data);
        return (
          <MetaContent
            data={data}
            prevStep={prevStep}
            setThumbnailState={setThumbnail}
            setSlugState={setSlug}
          />
        );
      default:
        return (
          <CreateContent
            editor={editor}
            editorContent={editorContent}
            phonePreview={phonePreview}
            setPhonePreview={setPhonePreview}
          />
        );
    }
  }, [step, editor, editorContent, phonePreview, setPhonePreview]);

  useEffect(() => {
    // Example of how you might fetch the content from localStorage (or update it dynamically)
    const savedContent = localStorage.getItem("editor-content");
    if (savedContent) {
      setEditorContent(savedContent);
      const { thumbnail, slug } = extractThumbnailAndSlug(savedContent);
      setThumbnail(thumbnail);
      setSlug(slug);
    }
  }, []); // Runs once on mount

  // Load saved content on mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && editor) {
      const { content } = JSON.parse(saved) as ContentType;
      if (editor.getHTML() !== content) {
        setEditorContent(content);
        // console.log(content);
        editor.commands.setContent(content);
      }
    }
  }, [editor]);

  useEffect(() => {
    if (isMounted && editor && !editor.isFocused) {
      editor.commands.focus();
    }
  }, [isMounted, editor]);

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <div className="min-h-screen bg-white z-10 relative">
      {/* Top Navigation */}
      <header className="flex items-center justify-between md:px-[5%] py-2 border-b">
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

      <div className="md:px-[5%] max-h-screen w-full fixed left-0 overflow-auto bg-[#f8f8f8]">
        {renderStep}
      </div>

      {/* Publish content modal */}
      {publishModal && <PublishPostModal setPublishModal={setPublishModal} />}
    </div>
  );
}
