"use client";

import GlobalTextField from "@/components/globalComponents/common/GlobalTextField";
import {
  IconButtonDark,
  PrimaryButton,
  PrimaryHeaderDark,
  TextDark,
} from "@/components/globalComponents/globalStyledComponents";
import { PriorityTypes, TagTypes } from "@/data/commonTypes";
import { PRIORITY_DATA_FOR_FORM, TAG_DATA_FOR_FORM } from "@/data/constants";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/apis/taskApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import { setIsTaskUpdatedLoading } from "@/redux/slices/taskSlice";
import { setSnackbar } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { Add, Close } from "@mui/icons-material";
import { Button, Chip, Grid2, Paper, Stack, Tabs } from "@mui/material";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomTextField } from "../../LoginPageComponent/styledComponents";

interface FormValuesInterface {
  Title: {
    value: string;
    hasError: boolean;
    isOptional: boolean;
  };
  Description: {
    value: string;
    hasError: boolean;
    isOptional: boolean;
  };
  Priority: {
    value: PriorityTypes;
    hasError: boolean;
    isOptional: boolean;
  };
  Tag: {
    value: TagTypes;
    hasError: boolean;
    isOptional: boolean;
  };
  StartAt: {
    value?: string;
    hasError: boolean;
    isOptional: boolean;
  };
  EndAt: {
    value?: string;
    hasError: boolean;
    isOptional: boolean;
  };
  SubTasks: {
    value: { title: string; status: boolean }[];
    hasError: boolean;
    isOptional: boolean;
  };
}

