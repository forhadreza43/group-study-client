import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hook/useAxiosSecure";

const UpdateAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch the assignment to prefill
  const { data: assignment, isLoading } = useQuery({
    queryKey: ["assignment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
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
      return axiosSecure.put(
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

  if (isLoading) return <Loading />;

  return (
    <div className="flex min-h-[90dvh] items-center justify-center">
      <div className="w-full mx-auto p-6 bg-white dark:bg-gray-700 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">
          Update Assignment
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
            className="textarea textarea-bordered placeholder:text-gray-400 w-full border-blue-300 dark:bg-gray-900"
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
            className="select select-bordered w-full rounded border 
             border-blue-300 bg-white text-gray-800 
             dark:bg-gray-900 dark:text-white "
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
            {mutation.isPending ? "Updating..." : "Update Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignment;
