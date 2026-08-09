import Image from "next/image";

const STEPS = [
  { num: "01", title: "Enquiry & consultation", desc: "Tell us the product, the pack size, and the line speed you need — we recommend machinery, not a catalogue." },
  { num: "02", title: "Quote & machine selection", desc: "A written quote with the right shrink, wrap, or detection system sized to your volume and budget." },
  { num: "03", title: "Installation & commissioning", desc: "We install on-site, run test batches, and train your operators before we leave." },
  { num: "04", title: "AMC & spares support", desc: "Scheduled maintenance and same-week spares keep unplanned downtime off your production schedule." },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow-dark">How we work</span>
          <h2>From enquiry to a running line</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-14 items-start">
          {/* Sticky image */}
          <div className="process-media reveal relative">
            <Image
              src="https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=900&q=80"
              alt="Engineer commissioning industrial machinery"
              width={900}
              height={1200}
              className="w-full h-full object-cover"
            />
            <span className="tag mono">ON-SITE COMMISSIONING</span>
          </div>

          {/* Steps */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 sm:grid-cols-[56px_1fr] gap-x-[22px] gap-y-[10px] py-7 border-t border-line items-start reveal ${
                  i === STEPS.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="process-num flex items-center justify-center">{step.num}</span>
                <div className="process-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
