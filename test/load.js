// import axios from "axios";
const axios = require('axios');


// const response = axios.post("http://localhost:5000/api/v1/user/reg", {
//         name: '2c8ba9ae8b333f1138fa',
//         email: '2c8ba9ae8b333f1138fb',
//         password: '$2b$10$9OQ6MUirSsRs4xQysbw5EOXyf0w8fVBBPCFDrakQwHhutgkgZ5HSO'
// }).then((res) => {
//     console.log('>>>>>>>>>>', res)
// }).catch((err) => {
//     console.log('<<<<<<', err)
// });

// console.log('"response:', response)

// const response = axios({
//     method: 'post',
//     url: 'http://localhost:5000/api/v1/user/reg',
//     data: {
//         name: '2c8ba9ae8b333f1138fo',
//         email: '2c8bz@gmail.com',
//         password: '1246'
//     }
// }).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err);
// });


// // "load-test": "artillery run artillery.yml"

// const artillery = require('artillery');
// const fs = require('fs');

// const script = {
//   config: {
//     target: 'http://localhost:5000',
//     phases: [
//       {
//         duration: 60,
//         arrivalRate: 10,
//       },
//     ],
//   },
//   scenarios: [
//     {
//       flow: [
//         {
//           post: {
//             url: '/user/reg',
//             json: {
//                 "name": '2c8ba9ae8b333f1138fa',
//                 "email": '2c8bb@gmail.com',
//                 "password": '1245'
//             },
//           },
//         },
//       ],
//     },
//   ],
// };

// // Write the script to a temporary file
// const scriptFile = 'temp-artillery-script.json';
// fs.writeFileSync(scriptFile, JSON.stringify(script));

// // Run the test
// artillery.run(
//   scriptFile,
//   {
//     output: 'artillery-output.json',
//   },
//   (err, results) => {
//     if (err) {
//       console.error('Error running Artillery test:', err);
//     } else {
//       console.log('Artillery test completed successfully.');
//       console.log('Results:', results);
//     }

//     // Clean up the temporary script file
//     fs.unlinkSync(scriptFile);
//   }
// );


const req = axios({
    method: 'get',
    url: 'https://test.ecobillz.com/api/terminal/v2/settings',
    params: {
        outletId: '5399f44b9e4f689450221e3a'
    },
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiSmo5YmNMcnY5NWRpUjRCQloiLCJzZXNzaW9uSWQiOiJlMzA1NzE0ZS1mNDA3LTRhMWYtOWUyNS1mMmRiYjBkNzFmODAiLCJ0eXBlIjoiZG1zIiwic3RhdHVzIjp0cnVlfSwiaWF0IjoxNzE5OTE5Mjg5fQ.ycFRGjrbMZ9jo1SysTKIfJLo1OfU1NREiYpIZzRlLFU'
    }
}).then((res) => {
    console.log('res>>>', res);
}).catch((err) => {
    console.log('error:', err)
});