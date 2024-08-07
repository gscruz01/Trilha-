PGDMP  1            
        |         
   biblioteca    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16399 
   biblioteca    DATABASE     �   CREATE DATABASE biblioteca WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE biblioteca;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false                        0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    16401    autores    TABLE     h   CREATE TABLE public.autores (
    autor_id integer NOT NULL,
    nome character varying(50) NOT NULL
);
    DROP TABLE public.autores;
       public         heap    postgres    false    4            �            1259    16400    autores_autor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.autores_autor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.autores_autor_id_seq;
       public          postgres    false    4    216                       0    0    autores_autor_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.autores_autor_id_seq OWNED BY public.autores.autor_id;
          public          postgres    false    215            �            1259    16408    editoras    TABLE     �   CREATE TABLE public.editoras (
    editoras_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    localizacao character varying(200) NOT NULL
);
    DROP TABLE public.editoras;
       public         heap    postgres    false    4            �            1259    16407    editoras_editoras_id_seq    SEQUENCE     �   CREATE SEQUENCE public.editoras_editoras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.editoras_editoras_id_seq;
       public          postgres    false    218    4                       0    0    editoras_editoras_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.editoras_editoras_id_seq OWNED BY public.editoras.editoras_id;
          public          postgres    false    217            �            1259    16415    livros    TABLE     �   CREATE TABLE public.livros (
    livro_id integer NOT NULL,
    titulo character varying(100) NOT NULL,
    autor_id integer,
    editoras_id integer,
    ano_publicacao character varying(4) NOT NULL
);
    DROP TABLE public.livros;
       public         heap    postgres    false    4            �            1259    16414    livros_livro_id_seq    SEQUENCE     �   CREATE SEQUENCE public.livros_livro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.livros_livro_id_seq;
       public          postgres    false    220    4                       0    0    livros_livro_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.livros_livro_id_seq OWNED BY public.livros.livro_id;
          public          postgres    false    219            Z           2604    16404    autores autor_id    DEFAULT     t   ALTER TABLE ONLY public.autores ALTER COLUMN autor_id SET DEFAULT nextval('public.autores_autor_id_seq'::regclass);
 ?   ALTER TABLE public.autores ALTER COLUMN autor_id DROP DEFAULT;
       public          postgres    false    215    216    216            [           2604    16411    editoras editoras_id    DEFAULT     |   ALTER TABLE ONLY public.editoras ALTER COLUMN editoras_id SET DEFAULT nextval('public.editoras_editoras_id_seq'::regclass);
 C   ALTER TABLE public.editoras ALTER COLUMN editoras_id DROP DEFAULT;
       public          postgres    false    217    218    218            \           2604    16418    livros livro_id    DEFAULT     r   ALTER TABLE ONLY public.livros ALTER COLUMN livro_id SET DEFAULT nextval('public.livros_livro_id_seq'::regclass);
 >   ALTER TABLE public.livros ALTER COLUMN livro_id DROP DEFAULT;
       public          postgres    false    220    219    220            �          0    16401    autores 
   TABLE DATA           1   COPY public.autores (autor_id, nome) FROM stdin;
    public          postgres    false    216   �       �          0    16408    editoras 
   TABLE DATA           B   COPY public.editoras (editoras_id, nome, localizacao) FROM stdin;
    public          postgres    false    218   �       �          0    16415    livros 
   TABLE DATA           Y   COPY public.livros (livro_id, titulo, autor_id, editoras_id, ano_publicacao) FROM stdin;
    public          postgres    false    220                     0    0    autores_autor_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.autores_autor_id_seq', 3, true);
          public          postgres    false    215                       0    0    editoras_editoras_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.editoras_editoras_id_seq', 3, true);
          public          postgres    false    217                       0    0    livros_livro_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.livros_livro_id_seq', 3, true);
          public          postgres    false    219            ^           2606    16406    autores autores_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.autores
    ADD CONSTRAINT autores_pkey PRIMARY KEY (autor_id);
 >   ALTER TABLE ONLY public.autores DROP CONSTRAINT autores_pkey;
       public            postgres    false    216            `           2606    16413    editoras editoras_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.editoras
    ADD CONSTRAINT editoras_pkey PRIMARY KEY (editoras_id);
 @   ALTER TABLE ONLY public.editoras DROP CONSTRAINT editoras_pkey;
       public            postgres    false    218            b           2606    16420    livros livros_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.livros
    ADD CONSTRAINT livros_pkey PRIMARY KEY (livro_id);
 <   ALTER TABLE ONLY public.livros DROP CONSTRAINT livros_pkey;
       public            postgres    false    220            c           2606    16421    livros fk_autor    FK CONSTRAINT     w   ALTER TABLE ONLY public.livros
    ADD CONSTRAINT fk_autor FOREIGN KEY (autor_id) REFERENCES public.autores(autor_id);
 9   ALTER TABLE ONLY public.livros DROP CONSTRAINT fk_autor;
       public          postgres    false    220    216    4702            d           2606    16426    livros fk_editoras    FK CONSTRAINT     �   ALTER TABLE ONLY public.livros
    ADD CONSTRAINT fk_editoras FOREIGN KEY (editoras_id) REFERENCES public.editoras(editoras_id);
 <   ALTER TABLE ONLY public.livros DROP CONSTRAINT fk_editoras;
       public          postgres    false    220    218    4704            �      x�3�t,-�/2�2�0���!c�=... �	/      �   /   x�3�tM�,�/J4�t�LILI5�2�	A����aB�P!c�=... I��      �   1   x�3���,+�7�CC.c��1'qBD9A(b����� ��     