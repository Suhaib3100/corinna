import React from 'react';
import { ProgressBar } from '../progress'; // Ensure this path is correct

type PlanUsageProps = {
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE';
  credits: number;
  domains: number;
  clients: number;
};

export const PlanUsage = ({ plan, credits, domains, clients }: PlanUsageProps) => {
  const getProgressBarLimits = (plan: string) => {
    switch (plan) {
      case 'STANDARD':
        return { credits: 10, domains: 1, clients: 10 };
      case 'PRO':
        return { credits: 50, domains: 2, clients: 50 };
      case 'ULTIMATE':
        return { credits: 500, domains: 100, clients: 500 };
      default:
        return { credits: 0, domains: 0, clients: 0 };
    }
  };

  const { credits: creditLimit, domains: domainLimit, clients: clientLimit } = getProgressBarLimits(plan);

  return (
    <div className="flex flex-col gap-5 py-5">
      <ProgressBar
        end={creditLimit}
        label="Email Credits"
        value={credits}
      />
      <ProgressBar
        end={domainLimit}
        label="Domains"
        value={domains}
      />
      <ProgressBar
        end={clientLimit}
        label="Contacts"
        value={clients}
      />
    </div>
  );
};
