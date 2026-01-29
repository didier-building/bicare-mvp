import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  CalendarDays,
  TriangleAlert,
  Bot,
  PhoneCall,
  MapPin,
  Clock,
  Activity,
  FileText,
  Bell
} from "lucide-react";
import { fetchTasks, fetchGuides, fetchNextAppointment } from "@/services";
import { Section, Pill } from "@/components/shared/Section";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { OmniChannelPreview } from "@/components/shared/OmniChannelPreview";
import { useLang, T } from "@/utils/i18n.jsx";

export function PatientHome() {
    // Helper for EMR/data chip
    const dataChip = (fallback = "Local") => (
      <Pill className={emrShared ? "text-teal-700 bg-teal-50" : "text-gray-700 bg-gray-100"}>
        {emrShared ? "EMR" : fallback}
      </Pill>
    );
  const { lang } = useLang();
  const [tasks, setTasks] = useState([]);
  // Goals state
  const [goals, setGoals] = useState([
    { id: 'goal1', label: lang === 'rw' ? "Kugabanya ibiro" : "Lose weight", done: false },
    { id: 'goal2', label: lang === 'rw' ? "Kunywa amazi menshi" : "Drink more water", done: false },
    { id: 'goal3', label: lang === 'rw' ? "Gukora siporo buri munsi" : "Exercise daily", done: false },
  ]);
  // Care guide booking and details state
  const [bookedGuideId, setBookedGuideId] = useState(null);
  const [viewGuide, setViewGuide] = useState(null);
  // Booking form state
  const [showBooking, setShowBooking] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({ name: "", hospital: "", date: "", time: "" });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setShowBooking(false);
      setBookingConfirmed(false);
      setBookingInfo({ name: "", hospital: "", date: "", time: "" });
    }, 1800);
  };
  const [appointment, setAppointment] = useState(null);
  const [guides, setGuides] = useState([]);
  const [done, setDone] = useState([]);
  const [emrShared, setEmrShared] = useState(true);

  // Progress calculation: combine tasks and goals
  const totalItems = tasks.length + goals.length;
  const completedGoals = goals.filter((g) => g.done).length;
  const completedItems = done.length + completedGoals;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  useEffect(() => {
    fetchTasks().then(setTasks).catch(console.error);
    fetchNextAppointment().then(setAppointment).catch(console.error);
    fetchGuides().then((data) => {
      // Map backend guide fields to expected frontend fields
      setGuides(
        data.map((g) => ({
          id: g.id,
          name: g.name,
          specialty: g.skills ? g.skills.join(', ') : '',
          available: true, // Assume all are available for demo
          onlineTime: 'Now', // Demo value
          info: g.region ? `Region: ${g.region}, ${g.distance}km away` : '',
          rating: g.rating,
        }))
      );
    }).catch(console.error);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tasks & Goals */}
        <Section title={<T rw="Imirimo n'intego by'uyu munsi" en="Today's Tasks & Goals" />} subtitle={<T rw="Shyiraho intego zawe, urangize imirimo, cyangwa ushireho kwibutsa" en="Set your goals, complete tasks, or snooze" />}>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
            <ProgressRing progress={progress} />
            <div className="text-xs text-gray-500 mt-1">{progress}%</div>
            <div className="text-xs text-gray-400 mt-1">
              {completedItems} / {totalItems} <T rw="byuzuye" en="completed" />
            </div>
          </div>
        </div>
        {/* Goals Section */}
        <div className="mb-4">
          <div className="font-semibold text-sm mb-2">
            <T rw="Intego zawe z'uyu munsi" en="Your Goals for Today" />
          </div>
          <div className="grid gap-2">
            {goals.map((g) => (
              <label key={g.id} className={`flex items-center gap-3 rounded-xl border p-3 ${g.done ? "bg-blue-50 border-blue-200" : "bg-white"}`}>
                <input type="checkbox" checked={g.done} onChange={() => !g.done && toggleGoal(g.id)} className="h-4 w-4" disabled={g.done} />
                <div className={`flex-1 font-medium text-sm ${g.done ? "line-through text-gray-400" : ""}`}>{g.label}</div>
                {g.done && (
                  <span className="flex items-center gap-1 text-blue-700 font-semibold">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span>Done</span>
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
        {/* Tasks Section */}
        <div className="flex-1 grid gap-2">
          {tasks.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-4">
              <T rw="Nta mirimo yateguwe uyu munsi. Shyiraho intego zawe hejuru!" en="No tasks scheduled for today. Set your goals above!" />
            </div>
          ) : (
            tasks.map((t) => (
              <label key={t.id} className={`flex items-center gap-3 rounded-xl border p-3 ${done.includes(t.id) ? "bg-teal-50 border-teal-200" : "bg-white"}`}>
                <input type="checkbox" checked={done.includes(t.id)} onChange={() => toggleTask(t.id)} className="h-4 w-4" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{t.label}</div>
                  <div className="text-xs text-gray-500">Due {t.due} • via {t.channel.toUpperCase()}</div>
                </div>
                {done.includes(t.id) && <Badge className="bg-teal-600">Done</Badge>}
              </label>
            ))
          )}
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
          <>
            <Card className="border-l-4 border-l-blue-500 text-center py-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <T rw="Wabona ibitaro hafi yawe?" en="Book at a nearby hospital" />
                </CardTitle>
                <CardDescription>
                  <T rw="Nta gahunda y'ubuvuzi iteganijwe. Ushobora kwiyandikisha kuri serivisi hafi yawe." en="No upcoming appointments. You can book at a nearby hospital or clinic." />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="h-8 w-8 text-blue-400 mb-2" />
                  <Dialog open={showBooking} onOpenChange={setShowBooking}>
                    <DialogTrigger asChild>
                      <Button className="mt-2" size="sm" onClick={() => setShowBooking(true)}>
                        <T rw="Andikisha gahunda nshya" en="Book appointment" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xs">
                      {bookingConfirmed ? (
                        <div className="text-center py-6">
                          <div className="text-green-600 text-2xl mb-2">✓</div>
                          <div className="font-semibold mb-1">
                            <T rw="Gahunda yashyizweho!" en="Appointment booked!" />
                          </div>
                          <div className="text-xs text-gray-500">
                            <T rw="Uzahabwa ubutumwa bugufi bwo kwibutsa." en="You will receive a reminder message." />
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleBookingSubmit} className="space-y-3">
                          <DialogHeader>
                            <DialogTitle>
                              <T rw="Andikisha gahunda nshya" en="Book Appointment" />
                            </DialogTitle>
                          </DialogHeader>
                          <Input name="name" required placeholder={lang === "rw" ? "Izina ryawe" : "Your name"} value={bookingInfo.name} onChange={handleBookingChange} />
                          <Input name="hospital" required placeholder={lang === "rw" ? "Ibitaro/Serivisi hafi" : "Nearby hospital/clinic"} value={bookingInfo.hospital} onChange={handleBookingChange} />
                          <Input name="date" required type="date" value={bookingInfo.date} onChange={handleBookingChange} />
                          <Input name="time" required type="time" value={bookingInfo.time} onChange={handleBookingChange} />
                          <DialogFooter>
                            <Button type="submit" className="w-full">
                              <T rw="Emeza" en="Confirm" />
                            </Button>
                          </DialogFooter>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </Section>

      {/* Personalized Health Tips */}
      <Section title={<T rw="Inama z'ubuzima zikwiranye nawe" en="Personalized Health Tips" />} subtitle={<T rw="Zishingiye ku burwayi n'imiti ukoresha" en="Based on your medical condition and medication" />}> 
        <div className="space-y-3">
          {/* Example: Replace with dynamic logic as needed */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent>
              <div className="font-semibold text-blue-800 mb-1">
                <T rw="Diabetes" en="Diabetes" />
              </div>
              <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1">
                <li><T rw="Irinde ibiryo birimo isukari nyinshi." en="Avoid foods high in sugar." /></li>
                <li><T rw="Fata imiti yawe uko muganga yabitegetse." en="Take your medication as prescribed." /></li>
                <li><T rw="Genzura isukari mu maraso buri munsi." en="Monitor your blood sugar daily." /></li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent>
              <div className="font-semibold text-green-800 mb-1">
                <T rw="Hypertension" en="Hypertension" />
              </div>
              <ul className="list-disc pl-5 text-sm text-green-900 space-y-1">
                <li><T rw="Gabanya umunyu mu mafunguro." en="Reduce salt in your diet." /></li>
                <li><T rw="Kora siporo buri munsi." en="Exercise regularly." /></li>
                <li><T rw="Fata imiti yawe ukoresha neza." en="Take your blood pressure medication consistently." /></li>
              </ul>
            </CardContent>
          </Card>
        </div>
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
        <div className="grid gap-3">
          {guides.map((g) => (
            <Card key={g.id} className="p-2 flex flex-col md:flex-row items-center gap-4 border-l-4 border-blue-200">
              <div className="flex items-center gap-3 flex-1">
                <Avatar className="h-12 w-12"><AvatarFallback>{g.name[0]}</AvatarFallback></Avatar>
                <div>
                  <div className="font-semibold text-base">{g.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{g.specialty}</div>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">
                    {Array.from({ length: g.rating || 4 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span className="text-gray-400 ml-1">({g.rating || 4}.0)</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{g.info || (g.available ? (lang === 'rw' ? 'Urahari ubu' : 'Available now') : (lang === 'rw' ? 'Ntiboneka' : 'Not available'))}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[120px]">
                <Dialog open={bookedGuideId === g.id} onOpenChange={(open) => !open && setBookedGuideId(null)}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setBookedGuideId(g.id)} disabled={!g.available}>
                      <T rw="Andikisha" en="Book" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs">
                    <div className="text-center py-6">
                      <div className="text-green-600 text-2xl mb-2">✓</div>
                      <div className="font-semibold mb-1">
                        <T rw="Wanditse kuri uyu mufasha!" en="Care guide booked!" />
                      </div>
                      <div className="text-xs text-gray-500">
                        <T rw="Uzakirwa vuba." en="You will be contacted soon." />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={viewGuide === g.id} onOpenChange={(open) => !open && setViewGuide(null)}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setViewGuide(g.id)}>
                      <T rw="Reba byinshi" en="View More" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs">
                    <DialogHeader>
                      <DialogTitle>{g.name}</DialogTitle>
                    </DialogHeader>
                    <div className="mb-2 text-xs text-gray-500">{g.specialty}</div>
                    <div className="mb-2 text-sm">{g.info || (lang === 'rw' ? 'Urahari gufasha.' : 'Available to help.')}</div>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs mb-2">
                      {Array.from({ length: g.rating || 4 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                      <span className="text-gray-400 ml-1">({g.rating || 4}.0)</span>
                    </div>
                    <div className="text-xs text-gray-400">Online: {g.onlineTime}</div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
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

      {/* Caregiving Courses */}
      <Section title={<T rw="Amasomo yo kwita ku barwayi" en="Caregiving Courses" />} subtitle={<T rw="Amasomo y'ubufasha n'ubumenyi" en="Courses for caregiving and health knowledge" />}>
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
    </div>
    {/* Floating Red-Flag Button & Modal Form removed */}
    </>
  );
}