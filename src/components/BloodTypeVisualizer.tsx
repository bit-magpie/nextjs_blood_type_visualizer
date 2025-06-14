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
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: animationDelay, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-blue-300
        ${isSelected ? 'ring-4 ring-yellow-400 shadow-2xl scale-105' : ''}
        ${isCompatible && !isSelected ? 'ring-3 ring-green-400 shadow-xl' : ''}
        ${bloodType.color} text-white min-h-[120px] md:min-h-[140px]
      `}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${bloodType.label} blood type ${isSelected ? '(selected)' : ''} ${isCompatible ? '(compatible)' : ''}`}
      whileHover={{ 
        scale: isSelected ? 1.05 : 1.08,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="p-4 md:p-6 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl md:text-2xl font-bold">{bloodType.type}</div>
          <motion.div
            animate={isSelected ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: isSelected ? Infinity : 0, repeatDelay: 2 }}
          >
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        </div>
        <div className="text-xs md:text-sm opacity-90 font-medium">{bloodType.label}</div>
      </div>
      
      {/* Pulse animation for selected card */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-white rounded-2xl"
          animate={{
            opacity: [0, 0.15, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Compatibility glow */}
      {isCompatible && !isSelected && (
        <motion.div
          className="absolute inset-0 bg-green-400 rounded-2xl"
          animate={{
            opacity: [0, 0.25, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Hover shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </motion.div>
  );
};

const CompatibilityVisualization = ({ selectedType, mode }: { selectedType: typeof bloodTypes[0], mode: 'donor' | 'recipient' }) => {
  const compatibleTypes = mode === 'donor' ? selectedType.canDonateTo : selectedType.canReceiveFrom;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
    >
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {mode === 'donor' ? `${selectedType.type} can donate to:` : `${selectedType.type} can receive from:`}
        </motion.h3>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {mode === 'donor' ? <Users className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
          </motion.div>
          <span className="font-medium">{compatibleTypes.length} compatible blood types</span>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {compatibleTypes.map((type, index) => {
          const bloodTypeData = bloodTypes.find(bt => bt.type === type)!;
          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: -30, rotateY: -90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.5,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                transition: { duration: 0.3 }
              }}
              className={`${bloodTypeData.color} text-white p-4 rounded-xl text-center font-bold shadow-lg cursor-pointer transform hover:shadow-xl`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ 
                  delay: index * 0.3,
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {type}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const BloodTypeStats = ({ bloodType }: { bloodType: typeof bloodTypes[0] }) => {
  const donorCount = bloodType.canDonateTo.length;
  const recipientCount = bloodType.canReceiveFrom.length;
  const isUniversalDonor = bloodType.type === 'O-';
  const isUniversalRecipient = bloodType.type === 'AB+';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-xl border border-indigo-200 mb-8"
    >
      <h4 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          📊
        </motion.div>
        {bloodType.type} Statistics
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{donorCount}</div>
          <div className="text-sm text-gray-600">Can donate to</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{recipientCount}</div>
          <div className="text-sm text-gray-600">Can receive from</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {isUniversalDonor ? '🎯' : isUniversalRecipient ? '🎁' : '🩸'}
          </div>
          <div className="text-sm text-gray-600">
            {isUniversalDonor ? 'Universal Donor' : isUniversalRecipient ? 'Universal Recipient' : 'Standard Type'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round((donorCount / 8) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Compatibility</div>
        </div>
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
    <div className="max-w-7xl mx-auto px-4">
      {/* Mode Selection */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100">
          <motion.button
            onClick={() => setMode('donor')}
            className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
              mode === 'donor' 
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            }`}
            whileHover={{ scale: mode === 'donor' ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={mode === 'donor' ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 1.5, repeat: mode === 'donor' ? Infinity : 0, repeatDelay: 3 }}
            >
              <Users className="w-5 h-5" />
            </motion.div>
            Donor Mode
          </motion.button>
          <motion.button
            onClick={() => setMode('recipient')}
            className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
              mode === 'recipient' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
            }`}
            whileHover={{ scale: mode === 'recipient' ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={mode === 'recipient' ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: mode === 'recipient' ? Infinity : 0, repeatDelay: 2 }}
            >
              <Heart className="w-5 h-5" />
            </motion.div>
            Recipient Mode
          </motion.button>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 shadow-lg inline-block border border-yellow-200">
          <p className="text-gray-700 flex items-center gap-2 font-medium">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-5 h-5 text-yellow-500" />
            </motion.div>
            Click on a blood type to see compatibility
          </p>
        </div>
      </motion.div>

      {/* Reset Selection Button */}
      {selectedBloodType && (
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <motion.button
            onClick={() => setSelectedBloodType(null)}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Selection
          </motion.button>
        </motion.div>
      )}

      {/* Compatibility Visualization */}
      <AnimatePresence mode="wait">
        {selectedBloodType && (
          <>
            <BloodTypeStats bloodType={selectedBloodType} />
            <CompatibilityVisualization selectedType={selectedBloodType} mode={mode} />
          </>
        )}
      </AnimatePresence>

      {/* Blood Type Stats */}
      {selectedBloodType && (
        <BloodTypeStats bloodType={selectedBloodType} />
      )}

      {/* Blood Type Grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
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
      </motion.div>

      {/* Educational Information */}
      <motion.div 
        className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 lg:p-8 shadow-xl border border-purple-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.h3 
          className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Blood Donation Facts
        </motion.h3>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg border border-red-100 hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold text-xl text-red-600 mb-3 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Universal Donors
            </h4>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-red-700">O- (O Negative)</span> is the universal donor. 
              People with O- blood can donate to anyone, making them incredibly valuable in emergencies.
            </p>
          </motion.div>
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold text-xl text-purple-600 mb-3 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Universal Recipients
            </h4>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-purple-700">AB+ (AB Positive)</span> is the universal recipient. 
              People with AB+ blood can receive blood from anyone, but can only donate to other AB+ individuals.
            </p>
          </motion.div>
        </div>
        <motion.div 
          className="mt-6 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-sm lg:text-base text-gray-600 font-medium">
            ❤️ Every 2 seconds, someone in the US needs blood. Your donation can save up to 3 lives! ❤️
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
