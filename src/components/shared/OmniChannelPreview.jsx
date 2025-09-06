import React from "react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/shared/Section";

export function OmniChannelPreview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* WhatsApp – chat style */}
      <Section title="WhatsApp" subtitle="Chat-style preview" right={<Badge variant="secondary">Demo</Badge>}>
        <div className="rounded-2xl bg-[#e5ddd5] p-4 border">
          <div className="mx-auto max-w-sm space-y-2">
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow text-sm">
              <div className="text-xs text-gray-500 mb-1">BiCare</div>
              <div className="whitespace-pre leading-6">{`1 Today's tasks
2 Ask AI
3 Nurse
4 Book Help
5 Next Visit
6 Courses
7 Connections
8 Stop sharing`}</div>
            </div>
            <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 w-fit ml-auto shadow text-sm">2</div>
            <div className="bg-white rounded-lg px-3 py-2 w-fit shadow text-sm">Selected: Ask AI. Type your question…</div>
            <div className="mt-3 bg-white rounded-full px-3 py-2 text-sm text-gray-500 border">Type a message… (demo)</div>
          </div>
        </div>
      </Section>

      {/* USSD – terminal look */}
      <Section title="USSD / IVR" subtitle="Phone USSD terminal look">
        <div className="rounded-2xl bg-black p-4 border">
          <div className="mx-auto max-w-sm font-mono text-[13px] leading-6">
            <div className="bg-black text-green-400 rounded-lg p-3 border border-green-700 shadow-inner">
              <div>*xyz#</div>
              <div className="text-green-300">======================</div>
              <div>1. Tasks</div>
              <div>2. Reminders</div>
              <div>3. Talk to a nurse</div>
              <div>4. Book a guide</div>
              <div>5. Next visit</div>
              <div>6. Health tips</div>
              <div>7. Consent</div>
              <div>8. Language</div>
              <div className="text-green-300">----------------------</div>
              <div>Select: _</div>
            </div>
            <div className="text-green-600 mt-2">▮</div>
          </div>
        </div>
      </Section>
    </div>
  );
}