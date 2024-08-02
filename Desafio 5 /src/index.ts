import Autores from './Services/autores_Service';
import Editores from './Services/editoras_Services';
import Livros from './Services/livros_Services';
import express, { Express } from 'express';
import { connectToDatabase } from './db';

const consulta: Express = express();
const porta: number = parseInt(process.env.PORT || '3000', 10);

consulta.use(express.json());

consulta.use('/', Autores);
consulta.use('/', Editores);
consulta.use('/', Livros);

consulta.listen(porta, () => {
    console.log('Funcionando');
    connectToDatabase();
});

export default consulta;