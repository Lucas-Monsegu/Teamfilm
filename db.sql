--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11
-- Dumped by pg_dump version 10.11

-- Started on 2019-11-25 23:44:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 16395)
-- Name: main; Type: SCHEMA; Schema: -; Owner: teamfilm
--

CREATE SCHEMA main;


ALTER SCHEMA main OWNER TO teamfilm;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2835 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 16396)
-- Name: comment; Type: TABLE; Schema: main; Owner: teamfilm
--

CREATE TABLE main.comment (
    id integer NOT NULL,
    film_id integer NOT NULL,
    user_id integer NOT NULL,
    message text,
    rating double precision NOT NULL
);


ALTER TABLE main.comment OWNER TO teamfilm;

--
-- TOC entry 198 (class 1259 OID 16402)
-- Name: comment_id_seq; Type: SEQUENCE; Schema: main; Owner: teamfilm
--

CREATE SEQUENCE main.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE main.comment_id_seq OWNER TO teamfilm;

--
-- TOC entry 2836 (class 0 OID 0)
-- Dependencies: 198
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: teamfilm
--

ALTER SEQUENCE main.comment_id_seq OWNED BY main.comment.id;


--
-- TOC entry 199 (class 1259 OID 16404)
-- Name: film; Type: TABLE; Schema: main; Owner: teamfilm
--

CREATE TABLE main.film (
    id integer NOT NULL,
    tmdb_id integer NOT NULL,
    genres text[],
    title text NOT NULL,
    language text,
    release_date date,
    runtime integer NOT NULL,
    poster_path text,
    rating double precision NOT NULL
);


ALTER TABLE main.film OWNER TO teamfilm;

--
-- TOC entry 200 (class 1259 OID 16410)
-- Name: film_id_seq; Type: SEQUENCE; Schema: main; Owner: teamfilm
--

CREATE SEQUENCE main.film_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE main.film_id_seq OWNER TO teamfilm;

--
-- TOC entry 2837 (class 0 OID 0)
-- Dependencies: 200
-- Name: film_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: teamfilm
--

ALTER SEQUENCE main.film_id_seq OWNED BY main.film.id;


--
-- TOC entry 201 (class 1259 OID 16412)
-- Name: user; Type: TABLE; Schema: main; Owner: teamfilm
--

CREATE TABLE main."user" (
    id integer NOT NULL,
    discord_id text NOT NULL,
    name text NOT NULL,
    avatar text NOT NULL
);


ALTER TABLE main."user" OWNER TO teamfilm;

--
-- TOC entry 202 (class 1259 OID 16418)
-- Name: user_id_seq; Type: SEQUENCE; Schema: main; Owner: teamfilm
--

CREATE SEQUENCE main.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE main.user_id_seq OWNER TO teamfilm;

--
-- TOC entry 2838 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: main; Owner: teamfilm
--

ALTER SEQUENCE main.user_id_seq OWNED BY main."user".id;


--
-- TOC entry 2686 (class 2604 OID 16420)
-- Name: comment id; Type: DEFAULT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main.comment ALTER COLUMN id SET DEFAULT nextval('main.comment_id_seq'::regclass);


--
-- TOC entry 2687 (class 2604 OID 16421)
-- Name: film id; Type: DEFAULT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main.film ALTER COLUMN id SET DEFAULT nextval('main.film_id_seq'::regclass);


--
-- TOC entry 2688 (class 2604 OID 16422)
-- Name: user id; Type: DEFAULT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main."user" ALTER COLUMN id SET DEFAULT nextval('main.user_id_seq'::regclass);


--
-- TOC entry 2822 (class 0 OID 16396)
-- Dependencies: 197
-- Data for Name: comment; Type: TABLE DATA; Schema: main; Owner: teamfilm
--

COPY main.comment (id, film_id, user_id, message, rating) FROM stdin;
13	5	22		5
\.


--
-- TOC entry 2824 (class 0 OID 16404)
-- Dependencies: 199
-- Data for Name: film; Type: TABLE DATA; Schema: main; Owner: teamfilm
--

