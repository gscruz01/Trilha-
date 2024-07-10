
select * from  autores;
select * from editoras;
select * from livros;

--1.1 Crie um banco de dados com o nome <<biblioteca>>.

DROP database biblioteca;

--1.2 Crie as tabelas apresentadas anteriormente no diagrama do banco de dados <<biblioteca>>.

create table autores(
autor_id serial primary key,
nome varchar(50) not null
);
create table editoras (
editoras_id serial primary key,
nome varchar (100) not null,
localizacao varchar (200) not null
); 
create table livros (
    livro_id serial primary key,
    titulo Varchar(100) not null,
    autor_id int,
    editoras_id int,
    ano_publicacao varchar(4) not null,
    constraint fk_autor
        foreign key (autor_id)
        references autores(autor_id),
    constraint fk_editoras
        foreign key (editoras_id)
        references editoras(editoras_id)   
);

--1.3 Inserte os seguintes dados nas tabelas:

--autores(‘Autor 1’, ‘Autor 2’, ‘Autor 3’).

insert into autores (nome)
values
('Autor1'),
('Autor2'),
('Autor3');

--editoras(('Editora A', 'Cidade A'), ('Editora B', 'Cidade B'), ('Editora C', 'Cidade C'))

insert into editoras (nome, localizacao)
values
('Editora1', 'Cidade1'),
('Editora2', 'Cidade2'),
('Editora3', 'Cidade3');

--livros(('Livro 1', 1, 1, 2020), ('Livro 2', 2, 2, 2018), ('Livro 3', 3, 3, 2022))

insert into livros (titulo, autor_id, editoras_id, ano_publicacao )
values
('Livro1', 1, 1, 2020),
('Livro2', 2, 2, 2018),
('Livro3', 3, 3, 2022);

--2. Crie consultas que permitam:

--2.1 Listar todos os livros com seus autores e editoras.


select l.titulo, a.nome as autores, e.nome as editoras
from livros l 
join autores a on l.autor_id = a.autor_id 
join editoras e on l.editoras_id = e.editoras_id;

--2.2 Encontrar livros de um autor específico (‘Autor1’).

select l.livro_id as livros, l.titulo as titulo, a.nome as autor
from livros l
join autores a on l.autor_id = a.autor_id 
where a.nome = 'Autor1';

--2.3 Contar o número de livros publicados por editora.

select e.nome as nome_editoras , count(l.livro_id) as numeros_livros
from editoras e 
join livros l on e.editoras_id = l.editoras_id
group by e.nome;

--2.4 Atualizar o ano de publicação do livro ‘Livro 1’ para 2021.

update livros 
set ano_publicacao = '2021'
where livro_id = 1;