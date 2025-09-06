import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bell,
  FileText,
} from "lucide-react";

import { Section } from "@/components/shared/Section";

export function OrgPortal() {
  const [program, setProgram] = useState("postop");
  const [month, setMonth] = useState("2025-07");
  const [patientOpen, setPatientOpen] = useState(false);
  const [apiKey, setApiKey] = useState("bicare_demo_****_KEY");
  const regen = () => setApiKey("bicare_" + Math.random().toString(36).slice(2, 8) + "_KEY");

  const kpiBars = [
    { label: "PMPM", value: 1920, max: 2500 },
    { label: "Readmits (30d)", value: 18, max: 30 },
    { label: "D+3 kept", value: 12, max: 30 },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <Section title="Filters" subtitle="Pick program and month" right={<Badge variant="outline">Static demo</Badge>}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Label className="min-w-[90px]">Program</Label>
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="postop">Post-surgery</SelectItem>
                <SelectItem value="htn">Hypertension</SelectItem>
                <SelectItem value="dm">Diabetes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="min-w-[90px]">Month</Label>
            <Input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="YYYY-MM" className="w-[160px]" />
          </div>
          <Button variant="secondary">Apply</Button>
        </div>
      </Section>

      <Section title="Members" subtitle="Search & view details">
        <div className="flex items-center gap-2">
          <Input placeholder="Search by name / ID (e.g., Solange)" />
          <Button onClick={() => setPatientOpen(true)}>Open</Button>
        </div>
        <Dialog open={patientOpen} onOpenChange={setPatientOpen}>
          <DialogContent className="sm:max-w-[540px]">
            <DialogHeader>
              <DialogTitle>Member: Solange N.</DialogTitle>
              <DialogDescription>Static demo profile</DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="font-medium mb-1">Summary</div>
                <div>Program: Post-surgery</div>
                <div>Next visit: Aug 21</div>
                <div>Last contact: 2m ago</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="font-medium mb-1">Clinical</div>
                <div>Conditions: Hypertension</div>
                <div>Meds: Amlodipine</div>
                <div>Last BP: 136/84</div>
              </div>
              <div className="md:col-span-2 p-3 rounded-lg border">
                <div className="font-medium mb-1">Consent</div>
                <div className="text-xs text-gray-600">KTH EMR: shared • Access receipt available</div>
              </div>
            </div>
            <DialogFooter><Button onClick={() => setPatientOpen(false)}>Close</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Cohorts" subtitle="Discharge bundles & programs">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-4 rounded-xl bg-blue-50"><div className="text-2xl font-semibold">128</div><div className="text-xs text-gray-600">Post-surgery</div></div>
          <div className="p-4 rounded-xl bg-teal-50"><div className="text-2xl font-semibold">214</div><div className="text-xs text-gray-600">Hypertension</div></div>
          <div className="p-4 rounded-xl bg-purple-50"><div className="text-2xl font-semibold">96</div><div className="text-xs text-gray-600">Diabetes</div></div>
        </div>
      </Section>

      <Section title="Alerts" subtitle="SLA & no-shows" right={<Badge variant="secondary"><Bell className="h-3 w-3 mr-1" /> 10-min</Badge>}>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between p-3 border rounded-xl bg-white"><span>3 red-flags nearing 10-min SLA</span><div className="flex gap-2"><Button variant="outline" size="sm">Open queue</Button><Button size="sm">Notify nurse lead</Button></div></div>
          <div className="flex items-center justify-between p-3 border rounded-xl bg-white"><span>2 missed D+3 follow-ups</span><div className="flex gap-2"><Button variant="outline" size="sm">View list</Button><Button size="sm">Send reminder</Button></div></div>
        </div>
      </Section>

      <Section title="Monthly KPIs" subtitle="PMPM & outcomes" right={<Badge variant="secondary">{month}</Badge>}>
        <div className="grid md:grid-cols-3 gap-3">
          {kpiBars.map((b, i) => {
            const pct = Math.min(100, Math.round((b.value / b.max) * 100));
            return (
              <div key={i} className="p-3 rounded-xl bg-gray-50">
                <div className="text-sm text-gray-600 mb-1">{b.label}</div>
                <div className="h-2 bg-white rounded overflow-hidden border">
                  <div className="h-full bg-teal-500" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-2 text-xs text-gray-700">
                  {b.label === "PMPM" ? `RWF ${b.value.toLocaleString()}` : `${b.value}%`}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Cohort Builder" subtitle="Define inclusion rules (UI only)">
        <div className="grid gap-2 text-sm">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Program: {program}</Badge>
            <Badge variant="secondary">Region: Kigali</Badge>
            <Badge variant="secondary">Age: 40–70</Badge>
            <Badge variant="secondary">Consent: EMR shared</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Add rule</Button>
            <Button>Simulate count</Button>
          </div>
        </div>
      </Section>

      <Section title="Billing" subtitle="PMPM & exports">
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-gray-50">
            <div className="text-xs text-gray-600 mb-2">PMPM summary (static)</div>
            <div className="text-lg font-semibold">RWF 1,920</div>
          </div>
          <div className="p-3 rounded-xl bg-white border flex items-center justify-between">
            <span>Export invoice CSV</span>
            <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1" /> Export</Button>
          </div>
        </div>
      </Section>

      <Section title="Roles & API" subtitle="Access control (static)">
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-2">Users</div>
            <div className="flex items-center justify-between"><span>Alice</span><Badge>admin</Badge></div>
            <div className="flex items-center justify-between"><span>Ben</span><Badge variant="secondary">analyst</Badge></div>
            <div className="flex items-center justify-between"><span>Diana</span><Badge variant="outline">viewer</Badge></div>
            <Button variant="outline" size="sm" className="mt-2">Invite user</Button>
          </div>
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-2">API keys & webhooks</div>
            <div className="flex items-center gap-2"><Input value={apiKey} readOnly className="font-mono" /><Button size="sm" onClick={regen}>Regenerate</Button></div>
            <div className="mt-2"><Label>Webhook URL</Label><Input placeholder="https://example.org/webhooks/bicare" /></div>
          </div>
        </div>
      </Section>

      <Section title="Policies & Exports" subtitle="Retention, consent, schedules">
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-1">Data retention</div>
            <Select defaultValue="12m" onValueChange={() => {}}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="6m">6 months</SelectItem>
                <SelectItem value="12m">12 months</SelectItem>
                <SelectItem value="24m">24 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-1">Consent policy</div>
            <div className="text-xs text-gray-600">Consent receipts required for all access.</div>
          </div>
          <div className="p-3 rounded-xl bg-white border">
            <div className="font-medium mb-1">Scheduled exports</div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Send KPI CSV monthly</label>
          </div>
        </div>
      </Section>
    </div>
  );
}