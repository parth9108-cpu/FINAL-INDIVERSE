'use client';

import { AuthProvider } from "@/contexts/Auth";
import { CheckoutProvider } from "@/contexts/CheckoutContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CheckoutProvider>
        {children}
      </CheckoutProvider>
    </AuthProvider>
  );
}