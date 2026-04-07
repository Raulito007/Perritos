// Tests for error handling in dog.ceo API (Task 2.6)

describe('parseAjaxError - Error Type Detection', () => {
    
    it('should detect timeout errors', () => {
        const xhr = { status: 0 };
        const status = 'timeout';
        const error = 'timeout';
        
        const result = parseAjaxError(xhr, status, error);
        
        expect(result.type).toBe('timeout');
        expect(result.message).toContain('Tiempo de conexión agotado');
    });
    
    it('should detect network errors', () => {
        const xhr = { status: 0 };
        const status = 'error';
        const error = 'Network error';
        
        const result = parseAjaxError(xhr, status, error);
        
        expect(result.type).toBe('network');
        expect(result.message).toContain('Error de conexión');
    });
    
    it('should detect server errors (5xx)', () => {
        const xhr = { status: 500 };
        const status = 'error';
        const error = 'Internal Server Error';
        
        const result = parseAjaxError(xhr, status, error);
        
        expect(result.type).toBe('server');
        expect(result.message).toContain('Error del servidor');
    });
    
    it('should detect client errors (4xx)', () => {
        const xhr = { status: 404 };
        const status = 'error';
        const error = 'Not Found';
        
        const result = parseAjaxError(xhr, status, error);
        
        expect(result.type).toBe('client');
        expect(result.message).toContain('Error en la solicitud');
    });
    
    it('should detect parse errors', () => {
        const xhr = { status: 200 };
        const status = 'parsererror';
        const error = 'Invalid JSON';
        
        const result = parseAjaxError(xhr, status, error);
        
        expect(result.type).toBe('parse');
        expect(result.message).toContain('Error al procesar');
    });
    
    it('should return user-friendly messages', () => {
        const xhr = { status: 0 };
        const status = 'timeout';
        const error = 'timeout';
        
        const result = parseAjaxError(xhr, status, error);
        
        expect(result.message).toBeTruthy();
        expect(result.message.length).toBeGreaterThan(0);
        expect(result.message).not.toContain('undefined');
    });
    
    it('should preserve original error information', () => {
        const xhr = { status: 500 };
        const status = 'error';
        const error = 'Server Error';
        
        const result = parseAjaxError(xhr, status, error);
        
        expect(result.httpStatus).toBe(500);
        expect(result.status).toBe('error');
        expect(result.error).toBe('Server Error');
    });
});

describe('showError - Error Display with Retry', () => {
    
    beforeEach(() => {
        $('body').append('<div id="error-container"></div>');
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#error-container').remove();
        lastFailedOperation = null;
    });
    
    it('should display error message', () => {
        const message = 'Test error message';
        showError(message);
        
        expect($('#error-container').text()).toContain(message);
    });
    
    it('should show retry button when retryable is true', () => {
        lastFailedOperation = function() {};
        showError('Test error', true);
        
        expect($('#error-container').find('.retry-btn').length).toBe(1);
    });
    
    it('should not show retry button when retryable is false', () => {
        showError('Test error', false);
        
        expect($('#error-container').find('.retry-btn').length).toBe(0);
    });
    
    it('should not show retry button when no operation is stored', () => {
        lastFailedOperation = null;
        showError('Test error', true);
        
        expect($('#error-container').find('.retry-btn').length).toBe(0);
    });
    
    it('should apply error styling classes', () => {
        showError('Test error');
        
        const errorDiv = $('#error-container').find('div');
        const classes = errorDiv.attr('class');
        
        expect(classes).toContain('bg-red-100');
        expect(classes).toContain('border-red-400');
        expect(classes).toContain('text-red-700');
    });
    
    it('should display "Error:" label', () => {
        showError('Test error');
        
        expect($('#error-container').text()).toContain('Error:');
    });
});

describe('Retry Functionality', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadDogsBtn">Cargar Razas</button>
            <div id="dogsContainer"></div>
            <div id="error-container"></div>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#loadDogsBtn').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
        lastFailedOperation = null;
    });
    
    it('should execute stored operation when retry button is clicked', () => {
        let operationCalled = false;
        lastFailedOperation = function() {
            operationCalled = true;
        };
        
        showError('Test error', true);
        $('#error-container').find('.retry-btn').click();
        
        expect(operationCalled).toBe(true);
    });
    
    it('should clear error message when retry is clicked', () => {
        lastFailedOperation = function() {};
        showError('Test error', true);
        
        expect($('#error-container').text()).toContain('Test error');
        
        $('#error-container').find('.retry-btn').click();
        
        expect($('#error-container').html()).toBe('');
    });
    
    it('should clear lastFailedOperation after retry', () => {
        lastFailedOperation = function() {};
        showError('Test error', true);
        
        $('#error-container').find('.retry-btn').click();
        
        expect(lastFailedOperation).toBeNull();
    });
});

