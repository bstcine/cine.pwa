/**
 * Created by david on 2017/12/4.
 */
const path = require('path')
const fs = require('fs')
let file_paths = []
const ignore_files = ['.DS_Store', 'build-manifest.json']
const root_path = path.resolve(__dirname, '../build')

function read(dir) {
    let files = fs.readdirSync(dir)
    files.forEach(function (file) {
        if (ignore_files.indexOf(file) !== -1) return
        const file_path = path.resolve(dir, file)
        let stats = fs.statSync(file_path)
        if (stats.isDirectory()) {
            read(file_path)
        } else {
            file_paths.push(file_path.replace(root_path, ''))
        }
    })
}

function exec() {
    console.log('generate build-manifest.json begin')
    read(root_path)
    fs.writeFileSync(path.resolve(root_path, './build-manifest.json'), JSON.stringify(file_paths), 'utf-8');
    console.log('generate build-manifest.json done')
}

exec()