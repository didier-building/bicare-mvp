import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MessageCircle,
  Bell,
  Filter,
  SortAsc,
  Brain,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
} from "lucide-react";

import { Section, Pill } from "@/components/shared/Section";
import { redFlagSamples, chatSamples, commonTemplates } from "@/data/mockData";

export function NurseConsole() {
  const initial = redFlagSamples.map((r) => ({ ...r, log: [{ t: "14:01", msg: "Auto-detected red-flag" }] }));
  const [items, setItems] = useState(initial);
  const [chats] = useState(chatSamples);
  const [sortBy, setSortBy] = useState("severity");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  
  const me = "Nurse A";
  const update = (id, patch) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const logAdd = (id, msg) => {
    const found = items.find((i) => i.id === id);
    update(id, { log: [...(found?.log || []), { t: new Date().toLocaleTimeString(), msg }] });
  };

  const take = (id) => { 
    update(id, { owner: me, status: "in-triage" }); 
    logAdd(id, "Taken by Nurse A"); 
  };
  const triage = (id) => { 
    update(id, { action: "triaged", status: "triaged" }); 
    logAdd(id, "Triaged"); 
  };
  const escalate = (id) => { 
    update(id, { action: "escalated", status: "escalated" }); 
    logAdd(id, "Escalated to MD"); 
  };
  const toggleOpen = (id) => update(id, { open: !items.find((i) => i.id === id)?.open });
  const toggleQA = (id, on) => update(id, { qa: on });

  // Sorting and filtering logic
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items;
    
    // Apply filters
    if (filterBy === "critical") {
      filtered = filtered.filter(item => item.sev === "critical");
    } else if (filterBy === "pending") {
      filtered = filtered.filter(item => !item.action);
    } else if (filterBy === "escalated") {
      filtered = filtered.filter(item => item.action === "escalated");
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === "severity") {
        const severityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
        const diff = severityOrder[b.sev] - severityOrder[a.sev];
        return diff !== 0 ? diff : a.mins - b.mins; // If same severity, sort by time
      } else if (sortBy === "time") {
        return a.mins - b.mins;
      } else if (sortBy === "facility") {
        return (a.facility || "").localeCompare(b.facility || "");
      }
      return 0;
    });
  }, [items, sortBy, filterBy]);

  const waiting = items.filter((i) => !i.action).length;
  const atRisk = items.filter((i) => !i.action && i.mins >= 8).length;
  const escalated = items.filter((i) => i.action === "escalated").length;
  const inTriage = items.filter((i) => i.status === "in-triage").length;

  const getStatusBadge = (item) => {
    if (item.status === "in-triage") return <Badge variant="outline" className="bg-blue-50">In Triage</Badge>;
    if (item.action === "escalated") return <Badge variant="outline" className="bg-red-50">Escalated</Badge>;
    if (item.action === "triaged") return <Badge variant="outline" className="bg-green-50">Triaged</Badge>;
    return <Badge variant="outline" className="bg-yellow-50">Pending</Badge>;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Red-Flags" subtitle="Prioritized by severity/time">
        {/* Filter and Sort Controls */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <SortAsc className="h-4 w-4" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="severity">Sort by Severity</option>
              <option value="time">Sort by Time</option>
              <option value="facility">Sort by Facility</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="all">All Cases</option>
              <option value="critical">Critical Only</option>
              <option value="pending">Pending</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>

        <div className="grid gap-2">
          {filteredAndSortedItems.map((rf) => (
            <div key={rf.id} className={`p-3 border rounded-xl bg-white ${rf.sev === 'critical' ? 'ring-2 ring-red-200 animate-pulse' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {rf.patient} 
                    {rf.owner && <Badge className="ml-2">{rf.owner}</Badge>}
                    {getStatusBadge(rf)}
                  </div>
                  <div className="text-sm text-gray-600">{rf.symptom}</div>
                  <div className="text-xs text-gray-500">{rf.facility} • {rf.condition}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={rf.sev === "critical" ? "bg-red-600" : "bg-orange-500"}>{rf.sev}</Badge>
                  <Pill>{rf.mins}m</Pill>
                </div>
              </div>

              {/* AI Suggestion */}
              {rf.aiSuggestion && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-center gap-2 text-sm">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">AI Suggestion:</span>
                    <span className={`ml-auto text-xs ${getConfidenceColor(rf.aiConfidence)}`}>
                      {rf.aiConfidence}% confidence
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{rf.aiSuggestion}</div>
                </div>
              )}

              <div className="mt-2 flex flex-wrap gap-2">
                {!rf.owner && <Button size="sm" onClick={() => take(rf.id)}>Take</Button>}
                <Button size="sm" variant="secondary" onClick={() => toggleOpen(rf.id)}>
                  {rf.open ? "Hide context" : "View context"}
                </Button>
                {!rf.action && rf.owner && <Button size="sm" onClick={() => triage(rf.id)}>Triage</Button>}
                {!rf.action && rf.owner && <Button size="sm" variant="outline" onClick={() => escalate(rf.id)}>Escalate</Button>}
                <Dialog>
                  <DialogTrigger asChild><Button size="sm" variant="outline">QA</Button></DialogTrigger>
                  <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                      <DialogTitle>QA checklist</DialogTitle>
                      <DialogDescription>Mark adherence for this case.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 text-sm">
                      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> SOP followed</label>
                      <label className="flex items-center gap-2"><input type="checkbox" /> Safety advice given</label>
                      <label className="flex items-center gap-2"><input type="checkbox" /> Referral considered</label>
                    </div>
                    <DialogFooter><Button onClick={() => toggleQA(rf.id, true)}>Mark QA done</Button></DialogFooter>
                  </DialogContent>
                </Dialog>
                {rf.qa && <Badge variant="outline">QA Passed</Badge>}
                <Button size="sm" variant="outline">Open SOP</Button>
              </div>

              {rf.open && (
                <div className="mt-3 grid md:grid-cols-3 gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <div className="font-medium mb-1">Medications</div>
                    <div className="text-gray-600">{rf.medications?.join(", ") || "None"}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50">
                    <div className="font-medium mb-1">Allergies</div>
                    <div className="text-gray-600">{rf.allergies?.join(", ") || "None known"}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50">
                    <div className="font-medium mb-1">Current Vitals</div>
                    <div className="text-gray-600">
                      BP: {rf.vitals?.bp}<br/>
                      HR: {rf.vitals?.hr}<br/>
                      Temp: {rf.vitals?.temp}<br/>
                      O2: {rf.vitals?.o2}
                    </div>
                  </div>
                  <div className="md:col-span-3 p-2 rounded-lg border">
                    <div className="font-medium mb-1">Timeline & Audit</div>
                    <div className="text-xs text-gray-600 space-y-1">
                      {(rf.log || []).map((l, i) => <div key={i}>• {l.t} — {l.msg}</div>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Live Chats" subtitle="Patients waiting">
        {/* Quick Templates */}
        <div className="mb-3">
          <select 
            value={selectedTemplate} 
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-full"
          >
            <option value="">Quick reply templates...</option>
            {commonTemplates.map((template) => (
              <option key={template.id} value={template.text}>
                {template.text.substring(0, 50)}...
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          {chats.map((chat, i) => (
            <div key={chat.id} className={`flex items-center justify-between p-3 border rounded-xl bg-white ${chat.priority === 'urgent' ? 'ring-2 ring-orange-200' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{chat.patient.split(" ")[0][0]}{chat.patient.split(" ")[1]?.[0] ?? ""}</AvatarFallback>
                  </Avatar>
                  {chat.priority === 'urgent' && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-2 w-2 text-white" />
                    </div>
                  )}
                  {chat.isRelatedToRedFlag && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-orange-500 rounded-full" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm flex items-center gap-2">
                    {chat.patient}
                    {chat.priority === 'urgent' && <Badge variant="outline" className="bg-red-50 text-red-700">Urgent</Badge>}
                    {chat.isRelatedToRedFlag && <Badge variant="outline" className="bg-orange-50 text-orange-700">Red-flag linked</Badge>}
                  </div>
                  <div className="text-xs text-gray-600">&ldquo;{chat.lastMessage}&rdquo;</div>
                  <div className="text-xs text-gray-400">{chat.timestamp}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" /> Open
                </Button>
                <Button size="sm" variant="secondary">Quick reply</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="SLA Watch" subtitle="Alerting before breach" right={<Badge variant="secondary"><Bell className="h-3 w-3 mr-1" /> 10-min</Badge>}>
        <div className="text-sm text-gray-600 mb-2">P95 response: 2m 31s.</div>
        
        {/* Performance Trend */}
        <div className="mb-3 p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm font-medium mb-1">
            <TrendingUp className="h-4 w-4" />
            Performance Trend (Last 24h)
          </div>
          <div className="text-xs text-gray-600">
            SLA Compliance: 92% ↑ | Avg Response: 3m 12s ↓ | Peak Load: 14:30-16:00
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-center mb-3">
          <div className={`p-3 rounded-xl ${items.length - waiting > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50'} border`}>
            <div className="text-2xl font-semibold text-green-600">{items.length - waiting}</div>
            <div className="text-xs text-gray-600">Handled</div>
          </div>
          <div className={`p-3 rounded-xl ${inTriage > 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'} border`}>
            <div className="text-2xl font-semibold text-blue-600">{inTriage}</div>
            <div className="text-xs text-gray-600">In Triage</div>
          </div>
          <div className={`p-3 rounded-xl ${atRisk > 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'} border`}>
            <div className="text-2xl font-semibold text-yellow-600">{atRisk}</div>
            <div className="text-xs text-gray-600">At Risk</div>
          </div>
          <div className={`p-3 rounded-xl ${escalated > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50'} border`}>
            <div className="text-2xl font-semibold text-red-600">{escalated}</div>
            <div className="text-xs text-gray-600">Escalated</div>
          </div>
        </div>

        {/* Workload Distribution */}
        <div className="mb-3 p-2 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-center gap-2 text-sm font-medium mb-1">
            <Users className="h-4 w-4 text-blue-600" />
            Team Workload
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Nurse A (You):</span>
              <span className="font-medium">{items.filter(i => i.owner === me).length} active cases</span>
            </div>
            <div className="flex justify-between">
              <span>Nurse B:</span>
              <span>2 active cases</span>
            </div>
            <div className="flex justify-between">
              <span>Nurse C:</span>
              <span>4 active cases</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {atRisk > 0 && (
          <div className="p-2 rounded-md bg-yellow-100 border border-yellow-300 text-xs">
            <div className="flex items-center gap-1 text-yellow-800">
              <Clock className="h-3 w-3" />
              <span className="font-medium">SLA Alert:</span>
            </div>
            <div className="text-yellow-700 mt-1">
              {atRisk} case(s) approaching 10-minute SLA — prioritize triage.
            </div>
          </div>
        )}
        
        {waiting === 0 && (
          <div className="p-2 rounded-md bg-green-100 border border-green-300 text-xs">
            <div className="flex items-center gap-1 text-green-800">
              <CheckCircle2 className="h-3 w-3" />
              <span className="font-medium">All Clear:</span>
            </div>
            <div className="text-green-700 mt-1">
              No pending cases. Great work maintaining SLA compliance!
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}