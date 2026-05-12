import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface QueueItem {
  priorityScore: number;
  orderId: string;
  orderName?: string;
  timeDue: string;
  items: number; // total items
  picked: number; // items picked so far
  status: string;
  assignedTo: string;
}

interface GroceryItem {
  name: string;
  stockCount: string;
  aisle: string;
  picked: boolean;
}

export const mockQueueData: QueueItem[] = [
  {
    priorityScore: 95,
    orderId: 'WW-20260508-1847',
    orderName: 'Sarah Smith',
    timeDue: '11:30 AM',
    items: 24,
    picked: 22,
    status: 'Picking Ambient',
    assignedTo: 'Sarah M.'
  },
  {
    priorityScore: 78,
    orderId: 'WW-20260508-1868',
    orderName: 'Lisa Brown',
    timeDue: '12:00 PM',
    items: 27,
    picked: 20,
    status: 'Picking Ambient',
    assignedTo: 'Lisa P.'
  },
  {
    priorityScore: 70,
    orderId: 'WW-20260508-1873',
    orderName: 'David Wilson',
    timeDue: '12:30 PM',
    items: 22,
    picked: 6,
    status: 'Staging Frozen',
    assignedTo: 'David H.'
  },
  {
    priorityScore: 5,
    orderId: 'WW-20260508-2030',
    orderName: 'Carlos Lopez',
    timeDue: '05:30 PM',
    items: 5,
    picked: 0,
    status: 'Scheduled',
    assignedTo: '-'
  }
  ,
  {
    priorityScore: 80,
    orderId: 'WW-20260508-2100',
    orderName: 'Olivia Taylor',
    timeDue: '06:00 PM',
    items: 320,
    picked: 20,
    status: 'Scheduled',
    assignedTo: '-'
  }
  ,
  {
    priorityScore: 99,
    orderId: 'WW-20260508-1000',
    orderName: 'Jack Morgan',
    timeDue: '10:00 AM',
    items: 10,
    picked: 2,
    status: 'Overdue',
    assignedTo: '-'
  }
];

function getStatusColor(status: string): string {
  if (status.includes('Pre-picking')) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (status.includes('Picking')) return 'bg-green-100 text-green-800 border-green-200';
  if (status.includes('Staging')) return 'bg-purple-100 text-purple-800 border-purple-200';
  return 'bg-gray-100 text-gray-800 border-gray-200';
}

function getPriorityColor(score: number): string {
  if (score >= 90) return 'text-red-600 font-semibold';
  if (score >= 80) return 'text-orange-600 font-semibold';
  if (score >= 70) return 'text-yellow-600 font-semibold';
  return 'text-gray-600';
}

function getOrderGroceries(orderId: string): GroceryItem[] {
  const groceryMap: Record<string, GroceryItem[]> = {
    'WW-20260508-1000': [
      { name: 'Bananas', stockCount: 'Stock: 16', aisle: 'Aisle 2', picked: true },
      { name: 'White Bread', stockCount: 'Stock: 8', aisle: 'Aisle 1', picked: true },
      { name: 'Milk', stockCount: 'Stock: 24', aisle: 'Aisle 5', picked: false },
      { name: 'Dishwashing Liquid', stockCount: 'Stock: 11', aisle: 'Aisle 9', picked: false },
      { name: 'Orange Juice', stockCount: 'Stock: 12', aisle: 'Aisle 5', picked: false },
      { name: 'Eggs', stockCount: 'Stock: 20', aisle: 'Aisle 6', picked: false },
      { name: 'Cheddar Cheese', stockCount: 'Stock: 9', aisle: 'Aisle 6', picked: false },
      { name: 'Ground Beef', stockCount: 'Stock: 14', aisle: 'Aisle 6', picked: false },
      { name: 'Pasta', stockCount: 'Stock: 22', aisle: 'Aisle 8', picked: false },
      { name: 'Olive Oil', stockCount: 'Stock: 7', aisle: 'Aisle 8', picked: false },
    ],
    'WW-20260508-1847': [
      { name: 'Apples', stockCount: 'Stock: 28', aisle: 'Aisle 3', picked: true },
      { name: 'Chicken Breast', stockCount: 'Stock: 14', aisle: 'Aisle 6', picked: true },
      { name: 'Greek Yogurt', stockCount: 'Stock: 22', aisle: 'Aisle 5', picked: true },
      { name: 'Spaghetti', stockCount: 'Stock: 19', aisle: 'Aisle 8', picked: false },
      { name: 'Tomato Sauce', stockCount: 'Stock: 31', aisle: 'Aisle 8', picked: false },
    ],
    'WW-20260508-2100': [
      { name: 'Cereal', stockCount: 'Stock: 41', aisle: 'Aisle 7', picked: true },
      { name: 'Rice', stockCount: 'Stock: 58', aisle: 'Aisle 8', picked: true },
      { name: 'Toilet Paper', stockCount: 'Stock: 36', aisle: 'Aisle 10', picked: false },
      { name: 'Laundry Powder', stockCount: 'Stock: 17', aisle: 'Aisle 9', picked: false },
      { name: 'Frozen Vegetables', stockCount: 'Stock: 44', aisle: 'Freezer 2', picked: false },
      { name: 'Soft Drinks', stockCount: 'Stock: 63', aisle: 'Aisle 11', picked: false },
    ],
  };

  return groceryMap[orderId] ?? [
    { name: 'Mixed Grocery Items', stockCount: 'Stock: 20', aisle: 'Aisle 4', picked: true },
    { name: 'Fresh Produce', stockCount: 'Stock: 18', aisle: 'Aisle 3', picked: false },
    { name: 'Pantry Staples', stockCount: 'Stock: 26', aisle: 'Aisle 7', picked: false },
  ];
}

