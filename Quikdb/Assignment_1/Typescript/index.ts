import * as readline from 'readline';
import * as process from 'process';
const { stdin: input, stdout: output, exit } = process;

function temperatureConvert(temp: number, unit: string) {

  if (isNaN(temp)) {
    console.log('Please Provide a valid number!');
    program.close();
  }

  let convertTemp;
  const lowerCase = unit.toLowerCase();
    
  if (lowerCase === 'c') {
      convertTemp = ((temp * 9/5) + 32);
  } else if (lowerCase === 'f') {
      convertTemp = ((temp - 32) * 5/9);
  } else {
      console.log('Please provide a valid unit!.');
      program.close();
  }
    console.log(`Converted temperature: ${convertTemp}`);

  program.close();
}

const program = readline.createInterface(input, output);

program.question('Enter temperature value: ', (temp: string) => {
  const temperature = Number(temp);
  const conversionPrompt = `Choose conversion: 'C' for Celcius to \
  Faherenheit, 'F' for Fahrenheit to Celsius: `

  program.question(conversionPrompt, (unit: string) => {
    temperatureConvert(temperature, unit);
    program.close();
  });
});

program.on('close', () => {
  exit(0);
});