import { Activity, Box, CreditCard, DollarSign, Users } from 'lucide-react';

import { Overview } from '@/components/home/overview';
import { RecentSales } from '@/components/home/recent-sales';
import { IconBadge } from '@/components/ui/icon-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IconBadge icon={DollarSign} variant="success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <IconBadge icon={Users} variant="info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <IconBadge icon={CreditCard} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <IconBadge icon={Activity} variant="warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid mt-5 gap-5 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-4 shadow-none border-none">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3 shadow-none border-none">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-x-2 text-xl">
                <IconBadge icon={Box} variant="success" />
                <span>Recent orders</span>
              </div>
            </CardTitle>
            {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
