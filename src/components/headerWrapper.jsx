"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  return !isStudioRoute ? <Header /> : null;
}
