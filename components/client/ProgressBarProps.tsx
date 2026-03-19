
// components/ui/ProgressBar.tsx
interface ProgressBarProps {
     progress: number;
     showLabel?: boolean;
     className?: string;
     barClassName?: string;
}

export default function ProgressBar({
     progress,
     showLabel = true,
     className = "h-2 bg-border-default",
     barClassName = "bg-accent"
}: ProgressBarProps) {
     return (
          <div className={`w-full ${className} rounded-full overflow-hidden`}>
               <div
                    className={`${barClassName} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
               />
          </div>
     );
}