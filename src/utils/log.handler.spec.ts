import LogHandler from './log.handler';
import { FileHandler } from './file.handler';

jest.mock('./file.handler');

describe('LogHandler', () => {
  let logHandler: LogHandler;
  let mockCreateReadLineStream: jest.Mock;

  beforeEach(() => {
    logHandler = new LogHandler();
    mockCreateReadLineStream = jest.fn();
    (FileHandler.createReadLineStream as jest.Mock).mockReturnValue(mockCreateReadLineStream);
  });

  describe('filterLogsByLogLevel', () => {
    it('should filter the log entries based on the specified log level', async () => {
        logHandler['logs'] = [
        {
          timestamp: Date.parse('2022-01-01T10:00:00.000Z'),
          logLevel: 'info',
          transactionId: '123',
        },
        {
          timestamp: Date.parse('2022-01-02T11:00:00.000Z'),
          logLevel: 'error',
          transactionId: '456',
          err: 'Error message',
        },
        {
          timestamp: Date.parse('2022-01-03T12:00:00.000Z'),
          logLevel: 'debug',
          transactionId: '789',
        },
      ];

      const filteredLogs = await logHandler.filterLogsByLogLevel('error');

      expect(filteredLogs).toEqual([
        {
          timestamp: Date.parse('2022-01-02T11:00:00.000Z'),
          logLevel: 'error',
          transactionId: '456',
          err: 'Error message',
        },
      ]);
    });
  });
});