COPY main.film (id, tmdb_id, genres, title, language, release_date, runtime, poster_path, rating) FROM stdin;
4	475557	{Crime,Thriller,Drama}	Joker	en	2019-10-02	122	/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg	-1
6	17431	{"Science Fiction",Drama}	Moon	en	2009-06-12	97	/2tgl9q3ZaVQUfSsbftqhRxXCElB.jpg	-1
7	496243	{Thriller}	Parasite	ko	2019-05-30	132	/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg	-1
8	9487	{Adventure,Animation,Comedy,Family}	A Bug's Life	en	1998-11-25	95	/u9qGMRwcPwP0WETxulS5hKUsEum.jpg	-1
11	10681	{Animation,Family,"Science Fiction"}	WALL·E	en	2008-06-22	98	/9cJETuLMc6R0bTWRA5i7ctY9bxk.jpg	-1
12	565310	{Comedy,Drama}	The Farewell	en	2019-07-12	98	/rYrFd9GfJWTtcwkqo3wL9srDHUe.jpg	-1
13	384018	{Action,Adventure,Comedy}	Fast & Furious Presents: Hobbs & Shaw	en	2019-08-01	137	/kvpNZAQow5es1tSY6XW2jAZuPPG.jpg	-1
21	474350	{Horror,Drama}	It Chapter Two	en	2019-09-04	169	/zfE0R94v1E8cuKAerbskfD3VfUt.jpg	-1
24	559969	{Crime,Drama,Thriller}	El Camino: A Breaking Bad Movie	en	2019-10-11	123	/ePXuKdXZuJx8hHMNr2yM4jY2L7Z.jpg	-1
25	264660	{Drama,"Science Fiction"}	Ex Machina	en	2015-01-21	108	/btbRB7BrD887j5NrvjxceRDmaot.jpg	-1
35	597686	{Documentary}	Indianara	pt	2019-11-27	84	/zED6UCrldkbBkV6zWD9LuZPJwkT.jpg	-1
36	429	{Western}	The Good, the Bad and the Ugly	it	1966-12-23	161	/wfPHdfofBD5PN96dV96a51B3Ja2.jpg	-1
37	13572	{Action,Adventure,Crime,Drama,Thriller}	Twisted	en	2004-02-27	97	/yw9yXOPNbCfGf7V4tg3AASjAPPN.jpg	-1
38	369523	{Drama,Thriller}	The Tale	en	2018-01-20	115	/aguq47xq3qhN807rSyz4lJyhAkX.jpg	-1
39	521935	{Thriller,Mystery,Horror}	Cam	en	2018-10-01	95	/p7m3sSQhnoT2uuxUsxF4mQX6opr.jpg	-1
40	159802	{Crime,Drama}	The Last Christmas	en	2010-12-11	120	/1Y0KCdVSpkHhuw1in5oefAGyLsJ.jpg	-1
41	313369	{Comedy,Drama,Romance,Music}	La La Land	en	2016-11-29	129	/ylXCdC106IKiarftHkcacasaAcb.jpg	-1
42	12	{Animation,Family}	Finding Nemo	en	2003-05-30	100	/syPWyeeqzTQIxjIUaIFI7d0TyEY.jpg	-1
43	19995	{Action,Adventure,Fantasy,"Science Fiction"}	Avatar	en	2009-12-10	162	/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg	-1
3	11324	{Drama,Thriller,Mystery}	Shutter Island	en	2010-02-14	138	/aZqKsvpJDFy2UzUMsdskNFbfkOd.jpg	-1
48	50646	{Comedy,Drama,Romance}	Crazy, Stupid, Love.	en	2011-07-29	118	/n97V1WcpoJ8gBA0pM48Om05o2fN.jpg	-1
5	550	{Drama}	Fight Club	en	1999-10-15	139	/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg	5
46	453405	{Action,Thriller}	Gemini Man	en	2019-10-02	117	/uTALxjQU8e1lhmNjP9nnJ3t2pRU.jpg	-1
47	582883	{Comedy,Crime,Drama}	Deerskin	fr	2019-06-19	77	/eMxMHfhiSiZCozPvvbLwMnjMAaG.jpg	-1
9	152601	{Romance,"Science Fiction",Drama}	Her	en	2013-12-18	126	/fsoTLnUXEUTNuVCBxAJMY0HPPd.jpg	-1
\.


--
-- TOC entry 2826 (class 0 OID 16412)
-- Dependencies: 201
-- Data for Name: user; Type: TABLE DATA; Schema: main; Owner: teamfilm
--

COPY main."user" (id, discord_id, name, avatar) FROM stdin;
22	185407146974904320	Dayblox	https://cdn.discordapp.com/avatars/185407146974904320/f3617c9657440d942543b2e1de50b82d.png
23	214378496087162880	Luka	/avatar.png
\.


--
-- TOC entry 2839 (class 0 OID 0)
-- Dependencies: 198
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: main; Owner: teamfilm
--

SELECT pg_catalog.setval('main.comment_id_seq', 13, true);


--
-- TOC entry 2840 (class 0 OID 0)
-- Dependencies: 200
-- Name: film_id_seq; Type: SEQUENCE SET; Schema: main; Owner: teamfilm
--

SELECT pg_catalog.setval('main.film_id_seq', 48, true);


--
-- TOC entry 2841 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: main; Owner: teamfilm
--

SELECT pg_catalog.setval('main.user_id_seq', 23, true);


--
-- TOC entry 2690 (class 2606 OID 24609)
-- Name: comment comment_film_id_user_id_key; Type: CONSTRAINT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main.comment
    ADD CONSTRAINT comment_film_id_user_id_key UNIQUE (film_id, user_id);


--
-- TOC entry 2692 (class 2606 OID 16424)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- TOC entry 2694 (class 2606 OID 16426)
-- Name: film film_pkey; Type: CONSTRAINT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main.film
    ADD CONSTRAINT film_pkey PRIMARY KEY (id);


--
-- TOC entry 2696 (class 2606 OID 24591)
-- Name: film tmdb_id; Type: CONSTRAINT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main.film
    ADD CONSTRAINT tmdb_id UNIQUE (tmdb_id);


--
-- TOC entry 2698 (class 2606 OID 16428)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2699 (class 2606 OID 16429)
-- Name: comment comment_film_id_fkey; Type: FK CONSTRAINT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main.comment
    ADD CONSTRAINT comment_film_id_fkey FOREIGN KEY (film_id) REFERENCES main.film(id);


--
-- TOC entry 2700 (class 2606 OID 16434)
-- Name: comment comment_user_id_fkey; Type: FK CONSTRAINT; Schema: main; Owner: teamfilm
--

ALTER TABLE ONLY main.comment
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES main."user"(id) NOT VALID;


-- Completed on 2019-11-25 23:44:36

--
-- PostgreSQL database dump complete
--

