import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_CONTACTS } from "@/lib/constants";
import { getServices, getServiceBySlug } from "@/lib/data/public";

export const revalidate = 3600;

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

// ── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ serviceSlug: s.slug }));
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);
  if (!service) return {};

  const title = `${service.name} | SP Solutions`;
  const description =
    service.short_description ||
    `${service.name} — professional packaging machine service from SP Solutions, Chennai.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(service.image ? { images: [{ url: service.image }] } : {}),
    },
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#00266A] overflow-hidden py-14 sm:py-20">
        {service.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={service.image}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001D52]/60 to-transparent" />

        <div className="wrap relative z-10">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/80">{service.name}</span>
          </nav>

          <span className="inline-block text-[11px] tracking-[0.08em] uppercase font-semibold text-[#D5BD66] bg-[#D5BD66]/15 border border-[#D5BD66]/30 px-3 py-1 rounded-full mb-4">
            REPAIR &amp; MAINTENANCE
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            {service.name}
          </h1>
          {service.short_description && (
            <p className="text-white/65 mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
              {service.short_description}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <div className="wrap py-12 sm:py-16 max-w-3xl mx-auto">
        {service.description ? (
          <div className="prose prose-slate max-w-none">
            <p className="text-[15.5px] leading-[1.75] text-[#5B6572]">{service.description}</p>
          </div>
        ) : (
          <div className="py-12 rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] text-center">
            <p className="text-[#8892A0] text-[14px] mb-1">
              Full service details coming soon.
            </p>
            <p className="text-[#5B6572] text-[13px]">
              Contact us for information about this service.
            </p>
          </div>
        )}

        {service.images && service.images.length > 1 && (
          <div className="mt-10 border-t border-slate-100 pt-8">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase mb-4">
              Service Photos &amp; On-Site Gallery
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {service.images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${service.name} - Photo ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#00266A] text-white text-center">
          <h2 className="text-[20px] font-bold mb-2">Book this service</h2>
          <p className="text-white/65 text-[14px] mb-6 max-w-sm mx-auto">
            Contact our technical team for availability, pricing, and on-site visits.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={SITE_CONTACTS.whatsapp.getUrl(`Hi, I'd like to enquire about ${service.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              id={`whatsapp-service-${service.id}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M11.999 2.004C6.477 2.004 2 6.481 2 12.003a9.945 9.945 0 001.38 5.098L2 22l5.032-1.363A9.944 9.944 0 0012 22c5.521 0 10-4.477 10-9.997 0-5.523-4.477-9.999-10.001-9.999zm.001 18.315a8.273 8.273 0 01-4.214-1.152l-.302-.179-3.126.847.85-3.044-.197-.313A8.285 8.285 0 013.716 12c0-4.586 3.698-8.312 8.284-8.312 4.585 0 8.283 3.726 8.283 8.312 0 4.587-3.698 8.319-8.283 8.319z" />
              </svg>
              WhatsApp Enquiry
            </a>
            <Link href="/#contact" className="btn btn-ghost-white">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