describe('loadDogs - Error Handling Integration', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadDogsBtn">Cargar Razas</button>
            <div id="dogsContainer"></div>
            <div id="error-container"></div>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#loadDogsBtn').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
        lastFailedOperation = null;
    });
    
    it('should store loadDogs as lastFailedOperation', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            expect(lastFailedOperation).toBe(loadDogs);
            done();
        }, 50);
    });
    
    it('should show timeout error message on timeout', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Tiempo de conexión agotado');
            done();
        }, 50);
    });
    
    it('should show network error message on network failure', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'error', 'Network error').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error de conexión');
            done();
        }, 50);
    });
    
    it('should show server error message on 5xx error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error del servidor');
            done();
        }, 50);
    });
    
    it('should clear error message when loadDogs is called', () => {
        $('#error-container').html('<div>Previous error</div>');
        
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        loadDogs();
        
        expect($('#error-container').html()).toBe('');
    });
    
    it('should show loading message when loadDogs is called', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        loadDogs();
        
        expect($('#dogsContainer').text()).toContain('Cargando razas');
    });
    
    it('should clear lastFailedOperation on successful load', (done) => {
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('breeds/list/all')) {
                return $.Deferred().resolve({
                    message: {},
                    status: 'success'
                }).promise();
            }
        });
        
        loadDogs();
        
        setTimeout(() => {
            expect(lastFailedOperation).toBeNull();
            done();
        }, 50);
    });
    
    it('should preserve UI state on error', (done) => {
        const previousContent = '<p>Previous content</p>';
        $('#dogsContainer').html(previousContent);
        
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            // Error message should be shown
            expect($('#error-container').text()).toContain('Tiempo de conexión agotado');
            // Container should show loading message (not previous content)
            expect($('#dogsContainer').text()).toContain('Cargando razas');
            done();
        }, 50);
    });
});

describe('Error Handling - Property 8: Error Handling Preservation', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadDogsBtn">Cargar Razas</button>
            <div id="dogsContainer"></div>
            <div id="error-container"></div>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#loadDogsBtn').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
        lastFailedOperation = null;
    });
    
    it('should display error message on failed API request', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toBeTruthy();
            expect(errorText.length).toBeGreaterThan(0);
            done();
        }, 50);
    });
    
    it('should preserve UI state (show loading message) on error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            // UI should show loading state, not be empty
            expect($('#dogsContainer').text()).toContain('Cargando razas');
            done();
        }, 50);
    });
    
    it('should allow retry after error', (done) => {
        let callCount = 0;
        
        spyOn($, 'ajax').and.callFake(function(config) {
            callCount++;
            if (callCount === 1) {
                return $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise();
            } else {
                return $.Deferred().resolve({
                    message: { 'labrador': [] },
                    status: 'success'
                }).promise();
            }
        });
        
        loadDogs();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Tiempo de conexión agotado');
            
            // Click retry button
            $('#error-container').find('.retry-btn').click();
            
            setTimeout(() => {
                expect(callCount).toBe(2);
                done();
            }, 50);
        }, 50);
    });
});

describe('Error Handling - Different Error Types', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadDogsBtn">Cargar Razas</button>
            <div id="dogsContainer"></div>
            <div id="error-container"></div>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#loadDogsBtn').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
        lastFailedOperation = null;
    });
    
    it('should show specific message for timeout errors', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toContain('Tiempo de conexión agotado');
            expect(errorText).toContain('conexión a internet');
            done();
        }, 50);
    });
    
    it('should show specific message for network errors', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'error', 'Network error').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toContain('Error de conexión');
            expect(errorText).toContain('conexión a internet');
            done();
        }, 50);
    });
    
    it('should show specific message for server errors', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 503 }, 'error', 'Service Unavailable').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toContain('Error del servidor');
            expect(errorText).toContain('más tarde');
            done();
        }, 50);
    });
    
    it('should show specific message for parse errors', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 200 }, 'parsererror', 'Invalid JSON').promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toContain('Error al procesar');
            done();
        }, 50);
    });
});

describe('clearError - Error Clearing', () => {
    
    beforeEach(() => {
        $('body').append('<div id="error-container"></div>');
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#error-container').remove();
        lastFailedOperation = null;
    });
    
    it('should clear error container', () => {
        $('#error-container').html('<div>Error message</div>');
        
        clearError();
        
        expect($('#error-container').html()).toBe('');
    });
    
    it('should clear lastFailedOperation', () => {
        lastFailedOperation = function() {};
        
        clearError();
        
        expect(lastFailedOperation).toBeNull();
    });
    
    it('should work when error container is already empty', () => {
        expect($('#error-container').html()).toBe('');
        
        clearError();
        
        expect($('#error-container').html()).toBe('');
    });
});


