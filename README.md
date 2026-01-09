# Gym Tracker - Progressive Web App

A clean, minimal web application for logging gym workouts with calendar-based visualization, progressive overload tracking, and exercise history analysis.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173/`

## ✅ Phase 1: Core Foundation (COMPLETED)

### What's Implemented

#### 1. Project Setup
- ✅ React 18 + TypeScript + Vite
- ✅ Modern build tooling and configuration
- ✅ ESLint setup

#### 2. Data Layer
- ✅ IndexedDB integration using `idb` library
- ✅ Complete database schema with 5 object stores:
  - `exercises` - Exercise database with indexes
  - `workoutSessions` - Workout session logs
  - `exerciseHistory` - Progress tracking per exercise
  - `userGoals` - Streak and goal configuration
  - `templates` - Saved workout templates

#### 3. Exercise Database
- ✅ 170 comprehensive exercises covering:
  - Chest (16 exercises)
  - Back (22 exercises)
  - Shoulders (19 exercises)
  - Arms - Biceps & Triceps (25 exercises)
  - Legs - Quads, Hamstrings, Glutes, Calves (42 exercises)
  - Core - Abs & Obliques (18 exercises)
  - Forearms (5 exercises)
  - Additional compound lifts and variations (23 exercises)
- ✅ Each exercise tagged with:
  - Primary muscle group (16 anatomical groups)
  - Category (barbell, dumbbell, machine, cable, bodyweight)
  - Common rep ranges

#### 4. TypeScript Type System
- ✅ Complete type definitions for all data models
- ✅ Strict type checking enabled
- ✅ 16 muscle groups with color palette

#### 5. UI Foundation
- ✅ App shell with sidebar navigation
- ✅ Collapsible sidebar (240px expanded, 64px collapsed)
- ✅ Three main sections: Calendar, Progress, Goals
- ✅ Clean monochrome design with blue accent color
- ✅ CSS custom properties for theming

#### 6. Calendar View
- ✅ Month view with full calendar grid
- ✅ Navigation controls (Previous/Next/Today)
- ✅ Date selection with visual feedback
- ✅ Today highlighting
- ✅ Responsive grid layout
- ✅ "Log Workout" button for selected date

## ✅ Phase 4 & 5: Progressive Overload & Progress Charts (COMPLETED)

### What's Implemented

#### 1. Set-Level PR Indicators
- ✅ Individual set PR badges ("PR" badge on sets that are personal records)
- ✅ Matched previous best indicators (✓ checkmark)
- ✅ Pulsing animation on PR badges for visual celebration
- ✅ Real-time PR detection as sets are logged
- ✅ Compare against exercise history automatically
- ✅ Green/orange color coding matching overall design

#### 2. Exercise List Component
- ✅ Grid view of all exercises with logged history
- ✅ Search functionality to filter exercises
- ✅ Display key stats for each exercise:
  - Current PR weight
  - Total sessions performed
  - Last performed date
- ✅ Muscle group color badges
- ✅ Sortedby last performed (most recent first)
- ✅ Empty state for new users
- ✅ "View Progress" navigation

#### 3. Progression Charts
- ✅ Line chart showing weight progression over time
- ✅ X-axis: Date timeline
- ✅ Y-axis: Weight in pounds
- ✅ Interactive tooltips with:
  - Date
  - Max weight
  - Total volume
  - Set count
- ✅ Responsive chart sizing
- ✅ Smooth animations
- ✅ Blue accent color matching app theme

#### 4. Exercise Detail Pages
- ✅ Comprehensive statistics dashboard:
  - Personal Record with date
  - Total sessions count
  - Average volume per session
  - Last performed date
- ✅ Full progression chart
- ✅ Complete session history list
- ✅ Each session shows:
  - Date
  - Max weight
  - Set count
  - Total volume
- ✅ Back navigation to exercise list
- ✅ Muscle group and category badges

#### 5. Progress Tab Integration
- ✅ Seamless navigation between list and detail views
- ✅ State management for selected exercise
- ✅ Back button functionality
- ✅ Fully integrated with IndexedDB
- ✅ Real-time data updates

## ✅ Phase 7: Polish & Optimization (COMPLETED)

### What's Implemented

#### 1. Loading States & UX Improvements
- ✅ LoadingSpinner component with three sizes (small, medium, large)
- ✅ Spinning animation with accent color
- ✅ Optional loading text display
- ✅ Replaced all placeholder loading states with spinner component
- ✅ Applied to: ExerciseList, ExerciseDetail, GoalsView, TemplateManager

#### 2. Error Handling
- ✅ ErrorBoundary class component for React error catching
- ✅ Graceful error UI with icon and message
- ✅ "Try Again" and "Reload Page" recovery options
- ✅ Wrapped all major views (Calendar, Progress, Goals) in error boundaries
- ✅ Console error logging for debugging
- ✅ Prevents full app crashes from component errors

#### 3. Toast Notification System
- ✅ Toast context provider for global notifications
- ✅ Four toast types: success, error, warning, info
- ✅ Color-coded with icons (✓, ✕, ⚠, ℹ)
- ✅ Auto-dismiss after configurable duration (default 3s)
- ✅ Manual close button
- ✅ Fixed position top-right container
- ✅ Slide-in animation from right
- ✅ useToast hook for easy access from any component
- ✅ Helper methods: success(), error(), info(), warning()

#### 4. Smooth Transitions
- ✅ FadeTransition component for view changes
- ✅ Fade-in + subtle translateY animation
- ✅ Configurable duration (default 300ms)
- ✅ Applied to all main view transitions (Calendar, Progress, Goals)
- ✅ Key-based re-mounting for proper animation triggers

#### 5. Performance Optimizations
- ✅ React.memo applied to heavy components:
  - ExerciseCard (frequent re-renders during workout logging)
  - SetEntry (multiple instances per exercise)
  - ProgressionChart (chart re-rendering prevention)
- ✅ Prevents unnecessary re-renders of child components
- ✅ Improved performance during workout logging with many exercises/sets

#### 6. Accessibility Improvements
- ✅ ARIA labels on all interactive elements
- ✅ Sidebar navigation:
  - aria-label for screen readers
  - aria-current="page" for active section
  - aria-expanded for collapse button
  - aria-hidden="true" for decorative icons
- ✅ Search inputs with aria-label
- ✅ Exercise cards with descriptive aria-label
- ✅ Keyboard navigation support maintained
- ✅ Semantic HTML structure

#### 7. Mobile Responsiveness
- ✅ Touch-friendly button sizes (minimum 44×44px)
- ✅ Smooth scrolling behavior
- ✅ Horizontal overflow prevention
- ✅ Bottom padding on mobile for comfortable scrolling
- ✅ Responsive breakpoints respected across all components
- ✅ prefers-reduced-motion media query support:
  - Disables animations for users who prefer reduced motion
  - Accessibility compliance

#### 8. Build & Bundle Optimization
- ✅ TypeScript strict mode compilation
- ✅ Production build optimization
- ✅ Bundle size: ~614KB (173KB gzipped)
- ✅ CSS optimization: ~51KB (7KB gzipped)
- ✅ Clean build with no errors
- ✅ Hot module reload working in development

## ✅ Phase 6: Templates & Goals (COMPLETED)

### What's Implemented

#### 1. Goals & Streak Tracking
- ✅ Weekly workout goals configuration
- ✅ Editable weekly target (workouts per week)
- ✅ Current streak calculation (consecutive days with workouts)
- ✅ Longest streak tracking (personal best)
- ✅ Weekly progress bar with visual feedback
- ✅ Goal achievement celebration badge
- ✅ Total workout count (all time)
- ✅ Dynamic motivational messages based on progress

#### 2. Goals Dashboard
- ✅ "This Week" progress card with:
  - Current workout count vs target
  - Visual progress bar
  - Dynamic color coding (blue → green when goal met)
  - Week date range display
- ✅ Streak statistics cards:
  - Current streak with fire emoji
  - Longest streak with trophy
  - Total workouts counter
- ✅ Hover effects and animations on all cards

#### 3. Workout Templates
- ✅ Template creation from current workout
- ✅ Save templates with custom names
- ✅ Template manager modal interface
- ✅ Template library with all saved templates
- ✅ Template cards showing:
  - Template name
  - List of exercises with sets × reps
  - Last used weights
  - Creation date
  - Exercise count
- ✅ Delete template functionality with confirmation
- ✅ Template usage: load template into current workout

#### 4. Template Integration in DayView
- ✅ "Use Template" button in empty state
- ✅ "Templates" button when workout has exercises
- ✅ Load template exercises into current session
- ✅ Pre-populate sets with previous weights and rep ranges
- ✅ Seamless integration with auto-save system
- ✅ Templates append to existing exercises (don't replace)

#### 5. Data Persistence
- ✅ Templates stored in IndexedDB
- ✅ Goals configuration persisted
- ✅ Streak data automatically calculated from workout history
- ✅ Real-time updates across all views

## ✅ Phase 3: Calendar & Navigation (COMPLETED)

### What's Implemented

#### 1. Week View
- ✅ 7-day horizontal card layout
- ✅ Workout summaries per day (exercise count, total volume)
- ✅ Expandable workout details
- ✅ Exercise list with set counts
- ✅ Quick "Add Workout" button for empty days
- ✅ "Edit Workout" button for logged days
- ✅ Responsive grid (7 columns → 4 → 2 → 1)
- ✅ Visual feedback for today and selected dates
- ✅ Auto-load workout sessions for the week

#### 2. Month View Enhancements
- ✅ Workout indicators (colored dots)
- ✅ PR detection with color coding:
  - Green: Personal Record achieved
  - Orange: Matched previous best
  - Red: Below previous weights
  - Gray: No comparison data
- ✅ Animated dot appearance
- ✅ Hover tooltips showing exercise count
- ✅ Visual distinction for days with workouts

#### 3. View Switching
- ✅ Toggle between Month and Week views
- ✅ Dedicated view switcher with active state
- ✅ Previous/Next navigation adapts to view mode
- ✅ Month navigation for Month view
- ✅ Week navigation for Week view
- ✅ Today button works across all views
- ✅ View state persists during session

#### 4. PR Detection System
- ✅ Utility functions for PR status detection
- ✅ Compare current max weight vs historical
- ✅ Session-level PR status (prioritize best result)
- ✅ Exercise-level PR status
- ✅ Color mapping for visual feedback
- ✅ Automatic detection on workout save

#### 5. Enhanced Date Navigation
- ✅ Context-aware Previous/Next buttons
- ✅ Navigate months in Month view
- ✅ Navigate weeks in Week view
- ✅ Selected date persists across view changes
- ✅ Smooth transitions between views

## ✅ Phase 2: Workout Logging (COMPLETED)

### What's Implemented

#### 1. Day View Workout Editor
- ✅ Full workout logging interface for selected date
- ✅ Add/remove exercises to workout session
- ✅ Expandable exercise cards with set management
- ✅ Auto-save with 500ms debounce to IndexedDB
- ✅ Back navigation to calendar view
- ✅ Session metadata tracking (start time, end time)

#### 2. Exercise Selector
- ✅ Searchable exercise database with fuzzy matching
- ✅ Category filters (All, Barbell, Dumbbell, Machine, Cable, Bodyweight)
- ✅ Real-time search filtering
- ✅ Grouped display by category
- ✅ Muscle group badges with color coding
- ✅ Common rep ranges display
- ✅ 170 exercises instantly searchable

#### 3. Set Entry Interface
- ✅ Quick-add set functionality
- ✅ +/- stepper buttons for reps (±1)
- ✅ +/- stepper buttons for weight (±2.5 lbs)
- ✅ Direct number input for precise values
- ✅ Inherits previous set values automatically
- ✅ Complete/incomplete set tracking
- ✅ Delete individual sets
- ✅ Set numbering and reordering
- ✅ Visual feedback for completed sets

#### 4. Exercise Cards
- ✅ Collapsible exercise sections
- ✅ Muscle group badges with colors
- ✅ Total volume calculation (sets × reps × weight)
- ✅ Set count display
- ✅ Delete entire exercise
- ✅ Empty state handling

#### 5. Real-time Muscle Group Indicators
- ✅ Fixed header bar showing active muscle groups
- ✅ Dynamic badge updates as exercises are added
- ✅ Colored badges matching muscle group palette
- ✅ Total muscle group count display
- ✅ Smooth animations when badges appear

#### 6. Data Persistence
- ✅ Auto-save to IndexedDB (500ms debounce)
- ✅ Load existing workout sessions by date
- ✅ Create new sessions automatically
- ✅ Exercise history updates on save
- ✅ No data loss on page refresh

## 📊 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Data Storage**: IndexedDB (via `idb` library)
- **Date Utilities**: `date-fns`
- **Charts** (upcoming): Recharts
- **Styling**: CSS Modules + Custom Properties

## 🎨 Design System

### Color Palette
- **Background**: #FFFFFF
- **Surface**: #F5F5F5
- **Text Primary**: #1A1A1A
- **Text Secondary**: #666666
- **Border**: #E0E0E0
- **Accent**: #2563EB (vibrant blue)

### Progressive Overload Colors
- **Green (#10B981)**: Personal Record
- **Orange (#F59E0B)**: Matched previous best
- **Red (#EF4444)**: Regression/deload

### Spacing Scale
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 📁 Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx       # Main calendar container
│   │   ├── MonthView.tsx          # Month grid view
│   │   ├── MonthView.css
│   │   └── CalendarView.css
│   ├── Progress/
│   │   └── ProgressView.tsx       # Progress section (placeholder)
│   ├── Goals/
│   │   └── GoalsView.tsx          # Goals section (placeholder)
│   └── Shared/
│       ├── Sidebar.tsx            # Navigation sidebar
│       └── Sidebar.css
├── data/
│   ├── exercises.ts               # 170 exercise database
│   └── muscleGroups.ts            # Muscle group definitions & colors
├── db/
│   ├── schema.ts                  # IndexedDB schema definition
│   └── indexedDB.ts               # Database queries & operations
├── types/
│   └── index.ts                   # TypeScript type definitions
├── App.tsx                        # Main app component
├── App.css
├── main.tsx                       # App entry point
└── index.css                      # Global styles
```

