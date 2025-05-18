"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

function TodosFilters({ itemsLeft }: { itemsLeft: number }) {
  const searchparams = useSearchParams();
  const filter = (searchparams.get("filter") as TodoFilter) || "all";
  const router = useRouter();
  return (
    <div className="flex items-center justify-between py-4 px-4 border mb-4 text-sm">
      <p className="text-muted-foreground "> {itemsLeft} items left </p>
      <ul className="flex items-center gap-2">
        <li>
          <button
            onClick={() => router.push("?filter=all")}
            className="cursor-pointer"
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("?filter=active")}
            className="cursor-pointer"
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("?filter=completed")}
            className="cursor-pointer"
          >
            Completed
          </button>
        </li>
      </ul>
      <button className="cursor-pointer">Clear Completed</button>
    </div>
  );
}

export default TodosFilters;
