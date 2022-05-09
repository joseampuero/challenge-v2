CREATE DATABASE academy;

-- courses
INSERT INTO academy.course (id, code, name, type) VALUES ('1bd81509-ce22-11ec-832c-401c839f1adc', 'AN', 'analisis', 'course');

INSERT INTO academy.course (id, code, name, type) VALUES ('0865bdd4-ce22-11ec-832c-401c839f1adc', 'AL', 'algebra', 'course');

INSERT INTO academy.course (id, code, name, type, laboratoryNumber) VALUES ('6f92ee0e-ce21-11ec-832c-401c839f1adc', 'QUI', 'quimica', 'coursewithlaboratory', 9);

INSERT INTO academy.course (id, code, name, type, laboratoryNumber) VALUES ('eb6224b3-ce21-11ec-832c-401c839f1adc', 'FIS', 'fisica', 'coursewithlaboratory', 12);


-- professor
INSERT INTO academy.professor (id, name, surname, dni, email) VALUES ('9ee94aa7-ce23-11ec-832c-401c839f1adc', 'alan', 'kay', 123456789, 'alan.kay@gmail.com');

INSERT INTO academy.professor (id, name, surname, dni, email) VALUES ('d9e7fa4b-ce23-11ec-832c-401c839f1adc', 'martin', 'fowler', 11116789, 'martin.fowler@gmail.com');

INSERT INTO academy.professor (id, name, surname, dni, email) VALUES ('12d6a78a-ce24-11ec-832c-401c839f1adc', 'frederik', 'brooks', 22216789, 'frederick.brooks@gmail.com');

INSERT INTO academy.professor (id, name, surname, dni, email) VALUES ('57a996b5-ce24-11ec-832c-401c839f1adc', 'brendan', 'eich', 12126789, 'brendan.eich@gmail.com');


-- course professor
-- alan kay -> analisis 
INSERT INTO academy.courseProfessor (id, startDate, courseId, professorId) VALUES ('2088cce6-ce25-11ec-832c-401c839f1adc', now(), '1bd81509-ce22-11ec-832c-401c839f1adc', '9ee94aa7-ce23-11ec-832c-401c839f1adc');
--          -> algebra
INSERT INTO academy.courseProfessor (id, startDate, courseId, professorId) VALUES ('4f70ba2a-ce25-11ec-832c-401c839f1adc', now(), '0865bdd4-ce22-11ec-832c-401c839f1adc', '9ee94aa7-ce23-11ec-832c-401c839f1adc');


-- brooks -> quimica
INSERT INTO academy.courseProfessor (id, startDate, courseId, professorId) VALUES ('a38f36cc-ce25-11ec-832c-401c839f1adc', now(), '6f92ee0e-ce21-11ec-832c-401c839f1adc', '12d6a78a-ce24-11ec-832c-401c839f1adc');
--         -> fisica
INSERT INTO academy.courseProfessor (id, startDate, courseId, professorId) VALUES ('a451338b-ce25-11ec-832c-401c839f1adc', now(), 'eb6224b3-ce21-11ec-832c-401c839f1adc', '12d6a78a-ce24-11ec-832c-401c839f1adc');



-- DROP DATABASE academy 