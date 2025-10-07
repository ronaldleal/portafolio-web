import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private defaultConfig: EmailConfig = {
    serviceId: 'service_r8n4cpg',
    templateId: 'template_nhl40i2',
    publicKey: 'pbpB8CnCAAyJO-OWm' // ✅ Public Key correcta
  };

  constructor() {
    // Inicializar EmailJS (solo en browser)
    if (typeof window !== 'undefined') {
      console.log('🔧 Inicializando EmailJS con public key:', this.defaultConfig.publicKey?.substring(0, 10) + '...');
      
      try {
        emailjs.init(this.defaultConfig.publicKey);
        console.log('✅ EmailJS inicializado correctamente');
      } catch (error) {
        console.error('❌ Error al inicializar EmailJS:', error);
      }
    } else {
      console.log('⚠️ EmailJS no inicializado - ambiente servidor');
    }
  }

  /**
   * Envía un email usando EmailJS
   * @param formData - Datos del formulario
   * @param config - Configuración opcional de EmailJS
   * @returns Promise con el resultado
   */
  async sendContactEmail(formData: ContactFormData, config?: Partial<EmailConfig>): Promise<any> {
    // Solo ejecutar en el browser
    if (typeof window === 'undefined') {
      throw new Error('Email service only available in browser');
    }

    // Validar datos del formulario
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('Faltan datos obligatorios en el formulario');
    }

    const emailConfig = { ...this.defaultConfig, ...config };

    // Debug: Verificar configuración
    console.log('🔧 EmailJS Configuration:', {
      serviceId: emailConfig.serviceId,
      templateId: emailConfig.templateId,
      publicKey: emailConfig.publicKey?.substring(0, 10) + '...'
    });

    // Parámetros simplificados que coinciden con template básico de EmailJS
    const templateParams = {
      from_name: formData.name || 'Visitante',
      from_email: formData.email || 'no-reply@portfolio.com',
      message: formData.message || 'Sin mensaje',
      to_name: 'Ronald Leal',
      reply_to: formData.email || 'no-reply@portfolio.com'
    };

    console.log('📧 Template Parameters:', templateParams);

    try {
      // Verificar si EmailJS está disponible
      if (!emailjs) {
        console.error('❌ EmailJS library not loaded');
        throw new Error('EmailJS library not loaded');
      }

      console.log('📤 Enviando email con EmailJS...');
      console.log('🔑 Service ID:', emailConfig.serviceId);
      console.log('📝 Template ID:', emailConfig.templateId);
      
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams
      );

      console.log('✅ Email enviado exitosamente:', response);
      return response;
    } catch (error) {
      console.error('❌ Error detallado al enviar email:', error);

      // Proporcionar información más específica del error
      if (error instanceof Error) {
        if (error.message.includes('Invalid')) {
          throw new Error('Credenciales de EmailJS inválidas. Verifica tu Service ID, Template ID y Public Key.');
        } else if (error.message.includes('Network')) {
          throw new Error('Error de conexión. Verifica tu conexión a internet.');
        } else if (error.message.includes('Unauthorized')) {
          throw new Error('No autorizado. Verifica que tu Public Key de EmailJS sea correcta.');
        }
      }

      throw error;
    }
  }

  /**
   * Abre el cliente de correo por defecto con los datos pre-llenados
   * @param formData - Datos del formulario
   * @param toEmail - Email de destino (opcional)
   */
  openMailtoLink(formData: ContactFormData, toEmail = 'ronaldr.lealr@gmail.com'): void {
    if (typeof window === 'undefined') return;

    const subject = encodeURIComponent(`💼 Mensaje desde Portfolio - ${formData.name}`);
    const body = encodeURIComponent(
      `Hola Ronald,\n\n` +
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Fecha: ${new Date().toLocaleString('es-CO')}\n\n` +
      `Mensaje:\n` +
      `${formData.message}\n\n` +
      `---\n` +
      `Enviado desde: ${window.location.origin}`
    );

    // Intentar abrir Gmail web primero
    try {
      const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${toEmail}&su=${subject}&body=${body}`;

      // Abrir en nueva pestaña
      const newWindow = window.open(gmailUrl, '_blank');

      if (!newWindow) {
        // Si el popup fue bloqueado, usar mailto tradicional
        this.fallbackToMailto(toEmail, subject, body);
      } else {
        console.log('📧 Gmail web abierto correctamente');
      }
    } catch (error) {
      console.error('Error al abrir Gmail web:', error);
      this.fallbackToMailto(toEmail, subject, body);
    }
  }

  /**
   * Método de respaldo usando mailto tradicional
   * @private
   */
  private fallbackToMailto(toEmail: string, subject: string, body: string): void {
    if (typeof window === 'undefined') return;

    const mailtoUrl = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoUrl;
      console.log('📧 Mailto tradicional ejecutado');
    } catch (error) {
      console.error('Error en mailto tradicional:', error);
      // Como último recurso, copiar email al clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(toEmail).then(() => {
          alert(`No se pudo abrir el cliente de correo. El email ${toEmail} se ha copiado al portapapeles.`);
        }).catch(() => {
          alert(`No se pudo abrir el cliente de correo. Por favor, contacta a: ${toEmail}`);
        });
      } else {
        alert(`No se pudo abrir el cliente de correo. Por favor, contacta a: ${toEmail}`);
      }
    }
  }

  /**
   * Verifica si EmailJS está configurado correctamente
   * @returns true si EmailJS está configurado
   */
  isEmailJSConfigured(): boolean {
    // Temporalmente desactivado para usar solo mailto
    console.log('� Usando método mailto por defecto');
    return true;
  }

  /**
   * Actualiza la configuración de EmailJS
   * @param config - Nueva configuración
   */
  updateConfig(config: Partial<EmailConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...config };

    // Re-inicializar EmailJS si está en el browser
    if (typeof window !== 'undefined') {
      emailjs.init(this.defaultConfig.publicKey);
    }
  }
}
