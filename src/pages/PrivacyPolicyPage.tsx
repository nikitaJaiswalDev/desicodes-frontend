import React from "react";

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05010d] text-white">
            <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-lg md:text-xl text-white/60">
                        Effective Date: January 1, 2024
                    </p>
                </div>

                {/* Introduction */}
                <div className="mb-12 space-y-4">
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">
                        Welcome to DesiCodes. Your privacy is important to us. This Privacy
                        Policy explains how we collect, use, store, and protect your
                        information when you use our website and services.
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
                            Information We Collect
                        </h2>
                        <div className="ml-0 md:ml-13 space-y-4">
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-2">
                                    Personal Information:
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    Name, email address, phone number (only if you register or
                                    contact us)
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-2">
                                    Usage Information:
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    Pages visited, time spent on the site, device type, browser
                                    type
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-2">
                                    Learning Data:
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    Course progress, selected language preferences, learning
                                    activities
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                2
                            </span>
                            Purpose of Data Collection
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/80 leading-relaxed mb-3">
                                We use your information to:
                            </p>
                            <ul className="space-y-2 text-white/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Provide multilingual coding platform and transpilation
                                        services
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Improve learning experience and platform performance
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        Communicate updates, support, and important notices
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Ensure website security and prevent misuse</span>
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
                            Cookies
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/80 leading-relaxed mb-3">
                                DesiCodes may use cookies to:
                            </p>
                            <ul className="space-y-2 text-white/70 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Remember user preferences</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Improve website functionality</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Analyze traffic and usage trends</span>
                                </li>
                            </ul>
                            <p className="text-white/70 leading-relaxed">
                                You can disable cookies through your browser settings if you
                                wish.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                4
                            </span>
                            Data Sharing
                        </h2>
                        <div className="ml-0 md:ml-13 space-y-3">
                            <p className="text-white/80 leading-relaxed font-semibold">
                                We do not sell or rent your personal data.
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                Data may be shared only:
                            </p>
                            <ul className="space-y-2 text-white/70">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>When required by law</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>
                                        With trusted service providers for hosting or analytics
                                        (under strict confidentiality)
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
                            Data Security
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/70 leading-relaxed">
                                We take reasonable technical and organizational measures to
                                protect your data from unauthorized access, loss, or misuse.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                6
                            </span>
                            Children's Privacy
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/70 leading-relaxed">
                                DesiCodes is designed for learners. If a user is under 18,
                                parental guidance is advised. We do not knowingly collect
                                sensitive data from minors.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                7
                            </span>
                            Your Rights
                        </h2>
                        <div className="ml-0 md:ml-13 space-y-3">
                            <p className="text-white/80 leading-relaxed">
                                You have the right to:
                            </p>
                            <ul className="space-y-2 text-white/70 mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Access your personal data</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Request correction or deletion</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">•</span>
                                    <span>Withdraw consent at any time</span>
                                </li>
                            </ul>
                            <p className="text-white/70 leading-relaxed">
                                For requests, contact us at{" "}
                                <a
                                    href="mailto:privacy@desicodes.in"
                                    className="text-purple-400 hover:text-purple-300 underline transition-colors"
                                >
                                    privacy@desicodes.in
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="bg-white/5 rounded-xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg md:text-xl font-bold">
                                8
                            </span>
                            Policy Updates
                        </h2>
                        <div className="ml-0 md:ml-13">
                            <p className="text-white/70 leading-relaxed">
                                This Privacy Policy may be updated from time to time. Continued
                                use of the website means you accept the updated policy.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer Note */}
                <div className="mt-16 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/50 text-sm md:text-base">
                        Last updated: January 1, 2024
                    </p>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
