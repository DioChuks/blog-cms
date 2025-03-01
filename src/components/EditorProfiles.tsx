import { FC, useState } from "react";
import FvAvatar from "@/assets/family-values-avatar.png";
import GirlAvatar from "@/assets/girl-avatar.png";
import { editorProfiles } from "@/mock/editor-profiles";
import { EditorProfile } from "@/lib/types";
import NewProfileModal from "./modals/NewProfileModal";
import { createPortal } from "react-dom";
import PromptModal from "./modals/PromptModal";

const EditorProfiles: FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<EditorProfile | null>(null);
  const [active, setActive] = useState(0);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleProfileClick = (profile: EditorProfile, index: number) => {
    setSelectedProfile(profile);
    setActive(index);
  };

  const handleProfileDelete = () => {
    alert('deleted!');
    setIsDeleteModal(false);
  }
  // on mount fetch editor profiles and display 'em
  // for now use mock profiles
  return (
    <div className="flex md:gap-5 xl:gap-8">
      <div className="w-[541px] h-fit flex-col justify-start items-start gap-1.5 inline-flex">
        {editorProfiles ? editorProfiles.map((profile, index) => (
          <div key={index}
            className={`w-full h-16 relative ${active === index + 1 ? 'bg-zinc-100' : 'bg-white hover:bg-zinc-100'} rounded-tl-xl rounded-tr-xl overflow-hidden`}
            onClick={() => handleProfileClick(profile, index+1)}>
            <div className="left-[18px] top-[5px] absolute justify-start items-center gap-2 inline-flex">
              <div className="w-[54px] h-[54px] relative">
                <div className="w-[54px] h-[54px] left-0 top-0 absolute bg-purple-950 rounded-full" />
                <img
                  className="w-[54px] h-[54px] left-0 top-0 absolute"
                  src={FvAvatar}
                />
              </div>
              <div className="text-black text-base font-medium tracking-wide">
                {profile.name}
              </div>
            </div>
            <div className="px-[19px] py-px left-[221px] top-[21px] absolute bg-indigo-50 rounded-xl justify-center items-start gap-2.5 inline-flex overflow-hidden">
              <div className="text-center text-black text-sm font-medium font-['Poppins'] tracking-wide">
                {profile.category}
              </div>
            </div>
            <div data-svg-wrapper className="left-[421px] top-[20px] absolute">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.475 5.40783L18.592 7.52483M17.836 3.54283L12.109 9.26983C11.8122 9.56467 11.6102 9.94144 11.529 10.3518L11 12.9998L13.648 12.4698C14.058 12.3878 14.434 12.1868 14.73 11.8908L20.457 6.16383C20.6291 5.99173 20.7656 5.78742 20.8588 5.56256C20.9519 5.33771 20.9998 5.09671 20.9998 4.85333C20.9998 4.60994 20.9519 4.36895 20.8588 4.14409C20.7656 3.91923 20.6291 3.71492 20.457 3.54283C20.2849 3.37073 20.0806 3.23421 19.8557 3.14108C19.6309 3.04794 19.3899 3 19.1465 3C18.9031 3 18.6621 3.04794 18.4373 3.14108C18.2124 3.23421 18.0081 3.37073 17.836 3.54283Z"
                  stroke="#5C6E9A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 15V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H9"
                  stroke="#5C6E9A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div data-svg-wrapper className="left-[476px] top-[20px] absolute cursor-pointer text-[#5C6E9A] hover:text-red-500" onClick={() => setIsDeleteModal(true)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        )) : (<p>No editor profiles.</p>)}
        <br />
        <NewProfileModal />
      </div>

      {/* editor profile preview */}
      <div className="w-[290px] h-36 pl-[7px] pr-1.5 pt-5 pb-7 bg-white rounded-xl overflow-hidden">
        <h3 className="text-slate-500 text-xs font-medium tracking-tight">
          Preview
        </h3>
        {selectedProfile && (<div className="w-[277px] h-[74px] relative justify-center items-center inline-flex">
          <div className="w-[277px] left-0 top-[10.01px] px-2 absolute text-center text-black text-[12.87px] font-semibold font-['Poppins'] tracking-tight">
            Why traditional marketing ads fail to reach campuses{" "}
          </div>
          <div className="w-[38px] left-[114px] top-0 absolute text-center text-teal-600 text-[5.72px] font-medium tracking-tight">
            Business
          </div>
          <div className="w-fit h-auto left-[98.69px] top-[58.27px] absolute justify-start items-start gap-[5.72px] inline-flex">
            <div className="w-[15.73px] h-[15.73px] relative">
              <div className="w-[15.73px] h-[15.73px] relative">
                <div className="w-[15.73px] h-[15.73px] left-[-2.01px] top-0 absolute bg-zinc-300 rounded-full" />
                <img
                  className="w-[15.73px] h-[15.73px] left-[-2.01px] top-0 absolute"
                  src={GirlAvatar}
                />
              </div>
            </div>
            <div className="text-black text-[7.72px] font-medium tracking-tight">
              {`${selectedProfile.name} (${selectedProfile.category})`}
              <br />
              February 14th, 2025
            </div>
          </div>
        </div>
        )}
      </div>

      {/* delete prompt modal */}
      {isDeleteModal &&
        createPortal(
          <PromptModal
            title="Delete profile?"
            description="Deleting writer profile will revert articles to default writer profile"
            setPromptModal={setIsDeleteModal}
            promptConfirmContent={handleProfileDelete}
          />,
          document.body
        )}
    </div>
  );
};

export default EditorProfiles;
