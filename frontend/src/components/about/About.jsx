import { useLanguage } from '../../context/languageContext';
import { useTheme } from '../../context/ThemeContext';
import './About.css';

export default function About() {
  const { language, languageData } = useLanguage();
  const t = languageData[language]?.aboutPage || {
    heroTitle: "Welcome to My Store",
    heroSubtitle: "Design Your Perfect Machine. Your Laptop, Your Rules.",
    promiseTitle: "Our Promise",
    promiseText: "We believe technology should adapt to you, not the other way around. My Store's Laptop Configurator is built for those who demand the extraordinary.",
    howItWorksTitle: "How Configuration Works",
    steps: [
      { title: "Pick Your Base", desc: "Start with trusted models from top brands." },
      { title: "Customize Features", desc: "Select RAM, storage, GPU, color, keyboard lighting and more." },
      { title: "Preview & Order", desc: "Get transparent pricing and seamless checkout." }
    ],
    ctaTitle: "Begin Your Journey",
    ctaButton: "Configure Now"
  };
   const { theme } = useTheme();

  return (
    <div className={`about-container ${theme}`}>
      <section className="about-hero">
        <div className="hero-glass">
          <h1 className="about-title">{t.heroTitle}</h1>
          <p className="about-subtitle">{t.heroSubtitle}</p>
        </div>
      </section>

      <section className="about-promise">
        <h2>{t.promiseTitle}</h2>
        <p>{t.promiseText}</p>
      </section>

      <section className="about-steps">
        <h2>{t.howItWorksTitle}</h2>
        <div className="steps-grid">
          {t.steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2>{t.ctaTitle}</h2>
        <button onClick={() => window.location.href = '/catalog'}>
          {t.ctaButton}
        </button>
      </section>
    </div>
  );
}
