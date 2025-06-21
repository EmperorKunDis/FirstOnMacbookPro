const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceMemberTemplate = (temp, member) => {
    let output = temp.replace(/{%NAME%}/g, member.username);
    output = output.replace(/{%RANK%}/g, member.rank);
    output = output.replace(/{%POINTS%}/g, member.activityPercentage || 0);
    output = output.replace(/{%ORIGIN%}/g, member.origin);
    output = output.replace(/{%ROLE%}/g, member.role);
    return output;
    };

const tempMember = fs.readFileSync(`${__dirname}/template/template-member.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/template/template-overview.html`, 'utf-8');
const tempRank = fs.readFileSync(`${__dirname}/template/template-rank.html`, 'utf-8');
const tempRankLine = fs.readFileSync(`${__dirname}/template/template-rankline.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const jsonData = JSON.parse(data);
const guildmemberProfile = jsonData.players;

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = guildmemberProfile
            .map(el => replaceMemberTemplate(tempMember, el))
            .join('');
        
        const finalHtml = tempOverview.replace('{%MEMBER_CARDS%}', cardsHtml);
        res.end(finalHtml);

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

server.listen(8000, '127.0.0.1', () => {
    console.log('Guild Ranking Server listening on port 8000');
});
