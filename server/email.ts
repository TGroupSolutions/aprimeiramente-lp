import { invokeLLM } from "./_core/llm";

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
    
    // Usar a API de notificação do Manus para enviar email
    const response = await fetch(
      `${process.env.BUILT_IN_FORGE_API_URL}/notification/email`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
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
      console.error('Erro ao enviar email:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
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
    
    const response = await fetch(
      `${process.env.BUILT_IN_FORGE_API_URL}/notification/email`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
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
      console.error('Erro ao enviar notificação:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return false;
  }
}
