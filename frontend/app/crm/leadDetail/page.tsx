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

// shadcn/ui structural components & styling utilities
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import {
  UserPlus,
  Calendar,
  Phone,
  Mail,
  Bell,
  Building2,
  Globe,
  Plus,
  MessageSquare,
  X,
  FileText,
  DollarSign,
  Briefcase,
  Layers,
  CheckCircle2,
  Clock
} from "lucide-react";

type LeadDetailsModalProps = {
  lead: any;
  onCloseAction: () => void;
};

export default function LeadDetailsModal({
  lead,
  onCloseAction,
}: LeadDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Lead");

  const [checklists, setChecklists] = useState(lead?.checklists || []);
  const [newChecklistItem, setNewChecklistItem] = useState("");

  const [comments, setComments] = useState(lead?.comments || []);
  const [newComment, setNewComment] = useState("");

  const [reminderText, setReminderText] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
    
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(lead?.notes || "");
  const [savedReminders, setSavedReminders] = useState<any[]>([]);
  const [savedDescriptions, setSavedDescriptions] = useState<any[]>([]);
    
  const [createComment] = useCreateCommentMutation();
  const [createChecklist] = useCreateChecklistMutation();
  const [createDescription] = useCreateDescriptionMutation();
  const [createReminder] = useCreateReminderMutation();

  const { data: commentsData } = useGetCommentsQuery();
  const { data: checklistData } = useGetChecklistsQuery();
  const { data: descriptionData } = useGetDescriptionsQuery();
  const { data: reminderData } = useGetRemindersQuery();

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
    } as any);

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
    if (!reminderText || !reminderDate || !reminderTime) {
      return;
    }

    await createReminder({
      lead_id: lead?.id,
      text: reminderText,
      date: reminderDate,
      time: reminderTime,
    } as any);

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
    } as any);

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
    } as any);

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
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans antialiased selection:bg-zinc-950/10 transition-all duration-300">
      <div className="bg-zinc-50/95 rounded-2xl w-full max-w-7xl h-[92vh] flex flex-col border border-zinc-200/80 overflow-hidden shadow-2xl shadow-zinc-950/5 relative">
        
        {/* HEADER CUSTOM TABS CONTAINMENT CONTAINER */}
        
