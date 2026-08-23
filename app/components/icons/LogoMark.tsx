import Image from "next/image";

export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="SP Solutions Logo"
      width={200}
      height={78}
      className={`h-12 w-auto object-contain ${className}`}
      priority
    />
  );
}
