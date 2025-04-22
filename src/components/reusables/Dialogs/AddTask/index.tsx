"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { CustomSelect } from "../../select";
import Button from "../../Button";
import {
  faCirclePlus,
  faListCheck,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberSelect from "../../MemberSelect";
import { useCreateTask } from "@/hooks/api/tasks";
import { TTask } from "@/types";

export default function AddTask() {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("to-do");
  const [status, setStatus] = useState<string>("todo");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const { loading, handleCreateTask } = useCreateTask();

  const [task, setTask] = useState<TTask>({
    description: "",
    workspace_id: "",
    assignee: {
      id: "",
      name: "",
      email: "",
      profileImage: "",
    },
    deadline: "",
    status: "",
  });

  const handleDialogClose = () => {
    if (!isSelectOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-fit items-center justify-center gap-2 rounded-[5px] bg-[#242424] px-3 text-[14px] font-regular text-white transition-all duration-300 hover:bg-black"
      >
        {/* <FontAwesomeIcon icon={faListCheck} /> */}
        <FontAwesomeIcon icon={faPlus} />
        Add Task
      </button>
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 font-madei transition duration-300 ease-out data-[closed]:opacity-0"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel
            className="h-fit w-[600px] space-y-8 rounded-xl bg-white px-8 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogTitle className="flex flex-row items-center justify-between font-medium">
              <p className="text-[18px]">Add Task</p>
              <div
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black"
              >
                <FontAwesomeIcon icon={faXmark} className="fa-sm text-white" />
              </div>
            </DialogTitle>
            {/* <Description className="pb-6">
              <p className="w-[80%] text-[14px] font-light leading-4 text-[#777]">
                Set up a space to manage your tasks and collaborate with your
                team.
              </p>
            </Description> */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="spaceName" className="text-[14px]">
                    Description
                    {/* <span className="font-light text-[#999]">(optional)</span> */}
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter description"
                    value={task.description}
                    onChange={(e) =>
                      setTask((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="h-[80px] max-h-[100px] w-full rounded-md border-[1px] border-gray-400 px-2 py-2 text-[14px] font-light text-[#444] placeholder-[#999] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  />
                </div>

                <div className="flex flex-row-reverse gap-2">
                  <div className="flex flex-1 flex-col gap-1">
                    <label htmlFor="deadline" className="text-[14px]">
                      Deadline
                    </label>
                    <input
                      name="deadline"
                      type="date"
                      placeholder="Add deadline"
                      value={task.deadline}
                      className="h-[40px] w-full rounded-md border-[1px] border-gray-400 px-2 text-[14px] font-light text-[#444] placeholder-[#999] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                      onChange={(e) =>
                        setTask((prev) => ({
                          ...prev,
                          deadline: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="flex w-fit flex-col gap-1">
                    <label htmlFor="spaceName" className="text-[14px]">
                      Assignee:
                    </label>
                    {/* <CustomSelect
                      options={[
                        { label: "Member", value: "member" },
                        { label: "Admin", value: "admin" },
                      ]}
                      placeholder="Assignee"
                      onChange={(value: any) => console.log("Selected:", value)}
                      className="w-[200px] bg-none"
                      onOpenChange={setIsSelectOpen}
                    /> */}
                    <MemberSelect />
                  </div>
                </div>

                {/* <div className="flex flex-row items-center gap-2">
                  <span className="text-[14px]">High priority:</span>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={isToggled}
                      onChange={() => setIsToggled(!isToggled)}
                      className="peer sr-only"
                    />
                    <div className="peer h-4 w-8 rounded-full bg-gray-300 after:absolute after:left-1 after:top-0.5 after:h-3 after:w-3 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-3" />
                  </label>
                </div> */}

                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm">Status:</span>

                  <div className="flex flex-row gap-2">
                    <label
                      className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1 ${status === "todo" ? "bg-gray-200" : "bg-none"}`}
                    >
                      <input
                        type="checkbox"
                        name="status"
                        value="todo"
                        checked={status === "todo"}
                        onChange={() => setStatus("todo")}
                        className={`peer checked:accent-black`}
                      />
                      {/* <div className="h-4 w-4 rounded-full border border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500"></div> */}
                      <span className="text-sm text-gray-700">To-Do</span>
                    </label>

                    <label
                      className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] border-gray-300 px-2 py-1 ${status === "in-progress" ? "bg-gray-200" : "bg-none"}`}
                    >
                      {" "}
                      <input
                        type="checkbox"
                        name="status"
                        value="in-progress"
                        checked={status === "in-progress"}
                        onChange={() => setStatus("in-progress")}
                        className={`peer checked:accent-black`}
                      />
                      {/* <div className="h-4 w-4 rounded-full border border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500"></div> */}
                      <span className="text-sm text-gray-700">In-Progress</span>
                    </label>

                    {/* <label
                      className={`flex cursor-pointer items-center gap-1 rounded-md border-[1px] px-2 py-1 ${status === "done" ? "bg-gray-200" : "bg-none"}`}
                    >
                      {" "}
                      <input
                        type="radio"
                        name="status"
                        value="done"
                        checked={status === "done"}
                        onChange={() => setStatus("done")}
                        className="peer"
                      />
                      <div className="h-4 w-4 rounded-full border border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500"></div>
                      <span className="text-sm text-gray-700">Done</span>
                    </label> */}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 text-[14px]">
                <Button
                  text="Cancel"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-black hover:bg-gray-300"
                />
                <Button
                  text="Create"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#222] px-7 text-white hover:bg-[#111]"
                />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
