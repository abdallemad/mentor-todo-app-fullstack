"use client";
import { cn } from "@/lib/utils";
import useClearCompleted from "@/react-query/hooks/use-clear-completed";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function TodosFilters({ itemsLeft }: { itemsLeft: number }) {
  const searchparams = useSearchParams();
  const filter = (searchparams.get("filter") as TodoFilter) || "all";
  const router = useRouter();
  const { clearCompleted, clearCompletedLoading } = useClearCompleted();
  return (
    <div className="flex items-center justify-between py-4 px-4 border mb-4 text-sm">
      <p className="text-muted-foreground "> {itemsLeft} items left </p>

      <ul className="flex items-center gap-2">
        <li>
          <button
            onClick={() => router.push("?filter=all")}
            className={cn("cursor-pointer text-muted-foreground", {
              "font-bold text-foreground": filter === "all",
            })}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("?filter=active")}
            className={cn("cursor-pointer  text-muted-foreground", {
              "font-bold text-foreground  ": filter === "active",
            })}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("?filter=completed")}
            className={cn("cursor-pointer text-muted-foreground", {
              "font-bold text-foreground": filter === "completed",
            })}
          >
            Completed
          </button>
        </li>
      </ul>

      {clearCompletedLoading ? (
        <Loader2 className="animate-spin size-4" />
      ) : (
        <button className="cursor-pointer" onClick={() => clearCompleted()}>
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default TodosFilters;
