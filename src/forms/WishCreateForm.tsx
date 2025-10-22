"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";
import type { FormEvent } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateWishForm } from "@/hooks/useCreateWishForm";
import type { api } from "../../convex/_generated/api";

interface WishCreateFormProps {
  preloadedCategories: Preloaded<typeof api.categories.getAllCategories>;
}

export default function WishCreateForm({
  preloadedCategories,
}: WishCreateFormProps) {
  const categories = usePreloadedQuery(preloadedCategories);

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
          <f.AppField name="category">
            {(field) => (
              <field.FormSelect
                label="Category"
                items={categories.map((category) => category.name)}
                placeholder="Select a category"
              />
            )}
          </f.AppField>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4 *:max-w-sm *:text-center">
          <f.AppField name="localImageURL">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="imageUpload">Upload Image</FieldLabel>
                <Input
                  id="imageUpload"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files![0];
                    if (!file) return;
                    const url = URL.createObjectURL(file);
                    field.handleChange(url);
                  }}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </Field>
            )}
          </f.AppField>
          <div className="m-10 flex h-60 w-full items-center justify-center rounded-2xl bg-neutral-700 p-2">
            <div className="relative flex h-full w-full items-center justify-center rounded-md text-center">
              <f.Subscribe selector={(s) => s.values.localImageURL}>
                {(localImageURL) =>
                  localImageURL ? (
                    <Image
                      src={localImageURL}
                      alt="Wish Image"
                      fill
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-neutral-300">
                      Upload an image to see a preview here
                    </span>
                  )
                }
              </f.Subscribe>
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
