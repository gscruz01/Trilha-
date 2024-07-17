"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const consulta = (0, express_1.default)();
const porta = process.env.PORT || 3000;
consulta.use(express_1.default.json());
consulta.get('/', (req, res) => {
    res.send("Ola a todos");
});
/*Consultando os resultados da tablela Autores e retornando os dados para o usuario*/
consulta.get('/listar_autores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* Esse try funciona semelhante ao if so que ele nao recebe condições, mas se algo der errado o codigo o catch ira ser exedutado */
    try {
        const resultado = yield db_1.pool.query('SELECT * FROM autores');
        res.json(resultado.rows);
    }
    /* Caso algo de errado na execução do endereço http /listar_autores */
    catch (err) {
        console.error(err);
        res.status(500).send('Erro no serivdor');
    }
}));
consulta.listen(porta, () => {
    console.log("Funcionando");
    (0, db_1.connectToDatabase)();
});
