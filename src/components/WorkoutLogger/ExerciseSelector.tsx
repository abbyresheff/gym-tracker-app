import React, { useState, useEffect, useMemo } from 'react';
import { Exercise, ExerciseCategory } from '../../types';
import { getAllExercises } from '../../db/indexedDB';
import { getMuscleGroupInfo } from '../../data/muscleGroups';
import './ExerciseSelector.css';

interface ExerciseSelectorProps {
  onSelect: (exercise: Exercise) => void;
  onCancel: () => void;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ onSelect, onCancel }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const allExercises = await getAllExercises();
      setExercises(allExercises);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter exercises based on search and category
  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ex => ex.category === selectedCategory);
    }

    // Filter by search query (fuzzy search)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ex =>
        ex.name.toLowerCase().includes(query)
      );
    }

    // Sort by name
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [exercises, searchQuery, selectedCategory]);

  // Group by category for display
  const exercisesByCategory = useMemo(() => {
    const grouped: Record<ExerciseCategory, Exercise[]> = {
      'barbell': [],
      'dumbbell': [],
      'machine': [],
      'cable': [],
      'bodyweight': []
    };

    filteredExercises.forEach(ex => {
      grouped[ex.category].push(ex);
    });

    return grouped;
  }, [filteredExercises]);

  const categories: { value: ExerciseCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'barbell', label: 'Barbell' },
    { value: 'dumbbell', label: 'Dumbbell' },
    { value: 'machine', label: 'Machine' },
    { value: 'cable', label: 'Cable' },
    { value: 'bodyweight', label: 'Bodyweight' }
  ];

  const handleExerciseClick = (exercise: Exercise) => {
    onSelect(exercise);
  };

  if (isLoading) {
    return (
      <div className="exercise-selector">
        <div className="selector-loading">Loading exercises...</div>
      </div>
    );
  }

  return (
    <div className="exercise-selector">
      <div className="selector-header">
        <h3>Select Exercise</h3>
        <button onClick={onCancel} className="cancel-button">
          ✕
        </button>
      </div>

      <div className="selector-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={`category-button ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="exercises-grid">
        {filteredExercises.length === 0 && (
          <div className="no-results">
            <p>No exercises found</p>
            <p className="text-secondary">Try adjusting your search or category filter</p>
          </div>
        )}

        {selectedCategory === 'all' ? (
          // Show grouped by category
          Object.entries(exercisesByCategory).map(([category, exs]) => {
            if (exs.length === 0) return null;
            return (
              <div key={category} className="exercise-category-group">
                <h4 className="category-heading">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <div className="exercise-list">
                  {exs.map(exercise => {
                    const muscleGroupInfo = getMuscleGroupInfo(exercise.primaryMuscleGroup);
                    return (
                      <button
                        key={exercise.id}
                        className="exercise-item"
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        <div className="exercise-item-main">
                          <span className="exercise-name">{exercise.name}</span>
                          <span
                            className="muscle-badge"
                            style={{ backgroundColor: muscleGroupInfo.color }}
                          >
                            {muscleGroupInfo.displayName}
                          </span>
                        </div>
                        {exercise.commonRepRanges && (
                          <span className="rep-ranges text-secondary">
                            {exercise.commonRepRanges} reps
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          // Show flat list for specific category
          <div className="exercise-list">
            {filteredExercises.map(exercise => {
              const muscleGroupInfo = getMuscleGroupInfo(exercise.primaryMuscleGroup);
              return (
                <button
                  key={exercise.id}
                  className="exercise-item"
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <div className="exercise-item-main">
                    <span className="exercise-name">{exercise.name}</span>
                    <span
                      className="muscle-badge"
                      style={{ backgroundColor: muscleGroupInfo.color }}
                    >
                      {muscleGroupInfo.displayName}
                    </span>
                  </div>
                  {exercise.commonRepRanges && (
                    <span className="rep-ranges text-secondary">
                      {exercise.commonRepRanges} reps
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseSelector;
