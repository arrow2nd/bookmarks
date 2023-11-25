import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        "stone-100": "#f5f5f4",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
} as Options;
