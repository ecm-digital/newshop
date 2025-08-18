"use client";

import React from "react";
import { useConfigurator } from "@/store/configurator";
import { getProductConfig } from "@/config/products";
import jsPDF from "jspdf";

interface ProjectPDFProps {
  onExport: () => void;
}

export default function ProjectPDF({ onExport }: ProjectPDFProps) {
  const { selectedProduct, material, lining, hardware, embroidery, extras } = useConfigurator();
  const product = getProductConfig(selectedProduct);

  const generatePDF = async () => {
    if (!selectedProduct || !product) return;

    const projectData = {
      product: product.name,
      material: material || 'Nie wybrano',
      lining: lining || 'Nie wybrano',
      hardware: hardware || 'Nie wybrano',
      embroidery: embroidery.text || embroidery.presetId || 'Brak haftu',
      extras: extras.length > 0 ? extras.join(', ') : 'Brak dodatków',
      timestamp: new Date().toLocaleString('pl-PL'),
      projectId: `SHE-${Date.now()}`
    };

    // Create PDF document
    const doc = new jsPDF();
    
    // Add SHE Shop logo/header
    doc.setFontSize(24);
    doc.setTextColor(139, 115, 85); // SHE primary color
    doc.text('SHE SHOP', 105, 20, { align: 'center' });
    
    // Add subtitle
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('Konfiguracja Projektu', 105, 30, { align: 'center' });
    
    // Add project details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    let yPosition = 50;
    
    // Project ID and Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`ID Projektu: ${projectData.projectId}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Data utworzenia: ${projectData.timestamp}`, 20, yPosition);
    yPosition += 20;
    
    // Product section
    doc.setFontSize(14);
    doc.setTextColor(139, 115, 85);
    doc.text('PRODUKT', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(projectData.product, 20, yPosition);
    yPosition += 20;
    
    // Configuration section
    doc.setFontSize(14);
    doc.setTextColor(139, 115, 85);
    doc.text('KONFIGURACJA', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // Configuration details
    const configItems = [
      { label: 'Materiał', value: projectData.material },
      { label: 'Podszewka', value: projectData.lining },
      { label: 'Okucia', value: projectData.hardware },
      { label: 'Haft', value: projectData.embroidery },
      { label: 'Dodatki', value: projectData.extras }
    ];
    
    configItems.forEach(item => {
      if (item.value && item.value !== 'Nie wybrano' && item.value !== 'Brak haftu' && item.value !== 'Brak dodatków') {
        doc.text(`• ${item.label}: ${item.value}`, 25, yPosition);
        yPosition += 8;
      }
    });
    
    yPosition += 20;
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('=====================================', 20, yPosition);
    yPosition += 10;
    doc.text('SHE Shop - Personalizowane produkty tekstylne', 20, yPosition);
    yPosition += 10;
    doc.text('www.sheshop.pl', 20, yPosition);
    
    // Save the PDF
    doc.save(`she-project-${projectData.projectId}.pdf`);
    
    // Call the export callback
    onExport();
  };

  if (!selectedProduct) {
    return (
      <div className="bg-white rounded-2xl she-shadow p-6 text-center">
        <div className="text-5xl mb-4">📄</div>
        <h3 className="text-xl font-semibold text-she-dark mb-3">
          Eksport projektu
        </h3>
        <p className="text-base text-she-primary">
          Najpierw skonfiguruj produkt
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl she-shadow-lg p-6">
      <h3 className="text-lg font-semibold text-she-dark mb-4">Eksport projektu</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-2 border-b border-she-secondary/30">
          <span className="text-sm text-she-dark">Produkt:</span>
          <span className="text-sm font-medium text-she-primary">{product?.name}</span>
        </div>
        
        {material && (
          <div className="flex items-center justify-between py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Materiał:</span>
            <span className="text-sm font-medium text-she-primary">{material}</span>
          </div>
        )}
        
        {lining && (
          <div className="flex items-center justify-between py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Podszewka:</span>
            <span className="text-sm font-medium text-she-primary">{lining}</span>
          </div>
        )}
        
        {hardware && (
          <div className="flex items-center justify-between py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Okucia:</span>
            <span className="text-sm font-medium text-she-primary">{hardware}</span>
          </div>
        )}
        
        {(embroidery.text || embroidery.presetId) && (
          <div className="flex items-center justify-between py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Haft:</span>
            <span className="text-sm font-medium text-she-primary">
              {embroidery.text || embroidery.presetId}
            </span>
          </div>
        )}
        
        {extras.length > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-she-secondary/30">
            <span className="text-sm text-she-dark">Dodatki:</span>
            <span className="text-sm font-medium text-she-primary">
              {extras.join(', ')}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={generatePDF}
          className="w-full px-4 py-3 bg-she-primary text-white rounded-xl hover:bg-opacity-90 transition-all font-medium"
        >
          📄 Eksportuj do PDF
        </button>
        
        <div className="text-xs text-she-primary text-center">
          Projekt zostanie zapisany jako plik PDF
        </div>
      </div>
    </div>
  );
}
