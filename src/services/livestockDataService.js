/**
 * LIVESTOCK DATA, HISTORY & VISUAL ANALYTICS SERVICE
 * Includes Cattle, Health Prediction History, Feed Inventory, Milk Yield History, and Centralized Alerts.
 */

export const INITIAL_CATTLE = [
  {
    id: 'C-024',
    name: 'Gauri',
    tagNumber: 'C-024',
    breed: 'Gir',
    age: '4 years',
    sex: 'Female',
    dateAcquired: '12 Aug 2024',
    initialMilkYield: 8.0,
    weightKg: 460,
    parentInfo: 'Dam: Lakshmi (G-012)',
    purchasePrice: '$1,200',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&auto=format&fit=crop&q=80',
    
    // Health Check & ML Status
    healthStatus: 'Healthy', // 'Healthy' | 'Needs Attention'
    lastCheckedDate: '14 Aug 2026',
    healthHistory: [
      {
        id: 'hh_1',
        date: '14 Aug 2026',
        result: 'Healthy',
        feedType: 'Green fodder',
        season: 'Summer',
        feedIntake: 'Normal',
        rumination: 'Normal',
        note: 'No immediate health risk detected.'
      },
      {
        id: 'hh_2',
        date: '08 Aug 2026',
        result: 'Healthy',
        feedType: 'Green fodder',
        season: 'Summer',
        feedIntake: 'Normal',
        rumination: 'Normal',
        note: 'No immediate health risk detected.'
      },
      {
        id: 'hh_3',
        date: '01 Aug 2026',
        result: 'Needs Attention',
        feedType: 'Mixed feed',
        season: 'Monsoon',
        feedIntake: 'Low',
        rumination: 'Very Low',
        note: 'The entered indicators suggest that veterinary examination may be appropriate.'
      }
    ],

    // Milk Yield
    todayMilkLiters: 8.2,
    morningMilkLiters: 5.0,
    eveningMilkLiters: 3.2,
    
    // Vaccinations
    vaccinations: [
      { id: 'v1', name: 'Rabies', status: 'Completed', dateCompleted: '15 Jan 2026' },
      { id: 'v2', name: 'FMD', status: 'Completed', dateCompleted: '12 Aug 2026' }
    ],
    nextVaccinationDue: '24 Aug',
    nextVaccinationName: 'FMD Booster',
    
    // Observation history
    latestObservation: {
      date: 'Today',
      eating: 'Eating normally',
      activity: 'Active',
      milkStatus: 'Normal',
      symptoms: ['None']
    }
  },
  {
    id: 'C-025',
    name: 'Kamdhenu',
    tagNumber: 'C-025',
    breed: 'Sahiwal',
    age: '3.5 years',
    sex: 'Female',
    dateAcquired: '20 May 2024',
    initialMilkYield: 7.5,
    weightKg: 490,
    parentInfo: 'Dam: Sita (S-008)',
    purchasePrice: '$1,400',
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=500&auto=format&fit=crop&q=80',
    
    healthStatus: 'Healthy',
    lastCheckedDate: '12 Aug 2026',
    healthHistory: [
      {
        id: 'hh_4',
        date: '12 Aug 2026',
        result: 'Healthy',
        feedType: 'Dry fodder',
        season: 'Summer',
        feedIntake: 'Normal',
        rumination: 'Normal',
        note: 'Optimal vitals.'
      }
    ],

    todayMilkLiters: 7.8,
    morningMilkLiters: 4.5,
    eveningMilkLiters: 3.3,
    
    vaccinations: [
      { id: 'v3', name: 'FMD', status: 'Completed', dateCompleted: '10 Feb 2026' },
      { id: 'v4', name: 'Brucellosis', status: 'Completed', dateCompleted: '01 Jul 2026' }
    ],
    nextVaccinationDue: '15 Sep',
    nextVaccinationName: 'Deworming',
    
    latestObservation: {
      date: 'Today',
      eating: 'Eating normally',
      activity: 'Active',
      milkStatus: 'Normal',
      symptoms: ['None']
    }
  },
  {
    id: 'C-026',
    name: 'Radha',
    tagNumber: 'C-026',
    breed: 'Red Sindhi',
    age: '5 years',
    sex: 'Female',
    dateAcquired: '14 Jan 2023',
    initialMilkYield: 6.5,
    weightKg: 440,
    parentInfo: 'Unknown',
    purchasePrice: '$1,100',
    image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=500&auto=format&fit=crop&q=80',
    
    healthStatus: 'Needs Attention',
    lastCheckedDate: 'Today',
    healthHistory: [
      {
        id: 'hh_5',
        date: 'Today',
        result: 'Needs Attention',
        feedType: 'Mixed feed',
        season: 'Monsoon',
        feedIntake: 'Low',
        rumination: 'Very Low',
        note: 'The entered indicators suggest that veterinary examination may be appropriate.'
      }
    ],

    todayMilkLiters: 6.4,
    morningMilkLiters: 3.8,
    eveningMilkLiters: 2.6,
    
    vaccinations: [
      { id: 'v5', name: 'Anthrax', status: 'Completed', dateCompleted: '10 Nov 2025' }
    ],
    nextVaccinationDue: 'Due in 3 days',
    nextVaccinationName: 'FMD Booster',
    
    latestObservation: {
      date: 'Today',
      eating: 'Less than usual',
      activity: 'Less active',
      milkStatus: 'Reduced',
      symptoms: ['Limping']
    }
  },
  {
    id: 'C-027',
    name: 'Sita',
    tagNumber: 'C-027',
    breed: 'Holstein Friesian',
    age: '4.2 years',
    sex: 'Female',
    dateAcquired: '05 Mar 2024',
    initialMilkYield: 9.0,
    weightKg: 530,
    parentInfo: 'Dam: Bella (H-001)',
    purchasePrice: '$1,650',
    image: 'https://images.unsplash.com/photo-1495539406979-bf61750d38ad?w=500&auto=format&fit=crop&q=80',
    
    healthStatus: 'Healthy',
    lastCheckedDate: '10 Aug 2026',
    healthHistory: [
      {
        id: 'hh_6',
        date: '10 Aug 2026',
        result: 'Healthy',
        feedType: 'Green fodder',
        season: 'Summer',
        feedIntake: 'Normal',
        rumination: 'Normal',
        note: 'Normal chewing and intake.'
      }
    ],

    todayMilkLiters: 9.1,
    morningMilkLiters: 5.5,
    eveningMilkLiters: 3.6,
    
    vaccinations: [
      { id: 'v6', name: 'Rabies', status: 'Completed', dateCompleted: '02 Mar 2026' },
      { id: 'v7', name: 'FMD', status: 'Completed', dateCompleted: '05 Aug 2026' }
    ],
    nextVaccinationDue: '30 Oct',
    nextVaccinationName: 'HS Vaccine',
    
    latestObservation: {
      date: 'Today',
      eating: 'Eating normally',
      activity: 'Active',
      milkStatus: 'Normal',
      symptoms: ['None']
    }
  }
];

