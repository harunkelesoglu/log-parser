# Log Parser CLI

The Log Parser CLI is a command-line tool that allows you to parse log files and filter log entries based on log level, details, and error messages. It's written in TypeScript and offers a simple and flexible way to extract and filter log data.

## Installation

Before using the Log Parser CLI, make sure you have Node.js and npm installed on your system. You can download and install them from [nodejs.org](https://nodejs.org/).

To install the Log Parser CLI, you can use npm. Open your terminal and run the following command:

```bash
npm install -g log-parser
```

This command installs the Log Parser CLI globally, making it available as a command-line tool.

## Usage

The Log Parser CLI can be used to extract and filter log entries from log files. It provides various options to customize the filtering process. Here's the basic command structure:

```bash
log-parser --parse <logLevel> --input <inputFile> --output <outputFile> --details <regex> --error <regex>
```

### Options:

- `--parse <logLevel>`: Specify the log level to filter by (e.g., 'info', 'error', 'debug').

- `--input <inputFile>`: The path to the log file that will be parsed. The file extension should be `.log`.

- `--output <outputFile>`: The path where the filtered log entries will be written as a JSON file.

- `--details <regex>` (optional): A regular expression pattern to filter log entries by details.

- `--error <regex>` (optional): A regular expression pattern to filter log entries by error messages.

### Example:

```bash
log-parser --parse error --input /path/to/your/logfile.log --output /path/to/outputfile.json --details ".*failed.*" --error ".*timeout.*"
```

This command will parse the log file, filter entries with a log level of 'error,' and write the filtered log entries to the specified output file. The `--details` and `--error` options allow you to further refine the filtering using regular expressions.

#### Input Format

```text
<ISO Date> - <Log Level> - {"transactionId: "<UUID>", "details": "<message event/action description>", "error": "<Optional, error description>", ...<additional log information>}
```

#### Input Example

```text
2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}
2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}
2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request user orders list","userId": 10}
2021-08-09T02:12:51.255Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is started"}
2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request the user information","userId": 16}
2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"User information is gathered","user":{"id":10,"name":"Alice"}}
2021-08-09T02:12:51.258Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request user orders list","userId":16}
2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}
2021-08-09T02:12:51.259Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user": {"id": 16, "name": "Michael"}}
2021-08-09T02:12:51.262Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user":{"id":16,"orders":[{"id":472,"items":{"id":7,"price":7.12}}]}}
2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}
2021-08-09T02:12:51.265Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}
```

#### Output Format

```text
[{"timestamp": <Epoch Unix Timestamp>, "loglevel": "<loglevel>", "transactionId: "<UUID>", "error": "<Error message>" }]
```

## Building from Source

If you want to build the Log Parser CLI from source, you can follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/log-parser-cli.git
```

2. Change the working directory to the project folder:

```bash
cd log-parser
```

3. Install the project dependencies:

```bash
npm install
```

4. Build the project:

```bash
npm run build
```

Now you can use the Log Parser CLI by running `node dist/parser.js` or by creating a symlink for it.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- Harun Keleşoğlu
- Contact: harun.kelesoglu19@gmail.com
