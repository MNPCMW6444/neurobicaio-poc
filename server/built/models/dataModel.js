"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var dataSchema = new mongoose_1["default"].Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    data: String
});
exports["default"] = mongoose_1["default"].model("DATA", dataSchema);
