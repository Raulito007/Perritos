# Task 3.5: Agregar botón "Cargar posts" y manejador de eventos

## Status: ✅ COMPLETED

## Implementation Summary

The "Load posts" button and its event handler have been successfully implemented. The button is displayed in the posts section header and, when clicked, triggers the function to fetch posts from the JSONPlaceholder API, renders them in a responsive grid using the post card component, shows a loading spinner while fetching, and handles errors appropriately.

## Component Details

### Location
- HTML: `index.html` (line with `id="loadPostsBtn"`)
- Event Handler: `js/events.js` (function `loadPosts()`)
- Event Listener Setup: `js/main.js` (line: `$('#loadPostsBtn').on('click', loadPosts);`)
- API Call: `js/api.js` (function `getPosts()`)
- UI Rendering: `js/ui.js` (function `renderPostsGrid()`)

### HTML Structure
```html
<section id="postsSection" class="section-content hidden">
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
    <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Posts se cargarán aquí -->
    </div>
</section>
```

### Event Handler Implementation
```javascript
function loadPosts() {
    clearError();
    showSpinner('Cargando posts...');
    
    // Store the operation for retry
    lastFailedOperation = loadPosts;
    
    getPosts()
        .done(function(data) {
            hideSpinner();
            const html = renderPostsGrid(data);
            $('#postsContainer').html(html);
            lastFailedOperation = null;
        })
        .fail(function(xhr, status, error) {
            hideSpinner();
            const errorInfo = parseAjaxError(xhr, status, error);
            showError(errorInfo.message, true);
        });
}
```

### Event Listener Setup
```javascript
// Posts
$('#loadPostsBtn').on('click', loadPosts);
```

## Acceptance Criteria Met

### ✅ Requirement 2: Cargar y Mostrar Posts - Criteria 1
**WHEN el usuario hace clic en el botón "Cargar posts", THE Sistema SHALL conectarse a la API_Posts y obtener todos los posts disponibles**

- ✅ Button with id="loadPostsBtn" is present in the HTML
- ✅ Button is wired to loadPosts() function via jQuery event listener
- ✅ loadPosts() calls getPosts() API function
- ✅ getPosts() makes AJAX request to JSONPlaceholder API endpoint `/posts`

### ✅ Requirement 2: Cargar y Mostrar Posts - Criteria 4
**WHEN el usuario visualiza los posts, THE Sistema SHALL mostrar botones de edición y eliminación en cada tarjeta**

- ✅ renderPostsGrid() function renders post cards with edit and delete buttons
- ✅ Each post card has class `editPostBtn` and `deletePostBtn`
- ✅ Buttons are visible and functional

### ✅ Requirement 9: Navegación y Estructura de Página - Criteria 1-5
**THE Sistema SHALL show header, navigation, main content area, and footer**

- ✅ Header with application title is present
- ✅ Navigation buttons for "Razas de Perros" and "Posts" are present
- ✅ Main content area with posts section is present
- ✅ Posts section is hidden by default and shown when "Posts" navigation button is clicked
- ✅ Footer with credits is present

## Functional Flow

### 1. Button Display
- The "Cargar Posts" button is displayed in the posts section header
- Button is styled with Tailwind CSS classes:
  - Background: `bg-blue-600` (Primary color)
  - Hover: `hover:bg-blue-700` (Darker blue)
  - Text: `text-white` (White text)
  - Padding: `px-6 py-2` (Horizontal and vertical padding)
  - Border radius: `rounded-lg` (Rounded corners)
  - Font: `font-semibold` (Bold text)
  - Transition: `transition` (Smooth animation)

### 2. Button Click Handler
When the user clicks the "Cargar Posts" button:
1. Clear any previous error messages
2. Show loading spinner with text "Cargando posts..."
3. Store the operation for retry capability
4. Call getPosts() API function

### 3. API Call
The getPosts() function:
1. Makes AJAX GET request to `https://jsonplaceholder.typicode.com/posts`
2. Sets timeout to API_CONFIG.TIMEOUT (default 5000ms)
3. Returns jQuery Deferred promise

