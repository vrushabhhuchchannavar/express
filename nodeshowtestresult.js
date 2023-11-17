
const fs = require('fs');


const jsContent = fs.readFileSync('./jest-html-reporters-attach/jest_html_reporters/result.js', 'utf8');

// Extract the JSON data
const jsonStart = jsContent.indexOf('{');
const jsonEndl = jsContent.lastIndexOf('}');
console.log(jsonEndl);
const jsonEnd = jsContent.lastIndexOf('}') + 1;
console.log(jsonEnd);
const jsonData = jsContent.substring(jsonStart, jsonEnd);


// Parse the JSON data
try {
  const parsedData = JSON.parse(jsonData);
//   console.log('parsedData:', parsedData)

  let resultArray = parsedData.testResults[0];
    // console.log('resultArray:', resultArray)

    const perfStats = resultArray.perfStats;

    let testResult = {
        passedTestCases: resultArray.numPassingTests,
        failedTestCases: resultArray.numFailingTests,
        pendingTestCases: resultArray.numPendingTests,
        performanceStats: perfStats
    }
 
  console.log("testResultResponses:", testResult)

} catch (error) {
  console.error('Error parsing JSON data:', error);
}













// const fs = require('fs');

// const fileContent = fs.readFileSync('./jest-html-reporters-attach/jest_html_reporters/result.js', 'utf8');
// console.log(fileContent)

// // Use a regular expression to extract the JSON part
// // const match = fileContent.match(/window\.jest_html_reporters_callback__\((.*?)\)/);
// const match = fileContent.match(/window\.jest_html_reporters_callback__\(([\s\S]*?)\)/);
// console.log('match:', match);

// if (match && match[1]) {
//     let jsonData = match[1];

//     let data = match[2];
//     console.log('data:', data)

//     jsonData = jsonData.replace(/\u001b\[[0-9;]*[mG]/g, ''); 
//     console.log('jsonData:', jsonData)
//     // Remove any escape sequences
//     jsonData = jsonData.replace(/\\"/g, '"');
//     // Parse the JSON data
//     try {
//         const data = JSON.parse(jsonData);
//         console.log(data); // This will output the JSON data
//     } catch (error) {
//         console.error("Error parsing JSON:", error);
//     }
// } else {
//     console.error("No JSON data found in the file.");
// }







// const d = require('./jest-html-reporters-attach/jest_html_reporters/result.js')

// const fileContent = fs.readFileSync('./jest-html-reporters-attach/jest_html_reporters/result.js', 'utf8');

// console.log('readingFile:', fileContent);
// const match = fileContent.match(/window\.jest_html_reporters_callback__\((.*?)\)/);

// console.log('jsonString:', match);


// if (match) {
//     const jsonData = match[1];
//     console.log('jsonData:', jsonData);
//     const result = jsonData.testResults;
//     console.log('result:', result)
//     const data = JSON.parse(jsonData);
//     console.log(data); // This will output the JSON data
//   } else {
//     console.error("No JSON data found in the file.");
//   }


