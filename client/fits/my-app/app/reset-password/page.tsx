import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-accent">
          <main className="container mx-auto px-4 py-8">
            <div className="bg-white/80 rounded-3xl p-8 md:p-12">
              <p className="text-sm text-gray-700">Loading…</p>
            </div>
          </main>
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
