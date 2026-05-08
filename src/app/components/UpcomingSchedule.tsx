import { mockQueueData } from './PriorityPickingQueue';

function parseTimeToToday(timeStr: string): Date {
  // timeStr examples: '11:30 AM', '06:00 PM'
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

export function UpcomingSchedule() {
  const items = mockQueueData
    .map((it) => ({ ...it, dueDate: parseTimeToToday(it.timeDue) }))
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const overdue = items.filter((it) => it.status === 'Overdue');
  const upcoming = items.filter((it) => it.status !== 'Overdue').slice(0, 8);

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm p-4">
      <h4 className="font-semibold text-foreground mb-2">Upcoming Schedule</h4>
      <div className="space-y-3">
        {overdue.length > 0 && (
          <div>
            <div className="text-xs font-medium text-red-600 mb-1">Overdue</div>
            <div className="space-y-1">
              {overdue.slice(0, 3).map((it) => (
                <div key={it.orderId} className="flex items-center justify-between bg-red-50 rounded px-2 py-1">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-4.5a.75.75 0 10-1.5 0v.25c0 .414.336.75.75.75s.75-.336.75-.75v-.25zM9.25 6.5a1 1 0 012 0v4a1 1 0 11-2 0v-4z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm font-medium">{it.orderName ?? it.orderId}</div>
                    <div className="ml-2 whitespace-nowrap text-xs text-muted-foreground">{it.timeDue}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{it.priorityScore}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="text-xs font-medium text-muted-foreground mb-1">Next</div>
          <div className="space-y-1">
            {upcoming.map((it) => (
              <div key={it.orderId} className="flex items-center justify-between rounded px-2 py-1 hover:bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-16 shrink-0 whitespace-nowrap text-sm font-mono text-[var(--data-blue)]">{it.timeDue}</div>
                  <div className="text-sm font-medium">{it.orderName ?? it.orderId}</div>
                </div>
                <div className="text-sm text-muted-foreground">{it.priorityScore}</div>
              </div>
            ))}
            {upcoming.length === 0 && <div className="text-sm text-muted-foreground">No upcoming orders</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
