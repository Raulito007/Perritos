# Documento de Diseño Técnico: Web de Animales y Posts

## Overview

La aplicación web de animales y posts es una interfaz moderna y responsiva que integra dos APIs externas: dog.ceo (para razas de perros) y JSONPlaceholder (para posts). La aplicación proporciona funcionalidad CRUD completa para posts, visualización de razas de perros con imágenes, y una experiencia de usuario fluida sin recargas de página.

**Stack Tecnológico:**
- Frontend: HTML5, CSS3 (Tailwind CSS), JavaScript (jQuery)
- APIs Externas: dog.ceo API, JSONPlaceholder API
- Arquitectura: Single Page Application (SPA) con AJAX

## Architecture

### Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    Navegador del Usuario                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Capa de Presentación (UI)               │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │  Header     │  │  Navigation  │  │   Footer   │  │   │
│  │  └─────────────┘  └──────────────┘  └────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │         Área de Contenido Dinámico           │   │   │
│  │  │  ┌──────────────┐  ┌──────────────────────┐ │   │   │
│  │  │  │ Razas Perros │  │ Posts (CRUD)         │ │   │   │
│  │  │  └──────────────┘  └──────────────────────┘ │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Capa de Lógica (jQuery + AJAX)               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │ Event Handler│  │ API Manager  │  │ Validator  │ │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         │                                    │
         │ AJAX Requests                      │
         ▼                                    ▼
    ┌─────────────────┐              ┌──────────────────┐
    │   dog.ceo API   │              │ JSONPlaceholder  │
    │  (GET razas)    │              │  (CRUD posts)    │
    └─────────────────┘              └──────────────────┘
```

### Flujo de Datos

1. **Carga Inicial**: Usuario accede a la página → Se carga HTML + CSS + jQuery
2. **Interacción**: Usuario hace clic en botones → jQuery captura eventos
3. **Solicitud AJAX**: Se envía solicitud a API externa
4. **Respuesta**: API retorna datos JSON
5. **Renderizado**: jQuery actualiza el DOM con los datos
6. **Actualización UI**: Tailwind CSS aplica estilos responsivos

## Components and Interfaces

### Estructura de Componentes

#### 1. Header (Encabezado)
- Título de la aplicación
- Logo o icono
- Clases Tailwind: `bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg`

#### 2. Navigation (Navegación)
- Botones para cambiar entre secciones
- Indicador de sección activa
- Clases Tailwind: `flex gap-4 justify-center py-4 bg-gray-100 border-b`

#### 3. Main Content Area (Área de Contenido)
- Contenedor dinámico para razas o posts
- Clases Tailwind: `container mx-auto px-4 py-8`

#### 4. Dogs Section (Sección de Razas)
- Grid responsivo de razas
- Cada tarjeta contiene: nombre, imagen
- Clases Tailwind: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

#### 5. Posts Section (Sección de Posts)
- Grid responsivo de posts
- Cada tarjeta contiene: título, contenido, botones de acción
- Clases Tailwind: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

#### 6. Form Modal (Formulario Modal)
- Formulario para crear/editar posts
- Campos: título, contenido
- Botones: Guardar, Cancelar
- Clases Tailwind: `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`

#### 7. Footer (Pie de Página)
- Información de créditos
- Enlaces útiles
- Clases Tailwind: `bg-gray-800 text-white text-center py-4 mt-8`

### Paleta de Colores

```
Primario:     #2563EB (Blue-600)
Secundario:   #1E40AF (Blue-800)
Éxito:        #10B981 (Green-500)
Error:        #EF4444 (Red-500)
Advertencia:  #F59E0B (Amber-500)
Fondo:        #F9FAFB (Gray-50)
Texto:        #1F2937 (Gray-800)
Borde:        #E5E7EB (Gray-200)
```

### Tipografía

```
Encabezados (h1, h2, h3):  font-bold, text-gray-800
Párrafos:                   font-normal, text-gray-700
Botones:                    font-semibold, text-white
Etiquetas:                  font-medium, text-gray-600
```

## Data Models

### Modelo de Datos: Raza de Perro

```javascript
{
  name: string,           // Nombre de la raza (ej: "labrador")
  imageUrl: string        // URL de la imagen de la raza
}
```

**Fuente**: dog.ceo API
**Endpoint**: `GET https://dog.ceo/api/breeds/list/all`

