# Gym Workout Tracker - Technical Specification

## Overview
A web application for logging gym workouts with calendar-based visualization, progressive overload tracking, and exercise history analysis. Built as a Chrome-optimized web app for macOS.

## Core Requirements

### User Experience
- Clean, minimal design with monochrome base (black/white/gray palette)
- Single vibrant blue accent color for interactive elements
- Contextual use of red/orange/green for progressive overload indicators
- Responsive layout optimized for Chrome browser on Mac

### Primary Features
1. Calendar-based workout logging (day/week/month views)
2. Intelligent exercise tracking with muscle group awareness
3. Progressive overload monitoring with visual indicators
4. Exercise progression charts and history
5. Workout templates and session copying
6. Streak tracking with custom weekly goals

---

## Technical Architecture

### Technology Stack
- **Frontend Framework**: React 18+ with TypeScript
- **State Management**: React Context API + useReducer (or Zustand for cleaner global state)
- **Data Persistence**: IndexedDB (using idb library wrapper)
- **Styling**: CSS Modules or Tailwind CSS for utility-first approach
- **Charts**: Recharts or Chart.js for progression visualization
- **Build Tool**: Vite for fast development and optimized builds
- **Date Handling**: date-fns for lightweight date manipulation

### Data Storage
- **Client-side only**: All data stored in IndexedDB
- **No backend**: Fully offline-capable web application
- **Auto-save**: Debounced auto-save (500ms delay) after each user action
- **No authentication**: Single-user app per browser/device

---

## Data Models

### Exercise Database Schema
```typescript
interface Exercise {
  id: string;
  name: string;
  primaryMuscleGroup: MuscleGroup;
  category: 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight';
  commonRepRanges?: string; // e.g., "8-12", "5x5"
}

type MuscleGroup =
  | 'front-delts' | 'side-delts' | 'rear-delts'
  | 'upper-chest' | 'mid-chest' | 'lower-chest'
  | 'lats' | 'upper-back' | 'mid-back' | 'lower-back'
  | 'biceps' | 'triceps' | 'forearms'
  | 'quads' | 'hamstrings' | 'glutes' | 'calves'
  | 'abs' | 'obliques';
```

**Exercise Database Size**: 150-200 comprehensive gym exercises including:
- Compound barbell lifts (bench, squat, deadlift, overhead press, rows, etc.)
- Dumbbell movements (presses, rows, curls, flyes, etc.)
- Machine exercises (leg press, lat pulldown, cable crossovers, etc.)
- Bodyweight exercises (pull-ups, dips, push-ups, planks, etc.)

### Workout Session Schema
```typescript
interface WorkoutSession {
  id: string;
  date: Date;
  startTime: Date;
  endTime?: Date;
  exercises: ExerciseLog[];
  autoGrouped: boolean; // true if grouped by 2-hour proximity
}

interface ExerciseLog {
  id: string;
  exerciseId: string; // reference to Exercise
  exerciseName: string;
  sets: SetLog[];
  notes?: string;
  timestamp: Date;
}

interface SetLog {
  setNumber: number;
  reps: number;
  weight: number; // in pounds
  completed: boolean;
}
```

### User Progress Schema
```typescript
interface ExerciseHistory {
  exerciseId: string;
  personalRecords: {
    maxWeight: number;
    date: Date;
  };
  sessions: {
    date: Date;
    maxWeight: number;
    totalVolume: number;
    sets: number;
  }[];
}

interface UserGoals {
  workoutsPerWeek: number; // e.g., 3, 4, 5
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate?: Date;
}
```

### Auto-grouping Logic
- Exercises logged within **2 hours** of each other are automatically grouped into a single workout session
- Grouping happens dynamically when new exercises are added
- If user logs an exercise more than 2 hours after the last one, a new session is created
- Sessions can be manually split or merged if needed

---

## UI Components & Navigation

### Main Layout
```
┌─────────────────────────────────────────────────────┐
│  [Logo] Gym Tracker                    [User Goals] │
├───────────┬─────────────────────────────────────────┤
│           │                                         │
│ Sidebar   │         Main Content Area              │
│           │                                         │
│ • Calendar│                                         │
│ • Progress│                                         │
│ • Goals   │                                         │
│           │                                         │
│           │                                         │
└───────────┴─────────────────────────────────────────┘
```

### Sidebar Navigation (Collapsible)
- **Calendar** (default view)
  - Day View
  - Week View
  - Month View
- **Progress**
  - Exercise History
  - Progression Charts
