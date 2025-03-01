import ContentRecommendations from "@/components/ContentRecommendations";
import EditorProfiles from "@/components/EditorProfiles";
import JsonLd from "@/components/JsonLd";
import UserManagement from "@/components/UserManagement";
import { ChevronRight } from "lucide-react";
import { FC, useState } from "react";

const Settings: FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return <UserManagement />;
      case 1:
        return <EditorProfiles />;
      case 2:
        return <JsonLd />;
      case 3:
        return <ContentRecommendations />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <section className="min-h-screen relative">
      <header>
        <h2 className="text-2xl font-bold">Settings</h2>
      </header>
      <br />
      <div className="flex gap-4 xl:gap-8">
        <div className="w-[246px] h-fit bg-white rounded-xl flex-col justify-start items-start inline-flex">
          <div
            className={`self-stretch p-2.5 justify-between items-center inline-flex cursor-pointer ${activeTab === 0 ? 'bg-indigo-50': ''} hover:bg-indigo-50`}
            onClick={() => setActiveTab(0)}
          >
            <div className="text-slate-500 text-sm font-semibold tracking-wide">
              User Management
            </div>
            <ChevronRight className="text-slate-500" size={24} />
          </div>
          <div
            className={`self-stretch p-2.5 justify-between items-center inline-flex cursor-pointer ${activeTab === 1 ? 'bg-indigo-50': ''} hover:bg-indigo-50`}
            onClick={() => setActiveTab(1)}
          >
            <div className="text-slate-500 text-sm font-semibold tracking-wide">
              Editor Profiles
            </div>
            <ChevronRight className="text-slate-500" size={24} />
          </div>
          <div
            className={`self-stretch p-2.5 justify-start items-center gap-2.5 inline-flex cursor-pointer ${activeTab === 2 ? 'bg-indigo-50':''} hover:bg-indigo-50`}
            onClick={() => setActiveTab(2)}
          >
            <div className="text-slate-500 text-sm font-semibold tracking-wide">
              JSON-LD Settings
            </div>
          </div>
          <div
            className={`self-stretch p-2.5 justify-start items-center gap-2.5 inline-flex cursor-pointer ${activeTab === 3 ? 'bg-indigo-50':''} hover:bg-indigo-50`}
            onClick={() => setActiveTab(3)}
          >
            <div className="text-slate-500 text-sm font-semibold tracking-wide">
              Content Recommendations
            </div>
          </div>
        </div>

        {/* render activeTab components */}
        <div className="w-full">{renderTab()}</div>
      </div>
    </section>
  );
};

export default Settings;
