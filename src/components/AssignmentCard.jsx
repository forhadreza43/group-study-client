// src/components/AssignmentCard.jsx
import { useNavigate } from "react-router-dom";

const AssignmentCard = ({ assignment, user, onDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded bg-base-100 dark:bg-gray-900 shadow-lg border border-blue-300 p-4 flex flex-col justify-between ">
      <div>
        <img
          src={assignment.thumbnail}
          alt={assignment.title}
          className="rounded"
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

        {user.email === assignment.creator?.email && (
          <button
            onClick={() => onDeleteClick(assignment._id)}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
