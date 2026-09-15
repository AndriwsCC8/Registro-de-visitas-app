# Descripción completa del frontend

Este proyecto es una aplicación web de gestión de visitas para SeNaSa, construida con React + Vite + TypeScript y estilos con Tailwind CSS v4. La aplicación funciona como una SPA (Single Page Application) donde la navegación principal ocurre dentro de una sola vista y se cambia según el módulo activo.

## 1. Tecnologías utilizadas

- React 19
- React DOM 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- Recharts (utilizado en dashboards y reportes)

## 2. Estructura general del proyecto

La aplicación se organiza principalmente dentro de la carpeta `src`:

- `src/App.tsx`: componente raíz, maneja el estado global de la sesión y la navegación.
- `src/main.tsx`: punto de entrada React.
- `src/index.css`: estilos globales y configuración de Tailwind.
- `src/components/*`: componentes del sistema.
- `src/assets/*`: recursos visuales como logo e imagen de fondo.

## 3. Flujo principal

### Inicio de sesión

La app inicia mostrando el componente `Login` si no hay un usuario autenticado.

Dentro del login:

- El usuario ingresa usuario y contraseña.
- El sistema utiliza un mock de autenticación basado en el nombre de usuario.
- Dependiendo del usuario, se asigna un rol, una sucursal y los permisos correspondientes.

Usuarios demo que existen en sistema:

- `admin` → Administrador
- `supervisor` → Supervisor
- `rec_naco` → Recepcionista, sucursal Naco
- `rec_norte` → Recepcionista, sucursal Norte

La interfaz login además usa:

- `logoSeNaSa.jpg` como logo del sistema.
- `background SeNaSa.jpg` como fondo principal.

### Estado global del usuario

En `App.tsx` se mantiene un estado `user` con esta estructura:

- `name`
- `role`
- `branch`
- `permissions`

Esto controla:

- qué módulos puede ver el usuario
- qué sucursal puede consultar
- qué datos y acciones están disponibles

## 4. Navegación por módulos

La app usa un estado llamado `view` que representa la pantalla activa. Sus valores son:

- `dashboard`
- `visits`
- `visitors`
- `reports`
- `users`
- `config`
- `notifications`
- `recepciones`

### Barra lateral izquierda

El componente `Sidebar.tsx` renderiza la navegación principal y muestra los módulos según permisos.

Incluye:

- Dashboard
- Registro de Visitas
- Gestión de Visitantes
- Recepciones
- Reportería
- Usuarios y Permisos
- Notificaciones
- Configuración

Se visualiza con fondo verde institucional, con texto blanco y un estilo más compacto para mantener orden visual.

## 5. Módulos principales

### Dashboard

El módulo `Dashboard.tsx` muestra un panel ejecutivo con:

- métricas generales
- indicadores de rendimiento
- visitas recientes
- alertas y actividad
- gráficos y resúmenes visuales

Se usa para tener una vista general del estado operativo del sistema.

### Registro de Visitas

El componente `VisitRegistry.tsx` es el módulo más importante para registrar entradas y salidas de visitantes.

Funcionalidades principales:

- crear nueva visita
- buscar visitas
- filtrar por estado
- validar datos obligatorios
- validar carnet duplicado
- mostrar gerencia según la sucursal
- registrar salida de visitantes
- mostrar información de detalle
- maneja equipo ingresado por el visitante (laptops, cámaras, herramientas, etc.)

También puede mostrar campos condicionales:

- gerencia
- motivo de visita
- detalles extras
- equipo y serial para laptops

### Gestión de Visitantes

El módulo `Visitors.tsx` presenta una lista de visitantes recurrentes, con:

- nombre
- cédula
- teléfono
- empresa
- tipo de visitante
- número de visitas
- historial reciente

Además:

- se puede buscar por nombre o cédula
- se puede ver el perfil del visitante
- se puede ver el historial completo de visitas
- se puede bloquear o activar un visitante

### Recepciones

El módulo `Recepciones.tsx` simula la gestión de distintas recepciones por sucursal o provincia.

Incluye:

- listado de recepciones
- filtros por provincia
- tarjetas de cada recepción
- cantidad de visitas hoy
- usuarios asignados
- visitas de la recepción
- modal de creación de nuevo usuario para la recepción