export const INITIAL_FEED_INVENTORY = [
  {
    id: 'feed_1',
    name: 'Green Fodder (Napier Grass)',
    type: 'Green Fodder',
    currentStockKg: 320,
    dailyConsumptionKg: 20,
    minStockThresholdKg: 100,
    status: 'Good',
    statusColor: '#10b981',
    logs: [
      { id: 'fl1', date: 'Yesterday', change: '+ 300 kg', note: 'Added from local field harvest', cost: '₹ 0' },
      { id: 'fl0', date: '10 Aug 2026', change: '- 20 kg', note: 'Automated daily consumption', cost: 'N/A' }
    ]
  },
  {
    id: 'feed_2',
    name: 'Dry Straw (Wheat Bushels)',
    type: 'Dry Fodder',
    currentStockKg: 180,
    dailyConsumptionKg: 20,
    minStockThresholdKg: 150,
    status: 'Low',
    statusColor: '#f59e0b',
    logs: [
      { id: 'fl2', date: '3 days ago', change: '+ 200 kg', note: 'Purchased straw from Agromart', cost: '₹ 1,800' }
    ]
  },
  {
    id: 'feed_3',
    name: 'Cattle Concentrate Pellets',
    type: 'Concentrate',
    currentStockKg: 80,
    dailyConsumptionKg: 20,
    minStockThresholdKg: 120,
    status: 'Restock soon',
    statusColor: '#ef4444',
    logs: [
      { id: 'fl3', date: 'Today', change: '- 20 kg', note: 'Daily consumption deduction', cost: 'N/A' },
      { id: 'fl4', date: '05 Aug 2026', change: '+ 150 kg', note: 'Purchased high-protein feed', cost: '₹ 3,200' }
    ]
  }
];

