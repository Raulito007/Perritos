// Tests for post card component (Task 3.2)

describe('renderPostCard', () => {
    
    it('should render post card with title and body', () => {
        const post = {
            id: 1,
            title: 'Test Post Title',
            body: 'This is the post body content',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).toContain('Test Post Title');
        expect(result).toContain('This is the post body content');
    });
    
    it('should include edit and delete buttons', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).toContain('editPostBtn');
        expect(result).toContain('deletePostBtn');
        expect(result).toContain('Editar');
        expect(result).toContain('Eliminar');
    });
    
    it('should use Tailwind CSS classes for styling', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        // Verify Tailwind classes are present
        expect(result).toContain('bg-white');
        expect(result).toContain('rounded-lg');
        expect(result).toContain('shadow-md');
        expect(result).toContain('hover:shadow-lg');
        expect(result).toContain('p-6');
        expect(result).toContain('text-lg');
        expect(result).toContain('font-semibold');
        expect(result).toContain('text-gray-800');
        expect(result).toContain('text-gray-600');
    });
    
    it('should use design color palette', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        // Primary color (blue-600) for edit button
        expect(result).toContain('bg-blue-600');
        expect(result).toContain('hover:bg-blue-700');
        
        // Error color (red-600) for delete button
        expect(result).toContain('bg-red-600');
        expect(result).toContain('hover:bg-red-700');
    });
    
    it('should include data-post-id attribute', () => {
        const post = {
            id: 42,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).toContain('data-post-id="42"');
    });
    
    it('should escape HTML in title to prevent XSS', () => {
        const post = {
            id: 1,
            title: '<script>alert("xss")</script>',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).not.toContain('<script>');
        expect(result).toContain('&lt;script&gt;');
    });
    
    it('should escape HTML in body to prevent XSS', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: '<img src=x onerror="alert(\'xss\')">',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).not.toContain('onerror=');
        expect(result).toContain('&lt;img');
    });
    
    it('should truncate long body text with line-clamp-3', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'This is a very long body text that should be truncated to show only 3 lines of content in the card component to maintain a clean and organized layout',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).toContain('line-clamp-3');
    });
    
    it('should have responsive button layout', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        // Buttons should use flex-1 to share space equally
        expect(result).toContain('flex-1');
        expect(result).toContain('flex gap-2');
    });
    
    it('should have proper spacing and padding', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        // Verify spacing classes
        expect(result).toContain('mb-2');
        expect(result).toContain('mb-4');
        expect(result).toContain('px-3');
        expect(result).toContain('py-2');
    });
    
    it('should have transition effects', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).toContain('transition');
    });
    
    it('should render multiple posts without duplication', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
            { id: 3, title: 'Post 3', body: 'Body 3', userId: 1 }
        ];
        
        let html = '';
        posts.forEach(post => {
            html += renderPostCard(post);
        });
        
        expect(html).toContain('Post 1');
        expect(html).toContain('Post 2');
        expect(html).toContain('Post 3');
        expect(html).toContain('data-post-id="1"');
        expect(html).toContain('data-post-id="2"');
        expect(html).toContain('data-post-id="3"');
    });
    
    it('should handle posts with special characters in title', () => {
        const post = {
            id: 1,
            title: 'Post with "quotes" and \'apostrophes\'',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).toContain('&quot;');
        expect(result).toContain('&#039;');
    });
    
    it('should handle posts with ampersands', () => {
        const post = {
            id: 1,
            title: 'Post with & ampersand',
            body: 'Test body',
            userId: 1
        };
        
        const result = renderPostCard(post);
        
        expect(result).toContain('&amp;');
    });
});

