import "./globals.css";
import MapProvider from "@/app/map/[id]/mapProvider";

export const metadata = {
  title: "Mapixel",
  description: "A tool for creating 2D, stylized maps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <MapProvider>
          {children}
      </MapProvider>
      </body>
    </html>
  );
}
