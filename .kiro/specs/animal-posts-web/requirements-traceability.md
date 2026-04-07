# Matriz de Trazabilidad de Requisitos

Este documento mapea cada requisito a sus propiedades de corrección, tests y tareas de implementación.

## Requisito 1: Visualizar Listado de Razas de Perros

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 1.1 Conectar a API_Dog | Property 1 | Property-based | 2.1 |
| 1.2 Mostrar razas con imágenes | Property 1 | Property-based | 2.2, 2.3, 2.4 |
| 1.3 Mostrar error si API falla | Property 8 | Unit test | 2.6 |
| 1.4 Actualizar al hacer clic | Property 1 | Unit test | 2.5 |
| 1.5 Grid responsivo | Property 9-11 | Property-based | 2.4, 10.1-10.6 |

## Requisito 2: Cargar y Mostrar Posts

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 2.1 Conectar a API_Posts | Property 2 | Property-based | 3.1 |
| 2.2 Mostrar posts en tarjetas | Property 2 | Property-based | 3.2, 3.3 |
| 2.3 Mostrar error si API falla | Property 8 | Unit test | 3.6 |
| 2.4 Botones de edición/eliminación | Property 2 | Unit test | 3.4 |
| 2.5 Grid responsivo | Property 9-11 | Property-based | 3.3, 10.1-10.6 |

## Requisito 3: Crear Nuevo Post

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 3.1 Mostrar formulario | - | Unit test | 5.1, 5.2 |
| 3.2 Validar campos | Property 3 | Property-based | 4.1, 4.2, 4.5 |
| 3.3 Mostrar error de validación | Property 3 | Unit test | 4.3 |
| 3.4 Enviar POST a API | Property 5 | Unit test | 5.3 |
| 3.5 Actualizar lista y limpiar | Property 5 | Unit test | 5.4, 5.5, 5.6 |
| 3.6 Mostrar error si API falla | Property 8 | Unit test | 5.6 |

## Requisito 4: Editar Post Existente

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 4.1 Obtener datos del post | - | Unit test | 7.2, 7.3 |
| 4.2 Pre-rellenar formulario | - | Unit test | 7.3 |
| 4.3 Validar campos | Property 4 | Property-based | 4.1, 4.2, 4.5 |
| 4.4 Mostrar error de validación | Property 4 | Unit test | 4.3 |
| 4.5 Enviar PUT a API | Property 6 | Unit test | 7.4 |
| 4.6 Actualizar tarjeta | Property 6 | Unit test | 7.5, 7.6 |
| 4.7 Mostrar error si API falla | Property 8 | Unit test | 7.6 |

## Requisito 5: Eliminar Post

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 5.1 Mostrar confirmación | - | Unit test | 8.1 |
| 5.2 Enviar DELETE a API | Property 7 | Unit test | 8.2, 8.3 |
| 5.3 Remover tarjeta y confirmar | Property 7 | Unit test | 8.4, 8.5 |
| 5.4 Mostrar error si API falla | Property 8 | Unit test | 8.6 |
| 5.5 Mantener post si falla | Property 8 | Unit test | 8.6 |

## Requisito 6: Interfaz Responsiva con Tailwind CSS

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 6.1 Usar Tailwind CSS | - | Manual | 1.2 |
| 6.2 Layout móvil (1 columna) | Property 9 | Property-based | 10.1 |
| 6.3 Layout tablet (2 columnas) | Property 10 | Property-based | 10.2 |
| 6.4 Layout desktop (3+ columnas) | Property 11 | Property-based | 10.3 |
| 6.5 Accesibilidad y legibilidad | - | Manual | 10.4, 10.5 |
| 6.6 Colores y tipografía consistentes | - | Manual | 10.6 |

## Requisito 7: Manejo de Errores de Conectividad

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 7.1 Error específico dog.ceo | Property 8 | Unit test | 2.6, 11.1 |
| 7.2 Error específico JSONPlaceholder | Property 8 | Unit test | 3.6, 11.1 |
| 7.3 Error de validación | Property 3, 4 | Unit test | 4.3, 11.6 |
| 7.4 Error de red | Property 8 | Unit test | 11.2, 11.4 |
| 7.5 Botón reintentar | Property 14 | Unit test | 11.2 |

## Requisito 8: Persistencia de Datos en Sesión

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 8.1 Actualizar vista al crear | Property 5 | Unit test | 5.4, 5.5 |
| 8.2 Actualizar tarjeta al editar | Property 6 | Unit test | 7.5, 7.6 |
| 8.3 Remover tarjeta al eliminar | Property 7 | Unit test | 8.4, 8.5 |
| 8.4 Obtener datos frescos al recargar | - | Unit test | 2.1, 3.1 |

## Requisito 9: Navegación y Estructura de Página

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 9.1 Mostrar encabezado | - | Unit test | 1.1 |
| 9.2 Botones de navegación | - | Unit test | 1.1, 9.2 |
| 9.3 Cambiar sección sin recarga | Property 12 | Property-based | 9.1, 9.2, 9.3 |
| 9.4 Área de contenido dinámico | - | Unit test | 1.1 |
| 9.5 Pie de página | - | Unit test | 1.1 |

## Requisito 10: Validación de Formularios

| Criterio | Propiedad | Test | Tarea |
|----------|-----------|------|-------|
| 10.1 Error si título vacío (crear) | Property 3 | Property-based | 4.1, 4.3 |
| 10.2 Error si contenido vacío (crear) | Property 3 | Property-based | 4.2, 4.3 |
| 10.3 Error si título vacío (editar) | Property 4 | Property-based | 4.1, 4.3 |
| 10.4 Error si contenido vacío (editar) | Property 4 | Property-based | 4.2, 4.3 |
| 10.5 Limpiar errores al corregir | Property 13 | Property-based | 4.4 |