describe('Post Card Rendering in Grid', () => {
    
    beforeEach(() => {
        $('body').append('<div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>');
    });
    
    afterEach(() => {
        $('#postsContainer').remove();
    });
    
    it('should render posts in responsive grid container', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 }
        ];
        
        let html = '';
        posts.forEach(post => {
            html += renderPostCard(post);
        });
        
        $('#postsContainer').html(html);
        
        const cards = $('#postsContainer').find('[data-post-id]');
        expect(cards.length).toBe(2);
    });
    
    it('should have correct grid classes for responsiveness', () => {
        const container = $('#postsContainer');
        const classes = container.attr('class');
        
        expect(classes).toContain('grid');
        expect(classes).toContain('grid-cols-1');
        expect(classes).toContain('md:grid-cols-2');
        expect(classes).toContain('lg:grid-cols-3');
        expect(classes).toContain('gap-6');
    });
    
    it('should render cards with proper structure for mobile view', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const html = renderPostCard(post);
        
        // Verify card structure is mobile-friendly
        expect(html).toContain('bg-white');
        expect(html).toContain('rounded-lg');
        expect(html).toContain('p-6');
    });
});

describe('Post Card Button Functionality', () => {
    
    beforeEach(() => {
        $('body').append('<div id="postsContainer"></div>');
    });
    
    afterEach(() => {
        $('#postsContainer').remove();
    });
    
    it('should have edit button with correct class', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const html = renderPostCard(post);
        $('#postsContainer').html(html);
        
        const editBtn = $('#postsContainer').find('.editPostBtn');
        expect(editBtn.length).toBe(1);
        expect(editBtn.text()).toContain('Editar');
    });
    
    it('should have delete button with correct class', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const html = renderPostCard(post);
        $('#postsContainer').html(html);
        
        const deleteBtn = $('#postsContainer').find('.deletePostBtn');
        expect(deleteBtn.length).toBe(1);
        expect(deleteBtn.text()).toContain('Eliminar');
    });
    
    it('should have buttons with proper styling', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const html = renderPostCard(post);
        
        // Verify button styling
        expect(html).toContain('text-white');
        expect(html).toContain('font-semibold');
        expect(html).toContain('rounded');
    });
    
    it('should have buttons that can be clicked', () => {
        const post = {
            id: 1,
            title: 'Test Post',
            body: 'Test body',
            userId: 1
        };
        
        const html = renderPostCard(post);
        $('#postsContainer').html(html);
        
        const editBtn = $('#postsContainer').find('.editPostBtn');
        const deleteBtn = $('#postsContainer').find('.deletePostBtn');
        
        expect(editBtn.is('button')).toBe(true);
        expect(deleteBtn.is('button')).toBe(true);
    });
});

describe('Data Integrity - Property 2: Posts API Connection and Rendering', () => {
    
    beforeEach(() => {
        $('body').append('<div id="postsContainer"></div>');
    });
    
    afterEach(() => {
        $('#postsContainer').remove();
    });
    
    it('should render all posts without data loss', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
            { id: 3, title: 'Post 3', body: 'Body 3', userId: 1 },
            { id: 4, title: 'Post 4', body: 'Body 4', userId: 1 },
            { id: 5, title: 'Post 5', body: 'Body 5', userId: 1 }
        ];
        
        let html = '';
        posts.forEach(post => {
            html += renderPostCard(post);
        });
        
        $('#postsContainer').html(html);
        
        // Verify all posts are rendered
        posts.forEach(post => {
            expect($('#postsContainer').text()).toContain(post.title);
            expect($('#postsContainer').text()).toContain(post.body);
        });
        
        // Verify correct number of cards
        const postCards = $('#postsContainer').find('[data-post-id]');
        expect(postCards.length).toBe(posts.length);
    });
    
    it('should not corrupt post data during rendering', () => {
        const post = {
            id: 1,
            title: 'Post with special-characters_and.symbols',
            body: 'Body with numbers 123 and symbols !@#$%',
            userId: 1
        };
        
        const html = renderPostCard(post);
        
        expect(html).toContain('special-characters_and.symbols');
        expect(html).toContain('123');
    });
    
    it('should preserve post IDs without modification', () => {
        const posts = [
            { id: 100, title: 'Post 100', body: 'Body', userId: 1 },
            { id: 999, title: 'Post 999', body: 'Body', userId: 1 },
            { id: 1, title: 'Post 1', body: 'Body', userId: 1 }
        ];
        
        let html = '';
        posts.forEach(post => {
            html += renderPostCard(post);
        });
        
        expect(html).toContain('data-post-id="100"');
        expect(html).toContain('data-post-id="999"');
        expect(html).toContain('data-post-id="1"');
    });
});


