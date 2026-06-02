"use client";

import { useForm, useWatch, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Project } from "../types";

import {
  projectSchema,
  ProjectFormValues,
} from "../schema/projectSchema";
import {useCreateProjectMutation,useUpdateProjectMutation} from "../Redux/projectManagementApiSlice";
// import {
//   useCreateProjectMutation,
//   u
// } from "../Api/ProjectApi";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  initialData?: Project;

  onSuccess?: () => void;
}

export default function ProjectForm({
  initialData,
  onSuccess,
}: Props) {
  const [createProject] =
    useCreateProjectMutation();

  const [updateProject] =
    useUpdateProjectMutation();

  const form = useForm<ProjectFormValues>({
  resolver: zodResolver(projectSchema),
  defaultValues: {
    projectName: initialData?.projectName || "",      // ✅ FIXED
    description: initialData?.description || "",
    clientName: initialData?.clientName || "",        // ✅ FIXED
    teamLead: initialData?.teamLead || "",            // ✅ FIXED
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    budget: (initialData?.budget || 0) as number,
    status: initialData?.status ?? "Planning",
    priority: initialData?.priority || "Medium",      // ✅ ADDED
  },
});

  const { register, handleSubmit, setValue, control, formState: { errors } } = form;

  const status = useWatch({
  control,
  name: "status",
});

const priority = useWatch({
  control,
  name: "priority",
});

  const onSubmit: SubmitHandler<ProjectFormValues> = async (
    data: ProjectFormValues
  ) => {
    try {
      if (initialData?.id) {
        await updateProject({
          id: initialData.id,
          data,
        }).unwrap();
      } else {
       await createProject(
          data
        ).unwrap();
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Title */}
      <div>
        <Input
          placeholder="Project Title"
          {...register("projectName")}
        />

        {errors.projectName && (
          <p className="text-sm text-red-500 mt-1">
            {errors.projectName.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <Textarea
          placeholder="Description"
          {...register(
            "description"
          )}
        />

        {errors.description && (
          <p className="text-sm text-red-500 mt-1">
            {
              errors.description
                .message
            }
          </p>
        )}
      </div>

      {/* Client */}
      <div>
        <Input
          placeholder="Client"
          {...register("clientName")}
        />

        {errors.clientName && (
          <p className="text-sm text-red-500 mt-1">
            {errors.clientName.message}
          </p>
        )}
      </div>

      {/* Manager */}
      <div>
        <Input
          placeholder="Manager"
          {...register("teamLead")}
        />

        {errors.teamLead && (
          <p className="text-sm text-red-500 mt-1">
            {
              errors.teamLead
                .message
            }
          </p>
        )}
      </div>

      {/* Start Date */}
      <div>
        <Input
          type="date"
          {...register(
            "startDate"
          )}
        />

        {errors.startDate && (
          <p className="text-sm text-red-500 mt-1">
            {
              errors.startDate
                .message
            }
          </p>
        )}
      </div>

      {/* End Date */}
      <div>
        <Input
          type="date"
          {...register("endDate")}
        />

        {errors.endDate && (
          <p className="text-sm text-red-500 mt-1">
            {
              errors.endDate
                .message
            }
          </p>
        )}
      </div>

      {/* Budget */}
<div>
  <Input
    type="number"
    placeholder="Budget"
    {...register("budget", {
      valueAsNumber: true,
    })}
  />

  {errors.budget && (
    <p className="text-sm text-red-500 mt-1">
      {
        errors.budget
          .message
      }
    </p>
  )}
</div>

{/* Priority */}
<div>
  <Select
    value={priority}
    onValueChange={(
      value
    ) =>
      setValue(
        "priority",
        value as ProjectFormValues["priority"]
      )
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Priority" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="Low">
        Low
      </SelectItem>

      <SelectItem value="Medium">
        Medium
      </SelectItem>

      <SelectItem value="High">
        High
      </SelectItem>

      <SelectItem value="Critical">
        Critical
      </SelectItem>
    </SelectContent>
  </Select>

  {errors.priority && (
    <p className="text-sm text-red-500 mt-1">
      {errors.priority.message}
    </p>
  )}
</div>

{/* Status */}
<div>
<Select
  value={status}
  onValueChange={(value) =>
    setValue(
      "status",
      value as ProjectFormValues["status"]
    )
  }
>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Planning">
              Planning
            </SelectItem>

            <SelectItem value="In Progress">
              In Progress
            </SelectItem>

            <SelectItem value="Completed">
              Completed
            </SelectItem>

            <SelectItem value="On Hold">
              On Hold
            </SelectItem>
          </SelectContent>
        </Select>

        {errors.status && (
          <p className="text-sm text-red-500 mt-1">
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
      >
        {initialData
          ? "Update Project"
          : "Create Project"}
      </Button>
    </form>
  );
}