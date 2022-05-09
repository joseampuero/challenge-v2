# challenge-v2

Contamos con tres microservicios
- Auth : se implemento el login que válida al usuario admin, con contraseña admin.
- Core : se implemento con cqrs + ddd + tdd pues era el microservicio que más se adaptaba para su implementación. 
- Notification: escucha los comandos 'new-student' y 'new-score' y simula el envio de mail.

## Instalacion

Clonar proyecto.

Entrar a cada carpeta de cada microservicio y correr ***

```bash
$ yarn install
```
### Requisitos previos ***
Tener instalado mysql.
Ejecutar las queries que se encuentra en /core/scripts/queries.sql
(esto se podía haber resuelto con una migracion).

En ese script se crea la base de datos. (esto se debe hacer antes de correr `yarn install` en /core)
Las relaciones y entidades por defecto. (luego de correr `yarn install` en /core)

Se decidió así, pues el enunciado facilitaba cuatro materias disponibles y además el desafio no pedía ABML respecto a curso, profesor, etc.

De esta forma solo podemos interactuar con el ABML del estudianto y con esto sería suficiente.

## Run

Para usar la api correr en cada uno
```bash
# development mode
$ yarn start:dev
```

## Test
En el microservicio /core
```bash
yarn run test:e2e
```

### Puertos
- auth : PORT=3200
- core : PORT=3000
- notification : PORT=3100


### docker 
- no implementado

### Aclaraciones:
Se implemento el mismo modelo entidad-relacion que en el entregable anterior. Pues, solo se usa una base de datos que funciona para lectura-escritura. 

Tal vez lo ideal, para aprovechar al máximo cqrs, deberia a ver sido implementar el core junto a dos dbs. Donde una funciona para persistir los datos y la otra solo almacena views. De esta forma, se evitaria el cuello de botella teniendo una sola db. Pero como no se menciono cqrs + event sourcing asumi que con una db de lectura-escritura era suficiente.