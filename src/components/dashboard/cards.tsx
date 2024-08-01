import React from 'react';

type Props = {
  title: string;
  value: number;
  icon: JSX.Element;
  sales?: boolean;
};

const DashboardCard = ({ icon, title, value, sales }: Props) => {
  return (
    <div className="rounded-lg flex flex-col gap-3 p-6 border border-[#BDC3C7] dark:border-[#2C3E50] bg-white dark:bg-[#34495E] shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex gap-3 items-center">
        {icon}
        <h2 className="font-bold text-xl text-[#2C3E50] dark:text-[#ECF0F1]">{title}</h2>
      </div>
      <p className="font-bold text-4xl text-[#2C3E50] dark:text-[#ECF0F1]">
        {sales && '$'}
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;
