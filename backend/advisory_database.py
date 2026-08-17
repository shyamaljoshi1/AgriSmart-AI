# DETAILED 45-CLASS CROP DISEASE ADVISORY DATABASE

# Dictionary mapping for 45 crop-disease classes
CROP_45_ADVISORIES = {
    "Cashew_Healthy": {
        "crop": "Cashew",
        "condition": "Healthy Leaf",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "The scanned cashew leaf displays crisp dark green coloration with optimal vascular texture and zero pest or fungal lesions.",
        "symptoms": [
            "Smooth leaf surface without silvery mining tracks or rusty patches.",
            "Uniform leaf size and healthy tip formation."
        ],
        "immediateActions": [
            "Maintain current irrigation schedule.",
            "Inspect leaf undersides weekly for tea mosquito bug nymph activity."
        ],
        "chemicalTreatment": [
            "No chemical pesticide application needed."
        ],
        "organicTreatment": [
            "Foliar application of Panchagavya (3% solution) every 21 days to promote canopy growth."
        ],
        "preventativeMeasures": [
            "Prune inner criss-cross branches to allow sun penetration.",
            "Maintain 8x8 meter spacing between cashew trees."
        ]
    },
    "Cashew_Leaf_Miner": {
        "crop": "Cashew",
        "condition": "Leaf Miner (Acrocercops syngramma)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Larvae tunnel within the upper epidermal layer of tender cashew leaves, leaving silvery winding mines that cause blistering and leaf drop.",
        "symptoms": [
            "Silvery serpentine mines and blister-like patches on young leaves.",
            "Distorted, curled, and dried leaf tips on tender flushes."
        ],
        "immediateActions": [
            "Prune off severely infested tender shoots and destroy them to prevent adult moth emergence.",
            "Avoid excessive nitrogenous fertilizers that stimulate over-succulent foliage flushes."
        ],
        "chemicalTreatment": [
            "Foliar spray of Lambda-cyhalothrin 5% EC @ 0.6 mL/L water.",
            "Alternate with Profenofos 50% EC @ 2 mL/L during flush periods."
        ],
        "organicTreatment": [
            "Spray Neem oil 10,000 ppm @ 3 mL/L water during new flush initiation.",
            "Release egg parasitoid Trichogramma species in orchard."
        ],
        "preventativeMeasures": [
            "Synchronize flushing through uniform tip pruning after harvest.",
            "Hang yellow sticky traps @ 15 traps/acre to capture adult moths."
        ]
    },
    "Cashew_Red_Rust": {
        "crop": "Cashew",
        "condition": "Red Rust Algal Spot (Cephaleuros virescens)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "A parasitic algal disease forming velvety orange-red to reddish-brown raised circular spots on cashew leaves and twigs.",
        "symptoms": [
            "Orange to reddish-brown velvety spots on upper leaf surface.",
            "Premature defoliation and twig dieback under severe infection."
        ],
        "immediateActions": [
            "Prune low-hanging overcrowded branches to improve sunlight penetration and air movement.",
            "Remove weeds and secondary host plants around the cashew orchard base."
        ],
        "chemicalTreatment": [
            "Spray Copper Oxychloride 50% WP @ 3g/L of water.",
            "Apply Bordeaux mixture (1%) post-monsoon."
        ],
        "organicTreatment": [
            "Foliar spray of bio-algaecide or copper-based organic formulations."
        ],
        "preventativeMeasures": [
            "Ensure proper orchard drainage during heavy monsoon rains.",
            "Maintain adequate spacing between trees."
        ]
    },
    "Cassava_Brown_Spot": {
        "crop": "Cassava",
        "condition": "Brown Leaf Spot (Cercospora henningsii)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Fungal infection causing distinct circular to angular brown spots with dark border halos, reducing photosynthetic leaf area.",
        "symptoms": [
            "Circular brown lesions on upper leaf surface with yellowish halo rings.",
            "Centers of older spots turn greyish and dry out."
        ],
        "immediateActions": [
            "Remove lower infected leaves showing heavy spot density.",
            "Avoid overhead leaf wetting during irrigation."
        ],
        "chemicalTreatment": [
            "Spray Mancozeb 75% WP @ 2.5g/L of water at first spot appearance.",
            "Alternate with Carbendazim 50% WP @ 1g/L."
        ],
        "organicTreatment": [
            "Foliar application of Neem oil (5 mL/L) or garlic extract spray."
        ],
        "preventativeMeasures": [
            "Use disease-free cassava stem cuttings for propagation.",
            "Maintain proper plant spacing (1m x 1m)."
        ]
    },
    "Cassava_Healthy": {
        "crop": "Cassava",
        "condition": "Healthy Leaf",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Cassava foliage demonstrates vigorous palmate leaf structure with deep green pigmentation and zero chlorosis or spots.",
        "symptoms": [
            "Intact green leaf lobes without yellow mosaic streaks.",
            "Strong petiole angle and robust stem growth."
        ],
        "immediateActions": [
            "Continue standard mounding and weed control practices."
        ],
        "chemicalTreatment": [
            "No chemical intervention required."
        ],
        "organicTreatment": [
            "Apply bio-fertilizer slurry (Azospirillum + PSB) to soil base."
        ],
        "preventativeMeasures": [
            "Keep farm perimeter free from wild whitefly host plants."
        ]
    },
    "Cassava_Mosaic": {
        "crop": "Cassava",
        "condition": "Cassava Mosaic Virus (CMD)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "A devastating geminivirus transmitted by whiteflies (*Bemisia tabaci*) causing severe leaf distortion, yellow mosaic patches, and reduced tuber yield.",
        "symptoms": [
            "Yellow and pale green mosaic mottling on young leaves.",
            "Severe leaf curling, twisting, and reduction in leaf lobe size."
        ],
        "immediateActions": [
            "Rogue out and burn infected plants immediately to prevent whitefly vector spread.",
            "Do not take stem cuttings from affected plants for future planting."
        ],
        "chemicalTreatment": [
            "Spray Imidacloprid 17.8% SL @ 0.5 mL/L to control whitefly vectors.",
            "Alternate with Thiamethoxam 25% WG @ 0.3g/L."
        ],
        "organicTreatment": [
            "Set up yellow sticky traps @ 20 traps/acre.",
            "Spray Neem seed kernel extract (NSKE 5%) to repel whiteflies."
        ],
        "preventativeMeasures": [
            "Plant certified CMD-resistant cassava varieties (e.g., TMS 30572).",
            "Establish clean seed nurseries."
        ]
    },
    "Chilli_Healthy": {
        "crop": "Chilli",
        "condition": "Healthy Plant",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Chilli canopy is healthy with shiny green leaves, strong branching, and abundant flower bud development.",
        "symptoms": [
            "Crisp green leaves without leaf curling or spots.",
            "Normal node elongation and stem thickness."
        ],
        "immediateActions": [
            "Maintain moisture consistency to avoid flower drop."
        ],
        "chemicalTreatment": [
            "No chemicals required."
        ],
        "organicTreatment": [
            "Foliar spray of Vermicompost wash (1:5 dilution) every 14 days."
        ],
        "preventativeMeasures": [
            "Mulch soil bed with silver-black plastic mulch."
        ]
    },
    "Chilli_Nutrition_Deficiency": {
        "crop": "Chilli",
        "condition": "Nutritional Deficiency (N/K/Fe)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Lack of essential plant nutrients (Nitrogen, Potassium, or Iron) causing general yellowing (chlorosis), stunted growth, and poor fruit set.",
        "symptoms": [
            "General yellowing of older leaves (Nitrogen deficiency).",
            "Marginal leaf scorch and curling (Potassium deficiency).",
            "Interveinal chlorosis on tender young leaves (Iron/Micronutrient deficiency)."
        ],
        "immediateActions": [
            "Apply balanced NPK water-soluble fertilizer via fertigation or soil drench.",
            "Check soil pH; ensure it is between 6.0 and 6.8 for optimal nutrient uptake."
        ],
        "chemicalTreatment": [
            "Foliar spray of 19-19-19 NPK @ 5g/L water.",
            "Foliar spray of Chelated Micronutrient Mixture @ 2g/L water."
        ],
        "organicTreatment": [
            "Soil application of well-decomposed Farmyard Manure (FYM) mixed with Humic Acid (5g/L).",
            "Apply sea weed extract foliar spray @ 2 mL/L."
        ],
        "preventativeMeasures": [
            "Conduct soil test before planting season.",
            "Maintain optimal organic carbon in soil."
        ]
    },
    "Chilli_White_Spot": {
        "crop": "Chilli",
        "condition": "Frog-Eye / White Leaf Spot (Cercospora capsici)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Fungal disease producing small circular lesions with whitish-grey centers and dark brown prominent borders on chilli foliage.",
        "symptoms": [
            "Small circular spots with white/grey center and dark brown margin.",
            "Leaves turn yellow around spots and drop prematurely."
        ],
        "immediateActions": [
            "Pluck and destroy severely spotted lower leaves.",
            "Improve field drainage and reduce plant canopy crowding."
        ],
        "chemicalTreatment": [
            "Spray Copper Hydroxide 77% WP @ 2g/L water.",
            "Or spray Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.7g/L."
        ],
        "organicTreatment": [
            "Foliar spray of Trichoderma viride @ 5g/L or Pseudomonas fluorescens @ 5g/L."
        ],
        "preventativeMeasures": [
            "Rotate chilli fields with non-solanaceous crops.",
            "Avoid flood irrigation."
        ]
    },
    "Citrus_Black_Spot": {
        "crop": "Citrus",
        "condition": "Citrus Black Spot (Phyllosticta citricarpa)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Fungal pathogen causing circular dark brown to black raised spots with reddish margins on leaves and fruit rinds.",
        "symptoms": [
            "Hard black spots with grey depressed centers on leaves and fruits.",
            "Premature fruit drop in high humidity orchards."
        ],
        "immediateActions": [
            "Rake up and burn fallen infected leaf litter beneath tree canopy.",
            "Prune dead twigs and lower skirt branches up to 50 cm from ground."
        ],
        "chemicalTreatment": [
            "Spray Azoxystrobin 23% SC @ 1 mL/L water.",
            "Spray Copper Oxychloride 50% WP @ 3g/L post-petal fall."
        ],
        "organicTreatment": [
            "Apply bio-fungicide Bacillus subtilis foliar spray @ 5 mL/L."
        ],
        "preventativeMeasures": [
            "Keep orchard clean of fallen leaves.",
            "Apply organic mulch over tree root zone."
        ]
    },
    "Citrus_Canker": {
        "crop": "Citrus",
        "condition": "Citrus Canker (Xanthomonas citri)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "A severe bacterial disease causing corky, raised scab-like lesions surrounded by yellow halos on leaves, twigs, and fruits.",
        "symptoms": [
            "Raised corky lesions on both upper and lower leaf surfaces.",
            "Yellow chlorotic halo surrounding each corky lesion.",
            "Twig dieback and severe fruit scarring."
        ],
        "immediateActions": [
            "Prune infected twigs 10 cm below lesion during dry weather.",
            "Control citrus leaf miner pest whose feeding wounds accelerate bacterial entry."
        ],
        "chemicalTreatment": [
            "Spray Copper Hydroxide @ 2.5g/L + Streptocycline (Streptomycin sulphate) @ 0.2g/L.",
            "Spray 3 times: before monsoon, during monsoon, and post-monsoon."
        ],
        "organicTreatment": [
            "Foliar spray of Copper sulfate + Lime (Bordeaux mixture 1%)."
        ],
        "preventativeMeasures": [
            "Plant canker-tolerant citrus rootstocks.",
            "Establish windbreaks around citrus orchard perimeters."
        ]
    },
    "Citrus_Healthy": {
        "crop": "Citrus",
        "condition": "Healthy Tree",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Citrus tree foliage is glossy green, thick, and free from canker scabs, black spots, or leaf miner trails.",
        "symptoms": [
            "Glossy dark green leaves without corky scabs or yellow rings.",
            "Vigorous fruit set and branch growth."
        ],
        "immediateActions": [
            "Maintain micro-irrigation and seasonal manure schedules."
        ],
        "chemicalTreatment": [
            "No chemical treatment required."
        ],
        "organicTreatment": [
            "Apply Micronutrient basal drench once every 6 months."
        ],
        "preventativeMeasures": [
            "Monitor leaf undersides for aphid and psyllid vectors."
        ]
    },
    "Cotton_Bacterial_Blight": {
        "crop": "Cotton",
        "condition": "Bacterial Blight / Angular Leaf Spot (Xanthomonas citri pv. malvacearum)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Bacterial pathogen causing angular water-soaked leaf spots bounded by leaf veins, black arm stem lesions, and boll rot.",
        "symptoms": [
            "Angular water-soaked spots on leaves turning dark brown or black.",
            "Blackening of petioles and stems ('Black Arm' phase).",
            "Sunken water-soaked spots on bolls."
        ],
        "immediateActions": [
            "Avoid field operations when cotton foliage is wet to prevent bacterial spread.",
            "Remove and burn infected plant debris."
        ],
        "chemicalTreatment": [
            "Spray Streptocycline @ 0.2g/L + Copper Oxychloride @ 3g/L of water.",
            "Repeat spray at 12–15 day intervals if wet weather persists."
        ],
        "organicTreatment": [
            "Seed treatment with Pseudomonas fluorescens @ 10g/kg seed.",
            "Foliar spray of 5% raw cow milk solution."
        ],
        "preventativeMeasures": [
            "Delint cotton seed with concentrated sulphuric acid before sowing.",
            "Use blight-resistant Bt cotton hybrids."
        ]
    },
    "Cotton_Curl_Virus": {
        "crop": "Cotton",
        "condition": "Cotton Leaf Curl Virus (CLCuV)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Begomovirus transmitted by whiteflies (*Bemisia tabaci*) causing severe upward leaf curling, vein thickening, and cup-like enations on leaf undersides.",
        "symptoms": [
            "Upward curling of leaves and small cup-like leaf outgrowths (enations) under leaves.",
            "Thickening of leaf veins and stunted main stem growth."
        ],
        "immediateActions": [
            "Rogue out CLCuV-infected plants during early crop stage (up to 45 days after sowing).",
            "Eradicate weed hosts like *Abutilon indicum* from border areas."
        ],
        "chemicalTreatment": [
            "Spray Diafenthiuron 50% WP @ 1.2g/L water to control whitefly vector.",
            "Alternate with Pyriproxyfen 10% EC @ 2 mL/L or Spirotetramat 15.31% OD @ 1 mL/L."
        ],
        "organicTreatment": [
            "Deploy yellow sticky traps @ 25 traps/acre.",
            "Spray Neem oil (10,000 ppm) @ 3 mL/L water."
        ],
        "preventativeMeasures": [
            "Sow CLCuV-resistant cotton varieties recommended for region.",
            "Avoid growing solanaceous crops adjacent to cotton."
        ]
    },
    "Cotton_Healthy": {
        "crop": "Cotton",
        "condition": "Healthy Plant",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Cotton crop demonstrates broad, green 3-to-5 lobed leaves with healthy sympodial branching and boll development.",
        "symptoms": [
            "Broad flat green leaves with normal venation.",
            "Healthy square and boll formation."
        ],
        "immediateActions": [
            "Maintain pest scouting regime twice weekly."
        ],
        "chemicalTreatment": [
            "No chemical application required."
        ],
        "organicTreatment": [
            "Foliar spray of Liquid Bio-NPK @ 5 mL/L."
        ],
        "preventativeMeasures": [
            "Maintain optimum plant density (approx. 18,000 plants/acre)."
        ]
    },
    "Grape_Black_Rot": {
        "crop": "Grape",
        "condition": "Grape Black Rot (Guignardia bidwellii)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Destructive fungal disease forming small reddish-brown circular leaf spots and black shriveled mummy berries on grape bunches.",
        "symptoms": [
            "Reddish-brown circular spots with dark brown margins on leaves.",
            "Berries turn brown, shrivel into black hard wrinkled mummies."
        ],
        "immediateActions": [
            "Prune out mummified berry bunches and infected canes during winter pruning.",
            "Destroy all pruned infected wood."
        ],
        "chemicalTreatment": [
            "Spray Myclobutanil 10% WP @ 0.4g/L water.",
            "Or spray Mancozeb 75% WP @ 2.5g/L pre-bloom."
        ],
        "organicTreatment": [
            "Foliar spray of Copper Hydroxide or Sulfur 80% WDG @ 3g/L."
        ],
        "preventativeMeasures": [
            "Improve vineyard canopy ventilation through shoot positioning and leaf pulling."
        ]
    },
    "Grape_Healthy": {
        "crop": "Grape",
        "condition": "Healthy Vine",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Grape vine foliage is healthy, vibrant green, and free from powdery mildew, downy mildew, or black rot lesions.",
        "symptoms": [
            "Clean palmate leaves without spot lesions or whitish powdery coating."
        ],
        "immediateActions": [
            "Maintain trellis canopy management."
        ],
        "chemicalTreatment": [
            "No chemical treatment needed."
        ],
        "organicTreatment": [
            "Apply Seaweed extract foliar spray post-pruning."
        ],
        "preventativeMeasures": [
            "Ensure effective drip fertigation management."
        ]
    },
    "Grape_Leaf_Blight": {
        "crop": "Grape",
        "condition": "Grape Leaf Blight (Pseudocercospora vitis)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Fungal infection causing irregular reddish-brown to dark brown blighted patches on older leaves, leading to premature defoliation.",
        "symptoms": [
            "Irregular brown necrotic lesions starting at leaf margins.",
            "Defoliation starting from lower canopy upwards."
        ],
        "immediateActions": [
            "Collect and burn fallen blighted leaves.",
            "Open up leaf canopy around fruiting zones."
        ],
        "chemicalTreatment": [
            "Spray Carbendazim 12% + Mancozeb 63% WP @ 2g/L water.",
            "Alternate with Kresoxim-methyl 44.3% SC @ 0.7 mL/L."
        ],
        "organicTreatment": [
            "Spray Bordeaux mixture (1%) post-harvest."
        ],
        "preventativeMeasures": [
            "Maintain balanced vine nutrition and avoid waterlogging."
        ]
    },
    "Groundnut_Healthy": {
        "crop": "Groundnut",
        "condition": "Healthy Crop",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Groundnut foliage exhibits uniform tetrafoliate green leaves with good pegging and pod formation.",
        "symptoms": [
            "Vibrant green leaves without dark leaf spots or yellowing."
        ],
        "immediateActions": [
            "Keep field weed-free during earthing up."
        ],
        "chemicalTreatment": [
            "No chemical application."
        ],
        "organicTreatment": [
            "Apply Rhizobium + PSB bio-fertilizer during soil drenching."
        ],
        "preventativeMeasures": [
            "Maintain gypsum application (200 kg/acre) at pegging stage."
        ]
    },
    "Groundnut_Late_Leaf_Spot": {
        "crop": "Groundnut",
        "condition": "Late Leaf Spot (Phaeoisariopsis personata)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Fungal disease producing dark brown to black circular spots on lower leaf surface without a yellow halo, causing heavy leaf drop and pod yield loss.",
        "symptoms": [
            "Dark brown to black spots mostly on lower leaf surface.",
            "Severe defoliation leaving bare stems."
        ],
        "immediateActions": [
            "Remove initial infected leaves showing heavy spot counts.",
            "Avoid flood irrigation during high humidity."
        ],
        "chemicalTreatment": [
            "Spray Tebuconazole 25.9% EC @ 1.5 mL/L water.",
            "Or Chlorothalonil 75% WP @ 2g/L."
        ],
        "organicTreatment": [
            "Spray Neem oil 5 mL/L + Trichoderma viride 5g/L."
        ],
        "preventativeMeasures": [
            "Rotate groundnut with cereal crops like sorghum or pearl millet."
        ]
    },
    "Groundnut_Nutrition_Deficiency": {
        "crop": "Groundnut",
        "condition": "Nutritional Deficiency (Iron/Calcium)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Iron chlorosis or Calcium deficiency causing pale yellowing between leaf veins and weak pod shell development.",
        "symptoms": [
            "Interveinal yellowing on young top leaves (Iron deficiency).",
            "Empty pods ('Pops') due to Calcium deficiency."
        ],
        "immediateActions": [
            "Soil application of Gypsum @ 200 kg/acre at 45 days after sowing."
        ],
        "chemicalTreatment": [
            "Foliar spray of Ferrous Sulphate (0.5%) + Citric Acid (0.1%) for iron chlorosis.",
            "Apply Chelated Zinc + Boron spray @ 1.5g/L."
        ],
        "organicTreatment": [
            "Apply well-decomposed FYM mixed with Trichoderma and micronutrient mix."
        ],
        "preventativeMeasures": [
            "Correct alkaline soil pH using sulfur amendments if needed."
        ]
    },
    "Maize_Healthy": {
        "crop": "Maize",
        "condition": "Healthy Crop",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Maize leaves are long, broad, sturdy dark green blades with strong stalk development and healthy cob formation.",
        "symptoms": [
            "Uniform green leaf blades without streak viruses or leaf spots."
        ],
        "immediateActions": [
            "Maintain nitrogen side-dressing during knee-high stage."
        ],
        "chemicalTreatment": [
            "No chemical spray required."
        ],
        "organicTreatment": [
            "Apply Azotobacter bio-fertilizer to soil."
        ],
        "preventativeMeasures": [
            "Monitor weekly for fall armyworm egg masses."
        ]
    },
    "Maize_Leaf_Spot": {
        "crop": "Maize",
        "condition": "Grey Leaf Spot / Northern Corn Blight",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Fungal infection causing rectangular tan/brown lesions parallel to leaf veins, restricting photosynthesis during grain fill stage.",
        "symptoms": [
            "Rectangular grey-to-tan spots bounded by leaf veins.",
            "Blighting of complete upper leaves during warm wet weather."
        ],
        "immediateActions": [
            "Destroy infected crop residues after harvest.",
            "Avoid continuous corn cropping in the same field."
        ],
        "chemicalTreatment": [
            "Foliar spray of Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 mL/L water.",
            "Or Propiconazole 25% EC @ 1 mL/L."
        ],
        "organicTreatment": [
            "Foliar spray of Pseudomonas fluorescens @ 10g/L."
        ],
        "preventativeMeasures": [
            "Plant resistant maize hybrids.",
            "Practice minimum 2-year crop rotation."
        ]
    },
    "Maize_Streak_Virus": {
        "crop": "Maize",
        "condition": "Maize Streak Virus (MSV)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Viral disease transmitted by leafhoppers (*Cicadulina*) producing continuous narrow yellow streaks along leaf veins, stunting cob growth.",
        "symptoms": [
            "Narrow broken yellow chlorotic streaks parallel to veins.",
            "Stunted plant height and poorly filled small ears."
        ],
        "immediateActions": [
            "Rogue out infected maize plants showing early streak symptoms."
        ],
        "chemicalTreatment": [
            "Spray Dimethoate 30% EC @ 1.7 mL/L water to control leafhoppers.",
            "Or Imidacloprid 17.8% SL @ 0.5 mL/L."
        ],
        "organicTreatment": [
            "Spray Neem seed kernel extract (NSKE 5%).",
            "Set up yellow sticky traps."
        ],
        "preventativeMeasures": [
            "Use MSV-resistant seed varieties.",
            "Sow early in season to avoid peak leafhopper migration."
        ]
    },
    "Papaya_Bacterial_Spot": {
        "crop": "Papaya",
        "condition": "Bacterial Crown Rot / Spot (Erwinia papayae)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Bacterial pathogen causing water-soaked spots on leaves, petiole collapse, and soft crown rot of papaya trees.",
        "symptoms": [
            "Water-soaked lesions on leaves and leaf petioles.",
            "Folding and wilting of crown leaves leading to tree death."
        ],
        "immediateActions": [
            "Cut off and destroy affected leaves and crown tissue.",
            "Disinfect pruning tools with 70% alcohol between cuts."
        ],
        "chemicalTreatment": [
            "Spray Copper Oxychloride 50% WP @ 3g/L + Streptocycline @ 0.2g/L water."
        ],
        "organicTreatment": [
            "Foliar spray of Bordeaux mixture (1%)."
        ],
        "preventativeMeasures": [
            "Ensure deep well-drained soil; avoid standing water around stem base."
        ]
    },
    "Papaya_Healthy": {
        "crop": "Papaya",
        "condition": "Healthy Tree",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Papaya canopy displays large healthy palmate leaves, thick trunk, and dense fruit cluster around crown.",
        "symptoms": [
            "Broad deep green leaves without yellow mosaic or dark spots."
        ],
        "immediateActions": [
            "Maintain organic mulching around tree basin."
        ],
        "chemicalTreatment": [
            "No chemical spray required."
        ],
        "organicTreatment": [
            "Apply Vermicompost (5 kg/tree) with bio-fertilizers every 4 months."
        ],
        "preventativeMeasures": [
            "Keep orchard perimeter clean of weed hosts."
        ]
    },
    "Papaya_Ring_Spot": {
        "crop": "Papaya",
        "condition": "Papaya Ringspot Virus (PRSV)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Potyvirus transmitted by aphids causing severe yellow mosaic distortion of leaves, oily streaks on petioles, and ringspots on papaya fruit.",
        "symptoms": [
            "Yellow mosaic mottling and shoe-string leaf distortion.",
            "Water-soaked oily streaks on petioles and upper trunk.",
            "Concentric ringspots on fruit surface."
        ],
        "immediateActions": [
            "Uproot and burn PRSV-infected trees immediately.",
            "Control aphid vectors in surrounding vegetation."
        ],
        "chemicalTreatment": [
            "Spray Acephate 75% SP @ 1.5g/L water to control aphid vector.",
            "Alternate with Acetamiprid 20% SP @ 0.2g/L."
        ],
        "organicTreatment": [
            "Spray Neem oil 3 mL/L + Fish oil rosin soap @ 2g/L."
        ],
        "preventativeMeasures": [
            "Plant PRSV-resistant / tolerant papaya hybrids (e.g., SunUp, Rainbow).",
            "Grow border crops like maize or sorghum around papaya field."
        ]
    },
    "Potato_Early_Blight": {
        "crop": "Potato",
        "condition": "Potato Early Blight (Alternaria solani)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Fungal pathogen forming characteristic dark brown spots with concentric target-board rings on mature lower leaves.",
        "symptoms": [
            "Dark brown spots with target-like concentric rings on leaves.",
            "Yellowing around lesions leading to leaf drying."
        ],
        "immediateActions": [
            "Prune infected lower foliage.",
            "Avoid high nitrogen fertilization late in the season."
        ],
        "chemicalTreatment": [
            "Spray Mancozeb 75% WP @ 2.5g/L water.",
            "Or Difenoconazole 25% EC @ 0.5 mL/L."
        ],
        "organicTreatment": [
            "Spray Copper Hydroxide @ 2g/L or Trichoderma viride @ 5g/L."
        ],
        "preventativeMeasures": [
            "Practice 3-year crop rotation.",
            "Mulch potato hills to retain uniform moisture."
        ]
    },
    "Potato_Healthy": {
        "crop": "Potato",
        "condition": "Healthy Plant",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Potato foliage is dense, dark green, and free from early/late blight lesions or leaf roll virus.",
        "symptoms": [
            "Robust compound green leaves with healthy stem earthing up."
        ],
        "immediateActions": [
            "Maintain soil earthing up around root zone."
        ],
        "chemicalTreatment": [
            "No chemical intervention needed."
        ],
        "organicTreatment": [
            "Apply Humic Acid + Seaweed extract soil drench."
        ],
        "preventativeMeasures": [
            "Use certified disease-free potato seed tubers."
        ]
    },
    "Potato_Late_Blight": {
        "crop": "Potato",
        "condition": "Potato Late Blight (Phytophthora infestans)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Devastating oomycete pathogen causing rapid water-soaked leaf destruction, white fungal mold on leaf undersides, and tuber rot.",
        "symptoms": [
            "Large water-soaked dark brown spots rapidly spreading across leaves.",
            "White cottony downy growth on underside of leaves in humid morning weather.",
            "Foul-smelling rotting potato vines."
        ],
        "immediateActions": [
            "Destroy infected foliage immediately upon detection.",
            "Stop sprinkler irrigation to prevent spore splash."
        ],
        "chemicalTreatment": [
            "Spray Cymoxanil 8% + Mancozeb 64% WP @ 2g/L water.",
            "Or Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L.",
            "Spray Dimethomorph 50% WP @ 1g/L during severe incidence."
        ],
        "organicTreatment": [
            "Spray Copper Oxychloride 50% WP @ 3g/L.",
            "Apply bio-control agent Trichoderma harzianum to soil."
        ],
        "preventativeMeasures": [
            "Plant blight-resistant potato varieties (e.g., Kufri Girdhari).",
            "Perform proper hill earthing up to protect tubers."
        ]
    },
    "Rice_Brown_Spot": {
        "crop": "Rice / Paddy",
        "condition": "Rice Brown Spot (Bipolaris oryzae)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Fungal disease associated with nutrient-deficient soils, causing oval sesame-seed shaped brown spots with yellow halos on rice leaves.",
        "symptoms": [
            "Oval brown spots with grey or yellow center scattered over leaves.",
            "Unfilled or discolored grain kernels."
        ],
        "immediateActions": [
            "Apply potassium and nitrogen fertilizers to correct soil deficiency.",
            "Drain standing water if field has toxic anaerobic soil accumulation."
        ],
        "chemicalTreatment": [
            "Foliar spray of Mancozeb 75% WP @ 2.5g/L water.",
            "Or Edifenphos 50% EC @ 1 mL/L."
        ],
        "organicTreatment": [
            "Spray Pseudomonas fluorescens @ 10g/L water.",
            "Foliar spray of fermented cow dung slurry extract."
        ],
        "preventativeMeasures": [
            "Perform seed treatment with Carbendazim @ 2g/kg seed.",
            "Apply balanced soil fertilizers based on soil test."
        ]
    },
    "Rice_Healthy": {
        "crop": "Rice / Paddy",
        "condition": "Healthy Paddy",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Paddy crop exhibits upright, vibrant green leaf blades with healthy tillering and panicle development.",
        "symptoms": [
            "Clean green leaf blades without blast spindles or brown spots."
        ],
        "immediateActions": [
            "Maintain recommended water level (2–5 cm) during tillering."
        ],
        "chemicalTreatment": [
            "No chemical application required."
        ],
        "organicTreatment": [
            "Apply Azolla bio-fertilizer in paddy field."
        ],
        "preventativeMeasures": [
            "Maintain optimal plant spacing."
        ]
    },
    "Rice_Leaf_Blast": {
        "crop": "Rice / Paddy",
        "condition": "Rice Blast (Magnaporthe oryzae)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Major fungal disease producing spindle-shaped lesions with grey/white centers and dark brown borders on leaves, stem nodes, and panicle necks.",
        "symptoms": [
            "Spindle/diamond-shaped lesions on leaf blades with grey centers.",
            "Neck rot causing panicle breakage and empty white heads."
        ],
        "immediateActions": [
            "Drain paddy field water temporarily for 3–4 days.",
            "Avoid top-dressing excessive urea nitrogen."
        ],
        "chemicalTreatment": [
            "Spray Tricyclazole 75% WP @ 0.6g/L water at boot leaf stage.",
            "Or Isoprothiolane 40% EC @ 1.5 mL/L."
        ],
        "organicTreatment": [
            "Foliar spray of Pseudomonas fluorescens @ 10g/L.",
            "Spray 5% sour buttermilk solution."
        ],
        "preventativeMeasures": [
            "Seed treatment with Pseudomonas or Carbendazim @ 2g/kg seed.",
            "Grow blast-resistant rice cultivars."
        ]
    },
    "Soybean_Caterpillar": {
        "crop": "Soybean",
        "condition": "Foliage Caterpillar Damage (Anticarsia gemmatalis / Spodoptera)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Defoliating caterpillars feeding heavily on soybean leaves, leaving skeletonized veins and reduced pod filling capacity.",
        "symptoms": [
            "Chewed, irregular holes and skeletonized leaf veins.",
            "Presence of green or brown caterpillars on leaf undersides."
        ],
        "immediateActions": [
            "Handpick large caterpillars if infestation is localized.",
            "Install pheromone traps for Spodoptera / Helicoverpa @ 5 traps/acre."
        ],
        "chemicalTreatment": [
            "Spray Chlorantraniliprole 18.5% SC @ 0.3 mL/L water.",
            "Or Indoxacarb 14.5% SC @ 0.5 mL/L."
        ],
        "organicTreatment": [
            "Spray Bacillus thuringiensis (Bt) formulation @ 2g/L water.",
            "Spray Beauveria bassiana bio-insecticide @ 5g/L."
        ],
        "preventativeMeasures": [
            "Deep summer plowing to expose pupae to birds and sunlight.",
            "Sow intercrops like pigeonpea or maize."
        ]
    },
    "Soybean_Diabrotica_Speciosa": {
        "crop": "Soybean",
        "condition": "South American Leaf Beetle (Diabrotica speciosa)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Chrysomelid leaf beetle adults feed on soybean foliage, creating characteristic shot-hole feeding damage on leaf blades.",
        "symptoms": [
            "Numerous small round 'shot-holes' eaten through leaves.",
            "Presence of bright green beetles with yellow spots on canopy."
        ],
        "immediateActions": [
            "Scout crop in early morning when beetles are less active.",
            "Avoid spraying broad-spectrum chemicals that kill predatory spiders."
        ],
        "chemicalTreatment": [
            "Spray Thiamethoxam 25% WG @ 0.3g/L water.",
            "Or Beta-cyfluthrin + Imidacloprid @ 0.75 mL/L."
        ],
        "organicTreatment": [
            "Foliar spray of Neem oil (10,000 ppm) @ 3 mL/L water.",
            "Apply Metarhizium anisopliae bio-insecticide."
        ],
        "preventativeMeasures": [
            "Practice crop rotation with non-host crops."
        ]
    },
    "Soybean_Healthy": {
        "crop": "Soybean",
        "condition": "Healthy Crop",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Soybean plants display trifoliate green leaves with strong nodulation on roots and healthy pod clusters.",
        "symptoms": [
            "Lush green trifoliate leaves without insect shot-holes or yellowing."
        ],
        "immediateActions": [
            "Maintain weed management during early 30 days."
        ],
        "chemicalTreatment": [
            "No chemical application needed."
        ],
        "organicTreatment": [
            "Apply Bradyrhizobium culture during seed sowing."
        ],
        "preventativeMeasures": [
            "Ensure proper field drainage."
        ]
    },
    "Sugarcane_Brown_Spot": {
        "crop": "Sugarcane",
        "condition": "Sugarcane Brown Spot (Cercospora longipes)",
        "severity": "Medium",
        "severityColor": "#f97316",
        "description": "Fungal infection causing reddish-brown oval spots on sugarcane leaf blades, reducing photosynthetic capacity and brix content.",
        "symptoms": [
            "Reddish-brown narrow oval spots on both leaf surfaces.",
            "Yellow halo around older lesions leading to leaf tip drying."
        ],
        "immediateActions": [
            "Remove and burn dry infected lower leaves (stripping)."
        ],
        "chemicalTreatment": [
            "Spray Mancozeb 75% WP @ 2.5g/L water.",
            "Or Propiconazole 25% EC @ 1 mL/L."
        ],
        "organicTreatment": [
            "Foliar spray of Trichoderma viride @ 5g/L water."
        ],
        "preventativeMeasures": [
            "Plant brown-spot resistant sugarcane cultivars.",
            "Avoid excessive nitrogen application."
        ]
    },
    "Sugarcane_Grassy_Shoot": {
        "crop": "Sugarcane",
        "condition": "Sugarcane Grassy Shoot Disease (GSD Phytoplasma)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Phytoplasma disease transmitted by leafhoppers causing excessive tillering of thin pale yellow or white shoots, forming a bushy grassy clump.",
        "symptoms": [
            "Proliferation of thin, pale white or yellowish tillers at cane base.",
            "Stunted main cane growth without millable stalk formation."
        ],
        "immediateActions": [
            "Uproot and destroy affected grassy shoot clumps completely.",
            "Do not use setts from affected fields for new planting."
        ],
        "chemicalTreatment": [
            "Spray Malathion 50% EC @ 2 mL/L water to control leafhopper vector.",
            "Or Dimethoate 30% EC @ 1.7 mL/L."
        ],
        "organicTreatment": [
            "Hot water treatment of sugarcane setts at 50°C for 2 hours before planting."
        ],
        "preventativeMeasures": [
            "Use tissue culture raised disease-free planting material."
        ]
    },
    "Sugarcane_Healthy": {
        "crop": "Sugarcane",
        "condition": "Healthy Cane",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Sugarcane crop exhibits thick tall stalks with broad green leaf blades and high juice sugar content potential.",
        "symptoms": [
            "Broad green leaf canopy without grassy shoots or brown spots."
        ],
        "immediateActions": [
            "Perform earthing up and trash mulching."
        ],
        "chemicalTreatment": [
            "No chemical intervention required."
        ],
        "organicTreatment": [
            "Apply Gluconacetobacter diazotrophicus bio-fertilizer."
        ],
        "preventativeMeasures": [
            "Maintain deep furrow irrigation."
        ]
    },
    "Tomato_Healthy": {
        "crop": "Tomato",
        "condition": "Healthy Crop",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Tomato plant shows healthy compound leaves, strong main stem, and abundant flowering and fruit set.",
        "symptoms": [
            "Dark green leaves without blight lesions or yellow curling."
        ],
        "immediateActions": [
            "Stake plants with bamboo supports to keep foliage off soil."
        ],
        "chemicalTreatment": [
            "No chemicals needed."
        ],
        "organicTreatment": [
            "Apply Panchagavya (3%) foliar spray."
        ],
        "preventativeMeasures": [
            "Drip irrigation to keep leaves dry."
        ]
    },
    "Tomato_Leaf_Blight": {
        "crop": "Tomato",
        "condition": "Tomato Early / Late Blight",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Pathogenic blight infection producing dark brown sunken lesions with chlorotic halos, causing defoliation and fruit decay.",
        "symptoms": [
            "Dark brown concentric spots on leaves.",
            "Water-soaked patches spreading quickly under damp weather."
        ],
        "immediateActions": [
            "Prune off blighted lower leaves.",
            "Switch to drip irrigation."
        ],
        "chemicalTreatment": [
            "Spray Copper Hydroxide 77% WP @ 2g/L or Metalaxyl + Mancozeb @ 2g/L water."
        ],
        "organicTreatment": [
            "Spray Neem oil (5 mL/L) + Potassium Bicarbonate (5g/L)."
        ],
        "preventativeMeasures": [
            "Rotate crops away from solanaceous species."
        ]
    },
    "Tomato_Septoria_Leaf_Spot": {
        "crop": "Tomato",
        "condition": "Septoria Leaf Spot (Septoria lycopersici)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Fungal pathogen causing numerous small circular spots with greyish-white centers and dark brown borders, starting on lower leaves.",
        "symptoms": [
            "Abundant small circular spots (2-3 mm) with light grey centers.",
            "Leaves turn yellow and drop, exposing fruit to sunscald."
        ],
        "immediateActions": [
            "Remove lower infected leaves.",
            "Mulch soil bed with straw or plastic."
        ],
        "chemicalTreatment": [
            "Spray Chlorothalonil 75% WP @ 2g/L water.",
            "Or Difenoconazole 25% EC @ 0.5 mL/L."
        ],
        "organicTreatment": [
            "Foliar spray of Copper Oxychloride @ 3g/L or Trichoderma viride @ 5g/L."
        ],
        "preventativeMeasures": [
            "Stake tomato plants and practice crop rotation."
        ]
    },
    "Wheat_Brown_Rust": {
        "crop": "Wheat",
        "condition": "Wheat Brown / Leaf Rust (Puccinia recondita)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Fungal rust producing small, round orange-brown pustules scattered randomly over leaf blades, reducing thousand-kernel weight.",
        "symptoms": [
            "Small orange-brown circular pustules on upper leaf surface.",
            "Pustules rupture releasing dusty orange urediniospores."
        ],
        "immediateActions": [
            "Monitor wheat crop closely during warm spring days."
        ],
        "chemicalTreatment": [
            "Spray Propiconazole 25% EC @ 1 mL/L water.",
            "Or Tebuconazole 25.9% EC @ 1.5 mL/L."
        ],
        "organicTreatment": [
            "Spray fermented cow urine extract (10% solution)."
        ],
        "preventativeMeasures": [
            "Sow rust-resistant wheat varieties (e.g., HD 2967, DBW 187)."
        ]
    },
    "Wheat_Healthy": {
        "crop": "Wheat",
        "condition": "Healthy Wheat",
        "severity": "None",
        "severityColor": "#10b981",
        "description": "Wheat crop demonstrates erect green leaves with dense tiller count and well-filled earheads.",
        "symptoms": [
            "Clean erect green leaf blades without orange or yellow rust pustules."
        ],
        "immediateActions": [
            "Maintain crown root initiation (CRI) irrigation."
        ],
        "chemicalTreatment": [
            "No chemical application."
        ],
        "organicTreatment": [
            "Apply Azotobacter bio-fertilizer top dressing."
        ],
        "preventativeMeasures": [
            "Maintain optimal sowing window (November)."
        ]
    },
    "Wheat_Yellow_Rust": {
        "crop": "Wheat",
        "condition": "Wheat Yellow / Stripe Rust (Puccinia striiformis)",
        "severity": "High",
        "severityColor": "#ef4444",
        "description": "Cool-temperature fungal rust forming vivid bright yellow linear stripes of pustules arranged along leaf veins, causing total leaf drying.",
        "symptoms": [
            "Bright yellow pustules arranged in long linear stripes along leaf veins.",
            "Yellow dust rubbing off easily onto fingers."
        ],
        "immediateActions": [
            "Spray fungicide immediately upon seeing initial yellow stripe spots."
        ],
        "chemicalTreatment": [
            "Foliar spray of Propiconazole 25% EC @ 1 mL/L water.",
            "Or Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.7g/L."
        ],
        "organicTreatment": [
            "Spray bio-control agent Pseudomonas fluorescens @ 10g/L."
        ],
        "preventativeMeasures": [
            "Plant yellow-rust resistant wheat varieties (e.g., HD 3086, PBW 725)."
        ]
    }
}

