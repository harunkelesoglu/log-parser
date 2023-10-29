export interface ILogEntry {
    timestamp: number;
    logLevel: string;
    details: string;
    transactionId: string;
    error?: string;
}
