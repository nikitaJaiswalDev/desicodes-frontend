import React from "react";
import ContactForm from "../components/sections/contact/ContactForm";
import ContactHero from "../components/sections/contact/ContactHero";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05010D]">
      <main>
        <ContactHero />
        <ContactForm />
      </main>
    </div>
  );
};

export default ContactPage;