// Historical Daily Milk Yield Records (7 Days)
export const HISTORICAL_MILK_LOGS = [
  { day: 'Mon', date: '08 Aug', totalLiters: 28.5, morning: 17.0, evening: 11.5, topCow: 'Sita (8.8L)' },
  { day: 'Tue', date: '09 Aug', totalLiters: 29.2, morning: 17.5, evening: 11.7, topCow: 'Sita (8.9L)' },
  { day: 'Wed', date: '10 Aug', totalLiters: 30.0, morning: 18.0, evening: 12.0, topCow: 'Gauri (8.4L)' },
  { day: 'Thu', date: '11 Aug', totalLiters: 29.8, morning: 17.8, evening: 12.0, topCow: 'Sita (9.0L)' },
  { day: 'Fri', date: '12 Aug', totalLiters: 30.5, morning: 18.2, evening: 12.3, topCow: 'Sita (9.1L)' },
  { day: 'Sat', date: '13 Aug', totalLiters: 29.2, morning: 17.4, evening: 11.8, topCow: 'Gauri (8.3L)' },
  { day: 'Today', date: '14 Aug', totalLiters: 31.5, morning: 18.8, evening: 12.7, topCow: 'Sita (9.1L)' }
];

// Whole Feed Stock Transaction & Usage Log
export const FEED_TRANSACTION_HISTORY = [
  { id: 't1', date: '14 Aug (Today)', feedName: 'Cattle Concentrate Pellets', type: 'Deduction', qty: '- 20 kg', remaining: '80 kg', note: 'Daily Herd Usage', cost: '-' },
  { id: 't2', date: '13 Aug (Yesterday)', feedName: 'Green Fodder (Napier Grass)', type: 'Stock Added', qty: '+ 300 kg', remaining: '320 kg', note: 'Harvest Restock', cost: '₹ 0' },
  { id: 't3', date: '11 Aug 2026', feedName: 'Dry Straw (Wheat Bushels)', type: 'Stock Added', qty: '+ 200 kg', remaining: '180 kg', note: 'Agromart Delivery', cost: '₹ 1,800' },
  { id: 't4', date: '08 Aug 2026', feedName: 'Green Fodder (Napier Grass)', type: 'Deduction', qty: '- 20 kg', remaining: '40 kg', note: 'Daily Herd Usage', cost: '-' },
  { id: 't5', date: '05 Aug 2026', feedName: 'Cattle Concentrate Pellets', type: 'Stock Added', qty: '+ 150 kg', remaining: '100 kg', note: 'Bulk Purchase', cost: '₹ 3,200' }
];

