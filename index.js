const fs = require('fs');
const http = require('http');
const url = require('url');

const tempMember = (temp, member) => {
    let output = temp.replace(/{%NAME%}/g, member.name);
    output = output.replace(/{%RANK%}/g, member.rank);
    output = output.replace(/{%POINTS%}/g, member.points);
    return output;
    };


const tempMember = fs.readFileSync(`${__dirname}/template/template-member.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/template/template-overview.html`, 'utf-8');
const tempRank = fs.readFileSync(`${__dirname}/template/template-rank.html`, 'utf-8');
const tempRankLine = fs.readFileSync(`${__dirname}/template/template-rankline.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const guildmemberProfile = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const tempOverview = guildmemberProfile
            .map(el => { return tempMember })
            .join('');
        
        res.end(tempOverview);

    } else if (pathName === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end('This is the PRODUCT');

    } else if (pathName === '/api') {        
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>Page not found</h1>');
    }
});
