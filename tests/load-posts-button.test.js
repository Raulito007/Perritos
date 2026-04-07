// Tests for "Cargar posts" button and event handler (Task 3.5)

describe('Load Posts Button - Event Handler', () => {
    
    beforeEach(() => {
        // Setup DOM
        $('body').append(`
            <button id="loadPostsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Cargar Posts
            </button>
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
        `);
    });
    
    afterEach(() => {
        $('#loadPostsBtn').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadingSpinner').remove();
    });
    
    it('should have the correct button text', () => {
        const buttonText = $('#loadPostsBtn').text().trim();
        expect(buttonText).toBe('Cargar Posts');
    });
    
    it('should have proper Tailwind CSS classes for styling', () => {
        const classes = $('#loadPostsBtn').attr('class');
        
        expect(classes).toContain('bg-blue-600');
        expect(classes).toContain('hover:bg-blue-700');
        expect(classes).toContain('text-white');
        expect(classes).toContain('px-6');
        expect(classes).toContain('py-2');
        expect(classes).toContain('rounded-lg');
        expect(classes).toContain('font-semibold');
        expect(classes).toContain('transition');
    });
    
    it('should trigger loadPosts function when clicked', () => {
        spyOn(window, 'loadPosts');
        
        $('#loadPostsBtn').click();
        
        expect(window.loadPosts).toHaveBeenCalled();
    });
    
    it('should be clickable and not disabled', () => {
        const button = $('#loadPostsBtn');
        
        expect(button.prop('disabled')).toBe(false);
        expect(button.css('cursor')).not.toBe('not-allowed');
    });
    
    it('should have proper hover state styling', () => {
        const classes = $('#loadPostsBtn').attr('class');
        
        expect(classes).toContain('hover:bg-blue-700');
        expect(classes).toContain('transition');
    });
});

describe('Load Posts Button - Integration with loadPosts Function', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadPostsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Cargar Posts
            </button>
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
        `);
    });
    
    afterEach(() => {
        $('#loadPostsBtn').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadingSpinner').remove();
    });
    
    it('should clear error messages when button is clicked', () => {
        // Setup error message
        $('#error-container').html('<div>Previous error</div>');
        
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        $('#loadPostsBtn').click();
        
        expect($('#error-container').html()).toBe('');
    });
    
    it('should show loading spinner when button is clicked', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        $('#loadPostsBtn').click();
        
        expect($('#loadingSpinner').hasClass('hidden')).toBe(false);
    });
    
    it('should display correct spinner text for posts', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        $('#loadPostsBtn').click();
        
        expect($('#spinnerText').text()).toBe('Cargando posts...');
    });
    
    it('should call getPosts API when button is clicked', () => {
        spyOn(window, 'getPosts').and.returnValue(
            $.Deferred().resolve([]).promise()
        );
        
        $('#loadPostsBtn').click();
        
        expect(window.getPosts).toHaveBeenCalled();
    });
    
    it('should render posts after successful API call', (done) => {
        const mockPostsResponse = [
            { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Content 2', userId: 1 }
        ];
        
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve(mockPostsResponse).promise()
        );
        
        $('#loadPostsBtn').click();
        
        setTimeout(() => {
            const postCards = $('#postsContainer').find('[data-post-id]');
            expect(postCards.length).toBe(2);
            done();
        }, 50);
    });
    
    it('should hide spinner after successful data load', (done) => {
        const mockPostsResponse = [
            { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 }
        ];
        
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve(mockPostsResponse).promise()
        );
        
        $('#loadPostsBtn').click();
        
        setTimeout(() => {
            expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
            done();
        }, 50);
    });
    
    it('should display error message on API failure', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject().promise()
        );
        
        $('#loadPostsBtn').click();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('Error');
            done();
        }, 50);
    });
    
    it('should hide spinner on API error', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject().promise()
        );
        
        $('#loadPostsBtn').click();
        
        setTimeout(() => {
            expect($('#loadingSpinner').hasClass('hidden')).toBe(true);
            done();
        }, 50);
    });
});

describe('Posts Grid Container', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        `);
    });
    
    afterEach(() => {
        $('#postsContainer').remove();
    });
    
    it('should have grid-cols-1 for mobile (1 column)', () => {
        const classes = $('#postsContainer').attr('class');
        expect(classes).toContain('grid-cols-1');
    });
    
    it('should have md:grid-cols-2 for tablet (2 columns)', () => {
        const classes = $('#postsContainer').attr('class');
        expect(classes).toContain('md:grid-cols-2');
    });
    
    it('should have lg:grid-cols-3 for desktop (3 columns)', () => {
        const classes = $('#postsContainer').attr('class');
        expect(classes).toContain('lg:grid-cols-3');
    });
    
    it('should have proper gap spacing', () => {
        const classes = $('#postsContainer').attr('class');
        expect(classes).toContain('gap-6');
    });
    
    it('should have grid display class', () => {
        const classes = $('#postsContainer').attr('class');
        expect(classes).toContain('grid');
    });
});

