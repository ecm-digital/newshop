"use client";
import React from "react";
import { STEPS_ORDER, STEPS, isStepEnabled } from "@/config/steps";
import type { StepKey } from "@/types/configurator";
import { useConfigurator } from "@/store/configurator";

export default function Stepper() {
	const { step, isStepValid, goToStep, selectedProduct } = useConfigurator();

	function isStepCompleted(stepKey: StepKey): boolean {
		const stepIdx = STEPS_ORDER.indexOf(stepKey);
		const currentIdx = STEPS_ORDER.indexOf(step);
		return stepIdx < currentIdx && isStepValid(stepKey);
	}

	function isStepEnabledForProduct(stepKey: StepKey): boolean {
		return isStepEnabled(stepKey, selectedProduct);
	}

	// Always show all steps; only availability changes
	const stepsAll = STEPS_ORDER;
	const currentIdx = stepsAll.indexOf(step);

	return (
		<>
			{/* Desktop Stepper - Modern Design */}
			<div className="hidden lg:block mb-8">
				<div className="relative">
					{/* Progress Line */}
					<div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
						<div
							className="h-full bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-700 ease-out"
							style={{
								width: `${Math.round(((currentIdx + 1) / stepsAll.length) * 100)}%`
							}}
						/>
					</div>

					{/* Steps */}
					<div className="flex justify-between items-center">
						{stepsAll.map((stepKey, index) => {
							const allowedForProduct = isStepEnabledForProduct(stepKey);
							const disabled = !allowedForProduct || (!isStepValid(stepKey) && index > currentIdx);
							const isActive = stepKey === step;
							const completed = isStepCompleted(stepKey);

							return (
								<div key={stepKey} className="flex flex-col items-center">
									{/* Step Circle */}
									<button
										onClick={() => !disabled && goToStep(stepKey)}
										disabled={disabled}
										className={`
											relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-out
											${isActive
												? 'bg-gray-800 text-white shadow-lg scale-110 ring-4 ring-gray-200'
												: completed
												? 'bg-emerald-500 text-white shadow-md scale-105'
												: 'bg-white text-gray-400 border-2 border-gray-200 hover:border-gray-300 hover:scale-105'}
											${disabled ? 'cursor-not-allowed opacity-50 hover:scale-100' : 'cursor-pointer hover:shadow-md'}
										`}
									>
										{completed ? (
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
											</svg>
										) : (
											<span className="text-sm font-bold">{index + 1}</span>
										)}
									</button>

									{/* Step Label */}
									<div className="mt-3 text-center max-w-32">
										<div className={`
											text-sm font-semibold transition-all duration-300
											${isActive
												? 'text-gray-800'
												: completed
												? 'text-emerald-600'
												: 'text-gray-500'}
										`}>
											{STEPS.find(s => s.key === stepKey)?.label}
										</div>
									</div>

									{/* Active Indicator */}
									{isActive && (
										<div className="absolute -bottom-2 w-2 h-2 bg-gray-800 rounded-full animate-pulse" />
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Mobile Stepper - Enhanced Design */}
			<div className="lg:hidden mb-6">
				<div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
					{/* Progress Header */}
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gray-800 text-white rounded-2xl flex items-center justify-center">
								<span className="text-sm font-bold">{currentIdx + 1}</span>
							</div>
							<div>
								<div className="text-sm font-semibold text-gray-800">
									{STEPS.find(s => s.key === step)?.title}
								</div>
							</div>
						</div>
						
						<div className="text-right">
							<div className="text-2xl font-bold text-gray-800">
								{Math.round(((currentIdx + 1) / stepsAll.length) * 100)}%
							</div>
							<div className="text-xs text-gray-500">Ukończono</div>
						</div>
					</div>
					
					{/* Enhanced Progress Bar */}
					<div className="relative mb-4">
						<div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 transition-all duration-1000 ease-out rounded-full relative"
								style={{
									width: `${Math.round(((currentIdx + 1) / stepsAll.length) * 100)}%`
								}}
							>
								{/* Progress Bar Glow */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
							</div>
						</div>
						
						{/* Step Markers on Progress Bar */}
						<div className="absolute top-0 left-0 right-0 h-3 flex justify-between items-center px-1">
							{stepsAll.map((_, index) => (
								<div
									key={index}
									className={`
										w-2 h-2 rounded-full transition-all duration-300
										${index <= currentIdx ? 'bg-white shadow-sm' : 'bg-gray-300'}
									`}
								/>
							))}
						</div>
					</div>
					
					{/* Next Step Preview */}
					{currentIdx < stepsAll.length - 1 && (
						<div className="text-center p-3 bg-gray-50 rounded-2xl border border-gray-200">
							<div className="text-xs text-gray-500 mb-1">Następny krok:</div>
							<div className="text-sm font-medium text-gray-700">
								{STEPS.find(s => s.key === stepsAll[currentIdx + 1])?.title}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
