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
  Filter,
  Download,
  Save,
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";

import { Section } from "@/components/shared/Section";

export function OrgPortal() {
  const [program, setProgram] = useState("postop");
  const [month, setMonth] = useState("2025-07");
  const [patientOpen, setPatientOpen] = useState(false);
  const [apiKey, setApiKey] = useState("bicare_demo_****_KEY");
  const regen = () => setApiKey("bicare_" + Math.random().toString(36).slice(2, 8) + "_KEY");

  // Enhanced Filter State
  const [cohort, setCohort] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [savedFilters, setSavedFilters] = useState([
    { id: 1, name: "Hypertension - July", active: false },
    { id: 2, name: "High Risk Diabetes", active: false },
  ]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");

  const kpiBars = [
    { label: "PMPM", value: 1920, max: 2500, benchmark: 2100, trend: "down" },
    { label: "Readmits (30d)", value: 18, max: 30, benchmark: 25, trend: "down" },
    { label: "D+3 kept", value: 12, max: 30, benchmark: 20, trend: "up" },
    { label: "Med Adherence", value: 82, max: 100, benchmark: 85, trend: "up" },
    { label: "On-time Visits", value: 91, max: 100, benchmark: 90, trend: "up" },
    { label: "Avoided ER", value: 47, max: 60, benchmark: 50, trend: "down" },
  ];

  const cohortData = [
    { name: "Post-surgery", count: 128, trend: "up", change: "+12", color: "blue" },
    { name: "Hypertension", count: 214, trend: "down", change: "-8", color: "teal" },
    { name: "Diabetes", count: 96, trend: "up", change: "+5", color: "purple" },
  ];

  const alertsData = [
    { 
      id: 1, 
      text: "3 red-flags nearing 10-min SLA", 
      severity: "warning", 
      patients: ["Solange N.", "Jean P.", "Marie K."],
      staff: "Nurse Lead A"
    },
    { 
      id: 2, 
      text: "2 missed D+3 follow-ups", 
      severity: "critical", 
      patients: ["Paul M.", "Sarah L."],
      staff: "Care Coordinator B"
    },
  ];

  const saveFilter = () => {
    const filterName = `${program} - ${month}`;
    setSavedFilters([...savedFilters, { 
      id: Date.now(), 
      name: filterName, 
      active: false,
      filters: { program, month, cohort, ageRange, location, severity }
    }]);
  };

  const exportResults = (format) => {
    console.log(`Exporting filtered results as ${format}`);
    // In a real app, this would trigger download
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Section title="Enhanced Filters" subtitle="Multi-filter search with saved presets" right={<Badge variant="outline">Enhanced</Badge>}>
        {/* Basic Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
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
          <Button 
            variant="outline" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Advanced
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </Button>
          <Button variant="secondary">Apply</Button>
        </div>

        {/* Advanced Filters (Collapsible) */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <Label className="min-w-[70px]">Cohort</Label>
              <Select value={cohort} onValueChange={setCohort}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="new">New admissions</SelectItem>
                  <SelectItem value="returning">Returning patients</SelectItem>
                  <SelectItem value="high-risk">High-risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="min-w-[70px]">Age</Label>
              <Select value={ageRange} onValueChange={setAgeRange}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="18-35">18-35</SelectItem>
                  <SelectItem value="36-50">36-50</SelectItem>
                  <SelectItem value="51-65">51-65</SelectItem>
                  <SelectItem value="65+">65+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="min-w-[70px]">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="kigali">Kigali</SelectItem>
                  <SelectItem value="butare">Butare</SelectItem>
                  <SelectItem value="ruhengeri">Ruhengeri</SelectItem>
                  <SelectItem value="rural">Rural areas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="min-w-[70px]">Severity</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Advanced Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex items-center gap-2 flex-1">
            <Label className="min-w-[90px]">Search by</Label>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name/ID</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="emr">EMR ID</SelectItem>
                <SelectItem value="claim">Claim Ref</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              value={advancedSearch} 
              onChange={(e) => setAdvancedSearch(e.target.value)}
              placeholder={`Search by ${searchType}...`}
              className="flex-1"
            />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Saved Filters & Export */}
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Label className="text-sm text-gray-600">Saved filters:</Label>
            {savedFilters.map((filter) => (
              <Badge 
                key={filter.id}
                variant={filter.active ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSavedFilters(savedFilters.map(f => 
                  f.id === filter.id ? {...f, active: !f.active} : {...f, active: false}
                ))}
              >
                {filter.name}
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={saveFilter}>
              <Save className="h-4 w-4 mr-1" />
              Save current
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => exportResults('csv')}>
              <Download className="h-4 w-4 mr-1" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportResults('pdf')}>
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Enhanced Members" subtitle="Patient snapshots with bulk actions">
        <div className="flex items-center gap-2 mb-4">
          <Input 
            placeholder="Search by name / ID (e.g., Solange)" 
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => setPatientOpen(true)}>Open Profile</Button>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-1" />
            Bulk Actions
          </Button>
        </div>

        {/* Patient Snapshots */}
        <div className="grid gap-3 mb-4">
          {[
            { name: "Solange N.", cohort: "Post-surgery", lastVisit: "2 days ago", status: "On track", statusColor: "green" },
            { name: "Jean P.", cohort: "Hypertension", lastVisit: "1 week ago", status: "At risk", statusColor: "yellow" },
            { name: "Marie K.", cohort: "Diabetes", lastVisit: "3 days ago", status: "Excellent", statusColor: "green" },
          ].map((patient, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-gray-600">{patient.cohort} • Last visit: {patient.lastVisit}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={patient.statusColor === 'green' ? 'default' : patient.statusColor === 'yellow' ? 'secondary' : 'outline'}>
                  {patient.status}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => setPatientOpen(true)}>
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={patientOpen} onOpenChange={setPatientOpen}>
          <DialogContent className="sm:max-w-[640px]">
            <DialogHeader>
              <DialogTitle>Patient Profile: Solange N.</DialogTitle>
              <DialogDescription>Comprehensive patient overview</DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="font-medium mb-2">Summary</div>
                <div>Program: Post-surgery</div>
                <div>Next visit: Aug 21</div>
                <div>Last contact: 2m ago</div>
                <div>Status: On track</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="font-medium mb-2">Clinical</div>
                <div>Conditions: Hypertension</div>
                <div>Meds: Amlodipine</div>
                <div>Last BP: 136/84</div>
                <div>Adherence: 92%</div>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="font-medium mb-2">Recent Visits</div>
                <div className="space-y-1 text-xs">
                  <div>Aug 19: Follow-up call - Normal</div>
                  <div>Aug 15: BP check - 138/86</div>
                  <div>Aug 12: Medication review</div>
                </div>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="font-medium mb-2">Outcomes & Alerts</div>
                <div className="space-y-1 text-xs">
                  <div className="text-green-600">✓ D+3 visit completed</div>
                  <div className="text-green-600">✓ Medication adherent</div>
                  <div className="text-yellow-600">⚠ BP slightly elevated</div>
                </div>
              </div>
              <div className="md:col-span-2 p-3 rounded-lg border">
                <div className="font-medium mb-2">Consent & Privacy</div>
                <div className="text-xs text-gray-600">
                  KTH EMR: shared • Access receipt available • GDPR compliant
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Send Reminder</Button>
              <Button variant="outline">Export Data</Button>
              <Button onClick={() => setPatientOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Enhanced Cohorts" subtitle="Program groups with trends and drill-down">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {cohortData.map((cohort, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl bg-${cohort.color}-50 border border-${cohort.color}-100 hover:bg-${cohort.color}-100 cursor-pointer transition-colors`}
              onClick={() => console.log(`Drilling down into ${cohort.name} cohort`)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-semibold">{cohort.count}</div>
                <div className="flex items-center gap-1">
                  {cohort.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-xs font-medium ${cohort.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {cohort.change}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-3">{cohort.name}</div>
              
              {/* Quick metrics for each cohort */}
              <div className="text-xs space-y-1 text-left">
                <div className="flex justify-between">
                  <span>Follow-up rate:</span>
                  <span className="font-medium">
                    {i === 0 ? '94%' : i === 1 ? '87%' : '91%'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Adherence:</span>
                  <span className="font-medium">
                    {i === 0 ? '89%' : i === 1 ? '82%' : '86%'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Red flags:</span>
                  <span className="font-medium">
                    {i === 0 ? '3' : i === 1 ? '7' : '2'}
                  </span>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                View Details →
              </Button>
            </div>
          ))}
        </div>

        {/* Cohort Benchmarking */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="font-medium mb-3">Cohort Benchmarking</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-white rounded border">
              <div className="font-medium text-green-600">Best Performing</div>
              <div>Post-surgery: 94% follow-up rate</div>
              <div className="text-xs text-gray-600">vs. 87% average</div>
            </div>
            <div className="p-3 bg-white rounded border">
              <div className="font-medium text-yellow-600">Needs Attention</div>
              <div>Hypertension: 82% adherence</div>
              <div className="text-xs text-gray-600">vs. 89% target</div>
            </div>
            <div className="p-3 bg-white rounded border">
              <div className="font-medium text-blue-600">Growth Opportunity</div>
              <div>Diabetes: 91% satisfaction</div>
              <div className="text-xs text-gray-600">room for improvement</div>
            </div>
          </div>
        </div>

        {/* Cohort Segmentation */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="font-medium mb-3">Cohort Segmentation</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="text-center">
              <div className="font-semibold">Age 18-35</div>
              <div className="text-gray-600">23% of cohort</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Age 36-50</div>
              <div className="text-gray-600">34% of cohort</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Rural</div>
              <div className="text-gray-600">45% of patients</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Urban</div>
              <div className="text-gray-600">55% of patients</div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Enhanced Alerts" subtitle="SLA monitoring with severity levels" right={<Badge variant="secondary"><Bell className="h-3 w-3 mr-1" /> Custom SLA</Badge>}>
        <div className="grid gap-3 text-sm">
          {alertsData.map((alert) => (
            <div 
              key={alert.id}
              className={`flex items-center justify-between p-4 border rounded-xl bg-white ${
                alert.severity === 'critical' ? 'border-red-200 bg-red-50' : 
                alert.severity === 'warning' ? 'border-yellow-200 bg-yellow-50' : 
                'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  alert.severity === 'critical' ? 'bg-red-500 animate-pulse' : 
                  alert.severity === 'warning' ? 'bg-yellow-500' : 
                  'bg-gray-400'
                }`} />
                <div>
                  <div className="font-medium">{alert.text}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Patients: {alert.patients.join(', ')} • Assigned: {alert.staff}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Queue
                </Button>
                <Button 
                  size="sm" 
                  className={
                    alert.severity === 'critical' ? 'bg-red-600 hover:bg-red-700' : 
                    alert.severity === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
                    ''
                  }
                >
                  {alert.severity === 'critical' ? 'Escalate Now' : 'Send Reminder'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Threshold Settings */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="font-medium mb-3">Custom Alert Thresholds</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Label className="min-w-[80px]">SLA Breach:</Label>
              <Select defaultValue="5">
                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 min</SelectItem>
                  <SelectItem value="5">5 min</SelectItem>
                  <SelectItem value="10">10 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="min-w-[80px]">Follow-up:</Label>
              <Select defaultValue="24">
                <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="48">48 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label>Auto-escalate:</Label>
              <input type="checkbox" defaultChecked className="ml-2" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Enhanced KPIs" subtitle="Performance metrics with benchmarks & trends" right={<Badge variant="secondary">{month}</Badge>}>
        <div className="grid md:grid-cols-3 gap-4">
          {kpiBars.map((b, i) => {
            const pct = Math.min(100, Math.round((b.value / b.max) * 100));
            const benchmarkPct = Math.min(100, Math.round((b.benchmark / b.max) * 100));
            return (
              <div key={i} className="p-4 rounded-xl bg-gray-50 border">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600">{b.label}</div>
                  <div className="flex items-center gap-1">
                    {b.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${b.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {b.trend === 'up' ? '+' : '-'}
                      {Math.abs(b.value - b.benchmark)}
                    </span>
                  </div>
                </div>
                
                <div className="relative h-3 bg-white rounded overflow-hidden border mb-2">
                  {/* Benchmark line */}
                  <div 
                    className="absolute top-0 w-0.5 h-full bg-gray-400 z-10" 
                    style={{ left: `${benchmarkPct}%` }}
                  />
                  {/* Progress bar */}
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      pct >= benchmarkPct ? 'bg-green-500' : 
                      pct >= benchmarkPct * 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${pct}%` }} 
                  />
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="font-medium">
                    {b.label === "PMPM" ? `RWF ${b.value.toLocaleString()}` : `${b.value}%`}
                  </span>
                  <span className="text-gray-500">
                    Target: {b.label === "PMPM" ? `RWF ${b.benchmark.toLocaleString()}` : `${b.benchmark}%`}
                  </span>
                </div>
                
                {/* Mini trend chart simulation */}
                <div className="flex items-end gap-1 mt-2 h-8">
                  {[0.7, 0.8, 0.6, 0.9, 0.85, 1.0].map((height, idx) => (
                    <div 
                      key={idx} 
                      className="bg-blue-200 w-2 rounded-t"
                      style={{ height: `${height * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 6-Month Trend Overview */}
        <div className="mt-6 p-4 bg-white border rounded-lg">
          <div className="font-medium mb-4">6-Month Performance Trends</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Cost Efficiency Trend</div>
              <div className="flex items-end gap-1 h-16">
                {[85, 82, 78, 76, 74, 77].map((height, idx) => (
                  <div key={idx} className="flex-1 bg-blue-500 rounded-t flex items-end justify-center text-xs text-white pb-1" style={{ height: `${height}%` }}>
                    {idx === 5 ? '77%' : ''}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1">Jan - Jun 2025</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Patient Satisfaction</div>
              <div className="flex items-end gap-1 h-16">
                {[78, 81, 85, 87, 89, 92].map((height, idx) => (
                  <div key={idx} className="flex-1 bg-green-500 rounded-t flex items-end justify-center text-xs text-white pb-1" style={{ height: `${height}%` }}>
                    {idx === 5 ? '92%' : ''}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1">Jan - Jun 2025</div>
            </div>
          </div>
        </div>

        {/* Export KPI Dashboard */}
        <div className="mt-4 flex justify-end">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Export KPI Report
          </Button>
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