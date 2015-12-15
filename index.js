/* index.js */

exports.handler = function(event, context) {
    console.log("start");

    var builder = require('xmlbuilder');

    var xml = builder.create('manufacturingsheet')
        .ele('board')
        .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
        .end({ pretty: true});

    context.succeed(xml);

    console.log("end");

};