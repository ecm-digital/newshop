"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@radix-ui/themes";
import { useConfigurator } from "@/store/configurator";
import { useProjectHistory } from "@/hooks/useProjectHistory";
import { PROJECT_TEMPLATES, getTemplateById } from "@/config/templates";

export default function StepTemplates() {
  const { 
    setSelectedProduct,
    setSelectedMaterial,
    setSelectedLining,
    setSelectedHardware,
    setEmbroideryText,
    setSelectedExtras
  } = useConfigurator();

  const { projects, loadProject, deleteProject } = useProjectHistory();

  const handleTemplateSelect = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (!template) return;

    // Apply template configuration
    setSelectedProduct(template.productKey);
    setSelectedMaterial(template.materialKey);
    setSelectedLining(template.liningKey);
    setSelectedHardware(template.hardwareKey);
    if (template.embroideryText) {
      setEmbroideryText(template.embroideryText);
    }
    setSelectedExtras(template.extras);
  };

  const handleLoadProject = (projectId: string) => {
    const success = loadProject(projectId);
    if (success) {
      console.log('Project loaded successfully');
    }
  };

  // Simplified UI: no descriptions/meta blocks

  // Flattened view: show all templates without categories

  return (
    <div className="space-y-8">
      {/* Start from scratch option removed */}

      {/* Saved Projects */}
      {projects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-she-dark mb-4 flex items-center">
            <span className="text-2xl mr-2">💾</span>
            Twoje zapisane projekty
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-4 she-shadow hover:she-shadow-lg transition-all duration-200 border-2 border-transparent hover:border-she-primary"
              >
                <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-semibold text-she-dark mb-1">{project.name}</h4>
                <p className="text-xs text-she-primary mb-3">
                  {new Date(project.timestamp).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoadProject(project.id)}
                    className="flex-1 px-3 py-2 text-sm bg-she-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    Wczytaj
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Templates (no categories) */}
      <div>
        <h3 className="text-lg font-semibold text-she-dark mb-4 flex items-center">
          <span className="text-2xl mr-2">📦</span>
          Szablony
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECT_TEMPLATES.map((template) => (
            <Card
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className="cursor-pointer hover:scale-[1.01] transition-transform"
            >
              <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-semibold text-she-dark">{template.name}</h4>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
