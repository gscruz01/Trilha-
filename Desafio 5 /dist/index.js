"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autores_Service_1 = __importDefault(require("./Services/autores_Service"));
const editoras_Services_1 = __importDefault(require("./Services/editoras_Services"));
const livros_Services_1 = __importDefault(require("./Services/livros_Services"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const consulta = (0, express_1.default)();
const porta = parseInt(process.env.PORT || '3000', 10);
consulta.use(express_1.default.json());
consulta.use('/', autores_Service_1.default);
consulta.use('/', editoras_Services_1.default);
consulta.use('/', livros_Services_1.default);
consulta.listen(porta, () => {
    console.log('Funcionando');
    (0, db_1.connectToDatabase)();
});
exports.default = consulta;
