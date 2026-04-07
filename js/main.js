// Lógica principal de la aplicación

$(function() {
    // Inicializar aplicación
    initializeApp();
    
    // Configurar event listeners
    setupEventListeners();
});

function initializeApp() {
    console.log('Aplicación inicializada');
    
    // Cargar datos automáticamente
    loadDogs();
    loadPosts();
}

function setupEventListeners() {
    // Navegación
    $('#navDogs').on('click', function() {
        switchSection('dogs');
    });
    
    $('#navPosts').on('click', function() {
        switchSection('posts');
    });
    
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
    
    // Cerrar modal al hacer clic fuera
    $('#postModal').on('click', function(e) {
        if (e.target === this) {
            closePostModal();
        }
    });
}