### 4. Success Handler
On successful API response:
1. Hide loading spinner
2. Render posts using renderPostsGrid() function
3. Display posts in responsive grid container
4. Clear retry operation

### 5. Error Handler
On API error:
1. Hide loading spinner
2. Parse error information using parseAjaxError()
3. Display user-friendly error message
4. Show retry button if operation is retryable

### 6. Retry Capability
If an error occurs:
1. User can click "Reintentar" button
2. Clear error message
3. Re-execute loadPosts() function

## Design Compliance

### Color Palette
- ✅ Primary (Blue-600): `#2563EB` - Button background
- ✅ Primary hover (Blue-700): `#1D4ED8` - Button hover
- ✅ Text (White): `#FFFFFF` - Button text

### Button Styling
- ✅ Font: `font-semibold` (Bold)
- ✅ Text color: `text-white` (White)
- ✅ Padding: `px-6 py-2` (24px horizontal, 8px vertical)
- ✅ Border radius: `rounded-lg` (8px)
- ✅ Transition: `transition` (Smooth animation)

### Layout
- ✅ Button positioned in header section with title
- ✅ Button aligned to the right of the title using flexbox
- ✅ Responsive on all screen sizes (mobile, tablet, desktop)
- ✅ Wraps on small screens with proper gap spacing

### Responsive Grid
- ✅ Mobile (< 768px): 1 column (`grid-cols-1`)
- ✅ Tablet (768px - 1024px): 2 columns (`md:grid-cols-2`)
- ✅ Desktop (> 1024px): 3 columns (`lg:grid-cols-3`)
- ✅ Proper gap spacing: `gap-6`

## Loading Spinner Integration

### Spinner Display
- ✅ Spinner is shown when loadPosts() is called
- ✅ Spinner text displays "Cargando posts..."
- ✅ Spinner is hidden after data loads or error occurs

### Spinner Styling
- ✅ Fixed positioning for full-screen overlay
- ✅ Semi-transparent dark background
- ✅ Centered content with flexbox
- ✅ Animated spinner element
- ✅ Readable text on all screen sizes

## Error Handling

### Error Types Handled
- ✅ Network errors (no connection)
- ✅ Timeout errors (request takes too long)
- ✅ Server errors (5xx status codes)
- ✅ Client errors (4xx status codes)
- ✅ Parse errors (invalid JSON response)

### Error Messages
- ✅ User-friendly error messages
- ✅ Specific error type identification
- ✅ Retry button for retryable operations
- ✅ Error message clearing on new attempt

## Testing

### Comprehensive Test Suite
Tests in `tests/load-posts-button.test.js` verify:

1. **Button Presence Tests**
   - ✅ Button has correct text "Cargar Posts"
   - ✅ Button has correct id "loadPostsBtn"
   - ✅ Button is clickable and not disabled

2. **Button Styling Tests**
   - ✅ Button has blue background (`bg-blue-600`)
   - ✅ Button has hover effect (`hover:bg-blue-700`)
   - ✅ Button has white text (`text-white`)
   - ✅ Button has bold font (`font-semibold`)
   - ✅ Button has rounded corners (`rounded-lg`)
   - ✅ Button has transition effects (`transition`)

3. **Event Handler Tests**
   - ✅ Button click triggers loadPosts() function
   - ✅ loadPosts() clears error messages
   - ✅ loadPosts() shows loading spinner
   - ✅ loadPosts() displays correct spinner text

4. **API Integration Tests**
   - ✅ loadPosts() calls getPosts() API function
   - ✅ getPosts() makes AJAX request to correct endpoint
   - ✅ Posts are rendered after successful API call
   - ✅ Spinner is hidden after data loads

5. **Error Handling Tests**
   - ✅ Error message is displayed on API failure
   - ✅ Spinner is hidden on API error
   - ✅ Retry button is shown for retryable errors

6. **Grid Rendering Tests**
   - ✅ Posts are rendered in responsive grid
   - ✅ Each post card has edit and delete buttons
   - ✅ Grid has correct responsive classes

