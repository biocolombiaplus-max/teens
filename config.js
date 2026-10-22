/* =========================================================================
   CONFIGURACIÓN GENERAL — Orquídea Privé
   Edita solo este archivo. Todos estos valores son públicos por diseño:
   NUNCA pongas aquí la "service_role key" de Supabase ni llaves privadas.
   ========================================================================= */
window.OP_CONFIG = {
  // Supabase → Project Settings → API (Project URL y "anon public" key)
  supabaseUrl: '',
  supabaseAnonKey: '',

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
    sitio: 'Orquídea Privé'
  },

  // Reparto de ingresos (porcentaje para la creadora)
  porcentajeCreadora: 55
};
