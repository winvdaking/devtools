/**
 * Page principale de l'application DevTools Hub
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/sidebar";
import { ToolId } from "@/types/tools";

// Import des composants d'outils
import { DateFormatter } from "@/components/tools/date-formatter";
import { JsonFormatter } from "@/components/tools/json-formatter";
import { TextConverter } from "@/components/tools/text-converter";
import { HashEncrypt } from "@/components/tools/hash-encrypt";
import { Base64 } from "@/components/tools/base64";
import { UuidGenerator } from "@/components/tools/uuid-generator";
import { UrlEncoder } from "@/components/tools/url-encoder";
import { HtmlEscape } from "@/components/tools/html-escape";
import { UrlParser } from "@/components/tools/url-parser";
import { DeviceInformation } from "@/components/tools/device-info";
import { JwtParser } from "@/components/tools/jwt-parser";
import { SlugifyString } from "@/components/tools/slugify";
import { BasicAuthGenerator } from "@/components/tools/basic-auth";
import { MimeTypes } from "@/components/tools/mime-types";
import { KeycodeInfo } from "@/components/tools/keycode-info";
import { HttpStatusCodes } from "@/components/tools/http-status";
import { GitCheatsheet } from "@/components/tools/git-cheatsheet";
import { RandomPortGenerator } from "@/components/tools/random-port";
import { CrontabGenerator } from "@/components/tools/crontab-generator";
import { JsonToCsv } from "@/components/tools/json-to-csv";
import { SqlFormatter } from "@/components/tools/sql-formatter";
import { ChmodCalculator } from "@/components/tools/chmod-calculator";
import { DockerConverter } from "@/components/tools/docker-converter";
import { XmlFormatter } from "@/components/tools/xml-formatter";
import { YamlFormatter } from "@/components/tools/yaml-formatter";
import { EmailNormalizer } from "@/components/tools/email-normalizer";
import { RegexTester } from "@/components/tools/regex-tester";
import { RegexCheatsheet } from "@/components/tools/regex-cheatsheet";

// Mapping des outils
const toolComponents: Record<ToolId, React.ComponentType> = {
  "date-formatter": DateFormatter,
  "json-formatter": JsonFormatter,
  "text-converter": TextConverter,
  "hash-encrypt": HashEncrypt,
  base64: Base64,
  "uuid-generator": UuidGenerator,
  "url-encoder": UrlEncoder,
  "html-escape": HtmlEscape,
  "url-parser": UrlParser,
  "device-info": DeviceInformation,
  "jwt-parser": JwtParser,
  slugify: SlugifyString,
  "basic-auth": BasicAuthGenerator,
  "mime-types": MimeTypes,
  "keycode-info": KeycodeInfo,
  "http-status": HttpStatusCodes,
  "git-cheatsheet": GitCheatsheet,
  "random-port": RandomPortGenerator,
  "crontab-generator": CrontabGenerator,
  "json-to-csv": JsonToCsv,
  "sql-formatter": SqlFormatter,
  "chmod-calculator": ChmodCalculator,
  "docker-converter": DockerConverter,
  "xml-formatter": XmlFormatter,
  "yaml-formatter": YamlFormatter,
  "email-normalizer": EmailNormalizer,
  "regex-tester": RegexTester,
  "regex-cheatsheet": RegexCheatsheet,
};

export default function HomePage() {
  const [activeTool, setActiveTool] = useState<ToolId>("date-formatter");

  const ActiveToolComponent = toolComponents[activeTool];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTool={activeTool} onToolSelect={setActiveTool} />

      {/* Zone de contenu principale */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 lg:p-8 max-w-7xl">
          <div
            key={activeTool}
          >
            <ActiveToolComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
