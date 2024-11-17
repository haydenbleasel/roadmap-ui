import tailwind from '@roadmap-ui/tailwind-config/tailwind';

export const previewStatuses = `[
  { id: '1', name: 'Planned', color: "${tailwind.theme.colors.gray[500]}" },
  { id: '2', name: 'In Progress', color: "${tailwind.theme.colors.amber[500]}" },
  { id: '3', name: 'Done', color: "${tailwind.theme.colors.emerald[500]}" },
]`;

export const previewFeatures = `[
  {
    id: '1',
    name: 'AI Scene Analysis',
    startAt: startOfMonth(subMonths(today, 6)),
    endAt: subDays(endOfMonth(today), 5),
    status: previewStatuses[0],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '1',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=1',
      name: 'Alice Johnson',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '1', name: 'v1.0' },
  },
  {
    id: '2',
    name: 'Collaborative Editing',
    startAt: startOfMonth(subMonths(today, 5)),
    endAt: subDays(endOfMonth(today), 5),
    status: previewStatuses[1],
    group: { id: '2', name: 'Collaboration Tools' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '2',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=2',
      name: 'Bob Smith',
    },
    initiative: { id: '2', name: 'Real-time Collaboration' },
    release: { id: '1', name: 'v1.0' },
  },
  {
    id: '3',
    name: 'AI-Powered Color Grading',
    startAt: startOfMonth(subMonths(today, 4)),
    endAt: subDays(endOfMonth(today), 5),
    status: previewStatuses[2],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '3',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=3',
      name: 'Charlie Brown',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '2', name: 'v1.1' },
  },
  {
    id: '4',
    name: 'Real-time Video Chat',
    startAt: startOfMonth(subMonths(today, 3)),
    endAt: subDays(endOfMonth(today), 12),
    status: previewStatuses[0],
    group: { id: '2', name: 'Collaboration Tools' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '4',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=4',
      name: 'Diana Prince',
    },
    initiative: { id: '2', name: 'Real-time Collaboration' },
    release: { id: '2', name: 'v1.1' },
  },
  {
    id: '5',
    name: 'AI Voice-to-Text Subtitles',
    startAt: startOfMonth(subMonths(today, 2)),
    endAt: subDays(endOfMonth(today), 5),
    status: previewStatuses[1],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '5',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=5',
      name: 'Ethan Hunt',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '2', name: 'v1.1' },
  },
  {
    id: '6',
    name: 'Cloud Asset Management',
    startAt: startOfMonth(subMonths(today, 1)),
    endAt: endOfMonth(today),
    status: previewStatuses[2],
    group: { id: '3', name: 'Cloud Infrastructure' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '6',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=6',
      name: 'Fiona Gallagher',
    },
    initiative: { id: '3', name: 'Cloud Migration' },
    release: { id: '3', name: 'v1.2' },
  },
  {
    id: '7',
    name: 'AI-Assisted Video Transitions',
    startAt: startOfMonth(today),
    endAt: endOfMonth(addMonths(today, 1)),
    status: previewStatuses[0],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '7',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=7',
      name: 'George Lucas',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '3', name: 'v1.2' },
  },
  {
    id: '8',
    name: 'Version Control System',
    startAt: startOfMonth(addMonths(today, 1)),
    endAt: endOfMonth(addMonths(today, 2)),
    status: previewStatuses[1],
    group: { id: '2', name: 'Collaboration Tools' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '8',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=8',
      name: 'Hannah Montana',
    },
    initiative: { id: '2', name: 'Real-time Collaboration' },
    release: { id: '3', name: 'v1.2' },
  },
  {
    id: '9',
    name: 'AI Content-Aware Fill',
    startAt: startOfMonth(addMonths(today, 2)),
    endAt: endOfMonth(addMonths(today, 3)),
    status: previewStatuses[2],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '9',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=9',
      name: 'Ian Malcolm',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '4', name: 'v1.3' },
  },
  {
    id: '10',
    name: 'Multi-User Permissions',
    startAt: startOfMonth(addMonths(today, 3)),
    endAt: endOfMonth(addMonths(today, 4)),
    status: previewStatuses[0],
    group: { id: '2', name: 'Collaboration Tools' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '10',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=10',
      name: 'Julia Roberts',
    },
    initiative: { id: '2', name: 'Real-time Collaboration' },
    release: { id: '4', name: 'v1.3' },
  },
  {
    id: '11',
    name: 'AI-Powered Audio Enhancement',
    startAt: startOfMonth(addMonths(today, 4)),
    endAt: endOfMonth(addMonths(today, 5)),
    status: previewStatuses[1],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '11',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=11',
      name: 'Kevin Hart',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '4', name: 'v1.3' },
  },
  {
    id: '12',
    name: 'Real-time Project Analytics',
    startAt: startOfMonth(addMonths(today, 5)),
    endAt: endOfMonth(addMonths(today, 6)),
    status: previewStatuses[2],
    group: { id: '3', name: 'Cloud Infrastructure' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '12',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=12',
      name: 'Lara Croft',
    },
    initiative: { id: '3', name: 'Cloud Migration' },
    release: { id: '5', name: 'v1.4' },
  },
  {
    id: '13',
    name: 'AI Scene Recommendations',
    startAt: startOfMonth(addMonths(today, 6)),
    endAt: endOfMonth(addMonths(today, 7)),
    status: previewStatuses[0],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '13',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=13',
      name: 'Michael Scott',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '5', name: 'v1.4' },
  },
  {
    id: '14',
    name: 'Collaborative Storyboarding',
    startAt: startOfMonth(addMonths(today, 7)),
    endAt: endOfMonth(addMonths(today, 8)),
    status: previewStatuses[1],
    group: { id: '2', name: 'Collaboration Tools' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '14',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=14',
      name: 'Natalie Portman',
    },
    initiative: { id: '2', name: 'Real-time Collaboration' },
    release: { id: '5', name: 'v1.4' },
  },
  {
    id: '15',
    name: 'AI-Driven Video Compression',
    startAt: startOfMonth(addMonths(today, 8)),
    endAt: endOfMonth(addMonths(today, 9)),
    status: previewStatuses[2],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '15',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=15',
      name: 'Oscar Isaac',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '6', name: 'v1.5' },
  },
  {
    id: '16',
    name: 'Global CDN Integration',
    startAt: startOfMonth(addMonths(today, 9)),
    endAt: endOfMonth(addMonths(today, 10)),
    status: previewStatuses[0],
    group: { id: '3', name: 'Cloud Infrastructure' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '16',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=16',
      name: 'Penelope Cruz',
    },
    initiative: { id: '3', name: 'Cloud Migration' },
    release: { id: '6', name: 'v1.5' },
  },
  {
    id: '17',
    name: 'AI Object Tracking',
    startAt: startOfMonth(addMonths(today, 10)),
    endAt: endOfMonth(addMonths(today, 11)),
    status: previewStatuses[1],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '17',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=17',
      name: 'Quentin Tarantino',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '6', name: 'v1.5' },
  },
  {
    id: '18',
    name: 'Real-time Language Translation',
    startAt: startOfMonth(addMonths(today, 11)),
    endAt: endOfMonth(addMonths(today, 12)),
    status: previewStatuses[2],
    group: { id: '2', name: 'Collaboration Tools' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '18',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=18',
      name: 'Rachel Green',
    },
    initiative: { id: '2', name: 'Real-time Collaboration' },
    release: { id: '7', name: 'v1.6' },
  },
  {
    id: '19',
    name: 'AI-Powered Video Summarization',
    startAt: startOfMonth(addMonths(today, 12)),
    endAt: endOfMonth(addMonths(today, 13)),
    status: previewStatuses[0],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '19',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=19',
      name: 'Samuel L. Jackson',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '7', name: 'v1.6' },
  },
  {
    id: '20',
    name: 'Blockchain-based Asset Licensing',
    startAt: startOfMonth(addMonths(today, 13)),
    endAt: endOfMonth(addMonths(today, 14)),
    status: previewStatuses[1],
    group: { id: '3', name: 'Cloud Infrastructure' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '20',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=20',
      name: 'Tom Hanks',
    },
    initiative: { id: '3', name: 'Cloud Migration' },
    release: { id: '7', name: 'v1.6' },
  },
]`;

