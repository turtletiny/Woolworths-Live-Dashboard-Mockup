import { TrendingUp } from 'lucide-react';

export function HourlyFulfillmentGoals() {
  const currentHour = '11:00 AM - 12:00 PM';
  const completionPercentage = 68;
  const completedOrders = 34;
  const targetOrders = 50;

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Hourly Fulfillment Goals</h3>
            <p className="text-sm text-muted-foreground mt-1">Current hour: {currentHour}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[var(--woolworths-bg-green)] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[var(--woolworths-green)]" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-foreground">{completionPercentage}%</span>
              <span className="text-sm text-muted-foreground">complete</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-lg font-semibold text-foreground">
                {completedOrders} / {targetOrders}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="h-8 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--woolworths-green)] to-[var(--woolworths-light-green)] rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${completionPercentage}%` }}
              >
                <span className="text-xs font-medium text-white">{completionPercentage}%</span>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
              {[0, 25, 50, 75, 100].map((marker) => (
                <div
                  key={marker}
                  className="absolute top-0 h-full flex items-center"
                  style={{ left: `${marker}%` }}
                >
                  {marker > 0 && marker < 100 && (
                    <div className="w-px h-8 bg-white/50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-xs text-green-600 mb-1">On Track</p>
              <p className="text-lg font-semibold text-green-700">25</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-xs text-blue-600 mb-1">In Progress</p>
              <p className="text-lg font-semibold text-blue-700">9</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-xs text-orange-600 mb-1">Pending</p>
              <p className="text-lg font-semibold text-orange-700">16</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
