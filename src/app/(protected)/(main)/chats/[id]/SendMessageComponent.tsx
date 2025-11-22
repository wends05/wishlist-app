"use client";
import { toast } from "sonner";
import { sendMessage } from "@/actions/message";
import { Textarea } from "@/components/ui/textarea";
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
      className="fixed bottom-8 flex w-full max-w-md items-end gap-2 pr-4 md:right-auto md:left-auto md:w-full lg:max-w-2xl"
    >
      <f.AppField name="content">
        {(field) => (
          <Textarea
            className="min-h-6"
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        )}
      </f.AppField>

      <f.AppForm>
        <f.FormSubmit label="Send" isSubmittingLabel="Sending..." />
      </f.AppForm>
    </form>
  );
}
