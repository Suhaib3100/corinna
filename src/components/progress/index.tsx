import React from 'react'

type ProgressBarProps = {
  end: number
  label: string
  value: number
}

export const ProgressBar = ({ end, label, value }: ProgressBarProps) => {
  const percentage = (value / end) * 100

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-sm font-light text-gray-600 dark:text-gray-400">
        <span>{label}</span>
        <span>{value} / {end}</span>
      </div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
          <div className="absolute inset-0 bg-blue-200 rounded-full">
            <div
              style={{ width: `${percentage}%` }}
              className="absolute inset-0 bg-blue-500 rounded-full transition-width duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
