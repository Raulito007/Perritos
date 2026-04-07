// Funciones de renderizado y UI

// Store last operation for retry
let lastFailedOperation = null;

// Spinner functions
function showSpinner(text = 'Cargando...') {
    $('#spinnerText').text(text);
    $('#loadingSpinner').removeClass('hidden');
}

function hideSpinner() {
    $('#loadingSpinner').addClass('hidden');
}

function renderDogCard(breed, imageUrl) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
            <div class="relative overflow-hidden bg-gray-200 h-48">
                <img src="${imageUrl}" alt="${breed}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
            </div>
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 capitalize break-words">${escapeHtml(breed)}</h3>
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

function showError(message, retryable = true, errorType = 'general') {
    let errorHtml = `<strong>Error:</strong> ${message}`;
    
    if (retryable && lastFailedOperation) {
        errorHtml += `
            <button class="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm retry-btn">
                Reintentar
            </button>
        `;
    }
    
    const errorDiv = $('<div>')
        .addClass('bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative')
        .attr('data-error-type', errorType)
        .html(errorHtml);
    
    $('#error-container').html(errorDiv);
    
    // Attach retry handler if retryable
    if (retryable && lastFailedOperation) {
        $('#error-container').on('click', '.retry-btn', function() {
            clearError();
            lastFailedOperation();
        });
    }
    
    // Auto-clear after 5 seconds
    setTimeout(() => {
        if ($('#error-container').find('[data-error-type="' + errorType + '"]').length > 0) {
            clearError();
        }
    }, 5000);
}

function showSuccess(message) {
    const successDiv = $('<div>')
        .addClass('bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded')
        .text(message);
    $('#error-container').html(successDiv);
    setTimeout(() => $('#error-container').empty(), 3000);
}

function showConnectivityError(message) {
    showError(message, true, 'connectivity');
}

function showValidationError(message) {
    showError(message, false, 'validation');
}

function showApiError(message) {
    showError(message, true, 'api');
}

function showParsingError(message) {
    showError(message, true, 'parsing');
}

function clearError() {
    $('#error-container').empty();
    lastFailedOperation = null;
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

function renderBreedsGrid(breedsData) {
    if (!breedsData || breedsData.length === 0) {
        return '<p class="col-span-full text-center text-gray-500">No se encontraron razas.</p>';
    }
    
    let html = '';
    breedsData.forEach(breed => {
        html += renderDogCard(breed.name, breed.imageUrl);
    });
    
    return html;
}

function renderPostsGrid(postsData) {
    if (!postsData || postsData.length === 0) {
        return '<p class="col-span-full text-center text-gray-500">No hay posts.</p>';
    }
    
    let html = '';
    postsData.forEach(post => {
        html += renderPostCard(post);
    });
    
    return html;
}
