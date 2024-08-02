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

router.get("/get_livros", async (req: Request, res: Response) => {
	try {
		const resultado = await pool.query("SELECT * FROM livros");
		return res.json(resultado.rows);
	} catch{
		return res.status(500).send("Erro no servidor");
	}
});

/*-------------------POST-------------------*/

router.post("/post_livros", async (req: Request, res: Response) => {
	const {
		titulo: titulo,
		ano_publicacao: ano_publicacao,
		autor_id: autor_id,
		editoras_id: editoras_id,
	} = req.body;

	try {
		if (!titulo || !ano_publicacao || !autor_id || !editoras_id) {
			return res.status(400).send(
				(erro = {
					text: "Todos dados não estão inseridos, insira-os para prosseguir",
					type: "error",
					code: 400,
				})
			);
		} else {
			const query =
				"INSERT INTO livros (titulo, ano_publicacao, autor_id, editoras_id) VALUES ($1, $2, $3, $4) RETURNING *";
			const values = [titulo, ano_publicacao, autor_id, editoras_id];

			const result = await pool.query(query, values);
			const newLivro = result.rows[0];

			return res.status(201).send(newLivro);
		}
	} catch {
		return res.status(500).send(erro);
	}
});

/*-------------------PUT-------------------*/
router.put("/put_livros", async (req: Request, res: Response) => {
	const {
		livro_id: livro_id,
		titulo: titulo,
		autor_id: autor_id,
		editoras_id: editoras_id,
		ano_publicacao: ano_publicacao,
	} = req.body;

	try {
		if (!livro_id && !titulo && !autor_id && !editoras_id && !ano_publicacao) {
			return res.status(400).send(
				(erro = {
					text: "Pelo menos um campo tem que estar preenchido para ser editado ",
					type: "error",
					code: 400,
				})
			);
		} else if (!livro_id) {
			return res
				.status(400)
				.send("Não é possivel editar quais quer valor sem o livro_id");
		} else if (editoras_id || autor_id) {
			return res
				.status(400)
				.send(
					"Não é possivel editar o autor_id ou editoras_id por serem os criadores padroes desse livro"
				);
		} else if (livro_id && titulo) {
			const query =
				"UPDATE livros SET titulo = $1 where livro_id = $2 RETURNING *";
			const values = [titulo, livro_id];

			const result = await pool.query(query, values);
			const editLivros = result.rows[0];

			return res.status(200).send(editLivros);
		} else if ( ano_publicacao && livro_id ) {
			const query =
				"UPDATE livros SET ano_publicacao = $1 where livro_id = $2 RETURNING *";
			const values = [ano_publicacao, livro_id];

			const result = await pool.query(query, values);
			const editLivros = result.rows[0];

			return res.status(200).send(editLivros);
		}
	} catch {
		return res.status(400).send(erro);
	}
});

/*------------------DELETE-------------------*/

router.delete("/delete_livros", async (req: Request, res: Response) => {
	const { livro_id: livro_id } = req.body;
	try {
		if (!livro_id) {
			return res.status(400).send(
				(erro = {
					text: "O id do autor e necessario para exclusao",
					type: "error",
					code: 400,
				})
			);
		} else {
			const query = "DELETE  FROM livros WHERE livro_id = $1";
			const value = [livro_id];

			await pool.query(query, value);
			return res.status(200).send("Deletado com Sucesso");
		}
	} catch {
		return res.status(400).send(erro);
	}
});

export default router;
