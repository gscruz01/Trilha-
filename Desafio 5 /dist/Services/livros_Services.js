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
router.get("/get_livros", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield db_1.pool.query("SELECT * FROM livros");
        return res.json(resultado.rows);
    }
    catch (_a) {
        return res.status(500).send("Erro no servidor");
    }
}));
/*-------------------POST-------------------*/
router.post("/post_livros", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo: titulo, ano_publicacao: ano_publicacao, autor_id: autor_id, editoras_id: editoras_id, } = req.body;
    try {
        if (!titulo || !ano_publicacao || !autor_id || !editoras_id) {
            return res.status(400).send((erro = {
                text: "Todos dados não estão inseridos, insira-os para prosseguir",
                type: "error",
                code: 400,
            }));
        }
        else {
            const query = "INSERT INTO livros (titulo, ano_publicacao, autor_id, editoras_id) VALUES ($1, $2, $3, $4) RETURNING *";
            const values = [titulo, ano_publicacao, autor_id, editoras_id];
            const result = yield db_1.pool.query(query, values);
            const newLivro = result.rows[0];
            return res.status(201).send(newLivro);
        }
    }
    catch (_a) {
        return res.status(500).send(erro);
    }
}));
/*-------------------PUT-------------------*/
router.put("/put_livros", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { livro_id: livro_id, titulo: titulo, autor_id: autor_id, editoras_id: editoras_id, ano_publicacao: ano_publicacao, } = req.body;
    try {
        if (!livro_id && !titulo && !autor_id && !editoras_id && !ano_publicacao) {
            return res.status(400).send((erro = {
                text: "Pelo menos um campo tem que estar preenchido para ser editado ",
                type: "error",
                code: 400,
            }));
        }
        else if (!livro_id) {
            return res
                .status(400)
                .send("Não é possivel editar quais quer valor sem o livro_id");
        }
        else if (editoras_id || autor_id) {
            return res
                .status(400)
                .send("Não é possivel editar o autor_id ou editoras_id por serem os criadores padroes desse livro");
        }
        else if (livro_id && titulo) {
            const query = "UPDATE livros SET titulo = $1 where livro_id = $2 RETURNING *";
            const values = [titulo, livro_id];
            const result = yield db_1.pool.query(query, values);
            const editLivros = result.rows[0];
            return res.status(200).send(editLivros);
        }
        else if (ano_publicacao && livro_id) {
            const query = "UPDATE livros SET ano_publicacao = $1 where livro_id = $2 RETURNING *";
            const values = [ano_publicacao, livro_id];
            const result = yield db_1.pool.query(query, values);
            const editLivros = result.rows[0];
            return res.status(200).send(editLivros);
        }
    }
    catch (_a) {
        return res.status(400).send(erro);
    }
}));
/*------------------DELETE-------------------*/
router.delete("/delete_livros", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { livro_id: livro_id } = req.body;
    try {
        if (!livro_id) {
            return res.status(400).send((erro = {
                text: "O id do autor e necessario para exclusao",
                type: "error",
                code: 400,
            }));
        }
        else {
            const query = "DELETE  FROM livros WHERE livro_id = $1";
            const value = [livro_id];
            yield db_1.pool.query(query, value);
            return res.status(200).send("Deletado com Sucesso");
        }
    }
    catch (_a) {
        return res.status(400).send(erro);
    }
}));
exports.default = router;
