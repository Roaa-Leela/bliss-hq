// Bliss HQ translations. English, Hindi, Telugu.
// Telugu domain terms follow the client's own pre check-in sheet wording.
// Villa names and brand are intentionally not translated.

export type Lang = "en" | "hi" | "te";

type Entry = { en: string; hi: string; te: string };

export const messages: Record<string, Entry> = {
  // Common actions / statuses
  "act.continue": { en: "Continue inspection", hi: "जाँच जारी रखें", te: "తనిఖీ కొనసాగించండి" },
  "act.start": { en: "Start inspection", hi: "जाँच शुरू करें", te: "తనిఖీ ప్రారంభించండి" },
  "demo.reset": { en: "Reset demo data", hi: "डेमो डेटा रीसेट करें", te: "డెమో డేటాను రీసెట్ చేయండి" },
  "act.looksGood": { en: "Looks good", hi: "सब ठीक है", te: "బాగుంది" },
  "act.reportIssue": { en: "Report an issue", hi: "समस्या बताएं", te: "సమస్యను నివేదించండి" },
  "act.takePhoto": { en: "Take photo", hi: "फोटो लें", te: "ఫోటో తీయండి" },
  "act.sendManager": { en: "Send to manager", hi: "मैनेजर को भेजें", te: "మేనేజర్‌కు పంపండి" },
  "act.approve": { en: "Approve", hi: "मंज़ूर करें", te: "ఆమోదించండి" },
  "act.sendBack": { en: "Send back", hi: "वापस भेजें", te: "వెనక్కి పంపండి" },
  "act.submit": { en: "Submit inspection", hi: "जाँच जमा करें", te: "తనిఖీ సమర్పించండి" },
  "act.backHome": { en: "Back to home", hi: "होम पर वापस", te: "హోమ్‌కు వెళ్లండి" },
  "act.backOps": { en: "Back to operations", hi: "ऑपरेशन्स पर वापस", te: "ఆపరేషన్స్‌కు వెళ్లండి" },
  "act.laundryLog": { en: "Housekeeping & laundry log", hi: "हाउसकीपिंग और लॉन्ड्री लॉग", te: "హౌస్‌కీపింగ్ & లాండ్రీ లాగ్" },
  "st.done": { en: "Done", hi: "पूरा", te: "పూర్తయింది" },
  "st.next": { en: "Next", hi: "अगला", te: "తదుపరి" },
  "st.todo": { en: "To do", hi: "करना है", te: "చేయాలి" },
  "st.resume": { en: "Resume", hi: "जारी रखें", te: "కొనసాగించు" },
  "st.start": { en: "Start", hi: "शुरू करें", te: "ప్రారంభించు" },
  "st.ready": { en: "Ready", hi: "तैयार", te: "సిద్ధం" },
  "st.inProgress": { en: "In progress", hi: "चल रहा है", te: "జరుగుతోంది" },
  "a.back": { en: "Back", hi: "वापस", te: "వెనుకకు" },

  // Role select
  "role.title": { en: "Choose a view", hi: "एक व्यू चुनें", te: "ఒక వీక్షణ ఎంచుకోండి" },
  "role.demo": { en: "Demo", hi: "डेमो", te: "డెమో" },
  "role.help": { en: "Pick a role to explore the app. In the real product this is a secure login.", hi: "ऐप देखने के लिए एक भूमिका चुनें। असली प्रोडक्ट में यह एक सुरक्षित लॉगिन होगा।", te: "యాప్‌ను చూడటానికి ఒక పాత్రను ఎంచుకోండి. అసలు ఉత్పత్తిలో ఇది సురక్షిత లాగిన్ అవుతుంది." },
  "role.caretaker": { en: "Caretaker", hi: "केयरटेकर", te: "కేర్‌టేకర్" },
  "role.caretaker.sub": { en: "Do checks on the ground", hi: "मौके पर जाँच करें", te: "క్షేత్రంలో తనిఖీలు చేయండి" },
  "role.manager": { en: "Property Manager", hi: "प्रॉपर्टी मैनेजर", te: "ప్రాపర్టీ మేనేజర్" },
  "role.manager.sub": { en: "Review and run operations", hi: "समीक्षा करें और संचालन चलाएं", te: "సమీక్షించి, నిర్వహణ చూడండి" },
  "role.owner": { en: "Villa Owner", hi: "विला मालिक", te: "విల్లా యజమాని" },
  "role.owner.sub": { en: "See your property", hi: "अपनी प्रॉपर्टी देखें", te: "మీ ఆస్తిని చూడండి" },
  "role.admin": { en: "Admin", hi: "एडमिन", te: "అడ్మిన్" },
  "role.admin.sub": { en: "Set up and oversee everything", hi: "सब कुछ सेट और प्रबंधित करें", te: "అన్నీ సెటప్ చేసి పర్యవేక్షించండి" },

  // Today (caretaker)
  "today.greeting": { en: "Good morning", hi: "नमस्ते", te: "నమస్తే" },
  "today.currentProperty": { en: "Current property", hi: "मौजूदा प्रॉपर्टी", te: "ప్రస్తుత ఆస్తి" },
  "today.areasReady": { en: "{done} of {total} areas ready", hi: "{total} में से {done} एरिया तैयार", te: "{total} లో {done} ఏరియాలు సిద్ధం" },
  "today.areas": { en: "Areas", hi: "एरिया", te: "ఏరియాలు" },
  "today.guest": { en: "Guest", hi: "मेहमान", te: "అతిథి" },

  // Areas
  "areas.all": { en: "All areas", hi: "सभी एरिया", te: "అన్ని ఏరియాలు" },
  "areas.ready2": { en: "{done} of {total} areas ready", hi: "{total} में से {done} एरिया तैयार", te: "{total} లో {done} ఏరియాలు సిద్ధం" },
  "areas.checks": { en: "{done} of {total} checks", hi: "{total} में से {done} जाँच", te: "{total} లో {done} తనిఖీలు" },

  // Task
  "task.check": { en: "Check {idx} of {total}", hi: "जाँच {idx} / {total}", te: "తనిఖీ {idx} / {total}" },
  "task.reference": { en: "Reference · how it should look", hi: "संदर्भ · ऐसा दिखना चाहिए", te: "నమూనా · ఇలా ఉండాలి" },
  "task.idealSetup": { en: "Ideal setup", hi: "आदर्श रूप", te: "ఆదర్శ అమరిక" },
  "task.yourPhoto": { en: "Your photo", hi: "आपकी फोटो", te: "మీ ఫోటో" },

  // Report issue
  "issue.title": { en: "Report an issue", hi: "समस्या बताएं", te: "సమస్యను నివేదించండి" },
  "issue.what": { en: "What is the problem?", hi: "समस्या क्या है?", te: "సమస్య ఏమిటి?" },
  "issue.urgent": { en: "How urgent?", hi: "कितना ज़रूरी?", te: "ఎంత అత్యవసరం?" },
  "issue.note": { en: "Add a note", hi: "नोट जोड़ें", te: "గమనిక జోడించండి" },
  "issue.notePh": { en: "Describe what you see", hi: "जो दिख रहा है उसे लिखें", te: "మీరు చూసేది వివరించండి" },
  "issue.photos": { en: "Photos", hi: "फ़ोटो", te: "ఫోటోలు" },
  "cat.cleaning": { en: "Cleaning", hi: "सफाई", te: "శుభ్రత" },
  "cat.damage": { en: "Damage", hi: "नुकसान", te: "నష్టం" },
  "cat.missing": { en: "Missing item", hi: "गायब सामान", te: "మిస్సింగ్ వస్తువు" },
  "cat.maintenance": { en: "Maintenance", hi: "मरम्मत", te: "నిర్వహణ" },
  "lvl.low": { en: "Low", hi: "कम", te: "తక్కువ" },
  "lvl.medium": { en: "Medium", hi: "मध्यम", te: "మధ్యమం" },
  "lvl.high": { en: "High", hi: "ज़्यादा", te: "ఎక్కువ" },

  // Laundry
  "laundry.kicker": { en: "After checkout", hi: "चेकआउट के बाद", te: "చెకౌట్ తర్వాత" },
  "laundry.title": { en: "Laundry count", hi: "लॉन्ड्री गिनती", te: "లాండ్రీ లెక్క" },
  "laundry.help": { en: "Count items going to the laundry. The manager sees this instantly.", hi: "लॉन्ड्री जाने वाले सामान गिनें। मैनेजर को तुरंत दिखेगा।", te: "లాండ్రీకి వెళ్లే వస్తువులను లెక్కించండి. మేనేజర్‌కు వెంటనే కనిపిస్తుంది." },
  "laundry.send": { en: "Send list to manager", hi: "सूची मैनेजर को भेजें", te: "జాబితాను మేనేజర్‌కు పంపండి" },
  "laundry.sendN": { en: "Send {n} items to manager", hi: "{n} सामान मैनेजर को भेजें", te: "{n} వస్తువులను మేనేజర్‌కు పంపండి" },
  "ln.sheets": { en: "Bed sheets", hi: "बेड शीट", te: "బెడ్ షీట్లు" },
  "ln.pillow": { en: "Pillow covers", hi: "तकिया कवर", te: "దిండు కవర్లు" },
  "ln.bath": { en: "Bath towels", hi: "बाथ टॉवल", te: "స్నాన తువ్వాళ్లు" },
  "ln.hand": { en: "Hand towels", hi: "हैंड टॉवल", te: "చేతి తువ్వాళ్లు" },
  "ln.duvet": { en: "Duvet covers", hi: "रजाई कवर", te: "రజాయి కవర్లు" },
  "sz.queenking": { en: "Queen / King", hi: "क्वीन / किंग", te: "క్వీన్ / కింగ్" },
  "sz.standard": { en: "Standard", hi: "स्टैंडर्ड", te: "స్టాండర్డ్" },
  "sz.large": { en: "Large", hi: "बड़ा", te: "పెద్దది" },
  "sz.medium": { en: "Medium", hi: "मध्यम", te: "మధ్యమం" },

  // Submit
  "submit.ready": { en: "{name} is ready", hi: "{name} तैयार है", te: "{name} సిద్ధంగా ఉంది" },
  "submit.body": { en: "All {total} areas checked and submitted. Your manager has been notified for review.", hi: "सभी {total} एरिया जाँचकर जमा कर दिए गए। समीक्षा के लिए आपके मैनेजर को सूचित कर दिया गया है।", te: "మొత్తం {total} ఏరియాలు తనిఖీ చేసి సమర్పించబడ్డాయి. సమీక్ష కోసం మీ మేనేజర్‌కు తెలియజేయబడింది." },

  // Manager
  "mgr.ops": { en: "Operations", hi: "ऑपरेशन्स", te: "ఆపరేషన్స్" },
  "mgr.readyStat": { en: "Ready", hi: "तैयार", te: "సిద్ధం" },
  "mgr.toReview": { en: "To review", hi: "समीक्षा बाकी", te: "సమీక్షించాలి" },
  "mgr.openIssues": { en: "Open issues", hi: "खुली समस्याएं", te: "పెండింగ్ సమస్యలు" },
  "mgr.readiness": { en: "Property readiness", hi: "प्रॉपर्टी तैयारी", te: "ఆస్తి సన్నద్ధత" },
  "mgr.flagged": { en: "flagged {when}", hi: "{when} दर्ज", te: "{when} నమోదైంది" },
  "mgr.notStarted": { en: "Not started", hi: "शुरू नहीं हुआ", te: "ప్రారంభం కాలేదు" },
  "mgr.postStay": { en: "Post-stay cleaning", hi: "स्टे के बाद सफाई", te: "స్టే తర్వాత శుభ్రత" },
  "mgr.areasN": { en: "{done} of {total} areas", hi: "{total} में से {done} एरिया", te: "{total} లో {done} ఏరియాలు" },

  // Review
  "rev.submittedBy": { en: "Pre check-in · submitted by Ramesh", hi: "प्री चेक-इन · रमेश द्वारा जमा", te: "ప్రీ చెక్-ఇన్ · రమేష్ సమర్పించారు" },
  "rev.summary": { en: "8 of 8 areas · 6 photos", hi: "8 में से 8 एरिया · 6 फोटो", te: "8 లో 8 ఏరియాలు · 6 ఫోటోలు" },
  "rev.byArea": { en: "Photos by area", hi: "एरिया अनुसार फोटो", te: "ఏరియా వారీగా ఫోటోలు" },
  "rev.comment": { en: "Comment (optional)", hi: "टिप्पणी (वैकल्पिक)", te: "వ్యాఖ్య (ఐచ్ఛికం)" },
  "rev.commentPh": { en: "Add a note for the caretaker", hi: "केयरटेकर के लिए नोट लिखें", te: "కేర్‌టేకర్ కోసం గమనిక రాయండి" },
  "rev.approved": { en: "Approved", hi: "मंज़ूर", te: "ఆమోదించబడింది" },
  "rev.approvedBody": { en: "{name} is marked ready. The owner can now see the completed inspection.", hi: "{name} तैयार के रूप में चिह्नित। मालिक अब पूरी जाँच देख सकते हैं।", te: "{name} సిద్ధంగా గుర్తించబడింది. యజమాని ఇప్పుడు పూర్తి తనిఖీని చూడవచ్చు." },

  // Owner
  "own.your": { en: "Your property", hi: "आपकी प्रॉपर्टी", te: "మీ ఆస్తి" },
  "own.readyGuest": { en: "Ready for guest", hi: "मेहमान के लिए तैयार", te: "అతిథి కోసం సిద్ధం" },
  "own.nextCheckin": { en: "Next check-in today, 4:00 PM", hi: "अगली चेक-इन आज, शाम 4:00", te: "తదుపరి చెక్-ఇన్ ఈరోజు, సాయంత్రం 4:00" },
  "own.activity": { en: "Recent activity", hi: "हाल की गतिविधि", te: "ఇటీవలి కార్యకలాపాలు" },
  "own.month": { en: "This month", hi: "इस महीने", te: "ఈ నెల" },
  "own.bookings": { en: "Bookings", hi: "बुकिंग", te: "బుకింగ్‌లు" },
  "own.inspections": { en: "Inspections", hi: "जाँच", te: "తనిఖీలు" },
  "own.issues": { en: "Issues", hi: "समस्याएं", te: "సమస్యలు" },
  "own.revenue": { en: "Revenue details appear here once accounting goes live.", hi: "अकाउंटिंग शुरू होने पर आय का विवरण यहाँ दिखेगा।", te: "అకౌంటింగ్ ప్రారంభమైన తర్వాత ఆదాయ వివరాలు ఇక్కడ కనిపిస్తాయి." },

  // Admin
  "adm.setup": { en: "Setup", hi: "सेटअप", te: "సెటప్" },
  "adm.title": { en: "Admin", hi: "एडमिन", te: "అడ్మిన్" },
  "adm.properties": { en: "Properties", hi: "प्रॉपर्टीज़", te: "ఆస్తులు" },
  "adm.add": { en: "Add", hi: "जोड़ें", te: "జోడించు" },
  "adm.new": { en: "New", hi: "नया", te: "కొత్త" },
  "adm.edit": { en: "Edit", hi: "बदलें", te: "మార్చు" },
  "adm.propSub": { en: "Caretaker assigned · checklist set", hi: "केयरटेकर नियुक्त · चेकलिस्ट सेट", te: "కేర్‌టేకర్ కేటాయించారు · చెక్‌లిస్ట్ సెట్" },
  "adm.templates": { en: "Checklist templates", hi: "चेकलिस्ट टेम्पलेट", te: "చెక్‌లిస్ట్ టెంప్లేట్లు" },
  "adm.tplSub": { en: "Master checklist · room by room", hi: "मास्टर चेकलिस्ट · कमरे दर कमरे", te: "మాస్టర్ చెక్‌లిస్ట్ · గది వారీగా" },
  "adm.people": { en: "People", hi: "लोग", te: "వ్యక్తులు" },
  "adm.managers": { en: "Managers", hi: "मैनेजर", te: "మేనేజర్లు" },
  "adm.caretakers": { en: "Caretakers", hi: "केयरटेकर", te: "కేర్‌టేకర్లు" },
  "adm.owners": { en: "Owners", hi: "मालिक", te: "యజమానులు" },

  // Checklist meta used in property meta line
  "meta.preCheckin": { en: "Pre check-in", hi: "प्री चेक-इन", te: "ప్రీ చెక్-ఇన్" },

  // Templates
  "tpl.preCheckin": { en: "Pre check-in", hi: "प्री चेक-इन", te: "ప్రీ చెక్-ఇన్" },
  "tpl.postStay": { en: "Post-stay", hi: "स्टे के बाद", te: "స్టే తర్వాత" },
  "tpl.daily": { en: "Daily", hi: "रोज़ाना", te: "ప్రతిరోజు" },
  "tpl.weekly": { en: "Weekly", hi: "साप्ताहिक", te: "వారానికి" },
  "tpl.monthly": { en: "Monthly", hi: "मासिक", te: "నెలవారీ" },
  "tpl.adhoc": { en: "Ad-hoc", hi: "ज़रूरत अनुसार", te: "అవసరమైనప్పుడు" },

  // Issue example titles (demo)
  "ix.ac": { en: "AC not cooling", hi: "एसी ठंडा नहीं कर रहा", te: "ఏసీ చల్లబడటం లేదు" },
  "ix.towels": { en: "Towels short", hi: "टॉवल कम हैं", te: "తువ్వాళ్లు తక్కువ" },
  "when.2h": { en: "2h ago", hi: "2 घंटे पहले", te: "2 గం. క్రితం" },
  "when.today": { en: "Today", hi: "आज", te: "ఈరోజు" },

  // Days
  "day.thu": { en: "Thursday", hi: "गुरुवार", te: "గురువారం" },
  "day.fri": { en: "Friday", hi: "शुक्रवार", te: "శుక్రవారం" },

  // Owner timeline (demo)
  "tl.1.t": { en: "Pre check-in inspection completed", hi: "प्री चेक-इन जाँच पूरी", te: "ప్రీ చెక్-ఇన్ తనిఖీ పూర్తయింది" },
  "tl.1.s": { en: "12 June · all 8 areas passed", hi: "12 जून · सभी 8 एरिया पास", te: "12 జూన్ · అన్ని 8 ఏరియాలు పాస్" },
  "tl.2.t": { en: "AC service done", hi: "एसी सर्विस हुई", te: "ఏసీ సర్వీస్ పూర్తయింది" },
  "tl.2.s": { en: "10 June · vendor visit", hi: "10 जून · वेंडर विज़िट", te: "10 జూన్ · వెండర్ సందర్శన" },
  "tl.3.t": { en: "Damage reported and resolved", hi: "नुकसान दर्ज और ठीक हुआ", te: "నష్టం నివేదించి పరిష్కరించబడింది" },
  "tl.3.s": { en: "2 June · chair repaired", hi: "2 जून · कुर्सी ठीक हुई", te: "2 జూన్ · కుర్చీ మరమ్మతు" },
  "tl.4.t": { en: "Post-stay cleaning completed", hi: "स्टे के बाद सफाई पूरी", te: "స్టే తర్వాత శుభ్రత పూర్తయింది" },
  "tl.4.s": { en: "1 June", hi: "1 जून", te: "1 జూన్" },

  // Property meta on Today
  "today.metaLine": { en: "{checklist} · {bhk} · {guest} {time}", hi: "{checklist} · {bhk} · {guest} {time}", te: "{checklist} · {bhk} · {guest} {time}" },

  // Names, villas, dates, time (transliterated for a fully native feel)
  "name.ramesh": { en: "Ramesh", hi: "रमेश", te: "రమేష్" },
  "prop.palm-grove": { en: "Palm Grove Villa", hi: "पाम ग्रोव विला", te: "పామ్ గ్రోవ్ విల్లా" },
  "prop.misty": { en: "Misty Acres", hi: "मिस्टी एकर्स", te: "మిస్టీ ఏకర్స్" },
  "prop.lake": { en: "Lake House", hi: "लेक हाउस", te: "లేక్ హౌస్" },
  "prop.fern": { en: "Fern Villa", hi: "फर्न विला", te: "ఫెర్న్ విల్లా" },
  "today.dateline": { en: "Thursday · 12 June", hi: "गुरुवार · 12 जून", te: "గురువారం · 12 జూన్" },
  "mgr.dateline": { en: "Friday · 13 June", hi: "शुक्रवार · 13 जून", te: "శుక్రవారం · 13 జూన్" },
  "time.4pm": { en: "4:00 PM", hi: "शाम 4:00", te: "సాయంత్రం 4:00" },
  "rev.areasPhotos": { en: "8 of 8 areas · 6 photos", hi: "8 में से 8 एरिया · 6 फोटो", te: "8 లో 8 ఏరియాలు · 6 ఫోటోలు" },

  // Inventory
  "inv.title": { en: "Inventory", hi: "इन्वेंट्री", te: "ఇన్వెంటరీ" },
  "inv.sub": { en: "Stock across Palm Grove Villa", hi: "विला का स्टॉक", te: "విల్లా స్టాక్" },
  "inv.lowStock": { en: "Low stock", hi: "स्टॉक कम", te: "స్టాక్ తక్కువ" },
  "inv.inStock": { en: "In stock", hi: "स्टॉक में", te: "స్టాక్‌లో" },
  "inv.reorder": { en: "Reorder", hi: "दोबारा मंगाएं", te: "మళ్లీ ఆర్డర్" },
  "vnd.title": { en: "Vendor directory", hi: "वेंडर डायरेक्टरी", te: "వెండర్ డైరెక్టరీ" },
  "vnd.sub": { en: "Approved contractors and services", hi: "स्वीकृत ठेकेदार और सेवाएं", te: "ఆమోదిత కాంట్రాక్టర్లు, సేవలు" },
  "act.call": { en: "Call", hi: "कॉल करें", te: "కాల్ చేయండి" },
  "adm.inventory": { en: "Inventory", hi: "इन्वेंट्री", te: "ఇన్వెంటరీ" },
  "adm.vendors": { en: "Vendor directory", hi: "वेंडर डायरेक्टरी", te: "వెండర్ డైరెక్టరీ" },
  "adm.open": { en: "Open", hi: "खोलें", te: "తెరువు" },

  // Inventory categories
  "cat.kitchen": { en: "Kitchen & appliances", hi: "रसोई और उपकरण", te: "వంటగది & పరికరాలు" },
  "cat.crockery": { en: "Cutlery & crockery", hi: "बर्तन और क्रॉकरी", te: "కట్లరీ & క్రాకరీ" },
  "cat.linen": { en: "Linen", hi: "लिनेन", te: "లినెన్" },
  "cat.toiletries": { en: "Toiletries", hi: "टॉयलेटरीज़", te: "టాయిలెట్రీస్" },
  "cat.consumables": { en: "Consumables", hi: "उपभोग वस्तुएं", te: "వినియోగ వస్తువులు" },

  // Trades
  "trade.plumbing": { en: "Plumbing", hi: "प्लंबिंग", te: "ప్లంబింగ్" },
  "trade.electrical": { en: "Electrical", hi: "इलेक्ट्रिकल", te: "ఎలక్ట్రికల్" },
  "trade.ac": { en: "AC service", hi: "एसी सर्विस", te: "ఏసీ సర్వీస్" },
  "trade.pool": { en: "Pool care", hi: "पूल केयर", te: "పూల్ కేర్" },
  "trade.laundry": { en: "Laundry", hi: "लॉन्ड्री", te: "లాండ్రీ" },
  "trade.pest": { en: "Pest control", hi: "पेस्ट कंट्रोल", te: "పెస్ట్ కంట్రోల్" },

  // Condition
  "cond.good": { en: "Good", hi: "अच्छा", te: "బాగుంది" },
  "cond.fair": { en: "Fair", hi: "ठीक", te: "ఫర్వాలేదు" },
  "cond.poor": { en: "Poor", hi: "खराब", te: "బాగోలేదు" },

  // Inventory item names
  "inv.colItem": { en: "Item", hi: "वस्तु", te: "వస్తువు" },
  "inv.colStock": { en: "Stock", hi: "स्टॉक", te: "స్టాక్" },
  "inv.colCondition": { en: "Condition", hi: "स्थिति", te: "పరిస్థితి" },
  "inv.needReorder": { en: "{n} items need reordering", hi: "{n} वस्तुएं दोबारा मंगानी हैं", te: "{n} వస్తువులు మళ్లీ ఆర్డర్ చేయాలి" },
  "inv.allStocked": { en: "All items stocked", hi: "सभी वस्तुएं स्टॉक में", te: "అన్ని వస్తువులు స్టాక్‌లో ఉన్నాయి" },
  "inv.iv1": { en: "Refrigerator", hi: "फ्रिज", te: "ఫ్రిజ్" },
  "inv.iv2": { en: "Microwave", hi: "माइक्रोवेव", te: "మైక్రోవేవ్" },
  "inv.iv3": { en: "Induction cooktop", hi: "इंडक्शन कुकटॉप", te: "ఇండక్షన్ కుక్‌టాప్" },
  "inv.iv4": { en: "Dinner plates", hi: "डिनर प्लेट", te: "డిన్నర్ ప్లేట్లు" },
  "inv.iv5": { en: "Water glasses", hi: "पानी के गिलास", te: "నీటి గ్లాసులు" },
  "inv.iv6": { en: "Bed sheet sets", hi: "बेड शीट सेट", te: "బెడ్ షీట్ సెట్లు" },
  "inv.iv7": { en: "Bath towels", hi: "बाथ टॉवल", te: "స్నాన తువ్వాళ్లు" },
  "inv.iv8": { en: "Shower gel (5L)", hi: "शॉवर जेल (5L)", te: "షవర్ జెల్ (5L)" },
  "inv.iv9": { en: "Floor cleaner", hi: "फर्श क्लीनर", te: "ఫ్లోర్ క్లీనర్" },
  "inv.iv10": { en: "Toilet cleaner", hi: "टॉयलेट क्लीनर", te: "టాయిలెట్ క్లీనర్" },
};

