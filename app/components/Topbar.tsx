import { SITE_CONTACTS } from "@/lib/constants";

export default function Topbar() {
  const { address, businessHours, phone, email } = SITE_CONTACTS;

  return (
    <div className="topbar">
      <div className="wrap flex items-center justify-between h-[38px]">
        <div className="flex gap-[22px]">
          <span className="topbar-hide-sm inline-flex items-center gap-[6px] whitespace-nowrap">
            {address.singleLine}
          </span>
          <span className="inline-flex items-center gap-[6px] whitespace-nowrap">
            {businessHours.compact}
          </span>
        </div>
        <div className="flex gap-[22px]">
          <a
            href={phone.primary.tel}
            className="inline-flex items-center gap-[6px] whitespace-nowrap"
          >
            {phone.primary.display}
          </a>
          <a
            href={email.mailto}
            className="topbar-hide-sm inline-flex items-center gap-[6px] whitespace-nowrap"
          >
            {email.primary}
          </a>
        </div>
      </div>
    </div>
  );
}
