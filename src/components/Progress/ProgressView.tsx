import React, { useState } from 'react';
import ExerciseList from './ExerciseList';
import ExerciseDetail from './ExerciseDetail';

const ProgressView: React.FC = () => {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  const handleSelectExercise = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
  };

  const handleBack = () => {
    setSelectedExerciseId(null);
  };

  if (selectedExerciseId) {
    return <ExerciseDetail exerciseId={selectedExerciseId} onBack={handleBack} />;
  }

  return <ExerciseList onSelectExercise={handleSelectExercise} />;
};

export default ProgressView;