7. **Layout Tests**
   - ✅ Button is positioned in header section
   - ✅ Button is aligned to the right of title
   - ✅ Button is responsive on all screen sizes

8. **Data Integrity Tests**
   - ✅ Fresh data is fetched on each button click
   - ✅ Grid is updated with new data on each click

9. **Requirement Compliance Tests**
   - ✅ Requirement 2: Cargar y Mostrar Posts - Criteria 1
   - ✅ Requirement 2: Cargar y Mostrar Posts - Criteria 4
   - ✅ Requirement 9: Navegación y Estructura de Página - Criteria 1-5

### Test Coverage
- ✅ Button presence and styling
- ✅ Event handler functionality
- ✅ API integration
- ✅ Error handling
- ✅ Spinner integration
- ✅ Grid rendering
- ✅ Responsive layout
- ✅ Data integrity
- ✅ Requirement compliance

## Integration

### Usage in Application
- Button is rendered in posts section header
- Event listener is set up in main.js
- loadPosts() function is called when button is clicked
- Posts are fetched from JSONPlaceholder API
- Posts are rendered in responsive grid
- Loading spinner is shown during fetch
- Errors are handled with user-friendly messages

### HTML Structure
```html
<section id="postsSection" class="section-content hidden">
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
    <div id="postsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Posts se cargarán aquí -->
    </div>
</section>
```

## Verification

✅ "Cargar Posts" button is present in the posts section
✅ Button is visible and clickable
✅ Button is styled with Tailwind CSS
✅ Button uses design color palette (blue)
✅ Button doesn't break responsive layout
✅ Button is positioned in header section
✅ Event listener is properly wired
✅ loadPosts() function is called on button click
✅ getPosts() API function is called
✅ Posts are fetched from JSONPlaceholder API
✅ Posts are rendered in responsive grid
✅ Loading spinner is shown during fetch
✅ Loading spinner is hidden after fetch
✅ Error messages are displayed on failure
✅ Retry button is shown for retryable errors
✅ Comprehensive test suite is in place
✅ All acceptance criteria are met
✅ Design specifications are followed

## Files Modified

1. **index.html**
   - Posts section with "Cargar Posts" button (already present)
   - Posts container with responsive grid layout (already present)

2. **js/main.js**
   - Event listener setup for loadPostsBtn (already present)

3. **js/events.js**
   - loadPosts() function (already present)

4. **js/api.js**
   - getPosts() function (already present)

5. **js/ui.js**
   - renderPostsGrid() function (already present)
   - showSpinner() function (already present)
   - hideSpinner() function (already present)

6. **tests/load-posts-button.test.js** (NEW)
   - Comprehensive test suite for task 3.5

7. **test-runner-load-posts.html** (NEW)
   - HTML test runner for load posts button tests

## Files Used

1. **index.html**
   - Posts section with button and container

2. **js/config.js**
   - API configuration (POSTS_API, TIMEOUT)

3. **js/api.js**
   - getPosts() function for API calls

4. **js/ui.js**
   - renderPostsGrid() function for rendering posts
   - showSpinner() and hideSpinner() functions

5. **js/events.js**
   - loadPosts() function for event handling

6. **js/main.js**
   - Event listener setup

## Next Steps

This task is a prerequisite for:
- Phase 4: Validación de Formularios
- Phase 5: Funcionalidad CRUD - Create
- Phase 7: Funcionalidad CRUD - Update
- Phase 8: Funcionalidad CRUD - Delete

The "Cargar Posts" button is now fully functional and ready for the next phases of development.

## Summary

Task 3.5 has been successfully completed. The "Cargar Posts" button is now displayed in the posts section header and is fully functional. When clicked, it fetches posts from the JSONPlaceholder API, renders them in a responsive grid using the post card component, shows a loading spinner while fetching, and handles errors appropriately. The implementation follows all design specifications and meets all acceptance criteria. A comprehensive test suite has been created to verify the implementation.
