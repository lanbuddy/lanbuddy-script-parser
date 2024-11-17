# lanbuddy-script-parser

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/lanbuddy/lanbuddy-script-parser/blob/main/LICENSE)

A Node.js package for parsing lanbuddy launch script files.

## Installation

```bash
npm install lanbuddy-script-parser
-or-
yarn add lanbuddy-script-parser
```

## Usage

```typescript
import useLaunchScriptParser from 'lanbuddy-script-parser';

const { parseString } = useLaunchScriptParser()
const yamlFileContent = readFileSync('./launch.yaml', 'utf-8');

let launchInstructions: LanbuddyScript;
try {
    launchInstructions = parseString(yamlFileContent);
} catch (error) {
    // Handle errors here
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/lanbuddy/lanbuddy-script-parser/blob/main/LICENSE) file for details.
