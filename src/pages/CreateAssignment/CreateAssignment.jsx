import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

const CreateAssignment = () => {
  const { user } = useAuth();
  const [dueDate, setDueDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosSecure.post(`${import.meta.env.VITE_API_URL}/assignments`, data);
    },
    onSuccess: () => {
      toast.success("Assignment created successfully!");
      reset();
      setDueDate(new Date());
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    const assignment = {
      ...data,
      marks: Number(data.marks),
      difficulty: data.difficulty,
      dueDate,
      creator: {
        name: user.displayName,
        email: user.email,
      },
      status: "pending",
      submittedAt: new Date(),
    };
    mutation.mutate(assignment);
  };

  return (
    <div className="flex min-h-[90dvh] items-center justify-center">
      <div className="w-full mx-auto p-6 bg-white dark:bg-gray-700 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">
          Create Assignment
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Assignment Title"
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
          <textarea
            {...register("description", { required: true, minLength: 20 })}
            className="textarea textarea-bordered w-full"
            placeholder="Assignment Description (min 20 characters)"
          />
          {errors.description && (
            <span className="text-red-500">
              Description must be at least 20 characters
            </span>
          )}
          <input
            type="number"
            {...register("marks", { required: true, min: 1 })}
            className="input input-bordered w-full"
            placeholder="Marks"
          />
          {errors.marks && (
            <span className="text-red-500">Marks are required</span>
          )}
          <input
            {...register("thumbnail", { required: true })}
            className="input input-bordered w-full"
            placeholder="Thumbnail Image URL"
          />
          {errors.thumbnail && (
            <span className="text-red-500">Thumbnail is required</span>
          )}
          <select
            {...register("difficulty", { required: true })}
            className=" select-bordered rounded border
               border-blue-300 bg-white text-gray-800
               dark:bg-gray-900 dark:text-white select select-bordered w-full"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {errors.difficulty && (
            <span className="text-red-500">Difficulty level is required</span>
          )}
          <div>
            <label className="label text-gray-900 dark:text-gray-100 mr-3">
              Due Date
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
