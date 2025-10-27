import { useEffect, useState } from "react";
import { getTasksApi } from "@/services/api";

export default function TaskCount({ projectId }) {
  const [count, setCount] = useState(null);
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasksApi();
      let tasks = tasksData.filter((tasks) => tasks.projectId === projectId);
      setCount(tasks.length);
    };
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{count === null ? 0 : count}</>;
}
