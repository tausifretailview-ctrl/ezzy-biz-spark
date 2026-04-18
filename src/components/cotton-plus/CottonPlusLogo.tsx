interface Props {
  logoUrl?: string | null;
  storeName?: string;
  className?: string;
}

export function CottonPlusLogo({ logoUrl, storeName = "COTTON PLUS", className = "" }: Props) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={storeName}
        className={`mx-auto max-h-20 w-auto object-contain ${className}`}
      />
    );
  }
  return (
    <div
      className={`text-center font-bold text-2xl tracking-[0.15em] ${className}`}
      style={{ fontFamily: "DM Sans, system-ui, sans-serif" }}
    >
      {storeName.toUpperCase()}
    </div>
  );
}
