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

router.get("/get_autores", async (req: Request, res: Response) => {
	try {
		const resultado = await pool.query("SELECT * FROM autores");
		return res.json(resultado.rows);
	} catch {
		return res.status(500).send("Erro no servidor");
	}
});

/*-------------------POST-------------------*/

router.post("/post_autores", async (req: Request, res: Response) => {
	const { nome: nome } = req.body;

	try {
		if (!nome) {
			return res
				.status(400)
				.send(
					(erro = {
						text: "Não existe valor em Nome, insira o dado.",
						type: "error",
						code: 403,
					})
				);
		} else if (nome.length > 100) {
			return res
				.status(400)
				.send(
					(erro = {
						text: "A quantidade de caracter é maior que o limite,  insira o dado dentro do limite de 100 caracter.",
						type: "error",
						code: 400,
					})
				);
		} else {
			const query = "INSERT INTO autores (nome) VALUES ($1) RETURNING *";
			const values = [nome];

			const result = await pool.query(query, values);
			const newAutor = result.rows[0];

			return res.status(201).send(newAutor);
		}
	} catch {
		return res.status(400).send(erro);
	}
});

/*-------------------PUT-------------------*/

router.put("/put_autores", async (req: Request, res: Response) => {
	const { nome: nome, autor_id: autor_id } = req.body;
	try {
		if (!nome) {
			return res
				.status(400)
				.send(
					(erro = {
						text: "Não existe valor em Nome, insira o dado.",
						type: "error",
						code: 400,
					})
				);
		} else if (nome.length > 100) {
			return res
				.status(400)
				.send(
					(erro = {
						text: "A quantidade de caracter é maior que o limite,  insira o dado dentro do limite de 100 caracter.",
						type: "error",
						code: 400,
					})
				);
		} else {
			const query =
				"UPDATE autores SET nome = $1 where autor_id = $2 RETURNING *";
			const values = [nome, autor_id];

			const result = await pool.query(query, values);
			const editAutor = result.rows[0];

			return res.status(200).send(editAutor);
		}
	} catch (erro) {
		return res.status(400).send(erro);
	}
});

/*-------------------Delete-------------------*/

router.delete("/delete_autores", async (req: Request, res: Response) => {
	const { autor_id: autor_id } = req.body;
	try {
		if (!autor_id) {
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
			const queryFK = "DELETE FROM livros WHERE autor_id = $1";
			const query = "DELETE  FROM autores WHERE autor_id = $1";
			const value = [autor_id];

			await pool.query(queryFK, value);
			await pool.query(query, value);
			return res.status(200).send("Deletado com Sucesso");
		}
	} catch {
		return res.status(400).send(erro);
	}
});

export default router;
