import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

const JsonLd: FC = () => {
  return (
    <section>
      <div className="w-[643px] h-full bg-white px-6 py-3.5">
        <div className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium">
              Schema Type
            </label>
            <Select>
              <SelectTrigger className="w-full h-[52px] text-[#8E99B2] bg-white border border-[#5C6E9A]">
                <SelectValue placeholder="Select schema" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Schemas</SelectLabel>
                  <SelectItem value="1">Apple</SelectItem>
                  <SelectItem value="2">Banana</SelectItem>
                  <SelectItem value="3">Blueberry</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <h4 className="block text-sm font-medium">Global Schema</h4>
            <div className="space-y-2">
              <div>
                <input
                  type="datetime"
                  name="foundingDate"
                  id="foundingDate"
                  placeholder="Founding Date"
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="priceRange"
                  id="priceRange"
                  placeholder="Price Range"
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="founderName"
                  id="founderName"
                  placeholder="Founder Name"
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Founder Bio"
                  className="h-[109px] bg-white border-[#5C6E9A]"
                  maxLength={160}
                  // value={description}
                  // onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="founderSocialProfile"
                  placeholder="Founder Social Profiles"
                  // onChange={(e) => setTitle(e.target.value)}
                  // value={title}
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Business Description"
                  className="h-[109px] bg-white border-[#5C6E9A]"
                  maxLength={160}
                  // value={description}
                  // onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="block text-sm font-medium">Social Profiles</h4>
            <div className="space-y-2">
              <div>
                <input
                  type="text"
                  name="linkedIn"
                  id="linkedIn"
                  placeholder="LinkedIn URL"
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="X"
                  id="X"
                  placeholder="X URL"
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  placeholder="Instagram URL"
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="youtube"
                  id="youtube"
                  placeholder="Youtube URL"
                  className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="tagLine" className="block text-sm font-medium">
              Optional
            </label>
            <input
              type="text"
              name="tagLine"
              id="tagLine"
              placeholder="Tagline"
              className="w-full h-[52px] rounded-md border border-[#5C6E9A] px-4 shadow-xs sm:text-sm"
            />
          </div>

          <div className="my-4 inline-flex gap-4">
            <label htmlFor="append" className="font-medium">
              Automatically append default JSON-LD to every new blog post
            </label>
            <Switch />
          </div>
        </div>
      </div>
      <br />
      <div className="max-w-[643px] h-8 flex justify-end">
        <div className="w-1/3 inline-flex justify-between items-center">
          <p className="text-base font-semibold">Reset</p>
          <Button className="bg-emerald-500 text-white text-base font-semibold">
            Update
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JsonLd;
