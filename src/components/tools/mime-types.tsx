/**
 * Référence des types MIME
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileType, Copy, Check, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MimeType {
  extension: string;
  mimeType: string;
  description: string;
  category: string;
}

export function MimeTypes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const mimeTypes: MimeType[] = [
    // Documents
    {
      extension: ".pdf",
      mimeType: "application/pdf",
      description: "Document PDF",
      category: "Documents",
    },
    {
      extension: ".doc",
      mimeType: "application/msword",
      description: "Document Microsoft Word",
      category: "Documents",
    },
    {
      extension: ".docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      description: "Document Word (Office Open XML)",
      category: "Documents",
    },
    {
      extension: ".xls",
      mimeType: "application/vnd.ms-excel",
      description: "Feuille de calcul Excel",
      category: "Documents",
    },
    {
      extension: ".xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      description: "Feuille Excel (Office Open XML)",
      category: "Documents",
    },
    {
      extension: ".ppt",
      mimeType: "application/vnd.ms-powerpoint",
      description: "Présentation PowerPoint",
      category: "Documents",
    },
    {
      extension: ".pptx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      description: "Présentation PowerPoint (Office Open XML)",
      category: "Documents",
    },
    {
      extension: ".odt",
      mimeType: "application/vnd.oasis.opendocument.text",
      description: "Document OpenDocument Text",
      category: "Documents",
    },
    {
      extension: ".rtf",
      mimeType: "application/rtf",
      description: "Rich Text Format",
      category: "Documents",
    },

    // Images
    {
      extension: ".jpg",
      mimeType: "image/jpeg",
      description: "Image JPEG",
      category: "Images",
    },
    {
      extension: ".jpeg",
      mimeType: "image/jpeg",
      description: "Image JPEG",
      category: "Images",
    },
    {
      extension: ".png",
      mimeType: "image/png",
      description: "Image PNG",
      category: "Images",
    },
    {
      extension: ".gif",
      mimeType: "image/gif",
      description: "Image GIF",
      category: "Images",
    },
    {
      extension: ".webp",
      mimeType: "image/webp",
      description: "Image WebP",
      category: "Images",
    },
    {
      extension: ".svg",
      mimeType: "image/svg+xml",
      description: "Image vectorielle SVG",
      category: "Images",
    },
    {
      extension: ".bmp",
      mimeType: "image/bmp",
      description: "Image Bitmap",
      category: "Images",
    },
    {
      extension: ".ico",
      mimeType: "image/x-icon",
      description: "Icône",
      category: "Images",
    },
    {
      extension: ".tiff",
      mimeType: "image/tiff",
      description: "Image TIFF",
      category: "Images",
    },

    // Audio
    {
      extension: ".mp3",
      mimeType: "audio/mpeg",
      description: "Audio MP3",
      category: "Audio",
    },
    {
      extension: ".wav",
      mimeType: "audio/wav",
      description: "Audio WAV",
      category: "Audio",
    },
    {
      extension: ".ogg",
      mimeType: "audio/ogg",
      description: "Audio OGG",
      category: "Audio",
    },
    {
      extension: ".m4a",
      mimeType: "audio/mp4",
      description: "Audio MP4",
      category: "Audio",
    },
    {
      extension: ".flac",
      mimeType: "audio/flac",
      description: "Audio FLAC",
      category: "Audio",
    },

    // Vidéo
    {
      extension: ".mp4",
      mimeType: "video/mp4",
      description: "Vidéo MP4",
      category: "Vidéo",
    },
    {
      extension: ".avi",
      mimeType: "video/x-msvideo",
      description: "Vidéo AVI",
      category: "Vidéo",
    },
    {
      extension: ".mov",
      mimeType: "video/quicktime",
      description: "Vidéo QuickTime",
      category: "Vidéo",
    },
    {
      extension: ".wmv",
      mimeType: "video/x-ms-wmv",
      description: "Vidéo Windows Media",
      category: "Vidéo",
    },
    {
      extension: ".webm",
      mimeType: "video/webm",
      description: "Vidéo WebM",
      category: "Vidéo",
    },
    {
      extension: ".mkv",
      mimeType: "video/x-matroska",
      description: "Vidéo Matroska",
      category: "Vidéo",
    },

    // Archives
    {
      extension: ".zip",
      mimeType: "application/zip",
      description: "Archive ZIP",
      category: "Archives",
    },
    {
      extension: ".rar",
      mimeType: "application/vnd.rar",
      description: "Archive RAR",
      category: "Archives",
    },
    {
      extension: ".7z",
      mimeType: "application/x-7z-compressed",
      description: "Archive 7-Zip",
      category: "Archives",
    },
    {
      extension: ".tar",
      mimeType: "application/x-tar",
      description: "Archive TAR",
      category: "Archives",
    },
    {
      extension: ".gz",
      mimeType: "application/gzip",
      description: "Archive GZIP",
      category: "Archives",
    },

    // Développement
    {
      extension: ".html",
      mimeType: "text/html",
      description: "Document HTML",
      category: "Développement",
    },
    {
      extension: ".css",
      mimeType: "text/css",
      description: "Feuille de style CSS",
      category: "Développement",
    },
    {
      extension: ".js",
      mimeType: "text/javascript",
      description: "Script JavaScript",
      category: "Développement",
    },
    {
      extension: ".json",
      mimeType: "application/json",
      description: "Données JSON",
      category: "Développement",
    },
    {
      extension: ".xml",
      mimeType: "application/xml",
      description: "Document XML",
      category: "Développement",
    },
    {
      extension: ".php",
      mimeType: "application/x-httpd-php",
      description: "Script PHP",
      category: "Développement",
    },
    {
      extension: ".py",
      mimeType: "text/x-python",
      description: "Script Python",
      category: "Développement",
    },
    {
      extension: ".java",
      mimeType: "text/x-java-source",
      description: "Code source Java",
      category: "Développement",
    },
    {
      extension: ".cpp",
      mimeType: "text/x-c++src",
      description: "Code source C++",
      category: "Développement",
    },
    {
      extension: ".c",
      mimeType: "text/x-csrc",
      description: "Code source C",
      category: "Développement",
    },

    // Texte
    {
      extension: ".txt",
      mimeType: "text/plain",
      description: "Fichier texte",
      category: "Texte",
    },
    {
      extension: ".csv",
      mimeType: "text/csv",
      description: "Données CSV",
      category: "Texte",
    },
    {
      extension: ".md",
      mimeType: "text/markdown",
      description: "Document Markdown",
      category: "Texte",
    },
    {
      extension: ".log",
      mimeType: "text/plain",
      description: "Fichier de log",
      category: "Texte",
    },
  ];

  const filteredMimeTypes = mimeTypes.filter(
    (mime) =>
      mime.extension.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mime.mimeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mime.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mime.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(
    new Set(mimeTypes.map((mime) => mime.category))
  ).sort();

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getMimeTypesByCategory = (category: string) => {
    return filteredMimeTypes.filter((mime) => mime.category === category);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
    >
      <div className="flex items-center space-x-2">
        <FileType className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">MIME types</h2>
      </div>

      {/* Recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par extension, type MIME, description..."
              className="pl-10"
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredMimeTypes.length} types MIME trouvés sur {mimeTypes.length}
          </div>
        </CardContent>
      </Card>

      {/* Résultats par catégorie */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryMimes = getMimeTypesByCategory(category);
          if (categoryMimes.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {categoryMimes.length} type
                    {categoryMimes.length > 1 ? "s" : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categoryMimes.map((mime, index) => (
                    <div
                      key={`${mime.extension}-${index}`}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-medium text-sm bg-background px-2 py-1 rounded">
                            {mime.extension}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-sm text-muted-foreground truncate">
                              {mime.mimeType}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {mime.description}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            mime.mimeType,
                            `${mime.extension}-${index}`
                          )
                        }
                        className="ml-4 flex-shrink-0"
                      >
                        {copied === `${mime.extension}-${index}` ? (
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

      {filteredMimeTypes.length === 0 && searchTerm && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-muted-foreground">
              Aucun type MIME trouvé pour "{searchTerm}"
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <FileType className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                À propos des types MIME
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Les types MIME (Multipurpose Internet Mail Extensions)
                identifient le format des fichiers sur Internet. Ils sont
                utilisés par les serveurs web, navigateurs et APIs pour traiter
                correctement les contenus.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
