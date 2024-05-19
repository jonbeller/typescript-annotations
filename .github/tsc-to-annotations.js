const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('tsc_output.txt');

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const annotationCommand = (file, line, col, message) => {
  return `::error file=${file},line=${line},col=${col}::${message}`;
};

rl.on('line', (line) => {
  const match = line.match(/^(.*\.ts)\((\d+),(\d+)\): (.*)$/);
  if (match) {
    const [_, file, line, col, message] = match;
    console.log(annotationCommand(file, line, col, message));
  }
});