
// WARNING: tiny build (no public assets). The logo falls back to inline SVG.
import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays, TriangleAlert, Bot, Stethoscope, MapPin, Clock, ShieldCheck, Activity, Hospital,
  UserRound, Users, CheckCircle2, MessageCircle, ScanFace, Bell, AppWindow, Cpu, Wallet, FileText
} from "lucide-react";

/** Assets */
const LOGO_URL = "";
const LOGO_FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
      <rect width='64' height='64' rx='12' fill='#0d9488'/>
      <text x='50%' y='58%' text-anchor='middle' font-family='Inter,Arial' font-size='24' fill='#fff' font-weight='700'>Bi</text>
    </svg>`
  );

/** i18n */
const LangCtx = React.createContext({ lang: "rw", setLang: () => {} });
const useLang = () => useContext(LangCtx);
const tr = (lang, rw, en) => (lang === "rw" ? rw : en);
const T = ({ rw, en }) => { const { lang } = useLang(); return <>{tr(lang, rw, en)}</>; };

/** Utilities */
const Section = ({ title, subtitle, right, children }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </div>
        {right ? <div>{right}</div> : null}
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
const Pill = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 ${className}`}>{children}</span>
);
function ProgressRing({ size = 68, stroke = 8, progress = 0 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="block">
      <circle stroke="#eee" fill="transparent" strokeWidth={stroke} r={radius} cx={size / 2} cy={size / 2} />
      <circle stroke="currentColor" className="text-teal-500" fill="transparent" strokeLinecap="round" strokeWidth={stroke} r={radius} cx={size / 2} cy={size / 2} strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={offset} />
    </svg>
  );
}

/** Demo data */
const demoTasks = [
  { id: "med-am", label: "Take Amlodipine 5mg", channel: "app", due: "08:00" },
  { id: "wound-photo", label: "Upload wound photo", channel: "wa", due: "09:00" },
  { id: "exercise", label: "Do ankle pump exercise (10 reps)", channel: "app", due: "10:00" },
  { id: "education", label: "Read: Signs of infection", channel: "app", due: "Anytime" },
];
const guides = [
  { id: 1, name: "Aline U.", rating: 4.8, distance: 1.2, price: 2500, skills: ["Wound care", "Vitals"], region: "Kigali" },
  { id: 2, name: "Eric M.", rating: 4.6, distance: 2.4, price: 2200, skills: ["Diabetes", "Counselling"], region: "Kigali" },
  { id: 3, name: "Diane K.", rating: 4.9, distance: 0.9, price: 2800, skills: ["Post-surgery", "Mobility"], region: "Kigali" },
];
const redFlagSamples = [
  { id: "rf1", patient: "Solange N.", symptom: "Severe dizziness", sev: "high", mins: 2 },
  { id: "rf2", patient: "Jean P.", symptom: "Bleeding at wound site", sev: "critical", mins: 0 },
  { id: "rf3", patient: "Claudine U.", symptom: "Chest pain", sev: "high", mins: 4 },
];

