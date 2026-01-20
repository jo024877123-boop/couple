import { exec } from 'child_process';
import fs from 'fs';

console.log("Starting build capture...");
exec('npm run build', (error, stdout, stderr) => {
    console.log("Build finished.");
    const log = `ERROR: ${error ? error.message : 'None'}\n\nSTDOUT:\n${stdout}\n\nSTDERR:\n${stderr}`;
    fs.writeFileSync('build_result.txt', log, 'utf-8');
});
