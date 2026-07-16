"use client"

import { EmailContext } from '@/context/EmailContext'
import { useContext } from 'react'

const useEmail = () => {
  return useContext(EmailContext)
}

export default useEmail;