export default function HeroRig({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return (
      <div className="hero-rig left-0" aria-hidden="true">
        <svg viewBox="0 0 260 640" xmlns="http://www.w3.org/2000/svg">
          {/* support frame */}
          <path d="M40 40v560M120 120v480" stroke="#00266A" strokeWidth="2.5" opacity="0.4" />
          
          {/* large gear */}
          <g className="gear gear-cw" transform="translate(72,150)">
            <circle r="46" fill="none" stroke="#00266A" strokeWidth="3.5" />
            <circle r="14" fill="#00266A" />
            <g stroke="#00266A" strokeWidth="8" strokeLinecap="round">
              <line x1="0" y1="-46" x2="0" y2="-60" />
              <line x1="0" y1="46" x2="0" y2="60" />
              <line x1="-46" y1="0" x2="-60" y2="0" />
              <line x1="46" y1="0" x2="60" y2="0" />
              <line x1="-32" y1="-32" x2="-42" y2="-42" />
              <line x1="32" y1="32" x2="42" y2="42" />
              <line x1="-32" y1="32" x2="-42" y2="42" />
              <line x1="32" y1="-32" x2="42" y2="-42" />
            </g>
          </g>

          {/* small counter gear */}
          <g className="gear gear-ccw" transform="translate(150,206)">
            <circle r="26" fill="none" stroke="#D5BD66" strokeWidth="3.5" />
            <circle r="8" fill="#D5BD66" />
            <g stroke="#D5BD66" strokeWidth="6" strokeLinecap="round">
              <line x1="0" y1="-26" x2="0" y2="-35" />
              <line x1="0" y1="26" x2="0" y2="35" />
              <line x1="-26" y1="0" x2="-35" y2="0" />
              <line x1="26" y1="0" x2="35" y2="0" />
            </g>
          </g>

          {/* robotic arm */}
          <g className="rig-float" transform="translate(150,330)">
            <rect x="-14" y="-10" width="28" height="30" rx="4" fill="#00266A" />
            <g className="rig-arm">
              <rect x="-6" y="-70" width="12" height="70" rx="5" fill="#2563EB" />
              <circle cy="-70" r="9" fill="#00266A" />
              <rect x="-4" y="-96" width="8" height="30" rx="3" fill="#D5BD66" />
            </g>
          </g>

          {/* conveyor with moving belt */}
          <g transform="translate(20,470)">
            <rect x="0" y="0" width="150" height="18" rx="6" fill="#F1F5F9" stroke="#00266A" strokeWidth="2" />
            <line x1="6" y1="9" x2="144" y2="9" stroke="#00266A" strokeWidth="2.5" className="belt-dash" />
            <rect x="10" y="-14" width="20" height="14" rx="2" fill="#00266A" />
            <rect x="60" y="-14" width="20" height="14" rx="2" fill="#D5BD66" />
            <rect x="110" y="-14" width="20" height="14" rx="2" fill="#00266A" />
            <circle cx="16" cy="26" r="6" fill="#00266A" />
            <circle cx="134" cy="26" r="6" fill="#00266A" />
          </g>

          {/* status lights */}
          <circle className="pulse-dot" cx="72" cy="60" r="6" fill="#D5BD66" />
          <circle className="rig-beam" cx="150" cy="120" r="4" fill="#2563EB" />
        </svg>
        <div className="rig-fade-l" />
      </div>
    );
  }

  return (
    <div className="hero-rig right-0" aria-hidden="true">
      <svg viewBox="0 0 260 640" xmlns="http://www.w3.org/2000/svg">
        <path d="M220 40v560M140 120v480" stroke="#00266A" strokeWidth="2.5" opacity="0.4" />
        
        {/* printer / coder head */}
        <g className="rig-float" transform="translate(150,110)">
          <rect x="-40" y="-24" width="80" height="48" rx="8" fill="#00266A" />
          <rect x="-30" y="-14" width="60" height="10" rx="3" fill="#FFFFFF" opacity=".7" />
          <circle className="pulse-dot" cx="26" cy="-14" r="5" fill="#D5BD66" />
          <rect x="-6" y="24" width="12" height="30" fill="#2563EB" />
        </g>

        {/* large gear */}
        <g className="gear gear-ccw" transform="translate(188,260)">
          <circle r="50" fill="none" stroke="#00266A" strokeWidth="3.5" />
          <circle r="15" fill="#00266A" />
          <g stroke="#00266A" strokeWidth="8" strokeLinecap="round">
            <line x1="0" y1="-50" x2="0" y2="-64" />
            <line x1="0" y1="50" x2="0" y2="64" />
            <line x1="-50" y1="0" x2="-64" y2="0" />
            <line x1="50" y1="0" x2="64" y2="0" />
            <line x1="-35" y1="-35" x2="-46" y2="-46" />
            <line x1="35" y1="35" x2="46" y2="46" />
            <line x1="-35" y1="35" x2="-46" y2="46" />
            <line x1="35" y1="-35" x2="46" y2="-46" />
          </g>
        </g>

        <g className="gear gear-cw gear-slow" transform="translate(112,300)">
          <circle r="22" fill="none" stroke="#D5BD66" strokeWidth="3.5" />
          <circle r="7" fill="#D5BD66" />
          <g stroke="#D5BD66" strokeWidth="5" strokeLinecap="round">
            <line x1="0" y1="-22" x2="0" y2="-30" />
            <line x1="0" y1="22" x2="0" y2="30" />
            <line x1="-22" y1="0" x2="-30" y2="0" />
            <line x1="22" y1="0" x2="30" y2="0" />
          </g>
        </g>

        {/* shrink-wrap tunnel */}
        <g transform="translate(90,430)">
          <rect x="0" y="-20" width="120" height="56" rx="10" fill="#00266A" />
          <rect x="10" y="-10" width="100" height="36" rx="6" fill="#FFFFFF" opacity=".25" />
          <line x1="16" y1="8" x2="104" y2="8" stroke="#D5BD66" strokeWidth="2.5" className="belt-dash" opacity="1" />
          <circle cx="14" cy="50" r="7" fill="#00266A" />
          <circle cx="106" cy="50" r="7" fill="#00266A" />
        </g>

        <circle className="rig-beam" cx="150" cy="380" r="4" fill="#2563EB" />
      </svg>
      <div className="rig-fade-r" />
    </div>
  );
}
