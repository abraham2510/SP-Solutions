import type { CatalogueService } from "@/lib/catalogue/types";
import ServiceCard from "@/app/components/ServiceCard";

interface Props {
  services: CatalogueService[];
}

export default function ServiceGrid({ services }: Props) {
  if (services.length === 0) {
    return (
      <p className="text-[#5B6572] text-center py-12">No services available at this time.</p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
      {services.map((service) => (
        <div
          key={service.id}
          className="w-full md:w-[calc(50%-12px)] lg:w-[calc((100%-4rem)/3)] flex shrink-0"
        >
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  );
}