const CreateTaskComponent = ({ type }: { type: "create" | "edit" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { taskDetails, isTaskDetailsLoading, isTaskUpdatedLoading } =
    useSelector((state: RootState) => state.task);
  const params = useParams();
  const [formValues, setFormValues] = useState<FormValuesInterface>({
    Title: { value: "", hasError: true, isOptional: false },
    Description: { value: "", hasError: false, isOptional: true },
    Priority: { value: "medium", hasError: true, isOptional: false },
    Tag: { value: "personal", hasError: true, isOptional: false },
    StartAt: {
      value: dayjs().format("YYYY-MM-DD"),
      hasError: true,
      isOptional: false,
    },
    EndAt: {
      value: dayjs().format("YYYY-MM-DD"),
      hasError: false,
      isOptional: false,
    },
    SubTasks: {
      value: [{ title: "", status: false }],
      hasError: false,
      isOptional: true,
    },
  });
  const [showErrors, setShowErrors] = useState(false);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [tagData, setTagData] = useState(TAG_DATA_FOR_FORM);

  const [createTask, { isError, isLoading, isSuccess, error, data }] =
    useCreateTaskMutation();
  const [
    updateTask,
    {
      isError: isUpdateError,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: updateData,
      error: updateErrorData,
    },
  ] = useUpdateTaskMutation();

  // for title and description onchange
  const formValueHandler = (
    fieldName: string,
    value: string,
    hasError: boolean,
    isOptional?: boolean
  ) => {
    const updatedField = { [fieldName]: { value, hasError, isOptional } };
    setFormValues({ ...formValues, ...updatedField });
  };

  // for sub tasks - add, onchange and remove
  const subTaskEventsHandler = ({
    type,
    index,
    value,
  }: {
    type: "add" | "remove" | "onChange";
    index?: number;
    value?: string;
  }) => {
    if (type === "add") {
      const newValue = [...formValues.SubTasks.value];
      newValue.splice(index! + 1, 0, { title: "", status: false });
      setFormValues({
        ...formValues,
        SubTasks: { value: newValue, hasError: true, isOptional: true },
      });
      return;
    } else if (type === "remove") {
      const newValue = [...formValues.SubTasks.value];
      newValue.splice(index!, 1);

      setFormValues({
        ...formValues,
        SubTasks: { value: newValue, hasError: true, isOptional: true },
      });
      return;
    }
    const newValue = JSON.parse(JSON.stringify(formValues.SubTasks.value));
    newValue[index!].title = value!;

    setFormValues({
      ...formValues,
      SubTasks: { value: newValue, hasError: true, isOptional: true },
    });
  };

  // for other values : startAt, endAt, tag and priority
  const setOtherValues = ({
    type,
    value,
  }: {
    type: "startAt" | "endAt" | "priority" | "tag";
    value: string;
  }) => {
    console.log("value", value);
    const newFormValue = { ...formValues };
    if (type === "startAt") {
      newFormValue.StartAt.value = value;
    } else if (type === "endAt") {
      newFormValue.EndAt.value = value;
    } else if (type === "tag") {
      newFormValue.Tag.value = value;
    } else if (type === "priority") {
      newFormValue.Priority.value = value as PriorityTypes;
    }
    setFormValues(newFormValue);
  };

  // handle adding a new custom tag
  const handleAddNewTag = () => {
    if (newTag) {
      setTagData([{ title: newTag }, ...tagData]);
      setFormValues({
        ...formValues,
        Tag: { hasError: false, value: newTag, isOptional: false },
      });
      setNewTag("");
    }
    setShowCreateTag(false);
  };

  const onSubmitHandler = async () => {
    try {
      setShowErrors(true);
      if (formValues.Title.hasError || formValues.Description.hasError) {
        throw new Error(`Incorrect Entries Detected!`);
      }

      if (type === "create") {
        const payload = {
          title: formValues.Title.value,
          description: formValues.Description.value,
          tag: formValues.Tag.value,
          priority: formValues.Priority.value,
          startAt: formValues.StartAt.value,
          endAt: formValues.EndAt.value,
          subTasks: formValues.SubTasks.value,
        };
        await createTask(payload);
      } else {
        const todoId = params["taskId"] as string;
        const payload = {
          todoId,
          title: formValues.Title.value,
          description: formValues.Description.value,
          tag: formValues.Tag.value,
          priority: formValues.Priority.value,
          startAt: formValues.StartAt.value,
          endAt: formValues.EndAt.value,
          subTasks: formValues.SubTasks.value,
        };
        await updateTask(payload);
      }
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
    }
  };

  //use effect to handle create task
  useEffect(() => {
    try {
      if (isSuccess) {
        dispatch(
          setSnackbar({
            open: true,
            type: "success",
            message: "Task Created SuccessFully",
          })
        );
        router.push("/tasks");
      }
      if (isError) {
        let message = "Some Error Occured!";
        if ("data" in error) {
          const errorData = error.data as ApiErrorInterface;
          message = errorData.message;
        }
        dispatch(setSnackbar({ open: true, type: "error", message }));
      }
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
    }
  }, [isLoading, isError, isSuccess, error, data, dispatch, router]);

  //use effect to handle update task
  useEffect(() => {
    try {
      if (isUpdateSuccess) {
        dispatch(
          setSnackbar({
            open: true,
            type: "success",
            message: "Task Edited SuccessFully",
          })
        );
        dispatch(setIsTaskUpdatedLoading(false));
        router.push(`/tasks/${params["taskId"]}`);
      }
      if (isUpdateError) {
        let message = "Some Error Occured!";
        if ("data" in updateErrorData) {
          const errorData = updateErrorData.data as ApiErrorInterface;
          message = errorData.message;
        }
        throw new Error(message);
      }
      if (isUpdateLoading) {
        dispatch(setIsTaskUpdatedLoading(true));
      }
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
      dispatch(setIsTaskUpdatedLoading(false));
    }
  }, [
    isUpdateLoading,
    isUpdateError,
    isUpdateSuccess,
    updateErrorData,
    updateData,
    dispatch,
    router,
    params,
  ]);

  //use effect to fill form values in case of edit
  useEffect(() => {
    if (taskDetails && type === "edit") {
      setFormValues({
        Title: { value: taskDetails.title, hasError: false, isOptional: false },
        Description: {
          value: taskDetails.description,
          hasError: false,
          isOptional: true,
        },
        Priority: {
          value: taskDetails.priority,
          hasError: false,
          isOptional: false,
        },
        Tag: {
          value: taskDetails.tag,
          hasError: false,
          isOptional: false,
        },
        StartAt: {
          value: dayjs(taskDetails.startAt).format("YYYY-MM-DD"),
          hasError: false,
          isOptional: false,
        },
        EndAt: {
          value: dayjs(taskDetails.endAt).format("YYYY-MM-DD"),
          hasError: false,
          isOptional: false,
        },
        SubTasks: {
          value: taskDetails.subTasks,
          hasError: false,
          isOptional: false,
        },
      });
      const newTagData = tagData.some(
        (item) => item.title.toLowerCase() === taskDetails.tag.toLowerCase()
      )
        ? tagData
        : [{ title: taskDetails.tag }, ...tagData];
      setTagData(newTagData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskDetails, type]);

  return (
    <Grid2
      container
      component="form"
      sx={{ p: "1rem" }}
      gap={"1rem"}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler();
      }}
    >
      <Grid2 size={12}>
        <PrimaryHeaderDark
          textAlign={"center"}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {type === "create" ? "Create A Task" : "Edit Task"}
        </PrimaryHeaderDark>
      </Grid2>
      {/* enter title */}
      <Grid2 size={12}>
        <GlobalTextField
          fieldName="Title"
          fieldValue={formValues.Title}
          fieldValueChangeHandler={formValueHandler}
          fieldType="text"
          minMaxLength={{ min: 3, max: 50 }}
          showErrors={showErrors}
        />
      </Grid2>
      {/* enter description */}
      <Grid2 size={12}>
        <GlobalTextField
          fieldName="Description"
          fieldValue={formValues.Description}
          fieldValueChangeHandler={formValueHandler}
          fieldType="text"
          minMaxLength={{ min: 3, max: 150 }}
          showErrors={showErrors}
        />
      </Grid2>
      {/* enter sub tasks */}
      <Grid2 size={12}>
        {formValues.SubTasks.value.map((subTaskItem, index) => {
          return (
            <CustomTextField
              fullWidth
              size="small"
              key={index}
              placeholder="Subtask"
              multiline={true}
              maxRows={3}
              slotProps={{
                input: {
                  endAdornment: (
                    <>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        gap={".5rem"}
                      >
                        <IconButtonDark
                          sx={{ color: "primary.main" }}
                          onClick={() =>
                            subTaskEventsHandler({ type: "add", index })
                          }
                        >
                          <Add />
                        </IconButtonDark>

                        {index !== 0 && (
                          <IconButtonDark
                            sx={{ color: "secondary.main" }}
                            onClick={() =>
                              subTaskEventsHandler({ type: "remove", index })
                            }
                          >
                            <Close />
                          </IconButtonDark>
                        )}
                      </Stack>
                    </>
                  ),
                },
              }}
              sx={{ mb: ".5rem", py: 0 }}
              onChange={(e) => {
                subTaskEventsHandler({
                  type: "onChange",
                  index,
                  value: e.target.value,
                });
              }}
              value={subTaskItem.title}
            />
          );
        })}
      </Grid2>
      {/* enter start and end date */}
      <Grid2 size={12}>
        <Stack component={Paper} sx={{ boxShadow: "none" }}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0 1rem"}
            sx={{
              borderBottom: "1px solid",
              borderColor: "primary.contrastText",
            }}
          >
            <TextDark>Start At</TextDark>
            <CustomTextField
              type="date"
              size="small"
              value={formValues.StartAt.value}
              onChange={(e) => {
                setOtherValues({ type: "startAt", value: e.target.value });
              }}
            />
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0 1rem"}
          >
            <TextDark>End At</TextDark>
            <CustomTextField
              size="small"
              type="date"
              value={formValues.EndAt.value}
              onChange={(e) => {
                setOtherValues({ type: "endAt", value: e.target.value });
              }}
            />
          </Stack>
        </Stack>
      </Grid2>
      {/* enter tag */}
      <Grid2 size={12}>
        <Stack gap={".5rem"}>
          <TextDark fontWeight={500}>Select Tag</TextDark>
          {showCreateTag ? (
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={".5rem"}
            >
              <CustomTextField
                size="small"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Custom Tag"
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleAddNewTag();
                }}
              >
                Add
              </Button>
            </Stack>
          ) : (
            <Tabs
              value={false}
              // onChange={handleChange}
              variant="scrollable"
              scrollButtons={false}
              sx={{ alignItems: "center" }}
            >
              <IconButtonDark
                size="small"
                color="primary"
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  fontSize: "1.2rem",
                }}
                onClick={() => setShowCreateTag(true)}
              >
                <Add fontSize="inherit" />
              </IconButtonDark>
              {tagData.map((item, index) => {
                const { title } = item;

                const isCurrent = formValues.Tag.value === title;

                return (
                  <Chip
                    sx={{
                      fontSize: ".7rem",
                      fontWeight: 400,
                      textTransform: "capitalize",
                      margin: "0 .5rem",
                      padding: "0",
                    }}
                    key={index}
                    label={title}
                    variant={isCurrent ? "filled" : "outlined"}
                    color="primary"
                    onClick={() =>
                      setOtherValues({ type: "tag", value: title })
                    }
                  />
                );
              })}
            </Tabs>
          )}
        </Stack>
      </Grid2>
      {/* enter priority */}
      <Grid2 size={12}>
        <Stack gap={".5rem"}>
          <TextDark fontWeight={500}>Select Priority</TextDark>
          <Tabs
            value={false}
            // onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            sx={{ alignItems: "center" }}
          >
            {PRIORITY_DATA_FOR_FORM.map((item, index) => {
              const { title } = item;

              const isCurrent = formValues.Priority.value === title;

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              let chipColor: any = "primary";
              if (title === "high") {
                chipColor = "error";
              } else if (title === "medium") {
                chipColor = "warning";
              }

              return (
                <Chip
                  color={chipColor}
                  sx={{
                    fontSize: ".7rem",
                    fontWeight: 400,
                    textTransform: "capitalize",
                    margin: "0 .5rem",
                    padding: "0",
                  }}
                  key={index}
                  label={title}
                  variant={isCurrent ? "filled" : "outlined"}
                  onClick={() =>
                    setOtherValues({ type: "priority", value: title })
                  }
                />
              );
            })}
          </Tabs>
        </Stack>
      </Grid2>

      <Grid2 size={12}>
        {!isTaskDetailsLoading && (
          <PrimaryButton
            disabled={isTaskUpdatedLoading}
            fullWidth
            size="large"
            type="submit"
          >
            {type === "create" ? "Create Task" : "Edit Task"}
          </PrimaryButton>
        )}
      </Grid2>
    </Grid2>
  );
};

export default CreateTaskComponent;
