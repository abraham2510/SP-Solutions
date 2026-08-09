import Image from "next/image";

export default function CtaBand() {
  return (
    <section className="section-tight" id="contact">
      <div className="wrap">
        <div className="cta-band reveal !p-[40px_20px] sm:!p-[74px_52px]">
          <Image
            src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=1800&q=80"
            alt="Interior of an industrial manufacturing facility"
            width={1800}
            height={800}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="inner relative z-20">
            <span className="eyebrow justify-center text-[#D5BD66] mb-3">Get in touch</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white max-w-[560px] mx-auto mb-4 leading-snug">
              Tell us what you&apos;re packing.
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-[480px] mx-auto mb-8 leading-relaxed">
              Send us your product, pack size, and line speed — we&apos;ll get back with the right machine and a straight quote.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-10 max-w-[360px] sm:max-w-none mx-auto">
              <a href="mailto:alexnavinkumar@spsolutionsc.com" className="btn btn-primary w-full sm:w-auto justify-center">
                Request a quote
              </a>
              <a href="tel:+916374580330" className="btn btn-ghost-white w-full sm:w-auto justify-center">
                Call +91 63745 80330
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left border-t border-white/15 pt-7 max-w-[900px] mx-auto">
              <div>
                <span className="cta-contact-label">Visit</span>
                <p className="cta-contact-value leading-snug">
                  30, Thiruvalluvar St, T.M.P Nagar, Padi, Chennai 600050
                </p>
              </div>
              <div>
                <span className="cta-contact-label">Call</span>
                <a href="tel:+916374580330" className="cta-contact-value hover:text-[#D5BD66] transition-colors block">
                  +91 63745 80330
                </a>
              </div>
              <div>
                <span className="cta-contact-label">Email</span>
                <a href="mailto:alexnavinkumar@spsolutionsc.com" className="cta-contact-value hover:text-[#D5BD66] transition-colors block break-all sm:break-normal">
                  alexnavinkumar@spsolutionsc.com
                </a>
              </div>
              <div>
                <span className="cta-contact-label">Hours</span>
                <p className="cta-contact-value">
                  Mon–Fri, 9AM–7PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
