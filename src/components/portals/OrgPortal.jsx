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
      {/* Corporate Dashboard Overview */}
      <Section title="Corporate Dashboard" subtitle="Executive overview & ROI metrics" right={<Badge variant="default" className="bg-green-100 text-green-800">Live Data</Badge>}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <div className="text-sm text-blue-700 mb-1">Total Members</div>
            <div className="text-2xl font-bold text-blue-800">438</div>
            <div className="text-xs text-blue-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% this month
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
            <div className="text-sm text-green-700 mb-1">Active Cohorts</div>
            <div className="text-2xl font-bold text-green-800">3</div>
            <div className="text-xs text-green-600">Post-op, HTN, DM</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
            <div className="text-sm text-purple-700 mb-1">SLA Compliance</div>
            <div className="text-2xl font-bold text-purple-800">94%</div>
            <div className="text-xs text-purple-600">Above 90% target</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200">
            <div className="text-sm text-orange-700 mb-1">Cost Savings</div>
            <div className="text-2xl font-bold text-orange-800">RWF 2.3M</div>
            <div className="text-xs text-orange-600">YTD avoided costs</div>
          </div>
        </div>

        {/* ROI Metrics */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3 text-green-600">Cost Reduction Impact</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Reduced readmissions:</span>
                <span className="font-medium text-green-600">-23%</span>
              </div>
              <div className="flex justify-between">
                <span>Avoided ER visits:</span>
                <span className="font-medium text-green-600">47 cases</span>
              </div>
              <div className="flex justify-between">
                <span>Early interventions:</span>
                <span className="font-medium text-green-600">156 cases</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3 text-blue-600">Care Quality Improvements</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Medication adherence:</span>
                <span className="font-medium text-blue-600">+18%</span>
              </div>
              <div className="flex justify-between">
                <span>Patient satisfaction:</span>
                <span className="font-medium text-blue-600">92%</span>
              </div>
              <div className="flex justify-between">
                <span>Follow-up completion:</span>
                <span className="font-medium text-blue-600">91%</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3 text-purple-600">Partnership Value</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Care coordination:</span>
                <span className="font-medium text-purple-600">Seamless</span>
              </div>
              <div className="flex justify-between">
                <span>Data transparency:</span>
                <span className="font-medium text-purple-600">Real-time</span>
              </div>
              <div className="flex justify-between">
                <span>Provider satisfaction:</span>
                <span className="font-medium text-purple-600">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
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

      <Section title="Enhanced Cohort Builder" subtitle="Drag-and-drop builder with predictive analytics">
        {/* Rule Builder Interface */}
        <div className="grid gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-3">Build Cohort Rules</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Draggable Rule Components */}
              <div className="p-3 bg-white border-2 border-dashed border-blue-300 rounded-lg cursor-move hover:border-blue-500 transition-colors">
                <div className="text-sm font-medium text-blue-600">📋 Condition</div>
                <div className="text-xs text-gray-600 mt-1">Drag to add condition filter</div>
              </div>
              <div className="p-3 bg-white border-2 border-dashed border-green-300 rounded-lg cursor-move hover:border-green-500 transition-colors">
                <div className="text-sm font-medium text-green-600">👥 Age Range</div>
                <div className="text-xs text-gray-600 mt-1">Drag to add age filter</div>
              </div>
              <div className="p-3 bg-white border-2 border-dashed border-purple-300 rounded-lg cursor-move hover:border-purple-500 transition-colors">
                <div className="text-sm font-medium text-purple-600">📍 Region</div>
                <div className="text-xs text-gray-600 mt-1">Drag to add location filter</div>
              </div>
              <div className="p-3 bg-white border-2 border-dashed border-orange-300 rounded-lg cursor-move hover:border-orange-500 transition-colors">
                <div className="text-sm font-medium text-orange-600">✅ Consent</div>
                <div className="text-xs text-gray-600 mt-1">Drag to add consent filter</div>
              </div>
            </div>
          </div>

          {/* Active Rules */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3">Active Cohort Definition</div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="default" className="bg-blue-100 text-blue-800">Program: {program}</Badge>
              <Badge variant="default" className="bg-green-100 text-green-800">Age: 40–70</Badge>
              <Badge variant="default" className="bg-purple-100 text-purple-800">Region: Kigali</Badge>
              <Badge variant="default" className="bg-orange-100 text-orange-800">Consent: EMR shared</Badge>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <span className="text-red-500">×</span>
              </Button>
            </div>
            
            {/* Live Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-blue-50 rounded border">
                <div className="text-lg font-semibold">347</div>
                <div className="text-sm text-gray-600">Estimated patients</div>
                <div className="text-xs text-green-600 mt-1">↑ 23% vs last month</div>
              </div>
              <div className="p-3 bg-green-50 rounded border">
                <div className="text-lg font-semibold">RWF 2.1M</div>
                <div className="text-sm text-gray-600">Est. monthly cost</div>
                <div className="text-xs text-yellow-600 mt-1">Within budget range</div>
              </div>
              <div className="p-3 bg-purple-50 rounded border">
                <div className="text-lg font-semibold">94%</div>
                <div className="text-sm text-gray-600">Predicted adherence</div>
                <div className="text-xs text-green-600 mt-1">Above target (90%)</div>
              </div>
            </div>
          </div>

          {/* Predictive Analytics */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div className="font-medium mb-3">📊 Predictive Analytics</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium text-blue-600">Future Burden Simulation</div>
                <div>Q4 2025: Expected 20% increase in hypertension cases</div>
                <div>Q1 2026: Diabetes cohort projected to grow by 15%</div>
                <div>Peak season: December-February (flu season impact)</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-purple-600">Risk Stratification</div>
                <div>High risk: 23% of cohort (need intensive follow-up)</div>
                <div>Medium risk: 45% of cohort (standard protocol)</div>
                <div>Low risk: 32% of cohort (minimal intervention)</div>
              </div>
            </div>
          </div>

          {/* Saved Cohorts & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Label className="text-sm text-gray-600">Saved cohorts:</Label>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                Hypertension High-Risk
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                Post-Op Rural
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                Diabetes Urban 50+
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Save Definition</Button>
              <Button variant="outline">Generate Bundle</Button>
              <Button>Simulate Count</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Enhanced Billing" subtitle="Automated invoicing with detailed breakdowns">
        <div className="grid gap-4">
          {/* Invoice Summary */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="text-sm text-green-700 mb-2">Current Month PMPM</div>
              <div className="text-2xl font-semibold text-green-800">RWF 1,920</div>
              <div className="text-xs text-green-600 mt-1">↓ 8% vs target (good)</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="text-sm text-blue-700 mb-2">Total Billed (July)</div>
              <div className="text-2xl font-semibold text-blue-800">RWF 832K</div>
              <div className="text-xs text-blue-600 mt-1">438 active patients</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
              <div className="text-sm text-purple-700 mb-2">Outstanding</div>
              <div className="text-2xl font-semibold text-purple-800">RWF 0</div>
              <div className="text-xs text-green-600 mt-1">All invoices paid</div>
            </div>
          </div>

          {/* Detailed Invoice View */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium">Invoice Detail Breakdown</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Full Invoice
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Service</th>
                    <th className="text-left py-2">Patients</th>
                    <th className="text-left py-2">Unit Cost</th>
                    <th className="text-left py-2">SLA Compliance</th>
                    <th className="text-left py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b">
                    <td className="py-2">Post-surgery follow-up</td>
                    <td>128</td>
                    <td>RWF 1,500</td>
                    <td>
                      <Badge variant="default" className="bg-green-100 text-green-800">98%</Badge>
                    </td>
                    <td>RWF 192,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Hypertension monitoring</td>
                    <td>214</td>
                    <td>RWF 1,200</td>
                    <td>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">89%</Badge>
                    </td>
                    <td>RWF 256,800</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Diabetes management</td>
                    <td>96</td>
                    <td>RWF 1,800</td>
                    <td>
                      <Badge variant="default" className="bg-green-100 text-green-800">96%</Badge>
                    </td>
                    <td>RWF 172,800</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="py-2 font-medium">SLA Adjustment</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td className="text-red-600">-RWF 15,600</td>
                  </tr>
                  <tr className="font-medium">
                    <td className="py-2">Total</td>
                    <td>438</td>
                    <td>-</td>
                    <td>94%</td>
                    <td>RWF 606,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Automated Invoicing */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium mb-3">Automated Invoicing</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Auto-generate monthly</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Send to accounting</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Payment reminders</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Next invoice date:</span>
                  <span className="font-medium">Aug 1, 2025</span>
                </div>
              </div>
              <Button className="w-full mt-3" size="sm">
                Configure Automation
              </Button>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium mb-3">Payment Integration</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-xs">QB</div>
                    <span>QuickBooks</span>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center text-xs">SAP</div>
                    <span>SAP ERP</span>
                  </div>
                  <Badge variant="outline">Setup</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center text-xs">💳</div>
                    <span>Payment Gateway</span>
                  </div>
                  <Badge variant="secondary">Test Mode</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                Manage Integrations
              </Button>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3">Recent Invoices</div>
            <div className="space-y-2 text-sm">
              {[
                { month: "July 2025", amount: "RWF 832K", status: "Paid", date: "Aug 1" },
                { month: "June 2025", amount: "RWF 798K", status: "Paid", date: "Jul 1" },
                { month: "May 2025", amount: "RWF 845K", status: "Paid", date: "Jun 1" },
              ].map((invoice, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{invoice.month}</span>
                    <span>{invoice.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {invoice.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{invoice.date}</span>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Enhanced Roles & API" subtitle="Custom roles, activity logs, and API monitoring">
        <div className="grid gap-4">
          {/* User Management with Custom Roles */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium">User Management</div>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-1" />
                  Invite User
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Alice Umutoni", role: "admin", status: "active", lastAccess: "5m ago" },
                  { name: "Ben Kagame", role: "analyst", status: "active", lastAccess: "2h ago" },
                  { name: "Diana Uwimana", role: "viewer", status: "active", lastAccess: "1d ago" },
                  { name: "Eric Nkurunziza", role: "custom-finance", status: "pending", lastAccess: "never" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">Last: {user.lastAccess}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        user.role === 'admin' ? 'default' :
                        user.role.startsWith('custom') ? 'secondary' :
                        'outline'
                      }>
                        {user.role}
                      </Badge>
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                Manage Custom Roles
              </Button>
            </div>

            <div className="p-4 bg-white border rounded-lg">
              <div className="font-medium mb-3">API Keys & Security</div>
              <div className="space-y-3 text-sm">
                <div>
                  <Label className="text-xs text-gray-600">Production API Key</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input value={apiKey} readOnly className="font-mono text-xs" />
                    <Button size="sm" onClick={regen}>Regen</Button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Webhook URL</Label>
                  <Input placeholder="https://example.org/webhooks/bicare" className="mt-1" />
                </div>
                <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="font-medium text-yellow-800 text-xs">Security Notice</div>
                  <div className="text-xs text-yellow-700 mt-1">
                    Multi-factor authentication required for admin users
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  Configure MFA
                </Button>
              </div>
            </div>
          </div>

          {/* API Usage Dashboard */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3">API Usage Dashboard</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded text-center">
                <div className="text-lg font-semibold text-blue-800">15,847</div>
                <div className="text-xs text-blue-600">Total Requests (24h)</div>
              </div>
              <div className="p-3 bg-green-50 rounded text-center">
                <div className="text-lg font-semibold text-green-800">99.2%</div>
                <div className="text-xs text-green-600">Success Rate</div>
              </div>
              <div className="p-3 bg-red-50 rounded text-center">
                <div className="text-lg font-semibold text-red-800">23</div>
                <div className="text-xs text-red-600">Failed Requests</div>
              </div>
              <div className="p-3 bg-purple-50 rounded text-center">
                <div className="text-lg font-semibold text-purple-800">145ms</div>
                <div className="text-xs text-purple-600">Avg Response Time</div>
              </div>
            </div>
            
            {/* API Endpoint Usage */}
            <div className="text-sm">
              <div className="font-medium mb-2">Top Endpoints (Last 24h)</div>
              <div className="space-y-1">
                {[
                  { endpoint: "/api/patients", requests: 8234, status: "healthy" },
                  { endpoint: "/api/cohorts", requests: 3421, status: "healthy" },
                  { endpoint: "/api/alerts", requests: 2156, status: "degraded" },
                  { endpoint: "/api/billing", requests: 1876, status: "healthy" },
                ].map((api, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-200 px-1 rounded">{api.endpoint}</code>
                      <div className={`w-2 h-2 rounded-full ${
                        api.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <div className="text-xs font-medium">{api.requests.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium">Recent Activity Log</div>
              <Button variant="outline" size="sm">
                View Full Log
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { user: "Alice", action: "Downloaded patient data export", time: "5 minutes ago", type: "export" },
                { user: "Ben", action: "Modified cohort filter settings", time: "1 hour ago", type: "config" },
                { user: "Diana", action: "Accessed KPI dashboard", time: "2 hours ago", type: "view" },
                { user: "Alice", action: "Generated billing report", time: "3 hours ago", type: "export" },
                { user: "System", action: "Automated invoice sent", time: "6 hours ago", type: "system" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      log.type === 'export' ? 'bg-red-500' :
                      log.type === 'config' ? 'bg-yellow-500' :
                      log.type === 'system' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`} />
                    <div>
                      <span className="font-medium">{log.user}</span>
                      <span className="ml-2">{log.action}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{log.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Webhook Tester */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-3">Webhook Tester</div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-xs text-gray-600">Test Payload</Label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded text-xs font-mono"
                  rows="4"
                  defaultValue={`{
  "event": "patient_alert",
  "patient_id": "12345",
  "severity": "high",
  "timestamp": "2025-07-20T10:30:00Z"
}`}
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Response</Label>
                <div className="w-full mt-1 p-2 border rounded bg-white text-xs font-mono h-24 overflow-y-auto">
                  <div className="text-green-600">Status: 200 OK</div>
                  <div className="text-gray-600">Response time: 142ms</div>
                  <div className="text-gray-600">Headers: application/json</div>
                </div>
              </div>
            </div>
            <Button className="mt-3" size="sm">
              Send Test Webhook
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Enhanced Policies & Compliance" subtitle="GDPR/HIPAA compliance with visual audit trails">
        <div className="grid gap-4">
          {/* Compliance Standards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border rounded-lg">
              <div className="font-medium mb-2">Data Retention Policy</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Patient vitals:</span>
                  <Select defaultValue="12m" onValueChange={() => {}}>
                    <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6m">6 months</SelectItem>
                      <SelectItem value="12m">12 months</SelectItem>
                      <SelectItem value="24m">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between">
                  <span>Claims data:</span>
                  <Select defaultValue="24m" onValueChange={() => {}}>
                    <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12m">12 months</SelectItem>
                      <SelectItem value="24m">24 months</SelectItem>
                      <SelectItem value="60m">5 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between">
                  <span>Audit logs:</span>
                  <Select defaultValue="60m" onValueChange={() => {}}>
                    <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24m">24 months</SelectItem>
                      <SelectItem value="60m">5 years</SelectItem>
                      <SelectItem value="84m">7 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border rounded-lg">
              <div className="font-medium mb-2">Compliance Standards</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs">G</div>
                    <span>GDPR Compliance</span>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center text-white text-xs">H</div>
                    <span>HIPAA Standards</span>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center text-white text-xs">R</div>
                    <span>Rwanda DPA</span>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                Configure Compliance
              </Button>
            </div>

            <div className="p-4 bg-white border rounded-lg">
              <div className="font-medium mb-2">Consent Management</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Consent receipts required</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Auto-expire consents</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Patient data portability</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Consent valid for: 24 months
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                Manage Consents
              </Button>
            </div>
          </div>

          {/* Export Scheduler */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3">Advanced Export Scheduler</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-sm mb-2">Scheduled Exports</div>
                <div className="space-y-2 text-sm">
                  {[
                    { name: "KPI Dashboard", frequency: "Monthly", format: "CSV", lastRun: "Aug 1", nextRun: "Sep 1" },
                    { name: "Patient Summary", frequency: "Weekly", format: "PDF", lastRun: "Aug 19", nextRun: "Aug 26" },
                    { name: "Billing Report", frequency: "Monthly", format: "JSON", lastRun: "Aug 1", nextRun: "Sep 1" },
                  ].map((export_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{export_.name}</div>
                        <div className="text-xs text-gray-600">
                          {export_.frequency} • {export_.format} • Next: {export_.nextRun}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">▶</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3" size="sm">
                  Add New Export
                </Button>
              </div>

              <div>
                <div className="font-medium text-sm mb-2">Export Formats & Destinations</div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <span>CSV Format</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Standard comma-separated values</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <span>JSON API</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">RESTful API endpoints</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <span>PDF Reports</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Formatted business reports</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Audit Log */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3">Visual Audit Trail</div>
            <div className="space-y-3">
              {/* Timeline visualization */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {[
                  { time: "10:30 AM", user: "Alice", action: "Exported patient cohort data (214 records)", type: "export", sensitive: true },
                  { time: "09:15 AM", user: "Ben", action: "Modified alert thresholds", type: "config", sensitive: false },
                  { time: "08:45 AM", user: "System", action: "Automated KPI report generated", type: "system", sensitive: false },
                  { time: "08:00 AM", user: "Diana", action: "Accessed billing dashboard", type: "view", sensitive: false },
                ].map((event, i) => (
                  <div key={i} className="relative flex items-start gap-4 pb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      event.type === 'export' ? 'bg-red-100 text-red-800' :
                      event.type === 'config' ? 'bg-yellow-100 text-yellow-800' :
                      event.type === 'system' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {event.type === 'export' ? '📤' :
                       event.type === 'config' ? '⚙️' :
                       event.type === 'system' ? '🤖' : '👁️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{event.user}</span>
                        <span className="text-xs text-gray-500">{event.time}</span>
                        {event.sensitive && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Sensitive
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-700 mt-1">{event.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600">
                Showing last 24 hours • {Math.floor(Math.random() * 50) + 150} total events
              </div>
              <Button variant="outline" size="sm">
                View Full Audit Log
              </Button>
            </div>
          </div>
        </div>
      </Section>
      {/* Claims Integration (For Insurers) */}
      <Section title="Claims Integration" subtitle="Auto-matching with fraud detection" right={<Badge variant="secondary">Insurer Portal</Badge>}>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border rounded-lg">
              <div className="font-medium mb-3">Care Episode Matching</div>
              <div className="space-y-2 text-sm">
                {[
                  { patient: "Solange N.", episode: "Post-surgery follow-up", claim: "CLM-2025-8901", status: "matched", amount: "RWF 15,000" },
                  { patient: "Jean P.", episode: "Hypertension monitoring", claim: "CLM-2025-8902", status: "pending", amount: "RWF 12,000" },
                  { patient: "Marie K.", episode: "Diabetes consultation", claim: "CLM-2025-8903", status: "matched", amount: "RWF 18,000" },
                ].map((claim, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{claim.patient}</div>
                      <div className="text-xs text-gray-600">{claim.episode}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono">{claim.claim}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant={claim.status === 'matched' ? 'default' : 'secondary'}>
                          {claim.status}
                        </Badge>
                        <span className="text-xs">{claim.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                View All Claims
              </Button>
            </div>

            <div className="p-4 bg-white border rounded-lg">
              <div className="font-medium mb-3">Fraud Detection</div>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800">Suspicious Pattern Detected</span>
                  </div>
                  <div className="text-sm text-red-700 mt-1">
                    Duplicate claims for patient ID 12847 within 24 hours
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 text-red-600 border-red-300">
                    Investigate
                  </Button>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Unusual Pattern</span>
                  </div>
                  <div className="text-sm text-yellow-700 mt-1">
                    Higher than average claim amounts for diabetes care
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 text-yellow-600 border-yellow-300">
                    Review
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Claims processed today:</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fraud alerts:</span>
                    <span className="font-medium text-red-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-approved:</span>
                    <span className="font-medium text-green-600">43</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Predictive Insights */}
      <Section title="Predictive Insights" subtitle="AI-driven forecasts and risk stratification" right={<Badge variant="default" className="bg-blue-100 text-blue-800">AI Powered</Badge>}>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border rounded-lg">
              <div className="font-medium mb-3">Cost & Demand Forecast</div>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white rounded border">
                  <div className="font-medium text-blue-600">Next 30 Days</div>
                  <div>Expected cost increase: +15%</div>
                  <div>Peak demand period: Aug 25-30</div>
                  <div className="text-xs text-gray-600 mt-1">Based on historical patterns + seasonal trends</div>
                </div>
                <div className="p-3 bg-white rounded border">
                  <div className="font-medium text-purple-600">Q4 2025 Projection</div>
                  <div>Estimated patient load: 520 (+18%)</div>
                  <div>Budget requirement: RWF 3.2M</div>
                  <div className="text-xs text-gray-600 mt-1">Confidence level: 87%</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border rounded-lg">
              <div className="font-medium mb-3">Risk Stratification</div>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-red-100 rounded">
                  <div className="font-medium text-red-800">High Risk (20% of cohort)</div>
                  <div className="text-red-700">87 patients need escalation in next 30 days</div>
                </div>
                <div className="p-2 bg-yellow-100 rounded">
                  <div className="font-medium text-yellow-800">Medium Risk (45% of cohort)</div>
                  <div className="text-yellow-700">197 patients require standard monitoring</div>
                </div>
                <div className="p-2 bg-green-100 rounded">
                  <div className="font-medium text-green-800">Low Risk (35% of cohort)</div>
                  <div className="text-green-700">154 patients on track, minimal intervention</div>
                </div>
              </div>
              <Button className="w-full mt-3" size="sm">
                Generate Risk Report
              </Button>
            </div>
          </div>

          {/* ML Model Performance */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="font-medium mb-3">ML Model Performance</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-lg font-semibold text-blue-800">91.2%</div>
                <div className="text-xs text-blue-600">Prediction Accuracy</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-lg font-semibold text-green-800">3.2 days</div>
                <div className="text-xs text-green-600">Early Warning Lead Time</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-lg font-semibold text-purple-800">847</div>
                <div className="text-xs text-purple-600">Models Trained</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded">
                <div className="text-lg font-semibold text-orange-800">94.7%</div>
                <div className="text-xs text-orange-600">Intervention Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
}