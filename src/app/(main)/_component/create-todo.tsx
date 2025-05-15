"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useCreateTodo } from "@/react-query/hooks/use-create-todo";
function CreateTodo() {
  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const { createTodo, isPending } = useCreateTodo();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim() === "") return;
        if (isPending) return;
        createTodo({ title, checked });
        setTitle("");
        setChecked(false);
      }}
    >
      <Card className="px-1 py-4 mb-6">
        <CardContent className="flex items-center gap-2">
          <Checkbox
            checked={checked}
            onCheckedChange={(checked) => setChecked(checked as boolean)}
            disabled={isPending}
          />
          <Input
            type="text"
            placeholder="Create a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
          />
        </CardContent>
      </Card>
    </form>
  );
}
export default CreateTodo;
