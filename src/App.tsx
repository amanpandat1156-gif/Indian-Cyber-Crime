import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { DemoProvider } from './context/DemoContext';
import { RootLayout } from './components/layout/RootLayout';
import { AccountSwitcherDrawer } from './components/auth/AccountSwitcherDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { FinancialFraudReportPage } from './pages/report/FinancialFraudReportPage';
import { HarassmentReportPage } from './pages/report/HarassmentReportPage';
import { HackedReportPage } from './pages/report/HackedReportPage';
import { AnonymousReportPage } from './pages/report/AnonymousReportPage';
import { TrackPage } from './pages/TrackPage';
import { VerifyPage } from './pages/VerifyPage';
import { HelpPage } from './pages/HelpPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { SafetyGuidePage } from './pages/SafetyGuidePage';
import { AboutPage } from './pages/AboutPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <BrowserRouter>
            <DemoProvider>
              <Routes>
                <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />

                {/* Citizen Reporting Workflows */}
                <Route path="report/financial" element={<FinancialFraudReportPage />} />
                <Route path="report/harassment" element={<HarassmentReportPage />} />
                <Route path="report/hacked" element={<HackedReportPage />} />
                <Route path="report/anonymous" element={<AnonymousReportPage />} />

                {/* Core Citizen Services */}
                <Route path="track" element={<TrackPage />} />
                <Route path="verify" element={<VerifyPage />} />
                <Route path="help" element={<HelpPage />} />
                <Route path="volunteer" element={<VolunteerPage />} />

                {/* Institutional & Safety Information */}
                <Route path="safety-guide" element={<SafetyGuidePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route
                  path="privacy"
                  element={
                    <PlaceholderPage
                      title="Privacy Policy"
                      description="Information governance, confidentiality standards, and legal data protection under IT Act 2000."
                    />
                  }
                />
                <Route
                  path="terms"
                  element={
                    <PlaceholderPage
                      title="Terms of Use"
                      description="Official guidelines and citizen terms of use for National Cyber Crime Reporting Portal."
                    />
                  }
                />
                <Route
                  path="accessibility"
                  element={
                    <PlaceholderPage
                      title="Accessibility Statement"
                      description="Portal compliance with Guidelines for Indian Government Websites (GIGW 2.0) and WCAG 2.1 Level AA standard."
                    />
                  }
                />

                {/* 404 Fallback */}
                <Route
                  path="*"
                  element={
                    <PlaceholderPage
                      title="Page Not Found"
                      description="The requested page could not be found. Return to the homepage to explore citizen services."
                    />
                  }
                />
              </Route>
            </Routes>

            {/* Floating Demo Account Switcher (Development & Testing) */}
            <AccountSwitcherDrawer />
          </DemoProvider>
        </BrowserRouter>
      </AuthProvider>
    </AccessibilityProvider>
  </LanguageProvider>
  );
};

export default App;
