const readline = require('readline');
const { stdin: input, stdout: output, exit } = require('process');

const program = readline.createInterface(input, output);

program.question('Enter temperature value: ', (temperature) => {
  const temp = Number(temperature);

  if (isNaN(temp)) {
    console.log('Please Provide a valid number!');
    program.close();
  }

  const conversionPrompt = `Choose conversion: 'C' for Celcius to \
  Faherenheit, 'F' for Fahrenheit to Celsius: `

  program.question(conversionPrompt, (unit) => {
    let convertTemp;
    const lowerCase = unit.toLowerCase();
    
    if (lowercase === 'c') {
      convertTemp = ((temperature * 9/5) + 32);
    } else if (lowerCase === 'f') {
      convertTemp = ((temperature - 32) * 5/9);
    } else {
      console.log('Please provide a valid unit!.');
      program.close();
    }
    console.log(`Converted temperature: ${convertTemp}`);

  program.close();
});
});

program.on('close', () => {
  exit(0);
});