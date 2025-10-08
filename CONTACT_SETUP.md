# Configuración del Módulo de Contacto

El módulo de contacto del portafolio incluye dos métodos para enviar correos:

## Método 1: EmailJS (Recomendado)

EmailJS permite enviar correos directamente desde el frontend sin necesidad de un backend.

### Pasos para configurar EmailJS:

1. **Crear cuenta en EmailJS**
   - Ve a https://www.emailjs.com/
   - Crea una cuenta gratuita

2. **Configurar servicio de email**
   - En el dashboard, ve a "Email Services"
   - Conecta tu proveedor de email (Gmail, Outlook, Yahoo, etc.)
   - Anota el **Service ID** que se genera

3. **Crear plantilla de email**
   - Ve a "Email Templates"
   - Crea un nuevo template
   - Usa estas variables en tu plantilla:
     - `{{from_name}}` - Nombre del remitente
     - `{{from_email}}` - Email del remitente
     - `{{message}}` - Mensaje
     - `{{to_name}}` - Tu nombre (destino)
     - `{{reply_to}}` - Email para responder
   - Anota el **Template ID** que se genera

4. **Obtener Public Key**
   - Ve a "Account" > "General"
   - Copia tu **Public Key**

5. **Actualizar configuración en el código**
   - Abre `src/app/services/email.service.ts`
   - Reemplaza los valores en `defaultConfig`:
     ```typescript
     private defaultConfig: EmailConfig = {
       serviceId: 'tu_service_id',      // Reemplaza con tu Service ID
       templateId: 'tu_template_id',    // Reemplaza con tu Template ID
       publicKey: 'tu_public_key'       // Reemplaza con tu Public Key
     };
     ```

### Ejemplo de plantilla de EmailJS:

```
Asunto: Mensaje de {{from_name}} desde Portfolio Web

Hola {{to_name}},

Has recibido un nuevo mensaje desde tu portfolio web:

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portfolio web.
```

## Método 2: Mailto (Alternativo)

Si no configuras EmailJS, el formulario automáticamente usará el método `mailto:` que abre el cliente de correo por defecto del usuario.

### Ventajas de cada método:

**EmailJS:**
- ✅ Envío directo sin abrir cliente de correo
- ✅ Mejor experiencia de usuario
- ✅ Funciona en cualquier dispositivo
- ✅ Trackeo de envíos
- ❌ Requiere configuración inicial

**Mailto:**
- ✅ Sin configuración necesaria
- ✅ Funciona inmediatamente
- ❌ Depende del cliente de correo del usuario
- ❌ Puede no funcionar en dispositivos móviles

## Uso en producción

Para usar en producción:

1. Configura EmailJS siguiendo los pasos anteriores
2. El sistema detectará automáticamente si EmailJS está configurado
3. Si está configurado, usará EmailJS
4. Si no está configurado, usará mailto como fallback

## Variables de entorno (opcional)

Para mayor seguridad, puedes usar variables de entorno:

```typescript
// En email.service.ts
private defaultConfig: EmailConfig = {
  serviceId: environment.emailjs.serviceId,
  templateId: environment.emailjs.templateId,
  publicKey: environment.emailjs.publicKey
};
```

```typescript
// En environment.ts
export const environment = {
  emailjs: {
    serviceId: 'tu_service_id',
    templateId: 'tu_template_id',
    publicKey: 'tu_public_key'
  }
};
```

## Troubleshooting

### Error "EmailJS is not configured"
- Verifica que hayas reemplazado todos los valores por defecto
- Asegúrate de que el Service ID y Template ID sean correctos

### El correo no llega
- Verifica tu configuración de EmailJS
- Revisa la consola del navegador para errores
- Asegúrate de que el servicio de email esté activo en EmailJS

### Problema con CORS
- EmailJS maneja automáticamente CORS
- Si tienes problemas, verifica tu dominio en la configuración de EmailJS
