const express = require("express");
const studentRouter = require("./routes/studentRoute");
const sendResponse = require("./utils/sendResponse")
const router = express();

router.use(express.json());
router.use("/api",studentRouter);

router.use((req, res, next) => {next(new Error(`Could not handle request to ${req.url}`));});
router.use((err, req, res, next) => {sendResponse(res,404,err.toString())});

module.exports = router;