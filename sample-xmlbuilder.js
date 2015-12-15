/* sample-xmlbuilder.js */


var builder = require('xmlbuilder');


var xml = builder.create('productionsheet')
    .ele('board')
    .ele('workshop', 'EXASUD')
    .end({ pretty: true});

console.log(xml);