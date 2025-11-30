"use client";
import { toast } from "sonner";
import { sendMessage } from "@/actions/message";
import { useAppForm } from "@/hooks/FormHooks";
import type { Id } from "../../../../../../convex/_generated/dataModel";

interface SendMessageComponentProps {
  chatId: Id<"chats">;
}
const defaultValues = {
  content: "",
};

export default function SendMessageComponent({
  chatId,
}: SendMessageComponentProps) {
  const f = useAppForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      try {
        await sendMessage(chatId, value.content);
        formApi.reset();
      } catch (error) {
        console.error("Error sending message:", error);
        toast.message("Failed to send message");
      }
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        f.handleSubmit();
      }}
      className="fixed bottom-8 flex w-full max-w-md items-center gap-2 pr-4 md:right-auto md:left-auto md:w-full lg:max-w-2xl"
    >
      <f.AppField name="content">
        {(field) => <field.FormInput />}
      </f.AppField>

      <f.AppForm>
        <f.FormSubmit label="Send" isSubmittingLabel="Sending..." />
      </f.AppForm>
    </form>
  );
}