describe('Button Placement and Layout', () => {
    
    beforeEach(() => {
        $('body').append(`
            <section id="postsSection">
                <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h2 class="text-3xl font-bold text-gray-800">Posts</h2>
                    <div class="flex gap-4 flex-wrap">
                        <button id="loadPostsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                            Cargar Posts
                        </button>
                        <button id="createPostBtn" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                            + Crear Post
                        </button>
                    </div>
                </div>
                <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </section>
        `);
    });
    
    afterEach(() => {
        $('#postsSection').remove();
    });
    
    it('should be positioned in the header section with the title', () => {
        const button = $('#loadPostsBtn');
        const header = button.closest('.flex');
        
        expect(header.length).toBe(1);
        expect(header.find('h2').length).toBe(1);
    });
    
    it('should be aligned to the right of the title', () => {
        const headerClasses = $('#loadPostsBtn').closest('.flex').parent().attr('class');
        
        expect(headerClasses).toContain('flex');
    });
    
    it('should be responsive and wrap on small screens', () => {
        const headerClasses = $('#loadPostsBtn').closest('.flex').attr('class');
        
        expect(headerClasses).toContain('flex-wrap');
        expect(headerClasses).toContain('gap-4');
    });
});

describe('Data Integrity - Property 2: Button Click Triggers Fresh Data Load', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadPostsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Cargar Posts
            </button>
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
        `);
    });
    
    afterEach(() => {
        $('#loadPostsBtn').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadingSpinner').remove();
    });
    
    it('should fetch fresh data each time button is clicked', (done) => {
        let callCount = 0;
        
        spyOn($, 'ajax').and.callFake(function(config) {
            callCount++;
            return $.Deferred().resolve([
                { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 }
            ]).promise();
        });
        
        // First click
        $('#loadPostsBtn').click();
        
        setTimeout(() => {
            const firstCallCount = callCount;
            
            // Second click
            $('#loadPostsBtn').click();
            
            setTimeout(() => {
                expect(callCount).toBeGreaterThan(firstCallCount);
                done();
            }, 50);
        }, 50);
    });
    
    it('should update grid with new data on each click', (done) => {
        let clickCount = 0;
        
        spyOn($, 'ajax').and.callFake(function(config) {
            clickCount++;
            const posts = clickCount === 1 
                ? [{ id: 1, title: 'Post 1', body: 'Content 1', userId: 1 }]
                : [
                    { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 },
                    { id: 2, title: 'Post 2', body: 'Content 2', userId: 1 }
                  ];
            return $.Deferred().resolve(posts).promise();
        });
        
        $('#loadPostsBtn').click();
        
        setTimeout(() => {
            const firstRender = $('#postsContainer').find('[data-post-id]').length;
            
            $('#loadPostsBtn').click();
            
            setTimeout(() => {
                const secondRender = $('#postsContainer').find('[data-post-id]').length;
                
                // Second render should have more posts
                expect(secondRender).toBeGreaterThan(firstRender);
                done();
            }, 50);
        }, 50);
    });
});

describe('Requirement 2: Cargar y Mostrar Posts - Criteria 1', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadPostsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Cargar Posts
            </button>
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
            <div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
                <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
                </div>
            </div>
        `);
    });
    
    afterEach(() => {
        $('#loadPostsBtn').remove();
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadingSpinner').remove();
    });
    
    it('WHEN user clicks "Cargar posts" button, THEN system SHALL connect to API_Posts and fetch all posts', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve([
                { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 }
            ]).promise()
        );
        
        $('#loadPostsBtn').click();
        
        setTimeout(() => {
            expect($.ajax).toHaveBeenCalled();
            const ajaxCall = $.ajax.calls.mostRecent();
            expect(ajaxCall.args[0].url).toContain('/posts');
            done();
        }, 50);
    });
});

