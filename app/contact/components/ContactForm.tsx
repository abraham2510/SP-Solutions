"use client";

import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONTACTS } from "@/lib/constants";
import { EnquirySchema, type EnquiryInput } from "@/lib/validations/enquiry";
import { submitEnquiry } from "@/actions/enquiries";
import { PhoneInput } from "@/components/ui/PhoneInput";

const INQUIRY_TYPES = [
  "Machine Purchase",
  "Repair & Technical Service",
  "Annual Maintenance Contract (AMC)",
  "Custom Line Automation",
  "Spare Parts & Consumables",
  "General Inquiry",
] as const;

export default function ContactForm() {
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(
    null,
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(EnquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      inquiryType: "Machine Purchase",
      subject: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<EnquiryInput> = async (data) => {
    setServerError(null);
    try {
      const res = await submitEnquiry(data);
      if (res.success) {
        setSubmissionSuccess(res.id);
        reset();
      } else {
        setServerError(
          res.error || "Failed to submit enquiry. Please try again.",
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setServerError(
        "An unexpected error occurred. Please try again or contact us via WhatsApp.",
      );
    }
  };

  if (submissionSuccess) {
    return (
      <div className="bg-white rounded-3xl border border-[#E7EAEE] p-8 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(0,38,106,0.1)] text-center animate-in fade-in-50 zoom-in-95 duration-300 w-full h-full min-h-[580px] lg:min-h-full flex flex-col justify-between">
        {/* Centered Message Content */}
        <div className="flex flex-col items-center justify-center my-auto py-6">
          {/* Top Brand Navy Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-[#00266A]/5 border border-[#00266A]/15 text-[#00266A] flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-[#00266A]" />
          </div>

          {/* Reference Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00266A]/5 border border-[#00266A]/15 text-[#00266A] text-[11.5px] font-bold tracking-[0.08em] uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00266A] animate-pulse" />
            <span>
              Inquiry Reference #{submissionSuccess.slice(-6).toUpperCase()}
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-bold text-[#10151C] mb-3 tracking-tight">
            Thank you! We&apos;ve received your request.
          </h3>

          {/* Description */}
          <p className="text-[#5B6572] text-[14.5px] sm:text-[15px] leading-relaxed max-w-md mx-auto mb-7">
            An SP Solutions technical specialist is reviewing your requirements
            and will reach out with pricing, machine specifications, or technical
            details within{" "}
            <strong className="text-[#10151C]">2 business hours</strong>.
          </p>

          {/* Details Summary Box */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-[#E7EAEE] w-full max-w-md mx-auto text-left grid grid-cols-2 gap-4 divide-x divide-[#E7EAEE]">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8892A0]">
                Expected Response
              </span>
              <span className="text-[13px] sm:text-[13.5px] font-bold text-[#10151C] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00266A]" />
                Within 2 Hours
              </span>
            </div>
            <div className="flex flex-col gap-1 pl-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8892A0]">
                Assigned Team
              </span>
              <span className="text-[13px] sm:text-[13.5px] font-bold text-[#10151C] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00266A]" />
                Chennai Technical Desk
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons matching website UI */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-6 mt-auto border-t border-[#E7EAEE]">
          <a
            href={SITE_CONTACTS.whatsapp.getUrl(`Hi SP Solutions, I just submitted an inquiry (Ref: ${submissionSuccess.slice(-6).toUpperCase()}) regarding packaging machinery.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full sm:w-auto !px-7 !py-3.5 !rounded-xl !text-[14px] !font-bold flex items-center justify-center gap-2 shadow-md shadow-[#00266A]/20"
          >
            <MessageSquare className="w-4 h-4 text-[#D5BD66]" />
            <span>Connect on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setSubmissionSuccess(null)}
            className="btn btn-outline w-full sm:w-auto !px-7 !py-3.5 !rounded-xl !text-[14px] !font-semibold border-[#E7EAEE] hover:border-[#00266A] hover:bg-[#F8FAFC] text-[#10151C] cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl border border-[#E7EAEE] p-6 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,38,106,0.1)] flex flex-col gap-7"
      noValidate
    >
      {/* Header inside form */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#10151C] tracking-tight">
          Request a Machine Quote or Service
        </h3>
        <p className="text-[#5B6572] text-[14px] mt-1.5 leading-relaxed">
          Fill in your packaging specifications or repair issue. Our engineering
          team responds within 2 hours.
        </p>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
          <div className="leading-snug">{serverError}</div>
        </div>
      )}

      {/* Inquiry Type Dropdown */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="inquiryType"
          className="text-[13px] font-bold text-[#10151C]"
        >
          What can we help you with? <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            id="inquiryType"
            {...register("inquiryType")}
            className="w-full rounded-xl border border-[#E7EAEE] bg-white px-4 py-3 text-[14px] font-medium text-[#10151C] focus:outline-none focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/15 transition-all shadow-2xs appearance-none cursor-pointer pr-10"
          >
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8892A0]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Two Column Row: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-[13px] font-bold text-[#10151C]"
          >
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Alex Navinkumar"
            {...register("name")}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] font-medium text-[#10151C] placeholder-[#8892A0] focus:outline-none transition-all shadow-2xs ${
              errors.name
                ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                : "border-[#E7EAEE] focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/15"
            }`}
          />
          {errors.name && (
            <span className="text-rose-600 text-[12px] font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Work Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-[13px] font-bold text-[#10151C]"
          >
            Work Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="e.g. procurement@company.com"
            {...register("email")}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] font-medium text-[#10151C] placeholder-[#8892A0] focus:outline-none transition-all shadow-2xs ${
              errors.email
                ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                : "border-[#E7EAEE] focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/15"
            }`}
          />
          {errors.email && (
            <span className="text-rose-600 text-[12px] font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      {/* Two Column Row: Phone Number & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone Input with Country Flag */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-[13px] font-bold text-[#10151C]"
          >
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter phone number"
                className={
                  errors.phone ? "ring-2 ring-rose-400 rounded-xl" : ""
                }
              />
            )}
          />
          {errors.phone && (
            <span className="text-rose-600 text-[12px] font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Company Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="company"
            className="text-[13px] font-bold text-[#10151C]"
          >
            Company / Business Name{" "}
            <span className="text-[11px] font-normal text-[#8892A0]">
              (Optional)
            </span>
          </label>
          <input
            id="company"
            type="text"
            placeholder="e.g. Apex Industrial Packaging Ltd"
            {...register("company")}
            className="w-full rounded-xl border border-[#E7EAEE] bg-white px-4 py-3 text-[14px] font-medium text-[#10151C] placeholder-[#8892A0] focus:outline-none focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/15 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Specific Subject / Machine Model */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="subject"
          className="text-[13px] font-bold text-[#10151C]"
        >
          Specific Machine Model or Subject{" "}
          <span className="text-[11px] font-normal text-[#8892A0]">
            (Optional)
          </span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="e.g. Automatic Shrink Tunnel ST-500, Strapping Machine AMC, or Emergency Breakdown"
          {...register("subject")}
          className="w-full rounded-xl border border-[#E7EAEE] bg-white px-4 py-3 text-[14px] font-medium text-[#10151C] placeholder-[#8892A0] focus:outline-none focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/15 transition-all shadow-2xs"
        />
      </div>

      {/* Message & Technical Requirement */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-[13px] font-bold text-[#10151C] flex items-center justify-between"
        >
          <span>
            Detailed Requirements / Breakdown Description{" "}
            <span className="text-rose-500">*</span>
          </span>
          <span className="text-[11px] font-normal text-[#8892A0]">
            Min 10 characters
          </span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Please describe your product, required packing speed (packs/min), dimensions, film type (POF/PVC/BOPP), or symptoms of the machine breakdown..."
          {...register("message")}
          className={`w-full rounded-xl border bg-white p-4 text-[14px] font-medium text-[#10151C] placeholder-[#8892A0] focus:outline-none transition-all shadow-2xs leading-relaxed resize-y min-h-[110px] ${
            errors.message
              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              : "border-[#E7EAEE] focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/15"
          }`}
        />
        {errors.message && (
          <span className="text-rose-600 text-[12px] font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button & Privacy Note */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E7EAEE]">
        <div className="text-[12px] text-[#5B6572] leading-snug text-center sm:text-left">
          Your information is confidential. We do not share inquiries with third
          parties.
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto btn btn-primary !px-8 !py-3.5 !rounded-xl !text-[14.5px] font-bold shadow-lg shadow-[#00266A]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Inquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