- **Goals**
  - Weekly Target
  - Streak Tracking
  - Workout Frequency Stats

---

## Feature Specifications

### 1. Calendar Views

#### Month View
- **Layout**: 7-column grid with day cells
- **Cell Content**:
  - Date number
  - Colored dot indicators for workouts
  - Hover shows brief summary (e.g., "Upper Body - 5 exercises")
- **Progressive Overload Colors**:
  - **Green**: Session contains at least one PR
  - **Orange**: Matched previous weights
  - **Red**: Regression (lower weight than previous session)
  - **Gray**: Workout logged but no comparison data yet
- **Interactions**:
  - Click date to select day (highlights border)
  - Click '+' button (appears on hover or in header when day selected) to log workout
  - Double-click to jump to day view

#### Week View
- **Layout**: Horizontal 7-day row with expandable cards
- **Card Content**:
  - Day name and date
  - List of exercises with set counts (e.g., "Bench Press - 4 sets")
  - Volume summary (total weight lifted)
  - Colored border based on progressive overload status
- **Interactions**:
  - Click card to expand and show full exercise details
  - '+' button to add workout
  - Click exercise name to see quick stats

#### Day View
- **Layout**: Single day focus with full workout editor
- **Content**:
  - Date header with navigation arrows (prev/next day)
  - Full editable exercise list with all sets/reps/weights
  - Add exercise button
  - Session metadata (start time, duration, total volume)
- **Primary workout logging interface**

### 2. Workout Logging Flow

#### Creating New Workout
1. Navigate to desired date in calendar
2. Click '+' button (appears when day is selected)
3. Opens workout logging interface for that date

#### Exercise Selection
- **Searchable dropdown** with autocomplete
- **Fuzzy search** matching exercise names
- **Grouped by category** (Barbell, Dumbbell, Machine, etc.)
- **Favorites/Recent** section at top (based on usage frequency)
- Select exercise → automatically adds it to workout session

#### Set Entry Interface
```
┌─────────────────────────────────────────────────┐
│ Bench Press [Front Delts] [Mid Chest] [Triceps]│
│                                          [Edit] │
├─────────────────────────────────────────────────┤
│  Set 1:  8 reps × 185 lbs            ✓ [×]     │
│  Set 2:  8 reps × 185 lbs            ✓ [×]     │
│  Set 3:  7 reps × 185 lbs            ✓ [×]     │
│  Set 4:  6 reps × 185 lbs            ✓ [×]     │
│                                                 │
│  [+ Add Set]                                    │
└─────────────────────────────────────────────────┘
```

**Set Entry Controls**:
- Each set shows: Set #, Reps, Weight
- **Quick-add flow**:
  1. Click "+ Add Set" button
  2. New set appears with previous set's values pre-filled
  3. Use +/- stepper buttons to adjust reps and weight
  4. Or click number to type directly
  5. Checkmark to confirm set completion
- **Weight steppers**: +/- 2.5 lbs increments (standard plate increment)
- **Rep steppers**: +/- 1 rep
- Auto-save with 500ms debounce

#### Real-time Muscle Group Indicators
- **Fixed header bar** at top of workout logging screen
- Shows colored **badges** for each muscle group being trained
- Badges appear as exercises are added
- Example: `[Front Delts] [Mid Chest] [Triceps] [Biceps] [Lats]`
- Each muscle group has assigned color (from 16-color palette)
- Helps user balance workout in real-time

### 3. Progressive Overload Tracking

#### PR Detection Logic
- **Personal Record (PR)** = Highest weight lifted for an exercise (any rep count)
- Comparison: Check if today's max weight > historical max weight for that exercise
- **Color Indicators**:
  - **Green**: New PR set (any set weight > previous best)
  - **Orange**: Matched previous best weight
  - **Red**: All sets below previous weights (regression/deload)
- Indicators appear:
  - Next to specific sets that are PRs
  - On calendar cells (session-level indicator)
  - In exercise cards (most recent session status)

### 4. Workout Templates & Copying

#### Template Features
- **Save as Template**: From any completed workout, click "Save as Template"
- **Template Library**: Accessible from sidebar, shows all saved templates
- **Copy Previous Workout**: Quick action to duplicate any past workout

#### What Gets Copied
1. **Exercise selection and order**: Exact sequence of exercises
2. **Target sets and reps**: Number of sets and rep targets
3. **Previous weights**: Pre-filled weight values from that session

#### Template Application
- Select template → Choose target date → Populates workout with template data
- All values are editable before/during workout
- Sets inherit previous values when added

### 5. Exercise Progression Charts

