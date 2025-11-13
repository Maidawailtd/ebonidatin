"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Send, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [messageText, setMessageText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchConversations() {
      try {
        const response = await fetch("/api/matches?page=1") // Using matches as conversations
        if (!response.ok) {
          throw new Error("Failed to fetch conversations")
        }
        const data = await response.json()
        setConversations(data.matches)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchConversations()
  }, [])

  useEffect(() => {
    async function fetchMessages() {
      if (!selectedConversation) return
      try {
        const response = await fetch(`/api/messages/${selectedConversation.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch messages")
        }
        const data = await response.json()
        setMessages(data.messages)
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchMessages()
  }, [selectedConversation])

  const handleSendMessage = async () => {
    if (!selectedConversation || !messageText.trim()) return

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: selectedConversation.id,
          content: messageText,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const newMessage = await response.json()
      setMessages([...messages, newMessage])
      setMessageText("")
    } catch (err: any) {
      setError(err.message)
    }
  }
  
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Conversations List */}
      <div
        className={`w-full md:w-80 border-r border-border flex flex-col ${selectedConversation && "hidden md:flex"}`}>
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
              onClick={() => setSelectedConversation(conversation)}
              className={`dm-item w-full text-left ${
                selectedConversation?.id === conversation.id ? "bg-muted" : ""
              }`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.photo_url || "/placeholder.svg"} />
                    <AvatarFallback>{conversation.first_name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm`}>{conversation.first_name}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className={`flex-1 flex flex-col ${!selectedConversation && "hidden md:flex"}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setSelectedConversation(null)} className="md:hidden">
                  <ChevronLeft size={24} />
                </Button>
                <Avatar>
                  <AvatarImage src={selectedConversation.photo_url || "/placeholder.svg"} />
                  <AvatarFallback>{selectedConversation.first_name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{selectedConversation.first_name}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <span className="text-xl">ⓘ</span>
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender_id === selectedConversation.id ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-full ${
                      message.sender_id !== selectedConversation.id ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                    }`}>
                    <p className="text-sm">{message.content}</p>
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
              <Button onClick={handleSendMessage} size="icon" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
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
