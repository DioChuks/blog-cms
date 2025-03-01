import { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContentCard from "@/components/cards/ContentCard";
import { contentData } from "@/mock/content-data";

const PAGE_SIZE = 6;

const Content: FC = () => {
  const [category, setCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter content by category
  const filteredContent = category === "all" 
    ? contentData 
    : contentData.filter(item => item.category === category);

  // Calculate pagination
  const totalPages = Math.ceil(filteredContent.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedContent = filteredContent.slice(startIndex, startIndex + PAGE_SIZE);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <section className="min-h-screen relative">
      <header className="lg:ml-[11%] xl:ml-[14.5%]">
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose Category</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Campaign">Campaign</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>
      <br />
      <div className="w-fit mx-auto flex flex-col gap-4">
      {paginatedContent.map((data) => (
          <ContentCard key={data.title} data={data} />
        ))}
      </div>
      <br />
      {totalPages > 1 && (
        <div className="flex items-center justify-center w-full">
          <div className="w-[436px] h-[56px] flex items-center justify-evenly">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-14 h-14 rounded flex items-center justify-center 
                  ${currentPage === index + 1 
                    ? "bg-[#03937E] text-white" 
                    : "border border-black hover:bg-gray-100"
                  } transition-colors cursor-pointer`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Content;
