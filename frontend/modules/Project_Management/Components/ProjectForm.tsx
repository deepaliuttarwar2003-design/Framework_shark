"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Project } from "../types";

import {
  projectSchema,
  ProjectFormValues,
} from "../schema/projectSchema";

import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../Api/ProjectApi";

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

  const form =
    useForm<ProjectFormValues>({
      resolver:
        zodResolver(projectSchema) as any,

      defaultValues: {
        title:
          initialData?.title || "",

        description:
          initialData?.description ||
          "",

        client:
          initialData?.client || "",

        manager:
          initialData?.manager || "",

        startDate:
          initialData?.startDate ||
          "",

        endDate:
          initialData?.endDate || "",

        budget:
          initialData?.budget || 0,

        status:
          initialData?.status ||
          "Planning",
      },
    });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const status = watch("status");

  const onSubmit = async (
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
          {...register("title")}
        />

        {errors.title && (
          <p className="text-sm text-red-500 mt-1">
            {errors.title.message}
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
          {...register("client")}
        />

        {errors.client && (
          <p className="text-sm text-red-500 mt-1">
            {errors.client.message}
          </p>
        )}
      </div>

      {/* Manager */}
      <div>
        <Input
          placeholder="Manager"
          {...register("manager")}
        />

        {errors.manager && (
          <p className="text-sm text-red-500 mt-1">
            {
              errors.manager
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
          {...register("budget")}
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

      {/* Status */}
      <div>
        <Select
          value={status}
          onValueChange={(
            value
          ) =>
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