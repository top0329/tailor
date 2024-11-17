"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useAlertService } from "@/app/_services";

export { Alert };

function Alert() {
  const pathname = usePathname();
  const alertService = useAlertService();
  const alert = alertService.alert;

  useEffect(() => {
    // clear alert on location change
    alertService.clear();
  }, [pathname]);

  if (!alert) return null;

  return <></>;
}
