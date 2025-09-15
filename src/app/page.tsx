/**
 * Page principale de l'application DevTools Hub
 */
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ToolId } from "@/types/tools";
import { cn } from "@/lib/utils";

// Import des composants d'outils existants
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

// Composants Markdown
import { MarkdownToHtml } from "@/components/tools/markdown-to-html";
import { MarkdownToDiscord } from "@/components/tools/markdown-to-discord";
import { MarkdownToSlack } from "@/components/tools/markdown-to-slack";
import { MarkdownToJira } from "@/components/tools/markdown-to-jira";

// Nouveaux composants
import { AsciiArt } from "@/components/tools/ascii-art";
import { StringObfuscator } from "@/components/tools/string-obfuscator";
import { EmojiPicker } from "@/components/tools/emoji-picker";
import { LoremIpsumGenerator } from "@/components/tools/lorem-ipsum-generator";
import { ReadmeGenerator } from "@/components/tools/readme-generator";
import { ChangelogGenerator } from "@/components/tools/changelog-generator";
import { ResponsiveDesignChecker } from "@/components/tools/responsive-design-checker";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { SecurityHeadersChecker } from "@/components/tools/security-headers-checker";
import { SSLCertificateChecker } from "@/components/tools/ssl-certificate-checker";
import { PerformanceMonitor } from "@/components/tools/performance-monitor";

// Composants IA
import { AIChat } from "@/components/tools/ai-chat";

// Nouveaux composants implémentés
import BundleAnalyzer from "@/components/tools/bundle-analyzer";
import GraphQLPlayground from "@/components/tools/graphql-playground";
import ColorPaletteGenerator from "@/components/tools/color-palette-generator";
import CSSGridGenerator from "@/components/tools/css-grid-generator";
import MockDataGenerator from "@/components/tools/mock-data-generator";
import ConsoleLogBeautifier from "@/components/tools/console-log-beautifier";
import ErrorStackParser from "@/components/tools/error-stack-parser";
import SpellChecker from "@/components/tools/spell-checker";
import TextReformulator from "@/components/tools/text-reformulator";
import Cheatsheets from "@/components/tools/cheatsheets";

// Cheatsheets individuels
import GitCheatsheetIndividual from "@/components/tools/git-cheatsheet-individual";
import DockerCheatsheetIndividual from "@/components/tools/docker-cheatsheet-individual";
import BashCheatsheetIndividual from "@/components/tools/bash-cheatsheet-individual";
import NodeCheatsheetIndividual from "@/components/tools/node-cheatsheet-individual";
import LaravelCheatsheetIndividual from "@/components/tools/laravel-cheatsheet-individual";
import ReactCheatsheetIndividual from "@/components/tools/react-cheatsheet-individual";
import PythonCheatsheetIndividual from "@/components/tools/python-cheatsheet-individual";
import SqlCheatsheetIndividual from "@/components/tools/sql-cheatsheet-individual";
import LinuxCheatsheetIndividual from "@/components/tools/linux-cheatsheet-individual";
import RegexCheatsheetIndividual from "@/components/tools/regex-cheatsheet-individual";
import Homepage from "@/components/tools/homepage";
import { QRGenerator } from "@/components/tools/qr-generator";

// Mapping des outils
const toolComponents: Record<ToolId, React.ComponentType> = {
  // Outils de formatage
  "date-formatter": DateFormatter,
  "json-formatter": JsonFormatter,
  "text-converter": TextConverter,
  "spell-checker": SpellChecker,
  "text-reformulator": TextReformulator,
  "xml-formatter": XmlFormatter,
  "yaml-formatter": YamlFormatter,
  "sql-formatter": SqlFormatter,
  "json-to-csv": JsonToCsv,
  "markdown-to-html": MarkdownToHtml,
  "markdown-to-discord": MarkdownToDiscord,
  "markdown-to-slack": MarkdownToSlack,
  "markdown-to-jira": MarkdownToJira,
  "ascii-art": AsciiArt,
  "string-obfuscator": StringObfuscator,
  "emoji-picker": EmojiPicker,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "readme-generator": ReadmeGenerator,
  "changelog-generator": ChangelogGenerator,
  "responsive-design-checker": ResponsiveDesignChecker,
  "password-generator": PasswordGenerator,
  "security-headers-checker": SecurityHeadersChecker,
  "ssl-certificate-checker": SSLCertificateChecker,
  "performance-monitor": PerformanceMonitor,

  // Outils d'IA
  "ai-chat": AIChat,

  // Outils d'encodage et sécurité
  "hash-encrypt": HashEncrypt,
  base64: Base64,
  "url-encoder": UrlEncoder,
  "html-escape": HtmlEscape,
  "basic-auth": BasicAuthGenerator,
  "jwt-parser": JwtParser,

  // Générateurs
  "uuid-generator": UuidGenerator,
  "random-port": RandomPortGenerator,
  "crontab-generator": CrontabGenerator,
  slugify: SlugifyString,
  "qr-generator": QRGenerator,

  // Utilitaires
  "url-parser": UrlParser,
  "device-info": DeviceInformation,
  "chmod-calculator": ChmodCalculator,
  "docker-converter": DockerConverter,
  "email-normalizer": EmailNormalizer,

  // Références et aide-mémoire
  "mime-types": MimeTypes,
  "keycode-info": KeycodeInfo,
  "http-status": HttpStatusCodes,
  "regex-tester": RegexTester,

  // Cheatsheets individuels
  "git-cheatsheet": GitCheatsheetIndividual,
  "docker-cheatsheet": DockerCheatsheetIndividual,
  "bash-cheatsheet": BashCheatsheetIndividual,
  "node-cheatsheet": NodeCheatsheetIndividual,
  "laravel-cheatsheet": LaravelCheatsheetIndividual,
  "react-cheatsheet": ReactCheatsheetIndividual,
  "python-cheatsheet": PythonCheatsheetIndividual,
  "sql-cheatsheet": SqlCheatsheetIndividual,
  "linux-cheatsheet": LinuxCheatsheetIndividual,
  "regex-cheatsheet": RegexCheatsheetIndividual,

  // Outils de développement
  "bundle-analyzer": BundleAnalyzer,
  "graphql-playground": GraphQLPlayground,
  "color-palette-generator": ColorPaletteGenerator,
  "css-grid-generator": CSSGridGenerator,
  "mock-data-generator": MockDataGenerator,
  "console-log-beautifier": ConsoleLogBeautifier,
  "error-stack-parser": ErrorStackParser,

  // Cheatsheets des technologies
  cheatsheets: Cheatsheets,

  // Page d'accueil
  homepage: Homepage,
};

export default function HomePage() {
  const [activeTool, setActiveTool] = useState<ToolId>("homepage");

  const ActiveToolComponent = toolComponents[activeTool];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTool={activeTool} onToolSelect={setActiveTool} />

      {/* Zone de contenu principale */}
      <main className="flex-1 overflow-auto">
        <div className={cn(
          "container mx-auto p-4 sm:p-6 lg:p-8",
          // Largeur optimisée selon le type d'outil
          activeTool.includes('cheatsheet') || activeTool === 'cheatsheets' 
            ? "max-w-4xl" // Plus étroit pour les cheatsheets
            : "max-w-7xl" // Plus large pour les autres outils
        )}>
          <div key={activeTool} className="min-h-full">
            {activeTool === "homepage" ? (
              <Homepage onToolSelect={(toolId: string) => setActiveTool(toolId as ToolId)} />
            ) : (
              <ActiveToolComponent />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
