"use client";

import { Content } from "@/components/v1/winv/ScrollBar/Content";

export default function Demo() {
  return (
    <main className="relative bg-stone-50 dark:bg-stone-900">
      <Content setProgress={() => {}} />
    </main>
  );
}
