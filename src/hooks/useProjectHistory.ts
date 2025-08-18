import { useState, useEffect } from 'react';
import { useConfigurator } from '@/store/configurator';
import type { ProjectHistory } from '@/types/configurator';

const STORAGE_KEY = 'she-project-history';

export function useProjectHistory() {
  const [projects, setProjects] = useState<ProjectHistory[]>([]);
  const configurator = useConfigurator();

  // Load projects from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProjects(parsed);
      } catch (error) {
        console.error('Failed to parse saved projects:', error);
      }
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const saveProject = (name: string) => {
    const newProject: ProjectHistory = {
      id: Date.now().toString(),
      name,
      timestamp: Date.now(),
      configuration: {
        selectedProduct: configurator.selectedProduct,
        material: configurator.material,
        lining: configurator.lining,
        hardware: configurator.hardware,
        embroidery: configurator.embroidery,
        extras: configurator.extras,
        step: configurator.step,
      },
      thumbnail: '/models/plecak-west-l.jpg', // Default thumbnail
    };

    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const loadProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return false;

    // Restore configuration
    configurator.setSelectedProduct(project.configuration.selectedProduct);
    configurator.setSelectedMaterial(project.configuration.material);
    configurator.setSelectedLining(project.configuration.lining);
    configurator.setSelectedHardware(project.configuration.hardware);
    configurator.setEmbroidery(project.configuration.embroidery);
    configurator.setSelectedExtras(project.configuration.extras);
    configurator.setStep(project.configuration.step);

    return true;
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const updateProjectName = (projectId: string, newName: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, name: newName } : p
    ));
  };

  const getRecentProjects = (limit: number = 5) => {
    return projects.slice(0, limit);
  };

  const exportProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return null;

    const dataStr = JSON.stringify(project, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `she-project-${project.name}-${project.id}.json`;
    link.click();
  };

  const importProject = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const project = JSON.parse(e.target?.result as string);
          if (project.configuration && project.name) {
            setProjects(prev => [project, ...prev]);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          console.error('Failed to import project:', error);
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  };

  return {
    projects,
    saveProject,
    loadProject,
    deleteProject,
    updateProjectName,
    getRecentProjects,
    exportProject,
    importProject,
  };
}
