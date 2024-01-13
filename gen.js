const svgtofont = require('svgtofont')
const path = require('path')
const fs = require('fs')

const venus = './../venus_agency'

const vfile = './version.txt'
const version = +fs.readFileSync(vfile, {encoding: 'utf8', flag: 'r'}) + 1
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
    let matches = scss.matchAll(/\$[a-z]+\d+-([a-z_0-9-]+):\s*"\\([a-z0-9]+)"\s*;/gmi)

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

/*
// ignore_for_file: avoid_redundant_argument_values, constant_identifier_names

import 'package:flutter/widgets.dart';

class Iconz {
  Iconz._();

  static const _kFontFam = 'Iconz';
  static const String? _kFontPkg = null;

  static const IconData profile_up = IconData(0xe800, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData aquarius = IconData(0xe801, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData aries = IconData(0xe802, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData ban = IconData(0xe803, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData bookmark_fill = IconData(0xe804, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData bookmark = IconData(0xe805, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData calendar = IconData(0xe806, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData cancer = IconData(0xe807, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData capricorn = IconData(0xe808, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData chevron_down = IconData(0xe809, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData claim = IconData(0xe80a, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData crown = IconData(0xe80b, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData events = IconData(0xe80c, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData filter = IconData(0xe80d, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData gemini = IconData(0xe80e, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData heart = IconData(0xe80f, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData info = IconData(0xe810, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData leo = IconData(0xe811, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData libra = IconData(0xe812, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData message = IconData(0xe813, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData photo = IconData(0xe814, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData pin = IconData(0xe815, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData pisces = IconData(0xe816, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData profile_model = IconData(0xe817, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData purse = IconData(0xe818, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData real = IconData(0xe819, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData sagittarius = IconData(0xe81a, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData scorpio = IconData(0xe81b, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData search_female = IconData(0xe81c, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData setting = IconData(0xe81d, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData sign_in = IconData(0xe81e, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData sign_out = IconData(0xe81f, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData sign_up = IconData(0xe820, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData star5 = IconData(0xe821, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData taurus = IconData(0xe822, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData top_star = IconData(0xe823, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData trash = IconData(0xe824, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData undo = IconData(0xe825, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData unit = IconData(0xe826, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData up_down_arrow_circle = IconData(0xe827, fontFamily: _kFontFam, fontPackage: _kFontPkg);
  static const IconData virgo = IconData(0xe828, fontFamily: _kFontFam, fontPackage: _kFontPkg);
}


 */
