import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/hero/HeroSection"
import { ProblemSolution } from "@/components/sections/ProblemSolution"
import { FeaturesGrid } from "@/components/sections/FeaturesGrid"
import { FAQ } from "@/components/sections/FAQ"
import { WeeklyPlan } from "@/components/features/WeeklyPlan"
import { Pricing } from "@/components/sections/Pricing"
import { SuccessStories } from "@/components/sections/SuccessStories"
import { ComparisonSection } from "@/components/sections/ComparisonSection"
import { DemoTriggerButton } from "@/components/ui/DemoTriggerButton"


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      <HeroSection />

      {/* Social Proof Removed as requested */}

      <ProblemSolution />

      <FeaturesGrid />

      {/* Weekly Plan & Analytics Section - Kept as a specific feature highlight */}
      <section id="analytics" className="py-20 bg-[#020617] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Tu semana, organizada</h2>
            <p className="text-slate-400">Visibilidad clara de tus hitos críticos.</p>
          </div>
          <WeeklyPlan />
        </div>
      </section>

      <ComparisonSection />

      <SuccessStories />

      <Pricing />

      <FAQ />

      {/* Final CTA Section */}
      <section className="py-24 bg-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold font-heading text-white mb-6">¿Listo para dejar de perder dinero?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Cada día sin inteligencia de datos es un día que regalas cuota a la competencia.
          </p>
          <DemoTriggerButton>
            Detén la Fuga de Ingresos - Agendar Demo o Pedir Cotización
          </DemoTriggerButton>
        </div>
      </section>

      <Footer />
    </main>
  )
}
