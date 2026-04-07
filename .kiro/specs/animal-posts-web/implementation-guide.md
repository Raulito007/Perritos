# Guía de Implementación: Web de Animales y Posts

## Estructura HTML Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animales y Posts</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold">🐕 Animales y Posts</h1>
            <p class="text-blue-100 mt-2">Explora razas de perros y gestiona posts</p>
        </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex gap-4 justify-center py-4">
                <button id="navDogs" class="nav-btn active px-6 py-2 rounded-lg font-semibold transition">
                    🐕 Razas de Perros
                </button>
                <button id="navPosts" class="nav-btn px-6 py-2 rounded-lg font-semibold transition">
                    📝 Posts
                </button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
        <!-- Error Container -->
        <div id="error-container" class="mb-4"></div>

        <!-- Dogs Section -->
        <section id="dogsSection" class="section-content">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Razas de Perros</h2>
                <button id="loadDogsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                    Cargar Razas
                </button>
            </div>
            <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Razas se cargarán aquí -->
            </div>
        </section>

        <!-- Posts Section (Hidden by default) -->
        <section id="postsSection" class="section-content hidden">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Posts</h2>
                <div class="flex gap-4">
                    <button id="loadPostsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                        Cargar Posts
                    </button>
                    <button id="createPostBtn" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                        + Crear Post
                    </button>
                </div>
            </div>
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Posts se cargarán aquí -->
            </div>
        </section>
    </main>

    <!-- Modal para Crear/Editar Post -->
    <div id="postModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h3 id="modalTitle" class="text-2xl font-bold mb-4">Crear Post</h3>
            <form id="postForm">
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Título</label>
                    <input type="text" id="postTitle" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="Ingresa el título">
                    <span id="titleError" class="text-red-500 text-sm mt-1 hidden"></span>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Contenido</label>
                    <textarea id="postBody" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 h-32" placeholder="Ingresa el contenido"></textarea>
                    <span id="bodyError" class="text-red-500 text-sm mt-1 hidden"></span>
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                        Guardar
                    </button>
                    <button type="button" id="closeModalBtn" class="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white text-center py-4 mt-8">
        <p>© 2024 Animales y Posts. Datos de <a href="https://dog.ceo" class="text-blue-400 hover:underline">dog.ceo</a> y <a href="https://jsonplaceholder.typicode.com" class="text-blue-400 hover:underline">JSONPlaceholder</a></p>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
```

## Estructura de JavaScript

### js/main.js

```javascript
$(function() {
    // Inicializar aplicación
    initializeApp();
    
    // Event listeners
    setupEventListeners();
});

function initializeApp() {
    // Cargar datos iniciales si es necesario
    console.log('Aplicación inicializada');
}

function setupEventListeners() {
    // Navegación
    $('#navDogs').on('click', () => switchSection('dogs'));
    $('#navPosts').on('click', () => switchSection('posts'));
    
    // Razas
    $('#loadDogsBtn').on('click', loadDogs);
    
    // Posts
    $('#loadPostsBtn').on('click', loadPosts);
    $('#createPostBtn').on('click', openCreatePostModal);
    $('#closeModalBtn').on('click', closePostModal);
    $('#postForm').on('submit', handlePostFormSubmit);
    
    // Delegación para botones dinámicos
    $(document).on('click', '.editPostBtn', handleEditPost);
    $(document).on('click', '.deletePostBtn', handleDeletePost);
}

function switchSection(section) {
    // Ocultar todas las secciones
    $('.section-content').addClass('hidden');
    
    // Mostrar sección seleccionada
    if (section === 'dogs') {
        $('#dogsSection').removeClass('hidden');
        $('#navDogs').addClass('active');
        $('#navPosts').removeClass('active');
    } else if (section === 'posts') {
        $('#postsSection').removeClass('hidden');
        $('#navPosts').addClass('active');
        $('#navDogs').removeClass('active');
    }
}
```

### js/api.js

```javascript
const API_CONFIG = {
    DOG_API: 'https://dog.ceo/api',
    POSTS_API: 'https://jsonplaceholder.typicode.com'
};

function getDogBreeds() {
    return $.ajax({
        url: `${API_CONFIG.DOG_API}/breeds/list/all`,
        method: 'GET',
        dataType: 'json',
        timeout: 5000
    });
}

function getDogImage(breed) {
    return $.ajax({
        url: `${API_CONFIG.DOG_API}/breed/${breed}/images/random`,
        method: 'GET',
        dataType: 'json',
        timeout: 5000
    });
}

function getPosts() {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts`,
        method: 'GET',
        dataType: 'json',
        timeout: 5000
    });
}

function getPost(id) {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts/${id}`,
        method: 'GET',
        dataType: 'json',
        timeout: 5000
    });
}

function createPost(title, body) {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts`,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({
            title: title,
            body: body,
            userId: 1
        }),
        timeout: 5000
    });
}

function updatePost(id, title, body) {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts/${id}`,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({
            id: id,
            title: title,
            body: body,
            userId: 1
        }),
        timeout: 5000
    });
}

