import { FileHandler } from "./file.handler";
import fs from 'fs';
import readline from 'readline/promises';

describe('FileHandler', () => {
    describe('createReadLineStream', () => {
        it('should create a readline interface for the specified file', async () => {
            const filePath = '/path/to/logfile.log';
            const expectedStream: fs.ReadStream = {} as fs.ReadStream;
            const expectedInterface: readline.Interface = {} as readline.Interface;
      
            jest.spyOn(fs, 'createReadStream').mockReturnValue(expectedStream);
            jest.spyOn(readline, 'createInterface').mockReturnValue(expectedInterface);
      
            const result = await FileHandler.createReadLineStream(filePath);
      
            expect(fs.createReadStream).toHaveBeenCalledWith(filePath);
            expect(readline.createInterface).toHaveBeenCalledWith({
                input: expectedStream,
                crlfDelay: Infinity
            });
            expect(result).toBe(expectedInterface);
          });
    })
    describe('writeJSONLogToFile', () => {
        it('should write JSON log data to the specified file with specified format', () => {
          const filePath = './errors.spec.json';
          const data = [{ message: 'Log message 1' }, { message: 'Log message 2' }];
    
          const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    
          FileHandler.writeJSONLogToFile(filePath, data);
    
          expect(writeFileSyncSpy).toHaveBeenCalledWith(filePath, JSON.stringify(data));
        });
      });
})
