import { ENV } from "./_core/env";

interface SendEmailParams {
  to: string;
  subject: string;
  name: string;
  whatsapp: string;
  pdfUrl: string;
}

export async function sendWelcomeEmail(params: SendEmailParams): Promise<boolean> {
  try {
    const { to, subject, name, whatsapp, pdfUrl } = params;
    
    console.log('[Email] Enviando email de boas-vindas para:', to);
    console.log('[Email] API URL:', ENV.forgeApiUrl);
    
    // Usar a API de notificação do Manus para enviar email
    const response = await fetch(
      `${ENV.forgeApiUrl}/notification/email`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ENV.forgeApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #d4af37;">Bem-vindo(a) à Missão Águia, ${name}!</h2>
              
              <p>Parabéns por dar o primeiro passo em sua jornada de transformação!</p>
              
              <p>Seu ebook <strong>"Missão Águia - Acesse sua primeira mente"</strong> está pronto para download.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${pdfUrl}" style="background-color: #d4af37; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Baixar Ebook Agora
                </a>
              </div>
              
              <p><strong>Próximos Passos:</strong></p>
              <ul>
                <li>Leia o ebook com atenção</li>
                <li>Aplique a metodologia no seu dia a dia</li>
                <li>Você receberá mensagens exclusivas no WhatsApp: ${whatsapp}</li>
              </ul>
              
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                Este é um email automático. Não responda a este endereço.
              </p>
            </div>
          `,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Email] Erro ao enviar email:', response.status, response.statusText, errorText);
      return false;
    }

    console.log('[Email] Email de boas-vindas enviado com sucesso para:', to);
    return true;
  } catch (error) {
    console.error('[Email] Erro ao enviar email:', error);
    return false;
  }
}

export async function sendLeadNotificationToOwner(params: {
  name: string;
  email: string;
  whatsapp: string;
}): Promise<boolean> {
  try {
    const { name, email, whatsapp } = params;
    
    console.log('[Email] Enviando notificação de novo lead para:', 'vanessa.barpontes@gmail.com');
    console.log('[Email] Dados do lead:', { name, email, whatsapp });
    
    const response = await fetch(
      `${ENV.forgeApiUrl}/notification/email`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ENV.forgeApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'vanessa.barpontes@gmail.com',
          subject: `Novo Lead: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2>Novo Lead Capturado!</h2>
              
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>WhatsApp:</strong> ${whatsapp}</p>
              <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
              
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                Este é um email automático da sua landing page Missão Águia.
              </p>
            </div>
          `,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Email] Erro ao enviar notificação:', response.status, response.statusText, errorText);
      return false;
    }

    console.log('[Email] Notificação de novo lead enviada com sucesso');
    return true;
  } catch (error) {
    console.error('[Email] Erro ao enviar notificação:', error);
    return false;
  }
}
