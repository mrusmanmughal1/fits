import { Bell, ShieldCheck, Truck } from "lucide-react";

interface PolicyItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const policies: PolicyItem[] = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Security policy",
    description:
      "Security Policy ensures data protection, privacy, compliance, and safe access.",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Delivery policy",
    description:
      "Delivery Policy outlines shipping methods, timelines, costs, and customer responsibilities.",
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Return policy",
    description:
      "Return Policy defines product return conditions, timelines, refunds, and customer rights.",
  },
];

const paymentMethods = [
  { name: "MasterCard", label: "MasterCard" },
  { name: "Discover", label: "Discover" },
  { name: "PayPal", label: "PayPal" },
  { name: "VISA", label: "VISA" },
  { name: "AMEX", label: "AMEX" },
  { name: "Bank", label: "E-BANK\nTRANSFER" },
];

export function PolicySection() {
  return (
    <div className="space-y-6 w-full">
      {/* Policy box */}
      <div className="rounded-3xl border-2 border-dashed border-gray-200 p-4">
        <div className="space-y-3">
          {policies.map((policy, index) => (
            <div key={index} className="flex items-start gap-1">
              <div className="shrink-0 w-10 h-10 flex items-center justify-center text-primary">
                {policy.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {policy.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {policy.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safe checkout */}
      <div className="rounded-3xl bg-gray-50 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Guarantee safe checkout
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-xs font-semibold text-gray-700"
              title={method.label}
            >
              {method.label.includes("\n") ? (
                <span className="text-[10px] leading-tight text-center whitespace-pre-line">
                  {method.label}
                </span>
              ) : (
                method.label
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
