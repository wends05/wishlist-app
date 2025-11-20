"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";
import { type FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useEditWishForm } from "@/hooks/useEditWishForm";
import type { api } from "../../convex/_generated/api";

interface WishEditFormProps {
  preloadedWishInformation: Preloaded<
    typeof api.wishes.getWishByIdWithCategory
  >;
  preloadedCategories: Preloaded<typeof api.categories.getAllCategories>;
}

export default function WishEditForm({
  preloadedWishInformation,
  preloadedCategories,
}: WishEditFormProps) {
  const categories = usePreloadedQuery(preloadedCategories);

  const wishInformation = usePreloadedQuery(preloadedWishInformation);

  const f = useEditWishForm({
    _id: wishInformation._id,
    description: wishInformation.description,
    name: wishInformation.name,
    category: wishInformation.category.name,
    localImageURL: wishInformation.imageUrl,
    removeImage: false,
  });

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleRemoveImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    f.setFieldValue("localImageURL", wishInformation.imageUrl);
  };

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
                items={categories.map((category) => {
                  return { id: category._id, name: category.name };
                })}
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
                <InputGroup>
                  <InputGroupInput
                    ref={imageInputRef}
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
                  {field.state.value !== wishInformation.imageUrl && (
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupButton onClick={handleRemoveImage}>
                        Remove File
                      </InputGroupButton>
                    </InputGroupAddon>
                  )}
                </InputGroup>
              </Field>
            )}
          </f.AppField>
          <f.Subscribe selector={(s) => s.values.localImageURL}>
            {(localImageURL) => (
              <>
                <div className="flex h-60 w-full items-center justify-center rounded-2xl bg-neutral-700 p-2">
                  <div className="relative flex h-full w-full items-center justify-center rounded-md text-center">
                    {localImageURL ? (
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
                    )}
                  </div>
                </div>
                <f.Field name="removeImage">
                  {(field) =>
                    wishInformation.imageUrl !== localImageURL ||
                    (localImageURL && (
                      <Button
                        variant={field.state.value ? "destructive" : "outline"}
                        onClick={() => {
                          field.handleChange(!field.state.value);
                        }}
                        type="button"
                        aria-label={
                          field.state.value
                            ? "Remove Image"
                            : "Undo Remove Image"
                        }
                      >
                        {field.state.value
                          ? "Undo Remove Image"
                          : "Remove Image"}
                      </Button>
                    ))
                  }
                </f.Field>
              </>
            )}
          </f.Subscribe>
        </div>
      </div>
      <f.AppForm>
        <f.FormSubmit />
      </f.AppForm>
    </form>
  );
}
