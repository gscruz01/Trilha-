import express, {Request, Response } from "express"
import {connectToDatabase, pool} from  './db'
import dotenv from 'dotenv'

const consulta = express()
const porta = process.env.PORT || 3000
consulta.use(express.json())

consulta.get('/', (req: Request, res: Response) => {
    res.send("Ola a todos")
})

/*Consultando os resultados da tablela Autores e retornando os dados para o usuario*/
consulta.get ('/listar_autores', async (req : Request , res: Response) => {
    /* Esse try funciona semelhante ao if so que ele nao recebe condições, mas se algo der errado o codigo o catch ira ser exedutado */
    try {
        const resultado = await pool.query('SELECT * FROM autores')
        res.json (resultado.rows)
    }
    /* Caso algo de errado na execução do endereço http /listar_autores */
    catch (err){
        console.error(err)
        res.status(500).send('Erro no serivdor')
    }
})

consulta.listen(porta, () => {

    console.log("Funcionando")
    connectToDatabase()
})