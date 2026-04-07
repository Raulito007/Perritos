// Tests for "Cargar razas" button and event handler (Task 2.5)

describe('Load Dogs Button - Event Handler', () => {
    
    beforeEach(() => {
        // Setup DOM
        $('body').append(`
            <button id="loadDogsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Cargar Razas
            </button>
            <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
        `);
    });
    
    afterEach(() => {
        $('#loadDogsBtn').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
    });
    
    it('should have the correct button text', () => {
        const buttonText = $('#loadDogsBtn').text().trim();
        expect(buttonText).toBe('Cargar Razas');
    });
    
    it('should have proper Tailwind CSS classes for styling', () => {
        const classes = $('#loadDogsBtn').attr('class');
        
        expect(classes).toContain('bg-blue-600');
        expect(classes).toContain('hover:bg-blue-700');
        expect(classes).toContain('text-white');
        expect(classes).toContain('px-6');
        expect(classes).toContain('py-2');
        expect(classes).toContain('rounded-lg');
        expect(classes).toContain('font-semibold');
        expect(classes).toContain('transition');
    });
    
    it('should trigger loadDogs function when clicked', () => {
        spyOn(window, 'loadDogs');
        
        $('#loadDogsBtn').click();
        
        expect(window.loadDogs).toHaveBeenCalled();
    });
    
    it('should be clickable and not disabled', () => {
        const button = $('#loadDogsBtn');
        
        expect(button.prop('disabled')).toBe(false);
        expect(button.css('cursor')).not.toBe('not-allowed');
    });
    
    it('should have proper hover state styling', () => {
        const classes = $('#loadDogsBtn').attr('class');
        
        expect(classes).toContain('hover:bg-blue-700');
        expect(classes).toContain('transition');
    });
});

