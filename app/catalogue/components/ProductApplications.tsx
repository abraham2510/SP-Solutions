/** Renders the applications tag cloud. Returns null if no applications. */
export default function ProductApplications({ applications }: { applications: string[] }) {
  if (!applications || applications.length === 0) return null;

  return (
    <div>
      <h2 className="text-[20px] font-bold text-[#10151C] mb-5 tracking-tight">Applications</h2>
      <div className="flex flex-wrap gap-2">
        {applications.map((app, i) => (
          <span
            key={i}
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[#00266A] bg-[#F4F6FA] border border-[#D5DEF0]"
          >
            {app}
          </span>
        ))}
      </div>
    </div>
  );
}
