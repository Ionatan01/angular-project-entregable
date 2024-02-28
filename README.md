# AngularProject

Ionatan Muntean's Artwork Project with Angular

## Routes

`http://localhost:4200/#/artworks`<br>
`http://localhost:4200/#/artworks/page/$numero_pagina`<br>
`http://localhost:4200/#/artworks/favorites`<br>
`http://localhost:4200/#/artwork/$id_cuadro`<br>
`http://localhost:4200/#/userManagement/login`<br>
`http://localhost:4200/#/userManagement/register`<br>

*Todas las demás rutas serán redirigidas a `http://localhost:4200/#/artworks`*

## Tips

### Paginación
Para que el componente de paginacion actualice la lista de cuadros tras rellenar el input con un numero, hsy que pulsar la tecla Intro

### Ejecución del proyecto

Para ejecutar el proyecto, hay que  ejecutar antes `npm install`, y luego `ng serve -o` para iniciar un servidor al cual se accede a través de la ruta `http://localhost:4200/`