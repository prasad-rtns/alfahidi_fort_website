import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#243646",
        smoke: "#d3d7da",
        sand: "#e9ebec",
        copper: "#795135",
        pearl: "#fbfbfb",
        steel: "#66727e"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"]
      },
      maxWidth: {
        experience: "1368px"
      }
    }
  },
  plugins: []
};

export default config;