describe('renderPostsGrid', () => {
    
    it('should render empty state when no posts provided', () => {
        const result = renderPostsGrid([]);
        expect(result).toContain('No hay posts');
    });
    
    it('should render empty state when null provided', () => {
        const result = renderPostsGrid(null);
        expect(result).toContain('No hay posts');
    });
    
    it('should render single post card', () => {
        const posts = [
            { id: 1, title: 'Test Post', body: 'Test body', userId: 1 }
        ];
        const result = renderPostsGrid(posts);
        
        expect(result).toContain('Test Post');
        expect(result).toContain('Test body');
        expect(result).toContain('bg-white');
        expect(result).toContain('data-post-id="1"');
    });
    
    it('should render multiple post cards', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
            { id: 3, title: 'Post 3', body: 'Body 3', userId: 1 }
        ];
        const result = renderPostsGrid(posts);
        
        expect(result).toContain('Post 1');
        expect(result).toContain('Post 2');
        expect(result).toContain('Post 3');
        expect(result.match(/bg-white/g).length).toBe(3);
    });
    
    it('should escape HTML in post titles', () => {
        const posts = [
            { id: 1, title: '<script>alert("xss")</script>', body: 'Body', userId: 1 }
        ];
        const result = renderPostsGrid(posts);
        
        expect(result).not.toContain('<script>');
        expect(result).toContain('&lt;script&gt;');
    });
    
    it('should escape HTML in post bodies', () => {
        const posts = [
            { id: 1, title: 'Title', body: '<img src=x onerror="alert(\'xss\')">', userId: 1 }
        ];
        const result = renderPostsGrid(posts);
        
        expect(result).not.toContain('onerror=');
        expect(result).toContain('&lt;img');
    });
    
    it('should include edit and delete buttons for each post', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 }
        ];
        const result = renderPostsGrid(posts);
        
        expect(result.match(/editPostBtn/g).length).toBe(2);
        expect(result.match(/deletePostBtn/g).length).toBe(2);
    });
    
    it('should include Tailwind CSS classes for styling', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 }
        ];
        const result = renderPostsGrid(posts);
        
        expect(result).toContain('bg-white');
        expect(result).toContain('rounded-lg');
        expect(result).toContain('shadow-md');
        expect(result).toContain('hover:shadow-lg');
        expect(result).toContain('p-6');
    });
    
    it('should include design color palette', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 }
        ];
        const result = renderPostsGrid(posts);
        
        // Primary color (blue-600) for edit button
        expect(result).toContain('bg-blue-600');
        expect(result).toContain('hover:bg-blue-700');
        
        // Error color (red-600) for delete button
        expect(result).toContain('bg-red-600');
        expect(result).toContain('hover:bg-red-700');
    });
    
    it('should handle large number of posts', () => {
        const posts = Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            title: `Post ${i + 1}`,
            body: `Body ${i + 1}`,
            userId: 1
        }));
        const result = renderPostsGrid(posts);
        
        expect(result.match(/bg-white/g).length).toBe(100);
        expect(result).toContain('Post 1');
        expect(result).toContain('Post 100');
    });
});

