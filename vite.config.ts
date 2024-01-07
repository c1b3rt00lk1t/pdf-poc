import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      // includeAssets: ["icon192.png", "icon512.png"],
      manifest: {
        name: "PDF Utils",
        short_name: "PDFUtils",
        description: "App to merge and split PDF files",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