## Matriz de Cobertura

### Por Requisito

| Requisito | Propiedades | Tests | Tareas |
|-----------|-------------|-------|--------|
| 1 | 3 | 5 | 7 |
| 2 | 3 | 5 | 7 |
| 3 | 3 | 6 | 6 |
| 4 | 3 | 7 | 6 |
| 5 | 3 | 5 | 6 |
| 6 | 3 | 5 | 6 |
| 7 | 2 | 5 | 6 |
| 8 | 3 | 4 | 4 |
| 9 | 1 | 5 | 5 |
| 10 | 2 | 5 | 5 |
| **Total** | **14** | **52** | **58** |

### Por Propiedad

| Propiedad | Requisitos | Criterios | Tests |
|-----------|-----------|-----------|-------|
| 1 | 1 | 4 | 2 |
| 2 | 2 | 4 | 2 |
| 3 | 3, 10 | 6 | 2 |
| 4 | 4, 10 | 6 | 2 |
| 5 | 3, 8 | 5 | 2 |
| 6 | 4, 8 | 5 | 2 |
| 7 | 5, 8 | 5 | 2 |
| 8 | 1, 2, 3, 4, 5, 7 | 12 | 6 |
| 9 | 1, 6 | 4 | 2 |
| 10 | 2, 6 | 4 | 2 |
| 11 | 6 | 2 | 2 |
| 12 | 9 | 2 | 2 |
| 13 | 10 | 2 | 2 |
| 14 | 7 | 2 | 2 |

## Análisis de Cobertura

### Requisitos Bien Cubiertos (3+ propiedades)
- ✅ Requisito 1: 3 propiedades
- ✅ Requisito 2: 3 propiedades
- ✅ Requisito 3: 3 propiedades
- ✅ Requisito 4: 3 propiedades
- ✅ Requisito 5: 3 propiedades
- ✅ Requisito 6: 3 propiedades
- ✅ Requisito 8: 3 propiedades

### Requisitos Moderadamente Cubiertos (2 propiedades)
- ⚠️ Requisito 7: 2 propiedades
- ⚠️ Requisito 10: 2 propiedades

### Requisitos Cubiertos por Propiedades Transversales (1 propiedad)
- ⚠️ Requisito 9: 1 propiedad (Property 12)

## Propiedades Transversales

Algunas propiedades cubren múltiples requisitos:

- **Property 8 (Error Handling)**: Cubre requisitos 1, 2, 3, 4, 5, 7
- **Property 9-11 (Responsive)**: Cubre requisitos 1, 2, 6
- **Property 3-4 (Validation)**: Cubre requisitos 3, 4, 10

## Recomendaciones

1. **Prioridad Alta**: Implementar propiedades 1-8 primero (cubren requisitos críticos)
2. **Prioridad Media**: Propiedades 9-12 (responsividad y navegación)
3. **Prioridad Baja**: Propiedades 13-14 (UX refinement)

## Checklist de Implementación

### Fase 1: Setup
- [ ] Crear estructura HTML base
- [ ] Configurar Tailwind CSS
- [ ] Importar jQuery

### Fase 2: Razas (Requisito 1)
- [ ] Implementar API dog.ceo
- [ ] Crear componente de tarjeta
- [ ] Implementar grid responsivo
- [ ] Manejo de errores
- [ ] Tests unitarios
- [ ] Property tests (Property 1, 9-11)

### Fase 3: Posts - Lectura (Requisito 2)
- [ ] Implementar API JSONPlaceholder
- [ ] Crear componente de tarjeta
- [ ] Implementar grid responsivo
- [ ] Manejo de errores
- [ ] Tests unitarios
- [ ] Property tests (Property 2, 9-11)

### Fase 4: Validación (Requisito 10)
- [ ] Crear validadores
- [ ] Mostrar errores
- [ ] Limpiar errores
- [ ] Tests unitarios
- [ ] Property tests (Property 3, 4, 13)

### Fase 5: CRUD (Requisitos 3, 4, 5)
- [ ] Crear post
- [ ] Editar post
- [ ] Eliminar post
- [ ] Manejo de errores
- [ ] Tests unitarios
- [ ] Property tests (Property 5, 6, 7, 8)

### Fase 6: Navegación (Requisito 9)
- [ ] Implementar cambio de secciones
- [ ] Indicador de sección activa
- [ ] Tests unitarios
- [ ] Property tests (Property 12)

### Fase 7: Testing Completo
- [ ] Unit tests para todos los componentes
- [ ] Property tests para todas las propiedades
- [ ] E2E tests para flujos críticos
- [ ] Cobertura mínima 80%

## Trazabilidad Inversa

### Tarea 2.1 → Requisitos
- Requisito 1.1: Conectar a API_Dog
- Requisito 1.4: Actualizar al hacer clic

### Tarea 5.3 → Requisitos
- Requisito 3.4: Enviar POST a API
- Requisito 3.5: Actualizar lista

### Tarea 12.1 → Requisitos
- Requisito 10.1: Error si título vacío
- Requisito 3.2: Validar campos

## Notas

1. Cada propiedad debe tener al menos 100 iteraciones en tests
2. Cada requisito debe tener cobertura de tests unitarios y property-based
3. La trazabilidad debe mantenerse actualizada durante la implementación
4. Los tests deben ejecutarse antes de cada commit
