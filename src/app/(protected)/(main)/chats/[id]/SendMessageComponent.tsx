"use client";
import { toast } from "sonner";
import { sendMessage } from "@/actions/message";
import { useAppForm } from "@/hooks/FormHooks";
import type { Id } from "../../../../../../convex/_generated/dataModel";

interface SendMessageComponentProps {
  chatId: Id<"chats">;
  completed: boolean;
}
const defaultValues = {
  content: "",
};

export default function SendMessageComponent({
  chatId,
  completed,
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
      {!completed ? (
        <>
          <f.AppField name="content">
            {(field) => <field.FormInput disabled={completed} />}
          </f.AppField>
          <f.AppForm>
            <f.FormSubmit label="Send" isSubmittingLabel="Sending..." />
          </f.AppForm>
        </>
      ) : (
        <div className="w-full rounded-md bg-muted/50 p-4 text-center text-muted-foreground text-sm">
          This wish has been completed. You can no longer send messages.
        </div>
      )}
    </form>
  );
}
