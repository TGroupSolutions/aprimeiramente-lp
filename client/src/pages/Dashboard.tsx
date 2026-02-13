import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bell, Mail, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  source: string;
  createdAt: Date;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [testEmailSent, setTestEmailSent] = useState(false);

  const testEmailMutation = trpc.leads.testEmail.useMutation();

  // Buscar leads do banco de dados
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Simular busca de leads - em produção, isso viria de um endpoint tRPC
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar leads:', error);
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleTestEmail = async () => {
    try {
      await testEmailMutation.mutateAsync();
      setTestEmailSent(true);
      toast.success('Email de teste enviado para vanessa.barpontes@gmail.com!');
      setTimeout(() => setTestEmailSent(false), 3000);
    } catch (error) {
      console.error('Erro ao enviar email de teste:', error);
      toast.error('Erro ao enviar email de teste');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard - Missão Águia</h1>
          <p className="text-muted-foreground">Acompanhe seus leads e notificações em tempo real</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total de Leads</p>
                <p className="text-3xl font-bold text-accent">0</p>
              </div>
              <Users className="w-10 h-10 text-accent/50" />
            </div>
          </Card>

          <Card className="p-6 border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Emails Enviados</p>
                <p className="text-3xl font-bold text-accent">0</p>
              </div>
              <Mail className="w-10 h-10 text-accent/50" />
            </div>
          </Card>

          <Card className="p-6 border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Taxa de Conversão</p>
                <p className="text-3xl font-bold text-accent">0%</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-accent/50" />
            </div>
          </Card>
        </div>

        {/* Seção de Teste de Email */}
        <Card className="p-6 border border-border bg-card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Testar Sistema de Email</h2>
              <p className="text-muted-foreground">Envie um email de teste para verificar se as notificações estão funcionando</p>
            </div>
            <Button
              onClick={handleTestEmail}
              disabled={testEmailMutation.isPending}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {testEmailMutation.isPending ? 'Enviando...' : 'Enviar Email de Teste'}
            </Button>
          </div>

          {testEmailSent && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-600">Email enviado com sucesso!</p>
                <p className="text-sm text-green-600/80">Verifique sua caixa de entrada em vanessa.barpontes@gmail.com</p>
              </div>
            </div>
          )}
        </Card>

        {/* Notificações em Tempo Real */}
        <Card className="p-6 border border-border bg-card">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-bold text-foreground">Notificações em Tempo Real</h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Carregando notificações...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-secondary/50 border border-border rounded-lg flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Nenhuma notificação ainda</p>
                  <p className="text-sm text-muted-foreground">Quando alguém se cadastrar, você verá as notificações aqui em tempo real</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-accent">💡 Dica:</span> Você também receberá notificações por email em vanessa.barpontes@gmail.com sempre que alguém se cadastrar na landing page.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