describe('loadPosts - Error Handling Integration', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadPostsBtn">Cargar Posts</button>
            <div id="postsContainer"></div>
            <div id="error-container"></div>
            <div id="loadingSpinner" class="hidden">
                <p id="spinnerText">Cargando...</p>
            </div>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#loadPostsBtn').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadingSpinner').remove();
        lastFailedOperation = null;
    });
    
    it('should store loadPosts as lastFailedOperation', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            expect(lastFailedOperation).toBe(loadPosts);
            done();
        }, 50);
    });
    
    it('should show timeout error message on timeout', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Tiempo de conexión agotado');
            done();
        }, 50);
    });
    
    it('should show network error message on network failure', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'error', 'Network error').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error de conexión');
            done();
        }, 50);
    });
    
    it('should show server error message on 5xx error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error del servidor');
            done();
        }, 50);
    });
    
    it('should clear error message when loadPosts is called', () => {
        $('#error-container').html('<div>Previous error</div>');
        
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        loadPosts();
        
        expect($('#error-container').html()).toBe('');
    });
    
    it('should show loading message when loadPosts is called', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        loadPosts();
        
        expect($('#spinnerText').text()).toContain('Cargando posts');
    });
    
    it('should clear lastFailedOperation on successful load', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve([
                { id: 1, title: 'Post 1', body: 'Body 1' }
            ]).promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            expect(lastFailedOperation).toBeNull();
            done();
        }, 50);
    });
    
    it('should preserve UI state on error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            // Error message should be shown
            expect($('#error-container').text()).toContain('Tiempo de conexión agotado');
            done();
        }, 50);
    });
});

describe('handlePostFormSubmit - Error Handling', () => {
    
    beforeEach(() => {
        $('body').append(`
            <form id="postForm">
                <input id="postTitle" value="Test Title">
                <textarea id="postBody">Test Body</textarea>
                <button type="submit">Guardar</button>
            </form>
            <div id="error-container"></div>
            <div id="titleError" class="hidden"></div>
            <div id="bodyError" class="hidden"></div>
            <div id="loadingSpinner" class="hidden">
                <p id="spinnerText">Cargando...</p>
            </div>
            <div id="postsContainer"></div>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#postForm').remove();
        $('#error-container').remove();
        $('#titleError').remove();
        $('#bodyError').remove();
        $('#loadingSpinner').remove();
        $('#postsContainer').remove();
        lastFailedOperation = null;
    });
    
    it('should show error on create post failure', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        const event = { preventDefault: function() {} };
        handlePostFormSubmit(event);
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error');
            done();
        }, 50);
    });
    
    it('should show error on update post failure', (done) => {
        $('#postForm').data('post-id', 1);
        
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        const event = { preventDefault: function() {} };
        handlePostFormSubmit(event);
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error');
            done();
        }, 50);
    });
    
    it('should store operation for retry on create failure', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        const event = { preventDefault: function() {} };
        handlePostFormSubmit(event);
        
        setTimeout(() => {
            expect(lastFailedOperation).toBeDefined();
            expect(typeof lastFailedOperation).toBe('function');
            done();
        }, 50);
    });
    
    it('should show retry button on error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        const event = { preventDefault: function() {} };
        handlePostFormSubmit(event);
        
        setTimeout(() => {
            expect($('#error-container').find('.retry-btn').length).toBe(1);
            done();
        }, 50);
    });
});

describe('handleEditPost - Error Handling', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div class="post-card" data-post-id="1">
                <button class="editPostBtn">Editar</button>
            </div>
            <div id="error-container"></div>
            <div id="postModal" class="hidden">
                <input id="postTitle">
                <textarea id="postBody"></textarea>
            </div>
            <form id="postForm"></form>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('.post-card').remove();
        $('#error-container').remove();
        $('#postModal').remove();
        $('#postForm').remove();
        lastFailedOperation = null;
    });
    
    it('should show error when loading post fails', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 404 }, 'error', 'Not Found').promise()
        );
        
        const button = $('.editPostBtn');
        handleEditPost.call(button);
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error');
            done();
        }, 50);
    });
    
    it('should show specific error message for 404', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 404 }, 'error', 'Not Found').promise()
        );
        
        const button = $('.editPostBtn');
        handleEditPost.call(button);
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error en la solicitud');
            done();
        }, 50);
    });
    
    it('should store operation for retry on edit failure', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        const button = $('.editPostBtn');
        handleEditPost.call(button);
        
        setTimeout(() => {
            expect(lastFailedOperation).toBeDefined();
            expect(typeof lastFailedOperation).toBe('function');
            done();
        }, 50);
    });
    
    it('should clear lastFailedOperation on successful load', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve({
                id: 1,
                title: 'Test Post',
                body: 'Test Body'
            }).promise()
        );
        
        const button = $('.editPostBtn');
        handleEditPost.call(button);
        
        setTimeout(() => {
            expect(lastFailedOperation).toBeNull();
            done();
        }, 50);
    });
});

describe('handleDeletePost - Error Handling', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div class="post-card" data-post-id="1">
                <button class="deletePostBtn">Eliminar</button>
            </div>
            <div id="error-container"></div>
            <div id="postsContainer"></div>
        `);
        lastFailedOperation = null;
        spyOn(window, 'confirm').and.returnValue(true);
    });
    
    afterEach(() => {
        $('.post-card').remove();
        $('#error-container').remove();
        $('#postsContainer').remove();
        lastFailedOperation = null;
    });
    
    it('should show error when delete fails', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        const button = $('.deletePostBtn');
        handleDeletePost.call(button);
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error');
            done();
        }, 50);
    });
    
    it('should show specific error message for server error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 503 }, 'error', 'Service Unavailable').promise()
        );
        
        const button = $('.deletePostBtn');
        handleDeletePost.call(button);
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error del servidor');
            done();
        }, 50);
    });
    
    it('should store operation for retry on delete failure', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        const button = $('.deletePostBtn');
        handleDeletePost.call(button);
        
        setTimeout(() => {
            expect(lastFailedOperation).toBeDefined();
            expect(typeof lastFailedOperation).toBe('function');
            done();
        }, 50);
    });
    
    it('should not show error if user cancels delete', (done) => {
        window.confirm.and.returnValue(false);
        
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 500 }, 'error', 'Server Error').promise()
        );
        
        const button = $('.deletePostBtn');
        handleDeletePost.call(button);
        
        setTimeout(() => {
            expect($('#error-container').text()).toBe('');
            done();
        }, 50);
    });
});

