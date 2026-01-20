import fs from 'fs';
import { parse } from '@babel/parser';

try {
    const code = fs.readFileSync('./src/App.jsx', 'utf-8');
    parse(code, { sourceType: 'module', plugins: ['jsx'] });
    console.log('Syntax OK');
} catch (e) {
    console.error('Syntax Error:', e.message);
    if (e.loc) console.error(`Line: ${e.loc.line}, Column: ${e.loc.column}`);
}
