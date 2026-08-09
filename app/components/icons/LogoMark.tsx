import Image from "next/image";

export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="SP Solutions Logo"
      width={195}
      height={70}
      className={`h-10 w-auto object-contain ${className}`}
      priority
    />
  );
}

