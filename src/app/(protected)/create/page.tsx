import BackButton from "@/components/BackButton";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import WishCreateForm from "@/components/wish/WishCreateForm";
import React from "react";

export default function CreateWishPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="h-[90vh] w-[95vw] overflow-hidden">
        <CardHeader>
          <h2>Create a new wish</h2>
          <CardAction>
            <BackButton />
          </CardAction>
        </CardHeader>
        <CardContent className="flex h-full w-full flex-col gap-4">
          <p>Fill out the form below to create a new wish.</p>
          <WishCreateForm />
        </CardContent>
      </Card>
    </div>
  );
}
