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
        if(event.asBoard.psAtelier != undefined)                    {psAtelier = event.asBoard.psAtelier;}
        if(event.asBoard.pnIdPlanche != undefined)                  {pnIdPlanche = event.asBoard.pnIdPlanche;}
        if(event.asBoard.psActiviteDeProd != undefined)             {psActiviteDeProd = event.asBoard.psActiviteDeProd;}
        if(event.asBoard.pnPrice != undefined)                      {pnPrice = event.asBoard.pnPrice;}
        if(event.asBoard.pnNbOrder != undefined)                    {pnNbOrder = event.asBoard.pnNbOrder;}
        if(event.asBoard.psTitle != undefined)                      {psTitle = event.asBoard.psTitle;}
        if(event.asBoard.pdDateCreation != undefined)               {pdDateCreation = event.asBoard.psTitle;}
        if(event.asBoard.pdDateShippingWithoutFinish != undefined)  {pdDateShippingWithoutFinish = event.asBoard.pdDateShippingWithoutFinish;}
        if(event.asBoard.pdDateShippingWithFinish != undefined)     {pdDateShippingWithFinish = event.asBoard.pdDateShippingWithFinish;}
        if(event.asBoard.psPrintMethod != undefined)                {psPrintMethod = event.asBoard.psPrintMethod;}
        if(event.asBoard.psCommentBoard != undefined)               {psCommentBoard = event.asBoard.psCommentBoard;}

        //-- media
        var psMedia = "";
        var psSize = "";
        var pnQuantity = "";
        if(event.asBoard.asMedia.psMedia != undefined)      {psMedia = event.asBoard.asMedia.psMedia;}
        if(event.asBoard.asMedia.psSize != undefined)       {psSize = event.asBoard.asMedia.psSize;}
        if(event.asBoard.asMedia.pnQuantity != undefined)   {pnQuantity = event.asBoard.asMedia.pnQuantity;}

        //-- operator
        var psOperatorName = "";
        var psOperatorSurName = "";
        var psOperatorMail = "";
        if(event.asBoard.asOperator.psName != undefined)       {psOperatorName = event.asBoard.asOperator.psName;}
        if(event.asBoard.asOperator.psSurName != undefined)    {psOperatorSurName = event.asBoard.asOperator.psSurName;}
        if(event.asBoard.asOperator.psMail != undefined)       {psOperatorMail = event.asBoard.asOperator.psMail;}

        //-- option
        //var asSpec = "";
        console.info(event.asBoard.asSpec[1].recto);

        //-- build XML
        var xml = builder.create('productionsheet',{version: '1.0', encoding: 'UTF-8'});

            //-- board
            xml = xml.com('board details').ele('board');
                xml = getNode(xml,psAtelier,'workshop','workshop name/code');
                xml = getNode(xml,pnIdPlanche,'idplanche','board number');
                xml = getNode(xml,psActiviteDeProd,'activity','kind of production activity');
                xml = getNode(xml,pnPrice,'price','board price');
                xml = getNode(xml,pnNbOrder,'nborder','number of orders');
                xml = getNode(xml,psTitle,'title','board summary');
                xml = getNode(xml,pdDateCreation,'datecreation','creation date of the board');
                xml = getNode(xml,pdDateShippingWithoutFinish,'shippingdatewithoutfinish','shipping date for order without finishing step');
                xml = getNode(xml,pdDateShippingWithFinish,'shippingdatewithfinish','shipping date for order with finishing step');
                xml = getNode(xml,psPrintMethod,'printmethod','the kind of print method');
                xml = getNode(xml,psCommentBoard,'commentboard','technical comments');

                //-- media
                xml = xml.com('media details').ele('media');
                    xml = getNode(xml,psMedia,'kind','media kind');
                    xml = getNode(xml,psSize,'size','size of media');
                    xml = getNode(xml,pnQuantity,'quantity','media quantity');
                xml = xml.up();

                //-- operator
                xml = xml.com('operator details').ele('operator');
                    xml = getNode(xml,psOperatorName,'name','operator name');
                    xml = getNode(xml,psOperatorSurName,'surname','operator surname');
                    xml = getNode(xml,psOperatorMail,'mail','operator mail');
                xml = xml.up();

            //-- end board
            xml = xml.up();

        //-- end xml
        xml = xml.end({ pretty: true});

        //-- print resu
        context.succeed(xml);
    }
    console.log("end\n");

    // -- function to build node with value or not
    function getNode(xml,value,name,com)
    {
        if(value!=""){ return xml.com(com).ele(name).txt(value).up(); }

        else { return xml.com(com).ele(name).up(); }
    }
};