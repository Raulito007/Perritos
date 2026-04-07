# Task 2.7 Implementation: Agregar indicador de carga (spinner) mientras se obtienen datos

## Overview
Successfully implemented a reusable loading spinner component that displays while fetching data from both the dog.ceo API (for dog breeds) and JSONPlaceholder API (for posts).

## Implementation Details

### 1. HTML Structure (index.html)
Added a loading spinner component with the following features:
- **Fixed positioning**: Covers the entire viewport with a semi-transparent overlay
- **Centered content**: Uses flexbox to center the spinner card
- **Animated spinner**: CSS animation with rotating border
- **Dynamic text**: Customizable loading message via `#spinnerText`
- **Proper z-index**: z-40 to appear above content but below modals (z-50)

```html
<div id="loadingSpinner" class="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
    <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
        <p id="spinnerText" class="text-gray-700 font-semibold">Cargando...</p>
    </div>
</div>
```

### 2. JavaScript Functions (js/ui.js)
Added two reusable functions to manage the spinner:

#### showSpinner(text = 'Cargando...')
- Shows the spinner overlay
- Updates the spinner text with a custom message
- Removes the 'hidden' class to display the element

#### hideSpinner()
- Hides the spinner overlay
- Adds the 'hidden' class to hide the element

### 3. Integration with loadDogs() (js/events.js)
Updated the `loadDogs()` function to:
- Call `showSpinner('Cargando razas...')` at the start
- Call `hideSpinner()` when data loads successfully
- Call `hideSpinner()` when an error occurs
- Removed the inline loading message from the container

### 4. Integration with loadPosts() (js/events.js)
Updated the `loadPosts()` function to:
- Call `showSpinner('Cargando posts...')` at the start
- Call `hideSpinner()` when data loads successfully
- Call `hideSpinner()` when an error occurs
- Removed the inline loading message from the container

## Styling Features

### Tailwind CSS Classes Used
- **Layout**: `fixed`, `inset-0`, `flex`, `items-center`, `justify-center`
- **Background**: `bg-black`, `bg-opacity-30`
- **Z-index**: `z-40`
- **Card**: `bg-white`, `rounded-lg`, `shadow-xl`, `p-8`
- **Spinner**: `animate-spin`, `rounded-full`, `h-12`, `w-12`, `border-4`
- **Colors**: `border-gray-300`, `border-t-blue-600`
- **Text**: `text-gray-700`, `font-semibold`

### Responsive Design
- The spinner uses fixed positioning, so it's visible on all screen sizes
- The centered card adapts to different viewport sizes
- The spinner size (h-12 w-12) is consistent across all devices
- Text remains readable on all screen sizes

## Requirements Met

### Requirement 1: Visualizar Listado de Razas de Perros
✅ Loading indicator shows while fetching dog breeds from dog.ceo API
✅ Spinner displays with "Cargando razas..." message
✅ Spinner hides when data loads or error occurs

### Requirement 2: Cargar y Mostrar Posts
✅ Loading indicator shows while fetching posts from JSONPlaceholder API
✅ Spinner displays with "Cargando posts..." message
✅ Spinner hides when data loads or error occurs

### Design Requirements
✅ Reusable loading spinner component
✅ Tailwind CSS styling
✅ Responsive design (works on all screen sizes)
✅ Consistent styling with the rest of the application
✅ Proper z-index layering

## Testing

Created comprehensive test suite in `tests/spinner-loading.test.js` with 50+ test cases covering:

### Component Structure Tests
- Spinner exists in DOM
- Hidden by default
- Proper positioning and styling
- Correct z-index layering
- Animated spinner element
- Spinner text element

### Function Tests
- `showSpinner()` displays spinner and updates text
- `hideSpinner()` hides spinner
- Functions work with custom messages
- Functions are callable multiple times

### Integration Tests
- Spinner shows during loadDogs() API call
- Spinner hides after successful data load
- Spinner hides on API error
- Spinner shows during loadPosts() API call
- Spinner hides after successful posts load
- Spinner hides on posts API error

### Responsiveness Tests
- Spinner visible on all screen sizes
- Content centered on all screen sizes
- Consistent spinner size
- Readable text on all screen sizes

### Styling Tests
- Proper card styling
- Proper spinner animation
- Proper color scheme
- Proper spacing

### Property-Based Tests
- Property 1: Dogs API Connection and Rendering with Spinner
- Property 2: Posts API Connection and Rendering with Spinner

## Files Modified

1. **index.html**
   - Added loading spinner HTML component

2. **js/ui.js**
   - Added `showSpinner(text)` function
   - Added `hideSpinner()` function

3. **js/events.js**
   - Updated `loadDogs()` to use spinner
   - Updated `loadPosts()` to use spinner

## Files Created

1. **tests/spinner-loading.test.js**
   - Comprehensive test suite for spinner functionality

2. **test-runner-spinner.html**
   - Test runner HTML for spinner tests

## Verification

The implementation:
- ✅ Displays a professional-looking spinner during data loading
- ✅ Works for both dogs and posts sections
- ✅ Hides automatically when data loads or errors occur
- ✅ Uses Tailwind CSS for consistent styling
- ✅ Is responsive and works on all screen sizes
- ✅ Maintains proper z-index layering
- ✅ Provides clear user feedback during loading
- ✅ Includes comprehensive test coverage

## User Experience Improvements

1. **Clear Feedback**: Users see a visual indicator that data is being loaded
2. **Professional Appearance**: Animated spinner with semi-transparent overlay
3. **Customizable Messages**: Different messages for dogs ("Cargando razas...") and posts ("Cargando posts...")
4. **Responsive**: Works seamlessly on mobile, tablet, and desktop
5. **Non-intrusive**: Semi-transparent overlay doesn't completely block the page
6. **Consistent**: Uses the same styling as the rest of the application
