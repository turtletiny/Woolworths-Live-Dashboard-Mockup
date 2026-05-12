import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import Switch from './Switch';

interface Order {
  id: string;
  customerName: string;
  orderTime: string;
  items: number;
  total: string;
  status: 'pending' | 'picking' | 'dispatched';
  dueTime: string;
}

const ordersData: Order[] = [
  {
    id: 'WW-20260508-1847',
    customerName: 'Sarah Smith',
    orderTime: '09:15',
    items: 24,
    total: '$124.50',
    status: 'picking',
    dueTime: '11:30'
  },
  {
    id: 'WW-20260508-1868',
    customerName: 'Lisa Brown',
    orderTime: '10:00',
    items: 27,
    total: '$145.30',
    status: 'picking',
    dueTime: '12:00'
  },
  {
    id: 'WW-20260508-1873',
    customerName: 'David Wilson',
    orderTime: '10:15',
    items: 22,
    total: '$198.75',
    status: 'picking',
    dueTime: '12:30'
  },
  {
    id: 'WW-20260508-2015',
    customerName: 'Emma Davis',
    orderTime: '10:50',
    items: 19,
    total: '$213.45',
    status: 'dispatched',
    dueTime: '12:45'
  }
];

const statusColors = {
  pending: 'bg-blue-50 border-blue-200',
  picking: 'bg-amber-50 border-amber-200',
  dispatched: 'bg-green-50 border-green-200'
};

const statusBadgeColors = {
  pending: 'bg-blue-100 text-blue-800',
  picking: 'bg-amber-100 text-amber-800',
  dispatched: 'bg-green-100 text-green-800'
};

export function OrdersPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [showDispatched, setShowDispatched] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredOrders = ordersData.filter((order) => {
    if (!showDispatched && order.status === 'dispatched') return false;
    if (
      searchQuery &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return 'Today';
    } else if (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    ) {
      return 'Tomorrow';
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track all orders</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-start gap-4">
          <Switch
            checked={showDispatched}
            onChange={(checked) => setShowDispatched(checked)}
            label={showDispatched ? 'Hide Dispatched' : 'Show Dispatched'}
          />

          <div className="flex-1" />

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousDay}
              className="px-3"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                className="gap-2 min-w-48"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {formatDate(selectedDate)}
                <ChevronDown className="w-4 h-4" />
              </Button>
              {showCalendar && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-border rounded-lg shadow-lg z-10 p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }
                    }}
                  />
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextDay}
              className="px-3"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or customer name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-secondary rounded-lg text-sm font-medium text-muted-foreground">
          <div className="col-span-2">Order ID</div>
          <div className="col-span-2">Customer</div>
          <div className="col-span-1">Items</div>
          <div className="col-span-1">Total</div>
          <div className="col-span-1">Order Time</div>
          <div className="col-span-1">Due Time</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Actions</div>
        </div>

        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`grid grid-cols-12 gap-4 px-4 py-4 rounded-lg border ${statusColors[order.status]} transition-colors hover:shadow-sm`}
          >
            <div className="col-span-2">
              <p className="font-semibold text-foreground">{order.id}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-foreground">{order.customerName}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-foreground">{order.items}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm font-medium text-foreground">{order.total}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-foreground">{order.orderTime}</p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-foreground">{order.dueTime}</p>
            </div>
            <div className="col-span-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeColors[order.status]}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="col-span-2 flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                View
              </Button>
              {order.status !== 'dispatched' && (
                <Button variant="ghost" size="sm" className="text-xs text-amber-600">
                  Dispatch
                </Button>
              )}
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredOrders.length} of {ordersData.length} orders
      </div>
    </div>
  );
}
