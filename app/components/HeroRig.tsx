export default function HeroRig({ side }: { side: "left" | "right" }) {
  if (side === "left") {
    return (
      <div className="hero-rig left-0" aria-hidden="true">
        <svg viewBox="0 0 240 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Rich corrugated kraft cardboard gradients */}
            <linearGradient id="cartonMainGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5D09E" />
              <stop offset="40%" stopColor="#E3AB69" />
              <stop offset="100%" stopColor="#C48842" />
            </linearGradient>
            <linearGradient id="cartonSideGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D49954" />
              <stop offset="60%" stopColor="#B37731" />
              <stop offset="100%" stopColor="#8C561C" />
            </linearGradient>
            <linearGradient id="cartonTopGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F7D8AC" />
              <stop offset="100%" stopColor="#DEAC6E" />
            </linearGradient>
            <linearGradient id="cavityDepthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E0E02" />
              <stop offset="100%" stopColor="#3B1E07" />
            </linearGradient>
            <linearGradient id="productGoldCanister" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B88A1A" />
              <stop offset="35%" stopColor="#FFEF9E" />
              <stop offset="70%" stopColor="#D5BD66" />
              <stop offset="100%" stopColor="#966D0C" />
            </linearGradient>
            <linearGradient id="steelRodGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="tapeGoldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#D5BD66" />
              <stop offset="100%" stopColor="#A88B27" />
            </linearGradient>
          </defs>

          {/* Precision Vertical Machine Guide Rails */}
          <line x1="20" y1="40" x2="20" y2="560" stroke="#00266A" strokeWidth="2" opacity="0.2" strokeDasharray="6 4" />
          <line x1="210" y1="40" x2="210" y2="560" stroke="#00266A" strokeWidth="2" opacity="0.2" strokeDasharray="6 4" />

          {/* Top Status Header */}
          <g transform="translate(18, 85)">
            <rect x="0" y="0" width="144" height="32" rx="6" fill="#00266A" stroke="#2563EB" strokeWidth="1.5" />
            <rect x="5" y="5" width="134" height="22" rx="4" fill="#03112E" />
            <text x="12" y="17" fill="#C1FF72" fontSize="7.5" fontFamily="monospace" fontWeight="bold">BOX PACKER 01</text>
            <text x="12" y="24" fill="#D5BD66" fontSize="6" fontFamily="monospace">STATUS: ACTIVE · 60 PPM</text>
            <circle cx="126" cy="16" r="3.5" fill="#C1FF72" className="pulse-dot" />
          </g>

          {/* ============================================================ */}
          {/* OVERHEAD PACKING DISPENSER (CENTERED AT X = 90)              */}
          {/* ============================================================ */}
          <g transform="translate(90, 130)">
            {/* Cylinder Housing */}
            <rect x="-18" y="0" width="36" height="52" rx="5" fill="#00266A" stroke="#2563EB" strokeWidth="1.5" />
            <rect x="-12" y="8" width="24" height="6" rx="2" fill="#D5BD66" />
            <circle cx="0" cy="28" r="4.5" fill="#2563EB" />
            <line x1="-10" y1="42" x2="10" y2="42" stroke="#C1FF72" strokeWidth="2" opacity="0.8" />
            
            {/* Moving Piston Plunger */}
            <g className="anim-piston-plunge">
              <rect x="-4.5" y="48" width="9" height="100" rx="2" fill="url(#steelRodGrad)" stroke="#00266A" strokeWidth="1" />
              {/* Toolhead */}
              <rect x="-16" y="146" width="32" height="12" rx="3" fill="#00266A" stroke="#D5BD66" strokeWidth="1.2" />
              <rect x="-8" y="156" width="16" height="4" rx="1" fill="#C1FF72" />
            </g>

            {/* Product Item Lowered into Box */}
            <g className="anim-dispensed-drop" transform="translate(0, 164)">
              <rect x="-7.5" y="-12" width="15" height="24" rx="3.5" fill="url(#productGoldCanister)" stroke="#00266A" strokeWidth="1.2" />
              <rect x="-5.5" y="-4" width="11" height="7" rx="1" fill="#C1FF72" />
              <line x1="-4" y1="-0.5" x2="4" y2="-0.5" stroke="#00266A" strokeWidth="0.8" />
            </g>
          </g>

          {/* ============================================================ */}
          {/* MAIN CONVEYOR BED (BASE AT Y = 360)                          */}
          {/* ============================================================ */}
          <g transform="translate(0, 360)">
            {/* Conveyor Bed Structure */}
            <rect x="10" y="0" width="220" height="20" rx="5" fill="#F1F5F9" stroke="#00266A" strokeWidth="2.5" />
            {/* Animated Rolling Belt */}
            <line x1="16" y1="10" x2="224" y2="10" stroke="#00266A" strokeWidth="3" className="anim-belt-drive" />
            
            {/* Conveyor Stand Legs */}
            <path d="M35 20v150M90 20v150M175 20v150" stroke="#00266A" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="80" x2="200" y2="80" stroke="#2563EB" strokeWidth="2" opacity="0.3" />
            
            {/* Optical Sensor Eye */}
            <circle cx="68" cy="6" r="3" fill="#00266A" />
            <circle cx="68" cy="6" r="1.5" fill="#C1FF72" />
            
            {/* Pulleys */}
            <circle cx="22" cy="28" r="6.5" fill="#00266A" />
            <circle cx="22" cy="28" r="2" fill="#D5BD66" />
            <circle cx="218" cy="28" r="6.5" fill="#00266A" />
            <circle cx="218" cy="28" r="2" fill="#D5BD66" />

            {/* ============================================================ */}
            {/* HIGH-FIDELITY 3D CARDBOARD BOX                               */}
            {/* ============================================================ */}
            <g className="anim-box-journey" transform="translate(0, 0)">
              {/* Dynamic Soft Drop Shadow */}
              <ellipse cx="0" cy="0" rx="27" ry="4.5" fill="#00266A" opacity="0.28" />

              {/* ---------------------------------------------------------- */}
              {/* STATE 1: OPEN 3D BOX WITH INNER DEPTH & FLAPS (0-50%)      */}
              {/* ---------------------------------------------------------- */}
              <g className="anim-box-open-state">
                {/* Deep Interior Cavity */}
                <polygon points="-24,-26 0,-36 24,-26 0,-16" fill="url(#cavityDepthGrad)" />
                
                {/* Back Flap (angled up & back) */}
                <polygon points="-18,-31 -14,-45 14,-45 18,-31" fill="#C48842" stroke="#8C561C" strokeWidth="0.8" />
                <line x1="-12" y1="-43" x2="12" y2="-43" stroke="#F5D09E" strokeWidth="0.6" opacity="0.8" />

                {/* Left Open Flap (angled up-left) */}
                <polygon points="-24,-26 -35,-37 -13,-43 0,-31" fill="#DEAC6E" stroke="#8C561C" strokeWidth="0.8" />
                <polygon points="-24,-26 -33,-35 -14,-41 0,-31" fill="#C78842" opacity="0.4" />

                {/* Right Open Flap (angled up-right) */}
                <polygon points="24,-26 35,-37 13,-43 0,-31" fill="#B37731" stroke="#8C561C" strokeWidth="0.8" />

                {/* Product Settling Inside Box */}
                <g className="anim-inside-item-reveal" transform="translate(0, -21)">
                  <rect x="-7.5" y="-12" width="15" height="22" rx="3.5" fill="url(#productGoldCanister)" stroke="#00266A" strokeWidth="1.2" />
                  <rect x="-5.5" y="-4" width="11" height="6" rx="1" fill="#C1FF72" />
                </g>

                {/* Front Open Flap (folded down over front rim) */}
                <polygon points="-24,-26 -18,-13 18,-13 24,-26" fill="url(#cartonTopGrad)" stroke="#8C561C" strokeWidth="0.8" />
                <line x1="-16" y1="-15" x2="16" y2="-15" stroke="#FFF4BD" strokeWidth="0.6" opacity="0.6" />
              </g>

              {/* ---------------------------------------------------------- */}
              {/* STATE 2: SEALED 3D TOP LID (50-100%)                       */}
              {/* ---------------------------------------------------------- */}
              <g className="anim-box-closed-state">
                {/* Closed Top Lid Surface */}
                <polygon points="-24,-26 0,-36 24,-26 0,-16" fill="url(#cartonTopGrad)" stroke="#8C561C" strokeWidth="1" />
                {/* Subtle Inner Bevel / Highlight Line */}
                <line x1="-22" y1="-26" x2="0" y2="-35" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
                
                {/* Center Seam */}
                <line x1="0" y1="-36" x2="0" y2="-16" stroke="#8C561C" strokeWidth="1.4" />
                
                {/* Gold Tamper-Evident Tape Strip */}
                <polygon points="-2.5,-36 2.5,-36 2.5,-16 -2.5,-16" fill="url(#tapeGoldGrad)" stroke="#8C561C" strokeWidth="0.5" />
                <line x1="0" y1="-36" x2="0" y2="-16" stroke="#FFFDE6" strokeWidth="1" />
              </g>

              {/* ---------------------------------------------------------- */}
              {/* 3D BOX BODY (FRONT & SIDE FACETS)                          */}
              {/* ---------------------------------------------------------- */}
              {/* Left Front Facet (Lit Face) */}
              <polygon points="-24,-26 0,-16 0,0 -24,-10" fill="url(#cartonMainGrad)" stroke="#8C561C" strokeWidth="1" />
              <line x1="-23" y1="-25" x2="-1" y2="-16" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.5" />
              
              {/* Right Front Facet (Shaded Face) */}
              <polygon points="0,-16 24,-26 24,-10 0,0" fill="url(#cartonSideGrad)" stroke="#8C561C" strokeWidth="1" />
              
              {/* Center Vertical Corner Ridge */}
              <line x1="0" y1="-16" x2="0" y2="0" stroke="#8C561C" strokeWidth="1.2" />

              {/* Shipping Logistics Label on Left Facet */}
              <g transform="translate(-13, -13) skewY(22) scale(0.9)">
                <rect x="-6" y="-6" width="12" height="12" rx="1.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
                {/* Barcode Lines */}
                <line x1="-4.5" y1="-3.5" x2="4.5" y2="-3.5" stroke="#00266A" strokeWidth="1" />
                <line x1="-4.5" y1="-1" x2="2.5" y2="-1" stroke="#00266A" strokeWidth="0.8" />
                <line x1="-4.5" y1="1.5" x2="0" y2="1.5" stroke="#00266A" strokeWidth="0.8" />
                <line x1="-4.5" y1="4" x2="3.5" y2="4" stroke="#00266A" strokeWidth="0.6" />
                {/* Up arrows */}
                <path d="M2.5 1.5l1.5 -2l1.5 2M4 -0.5v3" stroke="#2563EB" strokeWidth="0.7" fill="none" />
              </g>

              {/* SP Brand Seal Stamp on Right Facet */}
              <g transform="translate(12, -18) skewY(-22) scale(0.85)">
                <rect x="-5" y="-3" width="10" height="6" rx="1" fill="#00266A" opacity="0.85" />
                <text x="-3.5" y="1.5" fill="#C1FF72" fontSize="4.5" fontFamily="sans-serif" fontWeight="900">SP</text>
              </g>
            </g>
          </g>
        </svg>
        <div className="rig-fade-l" />
      </div>
    );
  }

  // =========================================================================
  // RIGHT RIG: WRAPPING, GREEN TICK QA INSPECTION & DISPATCH OUTSIDE
  // =========================================================================
  return (
    <div className="hero-rig right-0" aria-hidden="true">
      <svg viewBox="0 0 240 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cartonMainGradR" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5D09E" />
            <stop offset="40%" stopColor="#E3AB69" />
            <stop offset="100%" stopColor="#C48842" />
          </linearGradient>
          <linearGradient id="cartonSideGradR" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D49954" />
            <stop offset="60%" stopColor="#B37731" />
            <stop offset="100%" stopColor="#8C561C" />
          </linearGradient>
          <linearGradient id="cartonTopGradR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7D8AC" />
            <stop offset="100%" stopColor="#DEAC6E" />
          </linearGradient>
          <linearGradient id="tapeGoldGradR" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="50%" stopColor="#D5BD66" />
            <stop offset="100%" stopColor="#A88B27" />
          </linearGradient>
          <linearGradient id="filmGlossWrap" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#BAE6FD" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="greenTickGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="scanBeamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Precision Vertical Machine Guide Rails */}
        <line x1="20" y1="40" x2="20" y2="560" stroke="#00266A" strokeWidth="2" opacity="0.2" strokeDasharray="6 4" />
        <line x1="210" y1="40" x2="210" y2="560" stroke="#00266A" strokeWidth="2" opacity="0.2" strokeDasharray="6 4" />

        {/* Top Status Header */}
        <g transform="translate(18, 85)">
          <rect x="0" y="0" width="144" height="32" rx="6" fill="#00266A" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="5" y="5" width="134" height="22" rx="4" fill="#03112E" />
          <text x="12" y="17" fill="#10B981" fontSize="7.5" fontFamily="monospace" fontWeight="bold">QA WRAP & SEAL</text>
          <text x="12" y="24" fill="#C1FF72" fontSize="6" fontFamily="monospace">INSPECT: PASS ✔</text>
          <circle cx="126" cy="16" r="3.5" fill="#10B981" className="pulse-dot" />
        </g>

        {/* ============================================================ */}
        {/* OVERHEAD QA SCANNER & WRAPPER (CENTERED AT X = 90)           */}
        {/* ============================================================ */}
        <g transform="translate(90, 130)">
          {/* Main Housing */}
          <rect x="-20" y="0" width="40" height="52" rx="5" fill="#00266A" stroke="#2563EB" strokeWidth="1.5" />
          <circle cx="0" cy="18" r="6" fill="#10B981" />
          <rect x="-12" y="32" width="24" height="5" rx="2" fill="#D5BD66" />
          
          {/* Moving Inspection / Wrapping Head Plunger */}
          <g className="anim-qa-stamper">
            <rect x="-5" y="48" width="10" height="96" rx="2" fill="#CBD5E1" stroke="#00266A" strokeWidth="1" />
            {/* Toolhead */}
            <rect x="-18" y="142" width="36" height="14" rx="3" fill="#00266A" stroke="#10B981" strokeWidth="1.2" />
            <circle cx="-9" cy="149" r="2.5" fill="#10B981" />
            <circle cx="9" cy="149" r="2.5" fill="#10B981" />
            <rect x="-8" y="152" width="16" height="3" rx="1.5" fill="#FFFFFF" />

            {/* Glowing Laser Scan Beam Cone */}
            <polygon points="-16,156 16,156 26,200 -26,200" fill="url(#scanBeamGrad)" className="anim-scan-cone" />
          </g>
        </g>

        {/* ============================================================ */}
        {/* MAIN CONVEYOR BED (BASE AT Y = 360)                          */}
        {/* ============================================================ */}
        <g transform="translate(0, 360)">
          {/* Conveyor Bed Structure */}
          <rect x="10" y="0" width="220" height="20" rx="5" fill="#F1F5F9" stroke="#00266A" strokeWidth="2.5" />
          {/* Animated Rolling Belt */}
          <line x1="16" y1="10" x2="224" y2="10" stroke="#00266A" strokeWidth="3" className="anim-belt-drive" />
          
          {/* Stand Legs */}
          <path d="M35 20v150M90 20v150M175 20v150" stroke="#00266A" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="80" x2="200" y2="80" stroke="#2563EB" strokeWidth="2" opacity="0.3" />
          
          {/* Optical Sensor Eye */}
          <circle cx="68" cy="6" r="3" fill="#00266A" />
          <circle cx="68" cy="6" r="1.5" fill="#10B981" />

          {/* Drive Pulleys */}
          <circle cx="22" cy="28" r="6.5" fill="#00266A" />
          <circle cx="22" cy="28" r="2" fill="#D5BD66" />
          <circle cx="218" cy="28" r="6.5" fill="#00266A" />
          <circle cx="218" cy="28" r="2" fill="#D5BD66" />

          {/* ============================================================ */}
          {/* 3D CARDBOARD BOX: ARRIVES -> WRAPPED -> GETS GREEN TICK -> OUT */}
          {/* ============================================================ */}
          <g className="anim-right-box-journey" transform="translate(0, 0)">
            {/* Dynamic Soft Drop Shadow */}
            <ellipse cx="0" cy="0" rx="27" ry="4.5" fill="#00266A" opacity="0.28" />

            {/* 1. Closed Top Lid Surface */}
            <polygon points="-24,-26 0,-36 24,-26 0,-16" fill="url(#cartonTopGradR)" stroke="#8C561C" strokeWidth="1" />
            <line x1="-22" y1="-26" x2="0" y2="-35" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="-36" x2="0" y2="-16" stroke="#8C561C" strokeWidth="1.4" />
            
            {/* Gold Sealing Tape */}
            <polygon points="-2.5,-36 2.5,-36 2.5,-16 -2.5,-16" fill="url(#tapeGoldGradR)" stroke="#8C561C" strokeWidth="0.5" />
            <line x1="0" y1="-36" x2="0" y2="-16" stroke="#FFFDE6" strokeWidth="1" />

            {/* 2. Front & Side Facets */}
            <polygon points="-24,-26 0,-16 0,0 -24,-10" fill="url(#cartonMainGradR)" stroke="#8C561C" strokeWidth="1" />
            <polygon points="0,-16 24,-26 24,-10 0,0" fill="url(#cartonSideGradR)" stroke="#8C561C" strokeWidth="1" />
            <line x1="0" y1="-16" x2="0" y2="0" stroke="#8C561C" strokeWidth="1.2" />

            {/* Shipping Barcode Label on Left Facet */}
            <g transform="translate(-13, -13) skewY(22) scale(0.9)">
              <rect x="-6" y="-6" width="12" height="12" rx="1.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
              <line x1="-4.5" y1="-3.5" x2="4.5" y2="-3.5" stroke="#00266A" strokeWidth="1" />
              <line x1="-4.5" y1="-1" x2="2.5" y2="-1" stroke="#00266A" strokeWidth="0.8" />
              <line x1="-4.5" y1="1.5" x2="0" y2="1.5" stroke="#00266A" strokeWidth="0.8" />
              <line x1="-4.5" y1="4" x2="3.5" y2="4" stroke="#00266A" strokeWidth="0.6" />
            </g>

            {/* SP Brand Seal Stamp on Right Facet */}
            <g transform="translate(12, -18) skewY(-22) scale(0.85)">
              <rect x="-5" y="-3" width="10" height="6" rx="1" fill="#00266A" opacity="0.85" />
              <text x="-3.5" y="1.5" fill="#C1FF72" fontSize="4.5" fontFamily="sans-serif" fontWeight="900">SP</text>
            </g>

            {/* ---------------------------------------------------------- */}
            {/* 3. PROTECTIVE FILM WRAP & STRAPPING COVER (Applied at 30%) */}
            {/* ---------------------------------------------------------- */}
            <g className="anim-wrap-layer">
              {/* Glossy Heat-Shrink Film Over Top Lid */}
              <polygon points="-25,-27 0,-37.5 25,-27 0,-15" fill="url(#filmGlossWrap)" stroke="#C1FF72" strokeWidth="0.8" opacity="0.9" />
              
              {/* Glossy Film Over Left & Right Facets */}
              <polygon points="-25,-27 0,-15 0,1 -25,-9" fill="url(#filmGlossWrap)" stroke="#C1FF72" strokeWidth="0.8" opacity="0.75" />
              <polygon points="0,-15 25,-27 25,-9 0,1" fill="url(#filmGlossWrap)" stroke="#C1FF72" strokeWidth="0.8" opacity="0.7" />

              {/* Protective Poly Strapping Bands with Buckles */}
              <line x1="-12" y1="-31" x2="-12" y2="-5" stroke="#2563EB" strokeWidth="2" opacity="0.95" />
              <rect x="-13.5" y="-19" width="3" height="3" rx="0.5" fill="#D5BD66" />
              
              <line x1="12" y1="-31" x2="12" y2="-5" stroke="#2563EB" strokeWidth="2" opacity="0.95" />
              <rect x="10.5" y="-19" width="3" height="3" rx="0.5" fill="#D5BD66" />
              
              <line x1="-24" y1="-18" x2="24" y2="-18" stroke="#D5BD66" strokeWidth="1.4" opacity="0.9" />
              
              {/* Top Film Highlight Sheen Line */}
              <line x1="-18" y1="-30" x2="18" y2="-22" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.95" />
            </g>

            {/* ---------------------------------------------------------- */}
            {/* 4. GREEN TICK QA PASS STAMP (✔) (Pops on box face at 45%)  */}
            {/* ---------------------------------------------------------- */}
            <g className="anim-green-tick" transform="translate(0, -14)">
              {/* Green Stamp Glow & Circle Badge */}
              <circle cx="0" cy="0" r="10" fill="#10B981" opacity="0.25" className="pulse-dot" />
              <circle cx="0" cy="0" r="8.5" fill="url(#greenTickGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="7" fill="none" stroke="#C1FF72" strokeWidth="0.8" strokeDasharray="2 1.5" />
              {/* Crisp White Checkmark ✔ */}
              <path d="M-3.8 -0.5 L-1.2 2.5 L3.8 -3" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>
        </g>
      </svg>
      <div className="rig-fade-r" />
    </div>
  );
}
