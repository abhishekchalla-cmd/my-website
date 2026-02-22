import Navbar from "@abhishekchalla/frontend/components/navbar";

export default function BaseLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="w-full max-w-[1000px] mx-auto px-12 h-full">
        {title && <h1>{title}</h1>}
        {children}
      </div>
    </div>
  );
}
