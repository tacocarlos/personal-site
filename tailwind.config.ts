import type { Config } from 'tailwindcss'
// import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/about/project-description/*.{jsx, tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
      // typography
      require("@tailwindcss/typography")
  ],
}
export default config
