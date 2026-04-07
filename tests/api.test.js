// Tests para funciones de API

describe('getDogImage', () => {
    // Mock jQuery AJAX
    let ajaxSpy;
    
    beforeEach(() => {
        ajaxSpy = jasmine.createSpy('ajax').and.returnValue({
            done: jasmine.createSpy('done').and.returnValue({
                fail: jasmine.createSpy('fail').and.returnValue({})
            }),
            fail: jasmine.createSpy('fail').and.returnValue({})
        });
        
        spyOn($, 'ajax').and.callFake(ajaxSpy);
    });
    
    it('should make AJAX call to correct endpoint', () => {
        const breed = 'labrador';
        getDogImage(breed);
        
        expect($.ajax).toHaveBeenCalledWith({
            url: `${API_CONFIG.DOG_API}/breed/${breed}/images/random`,
            method: 'GET',
            dataType: 'json',
            timeout: API_CONFIG.TIMEOUT
        });
    });
    
    it('should return a jQuery promise', () => {
        const breed = 'labrador';
        const result = getDogImage(breed);
        
        expect(result).toBeDefined();
        expect(result.done).toBeDefined();
        expect(result.fail).toBeDefined();
    });
    
    it('should handle different breed names', () => {
        const breeds = ['labrador', 'german', 'poodle', 'bulldog'];
        
        breeds.forEach(breed => {
            getDogImage(breed);
            
            expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
                url: jasmine.stringContaining(`/breed/${breed}/images/random`)
            }));
        });
    });
    
    it('should use correct HTTP method', () => {
        getDogImage('labrador');
        
        expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
            method: 'GET'
        }));
    });
    
    it('should set correct dataType', () => {
        getDogImage('labrador');
        
        expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
            dataType: 'json'
        }));
    });
    
    it('should set timeout from config', () => {
        getDogImage('labrador');
        
        expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
            timeout: API_CONFIG.TIMEOUT
        }));
    });
});

describe('getDogBreeds', () => {
    let ajaxSpy;
    
    beforeEach(() => {
        ajaxSpy = jasmine.createSpy('ajax').and.returnValue({
            done: jasmine.createSpy('done').and.returnValue({
                fail: jasmine.createSpy('fail').and.returnValue({})
            }),
            fail: jasmine.createSpy('fail').and.returnValue({})
        });
        
        spyOn($, 'ajax').and.callFake(ajaxSpy);
    });
    
    it('should make AJAX call to breeds endpoint', () => {
        getDogBreeds();
        
        expect($.ajax).toHaveBeenCalledWith({
            url: `${API_CONFIG.DOG_API}/breeds/list/all`,
            method: 'GET',
            dataType: 'json',
            timeout: API_CONFIG.TIMEOUT
        });
    });
    
    it('should return a jQuery promise', () => {
        const result = getDogBreeds();
        
        expect(result).toBeDefined();
        expect(result.done).toBeDefined();
        expect(result.fail).toBeDefined();
    });
});


describe('getPosts', () => {
    let ajaxSpy;
    
    beforeEach(() => {
        ajaxSpy = jasmine.createSpy('ajax').and.returnValue({
            done: jasmine.createSpy('done').and.returnValue({
                fail: jasmine.createSpy('fail').and.returnValue({})
            }),
            fail: jasmine.createSpy('fail').and.returnValue({})
        });
        
        spyOn($, 'ajax').and.callFake(ajaxSpy);
    });
    
    it('should make AJAX call to posts endpoint', () => {
        getPosts();
        
        expect($.ajax).toHaveBeenCalledWith({
            url: `${API_CONFIG.POSTS_API}/posts`,
            method: 'GET',
            dataType: 'json',
            timeout: API_CONFIG.TIMEOUT
        });
    });
    
    it('should return a jQuery promise', () => {
        const result = getPosts();
        
        expect(result).toBeDefined();
        expect(result.done).toBeDefined();
        expect(result.fail).toBeDefined();
    });
    
    it('should use correct HTTP method', () => {
        getPosts();
        
        expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
            method: 'GET'
        }));
    });
    
    it('should set correct dataType', () => {
        getPosts();
        
        expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
            dataType: 'json'
        }));
    });
    
    it('should set timeout from config', () => {
        getPosts();
        
        expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
            timeout: API_CONFIG.TIMEOUT
        }));
    });
});
