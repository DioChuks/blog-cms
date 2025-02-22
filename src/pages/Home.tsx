import { FC } from "react";
import NoteIcon from "../assets/note-icon.svg";
import PeopleIcon from "../assets/people-icon.svg";
import HeartIcon from "../assets/heart-icon.svg";
import PieIcon from "../assets/pie-icon.svg";
import HomeCard from "../components/cards/HomeCard";
import Visitors from "../components/charts/Visitors";
import BlogList from "../components/cards/HomeArticleCard";
import DeviceStats from "../components/DeviceStats";

const Home: FC = () => {
  const cardData = [
    {
      icon: NoteIcon,
      title: "Articles",
      value: 23,
    },
    {
      icon: PeopleIcon,
      title: "Visitors",
      value: 248,
    },
    {
      icon: HeartIcon,
      title: "Clicks",
      value: "22,627",
    },
    {
      icon: PieIcon,
      title: "Time Spent",
      value: "22h",
    },
  ];
  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cardData.map((card, index) => (
          <HomeCard
            key={index}
            icon={card.icon}
            value={card.value}
            title={card.title}
          />
        ))}
      </section>
      <section className="my-6">
        <div className="w-full h-fit bg-white rounded-xl p-6">
          <Visitors />
        </div>
      </section>
      <section className="my-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="h-72 rounded-lg bg-white lg:col-span-2 py-4">
            <BlogList />
          </div>
          <div className="h-72 rounded-lg bg-white">
            <DeviceStats />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
