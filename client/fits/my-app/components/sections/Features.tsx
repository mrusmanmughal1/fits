import React from "react";
import { FEATURES_LEFT, FEATURES_RIGHT } from "@/constants";
import Image from "next/image";
import { Key, Speaker, Gem, ThumbsUp, User, Headphones } from "lucide-react";

// Icon component for feature icons
const FeatureIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconClass = "w-8 h-8 text-primary";

  switch (type) {
    case "key":
      return <Key className={iconClass} />;
    case "speaker":
      return <Speaker className={iconClass} />;
    case "diamond":
      return <Gem className={iconClass} />;
    case "thumbs-up":
      return <ThumbsUp className={iconClass} />;
    case "user":
      return <User className={iconClass} />;
    case "earbuds":
      return <Headphones className={iconClass} />;
    default:
      return null;
  }
};

export const Features: React.FC = () => {
  return (
    <section className="py-16  bg-white">
      <div className="container w-[80%] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-8">
            {FEATURES_LEFT.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FeatureIcon type={feature.icon} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Earbuds Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-xs">
              <div className="aspect-square  hover:scale-115 transition-all duration-300 to-gray-100 rounded-lg flex items-center justify-center p-8  ">
                <Image
                  src="https://m.media-amazon.com/images/I/61NLDbfFY1L._AC_SX679_.jpg"
                  alt=""
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-8">
            {FEATURES_RIGHT.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FeatureIcon type={feature.icon} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
