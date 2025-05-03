import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


const sentryConfig: SentryReactRouterBuildOptions = {
  org: "mohammed-naami",
  project: "travelagency",
  authToken: "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"
};



export default defineConfig(config => {
  return {
    plugins: [tailwindcss(), tsconfigPaths(), reactRouter(), sentryReactRouter(sentryConfig, config)],
    sentryConfig, 
    ssr: {
      noExternal: [/@syncfusion/],
    }
  };
});
