import { PriorityTypes, StatusTypes, TagTypes } from "@/data/commonTypes";

interface ApiErrorInterface {
  status: boolean;
  message: string;
}

interface TaskInterface {
  id: string;
  title: string;
  description: string;
  status: StatusTypes;
  priority: PriorityTypes;
  tag: TagTypes;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}
interface TaskDetailsInterface extends TaskInterface {
  subTasks: { title: string; status: boolean }[];
}

export type { ApiErrorInterface, TaskDetailsInterface, TaskInterface };
