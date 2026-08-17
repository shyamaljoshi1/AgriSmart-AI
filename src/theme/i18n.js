/**
 * GLOBAL INTERNATIONALIZATION (i18n) DICTIONARY
 * Supports English (en) and Hindi (hi - हिन्दी) across ALL screens and components
 */

export const TRANSLATIONS = {
  en: {
    // App Header & Branding
    appTitle: 'AgriSmart AI',
    appSubtitle: 'Precision Farming & Livestock',
    statusReady: 'RAM DL Ready',
    sunny: '28°C Sunny',
    humidity: 'Humidity 62%',
    fieldZone: 'Field Zone #1',

    // Tab Bar Navigation
    tabDisease: 'Disease & Advisory',
    tabLivestock: 'Livestock Monitor',

    // Disease Detection Screen
    badgeModel: 'On-Device RAM DL Model',
    badgeApi: 'Python PyTorch API',
    heroTitle: 'Crop Disease Detection & Advisory',
    heroSubtitle: 'Scan any affected plant leaf. Our PyTorch Deep Learning model runs instant inference and generates comprehensive agronomic remedies.',
    modelSelectorLabel: 'Select Active DL Model:',
    modelMobileNet: 'MobileNetV3 (45 Classes)',
    modelGhostNet: 'GhostNet (38 Classes)',
    clickPhotoBtn: 'Click Photo / Scan Crop',
    usingModelMobileNet: 'Using MobileNetV3 Baseline (45 Classes)',
    usingModelGhostNet: 'Using GhostNetTiny (38 Classes)',
    recentScansTitle: 'Recent Scans & History',
    noScansText: 'No recent scans recorded today. Tap "Click Photo / Scan Crop" to begin.',

    // Advisory Card
    confidence: 'Confidence:',
    detectedZone: 'Detected Zone',
    listenAdvisory: 'Listen Advisory',
    stopAudio: 'Stop Audio',
    share: 'Share',
    subTabImmediate: 'Immediate',
    subTabChemical: 'Chemical',
    subTabOrganic: 'Organic',
    subTabPrevent: 'Prevent',
    immediateTitle: '⚡ Priority Immediate Actions:',
    chemicalTitle: '🧪 Recommended Fungicide / Sprays:',
    organicTitle: '🌿 Bio-Control & Organic Methods:',
    preventTitle: '🛡️ Long-Term Crop Protection:',
    scanAnotherBtn: 'Scan Another Plant',

    // Severity Levels
    severityHigh: 'High Severity',
    severityMedium: 'Medium Severity',
    severityLow: 'Low Severity',
    severityNone: 'Healthy (No Disease)',

    // Camera Modal
    cameraModalTitle: 'Scan Crop / Leaf',
    takePhoto: 'Take Photo',
    uploadPhoto: 'Upload File',

    // Livestock Monitoring Screen
    livestockTitle: 'Smart Livestock Management',
    livestockSubtitle: 'Monitor health vitals, daily milk yield, feed stock inventory, and automated alerts.',
    subTabDashboard: 'Dashboard',
    subTabHerd: 'Herd',
    subTabMilk: 'Milk',
    subTabFeed: 'Feed',
    subTabAlerts: 'Alerts',
    totalCattle: 'Total Livestock',
    activeCattle: 'Active Cattle',
    avgMilk: 'Avg Daily Milk',
    feedStock: 'Feed Inventory',
    healthAlerts: 'Health Alerts',
    addCattleBtn: 'Add Cattle',
    logMilkBtn: 'Log Milk Yield',
    addFeedBtn: 'Add Feed Stock',
    exportBackup: 'Backup Data',
    importRestore: 'Restore Backup',
    cattleSearchPlaceholder: 'Search by Tag ID, Name or Breed...',
    filterAll: 'All Cattle',
    filterHealthy: 'Healthy',
    filterAttention: 'Needs Attention',
    filterSick: 'Sick',
    navHome: '🏠 Home',
    navCattle: '🐄 Cattle',
    navMilk: '🥛 Milk & Analytics',
    navFeed: '🌾 Feed Analytics',
    navAlerts: '🔔 Alerts',
    offlineBannerText: '100% Offline Mode • All farm data saved directly on your phone',
    offlineModeTitle: '🐄 Offline Livestock Management',
    greetingTitle: 'Good morning, Farmer',
    greetingSubtitle: 'How is your livestock farm doing today?',
    backupTitle: '💾 Backup & Restore Data',
    backupSubText: 'Protect your data before uninstalling or switching phones:',
    exportBtnText: 'Export Backup',
    restoreBtnText: 'Restore Backup',
    herdDirTitle: 'Herd Directory',
    tapToView: 'Tap to view directory →',
    adjustConsumptionBtn: 'Adjust Daily Ration',
    vitalsTitle: 'Health Vitals',
    milkYieldTitle: 'Daily Milk Yield',
    vaccinationTitle: 'Vaccination & Medical History',
    recentLogsTitle: 'Recent Daily Observations',
    actionsTitle: 'Quick Management Actions',
    logObservationBtn: 'Log Daily Health Check',
    healthCheckBtn: 'Health Evaluation Check',
    editCattleBtn: 'Edit Profile',
    deleteCattleBtn: 'Remove Cattle',
    todayTotalMilk: "Today's Milk Production",
    morningMilk: 'Morning Shift',
    eveningMilk: 'Evening Shift',
    milkHistoryTitle: 'Historical Milk Records',
    feedInventoryTitle: 'Feed & Ration Inventory',
    currentStock: 'Available Stock',
    dailyUsage: 'Daily Usage',
    daysLeft: 'Days Remaining',
    activeAlertsTitle: 'Active Farm Alerts',
    resolvedAlertsTitle: 'Resolved Alerts',
  },
  hi: {
    // App Header & Branding
    appTitle: 'एग्रीस्मार्ट एआई',
    appSubtitle: 'सटीक कृषि एवं पशुपालन',
    statusReady: 'रेम मॉडल तैयार',
    sunny: '28°C धूप',
    humidity: 'आर्द्रता 62%',
    fieldZone: 'खेत ज़ोन #1',

    // Tab Bar Navigation
    tabDisease: 'फसल रोग एवं सलाह',
    tabLivestock: 'पशुधन निगरानी',

    // Disease Detection Screen
    badgeModel: 'ऑन-डिवाइस एआई मॉडल',
    badgeApi: 'पायथन पायटॉर्च एपीआई',
    heroTitle: 'फसल रोग पहचान एवं कृषि सलाह',
    heroSubtitle: 'प्रभावित पौधे की पत्ती को स्कैन करें। हमारा पायटॉर्च मॉडल तुरंत सटीक निदान और विस्तृत उपचार उपाय प्रदान करता है।',
    modelSelectorLabel: 'सक्रिय एआई मॉडल चुनें:',
    modelMobileNet: 'मोबाइलनेटवी3 (45 वर्ग)',
    modelGhostNet: 'घोस्टनेट (38 वर्ग)',
    clickPhotoBtn: 'फोटो खींचें / फसल स्कैन करें',
    usingModelMobileNet: 'मोबाइलनेटवी3 मॉडल (45 वर्ग) द्वारा',
    usingModelGhostNet: 'घोस्टनेट मॉडल (38 वर्ग) द्वारा',
    recentScansTitle: 'हाल के स्कैन और इतिहास',
    noScansText: 'आज कोई स्कैन नहीं किया गया है। "फसल स्कैन करें" पर टैप करें।',

    // Advisory Card
    confidence: 'सटीकता (विश्वास):',
    detectedZone: 'पहचाना गया क्षेत्र',
    listenAdvisory: 'सलाह सुनें',
    stopAudio: 'ऑडियो रोकें',
    share: 'शेयर करें',
    subTabImmediate: 'तत्काल उपाय',
    subTabChemical: 'रासायनिक',
    subTabOrganic: 'जैविक',
    subTabPrevent: 'दीर्घकालिक बचाव',
    immediateTitle: '⚡ प्राथमिकता वाले तत्काल कदम:',
    chemicalTitle: '🧪 अनुशंसित कवकनाशी / रासायनिक छिड़काव:',
    organicTitle: '🌿 जैविक और प्राकृतिक नियंत्रण उपाय:',
    preventTitle: '🛡️ दीर्घकालिक फसल सुरक्षा उपाय:',
    scanAnotherBtn: 'दूसरी पत्ती स्कैन करें',

    // Severity Levels
    severityHigh: 'उच्च खतरा (गंभीर)',
    severityMedium: 'मध्यम खतरा',
    severityLow: 'कम खतरा',
    severityNone: 'स्वस्थ (कोई रोग नहीं)',

    // Camera Modal
    cameraModalTitle: 'पत्ती / फसल स्कैन करें',
    takePhoto: 'फोटो खींचें',
    uploadPhoto: 'फ़ाइल अपलोड करें',

    // Livestock Monitoring Screen
    livestockTitle: 'स्मार्ट पशुधन प्रबंधन',
    livestockSubtitle: 'पशुओं का स्वास्थ्य, दैनिक दूध उत्पादन, चारा स्टॉक और स्वास्थ्य अलर्ट ट्रैक करें।',
    subTabDashboard: 'डैशबोर्ड',
    subTabHerd: 'पशु सूची',
    subTabMilk: 'दूध उत्पादन',
    subTabFeed: 'चारा स्टॉक',
    subTabAlerts: 'स्वास्थ्य अलर्ट',
    totalCattle: 'कुल पशुधन',
    activeCattle: 'सक्रिय गाय/भैंस',
    avgMilk: 'औसत दूध उत्पादन',
    feedStock: 'चारा भंडारण',
    healthAlerts: 'स्वास्थ्य चेतावनी',
    addCattleBtn: 'नया पशु जोड़ें',
    logMilkBtn: 'दूध दर्ज करें',
    addFeedBtn: 'चारा जोड़ें',
    exportBackup: 'बैकअप लें',
    importRestore: 'डेटा रिस्टोर करें',
    cattleSearchPlaceholder: 'टैग आईडी, नाम या नस्ल से खोजें...',
    filterAll: 'सभी पशु',
    filterHealthy: 'स्वस्थ',
    filterAttention: 'ध्यान देने योग्य',
    filterSick: 'बीमार',
    navHome: '🏠 होम',
    navCattle: '🐄 पशुधन',
    navMilk: '🥛 दूध एवं विश्लेषण',
    navFeed: '🌾 चारा विश्लेषण',
    navAlerts: '🔔 अलर्ट',
    offlineBannerText: '100% ऑफलाइन मोड • सभी डेटा आपके फोन पर सुरक्षित है',
    offlineModeTitle: '🐄 ऑफलाइन पशुधन प्रबंधन',
    greetingTitle: 'सुप्रभात, किसान भाई',
    greetingSubtitle: 'आज आपका पशुधन फार्म कैसा चल रहा है?',
    backupTitle: '💾 डेटा बैकअप एवं रिस्टोर',
    backupSubText: 'ऐप बदलने या रीसेट करने से पहले अपना डेटा सुरक्षित करें:',
    exportBtnText: 'बैकअप फाइल बनाएं',
    restoreBtnText: 'बैकअप फाइल रिस्टोर करें',
    herdDirTitle: 'पशुधन सूची (हर्ड)',
    tapToView: 'सूची देखने के लिए टैप करें →',
    adjustConsumptionBtn: 'दैनिक खुराक समायोजित करें',
    vitalsTitle: 'स्वास्थ्य सूचकांक (विटल्स)',
    milkYieldTitle: 'दैनिक दूध उत्पादन',
    vaccinationTitle: 'टीकाकरण एवं चिकित्सा इतिहास',
    recentLogsTitle: 'हालिया दैनिक अवलोकन',
    actionsTitle: 'त्वरित प्रबंधन कार्य',
    logObservationBtn: 'दैनिक स्वास्थ्य जांच दर्ज करें',
    healthCheckBtn: 'स्वास्थ्य स्थिति मूल्यांकन',
    editCattleBtn: 'प्रोफाइल संपादित करें',
    deleteCattleBtn: 'पशु हटाएं',
    todayTotalMilk: 'आज का कुल दूध उत्पादन',
    morningMilk: 'सुबह की पाली',
    eveningMilk: 'शाम की पाली',
    milkHistoryTitle: 'दूध उत्पादन का इतिहास',
    feedInventoryTitle: 'चारा एवं राशन भंडारण',
    currentStock: 'उपलब्ध स्टॉक',
    dailyUsage: 'दैनिक खपत',
    daysLeft: 'बचे हुए दिन',
    activeAlertsTitle: 'सक्रिय चेतावनी (अलर्ट)',
    resolvedAlertsTitle: 'हल की गई चेतावनियां',
  }
};

