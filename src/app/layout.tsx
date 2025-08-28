import './globals.css';
import Header from '@/components/Header'; // Assuming you have a Header component
import Footer from '@/components/Footer'; // Assuming you have a Footer component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}