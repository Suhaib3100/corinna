'use client'
import { useChatWindow } from '@/hooks/conversation/use-conversation'
import React from 'react'
import { Loader } from '../loader'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { PaperclipIcon, SendIcon } from 'lucide-react'
import Bubble from '../chatbot/bubble'

type Props = {}

const Messenger = (props: Props) => {
  const {
    messageWindowRef,
    chats,
    loading,
    chatRoom,
    onHandleSentMessage,
    register,
  } = useChatWindow()
  
  return (
    <div className="flex-1 flex flex-col h-full relative bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 h-0 w-full flex flex-col">
        <Loader loading={loading}>
          <div
            ref={messageWindowRef}
            className="w-full flex-1 h-0 flex flex-col gap-3 p-5 chat-window overflow-y-auto"
          >
            {chats.length ? (
              chats.map((chat) => (
                <Bubble
                  key={chat.id}
                  message={{
                    role: chat.role!,
                    content: chat.message,
                    link: chat.link, // Make sure to pass the link if available
                  }}
                  createdAt={chat.createdAt}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">No Chat Selected</div>
            )}
          </div>
        </Loader>
      </div>
      <form
        onSubmit={onHandleSentMessage}
        className="flex p-3 bg-gray-100 border-t border-gray-200"
      >
        <div className="flex items-center w-full px-3 py-2 bg-white rounded-lg shadow-inner">
          <PaperclipIcon className="text-gray-500 mr-3 cursor-pointer" />
          <Input
            {...register('content')}
            placeholder="Type your message..."
            className="flex-1 p-3 focus:ring-0 focus:ring-offset-0 bg-transparent border-none outline-none"
          />
          <Button
            type="submit"
            className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            disabled={!chatRoom}
          >
            <SendIcon />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Messenger