### Modelo de Datos: Post

```javascript
{
  id: number,             // ID único del post
  title: string,          // Título del post
  body: string,           // Contenido del post
  userId: number          // ID del usuario que creó el post
}
```

**Fuente**: JSONPlaceholder API
**Endpoints**:
- `GET /posts` - Obtener todos los posts
- `GET /posts/{id}` - Obtener un post específico
- `POST /posts` - Crear nuevo post
- `PUT /posts/{id}` - Actualizar post
- `DELETE /posts/{id}` - Eliminar post

### Estructura de Validación

```javascript
{
  title: {
    required: true,
    minLength: 1,
    maxLength: 200,
    errorMessage: "El título es requerido y debe tener entre 1 y 200 caracteres"
  },
  body: {
    required: true,
    minLength: 1,
    maxLength: 5000,
    errorMessage: "El contenido es requerido y debe tener entre 1 y 5000 caracteres"
  }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Dogs API Connection and Rendering

*For any* successful response from the dog.ceo API, the system should render each breed with its name and image in the UI without data loss or corruption.

**Validates: Requirements 1.1, 1.2**

### Property 2: Posts API Connection and Rendering

*For any* successful response from the JSONPlaceholder API, the system should render each post with its title, body, and action buttons in the UI.

**Validates: Requirements 2.1, 2.2**

### Property 3: Form Validation on Create

*For any* attempt to create a post with empty or whitespace-only title or body, the system should reject the submission and display a validation error message.

**Validates: Requirements 3.2, 3.3, 10.1, 10.2**

### Property 4: Form Validation on Edit

*For any* attempt to edit a post with empty or whitespace-only title or body, the system should reject the submission and display a validation error message.

**Validates: Requirements 4.3, 4.4, 10.3, 10.4**

### Property 5: Post Creation Round-Trip

*For any* valid post data submitted through the create form, after successful creation, the post should appear in the posts list with identical title and body.

**Validates: Requirements 3.4, 3.5, 8.1**

### Property 6: Post Update Round-Trip

*For any* post being edited with new title and body, after successful update, the post in the list should reflect the new data.

**Validates: Requirements 4.5, 4.6, 8.2**

### Property 7: Post Deletion Idempotence

*For any* post in the list, after successful deletion, the post should no longer appear in the rendered list, and the total count should decrease by exactly one.

**Validates: Requirements 5.2, 5.3, 8.3**

### Property 8: Error Handling Preservation

*For any* failed API request, the system should display an error message and preserve the current UI state without removing or corrupting existing data.

**Validates: Requirements 1.3, 2.3, 3.6, 4.7, 5.4, 5.5, 7.1, 7.2**

### Property 9: Responsive Layout Mobile

*For any* viewport width less than 768px, the system should render content in a single column layout with all elements visible and readable.

**Validates: Requirements 6.2**

### Property 10: Responsive Layout Tablet

*For any* viewport width between 768px and 1024px, the system should render content in a two-column layout with proper spacing.

**Validates: Requirements 6.3**

### Property 11: Responsive Layout Desktop

*For any* viewport width greater than 1024px, the system should render content in a three-column layout with proper spacing.

**Validates: Requirements 6.4**

### Property 12: Navigation State Switching

*For any* click on a navigation button, the system should switch the visible section without reloading the page and update the active button indicator.

**Validates: Requirements 9.3**

### Property 13: Error Message Clearing

*For any* validation error message displayed, when the user corrects the field and the validation passes, the error message should be removed from the UI.

**Validates: Requirements 10.5**

### Property 14: Retry Functionality

*For any* failed API request with an error message displayed, the user should be able to click a retry button to attempt the operation again.

**Validates: Requirements 7.5**

## Error Handling

### Estrategia de Manejo de Errores

#### 1. Errores de Conectividad

**Escenario**: API no responde o timeout
**Acción**: 
- Mostrar mensaje: "No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet."
- Mostrar botón "Reintentar"
- Mantener datos anteriores en pantalla

#### 2. Errores de Validación

**Escenario**: Campos vacíos o inválidos en formulario
**Acción**:
- Mostrar mensaje específico por campo
- Resaltar campo con error (borde rojo)
- Prevenir envío del formulario

#### 3. Errores de API

**Escenario**: API retorna error 4xx o 5xx
**Acción**:
- Mostrar mensaje: "Error al procesar la solicitud. Por favor, intenta de nuevo."
- Registrar error en consola para debugging
- Permitir reintento

#### 4. Errores de Parsing

**Escenario**: Respuesta de API no es JSON válido
**Acción**:
- Mostrar mensaje genérico de error
- Registrar respuesta en consola

### Implementación en jQuery

```javascript
function showError(message) {
  const errorDiv = $('<div>')
    .addClass('bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded')
    .text(message);
  $('#error-container').html(errorDiv);
  setTimeout(() => $('#error-container').empty(), 5000);
}

