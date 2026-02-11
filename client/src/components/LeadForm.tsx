import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function LeadForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !name) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setEmail('');
      setName('');
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Erro ao enviar. Tente novamente.');
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
          Verifique seu email para baixar o Ebook Missao Aguia
        </p>
        <p className="text-sm text-muted-foreground">
          Voce tambem receberah dicas exclusivas no seu email
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
          disabled={loading}
        />
      </div>
      
      <div>
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
          disabled={loading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
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
        Seus dados estao seguros. Nunca compartilharemos seu email.
      </p>
    </form>
  );
}
