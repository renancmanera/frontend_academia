import { Icon } from "lucide-react";

interface InfoCardProps {
  title: string;
  value: number;
  icon: Icon;
}

export default function InfoCard({ title, value, icon: IconComponent }: InfoCardProps) {
  return (
    <div className="flex-1 rounded-xl bg-white border border-neutral-200 px-6 py-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-xs text-neutral-500 font-medium">{title}</span>
        <IconComponent className="w-5 h-5 text-neutral-400" />
      </div>
      <span className="text-2xl font-bold text-black leading-tight">{value}</span>
    </div>
  );
}
