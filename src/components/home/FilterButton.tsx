import { Filter, X } from "lucide-react";
import type { MouseEvent } from "react";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FilterButtonProps {
  filterCategories: Pick<Doc<"categories">, "name" | "_id">[];
  category: string | null;
  setSelectedCategoryId: (id?: string) => void;
}
export default function FilterButton({
  filterCategories,
  category,
  setSelectedCategoryId,
}: FilterButtonProps) {
  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedCategoryId(undefined);
  };
  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={setSelectedCategoryId} value={category || ""}>
        <SelectTrigger className="h-12">
          <SelectValue placeholder={<Filter />} />
        </SelectTrigger>
        <SelectContent>
          {filterCategories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {category && (
        <Button variant={"ghost"} onClick={handleClear}>
          <X />
        </Button>
      )}
    </div>
  );
}
