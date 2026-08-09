const ITEMS = [
  "Shrink Wrap|Machines",
  "Flow Wrap|Machines",
  "L-Sealer|Packagers",
  "Metal|Detectors",
  "Strapping|Machines",
  "Coding & Printing|Systems",
  "Spares &|Consumables",
];

function TickerSet() {
  return (
    <>
      {ITEMS.map((item, i) => {
        const [bold, rest] = item.split("|");
        return (
          <div key={i} className="ticker-item flex items-center gap-[14px] px-[22px]">
            <b>{bold}</b> {rest}
            <span className="w-1 h-1 rounded-full bg-gray-soft" />
          </div>
        );
      })}
    </>
  );
}

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <TickerSet />
        <TickerSet />
      </div>
    </div>
  );
}
