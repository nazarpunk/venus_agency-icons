import * as fs from 'fs';
import * as p from 'path';

//const { join, extname, basename } = require('path');
//const { readdirSync, renameSync } = require('fs');

const dir = './../';

for (const f of fs.readdirSync(dir)) {
    const ext = p.extname(f);
    if (ext === '') {
        continue;
    }
    const name = p.basename(f, ext);
    const pr = '_Iconz';
    if (name.indexOf(pr) < 0) {
        continue;
    }
    fs.renameSync(p.join(dir, f), p.join(dir, name.replace(pr, '') + ext));
}

for (const f of fs.readdirSync(dir)) {


}