import { PodcastChecker } from "@/components/podcast-checker"
import { Shield, Sparkles, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-balance mb-4">PodSafe</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            AI-powered podcast content analysis to help parents make informed decisions about what their kids listen to
          </p>
        </header>

        <PodcastChecker />

        <section className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Advanced keyword extraction and classification to ensure accurate results
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-4">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
            <p className="text-sm text-muted-foreground">Get immediate feedback on podcast content safety in seconds</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Parent-Friendly</h3>
            <p className="text-sm text-muted-foreground">
              Designed with busy parents in mind for quick, trustworthy recommendations
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