export const previewMarkers = `[
  {
    id: '1',
    date: startOfMonth(subMonths(today, 3)),
    label: 'Project Kickoff',
    backgroundColor: "${tailwind.theme.colors.blue[200]}",
    textColor: "${tailwind.theme.colors.blue[900]}",
  },
  {
    id: '2',
    date: subMonths(endOfMonth(today), 2),
    label: 'Phase 1 Completion',
    backgroundColor: "${tailwind.theme.colors.green[200]}",
    textColor: "${tailwind.theme.colors.green[900]}",
  },
  {
    id: '3',
    date: startOfMonth(addMonths(today, 3)),
    label: 'Beta Release',
    backgroundColor: "${tailwind.theme.colors.purple[200]}",
    textColor: "${tailwind.theme.colors.purple[900]}",
  },
  {
    id: '4',
    date: endOfMonth(addMonths(today, 6)),
    label: 'Version 1.0 Launch',
    backgroundColor: "${tailwind.theme.colors.red[200]}",
    textColor: "${tailwind.theme.colors.red[900]}",
  },
  {
    id: '5',
    date: startOfMonth(addMonths(today, 9)),
    label: 'User Feedback Review',
    backgroundColor: "${tailwind.theme.colors.orange[200]}",
    textColor: "${tailwind.theme.colors.orange[900]}",
  },
  {
    id: '6',
    date: endOfMonth(addMonths(today, 12)),
    label: 'Annual Performance Evaluation',
    backgroundColor: "${tailwind.theme.colors.teal[200]}",
    textColor: "${tailwind.theme.colors.teal[900]}",
  },
]`;

export const tailwindConfig = `module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@roadmap-ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}`;

export const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --success: 120 100% 30%;
    --success-foreground: 0 0% 98%;
    --warning: 30 100% 50%;
    --warning-foreground: 0 0% 98%;
    --info: 200 100% 30%;
    --info-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

html, body, #__next {
  height: 100%;
}
`;

export const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;
