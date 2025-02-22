import { type Editor, EditorContent } from "@tiptap/react";
import { EditorMenuBar } from "./EditorMenuBar";
import { Dispatch, SetStateAction } from "react";
import { XCircle } from "lucide-react";

interface CreateContentProps {
  editor: Editor | null;
  phonePreview: boolean;
  editorContent: string;
  setPhonePreview: Dispatch<SetStateAction<boolean>>;
}

export function CreateContent({
  editor,
  phonePreview,
  editorContent,
  setPhonePreview,
}: CreateContentProps) {
  return (
    <div className="flex gap-8 p-8 bg-[#f8f8f8]">
      {/* Editor Section */}
      <div className="flex-1">
        <EditorMenuBar editor={editor} />

        {/* Content Area */}
        <div className="prose prose-lg max-w-none z-20">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Phone Preview */}
      {phonePreview && (
        <div className="w-[320px] flex-shrink-0 relative">
          <div className="sticky top-0 z-20">
            <XCircle
              className="absolute top-0 right-0 text-gray-500 cursor-pointer"
              onClick={() => setPhonePreview(false)}
            />
            <div className="relative w-[300px] aspect-[9/19] border-8 border-black rounded-[3rem] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl" />
              <div className="w-full h-full bg-white p-4 overflow-y-auto scroll-bar mt-4">
                <div
                  className="prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: editorContent }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
