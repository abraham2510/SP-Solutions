export default function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap flex items-center justify-between h-[38px]">
        <div className="flex gap-[22px]">
          <span className="topbar-hide-sm inline-flex items-center gap-[6px] whitespace-nowrap">
            30, Thiruvalluvar St, T.M.P Nagar, Padi, Chennai&nbsp;600050
          </span>
          <span className="inline-flex items-center gap-[6px] whitespace-nowrap">Mon–Fri 9AM–7PM</span>
        </div>
        <div className="flex gap-[22px]">
          <a href="tel:+916374580330" className="inline-flex items-center gap-[6px] whitespace-nowrap">+91 63745 80330</a>
          <a href="mailto:alexnavinkumar@spsolutionsc.com" className="topbar-hide-sm inline-flex items-center gap-[6px] whitespace-nowrap">
            alexnavinkumar@spsolutionsc.com
          </a>
        </div>
      </div>
    </div>
  );
}
