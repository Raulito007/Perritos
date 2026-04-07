// Manejadores de eventos

function loadDogs() {
    clearError();
    showSpinner('Cargando razas...');
    
    // Store the operation for retry
    lastFailedOperation = loadDogs;
    
    getDogBreeds()
        .done(function(data) {
            const breeds = Object.keys(data.message);
            
            if (breeds.length === 0) {
                hideSpinner();
                $('#dogsContainer').html('<p class="col-span-full text-center text-gray-500">No se encontraron razas.</p>');
                lastFailedOperation = null;
                return;
            }
            
            // Fetch all images in parallel
            const breedsData = [];
            let loadedCount = 0;
            
            breeds.forEach((breed, index) => {
                getDogImage(breed)
                    .done(function(imageData) {
                        breedsData[index] = {
                            name: breed,
                            imageUrl: imageData.message
                        };
                        loadedCount++;
                        
                        if (loadedCount === breeds.length) {
                            // All images loaded, render grid
                            hideSpinner();
                            const validBreeds = breedsData.filter(breed => breed && breed.imageUrl);
                            const html = renderBreedsGrid(validBreeds);
                            $('#dogsContainer').html(html);
                            lastFailedOperation = null;
                        }
                    })
                    .fail(function() {
                        breedsData[index] = {
                            name: breed,
                            imageUrl: null
                        };
                        loadedCount++;
                        
                        if (loadedCount === breeds.length) {
                            // All images loaded (or failed), render grid
                            hideSpinner();
                            const validBreeds = breedsData.filter(breed => breed && breed.imageUrl);
                            const html = renderBreedsGrid(validBreeds);
                            $('#dogsContainer').html(html);
                            lastFailedOperation = null;
                        }
                    });
            });
        })
        .fail(function(xhr, status, error) {
            hideSpinner();
            const errorInfo = parseAjaxError(xhr, status, error);
            showError(errorInfo.message, true);
        });
}

function loadPosts() {
    clearError();
    showSpinner('Cargando posts...');
    
    // Store the operation for retry
    lastFailedOperation = loadPosts;
    
    getPosts()
        .done(function(data) {
            hideSpinner();
            const html = renderPostsGrid(data);
            $('#postsContainer').html(html);
            lastFailedOperation = null;
        })
        .fail(function(xhr, status, error) {
            hideSpinner();
            const errorInfo = parseAjaxError(xhr, status, error);
            showError(errorInfo.message, true);
            console.error('Error loading posts:', errorInfo);
        });
}

function openCreatePostModal() {
    clearValidationErrors();
    $('#postForm')[0].reset();
    $('#postForm').removeData('post-id');
    $('#modalTitle').text('Crear Post');
    $('#postModal').removeClass('hidden');
    $('#postTitle').focus();
}

function closePostModal() {
    $('#postModal').addClass('hidden');
    $('#postForm')[0].reset();
    $('#postForm').removeData('post-id');
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
        lastFailedOperation = function() {
            handlePostFormSubmit({ preventDefault: function() {} });
        };
        
        updatePost(postId, title, body)
            .done(function() {
                showSuccess('Post actualizado correctamente');
                closePostModal();
                loadPosts();
            })
            .fail(function(xhr, status, error) {
                const errorInfo = parseAjaxError(xhr, status, error);
                showError(errorInfo.message, true);
                console.error('Error updating post:', errorInfo);
            });
    } else {
        // Crear
        lastFailedOperation = function() {
            handlePostFormSubmit({ preventDefault: function() {} });
        };
        
        createPost(title, body)
            .done(function() {
                showSuccess('Post creado correctamente');
                closePostModal();
                loadPosts();
            })
            .fail(function(xhr, status, error) {
                const errorInfo = parseAjaxError(xhr, status, error);
                showError(errorInfo.message, true);
                console.error('Error creating post:', errorInfo);
            });
    }
}

function handleEditPost() {
    const postId = $(this).closest('[data-post-id]').data('post-id');
    
    lastFailedOperation = function() {
        handleEditPost.call(this);
    };
    
    getPost(postId)
        .done(function(post) {
            $('#postTitle').val(post.title);
            $('#postBody').val(post.body);
            $('#modalTitle').text('Editar Post');
            $('#postForm').data('post-id', postId);
            $('#postModal').removeClass('hidden');
            $('#postTitle').focus();
            lastFailedOperation = null;
        })
        .fail(function(xhr, status, error) {
            const errorInfo = parseAjaxError(xhr, status, error);
            showError(errorInfo.message, true);
            console.error('Error loading post for edit:', errorInfo);
        });
}

function handleDeletePost() {
    const postId = $(this).closest('[data-post-id]').data('post-id');
    
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
        lastFailedOperation = function() {
            handleDeletePost.call(this);
        };
        
        deletePost(postId)
            .done(function() {
                showSuccess('Post eliminado correctamente');
                loadPosts();
            })
            .fail(function(xhr, status, error) {
                const errorInfo = parseAjaxError(xhr, status, error);
                showError(errorInfo.message, true);
                console.error('Error deleting post:', errorInfo);
            });
    }
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
