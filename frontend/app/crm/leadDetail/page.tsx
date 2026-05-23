"use client";

import React, { useState } from "react";
import {
  useGetChecklistsQuery,
  useGetDescriptionsQuery,
  useCreateReminderMutation,
  useGetCommentsQuery,
  useCreateChecklistMutation,
  useCreateDescriptionMutation,
  useGetRemindersQuery,
  useCreateCommentMutation,
} from "@/modules/crm/slices/leadApiSlice";

import {
  UserPlus,
  Tag,
  Calendar,
  Folder,
  Phone,
  Mail,
  Link2,
  Bell,
  Building2,
  Globe,
  Plus,
  MessageSquare,
  X,
  Save,
} from "lucide-react";

type LeadDetailsModalProps = {
  lead: any;
  onClose: () => void;
};

export default function LeadDetailsModal({
  lead,
  onClose,
}: LeadDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Lead");

  const [checklists, setChecklists] = useState(
    lead?.checklists || []
  );

  const [newChecklistItem, setNewChecklistItem] =
    useState("");

  const [comments, setComments] = useState(
    lead?.comments || []
  );

  const [newComment, setNewComment] = useState("");

  const [reminderText, setReminderText] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
    
  const [isEditingDescription, setIsEditingDescription] =
  useState(false);

const [description, setDescription] = useState(
  lead?.notes || ""
);
const [savedReminders, setSavedReminders] =
  useState<any[]>([]);

const [savedDescriptions, setSavedDescriptions] =
  useState<any[]>([]);
    
const [createComment] =
  useCreateCommentMutation();

const [createChecklist] =
  useCreateChecklistMutation();

const [createDescription] =
  useCreateDescriptionMutation();

const [createReminder] =
  useCreateReminderMutation();

const { data: commentsData } =
  useGetCommentsQuery();

const { data: checklistData } =
  useGetChecklistsQuery();

const { data: descriptionData } =
  useGetDescriptionsQuery();

const { data: reminderData } =
  useGetRemindersQuery();

  React.useEffect(() => {

  if (commentsData) {
    setComments(commentsData);
  }

}, [commentsData]);
React.useEffect(() => {

  if (reminderData) {
    setSavedReminders(reminderData);
  }

}, [reminderData]);

const handleSaveDescription = async () => {

  if (!description.trim()) return;

  await createDescription({
    lead_id: lead?.id,
    text: description,
  });

  setSavedDescriptions([
    ...savedDescriptions,
    {
      id: Date.now(),
      text: description,
    },
  ]);

  setIsEditingDescription(false);
};

const handleDeleteDescription = (id: number) => {
  setSavedDescriptions(
    savedDescriptions.filter((item) => item.id !== id)
  );
};

const handleEditDescription = (text: string) => {
  setDescription(text);
  setIsEditingDescription(true);
};
   const handleSaveReminder = async () => {

  if (
    !reminderText ||
    !reminderDate ||
    !reminderTime
  ) {
    return;
  }

  await createReminder({
    lead_id: lead?.id,
    text: reminderText,
    date: reminderDate,
    time: reminderTime,
  });

  setSavedReminders([
    ...savedReminders,
    {
      id: Date.now(),
      text: reminderText,
      date: reminderDate,
      time: reminderTime,
    },
  ]);

  setReminderText("");
  setReminderDate("");
  setReminderTime("");
};

  const handleAddChecklist = async (e: any) => {
    e.preventDefault();

    if (!newChecklistItem.trim()) return;
     await createChecklist({
     lead_id: lead?.id,
     text: newChecklistItem,
     completed: false,
  });

    setChecklists([
      ...checklists,
      {
        id: Date.now(),
        text: newChecklistItem,
        completed: false,
      },
    ]);

    setNewChecklistItem("");
  };

  const handleAddComment = async (e: any) => {

  e.preventDefault();

  if (!newComment.trim()) return;

  await createComment({
    lead_id: lead?.id,
    text: newComment,
    author: "You",
  });

  setComments([
    ...comments,
    {
      id: Date.now(),
      author: "You",
      date: new Date().toLocaleDateString(),
      text: newComment,
    },
  ]);

  setNewComment("");
};

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-7xl h-[95vh] overflow-hidden shadow-2xl flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-8 py-4 bg-white">
          <div className="flex gap-8">

            {["Lead", "Address", "Information", "my notes"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-[15px] font-medium border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">

          {/* LEFT SIDE */}
          <div className="flex-1 overflow-y-auto p-8">

            {/* LEAD TAB */}
            {activeTab === "Lead" && (
              <div className="space-y-8">

                <h1 className="text-2xl font-bold text-blue-500">
                  {lead?.lead_title || "No Lead Title"}
                </h1>

                {/* DESCRIPTION */}
               {/* DESCRIPTION */}
<div className="border-t pt-8">

  <div className="flex justify-between items-center mb-3">

    <h2 className="text-xl font-semibold text-gray-700">
      Description
    </h2>

    <div className="flex gap-2">

      {!isEditingDescription ? (
        <button
          onClick={() => setIsEditingDescription(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Edit
        </button>
      ) : (
        <>
          <button
            onClick={handleSaveDescription}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Save
          </button>

          <button
            onClick={() => {
              setIsEditingDescription(false);
              setDescription("");
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
          >
            Cancel
          </button>
        </>
      )}

    </div>
  </div>

  {isEditingDescription ? (
    <textarea
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
      className="w-full min-h-[120px] bg-gray-100 rounded-lg p-5 text-lg text-gray-700 outline-none border"
    />
  ) : (
    <div className="bg-gray-100 rounded-lg p-5 text-lg text-gray-700 min-h-[90px]">
      {description || "No description available"}
    </div>
  )}

  {/* SAVED DESCRIPTIONS */}

  <div className="mt-6 space-y-4">

    {savedDescriptions.map((item) => (
      <div
        key={item.id}
        className="border rounded-xl p-4 bg-white shadow-sm"
      >

        <p className="text-gray-700">
          {item.text}
        </p>

        <div className="flex gap-3 mt-4">

          <button
            onClick={() =>
              handleEditDescription(item.text)
            }
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() =>
              handleDeleteDescription(item.id)
            }
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>

        </div>
      </div>
    ))}

  </div>

</div>


                {/* CHECKLIST */}
                <div className="border-t pt-8">
                  <h2 className="text-xl font-semibold text-gray-700 mb-5">
                    Checklist
                  </h2>

                  <div className="space-y-4">

                    {checklists.length > 0 ? (
                      checklists.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => {
                              setChecklists(
                                checklists.map((c: any) =>
                                  c.id === item.id
                                    ? {
                                        ...c,
                                        completed: !c.completed,
                                      }
                                    : c
                                )
                              );
                            }}
                          />

                          <span className="text-lg">
                            {item.text}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">
                        No checklist items
                      </p>
                    )}
                  </div>

                  <form
                    onSubmit={handleAddChecklist}
                    className="flex gap-3 mt-5"
                  >
                    <input
                      type="text"
                      value={newChecklistItem}
                      onChange={(e) =>
                        setNewChecklistItem(e.target.value)
                      }
                      placeholder="Add item"
                      className="border rounded-lg px-4 py-3 flex-1"
                    />

                    <button
                      type="submit"
                      className="bg-gray-100 px-5 rounded-lg flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </form>
                </div>

                {/* COMMENTS */}
                <div className="border-t pt-8">
                  <h2 className="text-xl font-semibold text-gray-700 mb-5">
                    Comments
                  </h2>

                  <div className="space-y-5">

                    {comments.length > 0 ? (
                      comments.map((comment: any) => (
                        <div
                          key={comment.id}
                          className="flex gap-4"
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                            {comment.author?.charAt(0)}
                          </div>

                          <div>
                            <div className="flex gap-3 items-center">
                              <h3 className="font-semibold text-lg">
                                {comment.author}
                              </h3>

                              <span className="text-gray-400 text-sm">
                                {comment.date}
                              </span>
                            </div>

                            <p className="text-gray-600 mt-1 text-lg">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">
                        No comments available
                      </p>
                    )}
                  </div>

                  <form
                    onSubmit={handleAddComment}
                    className="mt-6"
                  >
                    <textarea
                      rows={4}
                      value={newComment}
                      onChange={(e) =>
                        setNewComment(e.target.value)
                      }
                      placeholder="Write a comment..."
                      className="w-full border rounded-xl p-4"
                    />

                    <button
                      type="submit"
                      className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg"
                    >
                      Add Comment
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ADDRESS TAB */}
            {activeTab === "Address" && (
              <div className="space-y-8">

                <div className="flex items-center gap-2 border-b pb-4">
                  <Building2 className="text-purple-500" />

                  <h2 className="text-2xl font-semibold">
                    Organisation
                  </h2>
                </div>

                <div className="space-y-2 text-lg">

                  <div className="border-b pb-4">
                    <strong>Company Name :</strong>{" "}
                    {lead?.company_name || "---"}
                  </div>

                  <div className="border-b pb-4">
                    <strong>Job :</strong>{" "}
                    {lead?.job_title || "---"}
                  </div>

                  <div className="border-b pb-4">
                    <strong>Street :</strong>{" "}
                    {lead?.street || "---"}
                  </div>

                  <div className="border-b pb-4">
                    <strong>City :</strong>{" "}
                    {lead?.city || "---"}
                  </div>

                  <div className="border-b pb-4">
                    <strong>State :</strong>{" "}
                    {lead?.state || "---"}
                  </div>

                  <div className="border-b pb-4">
                    <strong>Zip Code :</strong>{" "}
                    {lead?.zip_code || "---"}
                  </div>

                  <div className="border-b pb-4">
                    <strong>Country :</strong>{" "}
                    {lead?.country || "---"}
                  </div>

                  <div className="border-b pb-4">
                    <strong>Website :</strong>{" "}
                    {lead?.website || "---"}
                  </div>
                </div>
              </div>
            )}

            {/* INFORMATION TAB */}
            {activeTab === "Information" && (
              <div className="space-y-6">

                <h2 className="text-3xl font-bold text-green-700">
                  Lead Information
                </h2>

                <div className="grid grid-cols-2 gap-6">

                  <div className="border rounded-xl p-5">
                    <p className="text-gray-400 text-sm mb-2">
                      First Name
                    </p>

                    <p className="text-xl font-medium">
                      {lead?.first_name || "---"}
                    </p>
                  </div>

                  <div className="border rounded-xl p-5">
                    <p className="text-gray-400 text-sm mb-2">
                      Last Name
                    </p>

                    <p className="text-xl font-medium">
                      {lead?.last_name || "---"}
                    </p>
                  </div>

                  <div className="border rounded-xl p-5">
                    <p className="text-gray-400 text-sm mb-2">
                      Email
                    </p>

                    <p className="text-xl font-medium break-all">
                      {lead?.email || "---"}
                    </p>
                  </div>

                  <div className="border rounded-xl p-5">
                    <p className="text-gray-400 text-sm mb-2">
                      Phone
                    </p>

                    <p className="text-xl font-medium">
                      {lead?.telephone || "---"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* NOTES TAB */}
            {activeTab === "my notes" && (
              <div>

                <h2 className="text-3xl font-bold text-green-700 mb-6">
                  My Notes
                </h2>

                <textarea
                  defaultValue={lead?.notes}
                  className="w-full min-h-[400px] border rounded-2xl p-5 text-lg outline-none"
                  placeholder="Write notes here..."
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-[360px] border-l bg-gray-50 overflow-y-auto p-6">

            <div className="space-y-8">

              {/* ASSIGNED USER */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Assigned Users
                </h2>

                <button className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </button>
              </div>

              {/* DETAILS */}
              <div>

                <h2 className="text-xl font-semibold mb-5">
                  Details
                </h2>

                <div className="space-y-4">

                  <input
                    value={`₹ ${lead?.lead_value || 0}`}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-white"
                  />

                  <input
                    value={lead?.stage || "new"}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-white"
                  />

                  <input
                    value={lead?.created || "---"}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-white"
                  />

                  <input
                    value={lead?.category || "---"}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-white"
                  />

                  <input
                    value={lead?.telephone || "---"}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-white"
                  />

                  <input
                    value={lead?.email || "---"}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-white"
                  />

                  <input
                    value={lead?.website || "---"}
                    readOnly
                    className="w-full border rounded-lg px-4 py-3 bg-white"
                  />
                </div>
              </div>

              {/* REMINDER */}
              <div>

                <button className="w-full bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                  <Bell className="w-4 h-4" />
                  Add a Reminder
                </button>

                <div className="bg-blue-50 p-4 rounded-xl mt-4 space-y-3">

                  <input
                    type="text"
                    value={reminderText}
                    onChange={(e) =>
                      setReminderText(e.target.value)
                    }
                    placeholder="Reminder text"
                    className="w-full border rounded-md px-3 py-2"
                  />

                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) =>
                      setReminderDate(e.target.value)
                    }
                    className="w-full border rounded-md px-3 py-2"
                  />

                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) =>
                      setReminderTime(e.target.value)
                    }
                    className="w-full border rounded-md px-3 py-2"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                   onClick={() => {
                   setReminderText("");
                   setReminderDate("");
                   setReminderTime("");
                    }}
                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                   >
                    Close
                  </button>
                 <button
                 onClick={handleSaveReminder}
                 className="px-4 py-2 bg-blue-600 text-white rounded-md"
                   >
                    Save
                  </button>
                    
                  </div>
                </div>
              </div>
             {/* SAVED REMINDERS */}

<div className="mt-5 space-y-3">

  {savedReminders.map((item) => (

    <div
      key={item.id}
      className="bg-white border rounded-lg p-3"
    >

      <p className="font-medium text-gray-700">
        {item.text}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        {item.date} at {item.time}
      </p>

    </div>

  ))}

</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}