import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewUser } from "@/lib/types";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const NewUserModal: React.FC = () => {
  const [userKey, setUserKey] = useState("");
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<NewUser>({
    name: "",
    email: "",
    role: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (value: string) => {
    setUser((prev) => ({ ...prev, role: value }));
  };

  const handleCopyAccessKey = async () => {
    try {
      await navigator.clipboard.writeText(userKey);
      toast.success("Access key copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy access key");
      console.error("Copy failed:", err);
    } finally {
      setIsGenerating(false);
      setStep(1);
    }
  };

  const handleNewUser = async () => {
    // send request to api, response is generated key, then set key
    setIsGenerating(true);
    try {
      // Validate required fields
      if (!user.name || !user.email || !user.role) {
        toast.error("Please fill in all required fields");
        setIsGenerating(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        toast.error("Please enter a valid email address");
        setIsGenerating(false);
        return;
      }

      console.log(user);

      // TODO: Add API call here
      // const response = await fetch('/api/users', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(user),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to create user');
      // }

      // const data = await response.json();
      // setUserKey(data.accessKey);

      // Temporary mock response
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      setUserKey("shdenek83hesnsdda92h");
      setStep(2);
      toast.success("User created successfully!");
      setUser({
        name: '',
        email: '',
        role: ''
      })
    } catch (error) {
      console.error("Failed to create user:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create user"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-teal-600 text-white font-semibold text-sm"
        >
          Add new user
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Add new user" : "Access Key Generated"}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Add a new user here. Click generate key when you're done."
              : "Once copied, can't be seen on this dialog box! Ensure to store in safe place!"}
          </DialogDescription>
        </DialogHeader>
        {step === 1 ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="col-span-3"
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  maxLength={50}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="col-span-3"
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  name="role"
                  value={user.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Reader">Reader</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={isGenerating}
                  type="button"
                  variant="secondary"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isGenerating}
                type="submit"
                className="bg-emerald-500 text-white"
                onClick={handleNewUser}
              >
                {isGenerating ? "Generating..." : "Generate Key"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 py-4">
            <p>😮‍💨</p>
            <p>{userKey}</p>
            <div
              className="items-center gap-[7px] inline-flex cursor-pointer"
              onClick={handleCopyAccessKey}
            >
              <Copy className="text-teal-600" />
              <div className="text-teal-600 text-sm font-medium tracking-tight">
                Copy
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewUserModal;
