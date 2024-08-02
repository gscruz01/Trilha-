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
router.get("/get_editoras", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield db_1.pool.query("SELECT * FROM editoras");
        return res.json(resultado.rows);
    }
    catch (_a) {
        return res.status(500).send("Erro ao se conectar ao Banco de Dados");
    }
}));
/*-------------------POST-------------------*/
router.post("/post_editoras", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome: nome, localizacao: localizacao } = req.body;
    try {
        if (!nome || !localizacao) {
            return res
                .status(400)
                .send((erro = {
                text: "Todos dados não estão inseridos, insira-os para proceguir",
                type: "error",
                code: 400,
            }));
        }
        else {
            const query = "INSERT INTO editoras (nome, localizacao) VALUES ($1, $2) RETURNING *";
            const values = [nome, localizacao];
            const result = yield db_1.pool.query(query, values);
            const newEditora = result.rows[0];
            return res.status(201).send(newEditora);
        }
    }
    catch (_a) {
        return res.status(400).send(erro);
    }
}));
/*-------------------PUT-------------------*/
router.put("/put_editoras", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome: nome, localizacao: localizacao, editoras_id: editoras_id, } = req.body;
    try {
        if (!nome && !localizacao && !editoras_id) {
            return res
                .status(400)
                .send((erro = {
                text: "Pelo menos um campo tem que estar preenchido para ser editado ",
                type: "error",
                code: 400,
            }));
        }
        else if (!editoras_id) {
            return res
                .status(400)
                .send((erro = {
                text: "Não é possivel editar quais quer valor sem o editora_id",
                type: "error",
                code: 400,
            }));
        }
        else if (nome && !localizacao && editoras_id) {
            const query = "UPDATE editoras SET nome = $1 where editoras_id = $2 RETURNING *";
            const values = [nome, editoras_id];
            const result = yield db_1.pool.query(query, values);
            const editEditoras = result.rows[0];
            return res.status(200).send(editEditoras);
        }
        else if (nome && localizacao && editoras_id) {
            const query = "UPDATE editoras SET nome = $1, localizacao = $2 where editoras_id = $3 RETURNING *";
            const values = [nome, localizacao, editoras_id];
            const result = yield db_1.pool.query(query, values);
            const editEditoras = result.rows[0];
            return res.status(200).send(editEditoras);
        }
        else if (!nome && localizacao && editoras_id) {
            const query = "UPDATE editoras SET localizacao = $1 where editoras_id = $2 RETURNING *";
            const values = [localizacao, editoras_id];
            const result = yield db_1.pool.query(query, values);
            const editEditoras = result.rows[0];
            return res.status(200).send(editEditoras);
        }
    }
    catch (_a) {
        return res.status(400).send(erro);
    }
}));
/*-------------------DELETE-------------------*/
router.delete("/delete_editoras", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { editoras_id: editoras_id } = req.body;
    try {
        if (!editoras_id) {
            return res
                .status(400)
                .send((erro = {
                text: "O id do autor e necessario para exclusao",
                type: "error",
                code: 400,
            }));
        }
        else {
            const queryFK = "DELETE FROM livros WHERE editoras_id = $1";
            const query = "DELETE  FROM editoras WHERE editoras_id = $1";
            const value = [editoras_id];
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
