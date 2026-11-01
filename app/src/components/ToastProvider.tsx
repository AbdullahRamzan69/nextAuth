"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#18181b",
          color: "#f4f4f5",
          border: "1px solid #27272a",
          fontSize: "14px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#18181b",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#18181b",
          },
        },
      }}
    />
  );
}
