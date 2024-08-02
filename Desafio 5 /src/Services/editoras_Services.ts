import { Router, Request, Response } from "express";
import { pool } from "../db";

type Message = {
	text: string;
	type: "error";
	code?: number;
};

let erro: Message;

const router: Router = Router();

/*-------------------GET-------------------*/

router.get("/get_editoras", async (req: Request, res: Response) => {
	try {
		const resultado = await pool.query("SELECT * FROM editoras");
		return res.json(resultado.rows);
	} catch {
		return res.status(500).send("Erro ao se conectar ao Banco de Dados");
	}
});

/*-------------------POST-------------------*/

router.post("/post_editoras", async (req, res) => {
	const { nome: nome, localizacao: localizacao } = req.body;

	try {
		if (!nome || !localizacao) {
			return res
				.status(400)
				.send(
					(erro = {
						text: "Todos dados não estão inseridos, insira-os para proceguir",
						type: "error",
						code: 400,
					})
				);
		} else {
			const query =
				"INSERT INTO editoras (nome, localizacao) VALUES ($1, $2) RETURNING *";
			const values = [nome, localizacao];

			const result = await pool.query(query, values);
			const newEditora = result.rows[0];

			return res.status(201).send(newEditora);
		}
	} catch {
		return res.status(400).send(erro);
	}
});

/*-------------------PUT-------------------*/

router.put("/put_editoras", async (req: Request, res: Response) => {
	const {
		nome: nome,
		localizacao: localizacao,
		editoras_id: editoras_id,
	} = req.body;
	try {
		if (!nome && !localizacao && !editoras_id) {
			return res
				.status(400)
				.send(
					(erro = {
						text: "Pelo menos um campo tem que estar preenchido para ser editado ",
						type: "error",
						code: 400,
					})
				);
		} else if (!editoras_id) {
			return res
				.status(400)
				.send(
					(erro = {
						text: "Não é possivel editar quais quer valor sem o editora_id",
						type: "error",
						code: 400,
					})
				);
		} else if (nome && !localizacao && editoras_id) {
			const query =
				"UPDATE editoras SET nome = $1 where editoras_id = $2 RETURNING *";
			const values = [nome, editoras_id];

			const result = await pool.query(query, values);
			const editEditoras = result.rows[0];

			return res.status(200).send(editEditoras);
		} else if (nome && localizacao && editoras_id) {
			const query =
				"UPDATE editoras SET nome = $1, localizacao = $2 where editoras_id = $3 RETURNING *";
			const values = [nome, localizacao, editoras_id];

			const result = await pool.query(query, values);
			const editEditoras = result.rows[0];

			return res.status(200).send(editEditoras);
		} else if (!nome && localizacao && editoras_id) {
			const query =
				"UPDATE editoras SET localizacao = $1 where editoras_id = $2 RETURNING *";
			const values = [localizacao, editoras_id];

			const result = await pool.query(query, values);
			const editEditoras = result.rows[0];

			return res.status(200).send(editEditoras);
		}
	} catch {
		return res.status(400).send(erro);
	}
});

/*-------------------DELETE-------------------*/

router.delete("/delete_editoras", async (req, res) => {
	const { editoras_id: editoras_id } = req.body;
	try {
		if (!editoras_id) {
			return res
				.status(400)
				.send(
					(erro = {
						text: "O id do autor e necessario para exclusao",
						type: "error",
						code: 400,
					})
				);
		} else {
			const queryFK = "DELETE FROM livros WHERE editoras_id = $1";
			const query = "DELETE  FROM editoras WHERE editoras_id = $1";
			const value = [editoras_id];

			await pool.query(queryFK, value);
			await pool.query(query, value);
			return res.status(200).send("Deletado com Sucesso");
		}
	} catch {
		return res.status(400).send(erro);
	}
});

export default router;
