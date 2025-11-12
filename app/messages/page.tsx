"use client"

import { useState } from "react"
import { ChevronLeft, Send, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [messageText, setMessageText] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      lastMessage: "That sounds amazing!",
      timestamp: "2m",
      unread: true,
      online: true,
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      lastMessage: "See you tomorrow 🎉",
      timestamp: "1h",
      unread: false,
      online: true,
    },
    {
      id: 3,
      name: "Jessica Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      lastMessage: "Thanks for the photoshoot tips!",
      timestamp: "3h",
      unread: false,
      online: false,
    },
  ]

  const messages = [
    { id: 1, sender: "them", text: "Hey, how are you?", timestamp: "10:30 AM" },
    { id: 2, sender: "you", text: "I'm doing great! How about you?", timestamp: "10:31 AM" },
    { id: 3, sender: "them", text: "That sounds amazing!", timestamp: "10:32 AM" },
  ]

  const current = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Conversations List */}
      <div
        className={`w-full md:w-80 border-r border-border flex flex-col ${selectedConversation && "hidden md:flex"}`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-2xl font-bold">Messages</h2>
          <Button variant="ghost" size="icon">
            <Plus size={24} />
          </Button>
        </div>

        <div className="px-4 py-2">
          <Input placeholder="Search conversations..." className="rounded-full" />
        </div>

        <div className="dm-list flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`dm-item w-full text-left ${selectedConversation === conversation.id ? "bg-muted" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${conversation.unread ? "font-bold" : ""}`}>{conversation.name}</p>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className={`flex-1 flex flex-col ${!selectedConversation && "hidden md:flex"}`}>
        {current ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setSelectedConversation(null)} className="md:hidden">
                  <ChevronLeft size={24} />
                </Button>
                <Avatar>
                  <AvatarImage src={current.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{current.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{current.name}</p>
                  <p className="text-xs text-muted-foreground">{current.online ? "Active now" : "Offline"}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <span className="text-xl">ⓘ</span>
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-full ${
                      message.sender === "you" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border flex gap-2">
              <Input
                placeholder="Aa"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="rounded-full"
              />
              <Button size="icon" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Send size={20} />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
            <div>
              <p className="text-lg font-semibold">No conversation selected</p>
              <p className="text-sm">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
