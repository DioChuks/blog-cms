/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			'forest-green-400': '#99be9d',
  			'forest-green-500': '#00CAAC',
  			'forest-green-600': '#00C1A4',
  			'forest-green-700': '#03937E',
  			'forest-green-900': '#081A16',
  			'cr-light-green': '#E3FFE9',
  			'cr-teal-100': '#DFF3EA',
  			'cr-soft-green': '#74D88A',
  			'cr-gray-150': '#D9D9D94F',
  			'cr-gray-200': '#FAFAFA',
  			'cr-gray-210': '#F5F7F8',
  			'cr-gray-250': '#ECEEF2',
  			'cr-gray-300': '#EAE3FF',
  			'cr-gray-400': '#0000008A',
  			'cr-gray-600': '#575757',
  			'cr-yellow-200': '#FDFFE3',
  			'cr-pink-300': '#FFE3E3',
  			'zs-black': '#151515',
  			'soft-gray': '#718EBF',
  			'soft-blue': '#74ACD1',
  			'stone-brown': '#DCCEB1',
  			'stone-brown-500': '#BA7E48',
  			'zs-gray': '#E3E1E0',
  			'dark-blue-gray': '#5C6E9A',
  			'beach-sand': '#EAE0CC',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'cr-gray-to-white': 'linear-gradient(90deg, #D9D9D9 0%, #FFF 100%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
