const fs = require('fs');
const path = require('path');

module.exports = function readDirectory(dir){
    let pathDir = path.normalize( __dirname + `${dir}`);
    let files = fs.readdirSync(pathDir);
    let html = `<h1>Portfolio</h1><ul>`;

    for (let i = 0; i < files.length; i++){
        let pathFiles = path.normalize( __dirname + `${dir}/${files[i]}`);
        let stats = fs.statSync(pathFiles);
        if (stats.isFile()){
            console.log(`${files[i]} is a file`);
        } else {
            html += `<li><a href="/${files[i]}/">${files[i]}</a></li>`;
        }
    }
    // console.log(html);
    return `${html}</ul>`;
};