function deletePost(id) {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts/${id}`,
        method: 'DELETE',
        timeout: 5000
    });
}
```

### js/validators.js

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

function showValidationErrors(errors) {
    clearValidationErrors();
    
    if (errors.title) {
        $('#titleError').text(errors.title).removeClass('hidden');
    }
    
    if (errors.body) {
        $('#bodyError').text(errors.body).removeClass('hidden');
    }
}

function clearValidationErrors() {
    $('#titleError').addClass('hidden').text('');
    $('#bodyError').addClass('hidden').text('');
}
```

### js/ui.js

```javascript
function renderDogCard(breed, imageUrl) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <img src="${imageUrl}" alt="${breed}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800 capitalize">${breed}</h3>
            </div>
        </div>
    `;
}

function renderPostCard(post) {
    return `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition" data-post-id="${post.id}">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">${escapeHtml(post.title)}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3">${escapeHtml(post.body)}</p>
            <div class="flex gap-2">
                <button class="editPostBtn flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-semibold transition">
                    Editar
                </button>
                <button class="deletePostBtn flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-semibold transition">
                    Eliminar
                </button>
            </div>
        </div>
    `;
}

function showError(message) {
    const errorDiv = $('<div>')
        .addClass('bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative')
        .html(`
            <strong>Error:</strong> ${message}
            <button class="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                Reintentar
            </button>
        `);
    $('#error-container').html(errorDiv);
}

function showSuccess(message) {
    const successDiv = $('<div>')
        .addClass('bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded')
        .text(message);
    $('#error-container').html(successDiv);
    setTimeout(() => $('#error-container').empty(), 3000);
}

function clearError() {
    $('#error-container').empty();
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
```

### js/events.js

```javascript
function loadDogs() {
    clearError();
    $('#dogsContainer').html('<p class="col-span-full text-center text-gray-500">Cargando razas...</p>');
    
    getDogBreeds()
        .done(function(data) {
            const breeds = Object.keys(data.message);
            let html = '';
            let loadedCount = 0;
            
            breeds.forEach(breed => {
                getDogImage(breed)
                    .done(function(imageData) {
                        html += renderDogCard(breed, imageData.message);
                        loadedCount++;
                        
                        if (loadedCount === breeds.length) {
                            $('#dogsContainer').html(html);
                        }
                    })
                    .fail(function() {
                        loadedCount++;
                    });
            });
        })
        .fail(function() {
            showError('No se pudo conectar con el servidor de razas. Verifica tu conexión a internet.');
        });
}

function loadPosts() {
    clearError();
    $('#postsContainer').html('<p class="col-span-full text-center text-gray-500">Cargando posts...</p>');
    
    getPosts()
        .done(function(data) {
            let html = '';
            data.forEach(post => {
                html += renderPostCard(post);
            });
            $('#postsContainer').html(html);
        })
        .fail(function() {
            showError('No se pudo conectar con el servidor de posts. Verifica tu conexión a internet.');
        });
}

function openCreatePostModal() {
    clearValidationErrors();
    $('#postForm')[0].reset();
    $('#modalTitle').text('Crear Post');
    $('#postModal').removeClass('hidden');
    $('#postTitle').focus();
}

function closePostModal() {
    $('#postModal').addClass('hidden');
    $('#postForm')[0].reset();
    clearValidationErrors();
}

function handlePostFormSubmit(e) {
    e.preventDefault();
    
    const title = $('#postTitle').val();
    const body = $('#postBody').val();
    
    const validation = validatePost(title, body);
    
    if (!validation.isValid) {
        showValidationErrors(validation.errors);
        return;
    }
    
    clearValidationErrors();
    clearError();
    
    const postId = $('#postForm').data('post-id');
    
    if (postId) {
        // Editar
        updatePost(postId, title, body)
            .done(function() {
                showSuccess('Post actualizado correctamente');
                closePostModal();
                loadPosts();
            })
            .fail(function() {
                showError('Error al actualizar el post. Intenta de nuevo.');
            });
    } else {
        // Crear
        createPost(title, body)
            .done(function() {
                showSuccess('Post creado correctamente');
                closePostModal();
                loadPosts();
            })
            .fail(function() {
                showError('Error al crear el post. Intenta de nuevo.');
            });
    }
}

function handleEditPost() {
    const postId = $(this).closest('[data-post-id]').data('post-id');
    
    getPost(postId)
        .done(function(post) {
            $('#postTitle').val(post.title);
            $('#postBody').val(post.body);
            $('#modalTitle').text('Editar Post');
            $('#postForm').data('post-id', postId);
            $('#postModal').removeClass('hidden');
            $('#postTitle').focus();
        })
        .fail(function() {
            showError('Error al obtener el post para editar.');
        });
}

function handleDeletePost() {
    const postId = $(this).closest('[data-post-id]').data('post-id');
    
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
        deletePost(postId)
            .done(function() {
                showSuccess('Post eliminado correctamente');
                loadPosts();
            })
            .fail(function() {
                showError('Error al eliminar el post. Intenta de nuevo.');
            });
    }
}
```

## Estilos Personalizados (css/custom.css)

```css
/* Estilos personalizados adicionales */

.nav-btn {
    @apply bg-white text-gray-800 border-2 border-transparent;
}

.nav-btn.active {
    @apply bg-blue-600 text-white border-blue-600;
}

.nav-btn:hover {
    @apply border-blue-600;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Animaciones */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 0.3s ease-in;
}
```

## Notas de Implementación

1. **Manejo de Errores**: Siempre mostrar mensajes claros al usuario
2. **Validación**: Validar en cliente antes de enviar al servidor
3. **UX**: Mostrar indicadores de carga mientras se obtienen datos
4. **Responsividad**: Probar en diferentes tamaños de pantalla
5. **Accesibilidad**: Agregar labels y ARIA attributes
6. **Performance**: Cachear datos cuando sea posible
