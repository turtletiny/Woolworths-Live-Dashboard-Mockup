import { User } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  avatar?: string;
  currentTask: string;
  status: 'active' | 'congestion' | 'idle';
  zone?: string;
}

const mockStaffData: StaffMember[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    currentTask: 'picking Sarah Smith',
    status: 'active'
  },
  {
    id: '2',
    name: 'James Kim',
    currentTask: 'on break',
    status: 'idle',
    zone: 'Zone 3'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    currentTask: 'picking James Jones',
    status: 'active'
  },
  {
    id: '4',
    name: 'Michael Roberts',
    currentTask: 'dispatching Michael Patel',
    status: 'active'
  },
  {
    id: '5',
    name: 'Lisa Park',
    currentTask: 'picking Lisa Brown',
    status: 'active'
  },
  {
    id: '6',
    name: 'David Hughes',
    currentTask: 'dispatching David Wilson',
    status: 'active'
  },
  {
    id: '7',
    name: 'Amy Chen',
    currentTask: 'on break',
    status: 'idle',
    zone: 'Zone 3'
  },
  {
    id: '8',
    name: 'Tom Wilson',
    currentTask: 'picking Ben Lowry',
    status: 'active'
  }
];

function getStatusIndicator(status: StaffMember['status']) {
  switch (status) {
    case 'active':
      return <div className="w-3 h-3 rounded-full bg-[var(--success-green)] ring-2 ring-green-100" />;
    case 'congestion':
      return <div className="w-3 h-3 rounded-full bg-[var(--warning-orange)] ring-2 ring-orange-100 animate-pulse" />;
    case 'idle':
      return <div className="w-3 h-3 rounded-full bg-gray-400 ring-2 ring-gray-100" />;
  }
}

function getStatusText(member: StaffMember) {
  return member.currentTask;
}

export function LiveStaffActivity() {
  return (
    <div className="bg-white rounded-lg border border-border shadow-sm">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Live Staff Activity</h3>
        <p className="text-sm text-muted-foreground mt-1">{mockStaffData.length} staff members active</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockStaffData.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary/30 transition-colors"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[var(--woolworths-bg-green)] flex items-center justify-center">
                  <User className="w-5 h-5 text-[var(--woolworths-green)]" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5">
                  {getStatusIndicator(member.status)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{member.name}</p>
                <p className={`text-xs mt-0.5 truncate ${
                  member.status === 'congestion'
                    ? 'text-[var(--warning-orange)] font-medium'
                    : 'text-muted-foreground'
                }`}>
                  {getStatusText(member)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
