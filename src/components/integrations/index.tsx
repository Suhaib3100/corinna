'use client'
import { INTEGRATION_LIST_ITEMS } from '@/constants/integration'
import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import Image from 'next/image'
import IntegrationTrigger from './IntegrationTrigger'

type Props = {
  connections: {
    stripe: boolean
  }
}

const IntegrationsList = ({ connections }: Props) => {
  return (
    <div className="flex-1 h-0 grid grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex w-full justify-between items-start gap-x-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
                  <Image
                    sizes="100vw"
                    src="/images/stripe.png"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="font-bold capitalize text-lg">{item.name}</h2>
              </div>
              <IntegrationTrigger
                          connections={connections}
                          title={item.title}
                          description={item.modalDescription} // Fixed typo here from 'descrioption' to 'description'
                          logo={item.logo}
                          name={item.name} descrioption={''}              />
            </div>
            <CardDescription>{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default IntegrationsList
