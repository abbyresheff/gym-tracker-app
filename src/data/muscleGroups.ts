import { MuscleGroup } from '../types';

export interface MuscleGroupInfo {
  id: MuscleGroup;
  displayName: string;
  color: string;
  category: 'shoulders' | 'chest' | 'back' | 'arms' | 'legs' | 'core';
}

export const muscleGroupsData: Record<MuscleGroup, MuscleGroupInfo> = {
  'front-delts': {
    id: 'front-delts',
    displayName: 'Front Delts',
    color: '#FF6B6B',
    category: 'shoulders'
  },
  'side-delts': {
    id: 'side-delts',
    displayName: 'Side Delts',
    color: '#FF8E53',
    category: 'shoulders'
  },
  'rear-delts': {
    id: 'rear-delts',
    displayName: 'Rear Delts',
    color: '#FFAA5C',
    category: 'shoulders'
  },
  'upper-chest': {
    id: 'upper-chest',
    displayName: 'Upper Chest',
    color: '#4ECDC4',
    category: 'chest'
  },
  'mid-chest': {
    id: 'mid-chest',
    displayName: 'Mid Chest',
    color: '#44A8B3',
    category: 'chest'
  },
  'lower-chest': {
    id: 'lower-chest',
    displayName: 'Lower Chest',
    color: '#3A7D8A',
    category: 'chest'
  },
  'lats': {
    id: 'lats',
    displayName: 'Lats',
    color: '#9B59B6',
    category: 'back'
  },
  'upper-back': {
    id: 'upper-back',
    displayName: 'Upper Back',
    color: '#8E44AD',
    category: 'back'
  },
  'mid-back': {
    id: 'mid-back',
    displayName: 'Mid Back',
    color: '#7D3C98',
    category: 'back'
  },
  'lower-back': {
    id: 'lower-back',
    displayName: 'Lower Back',
    color: '#6C3483',
    category: 'back'
  },
  'biceps': {
    id: 'biceps',
    displayName: 'Biceps',
    color: '#3498DB',
    category: 'arms'
  },
  'triceps': {
    id: 'triceps',
    displayName: 'Triceps',
    color: '#2980B9',
    category: 'arms'
  },
  'forearms': {
    id: 'forearms',
    displayName: 'Forearms',
    color: '#1F618D',
    category: 'arms'
  },
  'quads': {
    id: 'quads',
    displayName: 'Quads',
    color: '#27AE60',
    category: 'legs'
  },
  'hamstrings': {
    id: 'hamstrings',
    displayName: 'Hamstrings',
    color: '#229954',
    category: 'legs'
  },
  'glutes': {
    id: 'glutes',
    displayName: 'Glutes',
    color: '#1E8449',
    category: 'legs'
  },
  'calves': {
    id: 'calves',
    displayName: 'Calves',
    color: '#F39C12',
    category: 'legs'
  },
  'abs': {
    id: 'abs',
    displayName: 'Abs',
    color: '#E67E22',
    category: 'core'
  },
  'obliques': {
    id: 'obliques',
    displayName: 'Obliques',
    color: '#D35400',
    category: 'core'
  }
};

export const getMuscleGroupInfo = (muscleGroup: MuscleGroup): MuscleGroupInfo => {
  return muscleGroupsData[muscleGroup];
};

export const getAllMuscleGroups = (): MuscleGroupInfo[] => {
  return Object.values(muscleGroupsData);
};
