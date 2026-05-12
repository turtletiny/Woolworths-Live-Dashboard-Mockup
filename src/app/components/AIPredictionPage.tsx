import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, TrendingUp, Clock, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { MetricCard } from './MetricCard';

export function AIPredictionPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [showCalendar, setShowCalendar] = useState(false);

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
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Prediction</h1>
        <p className="text-muted-foreground">Predictive analytics and forecasts</p>
      </div>

      <div className="flex flex-col gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Expected Orders"
            value="156"
            subtitle="orders predicted for this day"
            icon={ShoppingCart}
          />
          <MetricCard
            title="Expected Items"
            value="2,480"
            subtitle="total items across all orders"
            icon={TrendingUp}
          />
          <MetricCard
            title="Expected Busiest Time"
            value="2:30 PM"
            subtitle="peak fulfillment window"
            icon={Clock}
          />
        </div>

        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <h3 className="font-semibold text-foreground mb-4">Expected Most Popular Items</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Produce & Vegetables</p>
                <p className="text-sm text-muted-foreground">358 items (14.4%)</p>
              </div>
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-[var(--woolworths-green)]" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Dairy & Eggs</p>
                <p className="text-sm text-muted-foreground">298 items (12.0%)</p>
              </div>
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-[var(--woolworths-green)]" style={{ width: '83%' }} />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Pantry Staples</p>
                <p className="text-sm text-muted-foreground">276 items (11.1%)</p>
              </div>
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-[var(--woolworths-green)]" style={{ width: '77%' }} />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Frozen Foods</p>
                <p className="text-sm text-muted-foreground">215 items (8.7%)</p>
              </div>
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-[var(--woolworths-green)]" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
