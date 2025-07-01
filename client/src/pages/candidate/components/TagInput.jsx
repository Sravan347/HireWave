import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TagInput = ({ tags = [], setTags }) => {
  const [input, setInput] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    const newTag = input.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInput("");
  };

  const removeTag = (index) => {
    const updated = tags.filter((_, i) => i !== index);
    setTags(updated);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#0A1A4A]">Tags / Skills</label>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className="bg-[#D6CEFA] text-[#0A1A4A] flex items-center gap-1 px-2"
          >
            {tag}
            <Button
              size="icon"
              variant="ghost"
              className="text-[#0A1A4A] hover:text-red-600 p-0 h-4 w-4"
              onClick={() => removeTag(index)}
            >
              <X size={12} />
            </Button>
          </Badge>
        ))}
      </div>

      <form onSubmit={addTag} className="flex gap-2">
        <Input
          type="text"
          value={input}
          placeholder="Type and press Enter"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTag(e);
          }}
        />
        <Button type="submit" className="bg-[#1A3A8F] text-white hover:bg-[#0A1A4A]">
          Add
        </Button>
      </form>
    </div>
  );
};

export default TagInput;
