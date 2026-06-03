import { LanguageProvider } from './i18n/LanguageContext'
import { DemoProvider } from './DemoContext'
import { Layout } from './components/Layout'
import { IntroSection } from './components/sections/IntroSection'
import { KeyPairsSection } from './components/sections/KeyPairsSection'
import { EllipticCurveSection } from './components/sections/EllipticCurveSection'
import { SignatureSection } from './components/sections/SignatureSection'
import { HashingSection } from './components/sections/HashingSection'
import { ComparisonSection } from './components/sections/ComparisonSection'
import { SummarySection } from './components/sections/SummarySection'

export default function App() {
  return (
    <LanguageProvider>
      <DemoProvider>
        <Layout>
          <IntroSection />
          <KeyPairsSection />
          <EllipticCurveSection />
          <SignatureSection />
          <HashingSection />
          <ComparisonSection />
          <SummarySection />
        </Layout>
      </DemoProvider>
    </LanguageProvider>
  )
}
