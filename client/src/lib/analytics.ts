// Meta Pixel (Facebook Pixel)
export const initMetaPixel = (pixelId: string) => {
  if (typeof window === 'undefined') return;
  
  // Carregar o script do Meta Pixel
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://connect.facebook.net/en_US/fbevents.js`;
  document.head.appendChild(script);

  // Inicializar o pixel
  (window as any).fbq = (window as any).fbq || function() {
    ((window as any).fbq.q = (window as any).fbq.q || []).push(arguments);
  };
  (window as any).fbq('init', pixelId);
  (window as any).fbq('track', 'PageView');
};

// Rastrear evento de lead no Meta Pixel
export const trackMetaPixelLead = (data: {
  name?: string;
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
}) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: 'Missao Aguia Ebook',
      content_category: 'lead',
      value: data.value || 0,
      currency: data.currency || 'BRL',
      ...(data.email && { em: hashEmail(data.email) }),
      ...(data.phone && { ph: hashPhone(data.phone) }),
    });
  }
};

// Google Analytics 4
export const initGoogleAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Carregar o script do Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Inicializar gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
};

// Rastrear evento de lead no Google Analytics
export const trackGoogleAnalyticsLead = (data: {
  name?: string;
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      currency: data.currency || 'BRL',
      value: data.value || 0,
      event_category: 'engagement',
      event_label: 'Missao Aguia Ebook',
    });
  }
};

// Funções auxiliares para hash de dados sensíveis (GDPR)
const hashEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

const hashPhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};
