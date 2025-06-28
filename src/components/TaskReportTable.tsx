import type { TaskTypes } from "../models/log";

type TaskReportTableProps = {
  data: TaskTypes[];
};

const levelColors: Record<string, string> = {
  INFO: "bg-green-50 text-green-800",
  WARN: "bg-yellow-50 text-yellow-800",
  ERROR: "bg-red-50 text-red-800",
};

export const TaskReportTable = ({ data }: TaskReportTableProps) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto max-h-[500px]">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700">Task ID</th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Task Name
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Start Time
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                End Time
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">
                Duration (min)
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700">Level</th>
            </tr>
          </thead>
          <tbody>
            {data.map((task) => (
              <tr
                key={task.taskId}
                className={`${
                  levelColors[task.level || "INFO"]
                } border-b border-gray-200`}
              >
                <td className="px-4 py-2">{task.taskId}</td>
                <td className="px-4 py-2">{task.taskName}</td>
                <td className="px-4 py-2">{task.startTime || "-"}</td>
                <td className="px-4 py-2">{task.endTime || "-"}</td>
                <td className="px-4 py-2">
                  {task.duration?.toFixed(2) ?? "-"}
                </td>
                <td className="px-4 py-2 font-bold">{task.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