Es una vista de demostración orientada a la operación por sucursal, con un enfoque de gestión local y segmentada.

### Usuarios y Permisos

El componente `UserManagement.tsx` muestra:

- tabla de usuarios
- búsqueda
- roles
- permisos asignados
- estado del usuario
- botón para crear nuevo usuario
- modal de creación de usuario

Este módulo está diseñado para simular una gestión administrativa del personal del sistema.

### Notificaciones

`Notifications.tsx` muestra una lista de alertas y mensajes del sistema, por ejemplo:

- nuevos usuarios creados
- cambios de estado
- acciones de seguridad
- avisos internos

### Configuración

`Configuration.tsx` presenta opciones de configuración del sistema, como:

- alertas
- avisos del sistema
- ajustes de acceso
- preferencias administrativas

### Reportería

`Reports.tsx` sirve como vista de reportes y exportación de información. Tiene un enfoque visual y tabular para estadísticas del sistema.

## 6. Lógica de permisos y accesos

La seguridad de la app está simulada con permisos basados en el `role` y en `permissions` del usuario.

Reglas implementadas:

- Administrador puede acceder a casi todos los módulos.
- Supervisor puede ver módulos de recepción.
- Recepcionista puede acceder a Recepciones y a registros básicos.

Esto se valida en `App.tsx`:

- `canViewRecepciones` se calcula según el rol y el arreglo de permisos.
- Si el usuario no tiene permiso, el módulo no se puede abrir.

## 7. Diseño visual

La interfaz usa una paleta institucional con predominancia de:

- verde SeNaSa (`#00A651`)
- azul oscuro (`#0D1B3E`)
- gris de texto (`#5A7099`)
- fondos claros

Se usan:

- bordes suaves
- cards con redondeo
- modales centrados
- tarjetas de estadísticas
- botones verdes con contraste alto
- tipografía clara y legible

## 8. Estado local y componentes reutilizables

La aplicación se apoya bastante en `useState` para manejar:

- usuario activo
- vista seleccionada
- búsqueda
- filtros
- estado de modal
- datos de formularios
- visitas actuales

También cuenta con componentes internos pequeños, como:

- `Field`
- `SelectField`

Estos ayudan a mantener consistencia en formularios.

## 9. Datos demo

El sistema no tiene backend real. Todo está mockeado en memoria con arrays de datos estáticos.

Esto incluye:

- usuarios
- visitas
- visitantes
- sucursales
- notificaciones
- permisos
- reportes

Es una UI de demostración funcional, no una integración real con base de datos ni autenticación real.

## 10. Consideraciones sobre flujo real del negocio

La app está pensado como un panel de control para la gestión de accesos en instalaciones institucionales. Su flujo principal es:

1. un visitante llega a la recepción
2. se registra la visita
3. se valida identidad y carnet
4. se asigna la persona a quien visita
5. se registra la salida al finalizar
6. la recepción y el sistema pueden ver el historial de visitantes y visitas

## 11. Componentes clave a revisar

Si quieres estudiar el proyecto por capas, los archivos más importantes son:

- `src/App.tsx`
- `src/components/Login.tsx`
- `src/components/Sidebar.tsx`
- `src/components/VisitRegistry.tsx`
- `src/components/Visitors.tsx`
- `src/components/Recepciones.tsx`
- `src/components/UserManagement.tsx`
- `src/components/Dashboard.tsx`

## 12. Resumen breve

Este frontend simula un sistema completo de control de visitas para SeNaSa con:

- login demo
- validación de acceso
- gestión de visitas
- gestión de visitantes
- panel administrativo
- reportes
- control de sucursales y recepciones
- panel operativo y dashboard ejecutivo

Es una aplicación de demostración visual y funcional, pensada para presentar flujo de negocio institucional y mostrar el estado operativo de una organización que recibe visitantes.

## 13. Cómo ejecutarlo

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Luego se puede abrir la app en el navegador con el puerto que indique Vite.

## 14. Observación

Aunque la app tiene un diseño visual y lógica muy completos, en este momento no hay backend ni persistencia real. Todo se maneja con datos locales en memoria.

---

Este documento fue generado para servir como referencia de lectura del frontend actual de la aplicación.
