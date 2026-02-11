import { useEffect, useState } from 'react';
import { ChevronDown, Award, Users, Zap, Shield, Heart, Brain, Sparkles } from 'lucide-react';
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
                  De <span className="text-accent">Falida</span> a <span className="text-accent">Extraordinária</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A jornada completa de transformação pessoal, financeira e espiritual que mudou minha vida para sempre. Metodologia testada que já transformou 815 pessoas.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">Metodologia comprovada reunindo técnicas antigas que funcionam</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">815 pessoas já venceram a primeira etapa em apenas 2 meses</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">Códigos práticos para aplicar imediatamente após o treinamento</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">Conteúdo que você nunca verá em reels, stories ou lives</p>
                </div>
              </div>

              <div className="pt-4 border-t border-accent/30">
                <p className="text-accent font-semibold italic">
                  "Vou te levar ao nível hard do acesso. Do seu jeito foi assim até hoje, te convido a fazer do jeito que deu e tem dado muito certo comigo."
                </p>
              </div>
            </div>

            {/* Coluna direita - Formulario */}
            <div className="relative">
              <div className="bg-card border border-border rounded-lg p-8 shadow-2xl backdrop-blur-sm">
                <div className="space-y-2 mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Baixe Seu Ebook Gratuito</h2>
                  <p className="text-accent font-semibold">Missão Águia - Acesse sua primeira mente</p>
                </div>

                <div className="mb-6 p-4 bg-secondary rounded border border-accent/20">
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="text-accent font-bold">⚡ Oferta Limitada:</span>
                  </p>
                  <p className="text-sm text-foreground font-semibold">
                    Apenas para os próximos 100 inscritos neste mês
                  </p>
                </div>

                <div className="mb-6 p-3 bg-accent/10 rounded border border-accent/30">
                  <p className="text-xs text-muted-foreground">
                    <span className="text-accent">✓</span> Seja muito bem-vindo(a)! Você está prestes a acessar a metodologia que transformou 815 vidas.
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

      {/* Secao sobre o diferencial */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Mais que um Projeto, um Propósito</h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Será diferente de tudo que você já viu aqui no digital. Meu primeiro livro retrata minha trajetória completa com todos os erros e acertos que me trouxeram até aqui.
              </p>
              
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground">O Diferencial</h3>
                <p className="text-muted-foreground">
                  Não será vendido por preço fixo. Você vai baixar, aplicar toda a metodologia que desenvolvi reunindo várias técnicas antigas que deram muito resultado ao serem aplicadas juntas.
                </p>
                <p className="text-muted-foreground">
                  Depois vai aplicar um dos códigos que vai aprender no livro e ter a oportunidade de praticar quando terminar todo o treinamento.
                </p>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                <p className="text-foreground font-semibold italic">
                  "Nada de sabotar sua transformação e ir para o final hein? Do seu jeito foi assim até hoje, te convido a fazer do jeito que deu e tem dado muito certo comigo."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Neurociência',
                  description: 'Baseado em técnicas de reprogramação mental'
                },
                {
                  icon: Heart,
                  title: 'Vida com Deus',
                  description: 'Transformação espiritual e pessoal'
                },
                {
                  icon: Sparkles,
                  title: 'Elegância',
                  description: 'Desenvolvimento pessoal sofisticado'
                },
                {
                  icon: Award,
                  title: 'Negócios',
                  description: 'Estratégias comprovadas de sucesso'
                }
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group text-center"
                >
                  <benefit.icon className="w-10 h-10 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Secao de Beneficios */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Por Que Missão Águia?</h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Metodologia Comprovada',
                description: 'Resultado de anos de pesquisa e prática reunindo técnicas que funcionam'
              },
              {
                icon: Users,
                title: '815 Transformações',
                description: 'Pessoas que já mudaram suas vidas em apenas 2 meses'
              },
              {
                icon: Zap,
                title: 'Ação Imediata',
                description: 'Códigos práticos para aplicar hoje mesmo após o treinamento'
              },
              {
                icon: Shield,
                title: 'Garantia Total',
                description: 'Seu email seguro e nunca compartilhado com terceiros'
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
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">É Janeiro de 2026...</h2>
            <p className="text-muted-foreground text-lg">Começa oficialmente o projeto</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-all">
              <div className="text-5xl font-bold text-accent">815</div>
              <p className="text-foreground font-semibold">Pessoas Transformadas</p>
              <p className="text-muted-foreground text-sm">Que venceram a primeira etapa e aguardaram 2 meses</p>
            </div>
            <div className="space-y-2 bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-all">
              <div className="text-5xl font-bold text-accent">100%</div>
              <p className="text-foreground font-semibold">Taxa de Conclusão</p>
              <p className="text-muted-foreground text-sm">Metodologia que funciona e transforma vidas</p>
            </div>
            <div className="space-y-2 bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition-all">
              <div className="text-5xl font-bold text-accent">0</div>
              <p className="text-foreground font-semibold">Custo Inicial</p>
              <p className="text-muted-foreground text-sm">Ebook completamente gratuito para você</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container max-w-2xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-foreground">
            Pronto Para Sua <span className="text-accent">Transformação</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Não deixe para depois. Seu ebook Missão Águia está esperando por você. Identifique e reprograme todos os seus bloqueios, transformando sua vida e negócios em extraordinários!
          </p>
          <div className="bg-background rounded-lg p-8 max-w-md mx-auto">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            Instituto Missão Águia - 2026
          </p>
          <p className="text-muted-foreground text-xs">
            Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
