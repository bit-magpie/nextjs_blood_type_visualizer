'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Zap, User } from 'lucide-react';

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

// Blood packet component - shaped like IV blood bags with blood type label
const BloodPacket = ({ bloodType, isSelected, onClick }: { 
  bloodType: typeof bloodTypes[0]; 
  isSelected: boolean; 
  onClick: () => void; 
}) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Blood packet shape */}
      <motion.div
        className={`
          relative w-24 h-32 md:w-32 md:h-40 rounded-t-full rounded-b-lg ${bloodType.color} 
          shadow-2xl border-4 border-white
          ${isSelected ? 'ring-4 ring-yellow-400' : ''}
        `}
        animate={isSelected ? { 
          scale: [1, 1.05, 1],
          boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 20px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
        } : {}}
        transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
      >
        {/* Blood packet tube at top */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-6 md:w-4 md:h-8 bg-gray-300 rounded-t-md border-2 border-white"></div>
        
        {/* Blood type label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-lg p-1 md:p-2 shadow-md">
            <div className="text-lg md:text-2xl font-bold text-gray-800">{bloodType.type}</div>
          </div>
        </div>
        
        {/* Liquid animation inside packet */}
        {isSelected && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-red-400 rounded-b-lg opacity-70"
            animate={{ height: ['20%', '80%', '20%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Human icon component for vertical lines
const HumanIcon = ({ bloodType, isActive, position, side }: { 
  bloodType: string; 
  isActive: boolean; 
  position: number;
  side: 'left' | 'right';
}) => {
  return (
    <motion.div
      className="relative flex flex-col items-center mb-4"
      initial={{ opacity: 0.3, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1.1 : 0.8,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`
          w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold
          ${isActive ? 'bg-red-500 shadow-lg' : 'bg-gray-400'}
        `}
        animate={isActive ? { 
          boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 15px rgba(239, 68, 68, 0)']
        } : {}}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
      >
        <User className="w-5 h-5 md:w-6 md:h-6" />
      </motion.div>
      <div className="text-xs font-semibold mt-1 text-gray-700">{bloodType}</div>
    </motion.div>
  );
};

// Animated blood flow from packet to human icons
const BloodFlow = ({ 
  from, 
  to, 
  isActive, 
  delay = 0 
}: { 
  from: { x: number; y: number }; 
  to: { x: number; y: number }; 
  isActive: boolean;
  delay?: number;
}) => {
  if (!isActive) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <marker
          id={`arrowhead-${delay}`}
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#dc2626"
          />
        </marker>
      </defs>
      
      {/* Animated blood flow line */}
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#ef4444"
        strokeWidth="3"
        strokeDasharray="8,4"
        markerEnd={`url(#arrowhead-${delay})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration: 1.5, 
          delay,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
      
      {/* Animated blood droplets */}
      <motion.circle
        r="4"
        fill="#dc2626"
        initial={{ 
          x: from.x,
          y: from.y,
          opacity: 0
        }}
        animate={{ 
          x: to.x,
          y: to.y,
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 2, 
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </svg>
  );
};

export default function BloodTypeVisualizer() {
  const [selectedBloodType, setSelectedBloodType] = useState<typeof bloodTypes[0] | null>(null);
  const [mode, setMode] = useState<'donor' | 'recipient'>('donor');

  const getDonorTypes = (bloodType: typeof bloodTypes[0]) => {
    return bloodTypes.filter(bt => bt.canDonateTo.includes(bloodType.type));
  };

  const getRecipientTypes = (bloodType: typeof bloodTypes[0]) => {
    return bloodTypes.filter(bt => bloodType.canDonateTo.includes(bt.type));
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
            className={`px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 md:gap-3 text-sm md:text-base ${
              mode === 'donor' 
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            }`}
            whileHover={{ scale: mode === 'donor' ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-4 h-4 md:w-5 md:h-5" />
            Show Donors
          </motion.button>
          <motion.button
            onClick={() => setMode('recipient')}
            className={`px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 md:gap-3 text-sm md:text-base ${
              mode === 'recipient' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105' 
                : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
            }`}
            whileHover={{ scale: mode === 'recipient' ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Heart className="w-4 h-4 md:w-5 md:h-5" />
            Show Recipients
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
          <p className="text-gray-700 flex items-center gap-2 font-medium text-sm md:text-base">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
            Click on a blood packet to see compatibility flow
          </p>
        </div>
      </motion.div>

      {/* Blood packet selector */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 mb-8 justify-center">
        {bloodTypes.map((bloodType, index) => (
          <motion.div
            key={bloodType.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex justify-center"
          >
            <BloodPacket
              bloodType={bloodType}
              isSelected={selectedBloodType?.type === bloodType.type}
              onClick={() => setSelectedBloodType(bloodType)}
            />
          </motion.div>
        ))}
      </div>

      {/* Main visualization area with blood packet in middle and vertical lines of humans */}
      <AnimatePresence>
        {selectedBloodType && (
          <motion.div
            className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-4 md:p-8 shadow-2xl border border-blue-200 min-h-[500px] md:min-h-[600px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Central blood packet */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <BloodPacket
                bloodType={selectedBloodType}
                isSelected={true}
                onClick={() => {}}
              />
            </div>

            {/* Left vertical line of human icons */}
            <div className="absolute left-2 md:left-8 top-8 bottom-20 w-20 md:w-32">
              <div className="text-center mb-4">
                <h3 className="text-sm md:text-xl font-bold text-gray-800">
                  {mode === 'donor' ? 'Sources' : 'Can Give To'}
                </h3>
              </div>
              <div className="space-y-2 md:space-y-4 max-h-96 overflow-y-auto">
                {(mode === 'donor' ? selectedBloodType.canReceiveFrom : getRecipientTypes(selectedBloodType).map(bt => bt.type))
                  .slice(0, 8)
                  .map((type, index) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      <HumanIcon
                        bloodType={type}
                        isActive={true}
                        position={index}
                        side="left"
                      />
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Right vertical line of human icons */}
            <div className="absolute right-2 md:right-8 top-8 bottom-20 w-20 md:w-32">
              <div className="text-center mb-4">
                <h3 className="text-sm md:text-xl font-bold text-gray-800">
                  {mode === 'donor' ? 'Recipients' : 'Sources'}
                </h3>
              </div>
              <div className="space-y-2 md:space-y-4 max-h-96 overflow-y-auto">
                {(mode === 'donor' ? selectedBloodType.canDonateTo : getDonorTypes(selectedBloodType).map(bt => bt.type))
                  .slice(0, 8)
                  .map((type, index) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      <HumanIcon
                        bloodType={type}
                        isActive={true}
                        position={index}
                        side="right"
                      />
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Animated blood flows from center packet to right humans */}
            {(mode === 'donor' ? selectedBloodType.canDonateTo : getDonorTypes(selectedBloodType).map(bt => bt.type))
              .slice(0, 8)
              .map((type, index) => (
                <BloodFlow
                  key={`flow-right-${type}-${index}`}
                  from={{ x: typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 400, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 250 : 300 }}
                  to={{ x: typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 600, y: 120 + index * (typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 60) }}
                  isActive={true}
                  delay={index * 0.3}
                />
              ))}

            {/* Animated blood flows from left humans to center packet */}
            {(mode === 'donor' ? selectedBloodType.canReceiveFrom : getRecipientTypes(selectedBloodType).map(bt => bt.type))
              .slice(0, 8)
              .map((type, index) => (
                <BloodFlow
                  key={`flow-left-${type}-${index}`}
                  from={{ x: typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 120, y: 120 + index * (typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 60) }}
                  to={{ x: typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 400, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 250 : 300 }}
                  isActive={true}
                  delay={index * 0.3 + 0.5}
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Information */}
      <motion.div 
        className="mt-8 md:mt-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl border border-purple-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
          Blood Donation Facts
        </h3>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-red-100 hover:shadow-xl">
            <h4 className="font-bold text-lg md:text-xl text-red-600 mb-2 md:mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
              Universal Donors
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              <span className="font-semibold text-red-700">O- (O Negative)</span> is the universal donor. 
              People with O- blood can donate to anyone, making them incredibly valuable in emergencies.
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-purple-100 hover:shadow-xl">
            <h4 className="font-bold text-lg md:text-xl text-purple-600 mb-2 md:mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
              Universal Recipients
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              <span className="font-semibold text-purple-700">AB+ (AB Positive)</span> is the universal recipient. 
              People with AB+ blood can receive blood from anyone, but can only donate to other AB+ individuals.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
