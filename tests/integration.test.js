// Integration tests for getDogImage function

describe('getDogImage Integration', () => {
    
    it('should handle successful API response with correct format', (done) => {
        // Mock successful response from dog.ceo API
        const mockResponse = {
            message: 'https://images.dog.ceo/breeds/labrador/n02099601_1003.jpg',
            status: 'success'
        };
        
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve(mockResponse).promise()
        );
        
        getDogImage('labrador')
            .done(function(data) {
                expect(data.message).toBeDefined();
                expect(data.status).toBe('success');
                expect(data.message).toContain('http');
                done();
            })
            .fail(function() {
                fail('Should not fail with valid response');
                done();
            });
    });
    
    it('should extract image URL from response', (done) => {
        const imageUrl = 'https://images.dog.ceo/breeds/labrador/n02099601_1003.jpg';
        const mockResponse = {
            message: imageUrl,
            status: 'success'
        };
        
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().resolve(mockResponse).promise()
        );
        
        getDogImage('labrador')
            .done(function(data) {
                expect(data.message).toBe(imageUrl);
                done();
            });
    });
    
    it('should handle API error gracefully', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({
                status: 404,
                statusText: 'Not Found'
            }).promise()
        );
        
        getDogImage('invalid-breed')
            .fail(function(error) {
                expect(error).toBeDefined();
                done();
            });
    });
    
    it('should handle timeout', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject({
                statusText: 'timeout'
            }).promise()
        );
        
        getDogImage('labrador')
            .fail(function(error) {
                expect(error.statusText).toBe('timeout');
                done();
            });
    });
    
    it('should work with various breed names', (done) => {
        const breeds = ['labrador', 'german', 'poodle', 'bulldog', 'husky'];
        let completed = 0;
        
        breeds.forEach(breed => {
            const mockResponse = {
                message: `https://images.dog.ceo/breeds/${breed}/image.jpg`,
                status: 'success'
            };
            
            spyOn($, 'ajax').and.returnValue(
                $.Deferred().resolve(mockResponse).promise()
            );
            
            getDogImage(breed)
                .done(function(data) {
                    expect(data.message).toContain(breed);
                    completed++;
                    if (completed === breeds.length) {
                        done();
                    }
                });
        });
    });
});

describe('loadDogs with getDogImage', () => {
    
    it('should render dog cards with images from getDogImage', (done) => {
        // Setup DOM
        $('body').append('<div id="dogsContainer"></div>');
        $('body').append('<div id="error-container"></div>');
        
        const mockBreedsResponse = {
            message: {
                'labrador': [],
                'german': [],
                'poodle': []
            },
            status: 'success'
        };
        
        const mockImageResponse = {
            message: 'https://images.dog.ceo/breeds/labrador/image.jpg',
            status: 'success'
        };
        
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
            expect(dogCards.length).toBeGreaterThan(0);
            done();
        }, 100);
    });
});
