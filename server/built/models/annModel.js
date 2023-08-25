"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var annSchema = new mongoose_1["default"].Schema({
    network: Object
});
exports["default"] = mongoose_1["default"].model("ANN", annSchema);