/** PatientHome */
function PatientHome() {
  const { lang } = useLang();
  const [done, setDone] = useState(["education"]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [emrShared, setEmrShared] = useState(true);
  const progress = Math.round((done.length / demoTasks.length) * 100);
  const toggle = (id) => setDone(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title={<T rw="Imirimo y'uyu munsi" en="Today’s Tasks" />} subtitle={<T rw="Kanda urangize cyangwa ushireho kwibutsa" en="Tap to complete or snooze" />}>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <ProgressRing progress={progress} />
            <div className="text-xs text-gray-500 mt-1">{progress}%</div>
          </div>
          <div className="flex-1 grid gap-2">
            {demoTasks.map(t => (
              <label key={t.id} className={`flex items-center gap-3 rounded-xl border p-3 ${done.includes(t.id) ? "bg-teal-50 border-teal-200" : "bg-white"}`}>
                <input type="checkbox" checked={done.includes(t.id)} onChange={() => toggle(t.id)} className="h-4 w-4" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{t.label}</div>
                  <div className="text-xs text-gray-500">Due {t.due} • via {t.channel.toUpperCase()}</div>
                </div>
                {done.includes(t.id) && <Badge className="bg-teal-600 text-white">Done</Badge>}
              </label>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {lang === "rw"
            ? <>Ukeneye ubufasha? Koresha <span className="font-semibold">Saba AI</span> cyangwa kande <span className="font-semibold">Red-Flag</span>.</>
            : <>Need help? Use <span className="font-semibold">Ask AI</span> or press <span className="font-semibold">Red-Flag</span>.</>}
        </div>
      </Section>

      <Section
        title={<T rw="Uruzinduko rukurikira" en="Next Visit" />}
        subtitle={<T rw="Rendez-vous yawe ikurikira" en="Your upcoming appointment" />}
        right={<Badge variant="secondary" className="gap-1"><CalendarDays className="h-3 w-3" /> D+3</Badge>}
      >
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Thu, Aug 21 • 10:30 AM</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kigali Teaching Hospital – Ward B</div>
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Bring meds list, avoid food 6h prior</div>
          <Dialog>
            <DialogTrigger asChild><Button className="mt-2 w-full"><T rw="Ukeneye ubufasha bwo gutwara?" en="Add transport help?" /></Button></DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle><T rw="Ubufasha bwo gutwara" en="Transport assistance" /></DialogTitle>
                <DialogDescription><T rw="Tumenyesha Abafasha bari hafi" en="We’ll notify nearby Care Guides for escort support." /></DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <Label>Pickup location</Label>
                <Input placeholder="e.g., Kacyiru Bus Park" />
                <Label>Notes</Label>
                <Textarea placeholder="Wheelchair needed" />
              </div>
              <DialogFooter><Button>Notify Guides</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>

      <Section title="Vitals (preview)" subtitle="Last 7 days" right={<Pill className="text-gray-600"><Activity className="h-3 w-3 mr-1" /> Read-only</Pill>}>
        <svg viewBox="0 0 300 120" className="w-full">
          <polyline fill="none" stroke="currentColor" className="text-teal-500" strokeWidth="3" points="0,90 40,80 80,85 120,70 160,75 200,65 240,68 280,60" />
          <text x="4" y="112" className="text-[10px] fill-gray-500">BP (systolic)</text>
        </svg>
        <div className="text-xs text-gray-500">Connected: Kigali Teaching Hospital</div>
      </Section>

      <Section
        title={<T rw="Saba AI (ifite umuforomo)" en="Ask AI (with nurse backup)" />}
        subtitle={<T rw="Kinyarwanda • Icyongereza" en="Kinyarwanda • English" />}
        right={<Badge className="bg-blue-600 text-white"><Bot className="h-3 w-3 mr-1" /> Online</Badge>}
      >
        <div className="grid gap-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(lang === "rw" ? "Uburibwe,Kuzungera,Kwita ku gisebe,Ingaruka z'imiti,Indyo,Amasaha y'imiti" : "Pain,Dizziness,Wound care,Side-effects,Diet,Medication timing")
              .split(",").map(c => <Button key={c} variant="secondary" className="justify-start">{c}</Button>)}
          </div>
          <div className="border rounded-xl p-3 bg-white">
            <div className="text-sm"><span className="font-semibold"><T rw="Wowe:" en="You:" /></span> <T rw="Ndumva umutwe unyerera cyane." en="I feel very dizzy." /></div>
            <div className="text-sm mt-1"><span className="font-semibold"><T rw="BiCare:" en="BiCare:" /></span> <T rw="Kuzungera gashobora guterwa no kubura amazi mu mubiri cyangwa imiti urimo gufata. Icara hasi, nywa amazi, kandi wirinde guhaguruka utunguranye. Niba bijyanye n’ububabare mu gituza cyangwa gusinzira, kanda Red-Flag kugira ngo uhabwe umuforomo ako kanya." en="Dizziness can be caused by dehydration or medications. Sit down, drink water, and avoid sudden movements. If combined with chest pain or fainting, press Red-Flag to reach a nurse immediately." /></div>
          </div>
          <div className="flex items-center gap-2">
            <Input disabled placeholder="Type a message (demo)" />
            <Button disabled>Send</Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <TriangleAlert className="h-3 w-3" /> Risky terms trigger nurse triage automatically.
          </div>
        </div>
      </Section>

      {/* Micro-Courses with modal */}
      <Section title={<T rw="Amasomo yoroheje" en="Micro-Courses" />} subtitle={<T rw="Ubufasha ku miryango n'abaganga bo mu rugo" en="For families and home caregivers" />}>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            {
              id: "course1",
              titleRw: "Isuku y'igisebe (10')",
              titleEn: "Wound hygiene (10')",
              progress: 60,
              stepsRw: [
                "Karaba intoki iminota 1 (amazi & isabune).",
                "Koza ku ruhande rw'igisebe, ntukore ku rufunzo.",
                "Hindura agapfukamunwa (dressing) neza.",
              ],
              stepsEn: [
                "Wash hands for 1 minute (soap & water).",
                "Clean around the wound, avoid touching the wound bed.",
                "Replace dressing carefully.",
              ],
            },
            {
              id: "course2",
              titleRw: "Gupima ibipimo by'ingenzi (8')",
              titleEn: "Taking vitals (8')",
              progress: 20,
              stepsRw: [
                "Fata umuvuduko w’amaraso wicaye (min. 5’ uri amahoro).",
                "Andika ibyavuyeho: SYS/DIA & umuvuduko w’umutima.",
                "Ubonye ibidasanzwe, kanda Red-Flag.",
              ],
              stepsEn: [
                "Measure blood pressure seated (rest 5’).",
                "Record SYS/DIA & pulse.",
                "If abnormal, press Red-Flag.",
              ],
            },
            {
              id: "course3",
              titleRw: "Uko gutera imiti neza (6')",
              titleEn: "Safe meds timing (6')",
              progress: 0,
              stepsRw: [
                "Soma amabwiriza y’umuti buri gihe.",
                "Kurikiza amasaha wahawe (telemetero/kwibutsa).",
                "Niba wibeshye ku rugero, saba umuforomo.",
              ],
              stepsEn: [
                "Always read the medication instructions.",
                "Follow the scheduled times (reminders help).",
                "If you miss/double a dose, ask a nurse.",
              ],
            },
          ].map((c) => (
            <div key={c.id} className="p-3 border rounded-xl bg-white">
              <div className="font-medium text-sm"><T rw={c.titleRw} en={c.titleEn} /></div>
              <div className="h-2 bg-gray-100 rounded mt-2 overflow-hidden">
                <div className="h-full bg-teal-500" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                <span>{c.progress}%</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant={c.progress ? "secondary" : "default"}>
                      {c.progress ? <T rw="Komeza" en="Resume" /> : <T rw="Tangira" en="Start" />}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[460px]">
                    <DialogHeader>
                      <DialogTitle><T rw={c.titleRw} en={c.titleEn} /></DialogTitle>
                      <DialogDescription>
                        <T rw="Isomo rito ry'imyitozo ku miryango — nta makuru bwite atanzwe." en="Short practice lesson for families — no personal data involved." />
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3 text-sm">
                      <div className="rounded-lg border p-3 bg-gray-50">
                        <div className="font-medium mb-1"><T rw="Intambwe z'ingenzi" en="Key steps" /></div>
                        <ul className="list-disc pl-5 space-y-1">
                          {(useLang().lang === "rw" ? c.stepsRw : c.stepsEn).map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="font-medium mb-1"><T rw="Icyitonderwa" en="Safety tip" /></div>
                        <div><T rw="Niba habaye ububabare bukabije, kuruka, cyangwa umwijima mu maso — kanda Red-Flag." en="If severe pain, vomiting, or faintness occurs — press Red-Flag." /></div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button><T rw="Birumvikana" en="Got it" /></Button>
                      <Button variant="secondary"><T rw="Subira nyuma" en="Review later" /></Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Book a Care Guide */}
      <Section title={<T rw="Shaka Uwamufasha" en="Book a Care Guide" />} subtitle={<T rw="Abari hafi, babanje kugenzurwa" en="Nearby, vetted helpers" />}>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder={lang === "rw" ? "Shakisha izina cyangwa ubumenyi (n: Wound care)" : "Search by name or skill (e.g., Wound care)"} />
              <Select defaultValue="kigali" onValueChange={()=>{}}>
                <SelectTrigger className="sm:w-[200px]"><SelectValue placeholder={lang === "rw" ? "Intara" : "Region"} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kigali">Kigali</SelectItem>
                  <SelectItem value="musanze">Musanze</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {guides.map(g => {
                const initials = `${g.name.split(" ")[0][0]}${g.name.split(" ")[1]?.[0] ?? ""}`;
                const active = selectedGuide === g.id;
                return (
                  <Card key={g.id} className={`rounded-xl border transition ${active ? "border-teal-300 ring-2 ring-teal-100" : "hover:border-gray-300"}`} onClick={() => setSelectedGuide(g.id)}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10"><AvatarFallback>{initials}</AvatarFallback></Avatar>
                        <div>
                          <CardTitle className="text-base">{g.name}</CardTitle>
                          <CardDescription>{g.region} • {g.distance} km</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <div className="flex flex-wrap gap-2">{g.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
                      <div className="text-sm text-gray-600">{g.rating} ★ • RWF {g.price}</div>
                      <Button variant="outline" className="justify-center">{lang === "rw" ? "Hitamo" : "Select"}</Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3">
            {!selectedGuide ? (
              <Card className="rounded-xl border-dashed"><CardContent className="p-6 text-sm text-gray-600">{lang === "rw" ? "Hitamo umufasha ku ruhande rw'ibumoso kugira ngo ubone ibisobanuro n'ubwishyu." : "Pick a guide on the left to see details and payment."}</CardContent></Card>
            ) : (() => { const g = guides.find(x => x.id === selectedGuide); const fn = g.name.split(" ")[0]; return (
              <Card className="rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{g.name}</CardTitle>
                  <CardDescription>{g.region} • {g.distance} km • {g.rating} ★</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="flex flex-wrap gap-2">{g.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
                  <div className="text-sm">{lang === "rw" ? "Igiciro" : "Price"}: <span className="font-medium">RWF {g.price}</span></div>
                  <Dialog>
                    <DialogTrigger asChild><Button className="w-full">{lang === "rw" ? `Bukinga ${fn}` : `Book ${fn}`}</Button></DialogTrigger>
                    <DialogContent className="sm:max-w-[420px]">
                      <DialogHeader>
                        <DialogTitle>{lang === "rw" ? "Kwemeza ubufasha" : "Confirm booking"}</DialogTitle>
                        <DialogDescription>{lang === "rw" ? "Kwishyura kuri mobile money (demo)." : "Mobile money payment will be simulated for this demo."}</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-3 text-sm">
                        <div className="flex items-center gap-2"><Wallet className="h-4 w-4" /> {lang === "rw" ? "Amafaranga" : "Amount"}: RWF {g.price}</div>
                        <Label>{lang === "rw" ? "Hitamo wallet" : "Choose wallet"}</Label>
                        <Select defaultValue="mtn" onValueChange={()=>{}}>
                          <SelectTrigger><SelectValue placeholder="Wallet" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mtn">MTN MoMo</SelectItem>
                            <SelectItem value="airtel">Airtel Money</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter><Button className="w-full" variant="default"><CheckCircle2 className="h-4 w-4 mr-1" /> {lang === "rw" ? "Kwishyura byagenze neza (demo)" : "Simulate Payment Success"}</Button></DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ); })()}
          </div>
        </div>
      </Section>

      <Section title={<T rw="Ihuza n'Uburenganzira" en="Connections & Consent" />} subtitle={<T rw="Tegeka abemerewe kureba amakuru yawe" en="Control who can view your data" />} right={<Badge variant="outline" className="gap-1"><ShieldCheck className="h-3 w-3" /> {emrShared ? "30 days left" : "OFF"}</Badge>}>
        <div className="flex items-center justify-between p-3 border rounded-xl bg-white">
          <div>
            <div className="font-medium">Kigali Teaching Hospital EMR</div>
            <div className="text-xs text-gray-500">Scopes: meds, diagnoses, allergies, next visit</div>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="share">Share</Label>
            <Switch id="share" checked={emrShared} onCheckedChange={setEmrShared} />
            <Button variant="outline" onClick={() => setEmrShared(false)}>{lang === "rw" ? "Hagarika" : "Revoke"}</Button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {emrShared ? "Every access is logged. You can export a receipt anytime." : tr(lang, "EMR sharing OFF: amakuru y'ibitaro ntagaragara.", "EMR sharing OFF: hospital records hidden.")}
        </div>
      </Section>

      <Section title={<T rw="Ibijyanye n'ubuzima (gusoma gusa)" en="Health Data Hub" />} subtitle={<T rw="Gusoma gusa hamwe n'inkomoko zigaragara" en="Read-only view with source tags" />}>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="border rounded-xl p-3 bg-white">
            <div className="font-semibold mb-2">
              <T rw="Imiti" en="Medications" /> {!emrShared && <span className="ml-2 text-xs text-orange-600"><T rw="(aya muryango gusa)" en="(family-entered only)" /></span>}
            </div>
            <ul className="space-y-2">
              {["Amlodipine 5mg", "Paracetamol 1g PRN"].map(m => (
                <li key={m} className="flex items-center justify-between">
                  <span>{m}</span>
                  <Pill className={emrShared ? "bg-teal-100 text-teal-800" : "bg-gray-200 text-gray-700"}>{emrShared ? "EMR" : "Local"}</Pill>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-xl p-3 bg-white">
            <div className="font-semibold mb-2">
              <T rw="Indwara" en="Conditions" /> {!emrShared && <span className="ml-2 text-xs text-orange-600"><T rw="(aya muryango gusa)" en="(family-entered only)" /></span>}
            </div>
            <ul className="space-y-2">
              {["Hypertension", "Post-op day 1"].map(c => (
                <li key={c} className="flex items-center justify-between">
                  <span>{c}</span>
                  <Pill className={emrShared ? "bg-teal-100 text-teal-800" : "bg-gray-200 text-gray-700"}>{emrShared ? "EMR" : "Local"}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title={<T rw="Ibaruwa y'uko amakuru yasomwe" en="Access Log" />} subtitle={<T rw="Ninde wasomye iki? Ryari?" en="Who read what, and when" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Timestamp</th><th className="py-2">Subject</th><th className="py-2">Resource</th><th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="py-2">2025-08-17 14:21</td><td>Nurse (KTH)</td><td>Medications</td><td>read</td></tr>
              <tr className="border-t"><td className="py-2">2025-08-17 14:22</td><td>BiCare Service</td><td>Next Visit</td><td>read</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex gap-2"><Button variant="outline"><FileText className="h-4 w-4 mr-1" /> Export PDF</Button><Button variant="outline">Refresh</Button></div>
      </Section>

      <button title="Red-Flag" className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
        <TriangleAlert className="h-6 w-6" />
      </button>
    </div>
  );
}

/** Nurse, Guide, Org, Omni (trimmed for brevity) */
function CareGuide() {
  const [accepted, setAccepted] = useState(false);
  const [clocked, setClocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Today’s Shift" subtitle="Downtown Kigali">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> 08:00 – 16:00</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kacyiru → Gikondo</div>
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Liveness + Geo required</div>
          <div className="flex items-center gap-2"><ScanFace className="h-4 w-4" /> {clocked ? "Clocked-in (verified)" : "Not clocked-in"}</div>
          {!clocked && <Button className="mt-2" onClick={() => setClocked(true)}>Clock-in (simulate)</Button>}
          {clocked && <Button variant="secondary" className="mt-2" onClick={() => setClocked(false)}>Clock-out</Button>}
        </div>
      </Section>
      <Section title="Assigned Visit" subtitle="Solange N. – Post-surgery" right={<Badge variant="secondary">QA Required</Badge>}>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2"><Hospital className="h-4 w-4" /> Tasks: vitals, wound dressing, mobility</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4" /> Family present</div>
          {!accepted ? <Button className="mt-2" onClick={() => setAccepted(true)}><CheckCircle2 className="h-4 w-4 mr-1" /> Accept visit</Button> : <div className="text-teal-600 font-medium">Visit accepted</div>}
        </div>
      </Section>
      <Section title="Visit Form" subtitle="Submit summary to nurse">
        <div className="grid gap-3 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <div><Label>Systolic</Label><Input placeholder="120" /></div>
            <div><Label>Diastolic</Label><Input placeholder="80" /></div>
            <div><Label>Pulse</Label><Input placeholder="76" /></div>
          </div>
          <div><Label>Notes</Label><Textarea placeholder="Wound edges clean, changed dressing" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" /> <span>Flag concerning signs</span></div>
          <Button onClick={() => setSubmitted(true)}>Submit Summary</Button>
          {submitted && <div className="text-teal-600 text-sm">Summary sent. QA pending.</div>}
        </div>
      </Section>
    </div>
  );
}

function NurseConsole() {
  const [items, setItems] = useState(redFlagSamples);
  const take = (id, action) => setItems(prev => prev.map(x => (x.id === id ? { ...x, action } : x)));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Red-Flags" subtitle="Prioritized by severity/time">
        <div className="grid gap-2">
          {items.map(rf => (
            <div key={rf.id} className="flex items-center justify-between p-3 border rounded-xl bg-white">
              <div><div className="font-medium">{rf.patient}</div><div className="text-sm text-gray-600">{rf.symptom}</div></div>
              <div className="flex items-center gap-2">
                <Badge className={rf.sev === "critical" ? "bg-red-600 text-white" : "bg-orange-500 text-white"}>{rf.sev}</Badge>
                <Pill>{rf.mins}m</Pill>
                {!rf.action ? (<div className="flex gap-2"><Button size="sm" onClick={() => take(rf.id, "triaged")}>Triage</Button><Button size="sm" variant="secondary" onClick={() => take(rf.id, "escalated")}>Escalate</Button></div>) : <Badge variant="outline" className="capitalize">{rf.action}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function OrgPortal() {
  const { lang } = useLang();
  const [program, setProgram] = useState("postop");
  const [month, setMonth] = useState("2025-07"); // YYYY-MM (static demo)

  // tiny bar chart data (static)
  const kpiBars = [
    { label: "PMPM", value: 1920, max: 2500 },
    { label: lang === "rw" ? "Kugaruka (30d)" : "Readmits (30d)", value: 18, max: 30 },
    { label: lang === "rw" ? "Kubahiriza D+3" : "D+3 Kept", value: 12, max: 30 },
  ];

  const t = (rw, en) => (lang === "rw" ? rw : en);

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Filters */}
      <Section
        title={t("Ishungura", "Filters")}
        subtitle={t("Hitamo porogaramu n'ukwezi", "Pick program and month")}
        right={
          <div className="flex items-center gap-2 text-xs">
            <Badge variant="outline">{t("Static demo", "Static demo")}</Badge>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Program */}
          <div className="flex items-center gap-2">
            <Label className="min-w-[90px]">{t("Porogaramu", "Program")}</Label>
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="postop">{t("Post-surgery", "Post-surgery")}</SelectItem>
                <SelectItem value="htn">{t("Hypertension", "Hypertension")}</SelectItem>
                <SelectItem value="dm">{t("Diabetes", "Diabetes")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Month */}
          <div className="flex items-center gap-2">
            <Label className="min-w-[90px]">{t("Ukwezi", "Month")}</Label>
            <Input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="YYYY-MM"
              className="w-[160px]"
            />
          </div>
          <Button variant="secondary">{t("Kwerekana", "Apply")}</Button>
        </div>
      </Section>

      {/* Cohorts */}
      <Section
        title={t("Amatsinda", "Cohorts")}
        subtitle={t("Ibipfunyika byo kurekurwa & porogaramu", "Discharge bundles & programs")}
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-4 rounded-xl bg-blue-50">
            <div className="text-2xl font-semibold">128</div>
            <div className="text-xs text-gray-600">{t("Post-surgery", "Post-surgery")}</div>
          </div>
          <div className="p-4 rounded-xl bg-teal-50">
            <div className="text-2xl font-semibold">214</div>
            <div className="text-xs text-gray-600">{t("Abarwayi b'umuvuduko", "Hypertension")}</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-50">
            <div className="text-2xl font-semibold">96</div>
            <div className="text-xs text-gray-600">{t("Diabete", "Diabetes")}</div>
          </div>
        </div>
      </Section>

      {/* Alerts */}
      <Section
        title={t("Iburira", "Alerts")}
        subtitle={t("SLA & kudahagera", "SLA & no-shows")}
        right={<Badge variant="secondary"><Bell className="h-3 w-3 mr-1" /> {t("10-min", "10-min")}</Badge>}
      >
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between p-3 border rounded-xl bg-white">
            <span>{t("Red-flags 3 hafi gucika SLA ya 10-min", "3 red-flags nearing 10-min SLA")}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">{t("Ibyihutirwa", "Open queue")}</Button>
              <Button size="sm">{t("Sangira n'umuforomo", "Notify nurse lead")}</Button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-xl bg-white">
            <span>{t("D+3 batitabiriye 2", "2 missed D+3 follow-ups")}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">{t("Urutonde", "View list")}</Button>
              <Button size="sm">{t("Ohereza ubutumwa", "Send reminder")}</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* KPIs */}
      <Section
        title={t("KPIs z'ukwezi", "Monthly KPIs")}
        subtitle="PMPM & outcomes"
        right={<Badge variant="secondary">{month}</Badge>}
      >
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

      {/* Integrations & Consent Logs */}
      <Section
        title={t("Iyinjiza & Ibyemezo", "Integrations & Consent Logs")}
        subtitle={t("CSV/API & inyandiko z'uko washyikirijwe", "CSV/API intake & access receipts")}
      >
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between p-3 border rounded-xl bg-white">
            <span>{t("Shyiraho CSV yo kurekurwa", "Upload discharge CSV")}</span>
            <div className="flex items-center gap-2">
              <Input type="file" className="h-8" />
              <Button variant="outline" size="sm">{t("Ohereza", "Upload")}</Button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-xl bg-white">
            <span>{t("Kuramo inyemezabuguzi z'ibyemerewe", "Download consent receipts")}</span>
            <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1" /> {t("Export", "Export")}</Button>
          </div>
        </div>

        {/* Consent log preview */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">{t("Igihe", "Timestamp")}</th>
                <th className="py-2">{t("Isubject", "Subject")}</th>
                <th className="py-2">{t("Icyo arebye", "Resource")}</th>
                <th className="py-2">{t("Igikorwa", "Action")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="py-2">2025-08-17 14:21</td><td>Nurse (KTH)</td><td>{t("Imiti", "Medications")}</td><td>read</td></tr>
              <tr className="border-t"><td className="py-2">2025-08-17 14:22</td><td>BiCare Service</td><td>{t("Uruzinduko rukurikira", "Next Visit")}</td><td>read</td></tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

/** OmniChannel Preview */
function OmniChannelPreview() {
  const { lang } = useLang();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Section title={<T rw="WhatsApp" en="WhatsApp" />} subtitle={<T rw="Kwigaragaza nk'ubutumwa" en="Chat-style preview" />} right={<Badge variant="secondary">Demo</Badge>}>
        <div className="rounded-2xl bg-[#e5ddd5] p-4 border">
          <div className="mx-auto max-w-sm space-y-2">
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow">
              <div className="text-xs text-gray-500 mb-1">BiCare</div>
              <div className="whitespace-pre leading-6 text-sm">
                {lang==='rw'
                  ? `1 Imirimo y'uyu munsi\n2 Saba AI\n3 Umuforomo\n4 Shaka Uwamufasha\n5 Uruzinduko rukurikira\n6 Amasomo\n7 Ibyemezo byanjye\n8 Hagarika gusangira`
                  : `1 Today’s Tasks\n2 Ask AI\n3 Nurse\n4 Book Help\n5 Next Visit\n6 Courses\n7 Connections\n8 Stop sharing`}
              </div>
            </div>
            <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 w-fit ml-auto shadow text-sm">2</div>
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow text-sm">
              {lang==='rw' ? "Ubusabwe: Saba AI. Andika ikibazo cyawe…" : "Selected: Ask AI. Type your question…"}
            </div>
            <div className="mt-3 bg-white rounded-full px-3 py-2 text-sm text-gray-500 border">
              <T rw="Andika ubutumwa… (demo)" en="Type a message… (demo)" />
            </div>
          </div>
        </div>
      </Section>
      <Section title="USSD / IVR" subtitle={<T rw="Kwigaragaza nka terminal ya telefoni" en="Phone USSD terminal look" />}>
        <div className="rounded-2xl bg-black p-4 border">
          <div className="mx-auto max-w-sm font-mono text-[13px] leading-6">
            <div className="bg-black text-green-400 rounded-lg p-3 border border-green-700 shadow-inner">
              <div>*xyz#</div>
              <div className="text-green-300">======================</div>
              <div>{lang==='rw' ? "1. Imirimo" : "1. Tasks"}</div>
              <div>{lang==='rw' ? "2. Ibyibutsa" : "2. Reminders"}</div>
              <div>{lang==='rw' ? "3. Vugana n'umuforomo" : "3. Talk to a nurse"}</div>
              <div>{lang==='rw' ? "4. Shaka umufasha" : "4. Book a guide"}</div>
              <div>{lang==='rw' ? "5. Uruzinduko rukurikira" : "5. Next visit"}</div>
              <div>{lang==='rw' ? "6. Inama z'ubuzima" : "6. Health tips"}</div>
              <div>{lang==='rw' ? "7. Uburenganzira" : "7. Consent"}</div>
              <div>{lang==='rw' ? "8. Ururimi" : "8. Language"}</div>
              <div className="text-green-300">----------------------</div>
              <div>{lang==='rw' ? "Hitamo: _" : "Select: _"}</div>
            </div>
            <div className="text-green-600 mt-2">▮</div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/** Root */
export default function BiCareStaticMVP() {
  const [role, setRole] = useState("patient");
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("bicare.lang");
      if (saved === "rw" || saved === "en") return saved;
    }
    return "rw";
  });
  const showPitch = false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bicare.lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl overflow-hidden bg-white border shadow grid place-items-center">
                <img
                  src={LOGO_URL}
                  alt="BiCare 360 logo"
                  className="h-9 w-9 object-contain"
                  loading="eager"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = LOGO_FALLBACK_SVG; }}
                />
              </div>
              <div>
                <div className="font-semibold text-lg">BiCare 360</div>
                <div className="text-xs text-gray-500">Continuity of care — at home</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={role} onValueChange={(v)=>setRole(v)}>
                <SelectTrigger className="w-[170px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient / Family</SelectItem>
                  <SelectItem value="guide">Care Guide</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="org">Hospital / Insurer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={lang} onValueChange={(v)=>setLang(v)}>
                <SelectTrigger className="w-[120px]"><SelectValue placeholder="Language" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rw">Kinyarwanda</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
              {showPitch && (
                <Dialog>
                  <DialogTrigger asChild><Button variant="outline" size="sm" className="hidden sm:inline-flex"><AppWindow className="h-4 w-4 mr-1" /> Pitch Mode</Button></DialogTrigger>
                  <DialogContent className="sm:max-w-[640px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2"><img src={LOGO_URL} alt="BiCare 360" className="h-6 w-6 object-contain" /> BiCare 360 — Investor Pitch</DialogTitle>
                      <DialogDescription>Continuity of care at home with consent-first data sharing, AI guidance, and nurse triage under 10 minutes.</DialogDescription>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-xl bg-gray-50">✅ Red-flags → nurse within 10 minutes</div>
                      <div className="p-3 rounded-xl bg-gray-50">✅ Patient-controlled consent & access logs</div>
                      <div className="p-3 rounded-xl bg-gray-50">✅ Care Guide marketplace with MoMo/Airtel</div>
                      <div className="p-3 rounded-xl bg-gray-50">✅ Omni-channel: App, WhatsApp, USSD/IVR</div>
                    </div>
                    <div className="text-xs text-gray-500">Demo is static; no PHI is transmitted.</div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 grid gap-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="rounded-2xl">
              <CardContent className="py-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-teal-700 font-semibold mb-2"><T rw="Ikibazo" en="Problem" /></div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li>• <T rw="Nyuma yo kurekurwa kwa muganga, imiryango ibura amabwiriza yoroshye." en="After discharge, families lack simple, actionable guidance." /></li>
                      <li>• <T rw="Ibimenyetso bikomeye bititabwaho vuba; telefonike zitinda." en="Red-flags are missed; responses via phone are slow." /></li>
                      <li>• <T rw="Kugenzura n'ugusangira amakuru hagati y'ibigo ni ingorabahizi." en="Data sharing and accountability across orgs is hard." /></li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-teal-700 font-semibold mb-2"><T rw="Igisubizo cya BiCare" en="BiCare Solution" /></div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li>• <T rw="Imirimo y'umunsi & kwibutsa kuri WhatsApp/USSD/App." en="Daily tasks & reminders via WhatsApp/USSD/App." /></li>
                      <li>• <T rw="Saba AI ifite umuforomo mu minota 10 kuri red-flag." en="Ask AI with nurse handoff in <10 minutes on red-flag." /></li>
                      <li>• <T rw="Isoko ry'Abafasha (Care Guides) ryemejwe na MoMo/Airtel." en="Vetted Care Guides marketplace with MoMo/Airtel." /></li>
                      <li>• <T rw="Gusangira amakuru hashingiwe ku bwumvikane + raporo z'uko yasomwe." en="Consent-first data sharing + access receipts." /></li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-6">
                  <div className="p-3 rounded-xl bg-green-50 text-center">
                    <div className="text-lg font-semibold">≤10 <span className="text-xs font-normal">min</span></div>
                    <div className="text-xs text-gray-600"><T rw="Igihe cyo kugeza ku muforomo" en="Nurse response time" /></div>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 text-center">
                    <div className="text-lg font-semibold">-18%</div>
                    <div className="text-xs text-gray-600"><T rw="Kugaruka mu bitaro mu minsi 30" en="30-day readmits" /></div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 text-center">
                    <div className="text-lg font-semibold">+12%</div>
                    <div className="text-xs text-gray-600"><T rw="Kubahiriza D+3" en="D+3 follow-up kept" /></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {role === "patient" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold flex items-center gap-2"><UserRound className="h-5 w-5"/> Patient Portal</div>
                <div className="flex items-center gap-2 text-sm"><Badge variant="secondary">RW/EN</Badge><Badge variant="outline">Demo only</Badge></div>
              </div>
              <PatientHome />
              <div className="mt-4"><OmniChannelPreview /></div>
            </motion.div>
          )}
          {role === "guide" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Users className="h-5 w-5"/> Care Guide App</div>
              <CareGuide />
            </motion.div>
          )}
          {role === "nurse" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Stethoscope className="h-5 w-5"/> Nurse Console</div>
              <NurseConsole />
            </motion.div>
          )}
          {role === "org" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-lg font-semibold flex items-center gap-2 mb-2"><Hospital className="h-5 w-5"/> Hospital / Insurer Portal</div>
              <OrgPortal />
            </motion.div>
          )}

          <footer className="text-xs text-gray-500 py-8">
            <div className="mx-auto max-w-7xl px-4 flex items-center justify-center gap-2">
              <img src={LOGO_URL} alt="BiCare 360 logo" className="h-5 w-5 object-contain"/>
              <span>BiCare 360 — MVP static demo (no real data). © 2025</span>
            </div>
          </footer>
        </main>
      </div>
    </LangCtx.Provider>
  );
}
