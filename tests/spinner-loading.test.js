// Tests for Loading Spinner Component (Task 2.7)

describe('Loading Spinner Component', () => {
    
    beforeEach(() => {
        // Setup DOM with spinner
        $('body').append(`
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
            <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
            <button id="loadDogsBtn">Cargar Razas</button>
            <button id="loadPostsBtn">Cargar Posts</button>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
        $('#dogsContainer').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadDogsBtn').remove();
        $('#loadPostsBtn').remove();
    });
    
    it('should exist in the DOM', () => {
        expect($('#loadingSpinner').length).toBe(1);
    });
    
    it('should be hidden by default', () => {
        expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
    });
    
    it('should have fixed positioning for full screen overlay', () => {
        const classes = $('#loadingSpinner').attr('class');
        expect(classes).toContain('fixed');
        expect(classes).toContain('inset-0');
    });
    
    it('should have semi-transparent dark background', () => {
        const classes = $('#loadingSpinner').attr('class');
        expect(classes).toContain('bg-black');
        expect(classes).toContain('bg-opacity-30');
    });
    
    it('should center content with flexbox', () => {
        const classes = $('#loadingSpinner').attr('class');
        expect(classes).toContain('flex');
        expect(classes).toContain('items-center');
        expect(classes).toContain('justify-center');
    });
    
    it('should have proper z-index for layering', () => {
        const classes = $('#loadingSpinner').attr('class');
        expect(classes).toContain('z-40');
    });
    
    it('should contain a white card container', () => {
        const card = $('#loadingSpinner').find('.bg-white');
        expect(card.length).toBe(1);
        expect(card.hasClass('rounded-lg')).toBe(true);
        expect(card.hasClass('shadow-xl')).toBe(true);
    });
    
    it('should contain an animated spinner element', () => {
        const spinner = $('#loadingSpinner').find('.animate-spin');
        expect(spinner.length).toBe(1);
        expect(spinner.hasClass('rounded-full')).toBe(true);
    });
    
    it('should have proper spinner dimensions', () => {
        const spinner = $('#loadingSpinner').find('.animate-spin');
        const classes = spinner.attr('class');
        expect(classes).toContain('h-12');
        expect(classes).toContain('w-12');
    });
    
    it('should have spinner border styling', () => {
        const spinner = $('#loadingSpinner').find('.animate-spin');
        const classes = spinner.attr('class');
        expect(classes).toContain('border-4');
        expect(classes).toContain('border-gray-300');
        expect(classes).toContain('border-t-blue-600');
    });
    
    it('should contain spinner text element', () => {
        const text = $('#spinnerText');
        expect(text.length).toBe(1);
        expect(text.hasClass('text-gray-700')).toBe(true);
        expect(text.hasClass('font-semibold')).toBe(true);
    });
    
    it('should have default spinner text', () => {
        expect($('#spinnerText').text()).toBe('Cargando...');
    });
});

describe('showSpinner Function', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
    });
    
    it('should show spinner by removing hidden class', () => {
        showSpinner();
        expect($('#loadingSpinner').hasClass('hidden')).toBe(false);
    });
    
    it('should update spinner text with default message', () => {
        showSpinner();
        expect($('#spinnerText').text()).toBe('Cargando...');
    });
    
    it('should update spinner text with custom message', () => {
        showSpinner('Cargando razas...');
        expect($('#spinnerText').text()).toBe('Cargando razas...');
    });
    
    it('should update spinner text for posts', () => {
        showSpinner('Cargando posts...');
        expect($('#spinnerText').text()).toBe('Cargando posts...');
    });
    
    it('should be callable multiple times', () => {
        showSpinner('Primer mensaje');
        expect($('#spinnerText').text()).toBe('Primer mensaje');
        
        showSpinner('Segundo mensaje');
        expect($('#spinnerText').text()).toBe('Segundo mensaje');
    });
});

describe('hideSpinner Function', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="loadingSpinner" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
    });
    
    it('should hide spinner by adding hidden class', () => {
        hideSpinner();
        expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
    });
    
    it('should be callable after showSpinner', () => {
        showSpinner('Cargando...');
        expect($('#loadingSpinner').hasClass('hidden')).toBe(false);
        
        hideSpinner();
        expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
    });
});

describe('Spinner Integration with loadDogs', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
            <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
            <button id="loadDogsBtn">Cargar Razas</button>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
        $('#loadDogsBtn').remove();
    });
    
    it('should show spinner when loadDogs is called', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        loadDogs();
        
        expect($('#loadingSpinner').hasClass('hidden')).toBe(false);
    });
    
    it('should display correct spinner text for dogs', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        loadDogs();
        
        expect($('#spinnerText').text()).toBe('Cargando razas...');
    });
    
    it('should hide spinner on successful data load', (done) => {
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('breeds/list/all')) {
                return $.Deferred().resolve({
                    message: { 'labrador': [] },
                    status: 'success'
                }).promise();
            } else if (config.url.includes('images/random')) {
                return $.Deferred().resolve({
                    message: 'https://example.com/image.jpg',
                    status: 'success'
                }).promise();
            }
        });
        
        loadDogs();
        
        setTimeout(() => {
            expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
            done();
        }, 100);
    });
    
    it('should hide spinner on API error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject().promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
            done();
        }, 50);
    });
});

describe('Spinner Integration with loadPosts', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
            <button id="loadPostsBtn">Cargar Posts</button>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadPostsBtn').remove();
    });
    
    it('should show spinner when loadPosts is called', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        loadPosts();
        
        expect($('#loadingSpinner').hasClass('hidden')).toBe(false);
    });
    
    it('should display correct spinner text for posts', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        loadPosts();
        
        expect($('#spinnerText').text()).toBe('Cargando posts...');
    });
    
    it('should hide spinner on successful data load', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve([
                { id: 1, title: 'Post 1', body: 'Content 1' }
            ]).promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
            done();
        }, 50);
    });
    
    it('should hide spinner on API error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject().promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
            done();
        }, 50);
    });
});

describe('Spinner Responsiveness', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
    });
    
    it('should be visible on all screen sizes (fixed positioning)', () => {
        const classes = $('#loadingSpinner').attr('class');
        expect(classes).toContain('fixed');
        expect(classes).toContain('inset-0');
    });
    
    it('should center content on all screen sizes', () => {
        const classes = $('#loadingSpinner').attr('class');
        expect(classes).toContain('flex');
        expect(classes).toContain('items-center');
        expect(classes).toContain('justify-center');
    });
    
    it('should have consistent spinner size', () => {
        const spinner = $('#loadingSpinner').find('.animate-spin');
        const classes = spinner.attr('class');
        expect(classes).toContain('h-12');
        expect(classes).toContain('w-12');
    });
    
    it('should have readable text on all screen sizes', () => {
        const text = $('#spinnerText');
        const classes = text.attr('class');
        expect(classes).toContain('text-gray-700');
        expect(classes).toContain('font-semibold');
    });
});

describe('Spinner Styling with Tailwind CSS', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
    });
    
    it('should have proper card styling', () => {
        const card = $('#loadingSpinner').find('.bg-white');
        const classes = card.attr('class');
        expect(classes).toContain('bg-white');
        expect(classes).toContain('rounded-lg');
        expect(classes).toContain('shadow-xl');
        expect(classes).toContain('p-8');
    });
    
    it('should have proper spinner animation', () => {
        const spinner = $('#loadingSpinner').find('.animate-spin');
        const classes = spinner.attr('class');
        expect(classes).toContain('animate-spin');
    });
    
    it('should have proper color scheme', () => {
        const spinner = $('#loadingSpinner').find('.animate-spin');
        const classes = spinner.attr('class');
        expect(classes).toContain('border-gray-300');
        expect(classes).toContain('border-t-blue-600');
    });
    
    it('should have proper spacing', () => {
        const spinner = $('#loadingSpinner').find('.animate-spin');
        const classes = spinner.attr('class');
        expect(classes).toContain('mb-4');
    });
});

describe('Property 1: Dogs API Connection and Rendering with Spinner', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
            <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
    });
    
    it('should show spinner during API call and hide after rendering', (done) => {
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('breeds/list/all')) {
                return $.Deferred().resolve({
                    message: { 'labrador': [] },
                    status: 'success'
                }).promise();
            } else if (config.url.includes('images/random')) {
                return $.Deferred().resolve({
                    message: 'https://example.com/image.jpg',
                    status: 'success'
                }).promise();
            }
        });
        
        // Spinner should be hidden initially
        expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
        
        loadDogs();
        
        // Spinner should be visible during load
        expect($('#loadingSpinner').hasClass('hidden')).toBe(false);
        
        setTimeout(() => {
            // Spinner should be hidden after load
            expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
            done();
        }, 100);
    });
});

describe('Property 2: Posts API Connection and Rendering with Spinner', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
        `);
    });
    
    afterEach(() => {
        $('#loadingSpinner').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
    });
    
    it('should show spinner during API call and hide after rendering', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve([
                { id: 1, title: 'Post 1', body: 'Content 1' }
            ]).promise()
        );
        
        // Spinner should be hidden initially
        expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
        
        loadPosts();
        
        // Spinner should be visible during load
        expect($('#loadingSpinner').hasClass('hidden')).toBe(false);
        
        setTimeout(() => {
            // Spinner should be hidden after load
            expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
            done();
        }, 50);
    });
});
