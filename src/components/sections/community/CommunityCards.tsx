import React from "react";

interface CommunityCard {
  icon: string;
  title: string;
  description: string;
}

const CommunityCards: React.FC = () => {
  const communityCards: CommunityCard[] = [
    {
      icon: "🌍",
      title: "Stories",
      description:
        "Real journeys from local schools, teachers, and self-taught coders who are learning and creating in their own languages. See how people across Northeast India are building projects and inspiring others through accessible, community-driven coding.",
    },
    {
      icon: "💬",
      title: "Discussions",
      description:
        "Ask questions, learn from others, and collaborate with regional coders who share your language and goals. Our community space makes it easy to exchange ideas, solve problems together, and grow your skills side by side.",
    },
    {
      icon: "🚀",
      title: "Showcase",
      description:
        "Share your project built in Assamese, Bodo, Khasi, or Manipuri and inspire others in the community. Showcase your ideas, receive feedback, and help build a growing library of regional-language code examples.",
    },
    {
      icon: "🎯",
      title: "Challenges",
      description:
        "Participate in monthly coding challenges and put your skills to the test. Compete with regional coders, earn badges, and gain recognition for your creativity and problem-solving. Challenge is designed to help you learn new concepts while having fun.",
    },
  ];

  return (
    <section className="bg-[#05010d] py-10 md:py-16 px-4 md:px-8 lg:px-[130px]">
      <div className="max-w-7xl mx-auto">
        {/* Grid of community cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communityCards.map((card, index) => {
            const isLeft = index === 2 || index === 3; // left border for col 1
            return (
              <div
                key={index}
                className={`relative ${
                  index % 2 === 1 ? "md:translate-y-16" : ""
                } rounded-2xl`}
              >
                {/* WRAPPER: padding creates the gap between card and gradient */}
                <div className="relative rounded-2xl p-3">
                  {/* GRADIENT LINES (positioned at wrapper edge) */}
                  {isLeft ? (
                    <>
                      {/* left full-height strip */}
                      <div
                        className="absolute top-0 left-0 w-1 h-full rounded-tl-4xl rounded-bl-4xl
                         bg-linear-to-b from-[#159BD6] to-[#732CC4] pointer-events-none z-20"
                      />
                      {/* top-left extension */}
                      <div
                        className="absolute top-0 left-0 h-1 w-44 rounded-tl-4xl
                         bg-linear-to-r from-[#159BD6] to-[#732CC4] pointer-events-none z-20"
                      />
                      {/* bottom-left extension */}
                      <div
                        className="absolute bottom-0 left-0 h-1 w-44 rounded-bl-4xl
                         bg-linear-to-r from-[#159BD6] to-[#732CC4] pointer-events-none z-20"
                      />
                    </>
                  ) : (
                    <>
                      {/* right full-height strip */}
                      <div
                        className="absolute top-0 right-0 w-1 h-full rounded-tr-4xl rounded-br-4xl
                         bg-linear-to-b from-[#159BD6] to-[#732CC4] pointer-events-none z-20"
                      />
                      {/* top-right extension */}
                      <div
                        className="absolute top-0 right-0 h-1 w-44 rounded-tr-4xl
                         bg-linear-to-r from-[#159BD6] to-[#732CC4] pointer-events-none z-20"
                      />
                      {/* bottom-right extension */}
                      <div
                        className="absolute bottom-0 right-0 h-1 w-44 rounded-br-4xl
                         bg-linear-to-r from-[#159BD6] to-[#732CC4] pointer-events-none z-20"
                      />
                    </>
                  )}

                  {/* INNER CARD: this is the actual card content, separated from gradient by the wrapper padding */}
                  <div className="relative z-10 bg-[#151837] border-[3px] border-[#0E375E] rounded-xl p-3 md:p-8">
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="font-Lufga text-white opacity-60 leading-6 tracking-[0.3px] text-sm md:text-base">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityCards;
