import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';

export const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            
            {/* Main Global Navigation Routes */}
            <Route
              path="track"
              element={
                <PlaceholderPage
                  title="Track Complaint"
                  description="Case understanding and timeline view will be implemented in the Complaint Tracking pass."
                />
              }
            />
            <Route
              path="verify"
              element={
                <PlaceholderPage
                  title="Check & Verify"
                  description="Suspicious number, UPI ID, and website verification tool will be built in the Check & Verify pass."
                />
              }
            />
            <Route
              path="help"
              element={
                <PlaceholderPage
                  title="Get Help"
                  description="Cyber police station locator and bank officer directory will be integrated in the Get Help pass."
                />
              }
            />
            <Route
              path="volunteer"
              element={
                <PlaceholderPage
                  title="Cyber Volunteer Programme"
                  description="Volunteer intake and awareness contribution pathways."
                />
              }
            />

            {/* Reporting Journeys */}
            <Route
              path="report/financial"
              element={
                <PlaceholderPage
                  title="Report Financial Fraud"
                  description="Fast-track evidence-to-structured-complaint journey will be implemented in the Financial Fraud pass."
                />
              }
            />
            <Route
              path="report/harassment"
              element={
                <PlaceholderPage
                  title="Harassment, Blackmail & Threat Reporting"
                  description="Conversational evidence intake and safety guidance journey."
                />
              }
            />
            <Route
              path="report/hacked"
              element={
                <PlaceholderPage
                  title="Account & Device Compromise"
                  description="Secure My Account triage followed by official incident reporting."
                />
              }
            />
            <Route
              path="report/anonymous"
              element={
                <PlaceholderPage
                  title="Anonymous Crime Reporting"
                  description="Transparent, privacy-preserving incident reporting for eligible categories."
                />
              }
            />

            {/* Institutional Compliance & Info Pages */}
            <Route
              path="safety-guide"
              element={
                <PlaceholderPage
                  title="Cyber Safety Guide"
                  description="Practical guides for 2FA, UPI hygiene, and identifying online scams."
                />
              }
            />
            <Route
              path="about"
              element={
                <PlaceholderPage
                  title="About the Portal"
                  description="Information on the Indian Cybercrime Coordination Centre (I4C) and Ministry of Home Affairs."
                />
              }
            />
            <Route
              path="privacy"
              element={
                <PlaceholderPage
                  title="Privacy Policy"
                  description="Data governance and privacy transparency standards under Indian law."
                />
              }
            />
            <Route
              path="terms"
              element={
                <PlaceholderPage
                  title="Terms of Use"
                  description="Terms and conditions for utilizing the national reporting portal."
                />
              }
            />
            <Route
              path="accessibility"
              element={
                <PlaceholderPage
                  title="Accessibility Statement"
                  description="Compliance with GIGW (Guidelines for Indian Government Websites) and WCAG 2.1 standards."
                />
              }
            />

            {/* Catch-all fallback */}
            <Route
              path="*"
              element={
                <PlaceholderPage
                  title="Page Not Found"
                  description="The page you are looking for does not exist or has been moved."
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  );
};

export default App;
