const fs = require('fs');
let code = fs.readFileSync('app/about/page.tsx', 'utf8');

code = code.replace('const ABOUT_DATA = {', `
type AboutDataMap = Record<string, any>;
const ABOUT_DATA: AboutDataMap = {
`);

fs.writeFileSync('app/about/page.tsx', code);