// Area names by id
export const areaNames: Record<string, Entry> = {
  "bedroom-1": { en: "Bedroom 1", hi: "बेडरूम 1", te: "పడకగది 1" },
  "bathroom-1": { en: "Bathroom 1", hi: "बाथरूम 1", te: "బాత్రూమ్ 1" },
  "living": { en: "Living room", hi: "लिविंग रूम", te: "లివింగ్ రూమ్" },
  "kitchen": { en: "Kitchen", hi: "रसोई", te: "వంటగది" },
  "pool": { en: "Pool area", hi: "पूल एरिया", te: "పూల్ ఏరియా" },
  "outdoor": { en: "Outdoor & garden", hi: "बाहर और बगीचा", te: "బయట & తోట" },
  "safety": { en: "Safety & security", hi: "सुरक्षा", te: "భద్రత" },
};

// Checklist item texts by id
export const itemTexts: Record<string, Entry> = {
  "b1-1": { en: "Bed made neatly with fresh linen, pillow covers clean", hi: "बिस्तर साफ चादर से ठीक से लगा, तकिया कवर साफ", te: "మంచం తాజా దుప్పటితో, దిండు కవర్లు శుభ్రంగా" },
  "b1-2": { en: "Water bottle and 2 glasses placed in the room", hi: "कमरे में पानी की बोतल और 2 गिलास रखे", te: "గదిలో నీటి బాటిల్ మరియు 2 గ్లాసులు" },
  "b1-3": { en: "AC and fan are clean and working", hi: "एसी और पंखा साफ और चालू", te: "ఏసీ, ఫ్యాన్ శుభ్రంగా, పని చేస్తున్నాయి" },
  "b1-4": { en: "All lights and switches working", hi: "सभी लाइट और स्विच चालू", te: "అన్ని లైట్లు, స్విచ్‌లు పనిచేస్తున్నాయి" },
  "ba1-1": { en: "Toiletries refilled and bath towels placed", hi: "टॉयलेटरीज़ भरीं और बाथ टॉवल रखे", te: "టాయిలెట్రీస్ నింపారు, స్నాన తువ్వాళ్లు ఉంచారు" },
  "ba1-2": { en: "Toilet, basin and floor cleaned, no smell", hi: "टॉयलेट, बेसिन और फर्श साफ, कोई बदबू नहीं", te: "టాయిలెట్, బేసిన్, నేల శుభ్రం, వాసన లేదు" },
  "ba1-3": { en: "Geyser and lights working", hi: "गीज़र और लाइट चालू", te: "గీజర్, లైట్లు పనిచేస్తున్నాయి" },
  "lv-1": { en: "Cushions arranged and throws folded neatly on the sofa", hi: "सोफे पर कुशन ठीक से और थ्रो मोड़कर रखे", te: "సోఫాపై కుషన్లు సర్ది, దుప్పట్లు మడిచి ఉంచారు" },
  "lv-2": { en: "Floor swept and mopped, surfaces dusted", hi: "फर्श झाड़कर पोंछा, सतहें साफ", te: "నేల ఊడ్చి తుడిచారు, ఉపరితలాలు దుమ్ము లేకుండా" },
  "lv-3": { en: "TV, AC and lights working", hi: "टीवी, एसी और लाइट चालू", te: "టీవీ, ఏసీ, లైట్లు పనిచేస్తున్నాయి" },
  "lv-4": { en: "Wi-Fi card placed and working", hi: "वाई-फाई कार्ड रखा और चालू", te: "వై-ఫై కార్డ్ ఉంచారు, పనిచేస్తోంది" },
  "k-1": { en: "Counter and sink clean and dry", hi: "काउंटर और सिंक साफ और सूखा", te: "కౌంటర్, సింక్ శుభ్రం, పొడిగా" },
  "k-2": { en: "Fridge clean, switched on and empty of old food", hi: "फ्रिज साफ, चालू और पुराना खाना हटा हुआ", te: "ఫ్రిజ్ శుభ్రం, ఆన్‌లో, పాత ఆహారం లేదు" },
  "k-3": { en: "Gas, induction and chimney working", hi: "गैस, इंडक्शन और चिमनी चालू", te: "గ్యాస్, ఇండక్షన్, చిమ్నీ పనిచేస్తున్నాయి" },
  "k-4": { en: "Tea, coffee, sugar and water stocked", hi: "चाय, कॉफी, चीनी और पानी मौजूद", te: "టీ, కాఫీ, చక్కెర, నీరు ఉన్నాయి" },
  "p-1": { en: "Pool water clean, no leaves floating", hi: "पूल का पानी साफ, पत्ते नहीं", te: "పూల్ నీరు శుభ్రం, ఆకులు లేవు" },
  "p-2": { en: "Pool deck swept, chairs arranged", hi: "पूल डेक साफ, कुर्सियाँ लगी", te: "పూల్ డెక్ ఊడ్చారు, కుర్చీలు సర్దారు" },
  "o-1": { en: "Garden tidy, lawn presentable", hi: "बगीचा साफ, लॉन सुंदर", te: "తోట శుభ్రం, పచ్చిక బాగుంది" },
  "o-2": { en: "Outdoor lights working", hi: "बाहर की लाइट चालू", te: "బయటి లైట్లు పనిచేస్తున్నాయి" },
  "s-1": { en: "Main door lock and latches working", hi: "मुख्य दरवाज़े का ताला और कुंडी ठीक", te: "ప్రధాన తలుపు తాళం, గడియలు పనిచేస్తున్నాయి" },
  "s-2": { en: "First aid kit and emergency numbers in place", hi: "फर्स्ट एड किट और इमरजेंसी नंबर मौजूद", te: "ఫస్ట్ ఎయిడ్ కిట్, అత్యవసర నంబర్లు ఉన్నాయి" },
};

export function translate(table: Record<string, Entry>, key: string, lang: Lang, vars?: Record<string, string | number>): string {
  let s = table[key]?.[lang] ?? table[key]?.en ?? key;
  if (vars) for (const k of Object.keys(vars)) s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(vars[k]));
  return s;
}
