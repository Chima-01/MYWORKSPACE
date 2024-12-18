"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var process = require("process");
var input = process.stdin, output = process.stdout, exit = process.exit;
function temperatureConvert(temp, unit) {
    if (isNaN(temp)) {
        console.log('Please Provide a valid number!');
        program.close();
    }
    var convertTemp;
    var lowerCase = unit.toLowerCase();
    if (lowerCase === 'c') {
        convertTemp = ((temp * 9 / 5) + 32);
    }
    else if (lowerCase === 'f') {
        convertTemp = ((temp - 32) * 5 / 9);
    }
    else {
        console.log('Please provide a valid unit!.');
        program.close();
    }
    console.log("Converted temperature: ".concat(convertTemp));
    program.close();
}
var program = readline.createInterface(input, output);
program.question('Enter temperature value: ', function (temp) {
    var temperature = Number(temp);
    var conversionPrompt = "Choose conversion: 'C' for Celcius to   Faherenheit, 'F' for Fahrenheit to Celsius: ";
    program.question(conversionPrompt, function (unit) {
        temperatureConvert(temperature, unit);
        program.close();
    });
});
program.on('close', function () {
    exit(0);
});
