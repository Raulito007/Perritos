# Task 3.1: Implementar función para obtener todos los posts desde JSONPlaceholder

## Status: ✅ COMPLETED

## Implementation Summary

The `getPosts()` function has been successfully implemented in `js/api.js` to fetch all posts from the JSONPlaceholder API.

## Function Details

### Location
- File: `js/api.js`
- Lines: 54-61

### Implementation
```javascript
function getPosts() {
    return $.ajax({
        url: `${API_CONFIG.POSTS_API}/posts`,
        method: 'GET',
        dataType: 'json',
        timeout: API_CONFIG.TIMEOUT
    });
}
```

### Requirements Met

✅ **Requirement 1: GET Request to JSONPlaceholder /posts endpoint**
- Uses `$.ajax()` with `method: 'GET'`
- URL: `https://jsonplaceholder.typicode.com/posts`
- Configured via `API_CONFIG.POSTS_API` from `js/config.js`

✅ **Requirement 2: Returns posts data on success**
- Returns a jQuery promise (AJAX object)
- Success data can be handled with `.done()` callback
- Data is an array of post objects with id, title, body, userId

✅ **Requirement 3: Handles errors appropriately**
- Errors can be handled with `.fail()` callback
- Uses jQuery's built-in error handling mechanism
- `parseAjaxError()` helper function available for error parsing

✅ **Requirement 4: Follows existing API integration pattern**
- Same structure as `getDogBreeds()` and `getDogImage()`
- Uses `API_CONFIG` for configuration
- Uses consistent timeout setting
- Returns jQuery promise for chainable error handling

✅ **Requirement 5: Integrates with existing api.js structure**
- Properly placed in `js/api.js`
- Follows naming convention of other API functions
- Maintains code consistency and style

## Usage

The function is used in `js/events.js` in the `loadPosts()` function:

```javascript
function loadPosts() {
    clearError();
    showSpinner('Cargando posts...');
    
    getPosts()
        .done(function(data) {
            hideSpinner();
            let html = '';
            data.forEach(post => {
                html += renderPostCard(post);
            });
            $('#postsContainer').html(html || '<p class="col-span-full text-center text-gray-500">No hay posts.</p>');
        })
        .fail(function() {
            hideSpinner();
            showError('No se pudo conectar con el servidor de posts. Verifica tu conexión a internet.');
        });
}
```

## Tests Added

Unit tests have been added to `tests/api.test.js` to verify the function:

1. ✅ Makes AJAX call to correct endpoint
2. ✅ Returns a jQuery promise
3. ✅ Uses correct HTTP method (GET)
4. ✅ Sets correct dataType (json)
5. ✅ Sets timeout from config

## API Response Format

The JSONPlaceholder API returns an array of post objects:

```javascript
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident...",
    "body": "quia et suscipit..."
  },
  // ... more posts
]
```

## Configuration

The function uses the following configuration from `js/config.js`:

```javascript
const API_CONFIG = {
    DOG_API: 'https://dog.ceo/api',
    POSTS_API: 'https://jsonplaceholder.typicode.com',
    TIMEOUT: 5000
};
```

## Error Handling

The function supports error handling through jQuery's promise interface:

- **Timeout**: Handled by `timeout: API_CONFIG.TIMEOUT` (5000ms)
- **Network errors**: Caught by `.fail()` callback
- **Parse errors**: Handled by jQuery's JSON parsing
- **Server errors**: Passed to `.fail()` callback

## Verification

✅ Function is implemented correctly
✅ Function is being used in the application
✅ Unit tests are in place
✅ Error handling is implemented
✅ Follows project conventions and patterns
✅ Integrates with existing code structure

## Next Steps

This function is a prerequisite for tasks 3.2-3.7 which depend on having posts data:
- 3.2: Create post card component
- 3.3: Implement responsive grid rendering
- 3.4: Add edit/delete buttons
- 3.5: Add "Load posts" button and event handler
- 3.6: Implement error handling
- 3.7: Add loading spinner