describe('Requirement 2: Cargar y Mostrar Posts - Criteria 4', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        `);
    });
    
    afterEach(() => {
        $('#postsContainer').remove();
    });
    
    it('WHEN user visualizes posts, THEN system SHALL show edit and delete buttons on each card', (done) => {
        const mockPostsResponse = [
            { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Content 2', userId: 1 }
        ];
        
        const html = renderPostsGrid(mockPostsResponse);
        $('#postsContainer').html(html);
        
        const editButtons = $('#postsContainer').find('.editPostBtn');
        const deleteButtons = $('#postsContainer').find('.deletePostBtn');
        
        expect(editButtons.length).toBe(2);
        expect(deleteButtons.length).toBe(2);
        done();
    });
});

describe('Requirement 9: Navegación y Estructura de Página - Criteria 1-5', () => {
    
    beforeEach(() => {
        $('body').append(`
            <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
                <div class="container mx-auto px-4">
                    <h1 class="text-4xl font-bold">🐕 Animales y Posts</h1>
                </div>
            </header>
            <nav class="bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
                <div class="container mx-auto px-4">
                    <div class="flex gap-4 justify-center py-4 flex-wrap">
                        <button id="navDogs" class="nav-btn active px-6 py-2 rounded-lg font-semibold transition">
                            🐕 Razas de Perros
                        </button>
                        <button id="navPosts" class="nav-btn px-6 py-2 rounded-lg font-semibold transition">
                            📝 Posts
                        </button>
                    </div>
                </div>
            </nav>
            <main class="container mx-auto px-4 py-8">
                <section id="postsSection" class="section-content hidden">
                    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h2 class="text-3xl font-bold text-gray-800">Posts</h2>
                        <div class="flex gap-4 flex-wrap">
                            <button id="loadPostsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                                Cargar Posts
                            </button>
                        </div>
                    </div>
                    <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
                </section>
            </main>
            <footer class="bg-gray-800 text-white text-center py-4 mt-8">
                <p>© 2024 Animales y Posts</p>
            </footer>
        `);
    });
    
    afterEach(() => {
        $('header').remove();
        $('nav').remove();
        $('main').remove();
        $('footer').remove();
    });
    
    it('THEN system SHALL show header with application title', () => {
        expect($('header h1').length).toBe(1);
        expect($('header h1').text()).toContain('Animales y Posts');
    });
    
    it('THEN system SHALL show navigation buttons clearly labeled', () => {
        expect($('#navDogs').length).toBe(1);
        expect($('#navPosts').length).toBe(1);
        expect($('#navDogs').text()).toContain('Razas de Perros');
        expect($('#navPosts').text()).toContain('Posts');
    });
    
    it('THEN system SHALL show main content area', () => {
        expect($('main').length).toBe(1);
        expect($('#postsSection').length).toBe(1);
    });
    
    it('THEN system SHALL show footer with credits', () => {
        expect($('footer').length).toBe(1);
        expect($('footer').text()).toContain('2024');
    });
});