describe('Error Handling - Property 8: Error Handling Preservation for Posts', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadPostsBtn">Cargar Posts</button>
            <div id="postsContainer"></div>
            <div id="error-container"></div>
            <div id="loadingSpinner" class="hidden">
                <p id="spinnerText">Cargando...</p>
            </div>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#loadPostsBtn').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadingSpinner').remove();
        lastFailedOperation = null;
    });
    
    it('should display error message on failed API request', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toBeTruthy();
            expect(errorText.length).toBeGreaterThan(0);
            done();
        }, 50);
    });
    
    it('should allow retry after error', (done) => {
        let callCount = 0;
        
        spyOn($, 'ajax').and.callFake(function(config) {
            callCount++;
            if (callCount === 1) {
                return $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise();
            } else {
                return $.Deferred().resolve([
                    { id: 1, title: 'Post 1', body: 'Body 1' }
                ]).promise();
            }
        });
        
        loadPosts();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Tiempo de conexión agotado');
            
            // Click retry button
            $('#error-container').find('.retry-btn').click();
            
            setTimeout(() => {
                expect(callCount).toBe(2);
                done();
            }, 50);
        }, 50);
    });
});

describe('Error Handling - Different Error Types for Posts', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadPostsBtn">Cargar Posts</button>
            <div id="postsContainer"></div>
            <div id="error-container"></div>
            <div id="loadingSpinner" class="hidden">
                <p id="spinnerText">Cargando...</p>
            </div>
        `);
        lastFailedOperation = null;
    });
    
    afterEach(() => {
        $('#loadPostsBtn').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadingSpinner').remove();
        lastFailedOperation = null;
    });
    
    it('should show specific message for timeout errors', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'timeout', 'timeout').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toContain('Tiempo de conexión agotado');
            expect(errorText).toContain('conexión a internet');
            done();
        }, 50);
    });
    
    it('should show specific message for network errors', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 0 }, 'error', 'Network error').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toContain('Error de conexión');
            expect(errorText).toContain('conexión a internet');
            done();
        }, 50);
    });
    
    it('should show specific message for server errors', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 503 }, 'error', 'Service Unavailable').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toContain('Error del servidor');
            expect(errorText).toContain('más tarde');
            done();
        }, 50);
    });
    
    it('should show specific message for parse errors', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({ status: 200 }, 'parsererror', 'Invalid JSON').promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            const errorText = $('#error-container').text();
            expect(errorText).toContain('Error al procesar');
            done();
        }, 50);
    });
});
