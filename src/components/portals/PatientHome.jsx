import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  TriangleAlert,
  Bot,
  PhoneCall,
  MapPin,
  Clock,
  Activity,
  Bell,
  MessageCircle,
  FileText,
} from "lucide-react";

import { fetchTasks, fetchGuides, fetchNextAppointment } from "@/services";
import { Section, Pill } from "@/components/shared/Section";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { OmniChannelPreview } from "@/components/shared/OmniChannelPreview";
import { useLang, T } from "@/utils/i18n.jsx";

export function PatientHome() {
  const { lang } = useLang();
  const [tasks, setTasks] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [guides, setGuides] = useState([]);
  const [done, setDone] = useState([]);
  const [emrShared, setEmrShared] = useState(true);
  const progress = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;

  useEffect(() => {
    fetchTasks().then(setTasks).catch(console.error);
    fetchNextAppointment().then(setAppointment).catch(console.error);
    fetchGuides().then(setGuides).catch(console.error);
  }, []);

  const toggleTask = (id) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const dataChip = (fallback = "Local") => <Pill className={emrShared ? "text-teal-700 bg-teal-50" : "text-gray-700 bg-gray-100"}>{emrShared ? "EMR" : fallback}</Pill>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Tasks */}
      <Section title={<T rw="Imirimo y'uyu munsi" en="Today's Tasks" />} subtitle={<T rw="Kanda urangize cyangwa ushireho kwibutsa" en="Tap to complete or snooze" />}>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <ProgressRing progress={progress} />
            <div className="text-xs text-gray-500 mt-1">{progress}%</div>
          </div>
        </div>
        <div className="flex-1 grid gap-2">
          {tasks.map((t) => (
            <label key={t.id} className={`flex items-center gap-3 rounded-xl border p-3 ${done.includes(t.id) ? "bg-teal-50 border-teal-200" : "bg-white"}`}>
              <input type="checkbox" checked={done.includes(t.id)} onChange={() => toggleTask(t.id)} className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium text-sm">{t.label}</div>
                <div className="text-xs text-gray-500">Due {t.due} • via {t.channel.toUpperCase()}</div>
              </div>
              {done.includes(t.id) && <Badge className="bg-teal-600">Done</Badge>}
            </label>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {lang === "rw" ? (
            <>Ukeneye ubufasha? Koresha <span className="font-semibold">Saba AI</span> cyangwa kande <span className="font-semibold">Red-Flag</span>.</>
          ) : (
            <>Need help? Use <span className="font-semibold">Ask AI</span> or press <span className="font-semibold">Red-Flag</span>.</>
          )}
        </div>
      </Section>

      {/* Next appointment */}
      <Section title={<T rw="Ubusanzwe busaga" en="Next Appointment" />} subtitle={<T rw="Shira kumpapuro cyangwa shira ikimenyetso" en="Add to calendar or set reminder" />}>
        {appointment ? (
          <>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{appointment.type}</CardTitle>
                <CardDescription>{appointment.provider}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4" />
                  <span>{appointment.date}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.location}</span>
                </div>
              </CardContent>
            </Card>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm"><CalendarDays className="h-4 w-4 mr-1" />Add to calendar</Button>
              <Button variant="outline" size="sm"><Bell className="h-4 w-4 mr-1" />Remind me</Button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <CalendarDays className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-sm">No upcoming appointments</div>
            <Button className="mt-2" size="sm">Book appointment</Button>
          </div>
        )}
      </Section>

      {/* Ask AI (Chat) */}
      <Section title={<T rw="Saba AI" en="Ask AI" />} subtitle={<T rw="Burizamo ubwoba cyangwa ubushakashatsi ku buzima" en="Health questions, concerns, or research" />}>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm mb-2">💡 <T rw="Kubaza" en="Try asking" />:</div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>&ldquo;<T rw="Ntegeko za diabetes?" en="Diabetes management tips?" />&rdquo;</div>
              <div>&ldquo;<T rw="Ibimenyetso by'umutima?" en="Heart attack symptoms?" />&rdquo;</div>
              <div>&ldquo;<T rw="Uko rwagasana imiti?" en="Safe medication interactions?" />&rdquo;</div>
            </div>
          </div>
          <Textarea placeholder={lang === "rw" ? "Andika ikibazo cyawe..." : "Type your health question..."} className="min-h-[80px]" />
          <Button className="w-full"><Bot className="h-4 w-4 mr-2" /><T rw="Saba AI" en="Ask AI" /></Button>
        </div>
      </Section>

      {/* Care guides */}
      <Section title={<T rw="Abafasha ku buzima" en="Care Guides" />} subtitle={<T rw="Bafasha ku nshingano z'ubuzima, ibikorwa n'amahugurwa" en="Health coaches for tasks, activities, and education" />}>
        <div className="grid gap-2">
          {guides.map((g) => (
            <div key={g.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <Avatar className="h-8 w-8"><AvatarFallback>{g.name[0]}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium">{g.name}</div>
                <div className="text-xs text-gray-500">{g.specialty}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Online {g.onlineTime}</div>
                <Badge variant={g.available ? "default" : "secondary"} className="text-xs">
                  {g.available ? "Available" : "Busy"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1"><PhoneCall className="h-4 w-4 mr-1" />Call</Button>
          <Button variant="outline" size="sm" className="flex-1"><MessageCircle className="h-4 w-4 mr-1" />Chat</Button>
        </div>
      </Section>

      {/* Consent / Sharing */}
      <Section title={<T rw="Kwemera gusangira amakuru" en="Data Sharing & Consent" />} subtitle={<T rw="Genzura ko usangira amakuru y'ubuzima" en="Control your health data sharing" />}>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <div className="text-sm font-medium flex items-center gap-2">
                <T rw="Sangira EMR n'abafasha" en="Share EMR with care team" />
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">HIPAA Compliant</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <T rw="Aba abantu bazafasha bazabona amakuru yawe y'ubuvuzi" en="Care team can view your medical records and care plans" />
              </div>
            </div>
            <Switch checked={emrShared} onCheckedChange={setEmrShared} />
          </div>
          
          {emrShared && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm font-medium text-green-800 mb-1">
                <T rw="Amakuru asangiwe" en="Shared Information" />
              </div>
              <div className="text-xs text-green-700 space-y-1">
                <div>✓ <T rw="Amateka y'ubuvuzi" en="Medical history" /></div>
                <div>✓ <T rw="Imiti ukoresha" en="Current medications" /></div>
                <div>✓ <T rw="Ibisubizo by'ibizamini" en="Lab results" /></div>
                <div>✓ <T rw="Gahunda z'ubuvuzi" en="Care plans" /></div>
              </div>
            </div>
          )}
          
          <div className="p-2 bg-gray-50 rounded text-xs text-gray-600 flex items-center justify-between">
            <span>
              <T rw="Data yose ikingwa mu buryo bwiza, kandi ikoresha encryption" en="All data encrypted and securely stored" /> {dataChip()}
            </span>
            <Button variant="ghost" size="sm" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              <T rw="Download ugaragaze" en="View Access Log" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Health monitoring */}
      <Section title={<T rw="Gukurikirana ubuzima" en="Health Monitoring" />} subtitle={<T rw="Ibipimo n'inyandiko" en="Vital signs and metrics" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Blood Pressure</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold">120/80</div>
                <div className="text-xs text-green-600 mb-2">Normal</div>
                <div className="text-xs text-gray-500">
                  <T rw="Iyi mibare irerekana imbaraga zawe z'amaraso" en="This shows the force of blood in your arteries" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Heart Rate</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold">72 bpm</div>
                <div className="text-xs text-green-600 mb-2">Good</div>
                <div className="text-xs text-gray-500">
                  <T rw="Umutima wawe ugunda imibare myiza" en="Your heart beats at a healthy rate" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Weight</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold">68 kg</div>
                <div className="text-xs text-green-600 mb-2">-0.5 kg</div>
                <div className="text-xs text-gray-500">
                  <T rw="Ugabanye ibiro neza" en="You're losing weight in a healthy way" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Sleep</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl font-bold">7.2h</div>
                <div className="text-xs text-green-600 mb-2">Good</div>
                <div className="text-xs text-gray-500">
                  <T rw="Uraruhutse neza kuri uyu munsi" en="You're getting good rest each night" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {emrShared && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm font-medium text-blue-800 mb-2">
                <T rw="Icyo ibi bivuze" en="What this means for you" />
              </div>
              <div className="text-xs text-blue-700 space-y-1">
                <div>• <T rw="Ibipimo byawe byose biri mu buryo bwiza" en="All your vital signs are in healthy ranges" /></div>
                <div>• <T rw="Komeza ukore siporo n'indyo myiza" en="Continue your exercise and healthy diet" /></div>
                <div>• <T rw="Ruhuka neza kandi unywe amazi menshi" en="Keep getting good sleep and staying hydrated" /></div>
              </div>
            </div>
          )}
        </div>
        <Button variant="outline" className="w-full mt-3"><Activity className="h-4 w-4 mr-2" />View trends</Button>
      </Section>

      {/* Emergency contacts */}
      <Section title={<T rw="Telefoni z'ihutirwa" en="Emergency Contacts" />} subtitle={<T rw="Abantu bo guhamagara mu gihe cy'ihutirwa" en="People to call in emergencies" />}>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 border rounded-lg">
            <Avatar className="h-8 w-8"><AvatarFallback>JS</AvatarFallback></Avatar>
            <div className="flex-1">
              <div className="text-sm font-medium">Dr. Jane Smith</div>
              <div className="text-xs text-gray-500">Primary Doctor</div>
            </div>
            <Button size="sm" variant="outline"><PhoneCall className="h-4 w-4" /></Button>
          </div>
          <div className="flex items-center gap-3 p-2 border rounded-lg">
            <Avatar className="h-8 w-8"><AvatarFallback>MN</AvatarFallback></Avatar>
            <div className="flex-1">
              <div className="text-sm font-medium">Marie Nakamura</div>
              <div className="text-xs text-gray-500">Emergency Contact</div>
            </div>
            <Button size="sm" variant="outline"><PhoneCall className="h-4 w-4" /></Button>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-3">📞 Emergency Services</Button>
      </Section>

      {/* Health education */}
      <Section title={<T rw="Kwiga ku buzima" en="Health Education" />} subtitle={<T rw="Amakuru y'ubumenyi ku buzima" en="Educational health content" />}>
        <div className="space-y-2">
          <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="text-sm font-medium">Managing Diabetes</div>
            <div className="text-xs text-gray-500">5 min read • Video available</div>
          </div>
          <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="text-sm font-medium">Heart-Healthy Diet</div>
            <div className="text-xs text-gray-500">8 min read • Recipe included</div>
          </div>
          <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="text-sm font-medium">Exercise Guidelines</div>
            <div className="text-xs text-gray-500">3 min read • Interactive plan</div>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-3">View all topics</Button>
      </Section>

      {/* Quick stats */}
      <Section title={<T rw="Ibipimo byihuse" en="Quick Stats" />} subtitle={<T rw="Incamake y'umukono wawe w'ubuzima" en="Your health summary" />}>
        <div className="text-center space-y-3">
          <div className="text-2xl font-bold text-green-600">85%</div>
          <div className="text-sm text-gray-600">Health Score</div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="text-center">
              <div className="font-semibold">12</div>
              <div className="text-gray-500">Tasks done</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">3</div>
              <div className="text-gray-500">Appointments</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">7</div>
              <div className="text-gray-500">Days streak</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Recent lab results */}
      <Section title={<T rw="Ibisubizo by'ibizamini" en="Lab Results" />} subtitle={<T rw="Ibisubizo by'ibizamini bya vuba" en="Recent lab test results" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1">Test</th>
                <th className="py-1">Result</th>
                <th className="py-1">Range</th>
                <th className="py-1">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr>
                <td className="py-1">Glucose</td>
                <td className="py-1">95 mg/dL</td>
                <td className="py-1">70-100</td>
                <td className="py-1">✅ Normal</td>
              </tr>
              <tr>
                <td className="py-1">Cholesterol</td>
                <td className="py-1">180 mg/dL</td>
                <td className="py-1">&lt;200</td>
                <td className="py-1">✅ Good</td>
              </tr>
              <tr>
                <td className="py-1">Hemoglobin</td>
                <td className="py-1">14.2 g/dL</td>
                <td className="py-1">12-16</td>
                <td className="py-1">✅ Normal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex gap-2"><Button variant="outline"><FileText className="h-4 w-4 mr-1" /> Export PDF</Button><Button variant="outline">Refresh</Button></div>
      </Section>

      {/* WhatsApp / USSD previews */}
      <div className="lg:col-span-3"><OmniChannelPreview /></div>

      {/* Floating Red-Flag Button */}
      <button title="Red-Flag" className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
        <TriangleAlert className="h-6 w-6" />
      </button>
    </div>
  );
}