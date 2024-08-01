'use client'
import { useChatTime } from '@/hooks/conversation/use-conversation'
import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { User } from 'lucide-react'
import { UrgentIcon } from '@/icons/urgent-icon'

type Props = {
  title: string
  description?: string
  createdAt: Date
  id: string
  onChat(): void
  seen?: boolean
}

const ChatCard = ({
  title,
  description,
  createdAt,
  onChat,
  id,
  seen,
}: Props) => {
  const { messageSentAt, urgent } = useChatTime(createdAt, id)

  return (
    <Card
      onClick={onChat}
      className="rounded-lg border-r-0 hover:bg-muted cursor-pointer transition duration-150 ease-in-out shadow-sm"
    >
      <CardContent className="p-4 flex gap-3 items-center">
        <Avatar>
          <AvatarFallback className="bg-muted">
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CardDescription className="font-bold leading-none text-gray-700">
                {title}
              </CardDescription>
              {urgent && !seen && <UrgentIcon />}
            </div>
            <CardDescription className="text-xs text-gray-500">
              {createdAt ? messageSentAt : ''}
            </CardDescription>
          </div>
          <CardDescription className="text-sm text-gray-600 mt-2">
            {description
              ? description.substring(0, 50) + '...'
              : 'This chatroom is empty'}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChatCard
