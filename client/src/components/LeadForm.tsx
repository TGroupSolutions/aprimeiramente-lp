import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { trackMetaPixelLead, trackGoogleAnalyticsLead } from '@/lib/analytics';

interface LeadFormProps {
  pdfUrl?: string;
}

export default function LeadForm({ pdfUrl = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663029763692/DpkEZiNKWaemYiGh.pdf' }: LeadFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submitLead = trpc.leads.create.useMutation();

  const formatWhatsApp = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 11) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !name || !whatsapp) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      setError('Email inválido');
      return;
    }

    const cleanedWhatsApp = whatsapp.replace(/\D/g, '');
    if (cleanedWhatsApp.length < 10) {
      setError('WhatsApp inválido (mínimo 10 dígitos)');
      return;
    }

    setLoading(true);
    
    try {
      await submitLead.mutateAsync({
        name,
        email,
        whatsapp: cleanedWhatsApp,
      });

      // Rastrear conversão no Meta Pixel
      trackMetaPixelLead({
        name,
        email,
        phone: cleanedWhatsApp,
        value: 0,
        currency: 'BRL',
      });

      // Rastrear conversão no Google Analytics
      trackGoogleAnalyticsLead({
        name,
        email,
        phone: cleanedWhatsApp,
        value: 0,
        currency: 'BRL',
      });
      
      setSuccess(true);
      setEmail('');
      setName('');
      setWhatsapp('');
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Erro ao enviar. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4 animate-pulse" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Sucesso!</h3>
        <p className="text-muted-foreground mb-4">
          Verifique seu email para baixar o Ebook Missão Águia
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Você também receberá dicas exclusivas no seu WhatsApp
        </p>
        <a
          href={pdfUrl}
          download
          className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-2 px-6 rounded transition-all duration-300"
        >
          Baixar Ebook Agora
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Nome Completo</label>
        <Input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
          disabled={loading}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Email</label>
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
          disabled={loading}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">WhatsApp</label>
        <Input
          type="tel"
          placeholder="(11) 99999-9999"
          value={whatsapp}
          onChange={handleWhatsAppChange}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
          disabled={loading}
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-500/10 p-2 rounded">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processando...
          </>
        ) : (
          'Baixar Ebook Gratuito'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Seus dados estão seguros. Nunca compartilharemos seu email.
      </p>
    </form>
  );
}
