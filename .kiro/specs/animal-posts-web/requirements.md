# Documento de Requisitos: Web de Animales y Posts

## Introducción

La web de animales y posts es una aplicación web moderna que integra dos fuentes de datos externas: razas de perros desde la API dog.ceo y posts desde JSONPlaceholder. La aplicación permite a los usuarios visualizar razas de perros con imágenes, gestionar posts mediante operaciones CRUD completas, y proporciona una interfaz limpia y responsiva utilizando Tailwind CSS.

## Glosario

- **Sistema**: La aplicación web de animales y posts
- **API_Dog**: Servicio externo dog.ceo que proporciona información sobre razas de perros e imágenes
- **API_Posts**: Servicio externo JSONPlaceholder que proporciona datos de posts y usuarios
- **Post**: Contenido de texto con título y cuerpo creado por un usuario
- **Raza**: Clasificación de perros disponible en la API dog.ceo
- **CRUD**: Operaciones de Crear, Leer, Actualizar y Eliminar
- **Interfaz_Usuario**: Componentes visuales con los que interactúa el usuario
- **Tailwind_CSS**: Framework de CSS utilizado para estilizar la aplicación
- **Validación**: Proceso de verificar que los datos ingresados cumplan con los requisitos

## Requisitos

### Requisito 1: Visualizar Listado de Razas de Perros

**Historia de Usuario:** Como usuario, quiero ver un listado de todas las razas de perros disponibles con sus imágenes, para conocer la variedad de razas existentes.

#### Criterios de Aceptación

1. WHEN el usuario carga la página principal, THE Sistema SHALL conectarse a la API_Dog y obtener el listado de todas las razas
2. WHEN el listado se carga exitosamente, THE Sistema SHALL mostrar cada raza con su nombre y una imagen representativa
3. WHEN la API_Dog no responde, THE Sistema SHALL mostrar un mensaje de error descriptivo al usuario
4. WHEN el usuario hace clic en el botón "Cargar razas", THE Sistema SHALL actualizar el listado con los datos más recientes de la API_Dog
5. THE Sistema SHALL mostrar las razas en una cuadrícula responsiva que se adapte a diferentes tamaños de pantalla

### Requisito 2: Cargar y Mostrar Posts

**Historia de Usuario:** Como usuario, quiero ver un listado de posts disponibles, para leer contenido de otros usuarios.

#### Criterios de Aceptación

1. WHEN el usuario hace clic en el botón "Cargar posts", THE Sistema SHALL conectarse a la API_Posts y obtener todos los posts disponibles
2. WHEN los posts se cargan exitosamente, THE Sistema SHALL mostrar cada post con su título y contenido en tarjetas individuales
3. WHEN la API_Posts no responde, THE Sistema SHALL mostrar un mensaje de error descriptivo
4. WHEN el usuario visualiza los posts, THE Sistema SHALL mostrar botones de edición y eliminación en cada tarjeta
5. THE Sistema SHALL mostrar los posts en una cuadrícula responsiva con estilos modernos

### Requisito 3: Crear Nuevo Post

**Historia de Usuario:** Como usuario, quiero crear nuevos posts, para compartir contenido con otros usuarios.

#### Criterios de Aceptación

1. WHEN el usuario hace clic en el botón "Crear post", THE Sistema SHALL mostrar un formulario con campos para título y contenido
2. WHEN el usuario completa el formulario y hace clic en "Guardar", THE Sistema SHALL validar que ambos campos contengan texto
3. IF el usuario intenta guardar sin completar los campos requeridos, THEN THE Sistema SHALL mostrar un mensaje de validación
4. WHEN la validación es exitosa, THE Sistema SHALL enviar una solicitud POST a la API_Posts con los datos del nuevo post
5. WHEN el post se crea exitosamente, THE Sistema SHALL mostrar un mensaje de confirmación y limpiar el formulario
6. WHEN la API_Posts rechaza la solicitud, THE Sistema SHALL mostrar un mensaje de error descriptivo

### Requisito 4: Editar Post Existente

**Historia de Usuario:** Como usuario, quiero editar posts existentes, para corregir o actualizar el contenido.

#### Criterios de Aceptación

1. WHEN el usuario hace clic en el botón "Editar" de un post, THE Sistema SHALL obtener los datos actuales del post desde la API_Posts
2. WHEN los datos se cargan, THE Sistema SHALL mostrar un formulario con los campos título y contenido pre-rellenados
3. WHEN el usuario modifica los campos y hace clic en "Guardar", THE Sistema SHALL validar que ambos campos contengan texto
4. IF el usuario intenta guardar sin completar los campos requeridos, THEN THE Sistema SHALL mostrar un mensaje de validación
5. WHEN la validación es exitosa, THE Sistema SHALL enviar una solicitud PUT a la API_Posts con los datos actualizados
6. WHEN la actualización es exitosa, THE Sistema SHALL mostrar un mensaje de confirmación y actualizar la vista del post
7. WHEN la API_Posts rechaza la solicitud, THE Sistema SHALL mostrar un mensaje de error descriptivo

### Requisito 5: Eliminar Post

**Historia de Usuario:** Como usuario, quiero eliminar posts, para remover contenido que ya no deseo compartir.

#### Criterios de Aceptación

1. WHEN el usuario hace clic en el botón "Eliminar" de un post, THE Sistema SHALL mostrar una confirmación antes de proceder
2. WHEN el usuario confirma la eliminación, THE Sistema SHALL enviar una solicitud DELETE a la API_Posts
3. WHEN la eliminación es exitosa, THE Sistema SHALL remover el post de la vista y mostrar un mensaje de confirmación
4. WHEN la API_Posts rechaza la solicitud, THE Sistema SHALL mostrar un mensaje de error descriptivo
5. WHEN la eliminación falla, THE Sistema SHALL mantener el post visible en la interfaz

