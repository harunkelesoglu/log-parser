import LogHandler from './src/utils/log.handler';
import { FileHandler } from './src/utils/file.handler';
import program from './src/cli';
import path from 'path';
import { FormatValidator } from './src/validators/format.validator';

async function run() {
  try {
    await program.parseAsync(process.argv);

    const inputFilePath = path.resolve(program.getOptionValue('input'));
    const outputFilePath = path.resolve(program.getOptionValue('output'));

    if (!FormatValidator.isLogFile(inputFilePath)) {
      throw new Error(`Unsupported input file ${inputFilePath}.`);
    }
    if (!FormatValidator.isJsonFile(outputFilePath)) {
      throw new Error(`Unsupported output file ${outputFilePath}.`);
    }

    const logHandler = new LogHandler();
    await logHandler.parse(inputFilePath);
    const errorMessages = await logHandler.filterLogsByLogLevel('error');
    await FileHandler.writeJSONLogToFile(outputFilePath, errorMessages);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
