import type { CatalogueService } from "@/lib/catalogue/types";
import ServiceCard from "./ServiceCard";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
