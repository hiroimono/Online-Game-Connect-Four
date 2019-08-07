const http = require('http');
const fs = require ('fs');
const path = require('path');
const readDirectory = require("./readDirectory.js");
const ca = require("chalk-animation");

// const ca = require("chalk-animation");

// for first mothod;
// {
// 	'/panes/index.html':
// }

// //first method
// const validUrls = {};
// const projects = fs.readdirSync(__dirname+'/projects');

let readProject = readDirectory('/projects');

http.createServer((req, res) => {
    req.on("error", err => console.log("req err: ", err));
    res.on("error", err => console.log("res err: ", err));
    // //for first method
    // if (validUrls[req.url]){
    //
    // } else{
    // 	res.statusCode = 404;
    // 	return res.end();
    // }

    if (req.method != 'GET') {
        res.statusCode = 405;
        res.end();
        return;
    }

    const myPath = path.normalize( `${__dirname}/projects/${req.url}`);
    console.log(myPath);

    if (!myPath.startsWith(path.normalize(__dirname + '/projects'))){
        req.statusCode = 403;
        console.log('Directory is not start with "../projects.." !');
        return res.end();
    }

    if (req.url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(readProject);
        return;
    }

    //second method
    fs.stat(decodeURI(myPath), (err, stats) => {
        if(err){
            res.statusCode = 404;
            console.log(`Stat error: `, err);
            return res.end();
        }

        if (stats.isDirectory()){
            if (req.url.endsWith('/')){
                const readStreamIndex = fs.createReadStream(decodeURI(path.normalize(`${myPath}/index.html`)));
                res.setHeader('Content-Type', 'text/html');
                readStreamIndex.pipe(res);
                readStreamIndex.on('error', (err) => {
                    console.log('Read Stream Index Error: ', err);
                    res.statusCode = 404;
                    res.end();
                });
            } else {
                res.setHeader('Location', `${req.url}/`);
                res.statusCode = 302;
                res.end();
            }

        } else {

            function contentType(myPath){
                let type = path.parse(myPath).ext;
                let typeWithoutDot = type.slice(1);
                if (type == '.html') return `text/${typeWithoutDot}`;
                if (type == '.css') return `text/${typeWithoutDot}`;
                if (type == '.js') return `text/${typeWithoutDot}`;
                if (type == '.json') return `application/${typeWithoutDot}`;
                if (type == '.gif') return `image/${typeWithoutDot}`;
                if (type == '.jpg') return `image/${typeWithoutDot}`;
                if (type == '.png') return `image/${typeWithoutDot}`;
                if (type == '.svg') return `application/${typeWithoutDot}+xml`;
            }

            res.setHeader('Content-Types', contentType(myPath));
            const readStream = fs.createReadStream(decodeURI(myPath));
            readStream.pipe(res);
            readStream.on('error', (err) => {
                console.log('readStream Error: ', err);
                res.statusCode = 404;
                res.end();
            });
        }
    });
}).listen(8080, () => ca.neon("Port 8080 listening"));
