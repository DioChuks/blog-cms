import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, XCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { MetaPayload } from "@/lib/types";
import { createPortal } from "react-dom";
import PromptModal from "./modals/PromptModal";

interface MetaContentProps {
  data: {
    thumbnail: string | null;
    slug: string | null;
  };
  prevStep: () => void;
  isPublishedModal: boolean;
  setIsPublishedModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleMetaData: (metaPayload: MetaPayload) => void;
}

export function MetaContent({
  data,
  prevStep,
  isPublishedModal,
  setIsPublishedModal,
  handleMetaData,
}: MetaContentProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(data.thumbnail);
  const [slug, setSlug] = useState<string | null>(data.slug);
  const [category, setCategory] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleTagInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLTextAreaElement).value.trim();

    // Check if spacebar or enter is pressed and there's valid input
    if ((e.key === " " || e.key === "Enter") && value.length > 0) {
      e.preventDefault(); // Prevent default behavior

      // Split the input by spaces to handle multiple tags
      const newTags = value
        .split(" ")
        .filter((tag) => tag.length > 0 && !tags.includes(tag.toLowerCase()));

      if (newTags.length > 0) {
        setTags((prev) => [...prev, ...newTags]);
        setCurrentTag(""); // Clear the input
      }
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // Remove any newline characters that might have been added
    setCurrentTag(value.replace(/\n/g, ""));
  };

  const handleCategoryChange = (v: string) => {
    setCategory(parseInt(v));
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const baseUrl = "https://zeuus.silfrica.com/blog/";

  // Update the handleSlug function
  const handleSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("slug: ", e.target.value);
    const inputValue = e.target.value;

    // If it's empty, set empty string
    if (!inputValue) {
      setSlug(null);
      return;
    }

    // If input starts with baseUrl, only take what comes after
    if (inputValue.startsWith(baseUrl)) {
      inputValue.slice(baseUrl.length);
    }

    // regex to check for invalid characters like whitespaces and special characters
    const regex = /^[a-z0-9-]+$/;

    // Convert to lowercase and replace spaces with hyphens
    const formattedSlug = inputValue.toLowerCase().replace(/\s+/g, "-");

    // Only update if the formatted slug matches our valid characters regex
    if (!regex.test(formattedSlug)) {
      return;
    }
    setSlug(formattedSlug);
  };

  const handleConfirmPublishContent = () => {
    // setPublishModal(false);

    // return the meta payload to the parent component
    // to be used in the final publish content function
    const metaPayload = {
      thumbnail,
      slug,
      title,
      description,
      category,
      tags,
    };
    console.log(metaPayload);
    handleMetaData(metaPayload);
  };

  return (
    <section className="p-8 bg-[#f8f8f8] pb-16">
      <span
        className="inline-flex gap-2 font-medium cursor-pointer"
        onClick={prevStep}
      >
        <ArrowLeft /> Back
      </span>
      <div className="w-[575px] mx-auto h-full space-y-4">
        <header className="text-center max-w-[381px] mx-auto space-y-1">
          <h1 className="font-semibold text-lg md:text-2xl">Post-content</h1>
          <p className="font-medium text-sm">
            This fields are crucial to ensuring this content ranks well on
            Google & other search engines
          </p>
        </header>
        <div className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium">
              Thumbnail
            </label>
            <div className="relative">
              <label htmlFor="thumbNail" className="sr-only">
                {" "}
                Thumbnail{" "}
              </label>

              {!thumbnail ? (
                <input
                  type="file"
                  id="thumbNail"
                  placeholder="Enter thumbnail"
                  onChange={handleThumbnail}
                  className="w-full h-[126px] bg-white rounded-md border border-[#5C6E9A] shadow-xs sm:text-sm"
                />
              ) : (
                <img
                  src={thumbnail as string}
                  alt="thumbnail-img"
                  className="w-full h-[126px] bg-cover bg-no-repeat rounded-md border border-[#5C6E9A] shadow-xs sm:text-sm"
                />
              )}

              <XCircle className="absolute right-1 top-1 text-gray-300 hover:text-red-600 hover:drop-shadow-md z-10 cursor-pointer" />
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium">
              Metadata
            </label>
            <div className="space-y-2">
              <div>
                <input
                  type="text"
                  id="metaTitle"
                  placeholder="Meta Title"
                  maxLength={60}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
                <p className="text-right text-xs font-medium text-[#5C6E9A] mt-1">
                  0/60
                </p>
              </div>

              <div>
                <Textarea
                  placeholder="Meta Description"
                  className="h-[109px] bg-white border-[#5C6E9A]"
                  maxLength={160}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-right text-xs font-medium text-[#5C6E9A] mt-1">
                  0/160
                </p>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  {baseUrl}
                </span>
                <input
                  type="text"
                  id="metaSlugUrl"
                  value={slug ?? ""}
                  readOnly={slug !== null && slug.length > 1}
                  onChange={handleSlug}
                  placeholder="your-post-slug"
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] pl-[270px] pr-4 shadow-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium">
              Category & Tag
            </label>
            <div className="space-y-2">
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full text-[#8E99B2] bg-white border border-[#5C6E9A]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="1">Apple</SelectItem>
                    <SelectItem value="2">Banana</SelectItem>
                    <SelectItem value="3">Blueberry</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-white border border-[#5C6E9A] rounded-md">
                  {tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-md flex items-center gap-1"
                      >
                        {tag}
                        <XCircle
                          className="h-4 w-4 cursor-pointer hover:text-red-500"
                          onClick={() => removeTag(tag)}
                        />
                      </span>
                    ))
                  ) : (
                    <input
                      type="text"
                      className="w-full placeholder:text-sm placeholder:text-[#8E99B2]"
                      placeholder="Tags will be displayed here!"
                      readOnly
                    />
                  )}
                </div>

                <Textarea
                  placeholder="Type a tag and press space or enter to add it"
                  className="h-[109px] bg-white border-[#5C6E9A]"
                  maxLength={160}
                  value={currentTag}
                  onChange={handleTagChange}
                  onKeyDown={handleTagInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish content modal */}
      {isPublishedModal &&
        createPortal(
          <PromptModal
            title="Publish Content?"
            description="Ensure content and meta fields are proper and aligned before
                pushing content live"
            setPromptModal={setIsPublishedModal}
            promptConfirmContent={handleConfirmPublishContent}
          />,
          document.body
        )}
    </section>
  );
}
