const { exec } = require('child_process');
const fs = require('fs');

// Execution headless
//const playwrightCommand = 'npx playwright test --workers 1';

// Execution headed
const playwrightCommand = 'npx playwright test --workers 1 --headed';

// Execution UI Mode
//const playwrightCommand = 'npx playwright test --ui';

const logStream = fs.createWriteStream('./execution_logs.md', { flags: 'a' });

console.log("Starting Playwright tests...");

exec(playwrightCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error.message}`);
        logStream.write(error.message);  // Write realtime output to log file
        return;
    }
    if (stderr) {
        console.error(`Error output: ${stderr}`);
        logStream.write(stderr);  // Write realtime output to log file
        return;
    }
    console.log(`Command output: ${stdout}`);
    logStream.write(stdout);  // Write realtime output to log file
});