import { useState, useEffect } from "react";

import { TaskReportTable } from "./components/TaskReportTable";

import type { TaskLevel, TaskTypes } from "./models/log";

import { convertStringToUsableFormat } from "./utils/dataConversion";

import "./App.css";
import TaskDurationChart from "./components/TaskReportChart";

function App() {
  const [tasks, setTasks] = useState([] as TaskTypes[]);
  const [filteredData, setFilteredData] = useState([] as TaskTypes[]);
  const [filter, setFilter] = useState<"ALL" | TaskLevel>("ALL");

  useEffect(() => {
    setFilteredData(
      filter === "ALL" ? tasks : tasks.filter((d) => d.level === filter)
    );
  }, [filter, tasks]);

  useEffect(() => {
    fetch("/logs.log")
      .then((res) => res.text())
      // This function converts the string to a usable format
      // It parses the log file and returns an array of TaskTypes
      // The space time complexity of this function is O(n), where n is the number of lines in the log file
      // What makes it linear?
      // Each line is visited once
      // There’s no nested iteration
      // All operations per line/task are constant-time
      .then(convertStringToUsableFormat)
      .then((data) => {
        setTasks(data);
        setFilteredData(data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-8 justify-center items-center m-24">
      <h1 className="text-3xl font-bold text-gray-800">Log Monitoring App</h1>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <label className="font-medium text-gray-800">Filter by Level:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as TaskLevel | "ALL")}
            className="border px-2 py-1 rounded text-gray-800"
          >
            <option value="ALL">All</option>
            <option value="INFO">Info</option>
            <option value="WARN">Warning</option>
            <option value="ERROR">Error</option>
          </select>
        </div>
        <div className="flex gap-4">
          <TaskReportTable data={filteredData} />
          <TaskDurationChart data={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default App;
