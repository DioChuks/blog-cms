import React from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface SetButtonModalProps {
  setBtnModal: React.Dispatch<React.SetStateAction<boolean>>;
  editor: Editor | null;
}

const SetButtonModal: React.FC<SetButtonModalProps> = ({
  setBtnModal,
  editor,
}) => {
    const [title, setTitle] = React.useState("");
    const [link, setLink] = React.useState("");

    const confirm = () => {
        if (editor) {
            editor.chain().focus().insertContent(
                `<react-component title=${title} link=${link}></react-component>`
            ).run();
        }
        setBtnModal(false);
    };

  return (
    <div className="w-full h-full bg-black/50 flex justify-center items-center absolute inset-0 z-50">
      <div className="bg-white p-8 rounded-md">
        <header className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add a button</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBtnModal(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </header>
        <div className="space-y-4">
          <p className="text-sm">
            Ensure title and link fields are proper and aligned before adding to
            the content.
          </p>
          <div className="flex gap-4">
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="link">Link</label>
              <input
                type="text"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="ghost" onClick={() => setBtnModal(false)}>
              Cancel
            </Button>
            <Button
              className="bg-emerald-400 hover:bg-emerald-500"
              onClick={confirm}
              disabled={!title || !link}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetButtonModal;
