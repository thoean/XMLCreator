/* index.js */

exports.handler = function(event, context) {

    console.log("start\n");

    if (event !== undefined) {

        var builder = require('xmlbuilder');

        //-- board
        var psAtelier = "";
        var pnIdPlanche = "";
        var psActiviteDeProd = "";
        var pnPrice = "";
        var pnNbOrder = "";
        var psTitle = "";
        var pdDateCreation = "";
        var pdDateShippingWithoutFinish = "";
        var pdDateShippingWithFinish = "";
        var psPrintMethod = "";
        var psCommentBoard = "";
        if(event.psAtelier != undefined)                    {psAtelier = event.psAtelier;}
        if(event.pnIdPlanche != undefined)                  {pnIdPlanche = event.pnIdPlanche;}
        if(event.psActiviteDeProd != undefined)             {psActiviteDeProd = event.psActiviteDeProd;}
        if(event.pnPrice != undefined)                      {pnPrice = event.pnPrice;}
        if(event.pnNbOrder != undefined)                    {pnNbOrder = event.pnNbOrder;}
        if(event.psTitle != undefined)                      {psTitle = event.psTitle;}
        if(event.pdDateCreation != undefined)               {pdDateCreation = event.psTitle;}
        if(event.pdDateShippingWithoutFinish != undefined)  {pdDateShippingWithoutFinish = event.pdDateShippingWithoutFinish;}
        if(event.pdDateShippingWithFinish != undefined)     {pdDateShippingWithFinish = event.pdDateShippingWithFinish;}
        if(event.psPrintMethod != undefined)                {psPrintMethod = event.psPrintMethod;}
        if(event.psCommentBoard != undefined)               {psCommentBoard = event.psCommentBoard;}

        //-- media
        var psMedia = "";
        var psSize = "";
        var pnQuantity = "";
        if(event.psMedia != undefined)      {psMedia = event.psMedia;}
        if(event.psSize != undefined)       {psSize = event.psSize;}
        if(event.pnQuantity != undefined)   {pnQuantity = event.pnQuantity;}

        //-- operator
        var psOperatorName = "";
        var psOperatorSurName = "";
        var psOperatorMail = "";
        if(event.psOperatorName != undefined)       {psOperatorName = event.psOperatorName;}
        if(event.psOperatorSurName != undefined)    {psOperatorSurName = event.psOperatorSurName;}
        if(event.psOperatorMail != undefined)       {psActiviteDeProd = event.psOperatorMail;}

        //-- build XML
        var xml = builder.create('productionsheet',{version: '1.0', encoding: 'UTF-8'});

            //-- board
            xml = xml.com('board details').ele('board');
                xml = getNode(xml,psAtelier,'workshop','workshop name/code');

                xml = xml.com('board number').ele('idplanche');if(pnIdPlanche!=""){xml = xml.txt(pnIdPlanche);}xml = xml.up();
                xml = xml.com('kind of production activity').ele('activity');if(psActiviteDeProd!=""){xml = xml.txt(psActiviteDeProd);}xml = xml.up();

                xml = xml.com('board price').ele('price').txt(pnPrice).up();
                xml = xml.com('number of orders').ele('nborder').txt(pnNbOrder).up();
                xml = xml.com('board summary').ele('title').txt(psTitle).up();
                xml = xml.com('creation date of the board').ele('datecreation').txt(pdDateCreation).up();
                xml = xml.com('shipping date for order without finishing step').ele('shippingdatewithoutfinish').txt(pdDateShippingWithoutFinish).up();
                xml = xml.com('shipping date for order with finishing step').ele('shippingdatewithfinish').txt(pdDateShippingWithFinish).up();
                xml = xml.com('the kind of print method').ele('printmethod').txt(psPrintMethod).up();
                xml = xml.com('technical comments').ele('commentboard').txt(psCommentBoard).up();

                //-- media
                xml = xml.com('media details').ele('media');
                    xml = xml.com('media kind').ele('kind').txt(psMedia).up();
                    xml = xml.com('size of media').ele('size').txt(psSize).up();
                    xml = xml.com('media quantity').ele('quantity').txt(pnQuantity).up();
                xml = xml.up();

                //-- operator
                xml = xml.com('operator details').ele('operator');
                    xml = xml.com('operator name').ele('name').txt(psOperatorName).up();
                    xml = xml.com('operator surname').ele('surname').txt(psOperatorSurName).up();
                    xml = xml.com('operator mail').ele('mail').txt(psOperatorMail).up();
                xml = xml.up();

            //-- end board
            xml = xml.up();

        //-- end xml
        xml = xml.end({ pretty: true});

        //-- print resu
        context.succeed(xml);
    }
    console.log("end\n");

    function getNode(xml,value,name,com)
    {
        if(value!=""){ return xml.com(com).ele(name).txt(value).up(); }

        else { return xml.com(com).ele(name).up(); }
    }
};