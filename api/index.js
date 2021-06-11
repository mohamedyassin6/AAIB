"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors = require('cors');
var reportsController_1 = require("./reportsController");
var app = express_1.default();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(cors({ origin: true }));
app.get('/', function (req, res) { return res.send('Welcome to AAIB Reporting System!'); });
app.get('/reports', reportsController_1.getReports);
app.put('/reports/:reportId', reportsController_1.resolveTicket);
app.delete('/reports/:reportId', reportsController_1.blockContent);
app.listen(5000, function () { return console.log('The app is listening on port 5000'); });
