# La Roca Restaurant - Website

Bienvenido al repositorio para el sitio web oficial de La Roca Restaurant, construido usando **React**, **Vite**, **TypeScript**, **NextUI** y  **Firebase**.

## Tabla de Contenido
- [Descripcion General](#descripcion-general)
- [Stack Tecnologico](#stack-tecnologico)
- [Empecemos](#empecemos)

## Descripcion General
Este proyecto es el sitio web oficial de **La Roca Restaurant**, una experiencia gastronómica dominicana en `Providence, USA` que ofrece un menú variado y un ambiente acogedor. El sitio web está diseñado para ser rápido, receptivo y fácil de usar, brindando a los visitantes un acceso fácil a los menús y otra información clave.

## Stack Tecnologico
- **React**
- **TypeScript**
- **Vite**
- **NextUI**: Libreria de componentes UI

## Empecemos

### Requisites
Asegúrese de tener instalado lo siguiente en su máquina de desarrollo:
- **Node.js** (versión 18.x o superior)
- **npm** o **yarn**

### Instalacion
1. Clonar repositorio:
   
   ```bash
     git clone https://github.com/ldss95/la-roca-restaurant
   ```
3. Navega hacia la carpeta donde se clonó el proyecto:
   
   ```bash
     cd la-roca-restaurant
   ```
4. Instala las dependencias:
   
   ```bash
     npm install
   ```

### Configura variables de entorno
Este proyecto usa Firebase como base de datos y almacenamiento de archivos, asegurate de crear un prouecto en `Firebase` para luego configurar las siguientes variables de entorno.
1. Crea un archivo .env en la raiz del prouecto
2. Agrega las siguientes variables
   
   ```dotenv
    VITE_FB_API_KEY = xxxx
    VITE_FB_AUTH_DOMAIN = xxxx
    VITE_FB_PROJECT_ID = xxxx
    VITE_FB_STORAGE_BUCKET = xxxx
    VITE_FB_MESSAGINGSENDER_ID = 0000
    VITE_FB_APP_ID = xxxx
   ```

### Inicia servidor de desarrollo

```bash
  npm run dev
```
