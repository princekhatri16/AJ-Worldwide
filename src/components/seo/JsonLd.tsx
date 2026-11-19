import React from "react";

export interface JsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Server-rendered JSON-LD component with safe character escaping.
 * Escapes '<' to avoid XSS vulnerabilities or HTML injection.
 */
export function JsonLd({ schema }: JsonLdProps) {
  const jsonString = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
