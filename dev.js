/* sample-xmlbuilder.js */


if (event !== undefined) {

    var builder = require('xmlbuilder');
    var constructor = builder.create();

    var psAtelier = "";
    var pnIdPlanche = "";

    if(event.psAtelier != undefined){psAtelier = event.psAtelier;}
    if(event.pnIdPlanche != undefined){pnIdPlanche = event.pnIdPlanche;}

    constructor.begin('productionsheet')
        .ele('board')
            .ele('workshop')
                .txt(psAtelier)
            .up()
            .ele('number')
                .txt(pnIdPlanche)
            .up()
            .ele('activity')
                .txt(event.psActiviteDeProd)
            .up()
            .ele('price')
                .txt(event.pnPrice)
            .up()
            .ele('nborder')
                .txt(event.pnNbOrder)
            .up()
            .ele('title')
                .txt(event.psTitle)
            .up()
            .ele('datecreation')
                .txt(event.pdDateCreation)
            .up()
            .ele('shippingdatewithoutfinition')
                .txt(event.pdDateShippingWithoutFinish)
            .up()
            .ele('shippingdatewithfinition')
                .txt(event.pdDateShippingWithFinish)
            .up()
            .ele('printmethod')
                .txt(event.psPrintMethod)
            .up()
            .ele('commentboard')
                .txt(event.psCommentBoard)
            .up()
            .ele('media')
                .ele('kind')
                    .txt(event.psMedia)
                .up()
                .ele('size')
                    .txt(event.psSize)
                .up()
                .ele('quantity')
                    .txt(event.pnQuantity)
                .up()
            .up()
        .up();

    var xml = constructor.toString({pretty: true});
    console.log(xml);
}