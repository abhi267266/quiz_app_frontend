# QuizMaster - Quiz App Dashboard

A modern, minimal, and attractive quiz app dashboard built with Next.js, Tailwind CSS, shadcn/ui, and Zustand for state management.

## Features

- 🎯 **Clean Dashboard UI** - Minimal and motivating design
- 🎨 **Modern Color Scheme** - Cheerful blue primary, soft green secondary
- 📱 **Responsive Design** - Works perfectly on mobile and desktop
- 🔄 **State Management** - Zustand store for selected subject and exam
- 🎭 **UI Components** - Built with shadcn/ui for consistency
- 🎨 **Tailwind CSS** - Utility-first CSS framework for styling

## Color Palette

- **Primary**: `#3B82F6` (Cheerful Blue) - Buttons and highlights
- **Secondary**: `#10B981` (Soft Green) - Success indicators
- **Background**: `#F9FAFB` (Light Neutral) - Main background
- **Text**: `#111827` (Dark Gray) - Primary text

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd quiz_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
quiz_app/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx     # Button component
│   │   ├── card.tsx       # Card component
│   │   └── select.tsx     # Select component
│   └── Dashboard.tsx      # Main dashboard component
├── lib/                   # Utility functions and stores
│   ├── store.ts           # Zustand store
│   └── utils.ts           # Utility functions
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Adding New Subjects
Edit the `subjects` array in `components/Dashboard.tsx`:

```typescript
const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  // Add your new subject here
  { value: 'new-subject', label: 'New Subject' },
]
```

### Adding New Exams
Edit the `exams` array in `components/Dashboard.tsx`:

```typescript
const exams = [
  { value: 'ssc', label: 'SSC' },
  { value: 'upsc', label: 'UPSC' },
  // Add your new exam here
  { value: 'new-exam', label: 'New Exam' },
]
```

### Changing Colors
Update the color values in `tailwind.config.js` and `app/globals.css`.

## State Management

The app uses Zustand for state management with the following store structure:

```typescript
interface QuizState {
  selectedSubject: string
  selectedExam: string
  setSelectedSubject: (subject: string) => void
  setSelectedExam: (exam: string) => void
  resetSelections: () => void
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please open an issue in the repository.
