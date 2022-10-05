# Lab-6 & 7-ARSW
# Archila - Giraldo
## Rest Client Blueprint

https://github.com/archila-giraldo/Lab-6-ARSW/blob/main/Diagrama%20sin%20t%C3%ADtulo.drawio

---

### Parte 1
+ Siguiendo el patrón modulo estructuramos nuestra app de la siguiente forma ![img.png](img.png) luego como elementos publicos tenemos lo siguiente
![img_1.png](img_1.png) los cuales son los metodos a los cuales podemos acceder desde afuera del scope de la función

+ La consulta de los elementos se puede ver de la siguiente forma
![img_2.png](img_2.png)
En donde podemos seleccionar uno de los planos para pintarlo por el canvas
En caso de que un autor tenga más de un plano
![img_3.png](img_3.png)
+ Realizamos la apiclient que es la que nos permite conectar el front con el back
[  src/main/resources/static/js/apiclient.js
](src/main/resources/static/js/apiclient.js)
y en caso de que queramos volver a utilizar el apimock solo debemos cambiar la siguiente linea de codigo de app.js
![img_4.png](img_4.png)
---
### Parte 2

+ agregamos el manejador de clicks de la siguiente forma

![image](https://user-images.githubusercontent.com/69320250/193967497-778d72e7-c175-48cc-9619-b6151cada5de.png)

y creamos los metodos de create, delete y update para los blue prints

![image](https://user-images.githubusercontent.com/69320250/193968240-8b34c2cb-f810-400c-b3f6-d46903836142.png)

+ En esta parte solo es necesario crear los metodos en el controller que nos permita realizar las acciones que necesitamos con el blueprint

![image](https://user-images.githubusercontent.com/69320250/193968688-6213b29b-575f-44f2-bf4b-168ca194e3cf.png)


![image](https://user-images.githubusercontent.com/69320250/193965815-19fe6c71-1c38-4556-b012-c633e6272a79.png)

---
