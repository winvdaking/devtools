/**
 * Page principale de l'application DevTools Hub
 * Optimisée avec lazy loading pour de meilleures performances
 */
"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Sidebar } from "@/components/sidebar";
import { ToolId } from "@/types/tools";
import { cn } from "@/lib/utils";

// Import direct uniquement pour Homepage (chargé immédiatement)
import Homepage from "@/components/tools/homepage";

// Composant de chargement
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-sm text-muted-foreground">Chargement de l'outil...</p>
    </div>
  </div>
);

// Lazy loading de tous les composants d'outils
const DateFormatter = dynamic(() => import("@/components/tools/date-formatter").then(mod => ({ default: mod.DateFormatter })), { loading: LoadingSpinner });
const JsonFormatter = dynamic(() => import("@/components/tools/json-formatter").then(mod => ({ default: mod.JsonFormatter })), { loading: LoadingSpinner });
const TextConverter = dynamic(() => import("@/components/tools/text-converter").then(mod => ({ default: mod.TextConverter })), { loading: LoadingSpinner });
const HashEncrypt = dynamic(() => import("@/components/tools/hash-encrypt").then(mod => ({ default: mod.HashEncrypt })), { loading: LoadingSpinner });
const Base64 = dynamic(() => import("@/components/tools/base64").then(mod => ({ default: mod.Base64 })), { loading: LoadingSpinner });
const UuidGenerator = dynamic(() => import("@/components/tools/uuid-generator").then(mod => ({ default: mod.UuidGenerator })), { loading: LoadingSpinner });
const UrlEncoder = dynamic(() => import("@/components/tools/url-encoder").then(mod => ({ default: mod.UrlEncoder })), { loading: LoadingSpinner });
const HtmlEscape = dynamic(() => import("@/components/tools/html-escape").then(mod => ({ default: mod.HtmlEscape })), { loading: LoadingSpinner });
const UrlParser = dynamic(() => import("@/components/tools/url-parser").then(mod => ({ default: mod.UrlParser })), { loading: LoadingSpinner });
const DeviceInformation = dynamic(() => import("@/components/tools/device-info").then(mod => ({ default: mod.DeviceInformation })), { loading: LoadingSpinner });
const JwtParser = dynamic(() => import("@/components/tools/jwt-parser").then(mod => ({ default: mod.JwtParser })), { loading: LoadingSpinner });
const SlugifyString = dynamic(() => import("@/components/tools/slugify").then(mod => ({ default: mod.SlugifyString })), { loading: LoadingSpinner });
const BasicAuthGenerator = dynamic(() => import("@/components/tools/basic-auth").then(mod => ({ default: mod.BasicAuthGenerator })), { loading: LoadingSpinner });
const MimeTypes = dynamic(() => import("@/components/tools/mime-types").then(mod => ({ default: mod.MimeTypes })), { loading: LoadingSpinner });
const KeycodeInfo = dynamic(() => import("@/components/tools/keycode-info").then(mod => ({ default: mod.KeycodeInfo })), { loading: LoadingSpinner });
const HttpStatusCodes = dynamic(() => import("@/components/tools/http-status").then(mod => ({ default: mod.HttpStatusCodes })), { loading: LoadingSpinner });
const RandomPortGenerator = dynamic(() => import("@/components/tools/random-port").then(mod => ({ default: mod.RandomPortGenerator })), { loading: LoadingSpinner });
const CrontabGenerator = dynamic(() => import("@/components/tools/crontab-generator").then(mod => ({ default: mod.CrontabGenerator })), { loading: LoadingSpinner });
const JsonToCsv = dynamic(() => import("@/components/tools/json-to-csv").then(mod => ({ default: mod.JsonToCsv })), { loading: LoadingSpinner });
const SqlFormatter = dynamic(() => import("@/components/tools/sql-formatter").then(mod => ({ default: mod.SqlFormatter })), { loading: LoadingSpinner });
const ChmodCalculator = dynamic(() => import("@/components/tools/chmod-calculator").then(mod => ({ default: mod.ChmodCalculator })), { loading: LoadingSpinner });
const DockerConverter = dynamic(() => import("@/components/tools/docker-converter").then(mod => ({ default: mod.DockerConverter })), { loading: LoadingSpinner });
const XmlFormatter = dynamic(() => import("@/components/tools/xml-formatter").then(mod => ({ default: mod.XmlFormatter })), { loading: LoadingSpinner });
const YamlFormatter = dynamic(() => import("@/components/tools/yaml-formatter").then(mod => ({ default: mod.YamlFormatter })), { loading: LoadingSpinner });
const EmailNormalizer = dynamic(() => import("@/components/tools/email-normalizer").then(mod => ({ default: mod.EmailNormalizer })), { loading: LoadingSpinner });
const RegexTester = dynamic(() => import("@/components/tools/regex-tester").then(mod => ({ default: mod.RegexTester })), { loading: LoadingSpinner });
const MarkdownToHtml = dynamic(() => import("@/components/tools/markdown-to-html").then(mod => ({ default: mod.MarkdownToHtml })), { loading: LoadingSpinner });
const MarkdownToDiscord = dynamic(() => import("@/components/tools/markdown-to-discord").then(mod => ({ default: mod.MarkdownToDiscord })), { loading: LoadingSpinner });
const MarkdownToSlack = dynamic(() => import("@/components/tools/markdown-to-slack").then(mod => ({ default: mod.MarkdownToSlack })), { loading: LoadingSpinner });
const MarkdownToJira = dynamic(() => import("@/components/tools/markdown-to-jira").then(mod => ({ default: mod.MarkdownToJira })), { loading: LoadingSpinner });
const AsciiArt = dynamic(() => import("@/components/tools/ascii-art").then(mod => ({ default: mod.AsciiArt })), { loading: LoadingSpinner });
const StringObfuscator = dynamic(() => import("@/components/tools/string-obfuscator").then(mod => ({ default: mod.StringObfuscator })), { loading: LoadingSpinner });
const EmojiPicker = dynamic(() => import("@/components/tools/emoji-picker").then(mod => ({ default: mod.EmojiPicker })), { loading: LoadingSpinner });
const LoremIpsumGenerator = dynamic(() => import("@/components/tools/lorem-ipsum-generator").then(mod => ({ default: mod.LoremIpsumGenerator })), { loading: LoadingSpinner });
const ReadmeGenerator = dynamic(() => import("@/components/tools/readme-generator").then(mod => ({ default: mod.ReadmeGenerator })), { loading: LoadingSpinner });
const ChangelogGenerator = dynamic(() => import("@/components/tools/changelog-generator").then(mod => ({ default: mod.ChangelogGenerator })), { loading: LoadingSpinner });
const ResponsiveDesignChecker = dynamic(() => import("@/components/tools/responsive-design-checker").then(mod => ({ default: mod.ResponsiveDesignChecker })), { loading: LoadingSpinner });
const PasswordGenerator = dynamic(() => import("@/components/tools/password-generator").then(mod => ({ default: mod.PasswordGenerator })), { loading: LoadingSpinner });
const SecurityHeadersChecker = dynamic(() => import("@/components/tools/security-headers-checker").then(mod => ({ default: mod.SecurityHeadersChecker })), { loading: LoadingSpinner });
const SSLCertificateChecker = dynamic(() => import("@/components/tools/ssl-certificate-checker").then(mod => ({ default: mod.SSLCertificateChecker })), { loading: LoadingSpinner });
const PerformanceMonitor = dynamic(() => import("@/components/tools/performance-monitor").then(mod => ({ default: mod.PerformanceMonitor })), { loading: LoadingSpinner });
const BundleAnalyzer = dynamic(() => import("@/components/tools/bundle-analyzer"), { loading: LoadingSpinner });
const GraphQLPlayground = dynamic(() => import("@/components/tools/graphql-playground"), { loading: LoadingSpinner });
const ColorPaletteGenerator = dynamic(() => import("@/components/tools/color-palette-generator"), { loading: LoadingSpinner });
const CSSGridGenerator = dynamic(() => import("@/components/tools/css-grid-generator"), { loading: LoadingSpinner });
const MockDataGenerator = dynamic(() => import("@/components/tools/mock-data-generator"), { loading: LoadingSpinner });
const ConsoleLogBeautifier = dynamic(() => import("@/components/tools/console-log-beautifier"), { loading: LoadingSpinner });
const ErrorStackParser = dynamic(() => import("@/components/tools/error-stack-parser"), { loading: LoadingSpinner });
const SpellChecker = dynamic(() => import("@/components/tools/spell-checker"), { loading: LoadingSpinner });
const TextReformulator = dynamic(() => import("@/components/tools/text-reformulator"), { loading: LoadingSpinner });
const Cheatsheets = dynamic(() => import("@/components/tools/cheatsheets"), { loading: LoadingSpinner });
const GitCheatsheetIndividual = dynamic(() => import("@/components/tools/git-cheatsheet-individual"), { loading: LoadingSpinner });
const DockerCheatsheetIndividual = dynamic(() => import("@/components/tools/docker-cheatsheet-individual"), { loading: LoadingSpinner });
const BashCheatsheetIndividual = dynamic(() => import("@/components/tools/bash-cheatsheet-individual"), { loading: LoadingSpinner });
const NodeCheatsheetIndividual = dynamic(() => import("@/components/tools/node-cheatsheet-individual"), { loading: LoadingSpinner });
const LaravelCheatsheetIndividual = dynamic(() => import("@/components/tools/laravel-cheatsheet-individual"), { loading: LoadingSpinner });
const ReactCheatsheetIndividual = dynamic(() => import("@/components/tools/react-cheatsheet-individual"), { loading: LoadingSpinner });
const PythonCheatsheetIndividual = dynamic(() => import("@/components/tools/python-cheatsheet-individual"), { loading: LoadingSpinner });
const SqlCheatsheetIndividual = dynamic(() => import("@/components/tools/sql-cheatsheet-individual"), { loading: LoadingSpinner });
const LinuxCheatsheetIndividual = dynamic(() => import("@/components/tools/linux-cheatsheet-individual"), { loading: LoadingSpinner });
const RegexCheatsheetIndividual = dynamic(() => import("@/components/tools/regex-cheatsheet-individual"), { loading: LoadingSpinner });
const QRGenerator = dynamic(() => import("@/components/tools/qr-generator").then(mod => ({ default: mod.QRGenerator })), { loading: LoadingSpinner });
const MemoryGame = dynamic(() => import("@/components/tools/memory-game").then(mod => ({ default: mod.MemoryGame })), { loading: LoadingSpinner });
const SnakeGame = dynamic(() => import("@/components/tools/snake-game").then(mod => ({ default: mod.SnakeGame })), { loading: LoadingSpinner });
const Game2048 = dynamic(() => import("@/components/tools/game-2048").then(mod => ({ default: mod.Game2048 })), { loading: LoadingSpinner });
const SimonSays = dynamic(() => import("@/components/tools/simon-says").then(mod => ({ default: mod.SimonSays })), { loading: LoadingSpinner });
const TicTacToe = dynamic(() => import("@/components/tools/tic-tac-toe").then(mod => ({ default: mod.TicTacToe })), { loading: LoadingSpinner });
const ScrollBarComponent = dynamic(() => import("@/app/components/page"), { loading: LoadingSpinner });
const ButtonComponent = dynamic(() => import("@/app/button/page"), { loading: LoadingSpinner });

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

  // Components UI
  "scrollbar-component": ScrollBarComponent,
  "button-component": ButtonComponent,

  // Jeux
  "memory-game": MemoryGame,
  "snake-game": SnakeGame,
  "game-2048": Game2048,
  "simon-says": SimonSays,
  "tic-tac-toe": TicTacToe,
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
          "container mx-auto",
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
