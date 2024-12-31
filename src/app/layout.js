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
      <div className="bg-green-600 text-center h-20">
          <h2 className="pt-5 font-extrabold">M A P I X E L</h2>
      </div>
      <MapProvider>
          {children}
      </MapProvider>
      </body>
    </html>
  );
}
