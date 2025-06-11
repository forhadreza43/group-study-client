import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const UpdateAssignment = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch the assignment to prefill
  const { data: assignment, isLoading } = useQuery({
    queryKey: ["assignment", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/assignment/${id}`
      );
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (assignment) {
      setValue("title", assignment.title);
      setValue("description", assignment.description);
      setValue("marks", assignment.marks);
      setValue("thumbnail", assignment.thumbnail);
      setValue("difficulty", assignment.difficulty);
      setDueDate(new Date(assignment.dueDate));
    }
  }, [assignment, setValue]);

  const mutation = useMutation({
    mutationFn: (updatedData) => {
      return axios.put(
        `${import.meta.env.VITE_API_URL}/assignments/${id}`,
        updatedData
      );
    },
    onSuccess: () => {
      toast.success("Assignment updated successfully!");
      navigate("/assignments");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Update failed");
    },
  });

  const onSubmit = (data) => {
    const updatedAssignment = {
      ...data,
      marks: Number(data.marks),
      dueDate,
    };
    mutation.mutate(updatedAssignment);
  };

  if (isLoading) return <h2 className="text-center mt-20">Loading...</h2>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Assignment</h2>
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
          placeholder="Assignment Description"
        />
        {errors.description && (
          <span className="text-red-500">Minimum 20 characters required</span>
        )}

        <input
          type="number"
          {...register("marks", { required: true, min: 1 })}
          className="input input-bordered w-full"
          placeholder="Marks"
        />
        {errors.marks && (
          <span className="text-red-500">Valid marks required</span>
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
          className="select select-bordered w-full"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {errors.difficulty && (
          <span className="text-red-500">Select difficulty level</span>
        )}

        <div>
          <label className="label">Due Date</label>
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
          {mutation.isPending ? "Updating..." : "Update Assignment"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAssignment;
