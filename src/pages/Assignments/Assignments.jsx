import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { useState } from "react";

const Assignments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  // Fetch all assignments
  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/assignments`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/assignments/${id}?email=${user.email}`
      );
    },
    onSuccess: () => {
      toast.success("Assignment deleted successfully");
      queryClient.invalidateQueries(["assignments"]);
      setDeleteId(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Delete failed");
    },
  });

  if (isLoading) return <h2 className="text-center mt-20">Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Assignments</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="card bg-base-100 shadow-lg border p-4 space-y-3"
          >
            <img
              src={assignment.thumbnail}
              alt={assignment.title}
              className="rounded"
            />
            <h2 className="text-xl font-semibold">{assignment.title}</h2>
            <p>Marks: {assignment.marks}</p>
            <p>
              Difficulty:{" "}
              <span className="capitalize">{assignment.difficulty}</span>
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/assignment/${assignment._id}`)}
                className="btn btn-info btn-sm"
              >
                View
              </button>

              <button
                onClick={() => navigate(`/update/${assignment._id}`)}
                className="btn btn-warning btn-sm"
              >
                Update
              </button>

              {user.email === assignment.creator?.email && (
                <button
                  onClick={() => setDeleteId(assignment._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <dialog id="delete_modal" open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">Confirm Deletion</h3>
            <p className="py-2">
              Are you sure you want to delete this assignment?
            </p>
            <div className="modal-action">
              <form method="dialog" className="flex gap-4">
                <button className="btn" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteMutation.mutate(deleteId);
                  }}
                >
                  Confirm Delete
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Assignments;