#### Access via Progress Tab
- Navigate to **Progress** section in sidebar
- Shows **list of all exercises** you've logged (sorted by recency)
- Search/filter exercises
- Click exercise → Opens detailed progression view

#### Chart Display
- **Line chart** showing weight progression over time
- **X-axis**: Date (time-based)
- **Y-axis**: Weight (lbs)
- **Data points**: Max weight from each session for that exercise
- **Trend line** (optional): Linear regression showing overall progress
- **Annotations**: PRs marked with star icon
- **Date range selector**: Last 30/90 days, All time, Custom range

#### Additional Stats on Exercise Page
- Current PR with date
- Total sessions logged
- Average weight across all sessions
- Total volume (all-time)
- Last performed date

### 6. Streak Tracking & Goals

#### Goal Configuration
- **Setting**: "Workouts per Week" (user-defined number, e.g., 3, 4, 5)
- Accessible from Goals tab in sidebar
- Simple number input

#### Streak Calculation
- **Week definition**: Monday-Sunday
- **Streak maintained**: User hits their weekly workout target
- **Streak breaks**: Week ends without hitting target
- **Current streak**: Consecutive weeks hitting goal
- **Longest streak**: Historical best

#### Goals Dashboard
```
┌─────────────────────────────────────────┐
│  Current Streak: 🔥 8 weeks            │
│  Longest Streak: 12 weeks              │
│                                         │
│  This Week: 3 / 4 workouts             │
│  [Mon] [Tue] [ ] [Thu] [ ] [ ] [ ]     │
│                                         │
│  Need 1 more workout to maintain streak│
└─────────────────────────────────────────┘
```

### 7. Rest Day Visualization
- **No explicit rest day marking**
- Calendar simply shows **gaps** (empty dates) between workouts
- User can visually identify rest patterns
- Optional: Slight background tint on empty dates to distinguish from future dates

---

## UI/UX Details

### Color System

#### Base Palette (Monochrome)
- **Background**: #FFFFFF (light mode) / #1A1A1A (dark mode)
- **Surface**: #F5F5F5 / #2A2A2A
- **Text Primary**: #1A1A1A / #FFFFFF
- **Text Secondary**: #666666 / #999999
- **Border**: #E0E0E0 / #404040

#### Accent Color
- **Primary Blue**: #2563EB (vibrant, high contrast)
- Used for: buttons, links, active states, selected items

#### Progressive Overload Colors
- **Green (PR)**: #10B981
- **Orange (Matched)**: #F59E0B
- **Red (Regression)**: #EF4444

#### Muscle Group Color Palette (16 colors)
Assign distinct, visually differentiable colors to each muscle group:
- Front Delts: #FF6B6B
- Side Delts: #FF8E53
- Rear Delts: #FFAA5C
- Upper Chest: #4ECDC4
- Mid Chest: #44A8B3
- Lower Chest: #3A7D8A
- Lats: #9B59B6
- Upper Back: #8E44AD
- Mid Back: #7D3C98
- Lower Back: #6C3483
- Biceps: #3498DB
- Triceps: #2980B9
- Forearms: #1F618D
- Quads: #27AE60
- Hamstrings: #229954
- Glutes: #1E8449
- Calves: #F39C12
- Abs: #E67E22
- Obliques: #D35400

### Typography
- **Primary Font**: System font stack for performance
  - macOS: -apple-system, BlinkMacSystemFont, "Segoe UI"
- **Headings**: 600-700 weight
- **Body**: 400 weight
- **Numbers** (weights/reps): Tabular nums for alignment

### Spacing
- **Base unit**: 4px
- **Component padding**: 12-16px
- **Section gaps**: 24-32px
- **Consistent use of spacing scale**: 4, 8, 12, 16, 24, 32, 48, 64px

### Interactive Elements
- **Buttons**:
  - Primary: Blue background, white text, rounded corners
  - Secondary: Gray border, transparent background
  - Icon buttons: Minimal, hover shows background
- **Inputs**:
  - Clean borders, focus states with blue outline
  - Steppers for numbers (weight/reps)
- **Hover states**: Subtle background color change
- **Active/Selected**: Blue accent color

---

## Empty State & First Use

