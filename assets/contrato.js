/* =========================================================================
   PLANTILLA DEL CONTRATO DE CREADORA
   Si cambias el texto, sube la VERSION: cada contrato firmado guarda una
   copia exacta de lo que la modelo leyó y firmó, con su versión.
   IMPORTANTE: plantilla de referencia. Debe revisarla un abogado en Colombia
   antes de usarla con modelos reales.
   ========================================================================= */
(function(){
  const VERSION = '2026.1';

  // Tipos de contenido que la creadora puede autorizar (todos voluntarios)
  const CONSENT_ITEMS = [
    ['chat',    'Chat de texto y mensajes de voz con miembros'],
    ['llamada', 'Llamadas de voz a través de la plataforma'],
    ['fotos',   'Fotografías (no explícitas): moda, lencería, estilo de vida'],
    ['videos',  'Videos (no explícitos)'],
    ['vivo',    'Transmisiones en vivo y videollamadas privadas'],
    ['desnudo', 'Contenido con desnudez (fotos o videos)'],
    ['adulto',  'Contenido sexual explícito para adultos (fotos, videos o en vivo)']
  ];

  function render(m, consent, opt = {}){
    const E = (window.OP_CONFIG || {}).empresa || {};
    const pct = (window.OP_CONFIG || {}).porcentajeCreadora || 55;
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const f = (v, ph) => v ? `<b>${esc(v)}</b>` : `<b class="blank">${ph}</b>`;
    const today = opt.date ? new Date(opt.date) : new Date();
    const dateTxt = today.toLocaleDateString('es-CO', { day:'numeric', month:'long', year:'numeric' });
    const birth = m.birth_date ? new Date(m.birth_date + 'T12:00:00').toLocaleDateString('es-CO', { day:'numeric', month:'long', year:'numeric' }) : '';
    const consentRows = CONSENT_ITEMS.map(([k, label]) => {
      const on = consent && consent[k];
      return opt.editable
        ? `<label class="c-row"><input type="checkbox" data-consent="${k}" ${on ? 'checked' : ''}><span>${label}</span></label>`
        : `<div class="c-row"><span class="mark">${on ? 'SÍ AUTORIZO' : 'NO AUTORIZO'}</span><span>${label}</span></div>`;
    }).join('');

    return `
<header class="k-head">
  <p class="k-kicker">${esc(E.sitio || 'Orquídea Private')} · Versión ${VERSION}</p>
  <h1>Contrato de prestación de servicios independientes, exclusividad y licencia de contenido digital</h1>
</header>

<p>Entre los suscritos, de una parte <b>${esc(E.razonSocial)}</b>, identificada con NIT <b>${esc(E.nit)}</b>, representada legalmente por <b>${esc(E.representante)}</b>, propietaria y operadora de la plataforma digital <b>${esc(E.sitio)}</b> (en adelante, <b>“LA PLATAFORMA”</b>); y de otra parte ${f(m.full_name,'[NOMBRE COMPLETO]')}, mayor de edad, nacida el ${f(birth,'[FECHA DE NACIMIENTO]')}, identificada con ${f(m.doc_type || 'CC','[TIPO]')} No. ${f(m.doc_number,'[NÚMERO]')}, domiciliada en ${f(m.city,'[CIUDAD]')}, quien actuará bajo el nombre artístico ${f(m.stage_name,'[NOMBRE ARTÍSTICO]')} (en adelante, <b>“LA CREADORA”</b>), hemos acordado celebrar el presente contrato, que se regirá por las siguientes cláusulas:</p>

<h2>1. Objeto</h2>
<p>LA CREADORA prestará, de manera autónoma e independiente, servicios de creación de contenido digital e interacción virtual con miembros mayores de edad de LA PLATAFORMA, a través de chat, llamadas, fotografías, videos y transmisiones en vivo, <b>únicamente en las modalidades que ella misma autorice</b> en el Anexo 1. LA PLATAFORMA pondrá a su disposición la tecnología, la promoción, el procesamiento de pagos, la seguridad y el soporte necesarios.</p>

<h2>2. Naturaleza del contrato: independencia</h2>
<p>Este es un contrato civil de prestación de servicios. No existe relación laboral, subordinación ni horario obligatorio: LA CREADORA decide libremente cuándo se conecta, con quién interactúa y qué contenido crea. LA CREADORA es responsable de sus aportes a seguridad social como trabajadora independiente y de sus obligaciones tributarias. LA PLATAFORMA practicará las retenciones que ordene la ley.</p>

<h2>3. Mayoría de edad y verificación de identidad</h2>
<p>LA CREADORA declara bajo la gravedad de juramento que es <b>mayor de dieciocho (18) años</b> y que los documentos entregados son auténticos y propios. Autoriza la verificación de su identidad mediante documento, selfie con documento y videollamada. Cualquier falsedad da lugar a la terminación inmediata del contrato y a las acciones legales correspondientes.</p>
<p>Está <b>absolutamente prohibido</b> que en cualquier contenido aparezca, se mencione o se simule a una persona menor de dieciocho (18) años. Si en el contenido participa otra persona adulta, LA CREADORA debe entregar previamente su documento y su autorización firmada. LA PLATAFORMA reportará a las autoridades cualquier indicio de explotación de menores.</p>

<h2>4. Voluntariedad y consentimiento sobre el contenido</h2>
<p>4.1. <b>Todo el contenido es voluntario.</b> LA PLATAFORMA nunca exigirá, presionará ni condicionará pagos, promoción o permanencia a la creación de contenido con desnudez o de carácter sexual.</p>
<p>4.2. El contenido con desnudez o para adultos solo podrá publicarse si LA CREADORA lo autoriza de forma expresa en el Anexo 1. Puede cambiar estas autorizaciones en cualquier momento, por escrito, con efecto hacia el futuro.</p>
<p>4.3. LA CREADORA puede rechazar cualquier solicitud de un miembro, terminar una conversación, llamada o transmisión y bloquear a cualquier usuario, sin explicación y sin penalidad alguna.</p>
<p>4.4. El servicio es exclusivamente virtual. <b>Están prohibidos los encuentros presenciales</b> con miembros y cualquier ofrecimiento de servicios sexuales presenciales. LA PLATAFORMA no presta ni intermedia servicios de acompañantes.</p>
<p>4.5. Contenido prohibido en todo caso: menores de edad, violencia real, actos no consentidos, personas inconscientes o bajo efectos de sustancias, incesto (real o simulado), animales, armas, drogas ilegales, y cualquier contenido ilegal en Colombia o contrario a las normas de las redes de pago (Visa y Mastercard).</p>

<h2>5. Exclusividad</h2>
<p>Durante la vigencia de este contrato, LA CREADORA se obliga a prestar sus servicios de contenido pagado e interacción virtual pagada <b>de forma exclusiva a través de LA PLATAFORMA</b>. En consecuencia, no podrá ofrecer ni vender contenido o interacción pagada en otras plataformas similares (por ejemplo: OnlyFans, Fansly, sitios de webcam o similares), ni por canales directos (WhatsApp, Telegram, transferencias, etc.), ni dirigir a los miembros de LA PLATAFORMA hacia esos canales.</p>
<p>LA CREADORA conserva el derecho de usar sus redes sociales personales y de promocionarse con contenido no pagado que dirija a su perfil en LA PLATAFORMA. Como contraprestación por la exclusividad, LA PLATAFORMA asume la producción y promoción de su perfil según lo descrito en la cláusula 7.</p>

<h2>6. Comunicaciones y pagos solo dentro de la plataforma</h2>
<p>Toda interacción y todo pago con miembros debe ocurrir dentro de LA PLATAFORMA. LA CREADORA no compartirá su número personal, dirección, datos bancarios ni redes privadas con miembros, ni recibirá dinero, regalos o pagos por fuera. <b>LA PLATAFORMA no asume responsabilidad alguna por acuerdos, encuentros, pagos, comunicaciones o cualquier hecho que ocurra fuera de LA PLATAFORMA</b>, los cuales serán responsabilidad exclusiva de quienes los realicen.</p>

<h2>7. Remuneración: ${pct}% para LA CREADORA</h2>
<p>7.1. LA CREADORA recibirá el <b>${pct}%</b> de los ingresos netos generados por su perfil, y LA PLATAFORMA conservará el <b>${100 - pct}%</b>. <b>LA CREADORA es quien recibe la mayor parte de cada venta.</b></p>
<p>7.2. Son ingresos generados por su perfil: contenido vendido, pedidos personalizados, minutos de llamada, videollamada y transmisión, propinas, y la porción de las membresías que se le asigne según el uso que los miembros hagan de su perfil, conforme a la liquidación que genere el sistema. Ingresos netos son los efectivamente recaudados, descontados únicamente los impuestos aplicables, las comisiones de la pasarela de pago, los reembolsos y los contracargos.</p>
<p>7.3. El ${100 - pct}% de LA PLATAFORMA cubre: publicidad y adquisición de clientes nacionales e internacionales; desarrollo, servidores y mantenimiento de la plataforma; seguridad informática, cifrado, marcas de agua y monitoreo de filtraciones; verificación de identidad; moderación y soporte 24/7; procesamiento de pagos, antifraude y contracargos; producción del perfil (sesión de fotos y edición) y asesoría; y la operación discreta de los cobros. Las partes reconocen que esta distribución es justa y está alineada con las prácticas del sector, donde los estudios de modelos webcam suelen retener entre el 40% y el 60%.</p>
<p>7.4. Los pagos se harán <b>quincenalmente</b>, dentro de los cinco (5) días hábiles siguientes al cierre de cada quincena, a una cuenta a nombre de LA CREADORA, junto con un reporte detallado de cada ingreso. LA PLATAFORMA podrá retener temporalmente, y solo por el valor en disputa, los montos sujetos a contracargos o investigaciones de fraude, informándole por escrito.</p>

<h2>8. Propiedad del contenido y licencia</h2>
<p>LA CREADORA conserva los derechos de autor sobre su contenido. Durante la vigencia del contrato otorga a LA PLATAFORMA una licencia exclusiva, gratuita y limitada para alojarlo, exhibirlo y comercializarlo dentro de LA PLATAFORMA, y para usar imágenes <b>no explícitas</b> y su nombre artístico en publicidad. LA CREADORA podrá solicitar que una pieza no se use en publicidad.</p>
<p>Al terminar el contrato, LA PLATAFORMA retirará el perfil y el contenido de la exhibición pública en un plazo máximo de quince (15) días hábiles. El contenido ya comprado por miembros podrá seguir disponible para ellos, salvo que LA CREADORA solicite su retiro. LA PLATAFORMA podrá conservar copias de respaldo por el tiempo que exija la ley, con acceso restringido.</p>

<h2>9. Seguridad, privacidad y filtraciones</h2>
<p>9.1. LA PLATAFORMA aplicará medidas de seguridad acordes con el estado de la técnica: cifrado, control de acceso, marca de agua con el usuario que consume el contenido, bloqueo de descargas, prohibición de grabación y monitoreo.</p>
<p>9.2. LA CREADORA entiende y acepta que <b>ningún sistema es infalible</b> y que terceros pueden capturar, grabar o redistribuir contenido de forma ilícita (por ejemplo, con otra cámara o mediante capturas de pantalla). LA PLATAFORMA no será responsable por actos ilícitos de terceros ni por el contenido que LA CREADORA publique o comparta por fuera de LA PLATAFORMA. Esta limitación no aplica en caso de dolo o culpa grave de LA PLATAFORMA, conforme a la ley colombiana.</p>
<p>9.3. Ante una filtración, LA PLATAFORMA se compromete a: bloquear al responsable cuando sea identificable, preservar la evidencia, gestionar solicitudes de retiro ante los sitios donde aparezca el contenido y acompañar a LA CREADORA en la denuncia penal (Ley 1273 de 2009, delitos informáticos).</p>

<h2>10. Datos personales</h2>
<p>LA CREADORA autoriza a LA PLATAFORMA a tratar sus datos personales, incluidos sus documentos de identidad, con las finalidades de verificación de edad e identidad, ejecución de este contrato, pagos y cumplimiento legal, conforme a la Ley 1581 de 2012. Sus datos reales nunca se mostrarán a los miembros. Puede conocer, actualizar, rectificar y solicitar la supresión de sus datos escribiendo a ${f(E.correo,'[CORREO]')}, salvo los que deban conservarse por obligación legal.</p>

<h2>11. Obligaciones de LA CREADORA</h2>
<p>Entregar información veraz; cumplir el Código de conducta; respetar la exclusividad; no compartir su cuenta; no publicar contenido de terceros sin autorización; mantener la confidencialidad de la información de miembros y de LA PLATAFORMA; e informar de inmediato cualquier acoso, amenaza o filtración.</p>

<h2>12. Obligaciones de LA PLATAFORMA</h2>
<p>Pagar oportunamente la remuneración; entregar reportes claros; proteger su identidad y sus datos; promocionar su perfil; brindar soporte y moderación; respetar en todo momento sus autorizaciones de contenido; y atender sus solicitudes de retiro.</p>

<h2>13. Indemnidad</h2>
<p>LA CREADORA mantendrá indemne a LA PLATAFORMA frente a reclamaciones de terceros originadas en contenido que infrinja derechos de terceros, en información falsa suministrada por ella, o en actividades realizadas fuera de LA PLATAFORMA. LA PLATAFORMA mantendrá indemne a LA CREADORA frente a reclamaciones originadas en el funcionamiento de la plataforma o en el incumplimiento de sus propias obligaciones.</p>

<h2>14. Confidencialidad</h2>
<p>Las partes guardarán reserva sobre la identidad real de LA CREADORA, la información de los miembros, las condiciones comerciales y la información técnica de LA PLATAFORMA, durante la vigencia del contrato y por dos (2) años más.</p>

<h2>15. Vigencia y terminación</h2>
<p>Este contrato tiene una vigencia de doce (12) meses desde su firma y se renovará automáticamente por periodos iguales. LA CREADORA puede terminarlo en cualquier momento con un aviso escrito de quince (15) días. Cualquiera de las partes puede terminarlo de inmediato por incumplimiento grave de la otra. A la terminación se liquidarán y pagarán los saldos pendientes dentro de los treinta (30) días siguientes.</p>

<h2>16. Incumplimiento de la exclusividad o de las normas</h2>
<p>El incumplimiento de las cláusulas 5 o 6 faculta a LA PLATAFORMA para suspender el perfil y terminar el contrato, y para reclamar los perjuicios que demuestre. Los ingresos ya causados a favor de LA CREADORA se le pagarán en todo caso, descontando solo lo que legalmente corresponda.</p>

<h2>17. Firma electrónica</h2>
<p>Las partes aceptan que este contrato se firme electrónicamente, con plena validez conforme a la Ley 527 de 1999 y el Decreto 2364 de 2012. La firma se acompaña del número de documento, la fecha y hora, y el dispositivo utilizado. LA CREADORA podrá descargar una copia del contrato firmado.</p>

<h2>18. Ley aplicable y controversias</h2>
<p>Este contrato se rige por las leyes de la República de Colombia. Las diferencias se intentarán resolver primero de forma directa durante treinta (30) días; si no hay acuerdo, se acudirá a conciliación en un centro autorizado de la ciudad de ${f(E.ciudad,'[CIUDAD]')}, y en su defecto a la jurisdicción ordinaria.</p>

<h2>Anexo 1. Autorización de tipos de contenido</h2>
<p>Marca solo lo que deseas hacer. Lo que no marques <b>no se te pedirá nunca</b>. Puedes cambiarlo cuando quieras escribiendo a soporte.</p>
<div class="consent">${consentRows}</div>

<p class="k-date">Firmado electrónicamente en ${f(m.city || E.ciudad,'[CIUDAD]')}, el ${dateTxt}.</p>`;
  }

  window.OP_CONTRACT = { VERSION, CONSENT_ITEMS, render };
})();
