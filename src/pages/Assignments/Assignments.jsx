import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Assignments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const isLoggedIn = !!user?.email;

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
      return axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/assignments/${id}?email=${
          user.email || ""
        }`
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
    enabled: isLoggedIn,
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
    <div className="w-full mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
        All Assignments
      </h1>
      <div className="flex flex-col md:flex-row w-full items-center justify-between mb-6 gap-4">
        {/* Difficulty Filter */}
        <select
          className="w-full md:w-48 px-3 py-2 rounded border 
             border-blue-300 bg-white text-gray-800 
             dark:bg-gray-900 dark:text-white "
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
          id="search"
          placeholder="Search by title..."
          className="input dark:text-gray-100 border border-blue-300 w-full md:w-72 dark:bg-gray-900 placeholder:text-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="rounded bg-base-100 dark:bg-gray-900 shadow-lg border border-blue-300 p-4 flex flex-col justify-between"
          >
            <div>
              <img
                src={assignment.thumbnail}
                alt={assignment.title}
                className="rounded w-full h-50 object-cover"
              />
              <div className="my-3 dark:text-gray-300">
                <h2 className="text-xl font-semibold">{assignment.title}</h2>
                <p>Marks: {assignment.marks}</p>
                <p>
                  Difficulty:{" "}
                  <span className="capitalize">{assignment.difficulty}</span>
                </p>
              </div>
            </div>

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

              {user?.email === assignment?.creator?.email && (
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