### Requisito 6: Interfaz Responsiva con Tailwind CSS

**Historia de Usuario:** Como usuario, quiero que la aplicación se vea bien en cualquier dispositivo, para acceder desde móvil, tablet o escritorio.

#### Criterios de Aceptación

1. THE Sistema SHALL utilizar Tailwind_CSS para todos los estilos de la Interfaz_Usuario
2. WHEN la aplicación se visualiza en pantalla móvil (< 768px), THE Sistema SHALL mostrar una columna de contenido
3. WHEN la aplicación se visualiza en pantalla tablet (768px - 1024px), THE Sistema SHALL mostrar dos columnas de contenido
4. WHEN la aplicación se visualiza en pantalla de escritorio (> 1024px), THE Sistema SHALL mostrar tres o más columnas según corresponda
5. THE Sistema SHALL mantener todos los elementos accesibles y legibles en cualquier tamaño de pantalla
6. THE Sistema SHALL utilizar colores, espaciado y tipografía consistentes en toda la aplicación

### Requisito 7: Manejo de Errores de Conectividad

**Historia de Usuario:** Como usuario, quiero recibir mensajes claros cuando hay problemas de conexión, para entender qué salió mal.

#### Criterios de Aceptación

1. WHEN la API_Dog no responde, THE Sistema SHALL mostrar un mensaje de error específico indicando el problema
2. WHEN la API_Posts no responde, THE Sistema SHALL mostrar un mensaje de error específico indicando el problema
3. WHEN hay un error de validación de datos, THE Sistema SHALL mostrar un mensaje que indique qué campo tiene el problema
4. WHEN hay un error de red, THE Sistema SHALL mostrar un mensaje sugiriendo al usuario verificar su conexión
5. THE Sistema SHALL permitir al usuario reintentar la operación después de un error

### Requisito 8: Persistencia de Datos en Sesión

**Historia de Usuario:** Como usuario, quiero que los cambios que realizo se reflejen inmediatamente en la interfaz, para tener una experiencia fluida.

#### Criterios de Aceptación

1. WHEN el usuario crea un nuevo post, THE Sistema SHALL actualizar la vista inmediatamente sin recargar la página
2. WHEN el usuario edita un post, THE Sistema SHALL actualizar la tarjeta del post con los nuevos datos
3. WHEN el usuario elimina un post, THE Sistema SHALL remover la tarjeta del post de la vista inmediatamente
4. WHEN el usuario recarga la página, THE Sistema SHALL obtener los datos más recientes de las APIs externas

### Requisito 9: Navegación y Estructura de Página

**Historia de Usuario:** Como usuario, quiero una navegación clara y una estructura lógica, para encontrar fácilmente lo que busco.

#### Criterios de Aceptación

1. THE Sistema SHALL mostrar un encabezado con el título de la aplicación
2. THE Sistema SHALL mostrar botones de navegación claramente etiquetados para acceder a razas de perros y posts
3. WHEN el usuario hace clic en un botón de navegación, THE Sistema SHALL cambiar la sección visible sin recargar la página
4. THE Sistema SHALL mostrar un área principal donde se carga el contenido dinámico
5. THE Sistema SHALL mostrar un pie de página con información de créditos o enlaces útiles

### Requisito 10: Validación de Formularios

**Historia de Usuario:** Como usuario, quiero que la aplicación valide mis entradas, para evitar enviar datos incompletos o inválidos.

#### Criterios de Aceptación

1. WHEN el usuario intenta crear un post sin título, THE Sistema SHALL mostrar un mensaje de error indicando que el título es requerido
2. WHEN el usuario intenta crear un post sin contenido, THE Sistema SHALL mostrar un mensaje de error indicando que el contenido es requerido
3. WHEN el usuario intenta editar un post sin título, THE Sistema SHALL mostrar un mensaje de error indicando que el título es requerido
4. WHEN el usuario intenta editar un post sin contenido, THE Sistema SHALL mostrar un mensaje de error indicando que el contenido es requerido
5. THE Sistema SHALL limpiar los mensajes de error cuando el usuario corrija los campos

## Propiedades de Corrección (Acceptance Criteria Avanzados)

### Propiedad 1: Invariante de Consistencia de Datos

Para cualquier post en la interfaz, después de una operación de lectura desde la API_Posts, los datos mostrados deben ser idénticos a los datos retornados por la API.

**Testeable como:** Propiedad - Invariante

### Propiedad 2: Round-Trip de Posts

Para cualquier post creado o editado, si se obtiene el post desde la API_Posts inmediatamente después de la operación, los datos deben ser equivalentes a los datos enviados.

**Testeable como:** Propiedad - Round-Trip

Ejemplo: `crear_post(titulo, contenido) → obtener_post(id) → datos_obtenidos == {titulo, contenido}`

### Propiedad 3: Idempotencia de Lectura

Si se ejecuta la operación "Cargar razas" dos veces consecutivas sin cambios en la API_Dog, la interfaz debe mostrar el mismo listado de razas.

**Testeable como:** Propiedad - Idempotencia

### Propiedad 4: Metamórfica de Eliminación

El número de posts mostrados después de eliminar un post debe ser exactamente uno menos que antes de la eliminación.

**Testeable como:** Propiedad - Metamórfica

### Propiedad 5: Validación de Errores

Si la API_Posts retorna un error, el Sistema debe mostrar un mensaje de error y no debe modificar el estado de la interfaz.

**Testeable como:** Caso de Error

