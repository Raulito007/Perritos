// Funciones de validación

function validateTitle(title) {
    // Check if title is empty or only whitespace
    if (!title || title.trim() === '') {
        return {
            isValid: false,
            errorMessage: 'El título es requerido y debe tener entre 1 y 200 caracteres'
        };
    }
    
    // Check if title exceeds 200 characters
    if (title.length > 200) {
        return {
            isValid: false,
            errorMessage: 'El título es requerido y debe tener entre 1 y 200 caracteres'
        };
    }
    
    // Title is valid
    return {
        isValid: true,
        errorMessage: ''
    };
}

function validateBody(body) {
    // Check if body is empty or only whitespace
    if (!body || body.trim() === '') {
        return {
            isValid: false,
            errorMessage: 'El contenido es requerido y debe tener entre 1 y 5000 caracteres'
        };
    }
    
    // Check if body exceeds 5000 characters
    if (body.length > 5000) {
        return {
            isValid: false,
            errorMessage: 'El contenido es requerido y debe tener entre 1 y 5000 caracteres'
        };
    }
    
    // Body is valid
    return {
        isValid: true,
        errorMessage: ''
    };
}

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
