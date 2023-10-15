const fs = require('fs');
const result = require('./nodeshowtestresult');
// console.log(result);

const response = result.testResults();
// const lastresult = fs.readFileSync('./nodeshowtestresult.js', 'utf-8');

console.log('lastResulr:', response);