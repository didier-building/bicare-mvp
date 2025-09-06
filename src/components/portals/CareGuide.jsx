import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Clock,
  MapPin,
  ShieldCheck,
  ScanFace,
  Hospital,
  Users,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Star,
  AlertCircle,
} from "lucide-react";

import { Section } from "@/components/shared/Section";
import { T } from "@/utils/i18n.jsx";

export function CareGuide() {
  const [accepted, setAccepted] = useState(false);
  const [clocked, setClocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [supplies, setSupplies] = useState([]);
  const [photoOpen, setPhotoOpen] = useState(false);

  const toggleSupply = (id) => setSupplies((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  // Mock data for shifts
  const todayShifts = [
    { id: 1, patient: "Solange N.", time: "08:00-10:00", location: "Kacyiru", status: "completed", type: "Post-surgery" },
    { id: 2, patient: "Jean P.", time: "11:00-13:00", location: "Gikondo", status: "in-progress", type: "Diabetes care" },
    { id: 3, patient: "Marie K.", time: "14:00-16:00", location: "Kimisagara", status: "pending", type: "Wound care" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Today's Shifts Overview */}
      <Section title={<T rw="Imishingire y'uyu munsi" en="Today's Shifts" />} subtitle={<T rw="Ugaragaza 3 imishingire usanzwe" en="You have 3 shifts scheduled" />}>
        <div className="space-y-3">
          {todayShifts.map((shift) => (
            <div key={shift.id} className="p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-sm">{shift.patient}</div>
                <Badge className={getStatusColor(shift.status)} variant="secondary">
                  <T 
                    rw={shift.status === "completed" ? "Byarangiye" : shift.status === "in-progress" ? "Biragenda" : "Bitegereje"}
                    en={shift.status === "completed" ? "Completed" : shift.status === "in-progress" ? "In Progress" : "Pending"}
                  />
                </Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {shift.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  {shift.location}
                </div>
                <div className="flex items-center gap-2">
                  <Hospital className="h-3 w-3" />
                  {shift.type}
                </div>
              </div>
              {shift.status === "pending" && (
                <Button size="sm" className="mt-2 w-full" onClick={() => setAccepted(true)}>
                  <T rw="Emera ikazi" en="Accept Shift" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <ShieldCheck className="h-4 w-4" />
            <T rw="Kwemeza indangagaciro n'ahantu uherereye birasabwa" en="Identity verification and location check required" />
          </div>
          <div className="mt-2">
            {!clocked ? (
              <Button size="sm" onClick={() => setClocked(true)} className="bg-blue-600 hover:bg-blue-700">
                <ScanFace className="h-4 w-4 mr-1" />
                <T rw="Tangira akazi" en="Clock In" />
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setClocked(false)}>
                <T rw="Soza akazi" en="Clock Out" />
              </Button>
            )}
          </div>
        </div>
      </Section>
      {/* Current Patient Care */}
      <Section 
        title={<T rw="Umurwayi usanzwe" en="Current Patient" />} 
        subtitle={<T rw="Jean P. – Kwita ku diyabete" en="Jean P. – Diabetes Care" />} 
        right={<Badge variant="secondary"><T rw="Igenzura risabwa" en="QA Required" /></Badge>}
      >
        <div className="space-y-4">
          <div className="p-3 border rounded-lg bg-green-50 border-green-200">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <T rw="Ikazi ryemewe" en="Visit Accepted" />
            </div>
            <div className="space-y-1 text-sm text-green-700">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <T rw="11:00 – 13:00" en="11:00 – 13:00" />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <T rw="Gikondo" en="Gikondo" />
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <T rw="Umuryango uhari" en="Family present" />
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-lg bg-white">
            <div className="font-medium mb-3">
              <T rw="Imirimo y'ubuvuzi" en="Care Tasks" />
            </div>
            <div className="space-y-2">
              {[
                { id: "vitals", labelRw: "Gukora ibipimo", labelEn: "Take vital signs", completed: true },
                { id: "glucose", labelRw: "Gukora ibizamini bya glucose", labelEn: "Blood glucose test", completed: true },
                { id: "medication", labelRw: "Kugenzura imiti", labelEn: "Medication review", completed: false },
                { id: "education", labelRw: "Kwigisha ku mirire", labelEn: "Nutrition education", completed: false }
              ].map((task) => (
                <div key={task.id} className={`flex items-center gap-3 p-2 rounded ${task.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    className="h-4 w-4"
                    readOnly
                  />
                  <span className={`text-sm ${task.completed ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                    <T rw={task.labelRw} en={task.labelEn} />
                  </span>
                  {task.completed && <Badge className="bg-green-600 text-xs">Done</Badge>}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border rounded-lg bg-white">
            <div className="font-medium mb-2">
              <T rw="Ibikoresho" en="Supplies Checklist" />
            </div>
            <div className="space-y-1">
              {[
                { id: "gloves", labelRw: "Udukoko", labelEn: "Gloves" },
                { id: "glucose-strips", labelRw: "Ibipimo bya glucose", labelEn: "Glucose test strips" },
                { id: "alcohol", labelRw: "Alcohol wipes", labelEn: "Alcohol wipes" },
                { id: "lancets", labelRw: "Inshinge", labelEn: "Lancets" }
              ].map((supply) => (
                <label key={supply.id} className="flex items-center gap-2 text-sm">
                  <input 
                    type="checkbox" 
                    checked={supplies.includes(supply.id)} 
                    onChange={() => toggleSupply(supply.id)} 
                  />
                  <T rw={supply.labelRw} en={supply.labelEn} />
                </label>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Visit Documentation & Performance */}
      <div className="space-y-4">
        <Section title={<T rw="Raporo y'ikazi" en="Visit Report" />} subtitle={<T rw="Ohereza incamake kuri muforomo" en="Submit summary to supervising nurse" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label><T rw="Systolic" en="Systolic" /></Label>
                <Input placeholder="130" className="text-center" />
              </div>
              <div>
                <Label><T rw="Diastolic" en="Diastolic" /></Label>
                <Input placeholder="85" className="text-center" />
              </div>
              <div>
                <Label><T rw="Glucose" en="Glucose" /></Label>
                <Input placeholder="150 mg/dL" className="text-center" />
              </div>
            </div>
            
            <div>
              <Label><T rw="Inyandiko" en="Clinical Notes" /></Label>
              <Textarea 
                placeholder="Patient reports feeling better today. Blood pressure slightly elevated. Reviewed medication compliance..."
                className="h-20"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm">
                  <T rw="Hariho ibimenyetso byoba" en="Flag concerning signs for nurse review" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm">
                  <T rw="Umurwayi akeneye gukurikiranwa" en="Patient needs follow-up visit" />
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPhotoOpen(true)}>
                <T rw="Ongeraho ifoto" en="Add Photo" />
              </Button>
              <Button onClick={() => setSubmitted(true)} className="flex-1">
                <T rw="Ohereza raporo" en="Submit Report" />
              </Button>
            </div>
            
            {submitted && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-800 text-sm font-medium">
                  <T rw="Raporo yoherejwe. Igenzura ritegereje." en="Report submitted. QA review pending." />
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* Performance & Earnings */}
        <Section title={<T rw="Imikorere & Amafaranga" en="Performance & Earnings" />} subtitle={<T rw="Uyu munsi" en="Today" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="text-xl font-semibold text-green-800">RWF 7,500</div>
                <div className="text-xs text-green-600">
                  <T rw="3 abashyitsi" en="3 visits" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="text-xl font-semibold text-yellow-800">RWF 2,500</div>
                <div className="text-xs text-yellow-600">
                  <T rw="Bitegereje" en="Pending" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-xl font-semibold text-blue-800">RWF 5,000</div>
                <div className="text-xs text-blue-600">
                  <T rw="Byishyuwe" en="Paid" />
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  <T rw="Igipimo cy'imikorere" en="Performance Rating" />
                </span>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.8</span>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <T rw="Byakoze neza kuri iki cyumweru" en="Excellent work this week" />
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Photo Upload Dialog */}
      <Dialog open={photoOpen} onOpenChange={setPhotoOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>
              <T rw="Kuramo ifoto" en="Upload Photo" />
            </DialogTitle>
            <DialogDescription>
              <T rw="Nta kuramo kikorwa muri demo" en="No upload performed in demo" />
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input type="file" accept="image/*" />
            <div>
              <Label><T rw="Ibisobanuro" en="Description" /></Label>
              <Textarea 
                placeholder="Describe the photo context (lighting, angle, relevant details)..."
                className="h-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setPhotoOpen(false)}>
              <T rw="Byarangiye" en="Done" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}