export const INITIAL_ALERTS = [
  {
    id: 'alt_101',
    type: 'HIGH PRIORITY',
    target: 'Cattle',
    targetId: 'C-026',
    title: 'Radha - Health Attention Required',
    message: 'Radha reported Low Feed Intake and Very Low Rumination. Health check prediction: Needs Attention.',
    color: '#ef4444',
    time: '10 mins ago',
    screenRoute: 'cow_profile'
  },
  {
    id: 'alt_102',
    type: 'VACCINATION',
    target: 'Cattle',
    targetId: 'C-026',
    title: 'Radha - FMD Vaccination Due Soon',
    message: 'Foot & Mouth Disease booster scheduled in 3 days.',
    color: '#f59e0b',
    time: '2 hours ago',
    screenRoute: 'cow_profile'
  },
  {
    id: 'alt_103',
    type: 'FEED',
    target: 'Feed',
    targetId: 'feed_3',
    title: 'Cattle Concentrate Restock Required',
    message: 'Only 4 days of feed remaining (80 kg estimated stock).',
    color: '#ef4444',
    time: '4 hours ago',
    screenRoute: 'add_feed'
  },
  {
    id: 'alt_104',
    type: 'PRODUCTION',
    target: 'Milk',
    targetId: null,
    title: 'Milk Yield Trend (+8%)',
    message: 'Total production reached 31.5 L today across 4 cattle.',
    color: '#10b981',
    time: '08:00 AM',
    screenRoute: 'milk'
  }
];

/**
 * Dynamically computes real-time alerts based on actual farm cattle status & feed inventory.
 */
