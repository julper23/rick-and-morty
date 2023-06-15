# Aplicacion Rick y Morty

## Para instalar

  1. Descargar desde el repositorio
  2. lanzar el comando "npm i" para instalar las dependencias
  
  
## Para lanzar la app
  1. npm start (comando basico que lanzara expo)
  2. npx expo start (comando que lanzara expo y generara un servidor de desarroyo)
>En ambas opciones dara un codigo QR y una url para poder acceder a la aplicación desde la app de Expo
  
  
## Para generar el APK
  1. Borrar el apartado "extra" del archivo app.jon
  2. Tener una cuenta de Expo
  3. Loguearse en Expo desde la consola de comandos usando "Expo login"
  4. Lanzar el comando "eas build -p android --profile preview"
  5. Entrar en el enlace que da Expo en la consola desde el explorador
  6. Descargar el APK
>Suele tardar un rato en hacer el build
>
>Si se tiene un movil conectado directamente o un emulador al finalizar el build da la opcion de instalar la app directamente
>
>Si se va a la pagina de expo se puede ver en que proceso se encuentra el build y saber mas o menos el tiempo que falta


## Para descargar la APK desde git
  - [Descargar APK](https://github.com/julper23/rick-and-morty/raw/main/rickAndMorty.apk)
>Si la APK no se descarga, en la raiz del proyecto esta el archivo APK, al entrar en el da la opción de instalar arriba a la derecha
