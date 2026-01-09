import React, { useState } from 'react';
import { SetLog } from '../../types';
import './SetEntry.css';

interface SetEntryProps {
  set: SetLog;
  setNumber: number;
  onUpdate: (updatedSet: SetLog) => void;
  onDelete: () => void;
  isPR?: boolean;
  isMatched?: boolean;
}

const SetEntry: React.FC<SetEntryProps> = ({ set, setNumber, onUpdate, onDelete, isPR, isMatched }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempReps, setTempReps] = useState(set.reps.toString());
  const [tempWeight, setTempWeight] = useState(set.weight.toString());

  const handleRepsChange = (delta: number) => {
    const newReps = Math.max(1, set.reps + delta);
    onUpdate({ ...set, reps: newReps });
  };

  const handleWeightChange = (delta: number) => {
    const newWeight = Math.max(0, set.weight + delta);
    onUpdate({ ...set, weight: newWeight });
  };

  const handleRepsInput = (value: string) => {
    setTempReps(value);
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdate({ ...set, reps: parsed });
    }
  };

  const handleWeightInput = (value: string) => {
    setTempWeight(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdate({ ...set, weight: parsed });
    }
  };

  const toggleCompleted = () => {
    onUpdate({ ...set, completed: !set.completed });
  };

  return (
    <div className={`set-entry ${set.completed ? 'completed' : ''} ${isPR ? 'is-pr' : ''} ${isMatched ? 'is-matched' : ''}`}>
      <div className="set-number">
        Set {setNumber}
        {isPR && <span className="pr-badge" title="Personal Record!">PR</span>}
        {isMatched && !isPR && <span className="matched-badge" title="Matched Previous Best">✓</span>}
      </div>

      <div className="set-controls">
        {/* Reps Control */}
        <div className="control-group">
          <label className="control-label">Reps</label>
          <div className="stepper">
            <button
              className="stepper-button"
              onClick={() => handleRepsChange(-1)}
              disabled={set.reps <= 1}
            >
              −
            </button>
            <input
              type="number"
              className="stepper-input"
              value={isEditing ? tempReps : set.reps}
              onChange={(e) => handleRepsInput(e.target.value)}
              onFocus={() => {
                setIsEditing(true);
                setTempReps(set.reps.toString());
              }}
              onBlur={() => setIsEditing(false)}
              min="1"
            />
            <button
              className="stepper-button"
              onClick={() => handleRepsChange(1)}
            >
              +
            </button>
          </div>
        </div>

        <span className="multiply-symbol">×</span>

        {/* Weight Control */}
        <div className="control-group">
          <label className="control-label">Weight (lbs)</label>
          <div className="stepper">
            <button
              className="stepper-button"
              onClick={() => handleWeightChange(-2.5)}
              disabled={set.weight <= 0}
            >
              −
            </button>
            <input
              type="number"
              className="stepper-input"
              value={isEditing ? tempWeight : set.weight}
              onChange={(e) => handleWeightInput(e.target.value)}
              onFocus={() => {
                setIsEditing(true);
                setTempWeight(set.weight.toString());
              }}
              onBlur={() => setIsEditing(false)}
              min="0"
              step="2.5"
            />
            <button
              className="stepper-button"
              onClick={() => handleWeightChange(2.5)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="set-actions">
        <button
          className={`complete-button ${set.completed ? 'completed' : ''}`}
          onClick={toggleCompleted}
          title={set.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {set.completed ? '✓' : '○'}
        </button>
        <button
          className="delete-set-button"
          onClick={onDelete}
          title="Delete set"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default React.memo(SetEntry);
