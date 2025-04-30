import { useState, useEffect, useCallback } from 'react'
import type { WorkerMessage, WorkerState, WorkerConfig } from '../types/worker'

const defaultConfig: WorkerConfig = {
  wsUrl: 'wss://solvolume.workers.dev/ws',
  reconnectInterval: 5000,
  maxReconnectAttempts: 5
}

export function useWorker(config: Partial<WorkerConfig> = {}) {
  const [state, setState] = useState<WorkerState>({
    isConnected: false,
    isConnecting: false,
    error: null
  })

  const [ws, setWs] = useState<WebSocket | null>(null)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)

  const connect = useCallback(() => {
    if (ws?.readyState === WebSocket.OPEN) return

    setState((prev: WorkerState) => ({ ...prev, isConnecting: true, error: null }))
    const worker = new WebSocket(config.wsUrl || defaultConfig.wsUrl)

    worker.onopen = () => {
      setState((prev: WorkerState) => ({ ...prev, isConnected: true, isConnecting: false }))
      setReconnectAttempts(0)
    }

    worker.onclose = () => {
      setState((prev: WorkerState) => ({ ...prev, isConnected: false, isConnecting: false }))
      if (reconnectAttempts < (config.maxReconnectAttempts || defaultConfig.maxReconnectAttempts)) {
        setTimeout(() => {
          setReconnectAttempts((prev: number) => prev + 1)
          connect()
        }, config.reconnectInterval || defaultConfig.reconnectInterval)
      }
    }

    worker.onerror = (error) => {
      setState((prev: WorkerState) => ({
        ...prev,
        isConnected: false,
        isConnecting: false,
        error: error.toString()
      }))
    }

    setWs(worker)
  }, [config, reconnectAttempts, ws])

  const disconnect = useCallback(() => {
    if (ws) {
      ws.close()
      setWs(null)
    }
  }, [ws])

  const sendMessage = useCallback((message: WorkerMessage) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    }
  }, [ws])

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [connect, disconnect])

  return {
    ...state,
    sendMessage,
    connect,
    disconnect
  }
} 