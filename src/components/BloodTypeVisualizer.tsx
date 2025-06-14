'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Zap } from 'lucide-react';

// Blood type data with compatibility information
const bloodTypes = [
  { type: 'O-', label: 'O Negative', color: 'bg-red-600', canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-'] },
  { type: 'O+', label: 'O Positive', color: 'bg-red-500', canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O-', 'O+'] },
  { type: 'A-', label: 'A Negative', color: 'bg-blue-600', canDonateTo: ['A-', 'A+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'A-'] },
  { type: 'A+', label: 'A Positive', color: 'bg-blue-500', canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+'] },
  { type: 'B-', label: 'B Negative', color: 'bg-green-600', canDonateTo: ['B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'B-'] },
  { type: 'B+', label: 'B Positive', color: 'bg-green-500', canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'B-', 'B+'] },
  { type: 'AB-', label: 'AB Negative', color: 'bg-purple-600', canDonateTo: ['AB-', 'AB+'], canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'] },
  { type: 'AB+', label: 'AB Positive', color: 'bg-purple-500', canDonateTo: ['AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] },
];

interface BloodTypeCardProps {
  bloodType: typeof bloodTypes[0];
  isSelected: boolean;
  isCompatible: boolean;
  onClick: () => void;
  animationDelay: number;
}

const BloodTypeCard = ({ bloodType, isSelected, isCompatible, onClick, animationDelay }: BloodTypeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.5 }}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        ${isSelected ? 'ring-4 ring-yellow-400 shadow-xl' : ''}
        ${isCompatible && !isSelected ? 'ring-2 ring-green-400 shadow-lg' : ''}
        ${bloodType.color} text-white p-6
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-bold">{bloodType.type}</div>
        <Heart className="w-6 h-6" />
      </div>
      <div className="text-sm opacity-90">{bloodType.label}</div>
      
      {/* Pulse animation for selected card */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-white"
          animate={{
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Compatibility glow */}
      {isCompatible && !isSelected && (
        <motion.div
          className="absolute inset-0 bg-green-400"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

const CompatibilityVisualization = ({ selectedType, mode }: { selectedType: typeof bloodTypes[0], mode: 'donor' | 'recipient' }) => {
  const compatibleTypes = mode === 'donor' ? selectedType.canDonateTo : selectedType.canReceiveFrom;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {mode === 'donor' ? `${selectedType.type} can donate to:` : `${selectedType.type} can receive from:`}
        </h3>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          {mode === 'donor' ? <Users className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
          <span>{compatibleTypes.length} compatible blood types</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {compatibleTypes.map((type, index) => {
          const bloodTypeData = bloodTypes.find(bt => bt.type === type)!;
          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`${bloodTypeData.color} text-white p-3 rounded-lg text-center font-semibold shadow-md`}
            >
              {type}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default function BloodTypeVisualizer() {
  const [selectedBloodType, setSelectedBloodType] = useState<typeof bloodTypes[0] | null>(null);
  const [mode, setMode] = useState<'donor' | 'recipient'>('donor');

  const getCompatibleTypes = (bloodType: typeof bloodTypes[0]) => {
    return mode === 'donor' ? bloodType.canDonateTo : bloodType.canReceiveFrom;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Mode Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-lg">
          <button
            onClick={() => setMode('donor')}
            className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 flex items-center gap-2 ${
              mode === 'donor' 
                ? 'bg-red-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Users className="w-5 h-5" />
            Donor Mode
          </button>
          <button
            onClick={() => setMode('recipient')}
            className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 flex items-center gap-2 ${
              mode === 'recipient' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            <Heart className="w-5 h-5" />
            Recipient Mode
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mb-8">
        <div className="bg-white rounded-lg p-4 shadow-md inline-block">
          <p className="text-gray-700 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Click on a blood type to see compatibility
          </p>
        </div>
      </div>

      {/* Compatibility Visualization */}
      <AnimatePresence>
        {selectedBloodType && (
          <CompatibilityVisualization selectedType={selectedBloodType} mode={mode} />
        )}
      </AnimatePresence>

      {/* Blood Type Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {bloodTypes.map((bloodType, index) => (
          <BloodTypeCard
            key={bloodType.type}
            bloodType={bloodType}
            isSelected={selectedBloodType?.type === bloodType.type}
            isCompatible={selectedBloodType ? getCompatibleTypes(selectedBloodType).includes(bloodType.type) : false}
            onClick={() => setSelectedBloodType(bloodType)}
            animationDelay={index * 0.1}
          />
        ))}
      </div>

      {/* Educational Information */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Blood Donation Facts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-bold text-lg text-red-600 mb-2">Universal Donors</h4>
            <p className="text-gray-700">
              <span className="font-semibold">O- (O Negative)</span> is the universal donor. 
              People with O- blood can donate to anyone, making them incredibly valuable in emergencies.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-bold text-lg text-purple-600 mb-2">Universal Recipients</h4>
            <p className="text-gray-700">
              <span className="font-semibold">AB+ (AB Positive)</span> is the universal recipient. 
              People with AB+ blood can receive blood from anyone, but can only donate to other AB+ individuals.
            </p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Every 2 seconds, someone in the US needs blood. Your donation can save up to 3 lives!
          </p>
        </div>
      </div>
    </div>
  );
}
