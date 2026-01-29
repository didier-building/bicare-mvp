import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TriangleAlert } from "lucide-react";
import { T } from "@/utils/i18n.jsx";

export function RedFlagButtonWithForm({ lang }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    symptom: "",
    condition: "",
    location: "",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setForm({ name: "", symptom: "", condition: "", location: "", notes: "" });
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button title="Red-Flag" className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
          <TriangleAlert className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-green-600 text-2xl mb-2">✓</div>
            <div className="font-semibold mb-1">
              <T rw="Raporo y'ikibazo yoherejwe!" en="Red flag report submitted!" />
            </div>
            <div className="text-xs text-gray-500">
              <T rw="Itsinda ry'ubuvuzi rizagufasha vuba." en="The care team will assist you soon." />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <DialogHeader>
              <DialogTitle>
                <T rw="Uzuza raporo y'ikibazo" en="Fill Red Flag Report" />
              </DialogTitle>
            </DialogHeader>
            <Input name="name" required placeholder={lang === "rw" ? "Izina ryawe" : "Your name"} value={form.name} onChange={handleChange} />
            <Input name="symptom" required placeholder={lang === "rw" ? "Ikimenyetso" : "Symptom"} value={form.symptom} onChange={handleChange} />
            <Input name="condition" required placeholder={lang === "rw" ? "Indwara/Ubuzima" : "Condition/Health"} value={form.condition} onChange={handleChange} />
            <Input name="location" required placeholder={lang === "rw" ? "Aho uherereye" : "Location"} value={form.location} onChange={handleChange} />
            <Textarea name="notes" placeholder={lang === "rw" ? "Ibisobanuro byiyongera" : "Additional notes"} value={form.notes} onChange={handleChange} />
            <DialogFooter>
              <Button type="submit" className="w-full">
                <T rw="Ohereza" en="Submit" />
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
