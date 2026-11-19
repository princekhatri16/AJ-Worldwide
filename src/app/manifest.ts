import { MetadataRoute } from "next";
import { siteData } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteData.name,
    short_name: siteData.name,
    description: `${siteData.name} — ${siteData.tagline}`,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#1F4A3A",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
