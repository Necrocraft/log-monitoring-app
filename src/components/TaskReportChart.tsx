import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import type { TaskTypes } from "../models/log";

type Props = {
  data: TaskTypes[];
};

const levelColors: Record<string, string> = {
  INFO: "#4ade80", // Green
  WARN: "#facc15", // Yellow
  ERROR: "#ef4444", // Red
};

const CustomTooltip = ({ active, payload }: any) => {
  const isVisible = active && payload && payload.length;
  if (isVisible) {
    const task = payload[0].payload;
    return (
      <div className="p-2 bg-white border shadow text-sm text-gray-800">
        <strong>{task.taskName}</strong>
        <br />
        ID: {task.taskId}
        <br />
        Duration: {task.duration.toFixed(2)} minutes
        <br />
        Level: {task.level}
      </div>
    );
  }
  return null;
};

export const TaskDurationChart = ({ data }: Props) => {
  return (
    <div className="w-full h-[500px] basis-[60%]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="taskId" tick={false} />
          <YAxis
            label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="duration" name="Duration (min)">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={levelColors[entry.level || "INFO"]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
