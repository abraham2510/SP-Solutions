"use client";

import { useState } from "react";
import {
  Building2,
  FileText,
  User,
  MapPin,
  Users,
  Calendar,
  Briefcase,
  ShieldCheck,
  Globe,
  Landmark,
  Copy,
  Check,
  Factory,
  Wrench,
  PackageCheck,
} from "lucide-react";
import type { AboutPageOptions } from "../options";

interface FactsheetProfileProps {
  factsheet: AboutPageOptions["factsheet"];
}

export default function FactsheetProfile({ factsheet }: FactsheetProfileProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getStrengthIcon = (name: string) => {
    switch (name) {
      case "Factory":
        return <Factory className="w-5 h-5 text-[#00266A]" />;
      case "Wrench":
        return <Wrench className="w-5 h-5 text-[#00266A]" />;
      case "PackageCheck":
        return <PackageCheck className="w-5 h-5 text-[#00266A]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#00266A]" />;
    }
  };

  const getStatutoryIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-[#00266A]" />;
      case "Globe":
        return <Globe className="w-4 h-4 text-[#00266A]" />;
      case "Landmark":
        return <Landmark className="w-4 h-4 text-[#00266A]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#00266A]" />;
    }
  };

  return (
    <section
      id="factsheet"
      className="bg-[#F8FAFC] py-14 sm:py-18 border-b border-[#E7EAEE] scroll-mt-20"
    >
      <div className="wrap max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00266A]/5 border border-[#00266A]/10 mb-2 text-[#00266A] text-[11px] font-bold tracking-widest uppercase">
            <FileText className="w-3.5 h-3.5 text-[#00266A]" />
            <span>{factsheet.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#10151C] tracking-tight">
            {factsheet.title}
          </h2>
          <p className="text-[#5B6572] text-sm sm:text-base mt-1.5">
            {factsheet.subtitle}
          </p>
        </div>

        {/* 3-Column Core Advantages Banner */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {factsheet.strengths.map((str, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7EAEE] shadow-xs flex items-start gap-3 hover:border-[#00266A]/20 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-[#00266A]/6 border border-[#00266A]/10 flex items-center justify-center shrink-0 mt-0.5">
                {getStrengthIcon(str.icon)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#10151C]">
                  {str.title}
                </h4>
                <p className="text-xs text-[#5B6572] leading-relaxed mt-1">
                  {str.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* 2-Column Balanced Deck: Basic Info & Statutory Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-2xl border border-[#E7EAEE] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7EAEE]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00266A]/8 text-[#00266A] flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#10151C]">
                      Basic Information
                    </h3>
                    <p className="text-xs text-[#8892A0]">
                      Commercial &amp; Operational Details
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7E8] border border-[#D5BD66]/40 text-[#00266A] text-[10.5px] font-bold">
                  Verified 2024
                </span>
              </div>

              {/* Compact Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Nature of Business */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE]/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8892A0] uppercase tracking-wider mb-0.5">
                    <Factory className="w-3.5 h-3.5 text-[#00266A]" />
                    <span>Nature of Business</span>
                  </div>
                  <div className="text-[13.5px] font-bold text-[#00266A]">
                    {factsheet.basicInfo.natureOfBusiness}
                  </div>
                </div>

                {/* Legal Status */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE]/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8892A0] uppercase tracking-wider mb-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#00266A]" />
                    <span>Legal Status of Firm</span>
                  </div>
                  <div className="text-[13.5px] font-bold text-[#10151C]">
                    {factsheet.basicInfo.legalStatus}
                  </div>
                </div>

                {/* Additional Business */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE]/70 sm:col-span-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8892A0] uppercase tracking-wider mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#00266A]" />
                    <span>Additional Business</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {factsheet.basicInfo.additionalBusiness.map((biz, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-[#E7EAEE] text-xs font-semibold text-[#10151C]"
                      >
                        {biz}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Company CEO */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE]/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8892A0] uppercase tracking-wider mb-0.5">
                    <User className="w-3.5 h-3.5 text-[#00266A]" />
                    <span>Company CEO</span>
                  </div>
                  <div className="text-[13.5px] font-bold text-[#10151C]">
                    {factsheet.basicInfo.companyCeo}
                  </div>
                </div>

                {/* Total Employees */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE]/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8892A0] uppercase tracking-wider mb-0.5">
                    <Users className="w-3.5 h-3.5 text-[#00266A]" />
                    <span>Total Number of Employees</span>
                  </div>
                  <div className="text-[13.5px] font-bold text-[#10151C]">
                    {factsheet.basicInfo.totalEmployees}
                  </div>
                </div>

                {/* GST Registration Date */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE]/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8892A0] uppercase tracking-wider mb-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00266A]" />
                    <span>GST Registration Date</span>
                  </div>
                  <div className="text-[13.5px] font-bold text-[#10151C]">
                    {factsheet.basicInfo.gstRegistrationDate}
                  </div>
                </div>

                {/* Short Registered Address */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE]/70">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8892A0] uppercase tracking-wider mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00266A]" />
                    <span>Registered Location</span>
                  </div>
                  <div className="text-[13.5px] font-bold text-[#10151C]">
                    {factsheet.basicInfo.shortAddress}
                  </div>
                </div>

                {/* Full Address */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE]/70 sm:col-span-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8892A0] uppercase tracking-wider mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00266A]" />
                    <span>Full Registered Address</span>
                  </div>
                  <div className="text-xs font-medium text-[#10151C]">
                    {factsheet.basicInfo.registeredAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini note */}
            <div className="pt-3 mt-4 border-t border-[#E7EAEE] flex items-center justify-between text-[11px] text-[#8892A0]">
              <span>Direct Manufacturer Profile</span>
              <span className="font-semibold text-[#00266A]">
                SP Solutions Chennai
              </span>
            </div>
          </div>

          {/* Card 2: Statutory Profile & Compliance */}
          <div className="bg-white rounded-2xl border border-[#E7EAEE] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7EAEE]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00266A]/8 text-[#00266A] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#10151C]">
                      Statutory Profile
                    </h3>
                    <p className="text-xs text-[#8892A0]">
                      Compliance &amp; Banking
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#bfee90]/40 text-[#1a5e00] text-[10.5px] font-bold">
                  Active
                </span>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-3">
                {/* GST Number */}
                <div className="p-3 rounded-xl bg-[#00266A]/5 border border-[#00266A]/10 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#8892A0] uppercase tracking-wider">
                      GST No.
                    </div>
                    <div className="font-mono text-[13.5px] font-bold text-[#00266A] mt-0.5 tracking-wider">
                      {factsheet.statutory.gstNo}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(factsheet.statutory.gstNo, "gst")}
                    className="p-1.5 rounded-lg bg-white text-[#00266A] hover:bg-[#D5DEF0] transition-colors border border-[#E7EAEE]"
                    title="Copy GST No"
                  >
                    {copiedKey === "gst" ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* IEC Code */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#8892A0] uppercase tracking-wider">
                      Import Export Code (IEC)
                    </div>
                    <div className="font-mono text-[13.5px] font-bold text-[#10151C] mt-0.5 tracking-wider">
                      {factsheet.statutory.iecCode}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(factsheet.statutory.iecCode, "iec")
                    }
                    className="p-1.5 rounded-lg bg-white text-[#00266A] hover:bg-[#D5DEF0] transition-colors border border-[#E7EAEE]"
                    title="Copy IEC Code"
                  >
                    {copiedKey === "iec" ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Banker */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E7EAEE] flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#8892A0] uppercase tracking-wider">
                      Banker
                    </div>
                    <div className="text-[13.5px] font-bold text-[#10151C] mt-0.5">
                      {factsheet.statutory.banker}
                    </div>
                  </div>
                  <Landmark className="w-4 h-4 text-[#8892A0]" />
                </div>
              </div>

              {/* Verification Badges */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#E7EAEE]">
                {factsheet.statutory.verificationBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-[#F4F6FA] text-center flex flex-col items-center justify-center border border-[#E7EAEE]/60"
                  >
                    <div className="mb-0.5">
                      {getStatutoryIcon(badge.iconName)}
                    </div>
                    <div className="text-[10px] font-bold text-[#10151C] leading-tight">
                      {badge.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom mini note */}
            <div className="pt-3 mt-4 border-t border-[#E7EAEE] flex items-center justify-between text-[11px] text-[#8892A0]">
              <span>Statutory Compliance</span>
              <span className="font-semibold text-[#00266A]">
                Proprietorship Firm
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
