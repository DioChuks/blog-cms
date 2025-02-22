import { FC } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { Link, Outlet } from "react-router-dom";
import {
  Book,
  HomeIcon,
  InboxIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import Button from "../components/buttons/Button";

const Dashboard: FC = () => {
  return (
    <section className="bg-[#f8f8f8]">
      <DashboardHeader />
      <section className="flex justify-between h-[88vh]">
        <div className="bg-white hidden lg:flex flex-col items-center min-h-[400px]">
          <aside className="w-[251px] px-4 relative">
            <br />
            <h3 className="text-sm text-[#CED1D6] font-medium px-4 mb-6">
              MENU
            </h3>
            <nav className="relative h-full">
              <ul className="space-y-6">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex gap-1 items-center text-dark-blue-gray hover:text-forest-green-700 px-4 py-2 rounded fade-in-right"
                  >
                    <HomeIcon />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/content"
                    className="flex gap-1 items-center text-dark-blue-gray hover:text-forest-green-700 px-4 py-2 rounded fade-in-bottom"
                  >
                    <Book />
                    Content
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/"
                    className="flex gap-1 items-center text-dark-blue-gray hover:text-forest-green-700 px-4 py-2 rounded fade-in-left"
                  >
                    <InboxIcon />
                    Campaigns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/"
                    className="flex gap-1 items-center text-dark-blue-gray hover:text-forest-green-700 px-4 py-2 rounded fade-in-bottom"
                  >
                    <SettingsIcon />
                    Settings
                  </Link>
                </li>
              </ul>
              <br />
              <br />
              <Button
                kind="button"
                title="Create"
                cnames="bg-zs-black w-full h-[48px] text-white fade-in-left"
                onclick={() => {
                  window.location.href = "/create-content";
                }}
              />
            </nav>
          </aside>
          <div className="absolute bottom-0 h-[45px] border-t w-[251px] flex items-center">
            {/* exit icon */}
            <p className="flex items-center gap-1">
              <LogOutIcon className="w-6 h-6 ml-4 text-dark-blue-gray" />
              <a href="/learnboard" className="text-dark-blue-gray font-normal">
                Log Out
              </a>
            </p>
          </div>
        </div>
        <div className="w-full max-h-[1028px] overflow-y-scroll p-6">
          <Outlet />
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
