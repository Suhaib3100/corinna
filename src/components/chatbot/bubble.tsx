
import React from 'react'
import { cn, extractUUIDFromString, getMonthName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  message: {
    role: 'assistant' | 'user'
    content: string
    link?: string;   }
  createdAt?: Date
}

const Bubble = ({ message, createdAt }: Props) => {
  let d = new Date()
  const image = extractUUIDFromString(message.content)

  return (
    <div
      className={cn(
        'flex gap-2 items-start',
        message.role === 'assistant' ? 'self-start' : 'self-end flex-row-reverse'
      )}
    >
      <Avatar className="w-10 h-10">
        {message.role === 'assistant' ? (
          <>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </>
        ) : (
          <AvatarFallback>
            <User />
          </AvatarFallback>
        )}
      </Avatar>
      <div
        className={cn(
          'flex flex-col gap-2 min-w-[200px] max-w-[400px] p-3 rounded-lg shadow-lg',
          message.role === 'assistant'
            ? 'bg-gray-100 text-gray-800 rounded-tr-none'
            : 'bg-blue-500 text-white rounded-tl-none'
        )}
      >
        <div className="flex justify-between text-xs text-gray-500">
          <span>
            {createdAt ? (
              <>
                {createdAt.getDate()} {getMonthName(createdAt.getMonth())}
              </>
            ) : (
              <>
                {d.getDate()} {getMonthName(d.getMonth())}
              </>
            )}
          </span>
          <span>
            {createdAt ? (
              <>
                {createdAt.getHours() % 12 || 12}:{createdAt.getMinutes().toString().padStart(2, '0')}{' '}
                {createdAt.getHours() >= 12 ? 'PM' : 'AM'}
              </>
            ) : (
              <>
                {d.getHours() % 12 || 12}:{d.getMinutes().toString().padStart(2, '0')}{' '}
                {d.getHours() >= 12 ? 'PM' : 'AM'}
              </>
            )}
          </span>
        </div>
        {image ? (
          <div className="relative aspect-square overflow-hidden rounded-lg mt-2 shadow-md">
            <Image
              src={`https://ucarecdn.com/${image[0]}/`}
              layout="fill"
              objectFit="cover"
              alt="image"
            />
          </div>
        ) : (
          <p className="text-sm">
            {message.content.replace('(complete)', ' ')}
            {message.link && (
              <Link
                className="underline font-semibold pl-2"
                href={message.link}
                target="_blank"
              >
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Bubble
