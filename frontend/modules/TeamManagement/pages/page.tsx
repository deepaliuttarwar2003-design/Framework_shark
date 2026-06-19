"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, LayoutGrid, UserCheck, Sparkles } from "lucide-react";

import TeamTable from "../components/TeamTable";
import TeamForm from "../components/TeamForm";
import { useGetTeamsQuery, useDeleteTeamMutation } from "../api/teamApi";

export default function TeamPage() {
  const { data: teams = [] } = useGetTeamsQuery();
  const [deleteTeam] = useDeleteTeamMutation();

  const [open, setOpen] = useState(false);
  const [editTeam, setEditTeam] = useState<any>(null);

  const totalTeams = teams.length;
  const totalMembers = teams.reduce((sum: number, team: any) => sum + (team.members?.length || 0), 0);
  const activeTeams = teams.filter((team: any) => (team.members?.length || 0) > 0).length;

  const handleCreate = () => { setEditTeam(null); setOpen(true); };
  const handleEdit = (team: any) => { setEditTeam(team); setOpen(true); };
  const handleDelete = async (id: string) => { try { await deleteTeam(id); } catch (error) { console.error(error); } };

  const StatCard = ({ title, value, icon: Icon }: any) => (
    <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <Icon className="w-4 h-4 text-indigo-400" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    // REMOVED max-w-7xl AND mx-auto HERE to allow full width
    <div className="p-8 space-y-8 min-h-screen bg-slate-950 text-slate-100">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Team Management</h1>
          <p className="text-slate-500 mt-1">Manage your workforce architecture.</p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6"
        >
          <Sparkles className="mr-2 h-4 w-4" /> Initialize New Team
        </Button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Teams" value={totalTeams} icon={LayoutGrid} />
        <StatCard title="Total Members" value={totalMembers} icon={Users} />
        <StatCard title="Active Teams" value={activeTeams} icon={UserCheck} />
      </div>

      {/* Team Table */}
      <Card className="border border-slate-800 bg-slate-900/30">
        <CardHeader className="border-b border-slate-800 bg-slate-900/50">
          <CardTitle className="text-lg text-slate-200">Active Directory</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TeamTable
            teams={teams}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      <TeamForm open={open} setOpen={setOpen} editTeam={editTeam} />
    </div>
  );
}