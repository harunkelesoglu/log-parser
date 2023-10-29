import LogHandler from './src/utils/log.handler';
import { FileHandler } from './src/utils/file.handler';
import program from './src/cli';
import path from 'path';
import { FormatValidator } from './src/validators/format.validator';
import { ILogEntry } from './src/interfaces/log';

async function run() {
  try {
    await program.parseAsync(process.argv);

    const inputFilePath = path.resolve(program.getOptionValue('input'));
    const outputFilePath = path.resolve(program.getOptionValue('output'));
    const logLevel = program.getOptionValue('parse');
    const logDetails = program.getOptionValue('details');
    const errorMessage = program.getOptionValue('error');

    if (!FormatValidator.isLogFile(inputFilePath)) {
      throw new Error(`Unsupported input file ${inputFilePath}.`);
    }
    if (!FormatValidator.isJsonFile(outputFilePath)) {
      throw new Error(`Unsupported output file ${outputFilePath}.`);
    }

    const logHandler = new LogHandler();
    await logHandler.parse(inputFilePath);

    let messages: ILogEntry[]= [];

    messages = await logHandler.filterLogs({
      logLevel,
      details: logDetails,
      error: errorMessage
    });

    await FileHandler.writeJSONLogToFile(outputFilePath, messages);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
