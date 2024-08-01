import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import Image from 'next/image'

type Props = {
  register: UseFormRegister<FieldValues>
  domains?:
    | {
        name: string
        id: string
        icon: string
      }[]
    | undefined
}

const ConversationSearch = ({ register, domains }: Props) => {
  const baseUrl = 'https://ucarecdn.com/' // Adjust this URL based on your actual base URL

  return (
    <div className="flex flex-col py-3 w-full max-w-sm mx-auto">
      <label
        htmlFor="domain"
        className="mb-2 text-sm font-medium text-gray-700"
      >
        Select Domain
      </label>
      <div className="relative">
        <select
          {...register('domain')}
          id="domain"
          className="block w-full px-4 py-3 pr-8 text-sm border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          <option
            disabled
            selected
            className="text-gray-400"
          >
            Domain name
          </option>
          {domains?.map((domain) => (
            <option
              value={domain.id}
              key={domain.id}
            >
              {domain.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              d="M7 10l5 5 5-5H7z"
            />
          </svg>
        </div>
      </div>
      {domains && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm"
            >
              {domain.icon && (
                <Image
                  src={`${baseUrl}${domain.icon}/`}
                  alt={domain.name}
                  width={24}
                  height={24}
                  className="mr-3 rounded-full"
                />
              )}
              <span className="text-sm text-gray-700">{domain.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConversationSearch
