/**
 * Outil d'informations sur l'appareil
 */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Monitor, Copy, Check, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/v1/winv";

interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  languages: string[];
  cookieEnabled: boolean;
  onLine: boolean;
  screenWidth: number;
  screenHeight: number;
  availWidth: number;
  availHeight: number;
  colorDepth: number;
  pixelDepth: number;
  devicePixelRatio: number;
  timezone: string;
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  webGL: boolean;
  touch: boolean;
  mobile: boolean;
  browser: string;
  os: string;
  deviceType: string;
}

export function DeviceInformation() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const detectBrowser = (userAgent: string): string => {
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Chrome") && !userAgent.includes("Edge")) return "Chrome";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("Opera")) return "Opera";
    return "Inconnu";
  };

  const detectOS = (userAgent: string): string => {
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
    return "Inconnu";
  };

  const detectDeviceType = (userAgent: string): string => {
    if (/tablet|ipad/i.test(userAgent)) return "Tablette";
    if (/mobile|android|iphone/i.test(userAgent)) return "Mobile";
    return "Desktop";
  };

  const checkWebGL = (): boolean => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return !!gl;
    } catch {
      return false;
    }
  };

  const checkStorage = (type: "localStorage" | "sessionStorage"): boolean => {
    try {
      const storage = window[type];
      const test = "__storage_test__";
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  };

  const checkIndexedDB = (): boolean => {
    return "indexedDB" in window;
  };

  useEffect(() => {
    const info: DeviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: Array.from(navigator.languages || []),
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenWidth: screen.width,
      screenHeight: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      devicePixelRatio: window.devicePixelRatio || 1,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      localStorage: checkStorage("localStorage"),
      sessionStorage: checkStorage("sessionStorage"),
      indexedDB: checkIndexedDB(),
      webGL: checkWebGL(),
      touch: "ontouchstart" in window,
      mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      browser: detectBrowser(navigator.userAgent),
      os: detectOS(navigator.userAgent),
      deviceType: detectDeviceType(navigator.userAgent),
    };

    setDeviceInfo(info);
  }, []);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAllInfo = async () => {
    if (!deviceInfo) return;
    
    const allInfo = Object.entries(deviceInfo)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
      .join("\n");
    
    await navigator.clipboard.writeText(allInfo);
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  if (!deviceInfo) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Chargement des informations...</div>
      </div>
    );
  }

  const infoSections = [
    {
      title: "Navigateur",
      icon: Monitor,
      items: [
        { label: "Navigateur", value: deviceInfo.browser, key: "browser" },
        { label: "User Agent", value: deviceInfo.userAgent, key: "userAgent", truncate: true },
        { label: "Plateforme", value: deviceInfo.platform, key: "platform" },
        { label: "Cookies activés", value: deviceInfo.cookieEnabled ? "Oui" : "Non", key: "cookies" },
        { label: "En ligne", value: deviceInfo.onLine ? "Oui" : "Non", key: "online" },
      ]
    },
    {
      title: "Système",
      icon: Smartphone,
      items: [
        { label: "Système d'exploitation", value: deviceInfo.os, key: "os" },
        { label: "Type d'appareil", value: deviceInfo.deviceType, key: "deviceType" },
        { label: "Mobile", value: deviceInfo.mobile ? "Oui" : "Non", key: "mobile" },
        { label: "Écran tactile", value: deviceInfo.touch ? "Oui" : "Non", key: "touch" },
        { label: "Fuseau horaire", value: deviceInfo.timezone, key: "timezone" },
      ]
    },
    {
      title: "Écran",
      icon: Monitor,
      items: [
        { label: "Résolution", value: `${deviceInfo.screenWidth} × ${deviceInfo.screenHeight}`, key: "resolution" },
        { label: "Zone disponible", value: `${deviceInfo.availWidth} × ${deviceInfo.availHeight}`, key: "available" },
        { label: "Profondeur couleur", value: `${deviceInfo.colorDepth} bits`, key: "colorDepth" },
        { label: "Ratio de pixels", value: deviceInfo.devicePixelRatio.toString(), key: "pixelRatio" },
      ]
    },
    {
      title: "Langues",
      icon: Monitor,
      items: [
        { label: "Langue principale", value: deviceInfo.language, key: "language" },
        { label: "Langues supportées", value: deviceInfo.languages.join(", "), key: "languages", truncate: true },
      ]
    },
    {
      title: "Capacités",
      icon: Monitor,
      items: [
        { label: "Local Storage", value: deviceInfo.localStorage ? "Supporté" : "Non supporté", key: "localStorage" },
        { label: "Session Storage", value: deviceInfo.sessionStorage ? "Supporté" : "Non supporté", key: "sessionStorage" },
        { label: "IndexedDB", value: deviceInfo.indexedDB ? "Supporté" : "Non supporté", key: "indexedDB" },
        { label: "WebGL", value: deviceInfo.webGL ? "Supporté" : "Non supporté", key: "webGL" },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Monitor className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Device information</h2>
        </div>
        <Button onClick={copyAllInfo} variant="default">
          {copied === "all" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          Copier tout
        </Button>
      </div>

      <div className="space-y-4">
        {infoSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`font-mono text-sm text-muted-foreground ${item.truncate ? 'truncate' : 'break-all'}`}>
                          {item.value}
                        </div>
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => copyToClipboard(item.value, item.key)}
                        className="ml-4 flex-shrink-0"
                      >
                        {copied === item.key ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Monitor className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Informations sur l'appareil
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                Ces informations sont collectées via les APIs JavaScript du navigateur. 
                Utile pour le debugging, l'analyse des capacités et l'adaptation responsive.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
