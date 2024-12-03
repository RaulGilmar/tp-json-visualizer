Documentación del Proceso de Instalación del Entorno (Node.js)

Este documento describe cómo configurar el entorno de desarrollo para un proyecto Node.js que consume una API JSON (https://rickandmortyapi.com/api/) y muestra los datos en una tabla. A continuación se detallan los pasos para instalar, configurar y ejecutar el proyecto.

Requisitos previos
Antes de comenzar, asegúrate de que tu equipo cumpla con los siguientes requisitos:
Node.js instalado en tu sistema (versión 14 o superior).
Puedes descargarlo desde https://nodejs.org/en 
Verifica la instalación con los comandos:
node -v
npm -v

Inicializar el proyecto Node.js
Abre una terminal y navega hasta la carpeta raíz del proyecto. 
Ejecuta:
npm init -y
Esto generará un archivo package.json con la configuración básica del proyecto.

Instalar dependencias necesarias
Ejecuta el siguiente comando para instalar los módulos requeridos:
npm install express cors body-parser axios
 ◉ express: Framework para configurar el servidor.
 ◉ cors: Middleware para permitir solicitudes desde dominios cruzados.
 ◉ body-parser: Middleware para analizar datos JSON enviados desde el cliente.
 ◉ axios: Cliente HTTP para consumir la API externa.

Estructura del proyecto en la rama master:

- **tp-json-visualizer/**
  - **public/**
    - **css/**
      - `styles.css`: Hoja de estilos
    - **js/**
      - `main.js`: Lógica frontend
    - **assets/**
      - `rick-and-morty.png`: Logo
    - `index.html`: Página principal
  - **server/**
    - `app.js`: Servidor backend configurado con Node.js
  - `package.json`: Configuración del proyecto Node.js
  - `package-lock.json`: Versiones bloqueadas de las dependencias


tp-json-visualizer/
│
├── public/
│   ├── css/
│   │   └── styles.css       --> Hoja de estilos
│   ├── js/
│   │   └── main.js          --> Lógica frontend
│   ├── assets/
│   │   └── rick-and-morty.png  --> Logo 
│   └── index.html           --> Página principal
│
├── server/
│   └── app.js               --> Servidor backend configurado con Node.js
│
├── package.json             --> Configuración del proyecto Node.js
├── package-lock.json        --> Versiones bloqueadas de las dependencias

Iniciar el Proyecto:
  ◉ Iniciar el servidor
Ejecuta el siguiente comando en la terminal para iniciar el servidor:
node server/app.js
Esto iniciará el servidor en http://localhost:3000.
  ◉Probar el proyecto
Abre un navegador web y ve a http://localhost:3000.
Prueba las funciones del formulario y verifica que se consuma la API correctamente.
