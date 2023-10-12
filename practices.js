const fs = require('fs');

// Read the file content
const fileContent = fs.readFileSync('./jest-html-reporters-attach/jest_html_reporters/result.js', 'utf8');

// Extract the JSON part from the content
const jsonRegex = /window\.jest_html_reporters_callback__\(([^)]+)\)/;
// const jsonMatch = fileContent.match(jsonRegex);
const jsonMatch = fileContent.match(jsonRegex);
// console.log('jsonMatch:', jsonMatch)

if (jsonMatch && jsonMatch[1]) {
    const jsonString = jsonMatch[1];
    console.log('jsonString:', jsonString)
    // Parse the JSON content
    try {
        const jsonData = JSON.parse(jsonString);
        const testResults = jsonData.testResults;

        // Log the "testResults" array
        console.log(testResults);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
} else {
    console.error('JSON data not found in the file.');
}
