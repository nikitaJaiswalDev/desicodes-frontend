import React from "react";

const TermsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05010d] text-white">
            <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                        Terms and Conditions
                    </h1>
                    <p className="text-lg md:text-xl text-white/60">
                        Effective Date: January 1, 2024
                    </p>
                </div>

                {/* Introduction */}
                <div className="mb-12 space-y-4">
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">
                        By accessing or using DesiCodes, you agree to these Terms and
                        Conditions. Please read them carefully before using our platform.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-10 md:space-y-12">
                    {/* Section 1 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                1
                            </span>
                            About DesiCodes
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/70 leading-relaxed">
                                DesiCodes is a multilingual programming platform that enables
                                developers to write code in their native language and
                                seamlessly transpile it to Python. We break language barriers
                                in programming, making coding accessible to everyone,
                                regardless of their language background.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                2
                            </span>
                            User Responsibilities
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/80 leading-relaxed mb-3">
                                You agree to:
                            </p>
                            <ul className="space-y-2 text-white/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Provide accurate information during registration</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Use the platform for legitimate programming and learning purposes
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Not misuse, hack, or disrupt the website or its services
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Not copy, resell, or redistribute platform content,
                                        features, or code without permission
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Respect intellectual property rights and license terms
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                3
                            </span>
                            Intellectual Property
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/70 leading-relaxed">
                                All content on DesiCodes (including the transpiler engine,
                                IDE interface, documentation, code examples, tutorials, logos,
                                and designs) is the property of DesiCodes and protected by
                                copyright laws. User-generated code remains the property of
                                the respective users, but DesiCodes retains rights to
                                anonymized data for platform improvement.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                4
                            </span>
                            Platform Content & Services
                        </h2>
                        <div className="ml-0 md:ml-13 space-y-3">
                            <ul className="space-y-2 text-white/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        The transpilation service is provided "as is" for
                                        educational and development purposes
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        We do not guarantee error-free transpilation for all code
                                        scenarios
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Platform features, language support, and content may be
                                        updated or modified without prior notice
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Code examples and templates are for learning purposes and
                                        should be tested before production use
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                5
                            </span>
                            Account Termination
                        </h2>
                        <div className="ml-0 md:ml-13 space-y-3">
                            <p className="text-white/80 leading-relaxed">
                                We reserve the right to suspend or terminate accounts if:
                            </p>
                            <ul className="space-y-2 text-white/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>These Terms are violated</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Misuse or illegal activity is detected</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Harmful, abusive, or disruptive behavior occurs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Automated scraping or excessive API usage is detected
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                6
                            </span>
                            Payments & Subscriptions
                        </h2>
                        <div className="ml-0 md:ml-13 space-y-3">
                            <ul className="space-y-2 text-white/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Subscription fees, if applicable, are subject to displayed
                                        pricing on the platform
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Refund policy will be clearly mentioned on the pricing and
                                        subscription pages
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        No refunds will be provided for account termination due to
                                        terms violation or misuse
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Premium features may be modified or discontinued with
                                        reasonable notice to subscribers
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                7
                            </span>
                            Limitation of Liability
                        </h2>
                        <div className="ml-0 md:ml-13 space-y-3">
                            <p className="text-white/80 leading-relaxed">
                                DesiCodes is not responsible for:
                            </p>
                            <ul className="space-y-2 text-white/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Technical issues, downtime, or service interruptions
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Loss of data, code, or work due to external factors or
                                        user error
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Decisions made based on transpiled code or platform
                                        content
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Errors in transpilation or unexpected behavior in
                                        generated Python code
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Third-party integrations or external services used in
                                        conjunction with DesiCodes
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                8
                            </span>
                            Governing Law
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/70 leading-relaxed">
                                These Terms and Conditions shall be governed by and construed
                                in accordance with the laws of India. Any disputes arising
                                from these terms shall be subject to the exclusive
                                jurisdiction of the courts in India.
                            </p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                9
                            </span>
                            Contact Information
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/70 leading-relaxed mb-3">
                                For any questions regarding these Terms or Privacy Policy,
                                contact us at:
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                📧{" "}
                                <a
                                    href="mailto:support@desicodes.in"
                                    className="text-purple-400 hover:text-purple-300 underline transition-colors"
                                >
                                    support@desicodes.in
                                </a>
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer Note */}
                <div className="mt-16 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/50 text-sm md:text-base">
                        Last updated: January 1, 2024
                    </p>
                    <p className="text-white/40 text-xs md:text-sm mt-2">
                        By using DesiCodes, you acknowledge that you have read, understood,
                        and agree to be bound by these Terms and Conditions.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default TermsPage;
