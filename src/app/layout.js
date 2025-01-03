import "./globals.css";
import MapProvider from "@/app/map/[id]/mapProvider";
import Link from "next/link";

export const metadata = {
  title: "Mapixel",
  description: "A tool for creating 2D, stylized maps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div className="bg-green-600 text-center h-20 mb-4">
          <div className="pt-6">
              <Link className="font-extrabold text-2xl" href="/main">
                  M A P I X E L
              </Link>
          </div>
      </div>
      <MapProvider>
          {children}
      </MapProvider>
      </body>
    </html>
  );
}
