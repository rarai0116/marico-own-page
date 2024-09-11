import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#ffff14',
        'custom-dark-yellow': '#dd7705',
        'custom-cyan': '#14ffff',
        'custom-dark-cyan': '#0577dd',
        'custom-vivid-green': '#14dd89',
        'hr-dark-blue': '#003266',
      },
      fontFamily: {
        customFont: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
