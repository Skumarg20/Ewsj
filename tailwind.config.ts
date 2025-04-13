import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	container: {
		center: true,
		padding: '2rem',
		screens: {
			'2xl': '1400px'
		}
	},
  	extend: {
  		animation: {
  			'spin-slow': 'spin 10s linear infinite',
  			'spin-reverse-slow': 'spin-reverse 10s linear infinite',
			'gradient-move': 'gradient 15s ease infinite',
			  'float': 'float 6s ease-in-out infinite',
			  'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			  'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
		    'fade-in': 'fade-in 0.5s ease-out',
		   'bounce-slow': 'bounce-slow 2s infinite'
  		},
  		keyframes: {
  			'spin-reverse': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(-360deg)'
  				}
  			},
			'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
  		},
		  
  		colors: {
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
  			},
			  sidebar: {
				  DEFAULT: 'hsl(var(--sidebar-background))',
				  foreground: 'hsl(var(--sidebar-foreground))',
				  primary: 'hsl(var(--sidebar-primary))',
				  'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
				  accent: 'hsl(var(--sidebar-accent))',
				  'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
				  border: 'hsl(var(--sidebar-border))',
				  ring: 'hsl(var(--sidebar-ring))'
			  },
			  cogenist: {
				  purple: "#8B5CF6",
				  indigo: "#4F46E5",
				  blue: "#3B82F6",
				  light: "#EEF2FF"
			  }
  		},
		
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
