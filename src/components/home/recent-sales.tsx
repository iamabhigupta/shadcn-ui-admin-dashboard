import { Text } from '@/components/typography';
import { Badge } from '@/components/ui/badge';

interface SalesData {
  name: string;
  email: string;
  amount: number;
  status: 'Preparing' | 'On the way' | 'Delivered';
}

export function RecentSales() {
  const SaleStatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
      Preparing: 'bg-primary/10 text-primary hover:bg-primary/10',
      'On the way': 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/10',
      Delivered: 'bg-green-500/10 text-green-500 hover:bg-green-500/10',
    };

    const badgeStyle = statusStyles[status] || '';

    return <Badge className={`hidden lg:block ${badgeStyle}`}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {salesData.map((sale, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="space-y-1 w-60">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="lg:flex-1 flex items-center gap-5 justify-between">
            <SaleStatusBadge status={sale.status} />
            <div className="text-right font-medium">
              <p>₹{sale.amount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
      <Text
        variant="small"
        className="text-primary font-semibold text-right hover:underline-offset-4 hover:underline cursor-pointer"
      >
        See orders
      </Text>
    </div>
  );
}

const salesData: SalesData[] = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: 1999.0,
    status: 'Preparing',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: 39.0,
    status: 'On the way',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: 299.0,
    status: 'Preparing',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    amount: 99.0,
    status: 'Delivered',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: 39.0,
    status: 'Delivered',
  },
];