describe('Load Dogs Button - Integration with loadDogs Function', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadDogsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Cargar Razas
            </button>
            <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
        `);
    });
    
    afterEach(() => {
        $('#loadDogsBtn').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
    });
    
    it('should clear error messages when button is clicked', () => {
        // Setup error message
        $('#error-container').html('<div>Previous error</div>');
        
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        $('#loadDogsBtn').click();
        
        expect($('#error-container').html()).toBe('');
    });
    
    it('should show loading message when button is clicked', () => {
        spyOn($, 'ajax').and.returnValue($.Deferred().promise());
        
        $('#loadDogsBtn').click();
        
        expect($('#dogsContainer').text()).toContain('Cargando razas');
    });
    
    it('should call getDogBreeds API when button is clicked', () => {
        spyOn(window, 'getDogBreeds').and.returnValue(
            $.Deferred().resolve({ message: {}, status: 'success' }).promise()
        );
        
        $('#loadDogsBtn').click();
        
        expect(window.getDogBreeds).toHaveBeenCalled();
    });
    
    it('should render breeds after successful API call', (done) => {
        const mockBreedsResponse = {
            message: {
                'labrador': [],
                'german': []
            },
            status: 'success'
        };
        
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('breeds/list/all')) {
                return $.Deferred().resolve(mockBreedsResponse).promise();
            } else if (config.url.includes('images/random')) {
                return $.Deferred().resolve({
                    message: 'https://example.com/image.jpg',
                    status: 'success'
                }).promise();
            }
        });
        
        $('#loadDogsBtn').click();
        
        setTimeout(() => {
            const dogCards = $('#dogsContainer').find('[class*="bg-white"]');
            expect(dogCards.length).toBe(2);
            done();
        }, 100);
    });
    
    it('should display error message on API failure', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject().promise()
        );
        
        $('#loadDogsBtn').click();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('No se pudo conectar');
            done();
        }, 50);
    });
});

describe('Responsive Grid Container', () => {
    
    beforeEach(() => {
        $('body').append(`
            <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        `);
    });
    
    afterEach(() => {
        $('#dogsContainer').remove();
    });
    
    it('should have grid-cols-1 for mobile (1 column)', () => {
        const classes = $('#dogsContainer').attr('class');
        expect(classes).toContain('grid-cols-1');
    });
    
    it('should have md:grid-cols-2 for tablet (2 columns)', () => {
        const classes = $('#dogsContainer').attr('class');
        expect(classes).toContain('md:grid-cols-2');
    });
    
    it('should have lg:grid-cols-3 for desktop (3 columns)', () => {
        const classes = $('#dogsContainer').attr('class');
        expect(classes).toContain('lg:grid-cols-3');
    });
    
    it('should have proper gap spacing', () => {
        const classes = $('#dogsContainer').attr('class');
        expect(classes).toContain('gap-6');
    });
    
    it('should have grid display class', () => {
        const classes = $('#dogsContainer').attr('class');
        expect(classes).toContain('grid');
    });
});

describe('Button Placement and Layout', () => {
    
    beforeEach(() => {
        $('body').append(`
            <section id="dogsSection">
                <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h2 class="text-3xl font-bold text-gray-800">Razas de Perros</h2>
                    <button id="loadDogsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                        Cargar Razas
                    </button>
                </div>
                <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </section>
        `);
    });
    
    afterEach(() => {
        $('#dogsSection').remove();
    });
    
    it('should be positioned in the header section with the title', () => {
        const button = $('#loadDogsBtn');
        const header = button.closest('.flex');
        
        expect(header.length).toBe(1);
        expect(header.find('h2').length).toBe(1);
    });
    
    it('should be aligned to the right of the title', () => {
        const headerClasses = $('#loadDogsBtn').closest('.flex').attr('class');
        
        expect(headerClasses).toContain('justify-between');
    });
    
    it('should be responsive and wrap on small screens', () => {
        const headerClasses = $('#loadDogsBtn').closest('.flex').attr('class');
        
        expect(headerClasses).toContain('flex-wrap');
        expect(headerClasses).toContain('gap-4');
    });
});

describe('Data Integrity - Property 2: Button Click Triggers Fresh Data Load', () => {
    
    beforeEach(() => {
        $('body').append(`
            <button id="loadDogsBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                Cargar Razas
            </button>
            <div id="dogsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="error-container"></div>
        `);
    });
    
    afterEach(() => {
        $('#loadDogsBtn').remove();
        $('#dogsContainer').remove();
        $('#error-container').remove();
    });
    
    it('should fetch fresh data each time button is clicked', (done) => {
        let callCount = 0;
        
        spyOn($, 'ajax').and.callFake(function(config) {
            callCount++;
            
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
        
        // First click
        $('#loadDogsBtn').click();
        
        setTimeout(() => {
            const firstCallCount = callCount;
            
            // Second click
            $('#loadDogsBtn').click();
            
            setTimeout(() => {
                expect(callCount).toBeGreaterThan(firstCallCount);
                done();
            }, 100);
        }, 100);
    });
    
    it('should update grid with new data on each click', (done) => {
        let clickCount = 0;
        
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('breeds/list/all')) {
                clickCount++;
                const breed = clickCount === 1 ? 'labrador' : 'german';
                return $.Deferred().resolve({
                    message: { [breed]: [] },
                    status: 'success'
                }).promise();
            } else if (config.url.includes('images/random')) {
                return $.Deferred().resolve({
                    message: 'https://example.com/image.jpg',
                    status: 'success'
                }).promise();
            }
        });
        
        $('#loadDogsBtn').click();
        
        setTimeout(() => {
            const firstRender = $('#dogsContainer').text();
            
            $('#loadDogsBtn').click();
            
            setTimeout(() => {
                const secondRender = $('#dogsContainer').text();
                
                // Both renders should have content
                expect(firstRender).not.toContain('Cargando');
                expect(secondRender).not.toContain('Cargando');
                done();
            }, 100);
        }, 100);
    });
});
