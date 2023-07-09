import fs from 'fs';
import readline from 'readline/promises';

/**
 * A utility class for file handling operations 
 */
export class FileHandler {
    /**
     * Creates a readline interface for reading a file line by line. Optimal way of the reading file
     * @param {string} filePath - The path of the file to read.
     * @returns {readline.Interface} - The readline interface for the file.
     */
    static async createReadLineStream(filePath: string): Promise<readline.Interface> {
        const fileStream = fs.createReadStream(filePath);
        return readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        })
    }

    /**
     * Writes JSON log data to the specified file.
     * @param {string} filePath - The path of the file to write.
     * @param {any[data]} data - The JSON log data to write.
     * @returns { Promise<void>} - A promise that resolves when the operation is complete successfully.
     */
    static async writeJSONLogToFile(filePath: string, data:  any[]): Promise<void> {
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
}