<div className="flex items-center justify-between border-b border-emerald-80/60 px-8 py-1.5 bg-emerald-700/100 backdrop-blur-xs">
  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
    <TabsList className="bg-transparent gap-6 h-auto p-0 rounded-none border-b-0">
      {["Lead", "Address", "Information", "my notes"].map((tab) => (
        <TabsTrigger
          key={tab}
          value={tab}
          className={cn(
            "pt-4 pb-3 px-0 text-xs font-bold uppercase tracking-wider bg-transparent rounded-none border-b-2 border-transparent transition-all cursor-pointer data-[state=active]:border-emerald-800 data-[state=active]:text-emerald-900 text-emerald-600/70 hover:text-emerald-800 data-[state=active]:bg-transparent shadow-none"
          )}
        >
          {tab}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>

  <Button 
    variant="outline"
    size="icon"
    onClick={onClose}
    className="rounded-full w-8 h-8 border border-emerald-200/50 bg-white hover:bg-emerald-50/60 text-emerald-600 hover:text-emerald-900 transition-all shadow-xs cursor-pointer active:scale-95"
  >
    <X className="w-4 h-4" />
  </Button>
</div>
        {/* WORKSPACE CONTENT BODY */}
        <div className="flex flex-1 overflow-hidden bg-white">

          {/* LEFT INTERACTION CANVAS */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-zinc-200">

            {/* MAIN BUSINESS LOGIC SNAPSHOT WORKSPACE */}
            {activeTab === "Lead" && (
              <div className="space-y-6">
                <Card className="border border-zinc-200/80 rounded-xl bg-gradient-to-r from-zinc-50/50 to-white shadow-xs overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-zinc-950" />
                  <CardContent className="p-6 pl-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-100/80 px-2.5 py-1 rounded inline-block mix-blend-multiply">Active Pipeline Record</span>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-950 mt-3">
                      {lead?.lead_title || "No Lead Title"}
                    </h1>
                  </CardContent>
                </Card>

                {/* DESCRIPTIONS MODULE ASYNC RENDERING CONTAINER */}
                <Card className="border border-zinc-200/80 rounded-xl bg-white shadow-xs">
                  <CardHeader className="p-6 pb-3 border-b border-zinc-100 flex-row items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-zinc-400" />
                      <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Profile Workspace Context
                      </CardTitle>
                    </div>

                    <div className="flex gap-2">
                      {!isEditingDescription ? (
                        <Button
                          variant="outline"
                          onClick={() => setIsEditingDescription(true)}
                          className="h-8 text-xs font-bold rounded-lg border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-950 transition-colors cursor-pointer shadow-xs"
                        >
                          Edit
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={handleSaveDescription}
                            className="h-8 bg-zinc-950 hover:bg-zinc-900 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsEditingDescription(false);
                              setDescription(lead?.notes || "");
                            }}
                            className="h-8 text-zinc-500 hover:text-zinc-950 text-xs font-bold rounded-lg border border-transparent hover:border-zinc-200 cursor-pointer transition-colors"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-4">
                    {isEditingDescription ? (
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full min-h-[120px] bg-zinc-50/50 border border-zinc-200 rounded-xl p-4 text-sm text-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-950/5 focus-visible:border-zinc-950 transition-all resize-none shadow-inner"
                      />
                    ) : (
                      <div className="bg-zinc-50/40 border border-zinc-200/60 rounded-xl p-4 text-sm text-zinc-600 min-h-[90px] leading-relaxed">
                        {description || "No description available"}
                      </div>
                    )}

                    {/* DYNAMIC DESCRIPTIONS ACCORDION ITEMS */}
                    {savedDescriptions.length > 0 && (
                      <div className="space-y-3 pt-2">
                        {savedDescriptions.map((item) => (
                          <div key={item.id} className="border border-zinc-200 rounded-xl p-4 bg-white space-y-3 shadow-xs">
                            <p className="text-sm text-zinc-600 leading-relaxed">{item.text}</p>
                            <div className="flex gap-3 justify-end border-t border-zinc-100 pt-3">
                              <Button
                                variant="link"
                                onClick={() => handleEditDescription(item.text)}
                                className="h-6 p-0 text-zinc-500 hover:text-zinc-950 text-xs font-bold cursor-pointer transition-colors"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="link"
                                onClick={() => handleDeleteDescription(item.id)}
                                className="h-6 p-0 text-rose-600 hover:text-rose-700 text-xs font-bold cursor-pointer transition-colors"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* TASK MILESTONE PIPELINE ACTIONS CHECKLIST CONTAINER */}
                <Card className="border border-zinc-200/80 rounded-xl bg-white shadow-xs">
                  <CardHeader className="p-6 pb-3 border-b border-zinc-100 flex-row items-center space-y-0 gap-2">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Milestone Actions Checklist
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2 bg-zinc-50/40 p-4 rounded-xl border border-zinc-200/60">
                      {checklists.length > 0 ? (
                        checklists.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-zinc-200/80 transition-all hover:border-zinc-300 shadow-xs"
                          >
                            <Checkbox
                              id={`check-${item.id}`}
                              checked={item.completed}
                              onCheckedChange={(checked) => {
                                setChecklists(
                                  checklists.map((c: any) =>
                                    c.id === item.id ? { ...c, completed: !!checked } : c
                                  )
                                );
                              }}
                              className="w-4 h-4 rounded-md border-zinc-300 data-[state=checked]:bg-zinc-950 data-[state=checked]:border-zinc-950 data-[state=checked]:text-white transition-all focus-visible:ring-zinc-950/10"
                            />
                            <label
                              htmlFor={`check-${item.id}`}
                              className={cn(
                                "text-sm font-medium cursor-pointer transition-all select-none",
                                item.completed ? "line-through text-zinc-400 font-normal" : "text-zinc-800"
                              )}
                            >
                              {item.text}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-zinc-400 py-1 italic">
                          No pipeline processing milestones indexed.
                        </p>
                      )}
                    </div>

                    <form onSubmit={handleAddChecklist} className="flex gap-2">
                      <Input
                        type="text"
                        value={newChecklistItem}
                        onChange={(e) => setNewChecklistItem(e.target.value)}
                        placeholder="Add checklist parameter item..."
                        className="border border-zinc-200 rounded-xl h-10 text-xs flex-1 bg-white focus-visible:ring-2 focus-visible:ring-zinc-950/5 focus-visible:border-zinc-950 transition-all shadow-xs"
                      />
                      <Button
                        type="submit"
                        className="bg-zinc-950 h-10 hover:bg-zinc-900 text-white px-4 rounded-xl flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all active:scale-98 shadow-md shadow-zinc-950/5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Item
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* AUDIT LOG COMMENTS LISTING CONTAINER */}
                <Card className="border border-zinc-200/80 rounded-xl bg-white shadow-xs">
                  <CardHeader className="p-6 pb-3 border-b border-zinc-100 flex-row items-center space-y-0 gap-2">
                    <MessageSquare className="w-4 h-4 text-zinc-400" />
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Internal Communications & Comments Log
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      {comments.length > 0 ? (
                        comments.map((comment: any) => (
                          <div key={comment.id} className="flex gap-3 bg-zinc-50/30 p-4 border border-zinc-200/60 rounded-xl shadow-xs">
                            <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-xs shrink-0 tracking-wider shadow-xs">
                              {comment.author?.charAt(0)}
                            </div>
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-baseline gap-2">
                                <h3 className="font-bold text-xs text-zinc-900">{comment.author}</h3>
                                <span className="text-zinc-400 text-[10px] font-medium">{comment.date}</span>
                              </div>
                              <p className="text-zinc-600 text-sm leading-relaxed break-words">{comment.text}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-zinc-400 italic">
                          No logging commentary entries indexed.
                        </p>
                      )}
                    </div>

                    <form onSubmit={handleAddComment} className="space-y-3 pt-2">
                      <Textarea
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a workspace validation log entry..."
                        className="w-full border border-zinc-200 rounded-xl p-3.5 text-sm bg-white focus-visible:ring-2 focus-visible:ring-zinc-950/5 focus-visible:border-zinc-950 transition-all resize-none shadow-xs"
                      />
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-zinc-950 hover:bg-zinc-900 text-white px-4 h-9 rounded-xl text-xs font-bold transition-all active:scale-98 cursor-pointer shadow-md shadow-zinc-950/5"
                        >
                          Add Comment
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ORGANISATION HEADQUARTERS RESILIENT ADDRESS DETAILS COMPONENT CARD */}
            {activeTab === "Address" && (
              <Card className="border border-zinc-200/80 rounded-xl bg-white shadow-xs">
                <CardHeader className="p-6 pb-3 border-b border-zinc-100 flex-row items-center space-y-0 gap-2">
                  <Building2 className="text-zinc-400 w-4 h-4" />
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-500">Corporate Registry Address Demographics</CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Company Name", value: lead?.company_name },
                    { label: "Job Description Allocation", value: lead?.job_title },
                    { label: "Street Identifier Line", value: lead?.street },
                    { label: "Locality / City", value: lead?.city },
                    { label: "State Parameter", value: lead?.state },
                    { label: "Postal Code / Zip", value: lead?.zip_code },
                    { label: "Country Origin", value: lead?.country },
                    { label: "Website URL Domain", value: lead?.website },
                  ].map((field, idx) => (
                    <div key={idx} className="bg-zinc-50/40 border border-zinc-200/60 p-4 rounded-xl flex flex-col justify-center shadow-xs">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{field.label}</span>
                      <span className="text-sm font-semibold text-zinc-900 break-all">{field.value || "---"}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* CONTACT PROFILE DEMOGRAPHICS METRIC COMPONENT CARD */}
            {activeTab === "Information" && (
              <Card className="border border-zinc-200/80 rounded-xl bg-white shadow-xs">
                <CardHeader className="p-6 pb-3 border-b border-zinc-100">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-500">Lead Coordinates Profile Metadata</CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "First Name", value: lead?.first_name },
                    { label: "Last Name Name", value: lead?.last_name },
                    { label: "Electronic Mail Address", value: lead?.email, isBreak: true },
                    { label: "Telephone Terminal Code", value: lead?.telephone },
                  ].map((info, idx) => (
                    <div key={idx} className="border border-zinc-200/60 rounded-xl p-4 bg-zinc-50/30 shadow-xs">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">{info.label}</span>
                      <p className={`text-sm font-semibold text-zinc-900 ${info.isBreak ? "break-all" : ""}`}>
                        {info.value || "---"}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* PERSISTENT MEMORY CANVAS CANVAS DESCRIPTIONS VIEW */}
            {activeTab === "my notes" && (
              <Card className="border border-zinc-200/80 rounded-xl bg-white shadow-xs">
                <CardHeader className="p-6 pb-3 border-b border-zinc-100">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-500">Local Memory Canvas Notes</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea
                    defaultValue={lead?.notes}
                    className="w-full min-h-[380px] border border-zinc-200 bg-zinc-50/20 rounded-xl p-5 text-sm font-medium text-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-950/5 focus-visible:border-zinc-950 transition-all resize-none shadow-xs"
                    placeholder="Draft workflow system event logs here..."
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* PERMANENT COMPACT FIXED RIGHT INTERACTOR PANEL BAR */}
          <div className="w-[360px] border-l border-zinc-200/80 bg-zinc-50/40 overflow-y-auto p-6 space-y-5 shrink-0 scrollbar-none">
            
            {/* ASSIGNED PIPELINE CONTROL ROLES MANAGERS */}
            <Card className="bg-white border border-zinc-200/80 rounded-xl shadow-xs">
              <CardContent className="p-5 space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 text-zinc-400" /> Ownership Routing
                </h2>
                <div className="flex items-center gap-3 p-3 bg-zinc-50/50 border border-zinc-200/80 rounded-xl">
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border border-dashed border-zinc-300 bg-white hover:border-zinc-950 hover:bg-zinc-50 transition-all shadow-xs cursor-pointer active:scale-95">
                    <Plus className="w-3.5 h-3.5 text-zinc-500" />
                  </Button>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Unassigned Role</span>
                </div>
              </CardContent>
            </Card>

            {/* KEY RECORD ATTRIBUTES FIELD REPOSITORIES CONTAINER */}
            <Card className="bg-white border border-zinc-200/80 rounded-xl shadow-xs">
              <CardContent className="p-5 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Account Parameters Overview
                </h2>
                
                <div className="space-y-2">
                  {[
                    { label: "Projected Deal Valuation", value: `₹ ${lead?.lead_value || 0}`, icon: DollarSign },
                    { label: "Lifecycle Stage State", value: lead?.stage || "new", icon: Layers, isCapitalize: true },
                    { label: "Timestamp Registration", value: lead?.created || "---", icon: Calendar },
                    { label: "Profile Category Origin", value: lead?.category || "---", icon: Briefcase },
                    { label: "Contact Phone Access", value: lead?.telephone || "---", icon: Phone },
                    { label: "Electronic Mail Node", value: lead?.email || "---", icon: Mail, isBreak: true },
                    { label: "Web Portal Identifier URL", value: lead?.website || "---", icon: Globe },
                  ].map((meta, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-zinc-50/50 border border-zinc-200/60 p-3 rounded-xl shadow-xs hover:bg-zinc-50/80 transition-colors">
                      <meta.icon className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">{meta.label}</span>
                        <span className={`text-xs font-bold text-zinc-900 block truncate ${meta.isCapitalize ? "capitalize" : ""} ${meta.isBreak ? "break-all" : ""}`}>
                          {meta.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* TEMPORAL REMINDERS SCHEDULER MODULE SNAPSHOT COMPONENT CONTAINER */}
            <Card className="bg-white border border-zinc-200/80 rounded-xl shadow-xs">
              <CardContent className="p-5 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-zinc-400" /> Notifications & Reminders
                </h2>

                <div className="space-y-2 bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-200/80">
                  <div className="relative">
                    <Bell className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      type="text"
                      value={reminderText}
                      onChange={(e) => setReminderText(e.target.value)}
                      placeholder="Task alert agenda context..."
                      className="w-full h-8 pl-8 pr-2.5 text-xs bg-white border border-zinc-200 focus-visible:ring-2 focus-visible:ring-zinc-950/5 rounded-lg font-medium text-zinc-950 shadow-xs"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                      <Input
                        type="date"
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                        className="w-full h-8 pl-8 pr-1 text-[11px] bg-white border border-zinc-200 rounded-lg font-medium text-zinc-950 shadow-xs"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                      <Input
                        type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="w-full h-8 pl-8 pr-1 text-[11px] bg-white border border-zinc-200 rounded-lg font-medium text-zinc-950 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-1.5 pt-1">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setReminderText("");
                        setReminderDate("");
                        setReminderTime("");
                      }}
                      className="h-6 px-2.5 bg-white border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-950 text-[10px] font-bold rounded-md cursor-pointer shadow-xs transition-colors"
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={handleSaveReminder}
                      className="h-6 px-2.5 bg-zinc-950 hover:bg-zinc-900 text-white text-[10px] font-bold rounded-md flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5" /> Save Reminder
                    </Button>
                  </div>
                </div>

                {/* ASYNC SCHEDULER PERSISTED METRIC DYNAMIC LOG LISTINGS */}
                {savedReminders.length > 0 && (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pt-1 scrollbar-thin">
                    {savedReminders.map((item) => (
                      <div key={item.id} className="bg-zinc-50/60 border border-zinc-200 rounded-xl p-3 flex items-start gap-2.5 shadow-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 mt-1.5 shrink-0 animate-pulse"></div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-xs text-zinc-950 truncate">{item.text}</p>
                          <p className="text-[10px] font-medium text-zinc-400 mt-0.5">
                            {item.date} at {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}