import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  subtitle: string;
  icon?: LucideIcon;
  iconColor?: string; // tailwind class
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-muted-foreground",
}: Props) {
  return (
    <div className="bg-background rounded-xl border border-lightGray/50 p-4">
      <div className="flex items-center justify-between text-content">
        <p className="text-sm">{title}</p>

        {Icon && (
          <Icon
            className={`w-4 h-4 ${iconColor}`}
          />
        )}
      </div>

      <p className="text-2xl font-semibold mt-2">{value}</p>
      <p className="text-xs text-content mt-1">{subtitle}</p>
    </div>
  );
}
