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

interface MetaContentProps {
  data: {
    thumbnail: string | null;
    slug: string | null;
  } | null;
  prevStep: () => void;
  setThumbnailState: React.Dispatch<React.SetStateAction<string | null>>;
  setSlugState: React.Dispatch<React.SetStateAction<string | null>>;
}

export function MetaContent({
  data,
  prevStep,
  setThumbnailState,
  setSlugState,
}: MetaContentProps) {
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailState(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugState(e.target.value);
  };

  return (
    <section className="p-8 bg-[#f8f8f8]">
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

              {!data?.thumbnail ? (
                <input
                  type="file"
                  id="thumbNail"
                  placeholder="Enter thumbnail"
                  onChange={handleThumbnail}
                  className="w-full h-[126px] bg-white rounded-md border border-[#5C6E9A] shadow-xs sm:text-sm"
                />
              ) : (
                <img
                  src={data.thumbnail}
                  alt="thumbnail-img"
                  className="w-full h-[126px] bg-cover bg-no-repeat rounded-md border border-[#5C6E9A] shadow-xs sm:text-sm"
                />
              )}

              <XCircle className="pointer-events-none absolute right-1 top-1 text-gray-300" />
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
                />
                <p className="text-right text-xs font-medium text-[#5C6E9A] mt-1">
                  0/160
                </p>
              </div>

              <input
                type="text"
                id="metaSlugUrl"
                value={`https://zeus.silfrica.com/blog/${data?.slug}`}
                onChange={handleSlug}
                placeholder="https://zeuus.silfrica.com/blog/why-traditional-marketing-ads-fail-to-reach-campuses"
                className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium">
              Category & Tag
            </label>
            <div className="space-y-2">
              <Select>
                <SelectTrigger className="w-full text-[#8E99B2] bg-white border border-[#5C6E9A]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Tags"
                className="h-[109px] bg-white border-[#5C6E9A]"
                maxLength={160}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