## 🔧 Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Run TypeScript type checking
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 📝 Database Schema

### Object Stores

1. **exercises**
   - Key: `id`
   - Indexes: `by-name`, `by-muscle-group`, `by-category`
   - Pre-populated with 170 exercises on first run

2. **workoutSessions**
   - Key: `id`
   - Indexes: `by-date`, `by-start-time`
   - Stores complete workout sessions with exercises and sets

3. **exerciseHistory**
   - Key: `exerciseId`
   - Tracks PRs and session history per exercise

4. **userGoals**
   - Key: singleton (`user-goals-singleton`)
   - Stores workout goals and streak data

5. **templates**
   - Key: `id`
   - Indexes: `by-created-date`
   - Saved workout templates for quick logging

## 🎯 Feature Roadmap

### Phase 2: Workout Logging ✅ (COMPLETED)
- [✅] Day view workout editor
- [✅] Exercise search and selection
- [✅] Set entry UI with steppers
- [✅] Real-time muscle group indicators
- [✅] Auto-save functionality

### Phase 3: Calendar & Navigation ✅ (COMPLETED)
- [✅] Week view implementation
- [✅] Month view workout indicators
- [✅] Day/week/month view switching
- [✅] Enhanced date navigation
- [✅] PR detection system

### Phase 4: Progressive Overload (Next)
- [ ] PR detection algorithm
- [ ] Color indicators on calendar
- [ ] Color indicators on sets
- [ ] Historical comparison logic

