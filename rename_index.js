import fs from 'fs';

try {
    if (fs.existsSync('index.HTML')) {
        console.log("Found index.HTML, renaming...");
        fs.renameSync('index.HTML', 'index.temp.html');
        fs.renameSync('index.temp.html', 'index.html');
        console.log("Renamed to index.html successfully.");
    } else {
        console.log("index.HTML not found. Checking for index.html...");
        if (fs.existsSync('index.html')) {
            console.log("index.html key exists.");
        }
    }
} catch (e) {
    console.error("Rename failed:", e);
}
