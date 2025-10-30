import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Locale {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export interface Translation {
  [key: string]: string | Translation;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly LOCALE_KEY = 'app_locale';
  private readonly DEFAULT_LOCALE = 'en';
  
  // Available locales
  private readonly availableLocales: Locale[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', direction: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  ];

  // Translation data
  private readonly translations: Record<string, Translation> = {
    en: {
      common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        search: 'Search',
        filter: 'Filter',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Information',
        confirm: 'Confirm',
        yes: 'Yes',
        no: 'No',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        reset: 'Reset',
        clear: 'Clear',
        select: 'Select',
        all: 'All',
        none: 'None',
        required: 'Required',
        optional: 'Optional',
      },
      auth: {
        login: 'Login',
        logout: 'Logout',
        username: 'Username',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        welcomeBack: 'Welcome back',
        loginFailed: 'Login failed',
        invalidCredentials: 'Invalid username or password',
        loggedOut: 'Logged out',
        loggedOutMessage: 'You have been successfully logged out',
      },
      navigation: {
        dashboard: 'Dashboard',
        patients: 'Patients',
        appointments: 'Appointments',
        calendar: 'Calendar',
        settings: 'Settings',
        profile: 'Profile',
        help: 'Help',
      },
      dashboard: {
        title: 'Dashboard',
        welcomeMessage: 'Here\'s what\'s happening at your hospital today',
        totalPatients: 'Total Patients',
        todaysAppointments: 'Today\'s Appointments',
        pendingTasks: 'Pending Tasks',
        monthlyRevenue: 'Revenue (Monthly)',
        recentPatients: 'Recent Patients',
        viewAllPatients: 'View All Patients',
        viewAllAppointments: 'View All Appointments',
      },
      patients: {
        title: 'Patients',
        addNewPatient: 'Add New Patient',
        patientRegistration: 'Patient Registration',
        patientList: 'Patient List',
        firstName: 'First Name',
        lastName: 'Last Name',
        dateOfBirth: 'Date of Birth',
        gender: 'Gender',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        emergencyContact: 'Emergency Contact',
        medicalHistory: 'Medical History',
        allergies: 'Allergies',
        medications: 'Medications',
        active: 'Active',
        inactive: 'Inactive',
        followUp: 'Follow-up',
      },
      appointments: {
        title: 'Appointments',
        scheduleAppointment: 'Schedule Appointment',
        appointmentCalendar: 'Appointment Calendar',
        patient: 'Patient',
        doctor: 'Doctor',
        date: 'Date',
        time: 'Time',
        type: 'Type',
        status: 'Status',
        reason: 'Reason',
        notes: 'Notes',
        confirmed: 'Confirmed',
        pending: 'Pending',
        cancelled: 'Cancelled',
        completed: 'Completed',
        consultation: 'Consultation',
        followUp: 'Follow-up',
        emergency: 'Emergency',
        surgery: 'Surgery',
        checkUp: 'Check-up',
        vaccination: 'Vaccination',
      },
      errors: {
        required: 'This field is required',
        minLength: 'Minimum length is {0} characters',
        maxLength: 'Maximum length is {0} characters',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        date: 'Please enter a valid date',
        number: 'Please enter a valid number',
        generic: 'An error occurred. Please try again.',
        network: 'Network error. Please check your connection.',
        unauthorized: 'You are not authorized to perform this action.',
        forbidden: 'Access denied.',
        notFound: 'The requested resource was not found.',
        serverError: 'Server error. Please try again later.',
      },
    },
    es: {
      common: {
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        add: 'Agregar',
        search: 'Buscar',
        filter: 'Filtrar',
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        warning: 'Advertencia',
        info: 'Información',
        confirm: 'Confirmar',
        yes: 'Sí',
        no: 'No',
        close: 'Cerrar',
        back: 'Atrás',
        next: 'Siguiente',
        previous: 'Anterior',
        submit: 'Enviar',
        reset: 'Restablecer',
        clear: 'Limpiar',
        select: 'Seleccionar',
        all: 'Todos',
        none: 'Ninguno',
        required: 'Requerido',
        optional: 'Opcional',
      },
      auth: {
        login: 'Iniciar sesión',
        logout: 'Cerrar sesión',
        username: 'Nombre de usuario',
        password: 'Contraseña',
        rememberMe: 'Recordarme',
        forgotPassword: '¿Olvidaste tu contraseña?',
        welcomeBack: 'Bienvenido de vuelta',
        loginFailed: 'Error al iniciar sesión',
        invalidCredentials: 'Nombre de usuario o contraseña inválidos',
        loggedOut: 'Sesión cerrada',
        loggedOutMessage: 'Has cerrado sesión exitosamente',
      },
      navigation: {
        dashboard: 'Panel de control',
        patients: 'Pacientes',
        appointments: 'Citas',
        calendar: 'Calendario',
        settings: 'Configuración',
        profile: 'Perfil',
        help: 'Ayuda',
      },
      dashboard: {
        title: 'Panel de control',
        welcomeMessage: 'Esto es lo que está pasando en tu hospital hoy',
        totalPatients: 'Total de Pacientes',
        todaysAppointments: 'Citas de Hoy',
        pendingTasks: 'Tareas Pendientes',
        monthlyRevenue: 'Ingresos (Mensual)',
        recentPatients: 'Pacientes Recientes',
        viewAllPatients: 'Ver Todos los Pacientes',
        viewAllAppointments: 'Ver Todas las Citas',
      },
      patients: {
        title: 'Pacientes',
        addNewPatient: 'Agregar Nuevo Paciente',
        patientRegistration: 'Registro de Paciente',
        patientList: 'Lista de Pacientes',
        firstName: 'Nombre',
        lastName: 'Apellido',
        dateOfBirth: 'Fecha de Nacimiento',
        gender: 'Género',
        phone: 'Teléfono',
        email: 'Correo electrónico',
        address: 'Dirección',
        emergencyContact: 'Contacto de Emergencia',
        medicalHistory: 'Historial Médico',
        allergies: 'Alergias',
        medications: 'Medicamentos',
        active: 'Activo',
        inactive: 'Inactivo',
        followUp: 'Seguimiento',
      },
      appointments: {
        title: 'Citas',
        scheduleAppointment: 'Programar Cita',
        appointmentCalendar: 'Calendario de Citas',
        patient: 'Paciente',
        doctor: 'Doctor',
        date: 'Fecha',
        time: 'Hora',
        type: 'Tipo',
        status: 'Estado',
        reason: 'Motivo',
        notes: 'Notas',
        confirmed: 'Confirmada',
        pending: 'Pendiente',
        cancelled: 'Cancelada',
        completed: 'Completada',
        consultation: 'Consulta',
        followUp: 'Seguimiento',
        emergency: 'Emergencia',
        surgery: 'Cirugía',
        checkUp: 'Revisión',
        vaccination: 'Vacunación',
      },
      errors: {
        required: 'Este campo es requerido',
        minLength: 'La longitud mínima es {0} caracteres',
        maxLength: 'La longitud máxima es {0} caracteres',
        email: 'Por favor ingresa un correo electrónico válido',
        phone: 'Por favor ingresa un número de teléfono válido',
        date: 'Por favor ingresa una fecha válida',
        number: 'Por favor ingresa un número válido',
        generic: 'Ocurrió un error. Por favor intenta de nuevo.',
        network: 'Error de red. Por favor verifica tu conexión.',
        unauthorized: 'No estás autorizado para realizar esta acción.',
        forbidden: 'Acceso denegado.',
        notFound: 'El recurso solicitado no fue encontrado.',
        serverError: 'Error del servidor. Por favor intenta más tarde.',
      },
    },
  };

  // Signals for reactive state management
  private readonly _currentLocale = signal<string>(this.DEFAULT_LOCALE);
  private readonly _isRTL = signal<boolean>(false);

  // Public readonly signals
  readonly currentLocale = this._currentLocale.asReadonly();
  readonly isRTL = this._isRTL.asReadonly();

  // Computed signals
  readonly currentLocaleInfo = computed(() => {
    return this.availableLocales.find(locale => locale.code === this._currentLocale()) || this.availableLocales[0];
  });

  constructor() {
    this.initializeLocale();
  }

  private initializeLocale(): void {
    const savedLocale = this.getStoredLocale();
    this.setLocale(savedLocale);
  }

  setLocale(localeCode: string): void {
    const locale = this.availableLocales.find(l => l.code === localeCode);
    if (locale) {
      this._currentLocale.set(localeCode);
      this._isRTL.set(locale.direction === 'rtl');
      this.saveLocale(localeCode);
      this.updateDocumentDirection(locale.direction);
    }
  }

  translate(key: string, params?: Record<string, any>): string {
    const translation = this.getTranslation(key);
    if (params) {
      return this.interpolate(translation, params);
    }
    return translation;
  }

  translateAsync(key: string, params?: Record<string, any>): Observable<string> {
    return new BehaviorSubject(this.translate(key, params));
  }

  private getTranslation(key: string): string {
    const keys = key.split('.');
    const locale = this._currentLocale();
    const translation = this.translations[locale] || this.translations[this.DEFAULT_LOCALE];
    
    let result: any = translation;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  }

  private interpolate(text: string, params: Record<string, any>): string {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }

  private getStoredLocale(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.LOCALE_KEY);
      return stored || this.DEFAULT_LOCALE;
    }
    return this.DEFAULT_LOCALE;
  }

  private saveLocale(localeCode: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.LOCALE_KEY, localeCode);
    }
  }

  private updateDocumentDirection(direction: 'ltr' | 'rtl'): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', direction);
      document.documentElement.setAttribute('lang', this._currentLocale());
    }
  }

  getAvailableLocales(): Locale[] {
    return this.availableLocales;
  }
}
