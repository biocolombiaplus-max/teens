/* =========================================================================
   CONFIGURACIÓN GENERAL — Orquídea Private
   Edita solo este archivo. Todos estos valores son públicos por diseño:
   NUNCA pongas aquí la "service_role key" de Supabase ni llaves privadas.
   ========================================================================= */
window.OP_CONFIG = {
  // Supabase → Project Settings → API (Project URL y "anon public" key)
  supabaseUrl: 'https://wumyntjppcolowqhpzlz.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bXludGpwcGNvbG93cWhwemx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MTA3NzAsImV4cCI6MjEwODI4Njc3MH0.0o1a8UNAbc0BZogkWZnNzuRanPqWA1guCVzKsW2iRFY',

  // WhatsApp que recibe las postulaciones de modelos (con indicativo, sin +)
  whatsapp: '573126014769',

  // ePayco → Integraciones → Llaves API → "PUBLIC_KEY"
  // Deja test:true hasta hacer una compra de prueba exitosa.
  epayco: { publicKey: '', test: true },

  // Zinli: correo o teléfono de tu cuenta para recibir pagos en dólares
  zinli: { cuenta: '' },

  // Datos del contrato (aparecen en el texto del contrato)
  empresa: {
    razonSocial: '[RAZÓN SOCIAL DE LA EMPRESA]',
    nit: '[NIT]',
    representante: '[NOMBRE DEL REPRESENTANTE LEGAL]',
    ciudad: 'Medellín',
    correo: '[correo@empresa.com]',
    sitio: 'Orquídea Private'
  },

  // Reparto de ingresos (porcentaje para la creadora)
  porcentajeCreadora: 55
};
