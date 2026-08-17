/** Renders the features list. Returns null if no features — no empty section. */
export default function ProductFeatures({ features }: { features: string[] }) {
  if (!features || features.length === 0) return null;

  return (
    <div>
      <h2 className="text-[20px] font-bold text-[#10151C] mb-5 tracking-tight">Key Features</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-[#D5BD66]/20 text-[#00266A] flex items-center justify-center shrink-0">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-[14.5px] text-[#334155] leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