### Initial Load (No Data)
```
┌─────────────────────────────────────────────────┐
│                                                 │
│              💪 Gym Tracker                     │
│                                                 │
│         No workouts logged yet                  │
│                                                 │
│     [Log Your First Workout]                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

- Shows empty calendar with current date highlighted
- Prominent "Log Your First Workout" button centered
- Self-explanatory, no explicit tutorial
- After first workout, app behaves normally

---

## Implementation Phases

### Phase 1: Core Foundation
1. Project setup (React + TypeScript + Vite)
2. IndexedDB setup and data layer
3. Exercise database population (150-200 exercises)
4. Basic calendar grid (month view)
5. Data models and TypeScript interfaces

### Phase 2: Workout Logging
1. Day view workout editor
2. Exercise search and selection
3. Set entry UI with quick-add +/- buttons
4. Auto-save functionality
5. Real-time muscle group indicators (header badges)

### Phase 3: Calendar & Navigation
1. Week view implementation
2. Month view with workout indicators
3. Sidebar navigation
4. Day/week/month view switching
5. Date navigation and selection

### Phase 4: Progressive Overload
1. PR detection algorithm
2. Color indicators on calendar
3. Color indicators on sets
4. Historical comparison logic

### Phase 5: Progress & Charts
1. Progress tab/section
2. Exercise history data aggregation
3. Chart component integration
4. Weight progression visualization
5. Exercise detail pages

### Phase 6: Templates & Goals
1. Template creation and saving
2. Workout copying functionality
3. Template library
4. Goals configuration
5. Streak calculation and display
6. Goals dashboard

### Phase 7: Polish & Optimization
1. Responsive design refinements
2. Loading states and transitions
3. Error handling
4. Performance optimization (IndexedDB queries, render optimization)
5. Accessibility improvements
6. Edge case handling

---

## Technical Considerations

### IndexedDB Structure
```
Database: GymTrackerDB

Stores:
  1. exercises (keyPath: id)
     - Indexes: name, primaryMuscleGroup, category

  2. workoutSessions (keyPath: id)
     - Indexes: date, startTime

  3. exerciseHistory (keyPath: exerciseId)
     - For quick PR lookups and progression data

  4. userGoals (keyPath: "singleton")
     - Single record for user preferences

  5. templates (keyPath: id)
     - Saved workout templates
