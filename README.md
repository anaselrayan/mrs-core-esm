<<<<<<< HEAD
# mrs-core-esm
Medical Record System - Front-end
=======
<<<<<<< HEAD
<<<<<<< HEAD
# mrs-core-esm
Medical Record System - Front-end
=======
# MrsCoreEsm
=======
# Hospital Information System (HIS) - Frontend
>>>>>>> 9032cf9 (Init)

A modern, scalable Angular application for managing hospital operations including patient management, appointment scheduling, and administrative tasks.

## 🚀 Features

### Core Features
- **Authentication & Authorization** - Secure login with role-based access control
- **Patient Management** - Patient registration, search, and profile management
- **Appointment Scheduling** - Calendar-based appointment management
- **Dashboard** - Real-time overview of hospital operations
- **Multi-language Support** - Internationalization (i18n) with 5+ languages
- **Theme System** - Dark/light mode with customizable color schemes
- **Responsive Design** - Optimized for desktop and tablet screens

### Technical Features
- **Modular Architecture** - Feature-based modules for scalability
- **State Management** - NgRx for predictable state management
- **Reactive Programming** - Angular Signals for efficient reactivity
- **Type Safety** - Full TypeScript implementation with strict mode
- **Component Library** - Custom UI components built with Tailwind CSS
- **Error Handling** - Global error handling and user notifications
- **Loading States** - Comprehensive loading and progress indicators
- **Route Protection** - Guards for secure navigation

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── guards/             # Route guards
│   │   ├── interceptors/       # HTTP interceptors
│   │   ├── models/             # TypeScript interfaces
│   │   └── services/           # Core services (auth, theme, i18n, etc.)
│   ├── shared/                 # Reusable components and utilities
│   │   ├── components/         # UI components (buttons, cards, modals, etc.)
│   │   ├── pipes/             # Custom pipes
│   │   └── services/          # Shared services
│   ├── features/              # Feature modules
│   │   ├── auth/              # Authentication module
│   │   ├── patients/          # Patient management
│   │   ├── calendar/          # Appointment scheduling
│   │   └── layout/            # Main layout and dashboard
│   └── assets/                # Static assets
├── environments/              # Environment configurations
└── styles.scss               # Global styles with Tailwind CSS
```

### Key Technologies
- **Angular 20** - Latest Angular framework with standalone components
- **TypeScript** - Strict type safety and modern JavaScript features
- **Tailwind CSS** - Utility-first CSS framework for styling
- **NgRx** - State management for complex application state
- **RxJS** - Reactive programming with observables
- **Angular Signals** - New reactive primitives for state management

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- Angular CLI 20+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mrs-core-esm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run build:watch` - Build in watch mode

## 🎨 Theming & Customization

### Theme System
The application includes a comprehensive theming system:

- **Light/Dark Mode** - Toggle between light and dark themes
- **Custom Colors** - Configurable color schemes
- **RTL Support** - Right-to-left language support
- **CSS Variables** - Dynamic theming with CSS custom properties

### Customizing Themes
```typescript
// Create custom theme
this.themeService.createCustomTheme('hospital-blue', {
  displayName: 'Hospital Blue',
  colors: {
    primary: '#1e40af',
    secondary: '#64748b',
    // ... other colors
  }
});
```

## 🌍 Internationalization

### Supported Languages
- English (en) - Default
- Spanish (es)
- French (fr)
- German (de)
- Arabic (ar) - RTL support

### Adding New Languages
1. Add locale to `I18nService.availableLocales`
2. Add translations to `I18nService.translations`
3. Update language selector component

### Using Translations
```typescript
// In component
this.i18nService.translate('auth.login');

// In template
{{ 'auth.login' | translate }}

// With parameters
{{ 'errors.minLength' | translate: {0: 6} }}
```

## 🔐 Authentication & Security

### Features
- JWT-based authentication
- Role-based access control (RBAC)
- Route guards for protected pages
- HTTP interceptors for automatic token handling
- Secure token storage and refresh

### User Roles
- **Admin** - Full system access
- **Doctor** - Patient and appointment management
- **Nurse** - Patient care and basic operations
- **Receptionist** - Appointment scheduling and patient registration

## 📱 Responsive Design

### Breakpoints
- **Mobile** - < 768px
- **Tablet** - 768px - 1024px
- **Desktop** - > 1024px

### Design Principles
- Mobile-first approach
- Touch-friendly interfaces
- Consistent spacing and typography
- Accessible color contrasts

## 🧪 Testing

### Test Structure
- Unit tests for components and services
- Integration tests for feature modules
- E2E tests for critical user flows

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run e2e

# Test coverage
npm run test:coverage
```

## 🚀 Deployment

### Production Build
```bash
npm run build:prod
```

### Environment Configuration
Update `src/environments/environment.prod.ts` with production settings:
- API endpoints
- Feature flags
- Analytics configuration

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:prod
EXPOSE 4200
CMD ["npm", "start"]
```

## 📊 Performance Optimization

### Implemented Optimizations
- Lazy loading for feature modules
- OnPush change detection strategy
- TrackBy functions for ngFor loops
- Image optimization with NgOptimizedImage
- Bundle size optimization
- Tree shaking for unused code

<<<<<<< HEAD
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
>>>>>>> 5d667df (initial commit)
=======
### Monitoring
- Core Web Vitals tracking
- Bundle analyzer integration
- Performance budgets in angular.json

## 🤝 Contributing

### Development Guidelines
1. Follow Angular style guide
2. Use TypeScript strict mode
3. Write unit tests for new features
4. Follow conventional commit messages
5. Update documentation for API changes

### Code Style
- Use Prettier for code formatting
- Follow ESLint rules
- Use meaningful variable names
- Write self-documenting code

## 📚 API Integration

### Backend Requirements
The frontend expects a RESTful API with the following endpoints:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - User profile

#### Patients
- `GET /api/patients` - List patients
- `POST /api/patients` - Create patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient
- `GET /api/patients/search` - Search patients

#### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/calendar` - Calendar data

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript version compatibility
   - Verify Angular CLI version

2. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS class conflicts
   - Verify dark mode implementation

3. **Authentication Issues**
   - Check API endpoint configuration
   - Verify token storage
   - Check CORS settings

### Getting Help
- Check the [Angular documentation](https://angular.io/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)
- Open an issue in the repository

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Tailwind CSS for the utility-first CSS approach
- NgRx team for state management solutions
- Open source community for various libraries and tools

---

**Built with ❤️ for healthcare professionals**
>>>>>>> 9032cf9 (Init)
>>>>>>> 1816820 (Init)
