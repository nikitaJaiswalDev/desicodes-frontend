import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LearnResourcesPage from "./pages/LearnResourcesPage";
import CommunityPage from "./pages/CommunityPage";
import CertificationsPage from "./pages/CertificationsPage";
import IdePage from "./pages/IdePage";
import ContactPage from "./pages/ContactPage";
import LanguagesPage from "./pages/LanguagePage";
import DashboardPage from "./pages/DashboardPage";
import { PricingPage } from "./pages/PricingPage";
import { SubscriptionPage } from "./pages/SubscriptionPage";

import { BillingPage } from "./pages/BillingPage";
import AuthPage from "./pages/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminSubscriptionsPage from "./pages/AdminSubscriptionsPage";
import AdminLanguagesPage from "./pages/AdminLanguagesPage";
import SocialCallbackPage from "./pages/SocialCallbackPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "PLACEHOLDER_CLIENT_ID"}>
      <Router>
        <Routes>
          {/* Admin Routes - Protected */}
          <Route element={<ProtectedAdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
              <Route path="/admin/languages" element={<AdminLanguagesPage />} />
            </Route>
          </Route>

          {/* User Dashboard Routes - Protected */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="certifications" element={<CertificationsPage />} />
          </Route>

          {/* Protected Subscription & Billing Routes */}
          <Route path="subscription" element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          } />
          <Route path="billing" element={
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          } />

          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="languages" element={<LanguagesPage />} />
            <Route path="resources" element={<LearnResourcesPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="ide" element={<IdePage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />

            <Route path="auth" element={<AuthPage />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="signup" element={<AuthPage />} />
            <Route path="auth/callback/:provider" element={<SocialCallbackPage />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
