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
import Logo from "/favicon.svg";

const Dashboard: FC = () => {
  return (
    <main className="bg-[#f8f8f8]">
      <section className="flex justify-between h-[88vh]">
        <div className="bg-white hidden lg:flex flex-col items-center min-h-[400px]">
          <aside className="w-[251px] px-4 relative">
            <div className="my-6 w-fit">
              <a href="" className="flex items-center gap-1">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-6 h-6 lg:w-auto lg:h-auto"
                />
                <span className="text-sm font-medium lg:font-bold lg:text-lg">
                  Dashboard
                </span>
              </a>
            </div>
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
                    to="/dashboard/settings"
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
        <section className="w-full max-h-[1028px] overflow-y-scroll">
          <DashboardHeader />
          <div className="w-full px-12 py-6">
            <Outlet />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
