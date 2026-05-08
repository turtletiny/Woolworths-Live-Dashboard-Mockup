import { useState } from 'react';
import { Search, Bell, User, X } from 'lucide-react';
import { mockQueueData } from './PriorityPickingQueue';

function parseTimeToToday(timeStr: string): Date {
  const [time, meridiem] = timeStr.split(' ');
  const [hourStr, minStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);
  if (meridiem === 'PM' && hour !== 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
}

export function Header() {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const now = new Date();
  now.setHours(11, 24, 0, 0); // Dashboard time is 11:24 AM

  const overdue = mockQueueData.filter((it) => it.status === 'Overdue');
  const dueSoon = mockQueueData.filter((it) => {
    if (it.status === 'Overdue') return false;
    const dueTime = parseTimeToToday(it.timeDue);
    const diffMs = dueTime.getTime() - now.getTime();
    const diffMins = diffMs / (1000 * 60);
    return diffMins > 0 && diffMins <= 30;
  });

  const notificationCount = overdue.length + dueSoon.length;

  return (
    <header className="bg-white border-b border-border px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Live Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Friday, May 8, 2026 • 11:24 AM
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders, staff, zones..."
              className="pl-10 pr-4 py-2 w-80 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-[var(--woolworths-green)] focus:border-transparent"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Bell className="w-5 h-5 text-foreground" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--destructive)] rounded-full" />
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <button onClick={() => setNotificationOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {overdue.length > 0 && (
                    <div className="p-4 border-b border-border">
                      <div className="text-xs font-semibold text-red-600 mb-2">OVERDUE</div>
                      <div className="space-y-2">
                        {overdue.map((it) => (
                          <div key={it.orderId} className="flex items-start gap-2 p-2 rounded bg-red-50">
                            <svg className="h-4 w-4 text-red-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-4.5a.75.75 0 10-1.5 0v.25c0 .414.336.75.75.75s.75-.336.75-.75v-.25zM9.25 6.5a1 1 0 012 0v4a1 1 0 11-2 0v-4z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{it.orderName ?? it.orderId}</p>
                              <p className="text-xs text-muted-foreground">Due {it.timeDue}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dueSoon.length > 0 && (
                    <div className="p-4">
                      <div className="text-xs font-semibold text-amber-700 mb-2">DUE IN 30 MIN</div>
                      <div className="space-y-2">
                        {dueSoon.map((it) => (
                          <div key={it.orderId} className="flex items-start gap-2 p-2 rounded bg-amber-50">
                            <svg className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.485 2.495c.673-1.346 2.357-1.346 3.03 0l6.28 12.56c.673 1.346-.192 3.005-1.515 3.005H3.72c-1.323 0-2.188-1.659-1.515-3.005L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V5.75A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{it.orderName ?? it.orderId}</p>
                              <p className="text-xs text-muted-foreground">Due {it.timeDue}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {overdue.length === 0 && dueSoon.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground text-sm">
                      No urgent orders
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="w-10 h-10 bg-[var(--woolworths-bg-green)] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--woolworths-green)]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
