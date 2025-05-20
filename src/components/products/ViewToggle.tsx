
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="flex space-x-2 mb-6">
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => setView("grid")}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => setView("list")}
      >
        <List className="h-4 w-4 mr-2" />
        List
      </Button>
    </div>
  );
};
