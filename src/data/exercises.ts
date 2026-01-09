import { Exercise } from '../types';

export const exercisesDatabase: Exercise[] = [
  // CHEST EXERCISES
  { id: 'ex001', name: 'Barbell Bench Press', primaryMuscleGroup: 'mid-chest', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex002', name: 'Incline Barbell Bench Press', primaryMuscleGroup: 'upper-chest', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex003', name: 'Decline Barbell Bench Press', primaryMuscleGroup: 'lower-chest', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex004', name: 'Dumbbell Bench Press', primaryMuscleGroup: 'mid-chest', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex005', name: 'Incline Dumbbell Press', primaryMuscleGroup: 'upper-chest', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex006', name: 'Decline Dumbbell Press', primaryMuscleGroup: 'lower-chest', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex007', name: 'Dumbbell Flyes', primaryMuscleGroup: 'mid-chest', category: 'dumbbell', commonRepRanges: '10-15' },
  { id: 'ex008', name: 'Incline Dumbbell Flyes', primaryMuscleGroup: 'upper-chest', category: 'dumbbell', commonRepRanges: '10-15' },
  { id: 'ex009', name: 'Cable Flyes', primaryMuscleGroup: 'mid-chest', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex010', name: 'Low to High Cable Flyes', primaryMuscleGroup: 'upper-chest', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex011', name: 'High to Low Cable Flyes', primaryMuscleGroup: 'lower-chest', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex012', name: 'Chest Press Machine', primaryMuscleGroup: 'mid-chest', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex013', name: 'Pec Deck Machine', primaryMuscleGroup: 'mid-chest', category: 'machine', commonRepRanges: '12-15' },
  { id: 'ex014', name: 'Push-ups', primaryMuscleGroup: 'mid-chest', category: 'bodyweight', commonRepRanges: '10-20' },
  { id: 'ex015', name: 'Dips (Chest Variation)', primaryMuscleGroup: 'lower-chest', category: 'bodyweight', commonRepRanges: '8-12' },
  { id: 'ex016', name: 'Landmine Press', primaryMuscleGroup: 'upper-chest', category: 'barbell', commonRepRanges: '8-12' },

  // BACK EXERCISES
  { id: 'ex017', name: 'Deadlift', primaryMuscleGroup: 'lower-back', category: 'barbell', commonRepRanges: '3-6' },
  { id: 'ex018', name: 'Romanian Deadlift', primaryMuscleGroup: 'lower-back', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex019', name: 'Barbell Row', primaryMuscleGroup: 'mid-back', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex020', name: 'Pendlay Row', primaryMuscleGroup: 'mid-back', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex021', name: 'T-Bar Row', primaryMuscleGroup: 'mid-back', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex022', name: 'Pull-ups', primaryMuscleGroup: 'lats', category: 'bodyweight', commonRepRanges: '5-10' },
  { id: 'ex023', name: 'Chin-ups', primaryMuscleGroup: 'lats', category: 'bodyweight', commonRepRanges: '5-10' },
  { id: 'ex024', name: 'Wide Grip Pull-ups', primaryMuscleGroup: 'lats', category: 'bodyweight', commonRepRanges: '5-10' },
  { id: 'ex025', name: 'Lat Pulldown', primaryMuscleGroup: 'lats', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex026', name: 'Wide Grip Lat Pulldown', primaryMuscleGroup: 'lats', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex027', name: 'Close Grip Lat Pulldown', primaryMuscleGroup: 'lats', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex028', name: 'Seated Cable Row', primaryMuscleGroup: 'mid-back', category: 'cable', commonRepRanges: '8-12' },
  { id: 'ex029', name: 'Single Arm Dumbbell Row', primaryMuscleGroup: 'lats', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex030', name: 'Dumbbell Row (Both Arms)', primaryMuscleGroup: 'mid-back', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex031', name: 'Chest Supported Row', primaryMuscleGroup: 'mid-back', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex032', name: 'Face Pulls', primaryMuscleGroup: 'upper-back', category: 'cable', commonRepRanges: '15-20' },
  { id: 'ex033', name: 'Straight Arm Pulldown', primaryMuscleGroup: 'lats', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex034', name: 'Machine Row', primaryMuscleGroup: 'mid-back', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex035', name: 'Inverted Row', primaryMuscleGroup: 'mid-back', category: 'bodyweight', commonRepRanges: '8-15' },
  { id: 'ex036', name: 'Rack Pulls', primaryMuscleGroup: 'upper-back', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex037', name: 'Good Mornings', primaryMuscleGroup: 'lower-back', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex038', name: 'Hyperextensions', primaryMuscleGroup: 'lower-back', category: 'bodyweight', commonRepRanges: '12-15' },

  // SHOULDER EXERCISES
  { id: 'ex039', name: 'Overhead Press', primaryMuscleGroup: 'front-delts', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex040', name: 'Seated Overhead Press', primaryMuscleGroup: 'front-delts', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex041', name: 'Push Press', primaryMuscleGroup: 'front-delts', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex042', name: 'Dumbbell Shoulder Press', primaryMuscleGroup: 'front-delts', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex043', name: 'Seated Dumbbell Press', primaryMuscleGroup: 'front-delts', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex044', name: 'Arnold Press', primaryMuscleGroup: 'front-delts', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex045', name: 'Lateral Raises', primaryMuscleGroup: 'side-delts', category: 'dumbbell', commonRepRanges: '12-15' },
  { id: 'ex046', name: 'Cable Lateral Raises', primaryMuscleGroup: 'side-delts', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex047', name: 'Machine Lateral Raises', primaryMuscleGroup: 'side-delts', category: 'machine', commonRepRanges: '12-15' },
  { id: 'ex048', name: 'Front Raises', primaryMuscleGroup: 'front-delts', category: 'dumbbell', commonRepRanges: '12-15' },
  { id: 'ex049', name: 'Barbell Front Raises', primaryMuscleGroup: 'front-delts', category: 'barbell', commonRepRanges: '12-15' },
  { id: 'ex050', name: 'Reverse Flyes', primaryMuscleGroup: 'rear-delts', category: 'dumbbell', commonRepRanges: '12-15' },
  { id: 'ex051', name: 'Cable Reverse Flyes', primaryMuscleGroup: 'rear-delts', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex052', name: 'Bent Over Lateral Raises', primaryMuscleGroup: 'rear-delts', category: 'dumbbell', commonRepRanges: '12-15' },
  { id: 'ex053', name: 'Rear Delt Machine', primaryMuscleGroup: 'rear-delts', category: 'machine', commonRepRanges: '12-15' },
  { id: 'ex054', name: 'Upright Row', primaryMuscleGroup: 'side-delts', category: 'barbell', commonRepRanges: '10-12' },
  { id: 'ex055', name: 'Dumbbell Upright Row', primaryMuscleGroup: 'side-delts', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex056', name: 'Shoulder Press Machine', primaryMuscleGroup: 'front-delts', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex057', name: 'Pike Push-ups', primaryMuscleGroup: 'front-delts', category: 'bodyweight', commonRepRanges: '8-12' },

  // ARM EXERCISES - BICEPS
  { id: 'ex058', name: 'Barbell Curl', primaryMuscleGroup: 'biceps', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex059', name: 'EZ Bar Curl', primaryMuscleGroup: 'biceps', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex060', name: 'Preacher Curl', primaryMuscleGroup: 'biceps', category: 'barbell', commonRepRanges: '10-12' },
  { id: 'ex061', name: 'Dumbbell Curl', primaryMuscleGroup: 'biceps', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex062', name: 'Alternating Dumbbell Curl', primaryMuscleGroup: 'biceps', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex063', name: 'Hammer Curl', primaryMuscleGroup: 'biceps', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex064', name: 'Incline Dumbbell Curl', primaryMuscleGroup: 'biceps', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex065', name: 'Concentration Curl', primaryMuscleGroup: 'biceps', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex066', name: 'Cable Curl', primaryMuscleGroup: 'biceps', category: 'cable', commonRepRanges: '10-15' },
  { id: 'ex067', name: 'Cable Hammer Curl', primaryMuscleGroup: 'biceps', category: 'cable', commonRepRanges: '10-15' },
  { id: 'ex068', name: 'Machine Curl', primaryMuscleGroup: 'biceps', category: 'machine', commonRepRanges: '10-12' },
  { id: 'ex069', name: 'Spider Curl', primaryMuscleGroup: 'biceps', category: 'barbell', commonRepRanges: '10-12' },
  { id: 'ex070', name: 'Drag Curl', primaryMuscleGroup: 'biceps', category: 'barbell', commonRepRanges: '8-12' },

  // ARM EXERCISES - TRICEPS
  { id: 'ex071', name: 'Close Grip Bench Press', primaryMuscleGroup: 'triceps', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex072', name: 'Tricep Dips', primaryMuscleGroup: 'triceps', category: 'bodyweight', commonRepRanges: '8-12' },
  { id: 'ex073', name: 'Tricep Pushdown', primaryMuscleGroup: 'triceps', category: 'cable', commonRepRanges: '10-15' },
  { id: 'ex074', name: 'Rope Tricep Pushdown', primaryMuscleGroup: 'triceps', category: 'cable', commonRepRanges: '10-15' },
  { id: 'ex075', name: 'Overhead Tricep Extension', primaryMuscleGroup: 'triceps', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex076', name: 'Skull Crushers', primaryMuscleGroup: 'triceps', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex077', name: 'Dumbbell Skull Crushers', primaryMuscleGroup: 'triceps', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex078', name: 'Cable Overhead Extension', primaryMuscleGroup: 'triceps', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex079', name: 'Tricep Kickbacks', primaryMuscleGroup: 'triceps', category: 'dumbbell', commonRepRanges: '12-15' },
  { id: 'ex080', name: 'Diamond Push-ups', primaryMuscleGroup: 'triceps', category: 'bodyweight', commonRepRanges: '10-15' },
  { id: 'ex081', name: 'Bench Dips', primaryMuscleGroup: 'triceps', category: 'bodyweight', commonRepRanges: '12-20' },
  { id: 'ex082', name: 'JM Press', primaryMuscleGroup: 'triceps', category: 'barbell', commonRepRanges: '8-12' },

  // FOREARMS
  { id: 'ex083', name: 'Wrist Curls', primaryMuscleGroup: 'forearms', category: 'barbell', commonRepRanges: '15-20' },
  { id: 'ex084', name: 'Reverse Wrist Curls', primaryMuscleGroup: 'forearms', category: 'barbell', commonRepRanges: '15-20' },
  { id: 'ex085', name: 'Dumbbell Wrist Curls', primaryMuscleGroup: 'forearms', category: 'dumbbell', commonRepRanges: '15-20' },
  { id: 'ex086', name: 'Farmers Walk', primaryMuscleGroup: 'forearms', category: 'dumbbell', commonRepRanges: '30-60s' },
  { id: 'ex087', name: 'Reverse Curls', primaryMuscleGroup: 'forearms', category: 'barbell', commonRepRanges: '10-12' },

  // LEG EXERCISES - QUADS
  { id: 'ex088', name: 'Barbell Squat', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex089', name: 'Front Squat', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex090', name: 'Pause Squat', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex091', name: 'Box Squat', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex092', name: 'Goblet Squat', primaryMuscleGroup: 'quads', category: 'dumbbell', commonRepRanges: '10-15' },
  { id: 'ex093', name: 'Leg Press', primaryMuscleGroup: 'quads', category: 'machine', commonRepRanges: '8-15' },
  { id: 'ex094', name: 'Hack Squat', primaryMuscleGroup: 'quads', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex095', name: 'Leg Extension', primaryMuscleGroup: 'quads', category: 'machine', commonRepRanges: '12-15' },
  { id: 'ex096', name: 'Bulgarian Split Squat', primaryMuscleGroup: 'quads', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex097', name: 'Walking Lunges', primaryMuscleGroup: 'quads', category: 'dumbbell', commonRepRanges: '10-15' },
  { id: 'ex098', name: 'Reverse Lunges', primaryMuscleGroup: 'quads', category: 'dumbbell', commonRepRanges: '10-15' },
  { id: 'ex099', name: 'Step-ups', primaryMuscleGroup: 'quads', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex100', name: 'Sissy Squats', primaryMuscleGroup: 'quads', category: 'bodyweight', commonRepRanges: '10-15' },

  // LEG EXERCISES - HAMSTRINGS
  { id: 'ex101', name: 'Romanian Deadlift', primaryMuscleGroup: 'hamstrings', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex102', name: 'Stiff Leg Deadlift', primaryMuscleGroup: 'hamstrings', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex103', name: 'Dumbbell RDL', primaryMuscleGroup: 'hamstrings', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex104', name: 'Single Leg RDL', primaryMuscleGroup: 'hamstrings', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex105', name: 'Leg Curl', primaryMuscleGroup: 'hamstrings', category: 'machine', commonRepRanges: '12-15' },
  { id: 'ex106', name: 'Seated Leg Curl', primaryMuscleGroup: 'hamstrings', category: 'machine', commonRepRanges: '12-15' },
  { id: 'ex107', name: 'Lying Leg Curl', primaryMuscleGroup: 'hamstrings', category: 'machine', commonRepRanges: '12-15' },
  { id: 'ex108', name: 'Nordic Curls', primaryMuscleGroup: 'hamstrings', category: 'bodyweight', commonRepRanges: '5-8' },
  { id: 'ex109', name: 'Good Mornings', primaryMuscleGroup: 'hamstrings', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex110', name: 'Glute Ham Raise', primaryMuscleGroup: 'hamstrings', category: 'bodyweight', commonRepRanges: '8-12' },

  // LEG EXERCISES - GLUTES
  { id: 'ex111', name: 'Hip Thrust', primaryMuscleGroup: 'glutes', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex112', name: 'Barbell Glute Bridge', primaryMuscleGroup: 'glutes', category: 'barbell', commonRepRanges: '10-15' },
  { id: 'ex113', name: 'Single Leg Hip Thrust', primaryMuscleGroup: 'glutes', category: 'bodyweight', commonRepRanges: '10-15' },
  { id: 'ex114', name: 'Cable Pull Through', primaryMuscleGroup: 'glutes', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex115', name: 'Kettlebell Swing', primaryMuscleGroup: 'glutes', category: 'dumbbell', commonRepRanges: '15-20' },
  { id: 'ex116', name: 'Cable Kickbacks', primaryMuscleGroup: 'glutes', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex117', name: 'Smith Machine Hip Thrust', primaryMuscleGroup: 'glutes', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex118', name: 'Sumo Deadlift', primaryMuscleGroup: 'glutes', category: 'barbell', commonRepRanges: '5-8' },

  // CALVES
  { id: 'ex119', name: 'Standing Calf Raise', primaryMuscleGroup: 'calves', category: 'machine', commonRepRanges: '12-20' },
  { id: 'ex120', name: 'Seated Calf Raise', primaryMuscleGroup: 'calves', category: 'machine', commonRepRanges: '15-20' },
  { id: 'ex121', name: 'Dumbbell Calf Raise', primaryMuscleGroup: 'calves', category: 'dumbbell', commonRepRanges: '15-20' },
  { id: 'ex122', name: 'Single Leg Calf Raise', primaryMuscleGroup: 'calves', category: 'bodyweight', commonRepRanges: '15-20' },
  { id: 'ex123', name: 'Leg Press Calf Raise', primaryMuscleGroup: 'calves', category: 'machine', commonRepRanges: '15-20' },

  // CORE - ABS
  { id: 'ex124', name: 'Plank', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '30-60s' },
  { id: 'ex125', name: 'Crunches', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '15-25' },
  { id: 'ex126', name: 'Hanging Leg Raises', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '10-15' },
  { id: 'ex127', name: 'Hanging Knee Raises', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '10-15' },
  { id: 'ex128', name: 'Cable Crunches', primaryMuscleGroup: 'abs', category: 'cable', commonRepRanges: '15-20' },
  { id: 'ex129', name: 'Ab Wheel Rollout', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '10-15' },
  { id: 'ex130', name: 'Bicycle Crunches', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '15-20' },
  { id: 'ex131', name: 'Mountain Climbers', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '15-20' },
  { id: 'ex132', name: 'Decline Sit-ups', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '15-20' },
  { id: 'ex133', name: 'V-ups', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '10-15' },
  { id: 'ex134', name: 'Dragon Flags', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '5-10' },
  { id: 'ex135', name: 'L-sit', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '15-30s' },

  // CORE - OBLIQUES
  { id: 'ex136', name: 'Russian Twists', primaryMuscleGroup: 'obliques', category: 'bodyweight', commonRepRanges: '15-20' },
  { id: 'ex137', name: 'Cable Woodchoppers', primaryMuscleGroup: 'obliques', category: 'cable', commonRepRanges: '12-15' },
  { id: 'ex138', name: 'Side Plank', primaryMuscleGroup: 'obliques', category: 'bodyweight', commonRepRanges: '30-60s' },
  { id: 'ex139', name: 'Oblique Crunches', primaryMuscleGroup: 'obliques', category: 'bodyweight', commonRepRanges: '15-20' },
  { id: 'ex140', name: 'Dumbbell Side Bend', primaryMuscleGroup: 'obliques', category: 'dumbbell', commonRepRanges: '12-15' },
  { id: 'ex141', name: 'Pallof Press', primaryMuscleGroup: 'obliques', category: 'cable', commonRepRanges: '10-12' },
  { id: 'ex142', name: 'Windshield Wipers', primaryMuscleGroup: 'obliques', category: 'bodyweight', commonRepRanges: '10-15' },

  // ADDITIONAL COMPOUND/FULL BODY
  { id: 'ex143', name: 'Clean and Press', primaryMuscleGroup: 'front-delts', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex144', name: 'Power Clean', primaryMuscleGroup: 'upper-back', category: 'barbell', commonRepRanges: '3-5' },
  { id: 'ex145', name: 'Hang Clean', primaryMuscleGroup: 'upper-back', category: 'barbell', commonRepRanges: '3-5' },
  { id: 'ex146', name: 'Snatch', primaryMuscleGroup: 'upper-back', category: 'barbell', commonRepRanges: '2-4' },
  { id: 'ex147', name: 'Hang Snatch', primaryMuscleGroup: 'upper-back', category: 'barbell', commonRepRanges: '2-4' },
  { id: 'ex148', name: 'Thrusters', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex149', name: 'Burpees', primaryMuscleGroup: 'abs', category: 'bodyweight', commonRepRanges: '10-15' },
  { id: 'ex150', name: 'Battle Ropes', primaryMuscleGroup: 'front-delts', category: 'bodyweight', commonRepRanges: '30-60s' },

  // ADDITIONAL VARIATIONS
  { id: 'ex151', name: 'Zercher Squat', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex152', name: 'Anderson Squat', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex153', name: 'Pin Squat', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex154', name: 'Safety Bar Squat', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '6-10' },
  { id: 'ex155', name: 'Belt Squat', primaryMuscleGroup: 'quads', category: 'machine', commonRepRanges: '8-12' },
  { id: 'ex156', name: 'Trap Bar Deadlift', primaryMuscleGroup: 'quads', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex157', name: 'Deficit Deadlift', primaryMuscleGroup: 'lower-back', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex158', name: 'Block Pull', primaryMuscleGroup: 'upper-back', category: 'barbell', commonRepRanges: '5-8' },
  { id: 'ex159', name: 'Seal Row', primaryMuscleGroup: 'mid-back', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex160', name: 'Meadows Row', primaryMuscleGroup: 'lats', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex161', name: 'Landmine Row', primaryMuscleGroup: 'mid-back', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex162', name: 'Bradford Press', primaryMuscleGroup: 'front-delts', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex163', name: 'Viking Press', primaryMuscleGroup: 'front-delts', category: 'barbell', commonRepRanges: '8-12' },
  { id: 'ex164', name: 'Lu Raise', primaryMuscleGroup: 'side-delts', category: 'dumbbell', commonRepRanges: '12-15' },
  { id: 'ex165', name: 'Cuban Press', primaryMuscleGroup: 'rear-delts', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex166', name: 'Waiter Curl', primaryMuscleGroup: 'biceps', category: 'dumbbell', commonRepRanges: '10-15' },
  { id: 'ex167', name: '21s (Bicep Curls)', primaryMuscleGroup: 'biceps', category: 'barbell', commonRepRanges: '21' },
  { id: 'ex168', name: 'Zottman Curl', primaryMuscleGroup: 'forearms', category: 'dumbbell', commonRepRanges: '8-12' },
  { id: 'ex169', name: 'Tate Press', primaryMuscleGroup: 'triceps', category: 'dumbbell', commonRepRanges: '10-12' },
  { id: 'ex170', name: 'California Press', primaryMuscleGroup: 'triceps', category: 'barbell', commonRepRanges: '8-12' },
];

// Helper functions
export const getExerciseById = (id: string): Exercise | undefined => {
  return exercisesDatabase.find(ex => ex.id === id);
};

export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return exercisesDatabase.filter(ex => ex.primaryMuscleGroup === muscleGroup);
};

export const getExercisesByCategory = (category: string): Exercise[] => {
  return exercisesDatabase.filter(ex => ex.category === category);
};

export const searchExercises = (query: string): Exercise[] => {
  const lowercaseQuery = query.toLowerCase();
  return exercisesDatabase.filter(ex =>
    ex.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const getAllExercises = (): Exercise[] => {
  return exercisesDatabase;
};