export function generateDynamicAlerts(cattleList = [], feedInventory = [], language = 'en') {
  const isHi = language === 'hi';
  const alerts = [];

  // 1. Check Cattle Health & Vaccination Status
  cattleList.forEach(cow => {
    const cowDisplayName = isHi ? (cow.name === 'Gauri' ? 'गौरी' : cow.name === 'Kamdhenu' ? 'कामधेनु' : cow.name === 'Radha' ? 'राधा' : cow.name === 'Sita' ? 'सीता' : cow.name) : cow.name;

    if (cow.healthStatus === 'Needs Attention') {
      const lastNote = isHi 
        ? `${cowDisplayName} का चारा खाना कम एवं जुगाली बहुत कम दर्ज की गई। स्वास्थ्य जांच में ध्यान देने की आवश्यकता है।`
        : (cow.healthHistory?.[0]?.recommendation || 'Health check flagged potential illness. Veterinary check recommended.');
      alerts.push({
        id: `alt_h_${cow.id}`,
        type: isHi ? 'उच्च प्राथमिकता (HIGH PRIORITY)' : 'HIGH PRIORITY',
        target: 'Cattle',
        targetId: cow.id,
        title: isHi ? `🚨 ${cowDisplayName} (${cow.tagNumber}) - स्वास्थ्य जांच आवश्यक` : `🚨 ${cow.name} (${cow.tagNumber}) - Health Check Required`,
        message: lastNote,
        color: '#ef4444',
        time: isHi ? '10 मिनट पहले' : '10 mins ago',
        screenRoute: 'cow_profile'
      });
    }

    const dueStr = (cow.nextVaccinationDue || '').toLowerCase();
    const isDueVaccine = cow.nextVaccinationDue && !dueStr.includes('completed') && !dueStr.includes('पूर्ण') && (
      dueStr.includes('due') ||
      dueStr.includes('today') ||
      dueStr.includes('days') ||
      dueStr.includes('overdue') ||
      dueStr.includes('दिन') ||
      dueStr.includes('आज') ||
      dueStr.includes('शेष') ||
      dueStr.includes('निकट')
    );

    if (isDueVaccine) {
      alerts.push({
        id: `alt_v_${cow.id}`,
        type: isHi ? 'टीकाकरण सूचना (VACCINATION)' : 'VACCINATION',
        target: 'Cattle',
        targetId: cow.id,
        title: isHi ? `💉 ${cowDisplayName} (${cow.tagNumber}) - खुरपका-मुंहपका (FMD) टीका निकट है` : `💉 ${cow.name} (${cow.tagNumber}) - ${cow.nextVaccinationName || 'Vaccination'} Due`,
        message: isHi ? `खुरपका-मुंहपका बीमारी (FMD) बूस्टर 3 दिनों में अनुसूचित है।` : `Scheduled vaccination due date: ${cow.nextVaccinationDue}`,
        color: '#f59e0b',
        time: isHi ? '2 घंटे पहले' : '2 hours ago',
        screenRoute: 'cow_profile'
      });
    }
  });

  // 2. Check Feed Stock Levels
  feedInventory.forEach(feed => {
    const daysLeft = Math.round((feed.currentStockKg || 0) / (feed.dailyConsumptionKg || 1));
    let feedDisplayName = feed.name;
    if (isHi) {
      if (feed.name.includes('Green') || feed.name.includes('Napier')) feedDisplayName = 'हरा चारा (नेपियर घास)';
      else if (feed.name.includes('Dry') || feed.name.includes('Straw') || feed.name.includes('Wheat')) feedDisplayName = 'सूखा भूसा (गेहूं भूसा)';
      else if (feed.name.includes('Concentrate') || feed.name.includes('Pellets')) feedDisplayName = 'पशु दाना / पोषाहार गोली';
    }

    if (daysLeft <= 5 || feed.status !== 'Good') {
      const isUrgent = daysLeft <= 3 || feed.status === 'Restock soon';
      alerts.push({
        id: `alt_f_${feed.id}`,
        type: isHi ? 'चारा स्टॉक अलर्ट (FEED)' : 'FEED DEPLETION',
        target: 'Feed',
        targetId: feed.id,
        title: isHi ? `🌾 ${feedDisplayName} - पुनः भंडारण आवश्यक` : `🌾 ${feed.name} - ${daysLeft} Days Stock Remaining`,
        message: isHi ? `केवल ${daysLeft} दिनों का चारा शेष है (${feed.currentStockKg} किग्रा अनुमानित स्टॉक)। नया स्टॉक जोड़ने के लिए टैप करें।` : `Stock level: ${feed.currentStockKg} kg. Daily herd consumption: ${feed.dailyConsumptionKg} kg/day. Tap to add stock.`,
        color: isUrgent ? '#ef4444' : '#f59e0b',
        time: isHi ? '4 घंटे पहले' : '4 hours ago',
        screenRoute: 'add_feed'
      });
    }
  });

  // 3. Overall Production Summary Alert
  const totalMilkToday = cattleList.reduce((acc, curr) => acc + (curr.todayMilkLiters || 0), 0).toFixed(1);
  alerts.push({
    id: 'alt_prod_today',
    type: isHi ? 'दूध उत्पादन (PRODUCTION)' : 'PRODUCTION',
    target: 'Milk',
    targetId: null,
    title: isHi ? `🥛 दूध उत्पादन रुझान (+8%)` : `🥛 Today's Farm Milk Production: ${totalMilkToday} L`,
    message: isHi ? `आज 4 पशुओं से कुल दूध उत्पादन ${totalMilkToday} लीटर तक पहुंच गया है।` : `Total milk collected today across ${cattleList.length} cattle. Tap to view yield breakdown.`,
    color: '#10b981',
    time: isHi ? 'सुबह 08:00 बजे' : '08:00 AM',
    screenRoute: 'milk'
  });

  return alerts;
}

/**
 * Predicts Cow Health based on the 4 questionnaire inputs
 */
export function predictCowHealth(feedType, season, feedIntake, rumination) {
  let isUnhealthy = false;

  if (feedIntake === 'Very Low' || rumination === 'Very Low') {
    isUnhealthy = true;
  } else if (feedIntake === 'Low' && rumination === 'Low') {
    isUnhealthy = true;
  } else if (feedIntake === 'Low' && season === 'Monsoon') {
    isUnhealthy = true;
  }

  if (isUnhealthy) {
    return {
      result: 'Needs Attention',
      statusText: 'NOT HEALTHY / NEEDS ATTENTION',
      color: '#ef4444',
      recommendation: 'Based on the information entered, the cow may require attention. Please consider contacting/visiting a veterinary hospital for further examination.'
    };
  }

  return {
    result: 'Healthy',
    statusText: 'HEALTHY',
    color: '#10b981',
    recommendation: 'The cow appears healthy based on the entered information. No immediate veterinary attention indicated.'
  };
}
