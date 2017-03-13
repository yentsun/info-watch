var five = require("johnny-five");
var EtherPortClient = require('etherport-client').EtherPortClient;
var InfiniteLoop = require('infinite-loop');
var moment = require('moment');

var board = new five.Board({
    port: new EtherPortClient({
        host: '192.168.0.102', // IP address of the ESP
        port: 3030
    }),
    timeout: 1e5,
    repl: false});



board.on('ready', function(){
    console.log('five ready');

    var lcd = new five.LCD({
        controller: "PCF8574AT"
    });


    moment.locale('ru');


    function addOne() {
        // lcd.cursor(0, 0).print(":bell:");
        var date = moment().format('L');
        var time = moment().format('LTS');
        lcd.cursor(0, 0).print(date);
        lcd.cursor(1, 0).print(time);
    }

    var il = new InfiniteLoop();
    il.add(addOne).setInterval(1000).run();


});