describe('loadPosts - Grid Rendering', () => {
    let mockPostsResponse;
    
    beforeEach(() => {
        // Setup DOM
        $('body').append('<div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>');
        $('body').append('<div id="error-container"></div>');
        $('body').append('<div id="loadingSpinner" class="hidden"></div>');
        $('body').append('<div id="spinnerText"></div>');
        
        mockPostsResponse = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
            { id: 3, title: 'Post 3', body: 'Body 3', userId: 1 }
        ];
    });
    
    afterEach(() => {
        $('#postsContainer').remove();
        $('#error-container').remove();
        $('#loadingSpinner').remove();
        $('#spinnerText').remove();
    });
    
    it('should render all posts in grid after loading', (done) => {
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('posts')) {
                return $.Deferred().resolve(mockPostsResponse).promise();
            }
        });
        
        loadPosts();
        
        setTimeout(() => {
            const postCards = $('#postsContainer').find('[data-post-id]');
            expect(postCards.length).toBe(3);
            expect($('#postsContainer').text()).toContain('Post 1');
            expect($('#postsContainer').text()).toContain('Post 2');
            expect($('#postsContainer').text()).toContain('Post 3');
            done();
        }, 100);
    });
    
    it('should show loading message initially', () => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().promise()
        );
        
        loadPosts();
        
        expect($('#spinnerText').text()).toContain('Cargando posts');
    });
    
    it('should show error message when posts API fails', (done) => {
        spyOn($, 'ajax').and.returnValue(
            $.Deferred().reject().promise()
        );
        
        loadPosts();
        
        setTimeout(() => {
            expect($('#error-container').text()).toContain('No se pudo conectar');
            done();
        }, 50);
    });
    
    it('should show empty state when no posts found', (done) => {
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('posts')) {
                return $.Deferred().resolve([]).promise();
            }
        });
        
        loadPosts();
        
        setTimeout(() => {
            expect($('#postsContainer').text()).toContain('No hay posts');
            done();
        }, 50);
    });
    
    it('should use renderPostsGrid function to render posts', (done) => {
        spyOn($, 'ajax').and.callFake(function(config) {
            if (config.url.includes('posts')) {
                return $.Deferred().resolve(mockPostsResponse).promise();
            }
        });
        
        spyOn(window, 'renderPostsGrid').and.callThrough();
        
        loadPosts();
        
        setTimeout(() => {
            expect(window.renderPostsGrid).toHaveBeenCalledWith(mockPostsResponse);
            done();
        }, 50);
    });
});

describe('Responsive Posts Grid Layout', () => {
    
    it('should have correct grid classes in HTML container', () => {
        const container = $('#postsContainer');
        const classes = container.attr('class');
        
        expect(classes).toContain('grid');
        expect(classes).toContain('grid-cols-1');
        expect(classes).toContain('md:grid-cols-2');
        expect(classes).toContain('lg:grid-cols-3');
        expect(classes).toContain('gap-6');
    });
    
    it('should render cards with proper structure for responsive layout', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 }
        ];
        const html = renderPostsGrid(posts);
        
        // Verify card structure
        expect(html).toContain('bg-white');
        expect(html).toContain('rounded-lg');
        expect(html).toContain('shadow-md');
        expect(html).toContain('p-6');
    });
});

describe('Data Integrity - Property 2: Posts API Connection and Rendering', () => {
    
    beforeEach(() => {
        $('body').append('<div id="postsContainer"></div>');
    });
    
    afterEach(() => {
        $('#postsContainer').remove();
    });
    
    it('should render all posts without data loss', () => {
        const posts = [
            { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
            { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
            { id: 3, title: 'Post 3', body: 'Body 3', userId: 1 },
            { id: 4, title: 'Post 4', body: 'Body 4', userId: 1 },
            { id: 5, title: 'Post 5', body: 'Body 5', userId: 1 }
        ];
        
        const html = renderPostsGrid(posts);
        $('#postsContainer').html(html);
        
        // Verify all posts are rendered
        posts.forEach(post => {
            expect($('#postsContainer').text()).toContain(post.title);
            expect($('#postsContainer').text()).toContain(post.body);
        });
        
        // Verify correct number of cards
        const postCards = $('#postsContainer').find('[data-post-id]');
        expect(postCards.length).toBe(posts.length);
    });
    
    it('should not corrupt post data during rendering', () => {
        const posts = [
            { id: 1, title: 'Post with special-characters_and.symbols', body: 'Body with numbers 123', userId: 1 }
        ];
        
        const html = renderPostsGrid(posts);
        
        expect(html).toContain('special-characters_and.symbols');
        expect(html).toContain('123');
    });
    
    it('should preserve post IDs without modification', () => {
        const posts = [
            { id: 100, title: 'Post 100', body: 'Body', userId: 1 },
            { id: 999, title: 'Post 999', body: 'Body', userId: 1 },
            { id: 1, title: 'Post 1', body: 'Body', userId: 1 }
        ];
        
        const html = renderPostsGrid(posts);
        
        expect(html).toContain('data-post-id="100"');
        expect(html).toContain('data-post-id="999"');
        expect(html).toContain('data-post-id="1"');
    });
});
