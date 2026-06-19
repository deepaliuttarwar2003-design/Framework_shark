"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function UserForm({
  onSubmit,
  defaultValues,
}: Props) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    email: defaultValues?.email || "",
    role: defaultValues?.role || "User",
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
      />

      <Input
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      <Input
        placeholder="Role"
        value={formData.role}
        onChange={(e) =>
          setFormData({
            ...formData,
            role: e.target.value,
          })
        }
      />

      <Button
        onClick={() => onSubmit(formData)}
      >
        Save User
      </Button>
    </div>
  );
}