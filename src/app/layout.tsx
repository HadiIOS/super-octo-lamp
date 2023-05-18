"use client";

import { Content, Footer, Header } from "antd/es/layout/layout";
import "./globals.css";
import { Inter } from "next/font/google";
import { App, ConfigProvider, Layout } from "antd";
import { Component, StrictMode } from "react";
import { Container, NextUIProvider } from "@nextui-org/react";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;
  return (
    <StrictMode>
      <html lang="ar" dir="rtl">
        <body>{children}</body>
      </html>
    </StrictMode>
  );
}
