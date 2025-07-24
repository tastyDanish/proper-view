import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProperViewLogo() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="flex gap-4 items-center cursor-pointer">
      <Image
        src="/globe.svg"
        alt="Proper View Logo"
        width={64}
        height={64}
      />
      <h1 className="text-2xl font-bold">Proper View</h1>
    </div>
  );
}
