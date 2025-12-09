"use client";

import {
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  initialName: string;
};

export default function ProfileForm({ initialName }: Props) {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    setStatus("saving");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Failed to update profile");
        setStatus("error");
        return;
      }

      setStatus("saved");
    } catch (err) {
      setError("Unexpected error");
      setStatus("error");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (status === "saved" || status === "error") {
      setStatus("idle");
    }
    setError(null);
  };

  const isSaving = status === "saving";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <Input
        label="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      {status === "saved" && !error && (
        <p className="text-sm text-emerald-400">
          Profile updated successfully.
        </p>
      )}

      <Button
        type="submit"
        disabled={isSaving}
        fullWidth
      >
        {isSaving ? "Saving..." : "Update name"}
      </Button>
    </form>
  );
}
