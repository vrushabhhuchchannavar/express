window.jest_html_reporters_callback__({"numFailedTestSuites":1,"numFailedTests":1,"numPassedTestSuites":1,"numPassedTests":9,"numPendingTestSuites":0,"numPendingTests":2,"numRuntimeErrorTestSuites":0,"numTodoTests":0,"numTotalTestSuites":2,"numTotalTests":12,"startTime":1697090384674,"success":false,"testResults":[{"numFailingTests":1,"numPassingTests":8,"numPendingTests":2,"numTodoTests":0,"perfStats":{"end":1697090385942,"runtime":1236,"slow":false,"start":1697090384706},"testFilePath":"/home/vrushabh/projects/practice/test/user.test.js","failureMessage":"\u001b[1m\u001b[31m  \u001b[1m● \u001b[22m\u001b[1mtsets › Update User Credentials › it should update the user\u001b[39m\u001b[22m\n\n    \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoBeTruthy\u001b[2m()\u001b[22m\n\n    Received: \u001b[31mfalse\u001b[39m\n\u001b[2m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 118 |\u001b[39m             expect(response\u001b[33m.\u001b[39mbody\u001b[33m.\u001b[39mresult)\u001b[33m.\u001b[39mtoBeDefined()\u001b[33m;\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 119 |\u001b[39m             expect(response\u001b[33m.\u001b[39mbody\u001b[33m.\u001b[39mresult\u001b[33m.\u001b[39mname \u001b[33m==\u001b[39m updateuserDto\u001b[33m.\u001b[39mstring)\u001b[33m.\u001b[39mtoBeTruthy()\u001b[33m;\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[2m\u001b[39m\u001b[90m 120 |\u001b[39m             expect(response\u001b[33m.\u001b[39mbody\u001b[33m.\u001b[39mresult\u001b[33m.\u001b[39mpassword \u001b[33m==\u001b[39m updateuserDto\u001b[33m.\u001b[39mpassword)\u001b[33m.\u001b[39mtoBeTruthy()\u001b[33m;\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m     |\u001b[39m                                                                             \u001b[31m\u001b[1m^\u001b[22m\u001b[2m\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 121 |\u001b[39m         })\u001b[33m;\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 122 |\u001b[39m\u001b[0m\u001b[22m\n\u001b[2m    \u001b[0m \u001b[90m 123 |\u001b[39m         it(\u001b[32m'it should fail if user is does not exists'\u001b[39m\u001b[33m,\u001b[39m \u001b[36masync\u001b[39m() \u001b[33m=>\u001b[39m {\u001b[0m\u001b[22m\n\u001b[2m\u001b[22m\n\u001b[2m      \u001b[2mat Object.toBeTruthy (\u001b[22m\u001b[2m\u001b[0m\u001b[36mtest/user.test.js\u001b[39m\u001b[0m\u001b[2m:120:77)\u001b[22m\u001b[2m\u001b[22m\n","testResults":[{"ancestorTitles":["tsets","Registration The User"],"duration":125,"failureMessages":[],"fullName":"tsets Registration The User it should cereate a user","status":"passed","title":"it should cereate a user"},{"ancestorTitles":["tsets","Registration The User"],"duration":80,"failureMessages":[],"fullName":"tsets Registration The User it should fail if user is already exists","status":"passed","title":"it should fail if user is already exists"},{"ancestorTitles":["tsets","Update User Credentials"],"duration":89,"failureMessages":["Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoBeTruthy\u001b[2m()\u001b[22m\n\nReceived: \u001b[31mfalse\u001b[39m\n    at Object.toBeTruthy (/home/vrushabh/projects/practice/test/user.test.js:120:77)\n    at processTicksAndRejections (internal/process/task_queues.js:95:5)"],"fullName":"tsets Update User Credentials it should update the user","status":"failed","title":"it should update the user"},{"ancestorTitles":["tsets","Update User Credentials"],"duration":9,"failureMessages":[],"fullName":"tsets Update User Credentials it should fail if user is does not exists","status":"passed","title":"it should fail if user is does not exists"},{"ancestorTitles":["tsets","Delete The User"],"duration":80,"failureMessages":[],"fullName":"tsets Delete The User it should delete the user","status":"passed","title":"it should delete the user"},{"ancestorTitles":["tsets","Delete The User"],"duration":12,"failureMessages":[],"fullName":"tsets Delete The User it should fail if user is does not exists","status":"passed","title":"it should fail if user is does not exists"},{"ancestorTitles":["tsets","Login The User"],"duration":78,"failureMessages":[],"fullName":"tsets Login The User it should login with user credentials","status":"passed","title":"it should login with user credentials"},{"ancestorTitles":["tsets","Login The User"],"duration":7,"failureMessages":[],"fullName":"tsets Login The User it should fail if email and password is incorrect","status":"passed","title":"it should fail if email and password is incorrect"},{"ancestorTitles":["tsets","logout"],"duration":5,"failureMessages":[],"fullName":"tsets logout it should logout","status":"passed","title":"it should logout"},{"ancestorTitles":["tsets","Get User"],"duration":null,"failureMessages":[],"fullName":"tsets Get User it should get the user","status":"pending","title":"it should get the user"},{"ancestorTitles":["tsets","Get All Users"],"duration":null,"failureMessages":[],"fullName":"tsets Get All Users it should getAll users","status":"pending","title":"it should getAll users"}]},{"numFailingTests":0,"numPassingTests":1,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1697090386188,"runtime":238,"slow":false,"start":1697090385950},"testFilePath":"/home/vrushabh/projects/practice/test/admin.test.js","failureMessage":null,"testResults":[{"ancestorTitles":["admin test","create admin"],"duration":69,"failureMessages":[],"fullName":"admin test create admin it should search for the user","status":"passed","title":"it should search for the user"}]}],"config":{"bail":0,"changedFilesWithAncestor":false,"ci":false,"collectCoverage":false,"collectCoverageFrom":[],"coverageDirectory":"/home/vrushabh/projects/practice/coverage","coverageProvider":"babel","coverageReporters":["json","text","lcov","clover"],"detectLeaks":false,"detectOpenHandles":true,"errorOnDeprecated":false,"expand":false,"findRelatedTests":false,"forceExit":false,"json":false,"lastCommit":false,"listTests":false,"logHeapUsage":false,"maxConcurrency":5,"maxWorkers":1,"noStackTrace":false,"nonFlagArgs":[],"notify":false,"notifyMode":"failure-change","onlyChanged":false,"onlyFailures":false,"openHandlesTimeout":1000,"passWithNoTests":false,"projects":[],"reporters":[["default",{}],["/home/vrushabh/projects/practice/node_modules/jest-html-reporters/index.js",{"pageTitle":"Test Report"}]],"rootDir":"/home/vrushabh/projects/practice","runTestsByPath":false,"seed":-594798217,"skipFilter":false,"snapshotFormat":{"escapeString":false,"printBasicPrototype":false},"testFailureExitCode":1,"testPathPattern":"","testSequencer":"/home/vrushabh/.npm-global/lib/node_modules/jest/node_modules/@jest/test-sequencer/build/index.js","updateSnapshot":"new","useStderr":false,"watch":false,"watchAll":false,"watchman":true,"workerThreads":false},"endTime":1697090386191,"_reporterOptions":{"publicPath":"/home/vrushabh/projects/practice","filename":"jest_html_reporters.html","expand":false,"pageTitle":"Test Report","hideIcon":false,"testCommand":"","openReport":false,"failureMessageOnly":0,"enableMergeData":false,"dataMergeLevel":1,"inlineSource":false,"urlForTestFiles":"","darkTheme":false,"includeConsoleLog":false},"logInfoMapping":{},"attachInfos":{}})