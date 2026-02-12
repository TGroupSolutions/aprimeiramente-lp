// Configuração dos pixels - substitua pelos seus IDs reais
export const PIXEL_CONFIG = {
  // Meta Pixel ID - Obtenha em: Facebook Ads Manager > Eventos > Pixel
  // Exemplo: '123456789012345'
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
  
  // Google Analytics Measurement ID - Obtenha em: Google Analytics > Admin > Fluxos de dados
  // Exemplo: 'G-XXXXXXXXXX'
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
};

// Inicializar pixels quando a página carrega
export const initializePixels = () => {
  if (typeof window === 'undefined') return;

  // Inicializar Meta Pixel se o ID estiver configurado
  if (PIXEL_CONFIG.metaPixelId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
    
    (window as any).fbq = (window as any).fbq || function() {
      ((window as any).fbq.q = (window as any).fbq.q || []).push(arguments);
    };
    (window as any).fbq('init', PIXEL_CONFIG.metaPixelId);
    (window as any).fbq('track', 'PageView');
  }

  // Inicializar Google Analytics se o ID estiver configurado
  if (PIXEL_CONFIG.googleAnalyticsId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${PIXEL_CONFIG.googleAnalyticsId}`;
    document.head.appendChild(script);
    
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', PIXEL_CONFIG.googleAnalyticsId);
  }
};
