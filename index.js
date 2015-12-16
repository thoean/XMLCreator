/* index.js */

exports.handler = function(event, context) {

    console.log("start\n");

    if( (event !== undefined) && (event.Board !== undefined) ) {

        var builder = require('xmlbuilder');

        //-- media
        var psMedia = "";
        var psSize = "";
        var pnQuantity = "";
        //if(event.Board.Media.Kind != undefined)     {psMedia = event.Board.Media.Kind;}
        //if(event.Board.Media.Size != undefined)     {psSize = event.Board.Media.Size;}
        //if(event.Board.Media.Quantity != undefined) {pnQuantity = event.Board.Media.Quantity;}

        //-- operator
        var psOperatorName = "";
        var psOperatorSurName = "";
        var psOperatorMail = "";
        //if(event.Board.Operator.Name != undefined)       {psOperatorName = event.Board.Operator.Name;}
        //if(event.Board.Operator.SurName != undefined)    {psOperatorSurName = event.Board.Operator.SurName;}
        //if(event.Board.Operator.Mail != undefined)       {psOperatorMail = event.Board.Operator.Mail;}

        //-- option
        //var asSpec = "";
        //console.info(event.Board.Spec[1].Name);
        //console.info(event.Board.Spec[1].Front);

        //-- build XML
        var xml = builder.create('productionsheet',{version: '1.0', encoding: 'UTF-8'});

            //-- board
            xml = xml.com('board details').ele('board');
                if(event.Board.Main !== undefined) {
                    if(event.Board.Main.Workshop) { xml = getNode(xml,getValue(event.Board.Main.Workshop.Name),'workshopmain','main workshop name/code'); }
                    xml = getNode(xml,getValue(event.Board.Main.Number),'idboardmain','main board number');
                }

                if(event.Board.Sub !== undefined && (event.Board.Sub).length > '0') {
                    for (var i = 0; i < (event.Board.Sub).length; i++) {
                        if(event.Board.Sub[i].Workshop) { getNode(xml,getValue(event.Board.Sub[i].Workshop.Name),'workshopsub_'+[i+1]+'','sub workshop name/code'); }
                        xml = getNode(xml,getValue(event.Board.Sub[i].Number),'idboardsub_'+[i+1]+'','sub board number');
                    }
                }

                xml = getNode(xml,getValue(event.Board.ProductionActivity),'activity','kind of production activity');
                xml = getNode(xml,getValue(event.Board.Price),'price','board price');
                xml = getNode(xml,getValue(event.Board.NbOrder),'nborder','number of orders');
                xml = getNode(xml,getValue(event.Board.Title),'title','board summary');
                xml = getNode(xml,getValue(event.Board.DateCreation),'datecreation','creation date of the board');
                xml = getNode(xml,getValue(event.Board.DateShippingWithoutFinish),'shippingdatewithoutfinish','shipping date for order without finishing step');
                xml = getNode(xml,getValue(event.Board.DateShippingWithFinish),'shippingdatewithfinish','shipping date for order with finishing step');
                xml = getNode(xml,getValue(event.Board.PrintMethod),'printmethod','the kind of print method');
                xml = getNode(xml,getValue(event.Board.CommentBoard),'commentboard','technical comments');

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

    // -- function to get value if undefined
    function getValue(string)
    {
        if(string != undefined) {return string;}
        else return "";
    }

    // -- function to build node with value or not
    function getNode(xml,value,name,com)
    {
        if(value!=""){ return xml.com(com).ele(name).txt(value).up(); }

        else { return xml.com(com).ele(name).up(); }
    }
};