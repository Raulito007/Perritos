// Funciones para interactuar con las APIs externas

// Error handling helper functions
function parseAjaxError(xhr, status, error) {
    let errorType = 'unknown';
    let userMessage = 'Error desconocido. Por favor, intenta de nuevo.';
    
    if (status === 'timeout') {
        errorType = 'timeout';
        userMessage = 'Tiempo de conexión agotado. Por favor, verifica tu conexión a internet e intenta de nuevo.';
    } else if (status === 'error') {
        if (!xhr.status) {
            errorType = 'network';
            userMessage = 'Error de conexión. Por favor, verifica tu conexión a internet.';
        } else if (xhr.status >= 500) {
            errorType = 'server';
            userMessage = 'Error del servidor. Por favor, intenta de nuevo más tarde.';
        } else if (xhr.status >= 400) {
            errorType = 'client';
            userMessage = 'Error en la solicitud. Por favor, intenta de nuevo.';
        }
    } else if (status === 'parsererror') {
        errorType = 'parse';
        userMessage = 'Error al procesar la respuesta del servidor. Por favor, intenta de nuevo.';
    }
    
    return {
        type: errorType,
        message: userMessage,
        status: status,
        httpStatus: xhr.status,
        error: error
    };
}

function getDogBreeds() {
    return $.ajax({
        url: `${API_CONFIG.DOG_API}/breeds/list/all`,
        method: 'GET',
        dataType: 'json',
        timeout: API_CONFIG.TIMEOUT
    });
}

function getDogImage(breed) {
    return $.ajax({
        url: `${API_CONFIG.DOG_API}/breed/${breed}/images/random`,
        method: 'GET',
        dataType: 'json',
        timeout: API_CONFIG.TIMEOUT
    });
}

function getPosts() {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts`,
        method: 'GET',
        dataType: 'json',
        timeout: API_CONFIG.TIMEOUT
    });
}

function getPost(id) {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts/${id}`,
        method: 'GET',
        dataType: 'json',
        timeout: API_CONFIG.TIMEOUT
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
        timeout: API_CONFIG.TIMEOUT
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
        timeout: API_CONFIG.TIMEOUT
    });
}

function deletePost(id) {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts/${id}`,
        method: 'DELETE',
        timeout: API_CONFIG.TIMEOUT
    });
}
