const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const cors = require('cors');

const adminRouter = require('./routes/adminroute');
const userRouter = require('./routes/routes');
const taskRouter = require('./routes/taskroute');
const orderRouter = require('./routes/orderroute');

// const { errormiddleware } = require('./error/error');
const middleWare = require('./middleware/middlware');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    dbName: "backend",
}).then(() => console.log("db is connected successfully."))
.catch((e) => console.log(e));



// adding middlware read the requested values
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
// app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/v1", adminRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);
app.use("/api/v1", orderRouter);

// error middleware
app.use(middleWare);


app.listen(process.env.PORT, () => {
    console.log(`server is running successfully.`)
});



