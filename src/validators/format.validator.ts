import { SupportedFilesRgx } from "../constants";

/**
 * A validator class for format validation operations.
 */
export class FormatValidator {
    /**
     * Checks if the given file is a log file based on the file extension.
     * @param {string} file - The file path to check.
     * @returns {boolean} - Returns `true` if the file is a log file, `false` otherwise.
     */
    static isLogFile(file: string) {
        return SupportedFilesRgx.input.test(file);
    }

    /**
     * Checks if the given file is a JSON file based on the file extension.
     * @param {string} file - The file path to check.
     * @returns {boolean} - Returns `true` if the file is a JSON file, `false` otherwise.
     */
    static isJsonFile(file: string) {
        return SupportedFilesRgx.output.test(file);
    }
}