"use client";

import { useMemo, useState } from "react";

export type ProductTab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

interface ProductInfoTabsProps {
  tabs: ProductTab[];
  defaultKey?: string;
  className?: string;
}

export function ProductInfoTabs({
  tabs,
  defaultKey,
  className = "",
}: ProductInfoTabsProps) {
  const initialKey = useMemo(() => {
    if (defaultKey && tabs.some((t) => t.key === defaultKey)) return defaultKey;
    return tabs[0]?.key || "";
  }, [defaultKey, tabs]);

  const [activeKey, setActiveKey] = useState(initialKey);

  const activeTab = tabs.find((t) => t.key === activeKey) || tabs[0];

  return (
    <section className={className}>
      <div className="border-b border-gray-200">
        <div className="flex justify-center">
          <div className="flex items-center gap-10">
            {tabs.map((tab) => {
              const active = tab.key === activeKey;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveKey(tab.key)}
                  className={`relative pb-3 text-sm md:text-base font-medium transition-colors ${
                    active
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-6">
        <div className="text-sm text-gray-700 leading-relaxed">
          {activeTab?.content}
        </div>
      </div>
    </section>
  );
}
