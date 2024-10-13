'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from 'next/link'
import { User, Lock, Facebook, Mail } from 'lucide-react'

export function LoginPageComponent() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md p-8 bg-white border-[#FFD700]">
          <h1 className="text-3xl font-bold text-[#8B4513] mb-6 text-center">Login to Roman Empire</h1>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-[#8B4513]">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input id="username" type="text" placeholder="Enter your username" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#8B4513]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input id="password" type="password" placeholder="Enter your password" className="pl-10" />
              </div>
            </div>
            <Button className="w-full bg-[#FFD700] text-[#8B4513] hover:bg-[#E6C200]">
              Login
            </Button>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 mb-4">Or login with</p>
            <div className="flex space-x-4">
              <Button className="flex-1 bg-[#3b5998] text-white hover:bg-[#344e86]">
                <Facebook className="mr-2" size={18} />
                Facebook
              </Button>
              <Button className="flex-1 bg-[#4285F4] text-white hover:bg-[#3367D6]">
                <Mail className="mr-2" size={18} />
                Google
              </Button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/signup" className="text-[#8B4513] hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}