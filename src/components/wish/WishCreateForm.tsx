"use client";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export default function WishCreateForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const user = useQuery(api.users.getCurrentUserData);

  const generateUploadURL = useMutation(api.wish.generateUploadURL);
  const createWish = useMutation(api.wish.createWish);

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFile(file);

    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(user);
      if (!user) {
        throw new Error("Unauthorized");
      }

      const formData = new FormData(e.currentTarget);

      const sendURL = await generateUploadURL();

      const response = await fetch(sendURL, {
        method: "POST",
        headers: { "Content-Type": imageFile!.type },
        body: imageFile!,
      });

      if (!response.ok) {
        console.error(response);
        throw new Error("Failed to send image");
      }

      const { storageId } = await response.json();

      await createWish({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        amount: Number(formData.get("amount")),
        imageUrl: storageId,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create wish");
    }
  };

  return (
    <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
      <div className="flex h-full w-full gap-4">
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4 *:h-12 *:max-w-sm">
          <Input type="text" placeholder="Wish Name" name="name" />
          <Input
            type="text"
            placeholder="Wish Description"
            name="description"
          />
          <Input type="number" placeholder="Wish Amount" name="amount" />
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4 *:max-w-sm *:text-center">
          <Input
            type="file"
            name="imageUrl"
            onChange={handleInputImage}
            accept="image/*"
          />
          <div className="m-10 flex h-60 w-full items-center justify-center rounded-2xl bg-neutral-700 p-2">
            <div className="relative flex h-full w-full items-center justify-center rounded-md text-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Wish Image"
                  fill
                  className="rounded-md object-cover"
                />
              ) : (
                <span>Upload an image to see a preview here</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}
