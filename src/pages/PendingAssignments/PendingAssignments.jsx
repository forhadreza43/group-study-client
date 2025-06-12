import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../components/Loading";

const PendingAssignments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ obtainedMarks: "", feedback: "" });
  const axiosSecure = useAxiosSecure();

  const { data: pendingAssignments = [], isLoading } = useQuery({
    queryKey: ["pendingAssignments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/pending-submitted-assignments?email=${
          user.email
        }`
      );
      return res.data;
    },
    enabled: !!user.email,
  });

  const mutation = useMutation({
    mutationFn: ({ id, ...data }) =>
      axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/submitted-assignments/${id}`,
        data
      ),
    onSuccess: () => {
      toast.success("Marked successfully!");
      queryClient.invalidateQueries(["pendingAssignments"]);
      setSelected(null);
      setForm({ obtainedMarks: "", feedback: "" });
    },
    onError: () => {
      toast.error("Marking failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.obtainedMarks || !form.feedback) {
      return toast.error("Both fields are required");
    }

    mutation.mutate({
      id: selected._id,
      obtainedMarks: Number(form.obtainedMarks),
      feedback: form.feedback,
    });
  };

  if (isLoading) return <Loading />;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Pending Assignments
      </h2>
      {pendingAssignments.length === 0 ? (
        <p className="text-center">No pending assignments to evaluate.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Assignment Title</th>
                <th>Marks</th>
                <th>Examinee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingAssignments.map((submission, i) => (
                <tr key={submission._id}>
                  <td>{i + 1}</td>
                  <td>{submission.assignmentTitle}</td>
                  <td>{submission.assignmentMarks}</td>
                  <td>{submission.userEmail}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setSelected(submission);
                        setForm({ obtainedMarks: "", feedback: "" });
                      }}
                    >
                      Give Mark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selected && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg">Mark Assignment</h3>
            <p className="text-sm mt-2">
              <strong>Docs:</strong>{" "}
              <a
                href={selected.docLink}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Submission
              </a>
            </p>
            <p className="text-sm mt-2">
              <strong>Note:</strong> {selected.note}
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="number"
                placeholder="Obtained Marks"
                className="input input-bordered w-full"
                value={form.obtainedMarks}
                onChange={(e) =>
                  setForm({ ...form, obtainedMarks: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Feedback"
                className="input input-bordered w-full"
                value={form.feedback}
                onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              />
              <div className="modal-action justify-between">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingAssignments;
