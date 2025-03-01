import { FC, useState } from "react";
import { ContentCardProps } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createPortal } from "react-dom";
import PromptModal from "../modals/PromptModal";

const ContentCard: FC<ContentCardProps> = ({ data }) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const hideContent = () => {
    alert("hiding content...");
  };

  const handleConfirmDelete = () => {
    setIsDeleteModal(true);
  };
  return (
    <>
      <div
        className={`${
          data.is_hidden ? "opacity-50" : ""
        } w-[1065px] h-[89px] px-8 py-4 bg-white rounded-lg justify-center items-center gap-2.5 inline-flex`}
      >
        <div className="grow shrink basis-0 h-[57px] justify-start items-start gap-[51px] flex">
          <div className="justify-start items-start gap-[13px] flex">
            <div className="w-32 h-[53px] bg-teal-600 rounded" />
            <div className="w-[374px] h-[57px] text-black text-base font-medium font-['Poppins'] leading-tight">
              {data.title}
            </div>
          </div>
          <div className="grow shrink basis-0 h-10 justify-start items-center gap-[74px] flex">
            <div className="grow shrink basis-0 h-10 justify-start items-center gap-[57px] flex">
              <div className="text-center text-black text-base font-medium font-['Poppins'] leading-tight">
                {data.date}
                <br />
                {data.time}
              </div>
              <div className="px-[19px] py-px bg-indigo-50 rounded-xl justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="text-center text-black text-sm font-medium font-['Poppins'] tracking-wide">
                  {data.category}
                </div>
              </div>
              <div className="text-center text-black text-sm font-medium font-['Poppins'] tracking-wide">
                {data.clicks} clicks
              </div>
            </div>
            {data.tags.map((tag) => (
              <div className="sr-only px-[19px] py-px bg-indigo-50 rounded-xl justify-center items-start gap-2.5 flex overflow-hidden">
                <div className="text-center text-black text-sm font-medium font-['Poppins'] tracking-wide">
                  {tag}
                </div>
              </div>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <div data-svg-wrapper className="relative cursor-pointer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 12C7 12.5304 6.78929 13.0391 6.41421 13.4142C6.03914 13.7893 5.53043 14 5 14C4.46957 14 3.96086 13.7893 3.58579 13.4142C3.21071 13.0391 3 12.5304 3 12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12ZM14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12ZM21 12C21 12.5304 20.7893 13.0391 20.4142 13.4142C20.0391 13.7893 19.5304 14 19 14C18.4696 14 17.9609 13.7893 17.5858 13.4142C17.2107 13.0391 17 12.5304 17 12C17 11.4696 17.2107 10.9609 17.5858 10.5858C17.9609 10.2107 18.4696 10 19 10C19.5304 10 20.0391 10.2107 20.4142 10.5858C20.7893 10.9609 21 11.4696 21 12Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[229px] h-[172px] p-4 bg-white rounded-lg shadow-[0px_8px_8px_0px_rgba(0,0,0,0.10)] flex-col justify-start items-start inline-flex">
                <div className="self-stretch p-2.5 border-b border-slate-500 justify-start items-center gap-2.5 inline-flex hover:bg-slate-100 cursor-pointer">
                  <p className="text-black text-xs font-['Mulish'] font-semibold tracking-wide">
                    Edit content
                  </p>
                </div>
                <div
                  className="self-stretch p-2.5 border-b border-slate-500 justify-start items-center gap-2.5 inline-flex hover:bg-slate-100 cursor-pointer"
                  onClick={hideContent}
                >
                  <p className="text-black text-xs font-['Mulish'] font-semibold tracking-wide">
                    {data.is_hidden ? "Unhide content" : "Hide content"}
                  </p>
                </div>
                <div
                  className="self-stretch h-[35px] p-2.5 border-b border-slate-500 flex-col justify-center items-start gap-2.5 flex hover:bg-slate-100 cursor-pointer"
                  onClick={() => setIsDeleteModal(true)}
                >
                  <p className="text-black text-xs font-['Mulish'] font-semibold tracking-wide">
                    Delete content
                  </p>
                </div>
                <div className="self-stretch h-[35px] p-2.5 flex-col justify-center items-start gap-2.5 flex hover:bg-slate-100 cursor-pointer">
                  <p className="text-black text-xs font-['Mulish'] font-semibold tracking-wide">
                    View content
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      {/* Delete content modal */}
      {isDeleteModal &&
        createPortal(
          <PromptModal
            title={`Delete This ${data.is_hidden ? "Hidden": ""} Content?`}
            description="Deleting this content will delete it’s associated records from database"
            setPromptModal={setIsDeleteModal}
            promptConfirmContent={handleConfirmDelete}
          />,
          document.body
        )}
    </>
  );
};

export default ContentCard;
