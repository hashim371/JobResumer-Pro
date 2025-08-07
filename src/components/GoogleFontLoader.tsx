
"use client";

import Head from 'next/head';

interface GoogleFontLoaderProps {
  font: string;
}

export function GoogleFontLoader({ font }: GoogleFontLoaderProps) {
  if (!font) return null;

  const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400;700&display=swap`;

  return (
    <Head>
      <link rel="stylesheet" href={fontUrl} />
    </Head>
  );
}
