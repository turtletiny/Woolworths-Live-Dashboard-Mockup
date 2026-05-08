import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'progress' | 'battery';
  progressValue?: number;
  progressMax?: number;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  progressValue,
  progressMax
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-semibold text-foreground mb-1">{value}</p>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}

          {variant === 'progress' && progressValue !== undefined && progressMax !== undefined && (
            <div className="mt-3">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--woolworths-green)] rounded-full transition-all"
                  style={{ width: `${(progressValue / progressMax) * 100}%` }}
                />
              </div>
            </div>
          )}

          {variant === 'battery' && progressValue !== undefined && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-6 bg-secondary rounded border border-border relative overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    progressValue >= 80 ? 'bg-[var(--status-amber)]' :
                    progressValue >= 50 ? 'bg-[var(--success-green)]' :
                    'bg-[var(--data-blue)]'
                  }`}
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <span className="text-sm font-medium">{progressValue}%</span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 rounded-lg bg-[var(--woolworths-bg-green)] flex items-center justify-center">
            <Icon className="w-6 h-6 text-[var(--woolworths-green)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
