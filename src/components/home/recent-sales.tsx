import { Text } from '@/components/typography';
import { Badge } from '@/components/ui/badge';

interface SalesData {
  name: string;
  email: string;
  amount: number;
  status: 'preparing' | 'on_the_way' | 'delivered';
}

export function RecentSales() {
  const SaleStatusBadge = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
      preparing: 'bg-primary/10 text-primary hover:bg-primary/10',
      on_the_way: 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/10',
      delivered: 'bg-green-500/10 text-green-500 hover:bg-green-500/10',
    };

    const badgeStyle = statusStyles[status] || '';

    return <Badge className={`hidden lg:block ${badgeStyle}`}>Pending</Badge>;
  };

  return (
    <div className="space-y-6">
      {salesData.map((sale, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="flex items-center gap-5 justify-between">
            <SaleStatusBadge status={sale.status} />
            <div className="lg:w-36 text-right font-medium">
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
    status: 'preparing',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: 39.0,
    status: 'on_the_way',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: 299.0,
    status: 'preparing',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    amount: 99.0,
    status: 'delivered',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: 39.0,
    status: 'delivered',
  },
];