function clearError() {
  $('#error-container').empty();
}
```

## Testing Strategy

### Enfoque Dual de Testing

#### Unit Tests (Pruebas Unitarias)

Enfocadas en casos específicos, ejemplos concretos y condiciones de error:

1. **Validación de Formularios**
   - Prueba: Campo título vacío → debe mostrar error
   - Prueba: Campo contenido vacío → debe mostrar error
   - Prueba: Ambos campos válidos → debe permitir envío

2. **Renderizado de Componentes**
   - Prueba: Renderizar tarjeta de raza con datos válidos
   - Prueba: Renderizar tarjeta de post con datos válidos
   - Prueba: Mostrar mensaje de error cuando API falla

3. **Integración de Eventos**
   - Prueba: Click en botón "Cargar razas" → debe hacer AJAX call
   - Prueba: Click en botón "Crear post" → debe mostrar formulario
   - Prueba: Click en botón "Eliminar" → debe mostrar confirmación

#### Property-Based Tests (Pruebas Basadas en Propiedades)

Enfocadas en propiedades universales que deben cumplirse para todos los inputs:

**Configuración General**:
- Mínimo 100 iteraciones por test
- Usar generadores aleatorios para datos
- Cada test referencia una propiedad del documento de diseño

**Propiedades a Probar**:

1. **Property 1: Dogs API Connection and Rendering**
   - Generar: Respuesta aleatoria de dog.ceo API
   - Verificar: Cada raza aparece en el DOM con nombre e imagen
   - Tag: `Feature: animal-posts-web, Property 1: Dogs API Connection and Rendering`

2. **Property 3: Form Validation on Create**
   - Generar: Strings aleatorios (vacíos, espacios, válidos)
   - Verificar: Solo strings válidos pasan validación
   - Tag: `Feature: animal-posts-web, Property 3: Form Validation on Create`

3. **Property 5: Post Creation Round-Trip**
   - Generar: Datos aleatorios de post
   - Verificar: Post creado aparece en lista con datos idénticos
   - Tag: `Feature: animal-posts-web, Property 5: Post Creation Round-Trip`

4. **Property 7: Post Deletion Idempotence**
   - Generar: Lista aleatoria de posts
   - Verificar: Después de eliminar, count disminuye exactamente en 1
   - Tag: `Feature: animal-posts-web, Property 7: Post Deletion Idempotence`

5. **Property 9-11: Responsive Layout**
   - Generar: Viewports aleatorios en rangos (móvil, tablet, desktop)
   - Verificar: Número correcto de columnas para cada rango
   - Tag: `Feature: animal-posts-web, Property 9-11: Responsive Layout`

### Herramientas de Testing Recomendadas

- **Unit Testing**: Jest o Mocha + Chai
- **Property-Based Testing**: fast-check (JavaScript)
- **E2E Testing**: Cypress o Playwright
- **Mocking de APIs**: Sinon.js o MSW (Mock Service Worker)

### Cobertura de Testing

- Validación de formularios: 100%
- Manejo de errores: 100%
- Renderizado de componentes: 90%+
- Integración con APIs: 85%+ (usando mocks)
- Responsividad: 80%+

## Estructura de Carpetas y Archivos

```
proyecto-animales-posts/
├── index.html                 # Página principal
├── css/
│   ├── tailwind.css          # Tailwind CSS compilado
│   └── custom.css            # Estilos personalizados adicionales
├── js/
│   ├── main.js               # Lógica principal
│   ├── api.js                # Gestión de llamadas AJAX
│   ├── validators.js         # Funciones de validación
│   ├── ui.js                 # Funciones de renderizado
│   └── events.js             # Manejadores de eventos
├── lib/
│   └── jquery-3.6.0.min.js   # jQuery
├── tests/
│   ├── unit/
│   │   ├── validators.test.js
│   │   ├── ui.test.js
│   │   └── api.test.js
│   └── properties/
│       ├── dogs-api.property.js
│       ├── posts-crud.property.js
│       └── validation.property.js
├── .kiro/
│   └── specs/
│       └── animal-posts-web/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
└── README.md
```

## Detalles Técnicos de Implementación

### Integración con dog.ceo API

**Endpoint**: `https://dog.ceo/api/breeds/list/all`

