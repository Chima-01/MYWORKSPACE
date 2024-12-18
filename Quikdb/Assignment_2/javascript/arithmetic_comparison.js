const readline = require('readline');
const { stdin: input, stdout: output, exit } = require('process');

const program = readline.createInterface(input, output);

program.write(`============================================================================================================
      This program will assist you in calculating the area of a Rectangle and possibly a Square.
============================================================================================================
  
  `);
program.question('Input the length of the Rectangle: ', (length) => {
  program.question('Input the length of the Width: ', (width) => {
    if (isNaN(length) || isNaN(width)) {
      console.log('please provide a valid Number!.');
      exit(1);
    }

    const area = Number(length) * Number(width);

    if (area > 100) { console.log(`${area}cm² is greater than 100cm²`);}
    else if (area === 100) { console.log(`${area}cm² is equal to 100cm²`);}
    else { console.log(`${area}cm² is less than 100cm²`);} 
    exit(0);
  });
});