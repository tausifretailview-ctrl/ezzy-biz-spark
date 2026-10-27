import { useEffect } from "react";
import { TOOLS_ORIGIN } from "./site";

/**
 * What ezzyerp.in/cotton-plus shows now that the Cotton Plus form runs on TOOLS_ORIGIN.
 * Printed QR posters still point here, so customers get a link to the form instead of a 404.
 */
const ToolMoved = () => {
  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">
      <div className="max-w-md text-center">
        <h1 className="mb-3 text-2xl font-bold">This form has moved</h1>
        <p className="mb-6 text-muted-foreground">The Cotton Plus customer form now has its own address.</p>
        <a
          href={`${TOOLS_ORIGIN}/cotton-plus`}
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Open the Cotton Plus form
        </a>
        <p className="mt-6 text-sm">
          <a href="/" className="text-primary underline hover:text-primary/90">
            Go to Ezzy ERP home
          </a>
        </p>
      </div>
    </div>
  );
};

export default ToolMoved;