### Phase 5: Progress & Charts
- [ ] Progress tab implementation
- [ ] Exercise history aggregation
- [ ] Weight progression charts
- [ ] Exercise detail pages

### Phase 6: Templates & Goals ✅ (COMPLETED)
- [✅] Template creation and saving
- [✅] Workout copying functionality
- [✅] Goals configuration
- [✅] Streak calculation display
- [✅] Goals dashboard

### Phase 7: Polish & Optimization ✅ (COMPLETED)
- [✅] Responsive design refinements
- [✅] Loading states and transitions
- [✅] Error handling
- [✅] Performance optimization
- [✅] Accessibility improvements

## 📖 Documentation

See [SPEC.md](./SPEC.md) for complete technical specification including:
- Detailed feature requirements
- UI/UX specifications
- Data models
- Implementation phases
- Algorithm details

## 🤝 Contributing

This is a personal project. The codebase follows:
- TypeScript strict mode
- Functional React components with hooks
- CSS Modules for styling
- Clear separation of concerns

## 📄 License

Private project - all rights reserved.

---

**Current Status**: Phase 7 Complete ✅ - All Features Implemented!
**Application is production-ready** with complete functionality, polish, and optimization.

## 🎉 What You Can Do Now

With all 7 phases complete, you have a fully-featured, polished gym tracking application:

