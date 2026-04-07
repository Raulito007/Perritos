// Tests for responsive grid rendering (Task 2.4)

describe('renderBreedsGrid', () => {
    
    it('should render empty state when no breeds provided', () => {
        const result = renderBreedsGrid([]);
        expect(result).toContain('No se encontraron razas');
    });
    
    it('should render empty state when null provided', () => {
        const result = renderBreedsGrid(null);
        expect(result).toContain('No se encontraron razas');
    });
    
    it('should render single breed card', () => {
        const breeds = [
            { name: 'labrador', imageUrl: 'https://example.com/labrador.jpg' }
        ];
        const result = renderBreedsGrid(breeds);
        
        expect(result).toContain('labrador');
        expect(result).toContain('https://example.com/labrador.jpg');
        expect(result).toContain('bg-white');
    });
    
    it('should render multiple breed cards', () => {
        const breeds = [
            { name: 'labrador', imageUrl: 'https://example.com/labrador.jpg' },
            { name: 'german', imageUrl: 'https://example.com/german.jpg' },
            { name: 'poodle', imageUrl: 'https://example.com/poodle.jpg' }
        ];
        const result = renderBreedsGrid(breeds);
        
        expect(result).toContain('labrador');
        expect(result).toContain('german');
        expect(result).toContain('poodle');
        expect(result.match(/bg-white/g).length).toBe(3);
    });
    
    it('should escape HTML in breed names', () => {
        const breeds = [
            { name: '<script>alert("xss")</script>', imageUrl: 'https://example.com/test.jpg' }
        ];
        const result = renderBreedsGrid(breeds);
        
        expect(result).not.toContain('<script>');
        expect(result).toContain('&lt;script&gt;');
    });
    
    it('should include responsive grid classes', () => {
        const breeds = [
            { name: 'labrador', imageUrl: 'https://example.com/labrador.jpg' }
        ];
        const result = renderBreedsGrid(breeds);
        
        // The grid classes should be in the container, not in individual cards
        // But we can verify the cards are properly formatted
        expect(result).toContain('bg-white');
        expect(result).toContain('rounded-lg');
        expect(result).toContain('shadow-md');
    });
    
    it('should include hover effects', () => {
        const breeds = [
            { name: 'labrador', imageUrl: 'https://example.com/labrador.jpg' }
        ];
        const result = renderBreedsGrid(breeds);
        
        expect(result).toContain('hover:shadow-lg');
        expect(result).toContain('group-hover:scale-105');
    });
    
    it('should include lazy loading for images', () => {
        const breeds = [
            { name: 'labrador', imageUrl: 'https://example.com/labrador.jpg' }
        ];
        const result = renderBreedsGrid(breeds);
        
        expect(result).toContain('loading="lazy"');
    });
    
    it('should filter out breeds without images', () => {
        const breeds = [
            { name: 'labrador', imageUrl: 'https://example.com/labrador.jpg' },
            { name: 'german', imageUrl: null },
            { name: 'poodle', imageUrl: undefined }
        ];
        const result = renderBreedsGrid(breeds);
        
        expect(result).toContain('labrador');
        expect(result).not.toContain('german');
        expect(result).not.toContain('poodle');
    });
});

