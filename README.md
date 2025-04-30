# Elite Pets 🐾

## Descripción

Elite Pets es una aplicación web desarrollada con Angular que permite la gestión integral de mascotas. La aplicación ofrece diferentes funcionalidades según el rol del usuario (administrador o viewer) y proporciona una interfaz intuitiva para el manejo de información de mascotas.

## Características Principales 🌟

### Para Usuarios Viewer

- Dashboard personalizado con estadísticas de sus mascotas
- Gestión de mascotas (agregar, editar, eliminar)
- Visualización de las mascotas más recientes
- Acceso a servicios disponibles

### Para Administradores

- Dashboard completo con estadísticas globales
- Gestión de usuarios (crear, modificar roles, eliminar)
- Gestión completa de todas las mascotas
- Visualización de estadísticas detalladas

## Tecnologías Utilizadas 💻

- Angular 17
- TypeScript
- SCSS para estilos
- LocalStorage para persistencia de datos
- Font Awesome para iconos

## Requisitos Previos 📋

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)
- Angular CLI (versión 17)

## Instalación 🔧

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/elite-pets.git
cd elite-pets
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
ng serve
```

4. Abrir el navegador en `http://localhost:4200`

## Estructura del Proyecto 📁

elite-pets/
├── src/
│ ├── app/
│ │ ├── core/ # Servicios, modelos y guards
│ │ ├── pages/ # Componentes de páginas
│ │ ├── shared/ # Componentes compartidos
│ │ └── app.component.\* # Componente raíz
│ ├── assets/ # Recursos estáticos
│ └── styles/ # Estilos globales

## Funcionalidades Implementadas ✅

### Autenticación y Autorización

- Sistema de login y registro
- Manejo de roles (admin/viewer)
- Protección de rutas según rol
- Gestión de sesiones

### Gestión de Mascotas

- CRUD completo de mascotas
- Filtrado por usuario
- Validación de formularios
- Modal de confirmación para eliminación

### Interfaz de Usuario

- Diseño responsive
- Temas consistentes
- Feedback visual de acciones
- Navegación intuitiva

### Dashboard

- Estadísticas en tiempo real
- Visualización de datos según rol
- Acciones rápidas personalizadas
- Sección de mascotas recientes

## Mejoras Recientes 🆕

### v1.1.0

- Corrección en la visualización de estadísticas para usuarios viewer
- Mejora en el diseño del dashboard
- Implementación de manejo de errores en servicios
- Optimización del rendimiento en la carga de datos

### v1.0.0

- Lanzamiento inicial de la aplicación
- Implementación de funcionalidades base
- Sistema de autenticación
- Gestión básica de mascotas

## Despliegue 🚀

Para desplegar la aplicación en producción:

1. Construir la aplicación:

```bash
ng build --configuration production
```

2. Los archivos de distribución se generarán en la carpeta `dist/`

3. Desplegar los archivos en tu servidor web preferido (Apache, Nginx, etc.)

## Desarrollo 👨‍💻

Para contribuir al proyecto:

1. Crear una rama para tu feature:

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Realizar cambios y commits:

```bash
git add .
git commit -m "Descripción del cambio"
```

3. Subir cambios y crear Pull Request:

```bash
git push origin feature/nueva-funcionalidad
```

## Buenas Prácticas Implementadas 📚

- Código limpio y comentado
- Principios SOLID
- Manejo de errores robusto
- Testing unitario
- Diseño responsive
- Arquitectura modular

## Problemas Conocidos 🐛

- El modo offline está en desarrollo
- Algunas animaciones pueden ser lentas en dispositivos antiguos

## Próximas Mejoras 🔜

- Implementación de gráficos estadísticos
- Modo oscuro
- Notificaciones push
- Sincronización con backend
- Exportación de datos

## Licencia 📄

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles

## Autor ✒️

- **[Tu Nombre]** - _Desarrollo Inicial_ - [tu-usuario](https://github.com/tu-usuario)

## Agradecimientos 🎁

- Profesores y mentores
- Comunidad de Angular
