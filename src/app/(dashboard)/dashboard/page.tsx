import { getUserAppointments } from '@/actions/appointment';
import {
  getUserBalance,
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
  getUserTransactions,
} from '@/actions/dashboard';
import DashboardCard from '@/components/dashboard/cards';
import { PlanUsage } from '@/components/dashboard/plan-usage';
import InfoBar from '@/components/infobar';
import { Separator } from '@/components/ui/separator';
import CalIcon from '@/icons/cal-icon';
import PersonIcon from '@/icons/person-icon';
import { TransactionsIcon } from '@/icons/transactions-icon';
import { DollarSign } from 'lucide-react';
import React from 'react';

type Props = {};

const Page = async (props: Props) => {
  const clients = await getUserClients();
  const sales = await getUserBalance();
  const bookings = await getUserAppointments();
  const plan = await getUserPlanInfo();
  const transactions = await getUserTransactions();
  const products = await getUserTotalProductPrices();

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 bg-[#F4F6F8] dark:bg-[#2C3E50] transition-colors duration-300">
        <div className="flex gap-5 flex-wrap p-5">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<PersonIcon className="text-[#2D9CDB]" />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Pipeline Value"
            icon={<DollarSign className="text-[#27AE60]" />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Appointments"
            icon={<CalIcon className="text-[#56CCF2]" />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Total Sales"
            icon={<DollarSign className="text-[#27AE60]" />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10 gap-5 p-5">
          <div className="bg-white dark:bg-[#34495E] rounded-lg p-5 shadow-lg transition-shadow duration-300">
            <div>
              <h2 className="font-bold text-2xl text-[#2C3E50] dark:text-[#ECF0F1]">Plan Usage</h2>
              <p className="text-sm text-[#7F8C8D] dark:text-[#BDC3C7]">
                A detailed overview of your metrics, usage, customers, and more.
              </p>
            </div>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
          <div className="flex flex-col bg-white dark:bg-[#34495E] rounded-lg p-5 shadow-lg transition-shadow duration-300">
            <div className="w-full flex justify-between items-center mb-5">
              <div className="flex gap-3 items-center">
                <TransactionsIcon  />
                <p className="font-bold text-[#2C3E50] dark:text-[#ECF0F1]">Recent Transactions</p>
              </div>
              <p className="text-sm text-[#ffa947] cursor-pointer hover:underline">See more</p>
            </div>
            <Separator orientation="horizontal" />
            {transactions &&
              transactions.data.map((transaction) => (
                <div
                  className="flex gap-3 w-full justify-between items-center border-b-2 py-5 border-[#BDC3C7] dark:border-[#2C3E50] transition-colors duration-300"
                  key={transaction.id}
                >
                  <p className="font-bold text-[#2C3E50] dark:text-[#ECF0F1]">
                    {transaction.calculated_statement_descriptor}
                  </p>
                  <p className="font-bold text-xl text-[#2C3E50] dark:text-[#ECF0F1]">
                    ${transaction.amount / 100}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
