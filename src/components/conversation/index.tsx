'use client'
import { useConversation } from '@/hooks/conversation/use-conversation'
import React from 'react'
import { TABS_MENU } from '@/constants/menu'
import { TabsContent } from '../ui/tabs'
import ConversationSearch from './search'
import { Loader } from '../loader'
import ChatCard from './chat-card'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'
import TabsMenu from '../tabs'

type Props = {
  domains?:
    | {
        name: string
        id: string
        icon: string
      }[]
    | undefined
}

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } = useConversation()

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <TabsMenu triggers={TABS_MENU} className="bg-white rounded-lg shadow-md">
        <TabsContent value="unread" className="p-4">
          <ConversationSearch domains={domains} register={register} />
          <div className="mt-4">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room.chatRoom[0].message[0]?.seen}
                    id={room.chatRoom[0].id}
                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                    createdAt={room.chatRoom[0].message[0]?.createdAt}
                    key={room.chatRoom[0].id}
                    title={room.email!}
                    description={room.chatRoom[0].message[0]?.message}
                  />
                ))
              ) : (
                <CardDescription className="text-center mt-4">
                  No chats for your domain
                </CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="all" className="p-4">
          <Separator orientation="horizontal" className="my-4" />
          <div className="text-center">All conversations will be displayed here.</div>
        </TabsContent>
        <TabsContent value="expired" className="p-4">
          <Separator orientation="horizontal" className="my-4" />
          <div className="text-center">Expired conversations will be displayed here.</div>
        </TabsContent>
        <TabsContent value="starred" className="p-4">
          <Separator orientation="horizontal" className="my-4" />
          <div className="text-center">Starred conversations will be displayed here.</div>
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default ConversationMenu
