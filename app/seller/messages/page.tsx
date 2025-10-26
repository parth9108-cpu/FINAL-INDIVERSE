'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Paperclip, Smile, MoreVertical, Star, Archive, Trash2, Phone, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    { id: 1, name: 'Priya Sharma', lastMessage: 'Thank you for the beautiful saree!', time: '2m ago', unread: 2, online: true, avatar: 'PS' },
    { id: 2, name: 'Rahul Verma', lastMessage: 'When will my order be shipped?', time: '1h ago', unread: 0, online: false, avatar: 'RV' },
    { id: 3, name: 'Anita Desai', lastMessage: 'I love the pottery set!', time: '3h ago', unread: 1, online: true, avatar: 'AD' },
    { id: 4, name: 'Vikram Singh', lastMessage: 'Can I get a custom design?', time: '1d ago', unread: 0, online: false, avatar: 'VS' },
    { id: 5, name: 'Meera Patel', lastMessage: 'The quality is amazing', time: '2d ago', unread: 0, online: true, avatar: 'MP' },
  ];

  const messages = [
    { id: 1, sender: 'customer', text: 'Hi! I received my order yesterday', time: '10:30 AM', avatar: 'PS' },
    { id: 2, sender: 'seller', text: 'That\'s wonderful! How do you like it?', time: '10:32 AM' },
    { id: 3, sender: 'customer', text: 'The quality is absolutely amazing! The craftsmanship is beautiful', time: '10:35 AM', avatar: 'PS' },
    { id: 4, sender: 'seller', text: 'I\'m so glad to hear that! Our artisans put a lot of love into each piece', time: '10:36 AM' },
    { id: 5, sender: 'customer', text: 'Thank you for the beautiful saree!', time: '10:40 AM', avatar: 'PS' },
  ];

  const currentChat = conversations.find(c => c.id === selectedChat);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-600">Connect with your customers</p>
      </motion.div>

      {/* Messages Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          <div className="flex h-[calc(100vh-250px)]">
            {/* Conversations List */}
            <div className="w-80 border-r bg-white">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-9 text-sm"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(100%-73px)]">
                {conversations.map((conv, index) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm truncate">{conv.name}</h4>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="bg-blue-600">{conv.unread}</Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50">
              {/* Chat Header */}
              <div className="p-4 bg-white border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {currentChat?.avatar}
                    </div>
                    {currentChat?.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentChat?.name}</h3>
                    <p className="text-xs text-gray-500">{currentChat?.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-md ${msg.sender === 'seller' ? 'flex-row-reverse' : ''}`}>
                      {msg.sender === 'customer' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {msg.avatar}
                        </div>
                      )}
                      <div>
                        <div className={`p-3 rounded-2xl ${
                          msg.sender === 'seller' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${msg.sender === 'seller' ? 'text-right' : ''}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && message.trim()) {
                        // Handle send message
                        setMessage('');
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="w-5 h-5" />
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
