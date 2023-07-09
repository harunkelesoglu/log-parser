import { LogFormatRgx } from "../constants";
import { ILogEntry } from "../interfaces/log";
import { FileHandler } from "./file.handler";

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
                const { transactionId, err } = JSON.parse(jsonPayload);
                this.logs.push({ timestamp, logLevel, transactionId, err });
            }
        }
    }

    /**
     * Filters the log entries based on the specified log level.
     * @param {string} logLevel - The log level to filter by.
     * @returns {Promise<ILogEntry[]>} - A Promise that resolves with the filtered log entries.
     */
    public async filterLogsByLogLevel(logLevel: string): Promise<ILogEntry[]> {
        return this.logs.filter(log => log.logLevel === logLevel);
    }
}