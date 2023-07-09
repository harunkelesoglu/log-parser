export interface ILogEntry {
    timestamp: number;
    logLevel: string;
    transactionId: string;
    err?: string
}
