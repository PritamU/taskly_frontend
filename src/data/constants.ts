import { PriorityTypes } from "./commonTypes";

const APP_NAME = "Taskmyshit";

const TAG_DATA_FOR_FORM = [
  {
    title: "personal",
  },
  {
    title: "work",
  },
  {
    title: "chores",
  },
  {
    title: "study",
  },
  {
    title: "health",
  },
];

const PRIORITY_DATA_FOR_FORM: { title: PriorityTypes }[] = [
  {
    title: "low",
  },
  {
    title: "medium",
  },
  {
    title: "high",
  },
];

export { APP_NAME, PRIORITY_DATA_FOR_FORM, TAG_DATA_FOR_FORM };
