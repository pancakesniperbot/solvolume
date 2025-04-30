import { useState, useEffect, useCallback } from 'react'
import type { WorkerMessage, WorkerState } from '../types/worker'
import { subscribeToUpdates } from '../services/cryptoDataService'

export function useWorker() {
  const [state, setState] = useState<WorkerState>({
    isConnected: false,
    isConnecting: false,
    error: null
  })

  const [messageListeners, setMessageListeners] = useState<((data: any) => void)[]>([])
  
  useEffect(() => {
    setState((prev: WorkerState) => ({ ...prev, isConnecting: true, error: null }))
    
    // Use our mock data service instead of WebSockets
    const unsubscribe = subscribeToUpdates((data) => {
      messageListeners.forEach(listener => listener(data))
    })
    
    setState((prev: WorkerState) => ({ ...prev, isConnected: true, isConnecting: false }))
    
    return () => {
      unsubscribe()
      setState((prev: WorkerState) => ({ ...prev, isConnected: false }))
    }
  }, [messageListeners])
  
  const sendMessage = useCallback((message: WorkerMessage) => {
    console.log('Sending message to mock service:', message)
    // This doesn't do anything in our mock implementation
  }, [])
  
  const addMessageListener = useCallback((listener: (data: any) => void) => {
    setMessageListeners(prev => [...prev, listener])
    return () => {
      setMessageListeners(prev => prev.filter(l => l !== listener))
    }
  }, [])
  
  return {
    ...state,
    sendMessage,
    addMessageListener
  }
} 