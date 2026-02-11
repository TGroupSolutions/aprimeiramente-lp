import { useEffect, useState } from 'react';
import { ChevronDown, Award, Users, Zap, Shield } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
        {/* Background com parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/oF5Tq489bx5cP1DT2SHsE8/sandbox/fSMH0O8fdzvll1L59tSSSv-img-1_1770812718000_na1fn_aGVyby10cmFuc2Zvcm1hdGlvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvb0Y1VHE0ODlieDVjUDFEVDJTSHNFOC9zYW5kYm94L2ZTTUgwTzhmZHp2bGwxTDU5dFNTU3YtaW1nLTFfMTc3MDgxMjcxODAwMF9uYTFmbl9hR1Z5YnkxMGNtRnVjMlp2Y20xaGRHbHZiZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TK6xVpE9NY2e~hhBZcBw49potF5XLCn8muvCKpgyxmDmsoGFbrsESUy9fINQ1Fj1zCx9W~AtQsp4MpKzajA0XXT~9XclDyUYtxRloBdSoapVi9R8P01rg0mGEoTL~9sQ871kzZGsTTv9NlOSmuR3ugBXxCxhnmhE930bwMLFcgAGG1g3DHAKuQnRpZSJdFAodoc-15GJyEP5wY1JJ-lPXaMXUh5-CUf1ZOz3yNr7GqOyAA7ozLcupGekXO3mFDcw87ns6yXzm17xagAzSficofy47YpeUyBuYjD9hHUNl9V~ILKK3hlLOuZGar6-BEwtJe2jVY5L80kGPt1DwaiHow__)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>

        {/* Linha diagonal de ouro */}
        <div 
          className="absolute top-0 right-0 w-full h-full pointer-events-none z-0"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          }}
        ></div>

        {/* Conteudo */}
        <div className="relative z-10 container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Coluna esquerda - Texto */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground">
                  De <span className="text-accent">Falida</span> a <span className="text-accent">Extraordinaria</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A jornada completa de transformacao pessoal, financeira e espiritual que mudou minha vida para sempre.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">Metodologia testada e comprovada</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">815 pessoas ja transformaram suas vidas</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">Aplicacao pratica com codigos para praticar</p>
                </div>
              </div>
            </div>

            {/* Coluna direita - Formulario */}
            <div className="relative">
              <div className="bg-card border border-border rounded-lg p-8 shadow-2xl backdrop-blur-sm">
                <div className="space-y-2 mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Baixe Seu Ebook Gratuito</h2>
                  <p className="text-muted-foreground">Missao Aguia - Acesse sua primeira mente</p>
                </div>

                <div className="mb-6 p-4 bg-secondary rounded border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-accent font-bold">Oferta Limitada:</span> Apenas para os proximos 100 inscritos neste mes
                  </p>
                </div>

                <LeadForm />
              </div>

              {/* Decoracao - Linhas de ouro */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-accent/30 rounded-tr-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-accent/30 rounded-bl-3xl"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-accent" />
        </div>
      </section>

      {/* Divider com SVG */}
      <div className="relative h-24 bg-background overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'scaleY(-1)' }}
        >
          <path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="rgba(212, 175, 55, 0.1)"
          />
        </svg>
      </div>

      {/* Secao de Beneficios */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Por Que Missao Aguia?</h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Metodologia Comprovada',
                description: 'Resultado de anos de pesquisa e pratica'
              },
              {
                icon: Users,
                title: '815 Transformacoes',
                description: 'Pessoas que ja mudaram suas vidas'
              },
              {
                icon: Zap,
                title: 'Acao Imediata',
                description: 'Codigos praticos para aplicar hoje mesmo'
              },
              {
                icon: Shield,
                title: 'Garantia Total',
                description: 'Seu email seguro e nunca compartilhado'
              }
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
              >
                <benefit.icon className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secao de Prova Social */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-accent">815</div>
              <p className="text-foreground font-semibold">Pessoas Transformadas</p>
              <p className="text-muted-foreground text-sm">Em apenas 2 meses de espera</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-accent">100%</div>
              <p className="text-foreground font-semibold">Taxa de Conclusao</p>
              <p className="text-muted-foreground text-sm">Metodologia que funciona</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-accent">0</div>
              <p className="text-foreground font-semibold">Custo Inicial</p>
              <p className="text-muted-foreground text-sm">Ebook completamente gratuito</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container max-w-2xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-foreground">
            Pronto Para Sua <span className="text-accent">Transformacao</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Nao deixe para depois. Seu ebook Missao Aguia esta esperando por voce.
          </p>
          <div className="bg-background rounded-lg p-8 max-w-md mx-auto">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Instituto Missao Aguia - 2026. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
