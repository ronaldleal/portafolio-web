import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
/*
 * INSTRUCCIONES PARA CONFIGURAR EMAILJS:
 * 
 * 1. Registro en EmailJS:
 *    - Visita https://www.emailjs.com/
 *    - Crea una cuenta gratuita
 * 
 * 2. Configurar servicio de email:
 *    - Ve a "Email Services" y conecta tu proveedor (Gmail, Outlook, etc.)
 *    - Anota el "Service ID"
 * 
 * 3. Crear plantilla de email:
 *    - Ve a "Email Templates" 
 *    - Crea un template con variables: {{from_name}}, {{from_email}}, {{message}}
 *    - Anota el "Template ID"
 * 
 * 4. Obtener Public Key:
 *    - Ve a "Account" > "General"
 *    - Copia tu "Public Key"
 * 
 * 5. Actualizar configuración:
 *    - Reemplaza los valores en sendEmailWithEmailJS()
 *    - Cambia useEmailJS a true en onSubmit()
 */

export class Contact {
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  submitMessage = signal('');

  constructor(
    private readonly fb: FormBuilder,
    private readonly emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.submitStatus.set('idle');
      
      const formData = this.contactForm.value;
      
      // Verificar si EmailJS está configurado
      if (this.emailService.isEmailJSConfigured()) {
        // Usar EmailJS si está configurado
        this.sendEmailWithEmailJS(formData);
      } else {
        // Usar mailto como fallback
        this.sendWithMailto(formData);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private async sendEmailWithEmailJS(formData: any) {
    try {
      await this.emailService.sendContactEmail(formData);
      
      this.submitStatus.set('success');
      this.submitMessage.set('¡Mensaje enviado correctamente! Te responderé pronto.');
      this.contactForm.reset();
    } catch (error: any) {
      console.error('❌ Error al enviar email:', error);
      this.submitStatus.set('error');
      
      // Mostrar mensaje de error más específico
      let errorMessage = 'Error al enviar el mensaje.';
      
      if (error instanceof Error) {
        if (error.message.includes('Credenciales') || error.message.includes('Invalid')) {
          errorMessage = 'Error de configuración de EmailJS. Usando método alternativo...';
          // Cambiar automáticamente a mailto si hay error de credenciales
          setTimeout(() => this.sendWithMailto(formData), 2000);
        } else if (error.message.includes('Network') || error.message.includes('conexión')) {
          errorMessage = 'Error de conexión. Verifica tu internet o usa el método alternativo.';
        } else {
          errorMessage = error.message || 'Error desconocido. Por favor, usa el método alternativo.';
        }
      }
      
      this.submitMessage.set(errorMessage);
    } finally {
      this.isSubmitting.set(false);
      
      // Limpiar mensaje después de 7 segundos para dar tiempo a leer el error
      setTimeout(() => {
        this.submitStatus.set('idle');
        this.submitMessage.set('');
      }, 7000);
    }
  }

  private sendWithMailto(formData: any) {
    this.emailService.openMailtoLink(formData);
    
    this.submitStatus.set('success');
    this.submitMessage.set(
      '📧 Se abrió Gmail/tu cliente de correo. ¡Haz clic en "Enviar" para completar el proceso! ' +
      'El mensaje ya está pre-llenado con toda la información.'
    );
    this.contactForm.reset();
    this.isSubmitting.set(false);
    
    // Limpiar mensaje después de 8 segundos
    setTimeout(() => {
      this.submitStatus.set('idle');
      this.submitMessage.set('');
    }, 8000);
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Getters para facilitar el acceso en el template
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
}
