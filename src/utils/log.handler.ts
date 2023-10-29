import { LogFormatRgx } from '../constants';
import { ILogEntry } from '../interfaces/log';
import { FileHandler } from './file.handler';

/**
 * A utility class for log parsing operations 
 */
export default class LogHandler {
    private logs: ILogEntry[];
    
    constructor(){
        this.logs = [];
    }

    /**
     * Parses the given log file and updates the logs array.
     * @param {string} inputFile - The path of the log file to parse.
     * @returns {Promise<void>} - A Promise that resolves when parsing is complete successfully.
     */
    public async parse(inputFile: string): Promise<void> {
        const lineReader = await FileHandler.createReadLineStream(inputFile);
        for await (const line of lineReader){
            const matches = line.match(LogFormatRgx);
            if(matches?.length) {
                const timestampStr = matches[1].trim();
                const logLevel = matches[2].trim();
                const jsonPayload = matches[3].trim();
                const timestamp = Date.parse(timestampStr);
                const { transactionId, details, error } = JSON.parse(jsonPayload);
                const message: ILogEntry = { timestamp, logLevel, details, transactionId, error }
                this.logs.push(message);
            }
        }
    }

    /**
     * Filters the log entries based on the specified criteria.
     * @param {Object} filterOptions - The filter options for log entries.
     * @param {string} filterOptions.logLevel - The log level to filter by.
     * @param {string} [filterOptions.details] - The details to filter by (optional).
     * @param {string} [filterOptions.error] - The error to filter by (optional).
     * @returns {Promise<ILogEntry[]>} A Promise that resolves with the filtered log entries.
     */
    public async filterLogs(filterOptions: {
        logLevel: string,
        details?: string,
        error?: string
    }): Promise<ILogEntry[]> {
        return this.logs.filter((log) => {
            const matchesLogLevel = !filterOptions.logLevel || filterOptions.logLevel === log.logLevel;
            const matchesDetails = !filterOptions.details || new RegExp(filterOptions.details).test(log.details);
            const matchesError = !filterOptions.error || (log.error && new RegExp(filterOptions.error).test(log.error));

            return matchesLogLevel && matchesDetails && matchesError;
        });
    }
}