describe('loadDogs - Grid Rendering', () => {
    let mockBreedsResponse;
    let mockImageResponse;
    
    beforeEach(() => {
        // Setup DOM
        $('body').append('<div id="dogsContainer"></div>');
        $('body').append('<div id="error-container"></div>');
        
        mockBreedsResponse = {
            message: {
                'labrador': [],
                'german': [],
                'poodle': []
            },
            status: 'success'
        };
        
        mockImageResponse = {
            message: 'https://images.dog.ceo/breeds/labrador/image.jpg',
            status: 'success'
        };
    });
    
    afterEach(() => {
        $('#dogsContainer').remove();
        $('#error-container').remove();
    });
    
    it('should render all breeds in grid after loading', (done) => {
        let ajaxCallCount = 0;
        
        spyOn($, 'ajax').and.callFake(function(config) {
            ajaxCallCount++;
            
            if (config.url.includes('breeds/list/all')) {
                return $.Deferred().resolve(mockBreedsResponse).promise();
            } else if (config.url.includes('images/random')) {
                return $.Deferred().resolve(mockImageResponse).promise();
            }
        });
        
        loadDogs();
        
        setTimeout(() => {
            const dogCards = $('#dogsContainer').find('[class*="bg-white"]');
            expect(dogCards.length).toBe(3);
            expect($('#dogsContainer').text()).toContain('labrador');
            done();
        }, 100);
    });
    
    it('should show loading message initially', () => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().promise()
        );
        
        loadDogs();
        
        expect($('#dogsContainer').text()).toContain('Cargando razas');
    });
    
    it('should handle partial image load failures', (done) => {
        let callCount = 0;
        
        spyOn($, 'ajax').and.callFake(function(config) {
            callCount++;
            
            if (config.url.includes('breeds/list/all')) {
                return $.Deferred().resolve(mockBreedsResponse).promise();
            } else if (config.url.includes('labrador')) {
                return $.Deferred().resolve(mockImageResponse).promise();
            } else {
                // Fail for other breeds
                return $.Deferred().reject().promise();
            }
        });
        
        loadDogs();
        
        setTimeout(() => {
            const dogCards = $('#dogsContainer').find('[class*="bg-white"]');
            // Only labrador should be rendered
            expect(dogCards.length).toBe(1);
            expect($('#dogsContainer').text()).toContain('labrador');
            done();
        }, 100);
    });
    
    it('should show error message when breeds API fails', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject().promise()
        );
        
        loadDogs();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('No se pudo conectar');
            done();
        }, 50);
    });
    
    it('should show empty state when no breeds found', (done) => {
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('breeds/list/all')) {
                return $.Deferred().resolve({ message: {}, status: 'success' }).promise();
            }
        });
        
        loadDogs();
        
        setTimeout(() => {
            expect($('#dogsContainer').text()).toContain('No se encontraron razas');
            done();
        }, 50);
    });
});

describe('Responsive Grid Layout', () => {
    
    it('should have correct grid classes in HTML container', () => {
        const container = $('#dogsContainer');
        const classes = container.attr('class');
        
        expect(classes).toContain('grid');
        expect(classes).toContain('grid-cols-1');
        expect(classes).toContain('md:grid-cols-2');
        expect(classes).toContain('lg:grid-cols-3');
        expect(classes).toContain('gap-6');
    });
    
    it('should render cards with proper structure for responsive layout', () => {
        const breeds = [
            { name: 'labrador', imageUrl: 'https://example.com/labrador.jpg' }
        ];
        const html = renderBreedsGrid(breeds);
        
        // Verify card structure
        expect(html).toContain('bg-white');
        expect(html).toContain('rounded-lg');
        expect(html).toContain('shadow-md');
        expect(html).toContain('overflow-hidden');
    });
});

describe('Data Integrity - Property 1: Dogs API Connection and Rendering', () => {
    
    it('should render all breeds without data loss', (done) => {
        $('body').append('<div id="dogsContainer"></div>');
        $('body').append('<div id="error-container"></div>');
        
        const breeds = ['labrador', 'german', 'poodle', 'bulldog', 'husky'];
        const mockBreedsResponse = {
            message: breeds.reduce((acc, breed) => {
                acc[breed] = [];
                return acc;
            }, {}),
            status: 'success'
        };
        
        let callCount = 0;
        spyOn($, 'ajax').and.callFake(function(config) {
            callCount++;
            
            if (config.url.includes('breeds/list/all')) {
                return $.Deferred().resolve(mockBreedsResponse).promise();
            } else if (config.url.includes('images/random')) {
                return $.Deferred().resolve({
                    message: 'https://example.com/image.jpg',
                    status: 'success'
                }).promise();
            }
        });
        
        loadDogs();
        
        setTimeout(() => {
            const renderedBreeds = $('#dogsContainer').text();
            
            // Verify all breeds are rendered
            breeds.forEach(breed => {
                expect(renderedBreeds).toContain(breed);
            });
            
            // Verify correct number of cards
            const dogCards = $('#dogsContainer').find('[class*="bg-white"]');
            expect(dogCards.length).toBe(breeds.length);
            
            $('#dogsContainer').remove();
            $('#error-container').remove();
            done();
        }, 100);
    });
    
    it('should not corrupt breed names during rendering', () => {
        const breeds = [
            { name: 'labrador-retriever', imageUrl: 'https://example.com/labrador.jpg' },
            { name: 'german-shepherd', imageUrl: 'https://example.com/german.jpg' }
        ];
        const html = renderBreedsGrid(breeds);
        
        expect(html).toContain('labrador-retriever');
        expect(html).toContain('german-shepherd');
    });
    
    it('should preserve image URLs without modification', () => {
        const imageUrl = 'https://images.dog.ceo/breeds/labrador/n02099601_1003.jpg';
        const breeds = [
            { name: 'labrador', imageUrl: imageUrl }
        ];
        const html = renderBreedsGrid(breeds);
        
        expect(html).toContain(imageUrl);
    });
});
