"use client";
import { useQuery } from "convex/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useCreateWishForm } from "@/forms/CreateWishForm";

export default function WishCreateForm() {
  const categories = useQuery(api.categories.getAllCategories);

  const [imageUrl, setImageUrl] = useState<string>("");

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    f.setFieldValue("localImageURL", url);
  };

  const f = useCreateWishForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    f.handleSubmit();
  };

  return (
    <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
      <div className="flex h-full w-full gap-4">
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4 *:w-full *:max-w-sm">
          <f.AppField name="name">
            {(field) => <field.FormInput label="Item Name" />}
          </f.AppField>
          <f.AppField name="description">
            {(field) => <field.FormTextArea label="Item Description" />}
          </f.AppField>
          <f.AppField name="quantity">
            {(field) => <field.FormInput label="Quantity" type="number" />}
          </f.AppField>
          <f.AppField name="category">
            {(field) => (
              <field.FormSelect
                label="Category"
                items={categories?.map((category) => category.name) ?? []}
                placeholder="Select a category"
              />
            )}
          </f.AppField>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4 *:max-w-sm *:text-center">
          <f.AppField name="localImageURL">
            {() => (
              <Input type="file" onChange={handleInputImage} accept="image/*" />
            )}
          </f.AppField>
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
      <f.AppForm>
        <f.FormSubmit />
      </f.AppForm>
    </form>
  );
}
