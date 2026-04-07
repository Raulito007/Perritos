// Tests for form validation functions (Task 4.1)

describe('validateTitle - Title Validation', () => {
    
    it('should return isValid: true for valid title', () => {
        const result = validateTitle('My Post Title');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: false for empty string', () => {
        const result = validateTitle('');
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
    });
    
    it('should return isValid: false for whitespace-only string', () => {
        const result = validateTitle('   ');
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
    });
    
    it('should return isValid: false for null', () => {
        const result = validateTitle(null);
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
    });
    
    it('should return isValid: false for undefined', () => {
        const result = validateTitle(undefined);
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
    });
    
    it('should return isValid: false for title exceeding 200 characters', () => {
        const longTitle = 'a'.repeat(201);
        const result = validateTitle(longTitle);
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
    });
    
    it('should return isValid: true for title with exactly 200 characters', () => {
        const titleWith200Chars = 'a'.repeat(200);
        const result = validateTitle(titleWith200Chars);
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for title with 1 character', () => {
        const result = validateTitle('a');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for title with special characters', () => {
        const result = validateTitle('¡Hola! ¿Cómo estás?');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for title with numbers', () => {
        const result = validateTitle('Post 123 Title');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for title with leading/trailing spaces (after trim)', () => {
        const result = validateTitle('  Valid Title  ');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return object with isValid and errorMessage properties', () => {
        const result = validateTitle('Test');
        
        expect(result).toHaveProperty('isValid');
        expect(result).toHaveProperty('errorMessage');
        expect(typeof result.isValid).toBe('boolean');
        expect(typeof result.errorMessage).toBe('string');
    });
    
    it('should handle title with tabs and newlines', () => {
        const result = validateTitle('\t\n');
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
    });
    
    it('should return isValid: true for title with 100 characters', () => {
        const titleWith100Chars = 'a'.repeat(100);
        const result = validateTitle(titleWith100Chars);
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: false for title with 201 characters', () => {
        const titleWith201Chars = 'a'.repeat(201);
        const result = validateTitle(titleWith201Chars);
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
    });
});

describe('validateTitle - Property-Based Tests', () => {
    
    it('should validate titles between 1 and 200 characters as valid', () => {
        // Test multiple valid lengths
        for (let length = 1; length <= 200; length += 10) {
            const title = 'a'.repeat(length);
            const result = validateTitle(title);
            expect(result.isValid).toBe(true);
            expect(result.errorMessage).toBe('');
        }
    });
    
    it('should reject all titles longer than 200 characters', () => {
        // Test multiple invalid lengths
        for (let length = 201; length <= 250; length += 5) {
            const title = 'a'.repeat(length);
            const result = validateTitle(title);
            expect(result.isValid).toBe(false);
            expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
        }
    });
    
    it('should reject all empty or whitespace-only titles', () => {
        const emptyVariants = ['', ' ', '  ', '\t', '\n', '\t\n', '   \t   '];
        
        emptyVariants.forEach(variant => {
            const result = validateTitle(variant);
            expect(result.isValid).toBe(false);
            expect(result.errorMessage).toBe('El título es requerido y debe tener entre 1 y 200 caracteres');
        });
    });
    
    it('should always return an object with isValid and errorMessage', () => {
        const testCases = [
            'Valid Title',
            '',
            'a'.repeat(200),
            'a'.repeat(201),
            null,
            undefined,
            '   '
        ];
        
        testCases.forEach(testCase => {
            const result = validateTitle(testCase);
            expect(result).toBeDefined();
            expect(result).toHaveProperty('isValid');
            expect(result).toHaveProperty('errorMessage');
            expect(typeof result.isValid).toBe('boolean');
            expect(typeof result.errorMessage).toBe('string');
        });
    });
    
    it('should return consistent error message for all invalid cases', () => {
        const invalidCases = [
            '',
            '   ',
            null,
            undefined,
            'a'.repeat(201)
        ];
        
        const expectedMessage = 'El título es requerido y debe tener entre 1 y 200 caracteres';
        
        invalidCases.forEach(testCase => {
            const result = validateTitle(testCase);
            expect(result.errorMessage).toBe(expectedMessage);
        });
    });
});

