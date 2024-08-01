'use client'
import React, { useState } from 'react'
import { useChatBot } from '@/hooks/chatbot/use-chatbot'
import { BotWindow } from './window'
import { cn } from '@/lib/utils'
import './AiChatBot.css' // Import custom CSS

const AiChatBot: React.FC = () => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors,
  } = useChatBot()

  const [isArrowVisible, setIsArrowVisible] = useState(false)

  const handleOpenChatBot = () => {
    onOpenChatBot()
    setIsArrowVisible(true)
    setTimeout(() => setIsArrowVisible(false), 2000) // Hide arrow after 2 seconds
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="chatbot-container">
      {botOpened && currentBot && (
        <BotWindow
          errors={errors}
          setChat={setOnChats}
          realtimeMode={onRealTime}
          helpdesk={currentBot.helpdesk}
          domainName={currentBot.name}
          ref={messageWindowRef}
          help={currentBot.chatBot?.helpdesk}
          theme={currentBot.chatBot?.background}
          textColor={currentBot.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
        />
      )}
      <div
        className={cn(
          'chatbot-button',
          loading ? 'invisible' : 'visible'
        )}
        onClick={handleOpenChatBot}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="bot-icon"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12C2 14.04 2.56 16.03 3.5 17.74L2 22L6.26 20.5C7.97 21.44 9.96 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 14H8V12H16V14ZM14 10H8V8H14V10Z"
            fill="white"
          />
        </svg>
        {isArrowVisible && (
          <div className="arrow-container">
            <div className="arrow" />
          </div>
        )}
      </div>
    </div>
  )
}

export default AiChatBot