export function PriorityPickingQueue() {
  const [selectedOrder, setSelectedOrder] = useState<QueueItem | null>(null);
  const sortedData = [...mockQueueData].sort((a, b) => b.priorityScore - a.priorityScore);

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Priority Picking Queue</h3>
        <p className="text-sm text-muted-foreground mt-1">Dynamic DSS sorting by multiple factors</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--woolworths-bg-green)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--woolworths-green)] uppercase tracking-wider">
                Priority Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--woolworths-green)] uppercase tracking-wider">
                Order Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--woolworths-green)] uppercase tracking-wider">
                Time Due
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--woolworths-green)] uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--woolworths-green)] uppercase tracking-wider">
                Progress
              </th>
              {/* Removed Assigned To column per request */}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData.map((item, index) => (
              <tr
                key={item.orderId}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedOrder(item)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedOrder(item);
                  }
                }}
                className={`cursor-pointer hover:bg-secondary/50 transition-colors ${item.status === 'Overdue' ? 'bg-red-50 ring-1 ring-red-200' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-lg ${getPriorityColor(item.priorityScore)}`}>
                    {item.priorityScore}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <span className="font-medium">{item.orderName ?? item.orderId}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {item.timeDue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {item.items}
                </td>
                <td className="px-6 py-4">
                  {(() => {
                    const pct = Math.min(100, Math.round((item.picked / Math.max(1, item.items)) * 100));
                    const barColor = pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-400' : 'bg-red-500';
                    return (
                      <div className="w-full">
                        <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className={`${barColor} h-2.5`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                          <div className="flex items-center">
                            <span>{item.picked}/{item.items}</span>
                            {item.status === 'Overdue' && (
                              <svg className="ml-2 h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-4.5a.75.75 0 10-1.5 0v.25c0 .414.336.75.75.75s.75-.336.75-.75v-.25zM9.25 6.5a1 1 0 012 0v4a1 1 0 11-2 0v-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span>{pct}%</span>
                        </div>
                      </div>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={selectedOrder !== null} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedOrder.orderName ?? selectedOrder.orderId}</DialogTitle>
                <DialogDescription>
                  Due {selectedOrder.timeDue} · {selectedOrder.priorityScore} priority · {selectedOrder.picked}/{selectedOrder.items} picked
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium text-foreground">Status</span>
                      <span className="text-muted-foreground">{selectedOrder.status}</span>
                    </div>
                    {(() => {
                      const pct = Math.min(100, Math.round((selectedOrder.picked / Math.max(1, selectedOrder.items)) * 100));
                      const barColor = pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-400' : 'bg-red-500';
                      return (
                        <div>
                          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div className={`${barColor} h-3`} style={{ width: `${pct}%` }} />
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{selectedOrder.picked}/{selectedOrder.items} picked</span>
                            <span>{pct}% complete</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-secondary/40 p-3">
                    <div className="text-muted-foreground">Order ID</div>
                    <div className="font-medium">{selectedOrder.orderId}</div>
                  </div>
                  <div className="rounded-lg bg-secondary/40 p-3">
                    <div className="text-muted-foreground">Status</div>
                    <div className="font-medium">{selectedOrder.status}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-sm font-semibold text-foreground">Mock Grocery Items</div>
                  <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
                    {getOrderGroceries(selectedOrder.orderId).map((groceryItem) => (
                      <div key={`${selectedOrder.orderId}-${groceryItem.name}`} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 text-sm">
                        <div>
                          <div className="font-medium text-foreground">{groceryItem.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {groceryItem.stockCount} · {groceryItem.aisle}
                          </div>
                        </div>
                        <div className={`text-xs font-medium self-center ${groceryItem.picked ? 'text-green-700' : 'text-amber-700'}`}>
                          {groceryItem.picked ? 'Picked' : 'Unpicked'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