describe('validateTitle - Edge Cases', () => {
    
    it('should handle title with only spaces correctly', () => {
        const result = validateTitle('     ');
        
        expect(result.isValid).toBe(false);
    });
    
    it('should handle title with mixed whitespace', () => {
        const result = validateTitle(' \t \n ');
        
        expect(result.isValid).toBe(false);
    });
    
    it('should handle very long title (500 characters)', () => {
        const veryLongTitle = 'a'.repeat(500);
        const result = validateTitle(veryLongTitle);
        
        expect(result.isValid).toBe(false);
    });
    
    it('should handle title with unicode characters', () => {
        const result = validateTitle('Título con acentos: áéíóú');
        
        expect(result.isValid).toBe(true);
    });
    
    it('should handle title with emoji', () => {
        const result = validateTitle('Post Title 🎉');
        
        expect(result.isValid).toBe(true);
    });
    
    it('should handle title with HTML-like content', () => {
        const result = validateTitle('<script>alert("test")</script>');
        
        expect(result.isValid).toBe(true);
    });
});

describe('validateBody - Body Validation', () => {
    
    it('should return isValid: true for valid body', () => {
        const result = validateBody('This is a valid post body');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: false for empty string', () => {
        const result = validateBody('');
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
    });
    
    it('should return isValid: false for whitespace-only string', () => {
        const result = validateBody('   ');
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
    });
    
    it('should return isValid: false for null', () => {
        const result = validateBody(null);
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
    });
    
    it('should return isValid: false for undefined', () => {
        const result = validateBody(undefined);
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
    });
    
    it('should return isValid: false for body exceeding 5000 characters', () => {
        const longBody = 'a'.repeat(5001);
        const result = validateBody(longBody);
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
    });
    
    it('should return isValid: true for body with exactly 5000 characters', () => {
        const bodyWith5000Chars = 'a'.repeat(5000);
        const result = validateBody(bodyWith5000Chars);
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for body with 1 character', () => {
        const result = validateBody('a');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for body with special characters', () => {
        const result = validateBody('¡Hola! ¿Cómo estás? Este es un contenido válido.');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for body with numbers', () => {
        const result = validateBody('Post content with numbers 123 456 789');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for body with leading/trailing spaces (after trim)', () => {
        const result = validateBody('  Valid body content  ');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return object with isValid and errorMessage properties', () => {
        const result = validateBody('Test');
        
        expect(result).toHaveProperty('isValid');
        expect(result).toHaveProperty('errorMessage');
        expect(typeof result.isValid).toBe('boolean');
        expect(typeof result.errorMessage).toBe('string');
    });
    
    it('should handle body with tabs and newlines', () => {
        const result = validateBody('\t\n');
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
    });
    
    it('should return isValid: true for body with 2500 characters', () => {
        const bodyWith2500Chars = 'a'.repeat(2500);
        const result = validateBody(bodyWith2500Chars);
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: false for body with 5001 characters', () => {
        const bodyWith5001Chars = 'a'.repeat(5001);
        const result = validateBody(bodyWith5001Chars);
        
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
    });
    
    it('should return isValid: true for body with multiline content', () => {
        const result = validateBody('Line 1\nLine 2\nLine 3');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
    
    it('should return isValid: true for body with HTML-like content', () => {
        const result = validateBody('<p>This is HTML-like content</p>');
        
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
});

describe('validateBody - Property-Based Tests', () => {
    
    it('should validate bodies between 1 and 5000 characters as valid', () => {
        // Test multiple valid lengths
        for (let length = 1; length <= 5000; length += 500) {
            const body = 'a'.repeat(length);
            const result = validateBody(body);
            expect(result.isValid).toBe(true);
            expect(result.errorMessage).toBe('');
        }
    });
    
    it('should reject all bodies longer than 5000 characters', () => {
        // Test multiple invalid lengths
        for (let length = 5001; length <= 5050; length += 5) {
            const body = 'a'.repeat(length);
            const result = validateBody(body);
            expect(result.isValid).toBe(false);
            expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
        }
    });
    
    it('should reject all empty or whitespace-only bodies', () => {
        const emptyVariants = ['', ' ', '  ', '\t', '\n', '\t\n', '   \t   '];
        
        emptyVariants.forEach(variant => {
            const result = validateBody(variant);
            expect(result.isValid).toBe(false);
            expect(result.errorMessage).toBe('El contenido es requerido y debe tener entre 1 y 5000 caracteres');
        });
    });
    
    it('should always return an object with isValid and errorMessage', () => {
        const testCases = [
            'Valid Body',
            '',
            'a'.repeat(5000),
            'a'.repeat(5001),
            null,
            undefined,
            '   '
        ];
        
        testCases.forEach(testCase => {
            const result = validateBody(testCase);
            expect(result).toBeDefined();
            expect(result).toHaveProperty('isValid');
            expect(result).toHaveProperty('errorMessage');
            expect(typeof result.isValid).toBe('boolean');
            expect(typeof result.errorMessage).toBe('string');
        });
    });
    
    it('should return consistent error message for all invalid cases', () => {
        const invalidCases = [
            '',
            '   ',
            null,
            undefined,
            'a'.repeat(5001)
        ];
        
        const expectedMessage = 'El contenido es requerido y debe tener entre 1 y 5000 caracteres';
        
        invalidCases.forEach(testCase => {
            const result = validateBody(testCase);
            expect(result.errorMessage).toBe(expectedMessage);
        });
    });
});

describe('validateBody - Edge Cases', () => {
    
    it('should handle body with only spaces correctly', () => {
        const result = validateBody('     ');
        
        expect(result.isValid).toBe(false);
    });
    
    it('should handle body with mixed whitespace', () => {
        const result = validateBody(' \t \n ');
        
        expect(result.isValid).toBe(false);
    });
    
    it('should handle very long body (10000 characters)', () => {
        const veryLongBody = 'a'.repeat(10000);
        const result = validateBody(veryLongBody);
        
        expect(result.isValid).toBe(false);
    });
    
    it('should handle body with unicode characters', () => {
        const result = validateBody('Contenido con acentos: áéíóú y caracteres especiales');
        
        expect(result.isValid).toBe(true);
    });
    
    it('should handle body with emoji', () => {
        const result = validateBody('Post content with emoji 🎉 and more text');
        
        expect(result.isValid).toBe(true);
    });
    
    it('should handle body with repeated newlines', () => {
        const result = validateBody('Line 1\n\n\nLine 2');
        
        expect(result.isValid).toBe(true);
    });
});

describe('validatePost - Post Validation', () => {
    
    it('should return isValid: true for valid post', () => {
        const result = validatePost('Valid Title', 'Valid Body');
        
        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
    });
    
    it('should return isValid: false for empty title', () => {
        const result = validatePost('', 'Valid Body');
        
        expect(result.isValid).toBe(false);
        expect(result.errors.title).toBeDefined();
    });
    
    it('should return isValid: false for empty body', () => {
        const result = validatePost('Valid Title', '');
        
        expect(result.isValid).toBe(false);
        expect(result.errors.body).toBeDefined();
    });
    
    it('should return isValid: false for both empty title and body', () => {
        const result = validatePost('', '');
        
        expect(result.isValid).toBe(false);
        expect(result.errors.title).toBeDefined();
        expect(result.errors.body).toBeDefined();
    });
    
    it('should return isValid: false for whitespace-only title', () => {
        const result = validatePost('   ', 'Valid Body');
        
        expect(result.isValid).toBe(false);
        expect(result.errors.title).toBeDefined();
    });
    
    it('should return isValid: false for whitespace-only body', () => {
        const result = validatePost('Valid Title', '   ');
        
        expect(result.isValid).toBe(false);
        expect(result.errors.body).toBeDefined();
    });
});
