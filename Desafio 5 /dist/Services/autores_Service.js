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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
let erro;
const router = (0, express_1.Router)();
/*-------------------GET-------------------*/
router.get("/get_autores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield db_1.pool.query("SELECT * FROM autores");
        return res.json(resultado.rows);
    }
    catch (_a) {
        return res.status(500).send("Erro no servidor");
    }
}));
/*-------------------POST-------------------*/
router.post("/post_autores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome: nome } = req.body;
    try {
        if (!nome) {
            return res
                .status(400)
                .send((erro = {
                text: "Não existe valor em Nome, insira o dado.",
                type: "error",
                code: 403,
            }));
        }
        else if (nome.length > 100) {
            return res
                .status(400)
                .send((erro = {
                text: "A quantidade de caracter é maior que o limite,  insira o dado dentro do limite de 100 caracter.",
                type: "error",
                code: 400,
            }));
        }
        else {
            const query = "INSERT INTO autores (nome) VALUES ($1) RETURNING *";
            const values = [nome];
            const result = yield db_1.pool.query(query, values);
            const newAutor = result.rows[0];
            return res.status(201).send(newAutor);
        }
    }
    catch (_a) {
        return res.status(400).send(erro);
    }
}));
/*-------------------PUT-------------------*/
router.put("/put_autores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome: nome, autor_id: autor_id } = req.body;
    try {
        if (!nome) {
            return res
                .status(400)
                .send((erro = {
                text: "Não existe valor em Nome, insira o dado.",
                type: "error",
                code: 400,
            }));
        }
        else if (nome.length > 100) {
            return res
                .status(400)
                .send((erro = {
                text: "A quantidade de caracter é maior que o limite,  insira o dado dentro do limite de 100 caracter.",
                type: "error",
                code: 400,
            }));
        }
        else {
            const query = "UPDATE autores SET nome = $1 where autor_id = $2 RETURNING *";
            const values = [nome, autor_id];
            const result = yield db_1.pool.query(query, values);
            const editAutor = result.rows[0];
            return res.status(200).send(editAutor);
        }
    }
    catch (erro) {
        return res.status(400).send(erro);
    }
}));
/*-------------------Delete-------------------*/
router.delete("/delete_autores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { autor_id: autor_id } = req.body;
    try {
        if (!autor_id) {
            return res
                .status(400)
                .send((erro = {
                text: "O id do autor e necessario para exclusao",
                type: "error",
                code: 400,
            }));
        }
        else {
            const queryFK = "DELETE FROM livros WHERE autor_id = $1";
            const query = "DELETE  FROM autores WHERE autor_id = $1";
            const value = [autor_id];
            yield db_1.pool.query(queryFK, value);
            yield db_1.pool.query(query, value);
            return res.status(200).send("Deletado com Sucesso");
        }
    }
    catch (_a) {
        return res.status(400).send(erro);
    }
}));
exports.default = router;
