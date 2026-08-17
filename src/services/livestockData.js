export const INITIAL_LIVESTOCK = [
  {
    id: 'LS-101',
    name: 'Bella',
    tagNumber: 'COW-101',
    type: 'Cattle',
    breed: 'Holstein Friesian',
    gender: 'Female',
    age: '3.5 yrs',
    weightKg: 580,
    status: 'Optimal', // Optimal, Warning, Critical
    statusText: 'Healthy & Active',
    temperature: 38.6, // Normal bovine temp 38.0 - 39.3 C
    tempUnit: '°C',
    heartRate: 68, // Normal 60-80 bpm
    ruminationHrs: 8.2, // Normal ~7-9 hrs
    activityLevel: 'Active',
    lastUpdated: '10 mins ago',
    location: 'North Pasture Zone A',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=400&q=80',
    recentLogs: [
      { id: 'l1', time: 'Today 08:30 AM', note: 'Morning milking complete: 18.5 Liters. Vitals nominal.' },
      { id: 'l2', time: 'Yesterday 04:15 PM', note: 'Vaccinated for Foot & Mouth Disease (FMD booster).' }
    ]
  },
  {
    id: 'LS-102',
    name: 'Thunder',
    tagNumber: 'BULL-04',
    type: 'Cattle',
    breed: 'Sahiwal',
    gender: 'Male',
    age: '4 yrs',
    weightKg: 720,
    status: 'Warning',
    statusText: 'Elevated Temperature',
    temperature: 39.9, // Mild fever
    tempUnit: '°C',
    heartRate: 84,
    ruminationHrs: 4.5, // Reduced rumination
    activityLevel: 'Lethargic',
    lastUpdated: '2 mins ago',
    location: 'Barn Shed #2',
    image: 'https://images.unsplash.com/photo-1570042707223-b541315b678c?auto=format&fit=crop&w=400&q=80',
    recentLogs: [
      { id: 'l3', time: 'Today 10:15 AM', note: 'Alert triggered: Temp elevated to 39.9°C. Vet notified.' },
      { id: 'l4', time: 'Today 07:00 AM', note: 'Feed intake reduced by 35% compared to baseline.' }
    ]
  },
  {
    id: 'LS-103',
    name: 'Daisy',
    tagNumber: 'GT-088',
    type: 'Goat',
    breed: 'Jamnapari',
    gender: 'Female',
    age: '1.8 yrs',
    weightKg: 42,
    status: 'Optimal',
    statusText: 'Optimal Health',
    temperature: 39.1,
    tempUnit: '°C',
    heartRate: 75,
    ruminationHrs: 7.8,
    activityLevel: 'Active',
    lastUpdated: '15 mins ago',
    location: 'South Grazing Hill',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=400&q=80',
    recentLogs: [
      { id: 'l5', time: 'Yesterday 09:00 AM', note: 'Routine hooves trimming completed smoothly.' }
    ]
  },
  {
    id: 'LS-104',
    name: 'Max',
    tagNumber: 'SHP-202',
    type: 'Sheep',
    breed: 'Dorper',
    gender: 'Male',
    age: '2 yrs',
    weightKg: 65,
    status: 'Optimal',
    statusText: 'Normal Vitals',
    temperature: 38.9,
    tempUnit: '°C',
    heartRate: 72,
    ruminationHrs: 8.0,
    activityLevel: 'Active',
    lastUpdated: '1 hour ago',
    location: 'West Enclosure B',
    image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=400&q=80',
    recentLogs: [
      { id: 'l6', time: '3 days ago', note: 'Deworming treatment administered.' }
    ]
  }
];

export const RECENT_LIVESTOCK_ALERTS = [
  {
    id: 'alt_1',
    livestockTag: 'BULL-04',
    animalName: 'Thunder',
    type: 'Fever Warning',
    message: 'Body temp reached 39.9°C (+1.2°C above baseline). Low activity detected in Barn Shed #2.',
    time: '10:15 AM',
    severity: 'high'
  },
  {
    id: 'alt_2',
    livestockTag: 'COW-101',
    animalName: 'Bella',
    type: 'Grazing Geofence',
    message: 'Returned to North Pasture Zone A safely.',
    time: '08:45 AM',
    severity: 'info'
  }
];
