import type { WorkerMessage, WorkerConfig } from '../types/worker';
export declare function useWorker(config?: Partial<WorkerConfig>): {
    sendMessage: (message: WorkerMessage) => void;
    connect: () => void;
    disconnect: () => void;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
};
