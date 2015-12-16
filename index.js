/* index.js */

exports.handler = function(event, context) {
    console.log("start\n");
    if( (event !== undefined) && (event.Board !== undefined) ) {
        var builder = require('xmlbuilder');

        //-- XML start
        var xml = builder.create('PRODUCTIONSHEET',{version: '1.0', encoding: 'UTF-8'});

            //-- Board start
            xml = xml.com('board details').ele('BOARD');
                if(event.Board.Main !== undefined) {
                    if(event.Board.Main.Workshop) {
                        xml = addTo(xml,getValue(event.Board.Main.Workshop.Name),'WORKSHOPMAIN','main workshop name/code');
                        xml = addTo(xml,getValue(event.Board.Main.Number),'IDBOARDMAIN','main board number');
                    }
                }
                if(event.Board.Sub !== undefined && (event.Board.Sub).length > '0') {
                    for (var i = 0; i < (event.Board.Sub).length; i++) {
                        if(event.Board.Sub[i].Workshop) {
                            addTo(xml,getValue(event.Board.Sub[i].Workshop.Name),'WORKSHOPSUB_'+[i+1]+'','sub workshop name');
                            xml = addTo(xml,getValue(event.Board.Sub[i].Number),'IDBOARDSUB_'+[i+1]+'','sub board number');
                        }
                    }
                }
                xml = addTo(xml,getValue(event.Board.ProductionActivity),'ACTIVITY','kind of production activity');
                xml = addTo(xml,getValue(event.Board.Price),'PRICE','board price');
                xml = addTo(xml,getValue(event.Board.NbOrder),'NBORDER','number of orders');
                xml = addTo(xml,getValue(event.Board.Title),'TITLE','board summary');
                xml = addTo(xml,getValue(event.Board.DateCreation),'DATECREATION','creation date of the board');
                xml = addTo(xml,getValue(event.Board.DateShippingWithoutFinish),'DATESHIPPINGWITHOUTFINISH','shipping date for order without finishing step');
                xml = addTo(xml,getValue(event.Board.DateShippingWithFinish),'DATESHIPPINGWITHFINISH','shipping date for order with finishing step');
                xml = addTo(xml,getValue(event.Board.PrintMethod),'PRINTMETHOD','the kind of print method');
                xml = addTo(xml,getValue(event.Board.CommentBoard),'COMMENTBOARD','technical comments');

                //-- Media
                xml = xml.com('media details').ele('MEDIA');
                if(event.Board.Media !== undefined) {
                    xml = addTo(xml, getValue(event.Board.Media.Kind), 'KIND', 'media kind');
                    xml = addTo(xml, getValue(event.Board.Media.Size), 'SIZE', 'size of media');
                    xml = addTo(xml, getValue(event.Board.Media.Quantity), 'QUANTITY', 'media quantity');
                }
                xml = xml.up();

                //-- Operator
                xml = xml.com('operator details').ele('OPERATOR');
                if(event.Board.Operator !== undefined) {
                    xml = addTo(xml, getValue(event.Board.Operator.Name), 'NAME', 'operator name');
                    xml = addTo(xml, getValue(event.Board.Operator.SurName), 'SURNAME', 'operator surname');
                    xml = addTo(xml, getValue(event.Board.Operator.Mail), 'MAIL', 'operator mail');
                }
                xml = xml.up();

            //-- Board end
            xml = xml.up();

        //-- XML end
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
    function addTo(xml,value,name,com)
    {
        if(value!=""){ return xml.com(com).ele(name).txt(value).up(); }
        else { return xml.com(com).ele(name).up(); }
    }
};