export const CROP_DISEASE_TRANSLATIONS_HI = {
  // Cashew
  'Cashew_Healthy': {
    name: 'काजू - स्वस्थ फसल (कोई रोग नहीं)',
    crop: 'काजू',
    description: 'सामान्य स्वस्थ काजू की पत्तियां जिनमें कोई दृश्यमान रोग या कीट के लक्षण नहीं हैं।',
    symptoms: ['सामान्य गहरा हरा रंग, पत्तियां पूरी तरह स्वस्थ।'],
    immediateActions: ['नियमित सिंचाई व्यवस्था बनाए रखें।'],
    chemicalTreatment: ['किसी रासायनिक कवकनाशी की आवश्यकता नहीं है।'],
    organicTreatment: ['पौधों के पोषण के लिए नीम तेल (5 मिली/लीटर) या समुद्री शैवाल के घोल का छिड़काव करें।'],
    preventativeMeasures: ['पेड़ के आसपास खरपतवार और सूखी पत्तियां हटाकर सफाई रखें।']
  },
  'Cashew_Leaf_Miner': {
    name: 'काजू - लीफ माइनर कीट (पत्ती सुरंग बनाने वाला कीट)',
    crop: 'काजू',
    description: 'सुरंग बनाने वाले कीट की इल्ली जो पत्तियों के ऊतकों के अंदर टेढ़ी-मेढ़ी खदानें/सुरंगें बनाती है।',
    symptoms: ['पत्तियों पर टेढ़ी-मेढ़ी पारदर्शी सुरंगें।', 'सुरंगों के कारण पत्तियों का सूखना।'],
    immediateActions: ['अत्यधिक प्रभावित पत्तियों को तोड़कर तुरंत नष्ट करें।'],
    chemicalTreatment: ['इमिडाक्लोप्रिड 17.8% SL @ 0.5 मिली/लीटर पानी में घोलकर छिड़कें।'],
    organicTreatment: ['नीम बीज अर्क (NSKE 5%) @ 50 मिली/लीटर छिड़कें।'],
    preventativeMeasures: ['कीट नियंत्रण के लिए पीले चिपचिपे स्टिकी ट्रैप लगाएं।']
  },
  'Cashew_Red_Rust': {
    name: 'काजू - लाल रतुआ / गेरुआ रोग (रेड रस्ट)',
    crop: 'काजू',
    description: 'पत्तियों की सतह पर लाल या जंग के रंग के धब्बे जो स्वस्थ पत्ती क्षेत्र को कम कर देते हैं।',
    symptoms: ['पत्तियों के ऊपरी भाग पर जंग जैसे लाल/भूरे धब्बे।'],
    immediateActions: ['रोगग्रस्त पत्तियों और टहनियों की छंटाई करें।'],
    chemicalTreatment: ['कॉपर ऑक्सीक्लोराइड 50% WP @ 3 ग्राम/लीटर का छिड़काव करें।'],
    organicTreatment: ['बोर्डो मिश्रण (1%) का छिड़काव करें।'],
    preventativeMeasures: ['पौधों के बीच पर्याप्त दूरी और धूप का आवागमन सुनिश्चित करें।']
  },

  // Cassava
  'Cassava_Brown_Spot': {
    name: 'कासावा - भूरा धब्बा रोग (ब्राउन स्पॉट)',
    crop: 'कासावा',
    description: 'कासावा की पत्तियों पर भूरे रंग के धब्बे जो बड़े होकर पत्तियों को सुखा देते हैं।',
    symptoms: ['पत्तियों पर भूरे गोल धब्बे जिनके चारों ओर पीला घेरा होता है।'],
    immediateActions: ['निचली संक्रमित पत्तियों को हटा दें।'],
    chemicalTreatment: ['मैन्कोज़ेब 75% WP @ 2.5 ग्राम/लीटर का छिड़काव करें।'],
    organicTreatment: ['स्यूडोमोनस फ्लोरेसेंस @ 10 ग्राम/लीटर का प्रयोग करें।'],
    preventativeMeasures: ['फसल चक्र अपनाएं।']
  },
  'Cassava_Healthy': {
    name: 'कासावा - स्वस्थ फसल',
    crop: 'कासावा',
    description: 'स्वस्थ कासावा की पत्तियां।',
    symptoms: ['स्वस्थ हरी पत्तियां।'],
    immediateActions: ['उचित सिंचाई बनाए रखें।'],
    chemicalTreatment: ['रसायन की आवश्यकता नहीं।'],
    organicTreatment: ['जैविक खाद डालें।'],
    preventativeMeasures: ['खेत साफ रखें।']
  },
  'Cassava_Mosaic': {
    name: 'कासावा - मोज़ेक रोग (विषाणु जनित)',
    crop: 'कासावा',
    description: 'सफेद मक्खी द्वारा फैलने वाला विषाणु रोग जो पत्तियों पर चितकबरा (मोज़ेक) पैटर्न और मरोड़ पैदा करता है।',
    symptoms: ['पत्तियों पर हरे-पीले चितकबरे धब्बे और पत्तियों का मुड़ना।'],
    immediateActions: ['संक्रमित पौधों को उखाड़कर तुरंत नष्ट करें।'],
    chemicalTreatment: ['सफेद मक्खी नियंत्रण हेतु इमिडाक्लोप्रिड छिड़कें।'],
    organicTreatment: ['पीले चिपचिपे कार्ड लगाएं।'],
    preventativeMeasures: ['रोग प्रतिरोधी किस्मों की बुवाई करें।']
  },

  // Chilli
  'Chilli_Healthy': {
    name: 'मिर्च - स्वस्थ फसल',
    crop: 'मिर्च',
    description: 'सामान्य स्वस्थ मिर्च की पत्ती।',
    symptoms: ['पत्तियां पूरी तरह हरी और स्वस्थ हैं।'],
    immediateActions: ['संतुलित पानी और उर्वरक दें।'],
    chemicalTreatment: ['कोई रसायन आवश्यक नहीं।'],
    organicTreatment: ['नीम तेल का छिड़काव करें।'],
    preventativeMeasures: ['खेत में जलभराव न होने दें।']
  },
  'Chilli_Nutrition_Deficiency': {
    name: 'मिर्च - पोषक तत्वों की कमी (न्यूट्रिशन डेफिशिएंसी)',
    crop: 'मिर्च',
    description: 'आवश्यक पोषक तत्वों (जैसे नाइट्रोजन, जिंक या मैग्नीशियम) की कमी के कारण पत्तियों का पीला पड़ना।',
    symptoms: ['पत्तियों का पीला पड़ना या असामान्य बढ़वार।'],
    immediateActions: ['मिट्टी की जांच कराएं और सूक्ष्म पोषक तत्व छिड़कें।'],
    chemicalTreatment: ['19:19:19 (NPK) सूक्ष्म पोषक मिश्रण @ 5 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['जीवामृत या पंचगव्य @ 30 मिली/लीटर छिड़कें।'],
    preventativeMeasures: ['मिट्टी में पर्याप्त गोबर की खाद मिलाएं।']
  },
  'Chilli_White_Spot': {
    name: 'मिर्च - सफेद धब्बा रोग (व्हाइट स्पॉट)',
    crop: 'मिर्च',
    description: 'मिर्च की पत्तियों पर छोटे सफेद/राख के रंग के धब्बे।',
    symptoms: ['पत्तियों पर छोटे सफेद केंद्र वाले गोल धब्बे।'],
    immediateActions: ['संक्रमित पत्तियां हटाएं।'],
    chemicalTreatment: ['कॉपर ऑक्सीक्लोराइड @ 2.5 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['खट्टा छाछ घोल छिड़कें।'],
    preventativeMeasures: ['फसल चक्र अपनाएं।']
  },

  // Citrus
  'Citrus_Black_Spot': {
    name: 'नींबू/संतरा - काला धब्बा रोग (ब्लैक स्पॉट)',
    crop: 'नींबू/संतरा',
    description: 'पत्तियों और फलों पर गहरे काले धब्बे।',
    symptoms: ['पत्तियों पर गहरे काले गोल धब्बे।'],
    immediateActions: ['संक्रमित शाखाओं की छंटाई करें।'],
    chemicalTreatment: ['कॉपर हाइड्रोक्साइड @ 2 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['बोर्डो मिश्रण छिड़कें।'],
    preventativeMeasures: ['वृक्षों में हवा का बहाव बढ़ाएं।']
  },
  'Citrus_Canker': {
    name: 'नींबू/संतरा - कैंकर रोग (जीवाणु जनित)',
    crop: 'नींबू/संतरा',
    description: 'पत्तियों पर खुरदरे उभरे हुए भूरे धब्बे जिनके चारों ओर पीला घेरा होता है।',
    symptoms: ['पत्तियों और फल पर खुरदरे कैंकर धब्बे।'],
    immediateActions: ['संक्रमित टहनियों को काटकर नष्ट करें।'],
    chemicalTreatment: ['स्ट्रेप्टोसाइक्लिन (1 ग्राम / 10 लीटर) + कॉपर ऑक्सीक्लोराइड (2.5 ग्राम/लीटर) छिड़कें।'],
    organicTreatment: ['नीम अर्क का छिड़काव करें।'],
    preventativeMeasures: ['प्रतिरोधी किस्में लगाएं।']
  },
  'Citrus_Healthy': {
    name: 'नींबू/संतरा - स्वस्थ फसल',
    crop: 'नींबू/संतरा',
    description: 'सामान्य स्वस्थ नींबू की पत्ती।',
    symptoms: ['चमकदार हरी पत्तियां।'],
    immediateActions: ['समय पर पानी दें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['जैविक खाद दें।'],
    preventativeMeasures: ['जल निकासी अच्छी रखें।']
  },

  // Cotton
  'Cotton_Bacterial_Blight': {
    name: 'कपास - जीवाणु अंगमारी / कोणीय पत्ती धब्बा (बैक्टिरियल ब्लाइट)',
    crop: 'कपास',
    description: 'पत्तियों पर कोणीय काले/पानी जैसे धब्बे जो झुलस जाते हैं।',
    symptoms: ['शिराओं के बीच कोणीय गहरे धब्बे।'],
    immediateActions: ['संक्रमित भाग निकालें।'],
    chemicalTreatment: ['स्ट्रेप्टोसाइक्लिन @ 1 ग्राम/10 लीटर पानी में छिड़कें।'],
    organicTreatment: ['स्यूडोमोनस फ्लोरेसेंस छिड़कें।'],
    preventativeMeasures: ['प्रमाणित बीजों का प्रयोग करें।']
  },
  'Cotton_Curl_Virus': {
    name: 'कपास - पत्ती मरोड़ (लीफ कर्ल) वायरस',
    crop: 'कपास',
    description: 'सफेद मक्खी द्वारा फैलने वाला विषाणु जो पत्तियों को मुड़ने और कप जैसा बनने पर मजबूर करता है।',
    symptoms: ['पत्तियों का ऊपर मुड़ना और शिराओं का मोटा होना।'],
    immediateActions: ['रोगी पौधे उखाड़कर नष्ट करें।'],
    chemicalTreatment: ['सफेद मक्खी नियंत्रण हेतु डायफेंथियूरॉन छिड़कें।'],
    organicTreatment: ['पीले चिपचिपे कार्ड लगाएं।'],
    preventativeMeasures: ['रोग प्रतिरोधी बीज बोएं।']
  },
  'Cotton_Healthy': {
    name: 'कपास - स्वस्थ फसल',
    crop: 'कपास',
    description: 'सामान्य स्वस्थ कपास की पत्ती।',
    symptoms: ['हरी स्वस्थ पत्तियां।'],
    immediateActions: ['सिंचाई बनाए रखें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['नीम तेल छिड़कें।'],
    preventativeMeasures: ['खरपतवार हटाएं।']
  },

  // Grape
  'Grape_Black_Rot': {
    name: 'अंगूर - काला सड़न रोग (ब्लैक रॉट)',
    crop: 'अंगूर',
    description: 'कवक रोग जो पत्तियों पर लाल-भूरे धब्बे और गुच्छों के फल सुखाकर काले बनाता है।',
    symptoms: ['पत्तियों पर लाल-भूरे गोल धब्बे।'],
    immediateActions: ['सूखे गुच्छों को काटकर जलाएं।'],
    chemicalTreatment: ['माइक्लोबुटानिल @ 0.4 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['कॉपर हाइड्रोक्साइड छिड़कें।'],
    preventativeMeasures: ['सही छंटाई करें।']
  },
  'Grape_Healthy': {
    name: 'अंगूर - स्वस्थ फसल',
    crop: 'अंगूर',
    description: 'सामान्य स्वस्थ अंगूर की पत्ती।',
    symptoms: ['स्वस्थ हरी पत्तियां।'],
    immediateActions: ['नियमित देखभाल करें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['जैविक टॉनिक छिड़कें।'],
    preventativeMeasures: ['हवा का बहाव सही रखें।']
  },
  'Grape_Leaf_Blight': {
    name: 'अंगूर - लीफ ब्लाइट (पत्ती झुलसा रोग)',
    crop: 'अंगूर',
    description: 'पत्तियों पर अनियमित लाल-भूरे से गहरे भूरे धब्बे और झुलसन जो पत्तियों के समय से पहले झड़ने का कारण बनती है।',
    symptoms: ['पत्तियों पर लाल-भूरे झुलसे धब्बे।', 'पत्तियों का समय से पहले गिरना।'],
    immediateActions: ['गिरे हुए संक्रमित पत्तों को एकत्र करके जलाएं।', 'फलने वाले क्षेत्रों के आसपास की पत्तियों को छांटकर हवा बढ़ाएं।'],
    chemicalTreatment: ['कार्बेन्डाज़िम 50% WP @ 1 ग्राम/लीटर या मैंकोज़ेब @ 2.5 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['बोर्डो मिश्रण (1%) या ट्राइकोडर्मा विरिडी @ 5 ग्राम/लीटर छिड़कें।'],
    preventativeMeasures: ['बेलों के बीच वायु संचार बेहतर बनाने के लिए कैनोपी प्रबंधन करें।']
  },

  // Groundnut
  'Groundnut_Healthy': {
    name: 'मूंगफली - स्वस्थ फसल',
    crop: 'मूंगफली',
    description: 'सामान्य स्वस्थ मूंगफली की पत्ती।',
    symptoms: ['हरा स्वस्थ स्वरूप।'],
    immediateActions: ['पानी संतुलित रखें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['वर्मीकम्पोस्ट दें।'],
    preventativeMeasures: ['फसल चक्र अपनाएं।']
  },
  'Groundnut_Late_Leaf_Spot': {
    name: 'मूंगफली - देरी से होने वाला पत्ती धब्बा रोग (लेट लीफ स्पॉट)',
    crop: 'मूंगफली',
    description: 'काले गोल धब्बे जो पत्तियों को गिरा देते हैं और उपज घटाते हैं।',
    symptoms: ['पत्तियों की निचली सतह पर काले धब्बे।'],
    immediateActions: ['प्रभावित पत्तियां हटाएं।'],
    chemicalTreatment: ['टेबूकोनाज़ोल @ 1.5 मिली/लीटर छिड़कें।'],
    organicTreatment: ['नीम तेल 5 मिली/लीटर छिड़कें।'],
    preventativeMeasures: ['अनाज फसलों संग फसल चक्र अपनाएं।']
  },
  'Groundnut_Nutrition_Deficiency': {
    name: 'मूंगफली - पोषक तत्वों की कमी',
    crop: 'मूंगफली',
    description: 'आयरन या नाइट्रोजन की कमी से पत्तियों का पीला पड़ना।',
    symptoms: ['पत्तियों की शिराओं के बीच पीलापन।'],
    immediateActions: ['फेरस सल्फेट 0.5% का छिड़काव करें।'],
    chemicalTreatment: ['माइक्रोन्यूट्रीएंट मिक्स स्प्रे करें।'],
    organicTreatment: ['गोबर खाद दें।'],
    preventativeMeasures: ['मिट्टी परीक्षण कराएं।']
  },

  // Maize
  'Maize_Healthy': {
    name: 'मक्का - स्वस्थ फसल',
    crop: 'मक्का',
    description: 'सामान्य स्वस्थ मक्का की पत्ती।',
    symptoms: ['लंबी हरी स्वस्थ पत्तियां।'],
    immediateActions: ['समय पर सिंचाई करें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['नीम घोल छिड़कें।'],
    preventativeMeasures: ['कीटों से बचाव रखें।']
  },
  'Maize_Leaf_Spot': {
    name: 'मक्का - पत्ती धब्बा रोग (लीफ स्पॉट)',
    crop: 'मक्का',
    description: 'पत्तियों पर गोल या लंबे भूरे धब्बे।',
    symptoms: ['पत्तियों पर भूरे धब्बे।'],
    immediateActions: ['संक्रमित पत्तियां हटाएं।'],
    chemicalTreatment: ['मैंकोज़ेब @ 2.5 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['स्यूडोमोनस छिड़कें।'],
    preventativeMeasures: ['प्रतिरोधी बीज बोएं।']
  },
  'Maize_Streak_Virus': {
    name: 'मक्का - धारीदार विषाणु रोग (स्ट्रोक वायरस)',
    crop: 'मक्का',
    description: 'पत्तियों पर पतली पीली धारियां बनाने वाला वायरस।',
    symptoms: ['पत्तियों की लंबाई में पीली धारियां।'],
    immediateActions: ['रोगी पौधे हटाएं।'],
    chemicalTreatment: ['हॉपर कीट नियंत्रण हेतु कीटनाशी छिड़कें।'],
    organicTreatment: ['नीम का तेल छिड़कें।'],
    preventativeMeasures: ['समय पर बुवाई करें।']
  },

  // Papaya
  'Papaya_Bacterial_Spot': {
    name: 'पपीता - जीवाणु धब्बा रोग',
    crop: 'पपीता',
    description: 'पत्तियों पर पानी जैसे भूरे धब्बे।',
    symptoms: ['पत्तियों पर कोणीय भूरे धब्बे।'],
    immediateActions: ['प्रभावित भाग काटें।'],
    chemicalTreatment: ['कॉपर ऑक्सीक्लोराइड + स्ट्रेप्टोसाइक्लिन छिड़कें।'],
    organicTreatment: ['स्यूडोमोनस छिड़कें।'],
    preventativeMeasures: ['जलभराव रोकें।']
  },
  'Papaya_Healthy': {
    name: 'पपीता - स्वस्थ फसल',
    crop: 'पपीता',
    description: 'स्वस्थ पपीते की पत्ती।',
    symptoms: ['स्वस्थ चौड़ी हरी पत्तियां।'],
    immediateActions: ['सिंचाई बनाए रखें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['जैविक खाद दें।'],
    preventativeMeasures: ['निकासी अच्छी रखें।']
  },
  'Papaya_Ring_Spot': {
    name: 'पपीता - रिंग स्पॉट वायरस',
    crop: 'पपीता',
    description: 'पत्तियों और फलों पर गोल छल्लेदार धब्बे बनाने वाला खतरनाक वायरस।',
    symptoms: ['पत्तियों का मुड़ना और गोल रिंग धब्बे।'],
    immediateActions: ['संक्रमित पेड़ उखाड़कर नष्ट करें।'],
    chemicalTreatment: ['माहू (एफिड) कीट नियंत्रण हेतु कीटनाशी छिड़कें।'],
    organicTreatment: ['पीले ट्रैप लगाएं।'],
    preventativeMeasures: ['प्रतिरोधी किस्में लगाएं।']
  },

  // Potato
  'Potato_Early_Blight': {
    name: 'आलू - अगेती झुलसा रोग (अर्ली ब्लाइट)',
    crop: 'आलू',
    description: 'पत्तियों पर संकेंद्री गोल भूरे धब्बे बनाने वाला कवक रोग।',
    symptoms: ['पुरानी पत्तियों पर गोल चक्राकार धब्बे।'],
    immediateActions: ['निचली संक्रमित पत्तियां हटाएं।'],
    chemicalTreatment: ['मैन्कोज़ेब @ 2.5 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['कॉपर हाइड्रोक्साइड छिड़कें।'],
    preventativeMeasures: ['फसल चक्र अपनाएं।']
  },
  'Potato_Healthy': {
    name: 'आलू - स्वस्थ फसल',
    crop: 'आलू',
    description: 'स्वस्थ आलू की पत्ती।',
    symptoms: ['हरी स्वस्थ पत्तियां।'],
    immediateActions: ['सिंचाई बनाए रखें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['नीम तेल छिड़कें।'],
    preventativeMeasures: ['मिट्टी चढ़ाएं।']
  },
  'Potato_Late_Blight': {
    name: 'आलू - पछेती झुलसा रोग (लेट ब्लाइट)',
    crop: 'आलू',
    description: 'अत्यधिक खतरनाक कवक रोग जो पूरी फसल को 2-3 दिनों में सुखा देता है।',
    symptoms: ['पत्तियों पर गीले काले धब्बे जिनके नीचे सफेद फफूंद होती है।'],
    immediateActions: ['तुरंत संक्रमित पौधों को हटाकर फफूंदनाशी छिड़कें।'],
    chemicalTreatment: ['साइमोक्सानिल + मैन्कोज़ेब @ 2 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['बोर्डो मिश्रण (1%) छिड़कें।'],
    preventativeMeasures: ['प्रमाणित रोगमुक्त आलू कंद बोएं।']
  },

  // Rice
  'Rice_Brown_Spot': {
    name: 'धान / चावल - भूरा धब्बा रोग (ब्राउन स्पॉट)',
    crop: 'धान',
    description: 'पत्तियों पर तिल जैसे छोटे भूरे धब्बे।',
    symptoms: ['पत्तियों पर छोटे गोल भूरे धब्बे।'],
    immediateActions: ['संतुलित उर्वरक दें।'],
    chemicalTreatment: ['मैन्कोज़ेब @ 2 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['स्यूडोमोनस फ्लोरेसेंस छिड़कें।'],
    preventativeMeasures: ['पोटाश की उचित मात्रा दें।']
  },
  'Rice_Healthy': {
    name: 'धान / चावल - स्वस्थ फसल',
    crop: 'धान',
    description: 'स्वस्थ धान की पत्ती।',
    symptoms: ['हरी सीधी पत्तियां।'],
    immediateActions: ['पानी का स्तर बनाए रखें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['जैविक खाद दें।'],
    preventativeMeasures: ['खरपतवार निकालें।']
  },
  'Rice_Leaf_Blast': {
    name: 'धान / चावल - पत्ती झुलसा रोग (लीफ ब्लास्ट)',
    crop: 'धान',
    description: 'पत्तियों पर नाव के आकार के धब्बे।',
    symptoms: ['नाव के आकार के राख रंग धब्बे।'],
    immediateActions: ['पानी सुखाएं और यूरिया कम करें।'],
    chemicalTreatment: ['ट्राइसाइकलाज़ोल @ 0.6 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['छाछ और नीम का छिड़काव करें।'],
    preventativeMeasures: ['बीज शोधन करें।']
  },

  // Soybean
  'Soybean_Caterpillar': {
    name: 'सोयाबीन - इल्ली/कैटरपिलर कीट का हमला',
    crop: 'सोयाबीन',
    description: 'पत्तियों को खाने वाली इल्ली।',
    symptoms: ['पत्तियों में छेद और कटी हुई पत्तियां।'],
    immediateActions: ['हाथ से इल्लियों को चुनकर नष्ट करें।'],
    chemicalTreatment: ['क्लोरांट्रानिलिप्रोल @ 0.3 मिली/लीटर छिड़कें।'],
    organicTreatment: ['निंबोलि अर्क (NSKE 5%) छिड़कें।'],
    preventativeMeasures: ['फेरोमोन ट्रैप लगाएं।']
  },
  'Soybean_Diabrotica_Speciosa': {
    name: 'सोयाबीन - दियाब्रोटिका बीटल कीट',
    crop: 'सोयाबीन',
    description: 'पत्तियों को कुतरने वाला बीटल कीट।',
    symptoms: ['पत्तियों पर गोल कतरे हुए छेद।'],
    immediateActions: ['कीट नियंत्रण छिड़काव करें।'],
    chemicalTreatment: ['इमिडाक्लोप्रिड छिड़कें।'],
    organicTreatment: ['नीम तेल छिड़कें।'],
    preventativeMeasures: ['खेत साफ रखें।']
  },
  'Soybean_Healthy': {
    name: 'सोयाबीन - स्वस्थ फसल',
    crop: 'सोयाबीन',
    description: 'स्वस्थ सोयाबीन की पत्ती।',
    symptoms: ['हरी स्वस्थ पत्तियां।'],
    immediateActions: ['सिंचाई बनाए रखें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['जैविक खाद दें।'],
    preventativeMeasures: ['फसल चक्र अपनाएं।']
  },

  // Sugarcane
  'Sugarcane_Brown_Spot': {
    name: 'गन्ना - भूरा धब्बा रोग',
    crop: 'गन्ना',
    description: 'पत्तियों पर लंबे भूरे धब्बे।',
    symptoms: ['पत्तियों पर लंबे लाल-भूरे धब्बे।'],
    immediateActions: ['सूखी पत्तियां निकालें।'],
    chemicalTreatment: ['मैन्कोज़ेब @ 2.5 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['ट्राइकोडर्मा छिड़कें।'],
    preventativeMeasures: ['प्रतिरोधी किस्म बोएं।']
  },
  'Sugarcane_Grassy_Shoot': {
    name: 'गन्ना - घास जैसा कल्ला रोग (ग्राफी शूट)',
    crop: 'गन्ना',
    description: 'गन्ने की जड़ों से अत्यधिक पतले घास जैसे कल्ले निकलना।',
    symptoms: ['पौधे का बौना होना और घास जैसी झाड़ी बनना।'],
    immediateActions: ['प्रभावित पौधों को उखाड़कर नष्ट करें।'],
    chemicalTreatment: ['वाहक कीटों के नियंत्रण हेतु कीटनाशी छिड़कें।'],
    organicTreatment: ['नीम तेल छिड़कें।'],
    preventativeMeasures: ['गर्म पानी से बीजोपचार करें।']
  },
  'Sugarcane_Healthy': {
    name: 'गन्ना - स्वस्थ फसल',
    crop: 'गन्ना',
    description: 'स्वस्थ गन्ने की पत्ती।',
    symptoms: ['लंबी चौड़ी हरी पत्तियां।'],
    immediateActions: ['पानी और खाद दें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['जैविक खाद दें।'],
    preventativeMeasures: ['समय पर मिट्टी चढ़ाएं।']
  },

  // Tomato
  'Tomato_Healthy': {
    name: 'टमाटर - स्वस्थ फसल (कोई रोग नहीं)',
    crop: 'टमाटर',
    description: 'पौधा पूरी तरह स्वस्थ है, पत्तियों में गहरा हरा क्लोरोफिल है।',
    symptoms: ['समान हरा रंग, पत्तियों में कोई धब्बे नहीं।'],
    immediateActions: ['नियमित सिंचाई और पोषण बनाए रखें।'],
    chemicalTreatment: ['किसी रासायनिक कवकनाशी की आवश्यकता नहीं है।'],
    organicTreatment: ['वर्मीवाश या नीम घोल छिड़कें।'],
    preventativeMeasures: ['खेत खरपतवार मुक्त रखें।']
  },
  'Tomato_Leaf_Blight': {
    name: 'टमाटर - झुलसा रोग (अगेती/पछेती लीफ ब्लाइट)',
    crop: 'टमाटर',
    description: 'पत्तियों पर गहरे भूरे रंग के धब्बे जो फल तथा तने को सुखा देते हैं।',
    symptoms: ['पत्तियों पर संकेंद्री गोल गहरे भूरे धब्बे।'],
    immediateActions: ['संक्रमित निचली पत्तियों की तुरंत छंटाई करें।'],
    chemicalTreatment: ['कॉपर हाइड्रोक्साइड @ 2 ग्राम/लीटर पानी का छिड़काव करें।'],
    organicTreatment: ['नीम तेल (5 मिली/लीटर) छिड़कें।'],
    preventativeMeasures: ['सोलनेसी फसलों के साथ फसल चक्र अपनाएं।']
  },
  'Tomato_Septoria_Leaf_Spot': {
    name: 'टमाटर - सेप्टोरिया पत्ती धब्बा रोग',
    crop: 'टमाटर',
    description: 'पत्तियों पर असंख्य छोटे गोल धब्बे जिनके केंद्र हल्के और किनारे गहरे होते हैं।',
    symptoms: ['पत्तियों पर छोटे गोल भूरे धब्बे।'],
    immediateActions: ['निचली पत्तियां हटाएं।'],
    chemicalTreatment: ['क्लोरोथालोनिल @ 2 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['बोर्डो मिश्रण छिड़कें।'],
    preventativeMeasures: ['मल्चिंग करें।']
  },

  // Wheat
  'Wheat_Brown_Rust': {
    name: 'गेहूं - भूरा रतुआ रोग (ब्राउन रस्ट)',
    crop: 'गेहूं',
    description: 'पत्तियों पर भूरे-नारंगी रंग के चकत्ते।',
    symptoms: ['पत्तियों पर भूरे छोटे चकत्ते।'],
    immediateActions: ['शुरुआती लक्षण पर तुरंत छिड़काव करें।'],
    chemicalTreatment: ['प्रोपीकोनाज़ोल 25% EC @ 1 मिली/लीटर छिड़कें।'],
    organicTreatment: ['स्यूडोमोनस छिड़कें।'],
    preventativeMeasures: ['HD 3086 जैसी प्रतिरोधी किस्म बोएं।']
  },
  'Wheat_Healthy': {
    name: 'गेहूं - स्वस्थ फसल',
    crop: 'गेहूं',
    description: 'स्वस्थ गेहूं की पत्ती।',
    symptoms: ['हरी सीधी स्वस्थ पत्तियां।'],
    immediateActions: ['समय पर सिंचाई करें।'],
    chemicalTreatment: ['आवश्यकता नहीं।'],
    organicTreatment: ['जैविक खाद दें।'],
    preventativeMeasures: ['खरपतवार नियंत्रण करें।']
  },
  'Wheat_Yellow_Rust': {
    name: 'गेहूं - पीला रतुआ रोग (येलो रस्ट / स्ट्राइप रस्ट)',
    crop: 'गेहूं',
    description: 'पत्तियों पर पीले-नारंगी रंग के चकत्ते जो लंबी धारियों में व्यवस्थित होते हैं।',
    symptoms: ['पत्तियों पर पीली धारियां जो छूने पर उंगलियों पर पीला पाउडर छोड़ती हैं।'],
    immediateActions: ['शुरुआती पीली धारियां दिखते ही तुरंत कवकनाशी का छिड़काव करें।'],
    chemicalTreatment: ['प्रोपीकोनाज़ोल 25% EC @ 1 मिली/लीटर या टेबूकोनाज़ोल @ 0.7 ग्राम/लीटर छिड़कें।'],
    organicTreatment: ['स्यूडोमोनस फ्लोरेसेंस @ 10 ग्राम/लीटर का छिड़काव करें।'],
    preventativeMeasures: ['पीले रतुआ प्रतिरोधी गेहूं किस्मों (जैसे HD 3086, PBW 725) की बुवाई करें।']
  }
};
