import React, { useState, useEffect } from 'react';
import { WorkoutTemplate, WorkoutSession } from '../../types';
import { getAllTemplates, saveTemplate, deleteTemplate } from '../../db/indexedDB';
import { getExerciseById } from '../../db/indexedDB';
import LoadingSpinner from '../Shared/LoadingSpinner';
import './TemplateManager.css';

interface TemplateManagerProps {
  onSelectTemplate: (template: WorkoutTemplate) => void;
  onClose: () => void;
  currentSession?: WorkoutSession;
}

const TemplateManager: React.FC<TemplateManagerProps> = ({ onSelectTemplate, onClose, currentSession }) => {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const allTemplates = await getAllTemplates();
      setTemplates(allTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!currentSession || !newTemplateName.trim()) return;

    setIsSaving(true);
    try {
      const templateExercises = await Promise.all(
        currentSession.exercises.map(async (exerciseLog) => {
          const exercise = await getExerciseById(exerciseLog.exerciseId);
          const lastWeight = exerciseLog.sets.length > 0 ? exerciseLog.sets[exerciseLog.sets.length - 1].weight : undefined;

          return {
            exerciseId: exerciseLog.exerciseId,
            exerciseName: exercise?.name || 'Unknown Exercise',
            targetSets: exerciseLog.sets.length,
            targetReps: exerciseLog.sets.length > 0 ? exerciseLog.sets[0].reps : 10,
            lastWeight
          };
        })
      );

      const newTemplate: WorkoutTemplate = {
        id: `template-${Date.now()}`,
        name: newTemplateName.trim(),
        exercises: templateExercises,
        createdDate: new Date()
      };

      await saveTemplate(newTemplate);
      await loadTemplates();

      setNewTemplateName('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating template:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      await deleteTemplate(templateId);
      await loadTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleUseTemplate = (template: WorkoutTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="template-manager-modal">
        <div className="template-manager-content">
          <LoadingSpinner size="medium" text="Loading templates..." />
        </div>
      </div>
    );
  }

  return (
    <div className="template-manager-modal" onClick={onClose}>
      <div className="template-manager-content" onClick={(e) => e.stopPropagation()}>
        <div className="template-header">
          <h3>Workout Templates</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {currentSession && currentSession.exercises.length > 0 && (
          <div className="create-template-section">
            {!showCreateForm ? (
              <button
                className="show-create-button"
                onClick={() => setShowCreateForm(true)}
              >
                💾 Save Current Workout as Template
              </button>
            ) : (
              <div className="create-form">
                <input
                  type="text"
                  placeholder="Template name (e.g., 'Push Day', 'Leg Day')"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  className="template-name-input"
                  autoFocus
                />
                <div className="create-actions">
                  <button
                    className="save-template-button"
                    onClick={handleCreateTemplate}
                    disabled={!newTemplateName.trim() || isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Template'}
                  </button>
                  <button
                    className="cancel-create-button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewTemplateName('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="templates-list">
          {templates.length === 0 ? (
            <div className="empty-state">
              <p>No templates saved yet.</p>
              <p className="empty-hint">
                Save your current workout as a template to quickly start similar workouts in the future!
              </p>
            </div>
          ) : (
            templates.map((template) => (
              <div key={template.id} className="template-card">
                <div className="template-card-header">
                  <h4 className="template-name">{template.name}</h4>
                  <div className="template-actions">
                    <button
                      className="use-template-button"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use Template
                    </button>
                    <button
                      className="delete-template-button"
                      onClick={() => handleDeleteTemplate(template.id)}
                      title="Delete template"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="template-exercises">
                  {template.exercises.map((exercise, index) => (
                    <div key={index} className="template-exercise-item">
                      <span className="exercise-name">{exercise.exerciseName}</span>
                      <span className="exercise-details">
                        {exercise.targetSets} × {exercise.targetReps} reps
                        {exercise.lastWeight && ` @ ${exercise.lastWeight} lbs`}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="template-meta">
                  <span className="exercise-count">
                    {template.exercises.length} {template.exercises.length === 1 ? 'exercise' : 'exercises'}
                  </span>
                  <span className="template-date">
                    Created {new Date(template.createdDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;
