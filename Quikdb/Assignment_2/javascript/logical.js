const readline = require('readline');
const { stdin: input, stdout: output, exit } = require('process');

const program = readline.createInterface(input, output);

program.write(`============================================================================================================
          This program will check if a number is between 10 and 20.
          logs 'Valid' if true else 'Invalid'. 
============================================================================================================

`);

program.question('Input a Number: ', (num) => {
  if (isNaN(num)) {
    console.log(`Please provide a valid Number!.`);
    exit(1);
  }
  const number = Number(num);
  if (number >= 10 && number <= 20) { console.log(`Valid!.`); }
  else { console.log(`Invalid!.`); }
  exit(0);
});