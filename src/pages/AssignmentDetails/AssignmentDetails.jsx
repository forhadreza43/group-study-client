import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";
import { useState } from "react";
import Loading from "../../components/Loading";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ docLink: "", note: "" });

  const { data: assignment, isLoading } = useQuery({
    queryKey: ["assignment", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/assignment/${id}`
      );
      return res.data;
    },
  });
  const submitMutation = useMutation({
    mutationFn: (payload) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/submitted-assignments`,
        payload
      ),
    onSuccess: () => {
      toast.success("Assignment submitted successfully!");
      setShowModal(false);
      setForm({ docLink: "", note: "" });
    },
    onError: () => {
      toast.error("Failed to submit assignment");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.docLink || !form.note) {
      toast.error("All fields are required");
      return;
    }

    submitMutation.mutate({
      assignmentId: id,
      userEmail: user.email,
      docLink: form.docLink,
      note: form.note,
      status: "pending",
      assignmentTitle: assignment.title,
      assignmentMarks: assignment.marks,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-[90dvh]">
      <div className=" w-full mx-auto  p-6 bg-white shadow-md rounded dark:bg-gray-900">
        <img src={assignment.thumbnail} alt="" className="rounded mb-4" />
        <div className="dark:text-gray-300">
          <h1 className="text-2xl font-bold">{assignment.title}</h1>
          <p className="my-2">{assignment.description}</p>
          <p>
            <strong>Marks:</strong> {assignment.marks}
          </p>
          <p>
            <strong>Difficulty:</strong> {assignment.difficulty}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary mt-5"
        >
          Take Assignment
        </button>

        {showModal && (
          <dialog open className="modal modal-open">
            <div className="modal-box dark:bg-gray-600">
              <h3 className="font-bold text-lg mb-4 dark:text-gray-200">Submit Assignment</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="url"
                  placeholder="Google Docs Link"
                  className="input input-bordered w-full"
                  value={form.docLink}
                  onChange={(e) =>
                    setForm({ ...form, docLink: e.target.value })
                  }
                  required
                />
                <textarea
                  placeholder="Quick Notes"
                  className="textarea textarea-bordered w-full"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  required
                ></textarea>
                <div className="modal-action">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetails;
