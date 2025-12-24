type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
        <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-pulse"></div>

            <button
                onClick={onClick}
                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg leading-none flex items-center gap-3 group-hover:scale-105 transition-all duration-300 shadow-2xl"
            >
                <span className="text-white font-semibold text-base tracking-wide">
                    {children}
                </span>
                <svg
                    className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
        </div>
    );
};


export default Button