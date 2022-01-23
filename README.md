# Bootcamp Full Stack Web Developer #


## Práctica Final - Módulo: React Avanzado (Redux/Testing)


El backend que se usa es el mismo que usamos en la práctica de 
Fundamentos de React: [https://github.com/MiwelR/practicaFinal-NodePop-Fundamentos-React](https://github.com/MiwelR/practicaFinal-NodePop-Fundamentos-React)

## NodePop Frontend con Redux

Objetivos de la práctica:

1. Configurar un store Redux donde se almacenará al menos la siguiente 
información:
	- Información sobre la sesión o el usuario registrado en el sistema (saber
si hay un usuario logueado). Al iniciar la aplicación se deberá leer la 
información del token desde el LocalStorage (si existiese) y se 
almacenará en el store de Redux el estado correspondiente. Al hacer 
login guardaremos el estado en el store de Redux (SIEMPRE) y en el 
Local Storage si se eligió recordar sesion
	- Información sobre los anuncios. El store deberá manejar la obtención 
de tags disponibles, de anuncios desde el API (listado y detalle), así 
como la creación y borrado de anuncios
2. Crear las acciones y reducers necesarios para poder cumplir los objetivos del 
punto 1.
3. Conectar los componentes con el store de redux (connect / hooks).
4. Configurar Redux Dev Tools para simplificar las tareas de debugging de la 
aplicación.
5. Testing. Crear tests unitarios, dando al menos un ejemplo de cada uno de 
estos casos:
	- Una acción síncrona
	- Una acción asíncrona
	- Un reducer
	- Un selector
	- Un componente con snapshot testing
	- Comprobar el funcionamiento de un componente que ejecuta una 
acción del store, mockeando la acción


## Instrucciones

Desde el directorio del proyecto:

Instalar dependencias:

	npm install

En ese proceso se creará la carpeta "node_modules" con todas las dependencias del proyecto.

Arrancar el proyecto:

	npm start

Iniciará la aplicación en modo desarrollo. Sólo hay que ir a la ruta [http://localhost:3000](http://localhost:3000) desde el navegador (con el backend previamente arrancado).