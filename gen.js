import svgtofont from 'svgtofont'

import path from 'path'
import fs from 'fs'

const venus = './../venus_agency'

const vfile = './version.txt'

const versionUpdate = 1
const version = +fs.readFileSync(vfile, {encoding: 'utf8', flag: 'r'}) + versionUpdate
fs.writeFileSync(vfile, version.toString())

const className = 'Iconz'
const fontName = `${className}${version}`
const iconsPath = path.resolve(process.cwd(), 'icons')
const fontsPath = path.resolve(process.cwd(), 'fonts')
const fontVenusDir = path.join(venus, 'fonts', 'iconz')
const codeVenusFile = path.join(venus, 'lib', `${className.toLowerCase()}.dart`)
const pubspecPath = path.join(venus, 'pubspec.yaml')

const complete = () => {
    const scss = fs.readFileSync(path.join(fontsPath, `${fontName}.scss`), {encoding: 'utf8', flag: 'r'})

    let matches = scss.matchAll(/\$[a-z]+\d+-([a-z_0-9-]+):\s*'\\([a-z0-9]+)'\s*;/gmi)

    fs.readdirSync(fontVenusDir).forEach(f => fs.rmSync(`${fontVenusDir}/${f}`))
    fs.copyFileSync(`${fontsPath}/${fontName}.ttf`, path.join(fontVenusDir, `${fontName}.ttf`))

    const pubspec = fs.readFileSync(pubspecPath, {encoding: 'utf8', flag: 'r'})
    fs.writeFileSync(pubspecPath, pubspec.replace(/fonts\/iconz\/Iconz\d+\.ttf/, `fonts/iconz/${fontName}.ttf`), {flag: 'w+'})

    let code =
        `// ignore_for_file: avoid_redundant_argument_values, constant_identifier_names
import 'package:flutter/widgets.dart';

class ${className} {
  ${className}._();

  static const _kFontFam = '${className}';
 
`

    for (const match of matches) {
        const name = match[1].replaceAll('-', '_')
        const uni = match[2]
        code += `static const IconData ${name} = IconData(0x${uni}, fontFamily: _kFontFam);\n`
    }

    code += '}\n'

    fs.writeFileSync(codeVenusFile, code, {flag: 'w+'})
}

svgtofont({
    src: iconsPath,
    dist: fontsPath,
    fontName: fontName,
    css: true,
    startUnicode: 0xe800,
    emptyDist: true,
    svgicons2svgfont: {
        fontHeight: 1000,
        normalize: true
    },
}).then(complete)