```

### Auto-grouping Algorithm
```typescript
function autoGroupExercises(exercises: ExerciseLog[]): WorkoutSession[] {
  const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 hours in ms
  const sessions: WorkoutSession[] = [];
  let currentSession: ExerciseLog[] = [];
  let lastTimestamp: Date | null = null;

  exercises.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  for (const exercise of exercises) {
    if (lastTimestamp &&
        exercise.timestamp.getTime() - lastTimestamp.getTime() > TWO_HOURS) {
      // Start new session
      sessions.push(createSession(currentSession));
      currentSession = [];
    }
    currentSession.push(exercise);
    lastTimestamp = exercise.timestamp;
  }

  if (currentSession.length > 0) {
    sessions.push(createSession(currentSession));
  }

  return sessions;
}
```

### PR Detection Algorithm
```typescript
function detectPR(exerciseId: string, currentMaxWeight: number): PRStatus {
  const history = getExerciseHistory(exerciseId);
  if (!history) return 'NO_DATA';

  const previousBest = history.personalRecords.maxWeight;

  if (currentMaxWeight > previousBest) return 'PR'; // Green
  if (currentMaxWeight === previousBest) return 'MATCHED'; // Orange
  if (currentMaxWeight < previousBest) return 'REGRESSION'; // Red

  return 'NO_DATA';
}
```

### Performance Optimizations
- **Virtual scrolling** for long exercise lists (if needed)
- **Memoization** of expensive computations (chart data, streak calculations)
- **Debounced auto-save** to reduce IndexedDB writes
- **Lazy loading** of chart library (code splitting)
- **Indexed queries** for fast date-range lookups in calendar

### Browser Compatibility
- **Target**: Chrome on macOS (latest version)
- **Minimum**: Chrome 90+ (for stable IndexedDB and modern React features)
- No need for extensive cross-browser testing

---

## Future Enhancements (Out of Scope for V1)
- Cloud sync and multi-device support
- Export data (CSV, JSON)
- Workout notes and photos
- Social features (sharing workouts)
- Exercise demonstration videos
- RPE (Rate of Perceived Exertion) tracking
- Body weight tracking
- Custom exercise creation
- Advanced analytics (volume per muscle group over time)
- Workout duration tracking
- Rest timer between sets
- Plate calculator (which plates to load on bar)
- Dark mode toggle

---

## Success Criteria
- ✅ User can log a workout with multiple exercises in under 2 minutes
- ✅ Calendar clearly shows workout history at a glance
- ✅ PR detection works accurately and provides immediate feedback
- ✅ Exercise progression charts load and display correctly
- ✅ Templates allow quick replication of common workouts
- ✅ Streak tracking motivates consistent training
- ✅ App works smoothly offline with no data loss
- ✅ UI is clean, minimal, and intuitive without tutorial

---

## Development Timeline Estimate
*Note: Actual timeline depends on developer experience and availability*

- **Phase 1**: Foundation
- **Phase 2**: Workout Logging
- **Phase 3**: Calendar & Navigation
- **Phase 4**: Progressive Overload
- **Phase 5**: Progress & Charts
- **Phase 6**: Templates & Goals
- **Phase 7**: Polish & Optimization

**Total**: Complete feature set as specified above

---

## Appendix: Exercise Database Sample

### Chest
- Barbell Bench Press (Mid Chest)
- Incline Barbell Bench Press (Upper Chest)
- Decline Barbell Bench Press (Lower Chest)
- Dumbbell Bench Press (Mid Chest)
- Incline Dumbbell Press (Upper Chest)
- Dumbbell Flyes (Mid Chest)
- Cable Flyes (Mid Chest)
- Push-ups (Mid Chest)
- Dips (Lower Chest)

### Back
- Deadlift (Lower Back, Lats)
- Barbell Row (Mid Back, Lats)
- Pull-ups (Lats, Upper Back)
- Lat Pulldown (Lats)
- Seated Cable Row (Mid Back)
- T-Bar Row (Mid Back)
- Single-arm Dumbbell Row (Lats, Mid Back)
- Face Pulls (Rear Delts, Upper Back)

### Shoulders
- Overhead Press (Front Delts, Side Delts)
- Dumbbell Shoulder Press (Front Delts, Side Delts)
- Lateral Raises (Side Delts)
- Front Raises (Front Delts)
- Reverse Flyes (Rear Delts)
- Arnold Press (Front Delts, Side Delts)

### Arms
- Barbell Curl (Biceps)
- Dumbbell Curl (Biceps)
- Hammer Curl (Biceps, Forearms)
- Preacher Curl (Biceps)
- Tricep Pushdown (Triceps)
- Overhead Tricep Extension (Triceps)
- Close-grip Bench Press (Triceps)
- Skull Crushers (Triceps)

### Legs
- Barbell Squat (Quads, Glutes)
- Front Squat (Quads)
- Romanian Deadlift (Hamstrings, Glutes)
- Leg Press (Quads, Glutes)
- Leg Curl (Hamstrings)
- Leg Extension (Quads)
- Bulgarian Split Squat (Quads, Glutes)
- Calf Raises (Calves)
- Walking Lunges (Quads, Glutes)

### Core
- Plank (Abs)
- Crunches (Abs)
- Hanging Leg Raises (Abs)
- Russian Twists (Obliques)
- Cable Woodchoppers (Obliques)
- Ab Wheel Rollout (Abs)

*... (expand to 150-200 total exercises)*

---

## File Structure Recommendation
```
gym-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── MonthView.tsx
│   │   │   ├── WeekView.tsx
│   │   │   ├── DayView.tsx
│   │   ├── WorkoutLogger/
│   │   │   ├── ExerciseSelector.tsx
│   │   │   ├── SetEntry.tsx
│   │   │   ├── MuscleGroupIndicator.tsx
│   │   ├── Progress/
│   │   │   ├── ExerciseList.tsx
│   │   │   ├── ProgressionChart.tsx
│   │   ├── Goals/
│   │   │   ├── StreakTracker.tsx
│   │   │   ├── GoalsConfig.tsx
│   │   ├── Shared/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   ├── data/
│   │   ├── exercises.ts (exercise database)
│   │   ├── muscleGroups.ts
│   ├── db/
│   │   ├── indexedDB.ts (DB setup and queries)
│   │   ├── schema.ts
│   ├── hooks/
│   │   ├── useWorkouts.ts
│   │   ├── useExerciseHistory.ts
│   │   ├── useGoals.ts
│   ├── utils/
│   │   ├── dateHelpers.ts
│   │   ├── prDetection.ts
│   │   ├── autoGrouping.ts
│   ├── types/
│   │   ├── index.ts (TypeScript interfaces)
│   ├── App.tsx
│   ├── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Conclusion
This specification provides a complete blueprint for building a minimal yet powerful gym workout tracking application. The focus is on core functionality that directly supports the user's training goals: easy logging, progressive overload tracking, and simple progress visualization. The design prioritizes speed of use during workouts while maintaining clean aesthetics and data integrity.
