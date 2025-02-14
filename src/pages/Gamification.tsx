import React, { useState } from 'react';
import { Trophy, Star, Award, TrendingUp, User } from 'lucide-react';

const leaderboard = [
  { id: 1, name: 'John Doe', points: 2500, badge: 'Eco Warrior' },
  { id: 2, name: 'Jane Smith', points: 2100, badge: 'Route Master' },
  { id: 3, name: 'Mike Johnson', points: 1800, badge: 'Early Adopter' }
];

export default function Gamification() {
  const [distance, setDistance] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel' | 'electric'>('petrol');
  const [result, setResult] = useState<{ fuelUsed: string; co2Emission: string } | null>(null);
  const [history, setHistory] = useState<{ distance: string; mileage: string; fuelUsed: string; co2Emission: string }[]>([]);

  const emissionFactors = {
    petrol: 2.3,
    diesel: 2.7,
    electric: 0,
  };

  const calculate = () => {
    const distanceNum = parseFloat(distance);
    const mileageNum = parseFloat(mileage);
    if (isNaN(distanceNum) || isNaN(mileageNum) || mileageNum <= 0) {
      alert('Please enter valid distance and mileage.');
      return;
    }
    
    const fuelUsed = (distanceNum / mileageNum).toFixed(2);
    const co2Emission = (fuelUsed * emissionFactors[fuelType]).toFixed(2);
    const newResult = { fuelUsed, co2Emission };
    setResult(newResult);
    setHistory([...history, { distance, mileage, fuelUsed, co2Emission }]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Calculate Travel Impact</h2>
        <div className="flex flex-col gap-4">
          <input type="number" placeholder="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} className="p-2 rounded-md bg-gray-700 text-white border border-gray-600" />
          <input type="number" placeholder="Mileage (km/l)" value={mileage} onChange={(e) => setMileage(e.target.value)} className="p-2 rounded-md bg-gray-700 text-white border border-gray-600" />
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value as 'petrol' | 'diesel' | 'electric')} className="p-2 rounded-md bg-gray-700 text-white border border-gray-600">
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
          <button onClick={calculate} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Calculate</button>
        </div>
        {result && (
          <div className="mt-4 text-white">
            <p>Fuel Used: {result.fuelUsed} liters</p>
            <p>CO₂ Emission: {result.co2Emission} kg</p>
          </div>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Profile & Travel History</h2>
        <div className="p-4 bg-gray-900 rounded-lg text-white space-y-3">
          <div className="flex items-center gap-4 border-b border-gray-700 pb-3">
            <User className="w-10 h-10 text-blue-400" />
            <div>
              <h3 className="font-semibold text-lg">User Profile</h3>
              <p className="text-sm text-gray-400">Track your travel impact and achievements.</p>
            </div>
          </div>
          {history.length > 0 ? (
            <div className="space-y-2">
              {history.map((entry, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-md border border-gray-700">
                  <p><strong>Distance:</strong> {entry.distance} km</p>
                  <p><strong>Mileage:</strong> {entry.mileage} km/l</p>
                  <p><strong>Fuel Used:</strong> {entry.fuelUsed} liters</p>
                  <p><strong>CO₂ Emission:</strong> {entry.co2Emission} kg</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No travel history yet.</p>
          )}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-blue-400">Rewards & Achievements</h1>

      <div className="grid grid-cols-1 md-grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
          <h3 className="font-semibold text-white">Your Points</h3>
          <p className="text-2xl font-bold text-yellow-400">1,250</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <Star className="w-8 h-8 text-blue-400 mb-2" />
          <h3 className="font-semibold text-white">Current Level</h3>
          <p className="text-2xl font-bold text-blue-400">15</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <Award className="w-8 h-8 text-purple-400 mb-2" />
          <h3 className="font-semibold text-white">Badges Earned</h3>
          <p className="text-2xl font-bold text-purple-400">8</p>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">Leaderboard</h2>
        <div className="space-y-4">
          {leaderboard.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-400">#{user.id}</span>
                <div>
                  <h3 className="font-semibold text-white">{user.name}</h3>
                  <span className="text-sm text-gray-400">{user.badge}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="font-bold text-green-400">{user.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}











