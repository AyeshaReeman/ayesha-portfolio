import { createFileRoute, redirect } from "@tanstack/react-router";

// The portfolio is a hand-written static site (HTML5 + CSS3 + vanilla JS)
// living in public/site/. The app root simply forwards to it.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/site/index.html" });
  },
  component: () => null,
});
