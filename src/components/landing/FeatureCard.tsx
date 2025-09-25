import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import Feature from "@/types/Feature";

interface FeatureCardProps {
  feature: Feature;
  className?: string;
  id?: string;
}

export default function FeatureCard({
  feature,
  id,
  className,
}: FeatureCardProps) {
  return (
    <Card id={id} className={cn("sm:w-md", className)}>
      <CardContent>
        <h2>{feature.title}</h2>
        <p>{feature.description}</p>
      </CardContent>
    </Card>
  );
}
