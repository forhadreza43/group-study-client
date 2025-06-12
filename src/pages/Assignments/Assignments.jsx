import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import Loading from "../../components/Loading";
import AssignmentCard from "../../components/AssignmentCard";

const Assignments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["assignments", difficulty, debouncedSearch],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/assignments`,
        {
          params: {
            difficulty,
            search: debouncedSearch,
          },
        }
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
  const debounced = useMemo(
    () =>
      debounce((val) => {
        setDebouncedSearch(val);
      }, 500),
    []
  );

  useEffect(() => {
    debounced(search);
    return () => debounced.cancel();
  }, [search, debounced]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
        All Assignments
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <select
          className="select select-bordered w-full md:w-48 dark:bg-gray-900 "
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full md:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
            user={user}
            onDeleteClick={setDeleteId}
          />
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
