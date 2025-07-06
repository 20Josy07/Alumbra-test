import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
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
  		       'alumbra-purple': '#301744'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
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
        'gradient': { 
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'blink-cursor-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": { // Kept for completeness if Marquee component has vertical option
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        'light-move-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.6' },
          '25%': { transform: 'translate(20px, -30px) scale(1.1)', opacity: '0.7' },
          '50%': { transform: 'translate(0, 0) scale(1)', opacity: '0.6' },
          '75%': { transform: 'translate(-25px, 15px) scale(0.9)', opacity: '0.5' },
        },
        'light-move-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.5' },
          '25%': { transform: 'translate(-15px, 25px) scale(0.95)', opacity: '0.6' },
          '50%': { transform: 'translate(0, 0) scale(1)', opacity: '0.5' },
          '75%': { transform: 'translate(30px, -20px) scale(1.05)', opacity: '0.4' },
        },
        'light-move-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.55' },
          '25%': { transform: 'translate(10px, 35px) scale(1.05)', opacity: '0.65' },
          '50%': { transform: 'translate(0, 0) scale(1)', opacity: '0.55' },
          '75%': { transform: 'translate(-35px, -10px) scale(0.9)', opacity: '0.45' },
        },
        'light-move-4': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.65' },
          '25%': { transform: 'translate(-20px, -10px) scale(0.9)', opacity: '0.55' },
          '50%': { transform: 'translate(0, 0) scale(1)', opacity: '0.65' },
          '75%': { transform: 'translate(15px, 30px) scale(1.1)', opacity: '0.75' },
        },
    },
    animation: {
     'accordion-down': 'accordion-down 0.2s ease-out',
     'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient': 'gradient 3s linear infinite',
        'blink-cursor-soft': 'blink-cursor-soft 1.2s step-end infinite',
        'marquee-horizontal': "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        'light-move-1': 'light-move-1 20s infinite ease-in-out',
        'light-move-2': 'light-move-2 22s infinite ease-in-out',
        'light-move-3': 'light-move-3 25s infinite ease-in-out',
        'light-move-4': 'light-move-4 23s infinite ease-in-out',
    }
   }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;