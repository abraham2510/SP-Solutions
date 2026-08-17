/**
 * Renders specifications as a clean table.
 * Returns null if specifications is empty — no empty section rendered per spec.
 */
export default function ProductSpecifications({
  specifications,
}: {
  specifications: Record<string, string>;
}) {
  const entries = Object.entries(specifications);
  if (entries.length === 0) return null;

  return (
    <div>
      <h2 className="text-[20px] font-bold text-[#10151C] mb-5 tracking-tight">Specifications</h2>
      <div className="rounded-xl border border-[#E7EAEE] overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {entries.map(([key, value], i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}
              >
                <td className="px-5 py-3 font-semibold text-[#10151C] w-[40%] border-r border-[#E7EAEE] text-[13.5px]">
                  {key}
                </td>
                <td className="px-5 py-3 text-[#5B6572] text-[13.5px]">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