1. **Multiple Calendar Views**
   - Toggle between Month and Week views
   - Navigate months or weeks with Previous/Next buttons
   - Jump to today with one click
   - See colored workout indicators on Month view
   - View detailed workout cards in Week view

2. **Smart Workout Tracking**
   - Green dots = Personal Records (PRs)
   - Orange dots = Matched previous best
   - Red dots = Below previous weights
   - Gray dots = First time logging exercise
   - Automatic PR detection on every save

3. **Browse Workout History**
   - Month View: See all workouts with colored status indicators
   - Week View: Expand cards to see exercise details and volume
   - Click any date to view or edit the workout
   - Hover over indicators to see exercise counts

4. **Log Complete Workouts**
   - Click "Log Workout" from Month view
   - Click "Add" or "Edit Workout" from Week view
   - Search through 170 exercises with instant filtering
   - Filter by equipment category
   - Add multiple exercises to your session

5. **Track Sets and Reps**
   - Use +/- buttons for quick entry (reps ±1, weight ±2.5 lbs)
   - Type exact values for precision
   - Mark sets as complete with checkmark
   - Delete individual sets or entire exercises

6. **See Muscle Groups in Real-Time**
   - Watch the header bar populate with colored badges
   - See which muscle groups you're training
   - Get instant visual feedback on workout balance

7. **Automatic Data Saving & PR Detection**
   - All changes auto-save to your browser (IndexedDB)
   - PRs automatically detected and displayed
   - Return to any date to view/edit past workouts
   - No data loss - everything persists locally

8. **Track Your Progress**
   - View exercise history with progression charts
   - See personal records and statistics for each exercise
   - Interactive charts showing weight progression over time
   - Detailed session history with volume and set counts

9. **Set and Achieve Goals**
   - Configure weekly workout targets (1-7 workouts per week)
   - Track current workout streak (consecutive days)
   - View longest streak (personal best)
   - Visual progress bar showing weekly progress
   - Celebration badge when you hit your weekly goal
   - Motivational messages based on your progress

10. **Use Workout Templates**
   - Save current workout as a template for future use
   - Create templates for common workout routines (Push Day, Leg Day, etc.)
   - Quick-start workouts by loading saved templates
   - Templates include exercises, sets, reps, and last weights used
   - Manage template library (view, use, delete)
   - Templates work alongside manual exercise entry
