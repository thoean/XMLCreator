/* dev.js */

var builder = require('xmlbuilder');


var xml = builder.create('productionsheet',{version: '1.0', encoding: 'UTF-8'})
    .ele('board')


    .up()

    .end({ pretty: true});

console.log(xml);