**Respuesta Esperada**:
```json
{
  "message": {
    "affenpinscher": [],
    "african": [],
    "airedale": [],
    ...
  },
  "status": "success"
}
```

**Procesamiento**:
1. Obtener lista de razas del objeto `message`
2. Para cada raza, obtener imagen aleatoria de: `https://dog.ceo/api/breed/{breed}/images/random`
3. Renderizar en grid

### Integración con JSONPlaceholder API

**Endpoints**:
- `GET /posts` - Obtener todos los posts (máx 100)
- `GET /posts/{id}` - Obtener post específico
- `POST /posts` - Crear post (retorna ID simulado)
- `PUT /posts/{id}` - Actualizar post
- `DELETE /posts/{id}` - Eliminar post

**Nota**: JSONPlaceholder es una API de demostración. Los cambios no persisten en el servidor real.

### Configuración de AJAX con jQuery

```javascript
$.ajax({
  url: 'https://api.example.com/endpoint',
  method: 'GET|POST|PUT|DELETE',
  dataType: 'json',
  contentType: 'application/json; charset=UTF-8',
  data: JSON.stringify(data),
  timeout: 5000,
  success: function(response) {
    // Manejar éxito
  },
  error: function(xhr, status, error) {
    // Manejar error
  }
});
```

### Responsividad con Tailwind CSS

**Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Ejemplo de Grid Responsivo**:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Contenido -->
</div>
```

- Móvil (< 768px): 1 columna
- Tablet (768px - 1024px): 2 columnas
- Desktop (> 1024px): 3 columnas

### Validación de Formularios

```javascript
function validatePost(title, body) {
  const errors = {};
  
  if (!title || title.trim() === '') {
    errors.title = 'El título es requerido';
  }
  
  if (!body || body.trim() === '') {
    errors.body = 'El contenido es requerido';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}
```

### Manejo de Estado de UI

```javascript
const appState = {
  currentSection: 'dogs',  // 'dogs' o 'posts'
  posts: [],
  dogs: [],
  loading: false,
  error: null
};

function updateState(updates) {
  Object.assign(appState, updates);
  render();
}
```

## Consideraciones de Seguridad

1. **Validación de Entrada**: Validar todos los inputs del usuario
2. **Sanitización**: Escapar HTML en contenido dinámico
3. **CORS**: Las APIs externas deben permitir CORS
4. **HTTPS**: Usar HTTPS en producción
5. **Rate Limiting**: Implementar límite de solicitudes por usuario

## Performance

1. **Caching**: Cachear respuestas de API en sessionStorage
2. **Lazy Loading**: Cargar imágenes bajo demanda
3. **Minificación**: Minificar CSS y JavaScript
4. **Compresión**: Comprimir respuestas del servidor
5. **CDN**: Servir assets desde CDN

## Accesibilidad

1. **ARIA Labels**: Agregar etiquetas ARIA a elementos interactivos
2. **Keyboard Navigation**: Soportar navegación por teclado
3. **Color Contrast**: Mantener contraste suficiente
4. **Alt Text**: Agregar texto alternativo a imágenes
5. **Semantic HTML**: Usar elementos HTML semánticos
