# Ejemplos de Propiedades de Corrección

Este documento proporciona ejemplos de cómo implementar las propiedades de corrección usando property-based testing con fast-check.

## Property 1: Dogs API Connection and Rendering

**Descripción**: Para cualquier respuesta exitosa de dog.ceo API, cada raza debe renderizarse con nombre e imagen.

**Implementación con fast-check**:

```javascript
import fc from 'fast-check';

describe('Property 1: Dogs API Connection and Rendering', () => {
  it('should render all breeds with names and images', () => {
    fc.assert(
      fc.property(
        fc.record({
          breeds: fc.array(
            fc.record({
              name: fc.string({ minLength: 1 }),
              imageUrl: fc.webUrl()
            }),
            { minLength: 1 }
          )
        }),
        (data) => {
          // Simular respuesta de API
          const mockResponse = {
            message: data.breeds.reduce((acc, breed) => {
              acc[breed.name] = [];
              return acc;
            }, {})
          };

          // Renderizar
          const html = renderDogs(mockResponse, data.breeds);

          // Verificar que cada raza aparece
          data.breeds.forEach(breed => {
            expect(html).toContain(breed.name);
            expect(html).toContain(breed.imageUrl);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

## Property 3: Form Validation on Create

**Descripción**: Para cualquier intento de crear post con título o contenido vacío/whitespace, debe rechazarse.

**Implementación con fast-check**:

```javascript
describe('Property 3: Form Validation on Create', () => {
  it('should reject posts with empty or whitespace-only fields', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.oneof(
            fc.constant(''),
            fc.string({ maxLength: 100 }).filter(s => s.trim() === '')
          ),
          fc.oneof(
            fc.constant(''),
            fc.string({ maxLength: 100 }).filter(s => s.trim() === '')
          )
        ),
        ([title, body]) => {
          const validation = validatePost(title, body);
          
          // Debe ser inválido
          expect(validation.isValid).toBe(false);
          
          // Debe tener errores
          expect(Object.keys(validation.errors).length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should accept posts with valid title and body', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          fc.string({ minLength: 1 }).filter(s => s.trim().length > 0)
        ),
        ([title, body]) => {
          const validation = validatePost(title, body);
          
          // Debe ser válido
          expect(validation.isValid).toBe(true);
          
          // No debe tener errores
          expect(Object.keys(validation.errors).length).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

## Property 5: Post Creation Round-Trip

**Descripción**: Para cualquier post válido creado, debe aparecer en la lista con datos idénticos.

**Implementación con fast-check**:

```javascript
describe('Property 5: Post Creation Round-Trip', () => {
  it('should create post and retrieve it with identical data', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 200 }),
          body: fc.string({ minLength: 1, maxLength: 5000 })
        }),
        async (postData) => {
          // Crear post
          const createdPost = await createPost(postData.title, postData.body);
          
          // Verificar que se creó
          expect(createdPost).toBeDefined();
          expect(createdPost.id).toBeDefined();
          
          // Obtener post
          const retrievedPost = await getPost(createdPost.id);
          
          // Verificar que los datos son idénticos
          expect(retrievedPost.title).toBe(postData.title);
          expect(retrievedPost.body).toBe(postData.body);
        }
      ),
      { numRuns: 50 } // Menos iteraciones por ser async
    );
  });
});
```

## Property 7: Post Deletion Idempotence

**Descripción**: Después de eliminar un post, el conteo debe disminuir exactamente en 1.

**Implementación con fast-check**:

```javascript
describe('Property 7: Post Deletion Idempotence', () => {
  it('should decrease post count by exactly 1 after deletion', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            title: fc.string({ minLength: 1 }),
            body: fc.string({ minLength: 1 })
          }),
          { minLength: 1, maxLength: 10 }
        ),
        async (postsData) => {
          // Crear posts
          const posts = [];
          for (const postData of postsData) {
            const post = await createPost(postData.title, postData.body);
            posts.push(post);
          }
          
          const initialCount = posts.length;
          
          // Eliminar primer post
          const postToDelete = posts[0];
          await deletePost(postToDelete.id);
          
          // Obtener lista actualizada
          const updatedPosts = await getPosts();
          
          // Verificar que el conteo disminuyó en 1
          expect(updatedPosts.length).toBe(initialCount - 1);
          
          // Verificar que el post eliminado no está en la lista
          expect(updatedPosts.find(p => p.id === postToDelete.id)).toBeUndefined();
        }
      ),
      { numRuns: 20 }
    );
  });
});
```

## Property 9-11: Responsive Layout

**Descripción**: Para diferentes tamaños de viewport, debe renderizarse el número correcto de columnas.

**Implementación con fast-check**:

```javascript
describe('Property 9-11: Responsive Layout', () => {
  it('should render correct number of columns for mobile viewport', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }),
        (width) => {
          // Simular viewport
          setViewportWidth(width);
          
          // Renderizar grid
          const gridElement = document.querySelector('.grid');
          const classes = gridElement.className;
          
          // Debe tener grid-cols-1
          expect(classes).toContain('grid-cols-1');
          
          // No debe tener md:grid-cols-2 o lg:grid-cols-3
          expect(classes).not.toContain('md:grid-cols-2');
          expect(classes).not.toContain('lg:grid-cols-3');
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should render correct number of columns for tablet viewport', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 768, max: 1023 }),
        (width) => {
          setViewportWidth(width);
          
          const gridElement = document.querySelector('.grid');
          const classes = gridElement.className;
          
          // Debe tener md:grid-cols-2
          expect(classes).toContain('md:grid-cols-2');
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should render correct number of columns for desktop viewport', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1024, max: 2560 }),
        (width) => {
          setViewportWidth(width);
          
          const gridElement = document.querySelector('.grid');
          const classes = gridElement.className;
          
          // Debe tener lg:grid-cols-3
          expect(classes).toContain('lg:grid-cols-3');
        }
      ),
      { numRuns: 50 }
    );
  });
});
```

## Property 13: Error Message Clearing

**Descripción**: Cuando se corrige un campo con error, el mensaje debe desaparecer.

**Implementación con fast-check**:

```javascript
describe('Property 13: Error Message Clearing', () => {
  it('should clear error messages when field is corrected', () => {
    fc.assert(
      fc.property(
        fc.record({
          validTitle: fc.string({ minLength: 1, maxLength: 200 }),
          validBody: fc.string({ minLength: 1, maxLength: 5000 })
        }),
        (data) => {
          // Mostrar error
          const errors = {
            title: 'El título es requerido',
            body: 'El contenido es requerido'
          };
          showValidationErrors(errors);
          
          // Verificar que los errores se muestran
          expect(document.getElementById('titleError').textContent).toBe(errors.title);
          expect(document.getElementById('bodyError').textContent).toBe(errors.body);
          
          // Corregir campos
          document.getElementById('postTitle').value = data.validTitle;
          document.getElementById('postBody').value = data.validBody;
          
          // Validar
          const validation = validatePost(data.validTitle, data.validBody);
          
          if (validation.isValid) {
            clearValidationErrors();
          }
          
          // Verificar que los errores se limpian
          expect(document.getElementById('titleError').textContent).toBe('');
          expect(document.getElementById('bodyError').textContent).toBe('');
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

## Property 8: Error Handling Preservation

**Descripción**: Cuando falla una solicitud, el estado de la UI debe preservarse.

**Implementación con fast-check**:

```javascript
describe('Property 8: Error Handling Preservation', () => {
  it('should preserve UI state when API request fails', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            title: fc.string({ minLength: 1 }),
            body: fc.string({ minLength: 1 })
          }),
          { minLength: 1, maxLength: 5 }
        ),
        async (postsData) => {
          // Renderizar posts iniciales
          const initialHtml = postsData.map(p => renderPostCard(p)).join('');
          document.getElementById('postsContainer').innerHTML = initialHtml;
          
          const initialState = document.getElementById('postsContainer').innerHTML;
          
          // Simular falla de API
          mockApiFailure();
          
          try {
            await loadPosts();
          } catch (error) {
            // Error esperado
          }
          
          // Verificar que el estado se preservó
          expect(document.getElementById('postsContainer').innerHTML).toBe(initialState);
          
          // Verificar que se muestra mensaje de error
          expect(document.getElementById('error-container').textContent).toContain('Error');
        }
      ),
      { numRuns: 20 }
    );
  });
});
```

## Property 12: Navigation State Switching

**Descripción**: Al hacer clic en navegación, la sección debe cambiar sin recarga.

**Implementación con fast-check**:

```javascript
describe('Property 12: Navigation State Switching', () => {
  it('should switch sections without page reload', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('dogs'),
          fc.constant('posts')
        ),
        (section) => {
          // Obtener estado inicial
          const initialUrl = window.location.href;
          
          // Hacer clic en navegación
          if (section === 'dogs') {
            document.getElementById('navDogs').click();
          } else {
            document.getElementById('navPosts').click();
          }
          
          // Verificar que no hubo recarga
          expect(window.location.href).toBe(initialUrl);
          
          // Verificar que la sección correcta es visible
          if (section === 'dogs') {
            expect(document.getElementById('dogsSection').classList.contains('hidden')).toBe(false);
            expect(document.getElementById('postsSection').classList.contains('hidden')).toBe(true);
            expect(document.getElementById('navDogs').classList.contains('active')).toBe(true);
          } else {
            expect(document.getElementById('postsSection').classList.contains('hidden')).toBe(false);
            expect(document.getElementById('dogsSection').classList.contains('hidden')).toBe(true);
            expect(document.getElementById('navPosts').classList.contains('active')).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

## Configuración de fast-check

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  collectCoverageFrom: [
    'js/**/*.js',
    '!js/lib/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

// tests/setup.js
import '@testing-library/jest-dom';
import fc from 'fast-check';

// Configurar fast-check globalmente
fc.configureGlobal({
  numRuns: 100,
  verbose: true
});
```

## Ejecución de Tests

```bash
# Instalar dependencias
npm install --save-dev jest @testing-library/jest-dom fast-check

# Ejecutar todos los tests
npm test

# Ejecutar solo property tests
npm test -- --testPathPattern=properties

# Ejecutar con cobertura
npm test -- --coverage

# Ejecutar en modo watch
npm test -- --watch
```

## Notas Importantes

1. **Generadores**: Usar generadores apropiados para cada tipo de dato
2. **Iteraciones**: Mínimo 100 iteraciones para propiedades
3. **Async**: Usar `async/await` para tests asincronos
4. **Mocking**: Mockear APIs externas para tests determinísticos
5. **Shrinking**: fast-check automáticamente reduce ejemplos fallidos
6. **Reproducibilidad**: Usar seeds para reproducir fallos
