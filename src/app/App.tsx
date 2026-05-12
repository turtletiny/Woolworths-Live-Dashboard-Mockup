import { useState } from 'react';
import { ShoppingCart, Truck, Database } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { PriorityPickingQueue } from './components/PriorityPickingQueue';
import { LiveStaffActivity } from './components/LiveStaffActivity';
import { UpcomingSchedule } from './components/UpcomingSchedule';
import { OrdersPage } from './components/OrdersPage';
import { AIPredictionPage } from './components/AIPredictionPage';

type Page = 'dashboard' | 'orders' | 'ai-prediction';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  return (
    <div className="size-full flex bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-8">
          {currentPage === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <MetricCard
                  title="Currently Picking"
                  value="35"
                  subtitle="orders in progress"
                  icon={ShoppingCart}
                />
                <MetricCard
                  title="Dispatching Next Hour"
                  value="18"
                  subtitle="ready for dispatch"
                  icon={Truck}
                />
                <MetricCard
                  title="Backend Storage"
                  value="72%"
                  subtitle="capacity utilization"
                  icon={Database}
                  variant="battery"
                  progressValue={72}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <PriorityPickingQueue />
                </div>
                <div>
                  <UpcomingSchedule />
                </div>
              </div>

              <div className="grid grid-cols-1">
                <LiveStaffActivity />
              </div>
            </>
          )}

          {currentPage === 'orders' && <OrdersPage />}

          {currentPage === 'ai-prediction' && <AIPredictionPage />}
        </main>
      </div>
    </div>
  );
}