# Function to get complete advisory object
def get_detailed_45_advisory(class_name: str, confidence: float, model_name: str = "MobileNetV3 Large"):
    data = CROP_45_ADVISORIES.get(class_name)
    
    if not data:
        # Generic fallback formatter
        parts = class_name.split("_")
        crop = parts[0]
        raw_cond = " ".join(parts[1:]) if len(parts) > 1 else "Condition"
        is_healthy = "healthy" in raw_cond.lower()
        
        data = {
            "crop": crop,
            "condition": raw_cond,
            "severity": "None" if is_healthy else "Medium",
            "severityColor": "#10b981" if is_healthy else "#f97316",
            "description": f"Identified {raw_cond} on {crop}.",
            "symptoms": [f"Visual indicators matching {raw_cond}"],
            "immediateActions": ["Monitor crop daily.", "Prune affected leaves if diseased."],
            "chemicalTreatment": ["Consult local agricultural officer for specific fungicide recommendations."],
            "organicTreatment": ["Apply Neem oil spray 5 mL/L."],
            "preventativeMeasures": ["Practice crop rotation and proper plant spacing."]
        }
        
    return {
        "success": True,
        "modelName": model_name,
        "inferenceTimeMs": 35,
        "disease": {
            "id": class_name,
            "name": f"{data['crop']} - {data['condition']}",
            "scientificName": class_name,
            "crop": data["crop"],
            "severity": data["severity"],
            "severityColor": data["severityColor"],
            "confidence": round(confidence, 4),
            "description": data["description"],
            "symptoms": data["symptoms"],
            "immediateActions": data["immediateActions"],
            "chemicalTreatment": data["chemicalTreatment"],
            "organicTreatment": data["organicTreatment"],
            "preventativeMeasures": data["preventativeMeasures"]
        }
    }
