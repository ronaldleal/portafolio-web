# 📧 Configuración de EmailJS para Ronald Leal

## ⚡ Pasos Rápidos para Activar Envío de Correos

### 1. Crear Cuenta EmailJS (GRATIS)
- Ve a: https://www.emailjs.com/
- Regístrate con tu correo: `ronaldr.lealr@gmail.com`
- Confirma tu cuenta

### 2. Conectar Gmail
- En EmailJS dashboard, ve a **"Email Services"**
- Haz clic en **"Add Service"**
- Selecciona **"Gmail"**
- Autoriza el acceso a tu cuenta de Gmail
- **Copia el Service ID** que aparece (ejemplo: `service_abc123`)

### 3. Crear Template de Email
- Ve a **"Email Templates"**
- Haz clic en **"Create New Template"**
- Usa esta plantilla:

```
Asunto: {{subject}}

Nuevo mensaje desde tu Portfolio Web

---
👤 DATOS DEL CONTACTO:
Nombre: {{from_name}}
Email: {{from_email}}
Fecha: {{current_date}}

📝 MENSAJE:
{{message}}

---
💻 Enviado desde: {{portfolio_url}}

Para responder, simplemente responde a este correo.
```

- **Variables a configurar en el template:**
  - `{{from_name}}` - Nombre del remitente
  - `{{from_email}}` - Email del remitente
  - `{{message}}` - Mensaje
  - `{{subject}}` - Asunto
  - `{{current_date}}` - Fecha actual
  - `{{portfolio_url}}` - URL del portfolio
  - `{{to_email}}` - Tu email (ronaldr.lealr@gmail.com)

- **Copia el Template ID** que aparece (ejemplo: `template_xyz789`)

### 4. Obtener Public Key
- Ve a **"Account"** > **"General"**
- En la sección **"Public Key"**, copia la clave

### 5. Actualizar el Código
Abre `src/app/services/email.service.ts` y actualiza:

```typescript
private defaultConfig: EmailConfig = {
  serviceId: 'service_r8n4cpg',     // Pega aquí tu Service ID
  templateId: 'template_nhl40i2',   // Pega aquí tu Template ID
  publicKey: 'Qee0KWUKFqw-TXCjmNtHp'      // Pega aquí tu Public Key
};
```

### 6. Activar EmailJS
En el mismo archivo, cambia:

```typescript
isEmailJSConfigured(): boolean {
  return true;  // Cambia a true
}
```

### 7. ¡Listo! 🎉
- Reinicia el servidor: `npm start`
- Prueba el formulario en http://localhost:4200
- Los mensajes llegarán directamente a `ronaldr.lealr@gmail.com`

## 🔧 Si tienes problemas:

### Error "Service not found"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio de Gmail esté activo en EmailJS

### Error "Template not found"
- Verifica que el Template ID sea correcto
- Asegúrate de haber guardado el template

### No llegan los correos
- Revisa la carpeta de Spam en Gmail
- Verifica que las variables del template estén bien escritas
- Comprueba que el servicio de Gmail tenga permisos

### CORS errors
- EmailJS maneja CORS automáticamente
- Si hay problemas, verifica tu dominio en EmailJS settings

## 💡 Ventajas de esta configuración:

✅ **Gratuito**: Hasta 200 emails/mes gratis
✅ **Directo**: Los mensajes llegan a tu Gmail instantáneamente
✅ **Sin servidor**: No necesitas backend
✅ **Responsive**: Funciona en móviles perfectamente
✅ **Profesional**: Los correos se ven ordenados y profesionales

## 🔒 Seguridad:
- Las credenciales van en el frontend (es normal con EmailJS)
- EmailJS protege tu email real de spam
- Solo se puede usar desde dominios autorizados
