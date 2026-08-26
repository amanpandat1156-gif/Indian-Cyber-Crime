import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LanguageOption {
  code: string;
  label: string;
  native: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
];

export type TranslationsDictionary = Record<string, Record<string, string>>;

export const TRANSLATIONS: TranslationsDictionary = {
  en: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.track': 'Track Complaint',
    'nav.verify': 'Check & Verify',
    'nav.help': 'Get Help',
    'nav.volunteer': 'Volunteer',
    'header.govTitle': 'GOVERNMENT OF INDIA',
    'header.ministry': 'Ministry of Home Affairs • Indian Cybercrime Coordination Centre (I4C)',
    'header.portalTitle': 'National Cyber Crime Reporting Portal',
    'header.portalSubtitle': 'Ministry of Home Affairs • Government of India',
    'header.helpline': 'Helpline: 1930',
    'header.goldenHourHelpline': 'Golden Hour Helpline: 1930',
    'header.login': 'Citizen Login',
    'header.skipToContent': 'Skip to main content',
    'header.highContrast': 'High Contrast',
    'header.normalMode': 'Normal Mode',
    'header.searchPlaceholder': 'Search cybercrime guidance, 1930 helpline, or police stations...',
    'common.backToHome': 'Back to Home',
    'common.back': 'Back',

    // Home Page Hero & Cards
    'home.heroBadge': 'SAFE CITIZENS. A SAFER DIGITAL INDIA.',
    'home.howCanWeHelp': 'How can we help?',
    'home.heroSubtitle': "Tell us what happened. We'll guide you through the next steps and help you get the right support.",
    'home.trackBannerTitle': 'Already reported something?',
    'home.trackBannerSubtitle': 'Track your complaint status and view real-time updates from investigating officers.',
    'home.trackNow': 'Track Now',
    'home.emergencyBadge': 'FINANCIAL FRAUD? ACT FAST.',
    'home.emergencyTitle': 'Call 1930',
    'home.emergencySubtitle': 'Report cyber financial fraud and get immediate assistance.',
    'home.call1930Now': 'Call 1930 Now',
    'home.otherWaysHelp': 'Other ways to get help',
    'home.findPoliceStation': 'Find my cyber police station',
    'home.bankAssistance': 'Bank-related assistance',
    'home.complaintEscalation': 'Complaint escalation',
    'home.officialContacts': 'Official contacts',

    // Intent Cards
    'card.lostMoney.title': 'I Lost Money',
    'card.lostMoney.desc': 'Report financial fraud and get guidance on what to do next.',
    'card.harassment.title': 'Someone Is Harassing / Threatening Me',
    'card.harassment.desc': 'Get help with blackmail, extortion, impersonation and more.',
    'card.hacked.title': 'My Account or Device Was Hacked',
    'card.hacked.desc': 'Secure your account and report the incident.',
    'card.anonymous.title': 'I Want to Report Anonymously',
    'card.anonymous.desc': 'Share what you know, without revealing your identity.',
    'card.verify.title': 'I Want to Check / Report a Suspicious Number, UPI ID or Website',
    'card.verify.desc': 'Verify before you trust.',
    'card.needHelp.title': 'I Need Help',
    'card.needHelp.desc': 'Find the right contact, police station or support service.',

    // Financial Fraud Form
    'form.financial.badge': 'EVIDENCE → STRUCTURED COMPLAINT',
    'form.financial.title': 'Report Financial Fraud',
    'form.financial.subtitle': "Tell us what happened with your transaction. We'll guide you through attaching evidence and initiating inter-bank fund recovery.",
    'form.financial.step1': '1. Incident Details',
    'form.financial.step2': '2. Upload Evidence',
    'form.financial.step3': '3. Extraction Review',
    'form.financial.step4': '4. Confirm & Submit',
    'form.financial.amountLabel': 'Estimated Loss Amount (₹)',
    'form.financial.dateLabel': 'Date of Incident / Debit',
    'form.financial.paymentMethod': 'Payment Method Involved',
    'form.financial.titleLabel': 'Brief Incident Title',
    'form.financial.titlePlaceholder': 'e.g. Unauthorized UPI transfer via QR code or Fake Customer Care call',
    'form.financial.narrativeLabel': 'What happened? (Plain Language Explanation)',
    'form.financial.narrativePlaceholder': 'Please describe how the fraud occurred, what link or QR was clicked, and any suspect mobile or UPI IDs.',
    'form.financial.continueToEvidence': 'Continue to Evidence Upload',
    'form.financial.uploadTitle': 'Upload Transaction Evidence',
    'form.financial.uploadSubtitle': 'Upload screenshots of the transaction receipt, SMS alerts, or bank debit statement. Our automated parser will extract key details for your review.',
    'form.financial.reviewExtractedTitle': 'We Found These Details',
    'form.financial.reviewExtractedSubtitle': 'Please review the extracted information below. You can confirm or modify any fields before submitting.',
    'form.financial.confirmCheckbox': 'I have reviewed the extracted transaction details and confirm that they accurately reflect the fraudulent debit.',
    'form.financial.proceedFinal': 'Proceed to Final Review',
    'form.financial.finalReviewTitle': 'Review Structured Complaint',
    'form.financial.finalReviewSubtitle': 'Please review your complaint summary before submitting to the national cybercrime portal.',
    'form.financial.submitBtn': 'Submit Official Complaint',
    'form.financial.submitting': 'Registering Complaint...',
    'form.financial.successTitle': 'COMPLAINT REGISTERED SUCCESSFULLY',
    'form.financial.trackBtn': 'Track My Complaint',

    // Harassment Form
    'form.harassment.badge': 'INTENT FIRST REPORTING',
    'form.harassment.title': 'Someone Is Harassing or Threatening Me',
    'form.harassment.subtitle': 'Tell us what happened in plain language. You can share screenshots of chat messages, extortion emails, or fake profiles.',
    'form.harassment.safetyNoticeTitle': 'Immediate Safety Notice',
    'form.harassment.safetyNotice': 'If you are facing immediate physical harm or life-threatening extortion, please call emergency police at 112 immediately.',
    'form.harassment.platformLabel': 'Platform or App Involved',
    'form.harassment.platformPlaceholder': 'e.g. WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'Brief Summary / Title',
    'form.harassment.titlePlaceholder': 'e.g. Blackmail messages received on WhatsApp from unknown caller',
    'form.harassment.narrativeLabel': 'Tell us what happened',
    'form.harassment.narrativePlaceholder': 'Describe the nature of the messages, what demands were made, and any dates/times.',
    'form.harassment.suspectLabel': 'Suspect Contact Details / Social Handle (if known)',
    'form.harassment.suspectPlaceholder': 'e.g. Phone number +91-9870001122 or username @fake_profile',
    'form.harassment.continueProof': 'Continue to Attach Proof',
    'form.harassment.uploadProofTitle': 'Attach Chat Screenshots & Evidence',
    'form.harassment.uploadProofSubtitle': 'Upload screenshots of threatening messages, call logs, or URLs.',
    'form.harassment.submitBtn': 'Submit Report',
    'form.harassment.submitting': 'Registering Report...',
    'form.harassment.successTitle': 'COMPLAINT REGISTERED',
    'form.harassment.trackTimeline': 'Track Complaint Timeline',

    // Account Hacked Form
    'form.hacked.triageBadge': 'IMMEDIATE TRIAGE: SECURE YOUR ACCOUNT FIRST',
    'form.hacked.title': 'Account or Device Compromised',
    'form.hacked.subtitle': 'Before filing a formal cyber complaint, please take these immediate containment steps to stop unauthorized misuse and lock out the attacker.',
    'form.hacked.proceedBtn': 'Proceed to Report Incident',

    // Anonymous Report Form
    'form.anonymous.badge': 'CONFIDENTIAL INTEL INTAKE',
    'form.anonymous.title': 'Report Anonymously',
    'form.anonymous.subtitle': 'Share suspicious cyber activity or national threat intelligence without revealing your personal identity.',
    'form.anonymous.categoryLabel': 'Crime Category',
    'form.anonymous.titleLabel': 'Subject / Summary',
    'form.anonymous.detailsLabel': 'Detailed Information & Evidence Links',
    'form.anonymous.submitBtn': 'Submit Anonymous Tip',
  },

  hi: {
    // Header & Navigation
    'nav.home': 'होम',
    'nav.track': 'शिकायत ट्रैक करें',
    'nav.verify': 'जाँच और सत्यापन',
    'nav.help': 'सहायता प्राप्त करें',
    'nav.volunteer': 'स्वयंसेवक बनें',
    'header.govTitle': 'भारत सरकार',
    'header.ministry': 'गृह मंत्रालय • भारतीय साइबर अपराध समन्वय केंद्र (I4C)',
    'header.portalTitle': 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल',
    'header.portalSubtitle': 'गृह मंत्रालय • भारत सरकार',
    'header.helpline': 'हेल्पलाइन: 1930',
    'header.goldenHourHelpline': 'गोल्डन ऑवर हेल्पलाइन: 1930',
    'header.login': 'नागरिक लॉगिन',
    'header.skipToContent': 'मुख्य सामग्री पर जाएं',
    'header.highContrast': 'उच्च कंट्रास्ट',
    'header.normalMode': 'सामान्य मोड',
    'header.searchPlaceholder': 'साइबर अपराध दिशानिर्देश, 1930 हेल्पलाइन, या पुलिस स्टेशन खोजें...',
    'common.backToHome': 'मुख्य पृष्ठ पर वापस',
    'common.back': 'पीछे',

    // Home Page Hero & Cards
    'home.heroBadge': 'सुरक्षित नागरिक। अधिक सुरक्षित डिजिटल भारत।',
    'home.howCanWeHelp': 'हम आपकी क्या सहायता कर सकते हैं?',
    'home.heroSubtitle': 'हमें बताएं कि क्या हुआ। हम अगले चरणों में आपका मार्गदर्शन करेंगे और सही सहायता प्राप्त करने में मदद करेंगे।',
    'home.trackBannerTitle': 'क्या आपने पहले ही कोई शिकायत दर्ज की है?',
    'home.trackBannerSubtitle': 'अपनी शिकायत की स्थिति ट्रैक करें और जांच अधिकारियों से वास्तविक समय अपडेट देखें।',
    'home.trackNow': 'अभी ट्रैक करें',
    'home.emergencyBadge': 'वित्तीय धोखाधड़ी? तुरंत कार्रवाई करें।',
    'home.emergencyTitle': '1930 पर कॉल करें',
    'home.emergencySubtitle': 'साइबर वित्तीय धोखाधड़ी की रिपोर्ट करें और तत्काल सहायता प्राप्त करें।',
    'home.call1930Now': 'अभी 1930 पर कॉल करें',
    'home.otherWaysHelp': 'मदद प्राप्त करने के अन्य तरीके',
    'home.findPoliceStation': 'अपना साइबर पुलिस स्टेशन खोजें',
    'home.bankAssistance': 'बैंक संबंधित सहायता',
    'home.complaintEscalation': 'शिकायत निवारण और वृद्धि',
    'home.officialContacts': 'आधिकारिक संपर्क',

    // Intent Cards
    'card.lostMoney.title': 'मेरे पैसे कट गए / वित्तीय नुकसान',
    'card.lostMoney.desc': 'वित्तीय धोखाधड़ी की रिपोर्ट करें और आगे क्या करना है, इसका मार्गदर्शन प्राप्त करें।',
    'card.harassment.title': 'कोई मुझे परेशान या धमकी दे रहा है',
    'card.harassment.desc': 'ब्लैकमेल, जबरन वसूली, प्रतिरूपण और अन्य मामलों में सहायता प्राप्त करें।',
    'card.hacked.title': 'मेरा खाता या डिवाइस हैक हो गया',
    'card.hacked.desc': 'अपने खाते को सुरक्षित करें और घटना की रिपोर्ट करें।',
    'card.anonymous.title': 'मैं गुमनाम रूप से रिपोर्ट करना चाहता हूँ',
    'card.anonymous.desc': 'अपनी पहचान उजागर किए बिना जानकारी साझा करें।',
    'card.verify.title': 'संदिग्ध नंबर, यूपीआई आईडी या वेबसाइट की जाँच करें',
    'card.verify.desc': 'विश्वास करने से पहले सत्यापन करें।',
    'card.needHelp.title': 'मुझे सहायता चाहिए',
    'card.needHelp.desc': 'सही संपर्क, पुलिस स्टेशन या सहायता सेवा खोजें।',

    // Financial Fraud Form
    'form.financial.badge': 'साक्ष्य → संरचित शिकायत',
    'form.financial.title': 'वित्तीय धोखाधड़ी की रिपोर्ट करें',
    'form.financial.subtitle': 'अपने लेनदेन के बारे में बताएं। हम साक्ष्य संलग्न करने और अंतर-बैंक धन वापसी शुरू करने में आपका मार्गदर्शन करेंगे।',
    'form.financial.step1': '1. घटना का विवरण',
    'form.financial.step2': '2. साक्ष्य अपलोड करें',
    'form.financial.step3': '3. विवरण समीक्षा',
    'form.financial.step4': '4. पुष्टि और सबमिट',
    'form.financial.amountLabel': 'अनुमानित हानि राशि (₹)',
    'form.financial.dateLabel': 'घटना / कटौती की तिथि',
    'form.financial.paymentMethod': 'शामिल भुगतान विधि',
    'form.financial.titleLabel': 'संक्षिप्त घटना का शीर्षक',
    'form.financial.titlePlaceholder': 'उदा. क्यूआर कोड या फर्जी कस्टमर केयर कॉल के माध्यम से अनधिकृत यूपीआई लेनदेन',
    'form.financial.narrativeLabel': 'क्या हुआ था? (सरल भाषा में विवरण)',
    'form.financial.narrativePlaceholder': 'कृपया बताएं कि धोखाधड़ी कैसे हुई, कौन सा लिंक या क्यूआर स्कैन किया गया, और संदिग्ध मोबाइल या यूपीआई आईडी।',
    'form.financial.continueToEvidence': 'साक्ष्य अपलोड करने के लिए आगे बढ़ें',
    'form.financial.uploadTitle': 'लेनदेन साक्ष्य अपलोड करें',
    'form.financial.uploadSubtitle': 'लेनदेन रसीद, एसएमएस अलर्ट, या बैंक विवरण के स्क्रीनशॉट अपलोड करें।',
    'form.financial.reviewExtractedTitle': 'हमें ये विवरण मिले',
    'form.financial.reviewExtractedSubtitle': 'कृपया नीचे निकाले गए विवरण की समीक्षा करें। सबमिट करने से पहले आप विवरण संशोधित कर सकते हैं।',
    'form.financial.confirmCheckbox': 'मैंने निकाले गए लेनदेन विवरण की समीक्षा कर ली है और पुष्टि करता हूँ कि यह सही है।',
    'form.financial.proceedFinal': 'अंतिम समीक्षा के लिए आगे बढ़ें',
    'form.financial.finalReviewTitle': 'संरचित शिकायत की समीक्षा करें',
    'form.financial.finalReviewSubtitle': 'राष्ट्रीय साइबर अपराध पोर्टल पर जमा करने से पहले अपने शिकायत सारांश की समीक्षा करें।',
    'form.financial.submitBtn': 'आधिकारिक शिकायत दर्ज करें',
    'form.financial.submitting': 'शिकायत दर्ज की जा रही है...',
    'form.financial.successTitle': 'शिकायत सफलतापूर्वक दर्ज की गई',
    'form.financial.trackBtn': 'मेरी शिकायत ट्रैक करें',

    // Harassment Form
    'form.harassment.badge': 'प्राथमिकता रिपोर्टिंग',
    'form.harassment.title': 'कोई मुझे परेशान या धमकी दे रहा है',
    'form.harassment.subtitle': 'सरल भाषा में बताएं कि क्या हुआ। आप चैट संदेशों, जबरन वसूली ईमेल, या फर्जी प्रोफाइल के स्क्रीनशॉट साझा कर सकते हैं।',
    'form.harassment.safetyNoticeTitle': 'तत्काल सुरक्षा सूचना',
    'form.harassment.safetyNotice': 'यदि आप तत्काल शारीरिक नुकसान या जीवन के खतरे का सामना कर रहे हैं, तो तुरंत 112 पर आपातकालीन पुलिस को कॉल करें।',
    'form.harassment.platformLabel': 'शामिल प्लेटफ़ॉर्म या ऐप',
    'form.harassment.platformPlaceholder': 'उदा. WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'संक्षिप्त सारांश / शीर्षक',
    'form.harassment.titlePlaceholder': 'उदा. अज्ञात कॉलर से व्हाट्सएप पर ब्लैकमेल संदेश',
    'form.harassment.narrativeLabel': 'बताएं क्या हुआ था',
    'form.harassment.narrativePlaceholder': 'संदेशों की प्रकृति, क्या मांगें की गईं, और तिथियों/समय का वर्णन करें।',
    'form.harassment.suspectLabel': 'संदिग्ध संपर्क विवरण / सोशल हैंडल (यदि ज्ञात हो)',
    'form.harassment.suspectPlaceholder': 'उदा. फोन नंबर +91-9870001122 या यूजरनेम @fake_profile',
    'form.harassment.continueProof': 'सबूत संलग्न करने के लिए आगे बढ़ें',
    'form.harassment.uploadProofTitle': 'चैट स्क्रीनशॉट और साक्ष्य संलग्न करें',
    'form.harassment.uploadProofSubtitle': 'धमकी भरे संदेशों, कॉल लॉग या यूआरएल के स्क्रीनशॉट अपलोड करें।',
    'form.harassment.submitBtn': 'रिपोर्ट सबमिट करें',
    'form.harassment.submitting': 'रिपोर्ट दर्ज की जा रही है...',
    'form.harassment.successTitle': 'शिकायत दर्ज की गई',
    'form.harassment.trackTimeline': 'शिकायत समयरेखा ट्रैक करें',

    // Account Hacked Form
    'form.hacked.triageBadge': 'तत्काल सुरक्षा: पहले अपना खाता सुरक्षित करें',
    'form.hacked.title': 'खाता या डिवाइस से समझौता / हैक',
    'form.hacked.subtitle': 'औपचारिक साइबर शिकायत दर्ज करने से पहले, अनधिकृत दुरुपयोग को रोकने के लिए ये सुरक्षा कदम उठाएं।',
    'form.hacked.proceedBtn': 'घटना की रिपोर्ट करने के लिए आगे बढ़ें',

    // Anonymous Report Form
    'form.anonymous.badge': 'गोपनीय सूचना इनटेक',
    'form.anonymous.title': 'गुमनाम रूप से रिपोर्ट करें',
    'form.anonymous.subtitle': 'अपनी व्यक्तिगत पहचान उजागर किए बिना संदिग्ध साइबर गतिविधि या खतरे की खुफिया जानकारी साझा करें।',
    'form.anonymous.categoryLabel': 'अपराध श्रेणी',
    'form.anonymous.titleLabel': 'विषय / सारांश',
    'form.anonymous.detailsLabel': 'विस्तृत जानकारी और साक्ष्य लिंक',
    'form.anonymous.submitBtn': 'गुमनाम सूचना सबमिट करें',
  },

  bn: {
    // Header & Navigation
    'nav.home': 'হোম',
    'nav.track': 'অভিযোগ ট্র্যাক করুন',
    'nav.verify': 'যাচাই ও প্রমাণীকরণ',
    'nav.help': 'সাহায্য পান',
    'nav.volunteer': 'স্বেচ্ছাসেবক',
    'header.govTitle': 'ভারত সরকার',
    'header.ministry': 'স্বরাষ্ট্র মন্ত্রক • ভারতীয় সাইবার অপরাধ সমন্বয় কেন্দ্র (I4C)',
    'header.portalTitle': 'জাতীয় সাইবার ক্রাইম রিপোর্টিং পোর্টাল',
    'header.portalSubtitle': 'স্বরাষ্ট্র মন্ত্রক • ভারত সরকার',
    'header.helpline': 'হেল্পলাইন: ১৯৩০',
    'header.goldenHourHelpline': 'গোল্ডেন আওয়ার হেল্পলাইন: ১৯৩০',
    'header.login': 'নাগরিক লগইন',
    'header.skipToContent': 'মূল বিষয়বস্তুতে যান',
    'header.highContrast': 'উচ্চ বৈসাদৃশ্য',
    'header.normalMode': 'স্বাভাবিক মোড',
    'header.searchPlaceholder': 'সাইবার ক্রাইম নির্দেশিকা, ১৯৩০ হেল্পলাইন বা থানা অনুসন্ধান করুন...',
    'common.backToHome': 'হোমে ফিরে যান',
    'common.back': 'পিছনে',

    // Home Page Hero & Cards
    'home.heroBadge': 'সুরক্ষিত নাগরিক। নিরাপদ ডিজিটাল ভারত।',
    'home.howCanWeHelp': 'আমরা কিভাবে সাহায্য করতে পারি?',
    'home.heroSubtitle': 'আমাদের বলুন কি হয়েছে। আমরা পরবর্তী পদক্ষেপে আপনাকে গাইড করব।',
    'home.trackBannerTitle': 'ইতিমধ্যে কিছু রিপোর্ট করেছেন?',
    'home.trackBannerSubtitle': 'আপনার অভিযোগের স্থিতি ট্র্যাক করুন এবং রিয়েল-টাইম আপডেট দেখুন।',
    'home.trackNow': 'এখনই ট্র্যাক করুন',
    'home.emergencyBadge': 'আর্থিক জালিয়াতি? দ্রুত ব্যবস্থা নিন।',
    'home.emergencyTitle': 'কল করুন ১৯৩০',
    'home.emergencySubtitle': 'সাইবার আর্থিক জালিয়াতি রিপোর্ট করুন এবং তাত্ক্ষণিক সহায়তা পান।',
    'home.call1930Now': 'এখনই ১৯৩০ নম্বরে কল করুন',
    'home.otherWaysHelp': 'সাহায্য পাওয়ার অন্যান্য উপায়',
    'home.findPoliceStation': 'আমার সাইবার থানা খুঁজুন',
    'home.bankAssistance': 'ব্যাংক সম্পর্কিত সহায়তা',
    'home.complaintEscalation': 'অভিযোগ নিষ্পত্তির বৃদ্ধি',
    'home.officialContacts': 'অফিসিয়াল যোগাযোগ',

    // Intent Cards
    'card.lostMoney.title': 'আমি টাকা হারিয়েছি',
    'card.lostMoney.desc': 'আর্থিক জালিয়াতির রিপোর্ট করুন এবং পরবর্তীতে কি করতে হবে সে সম্পর্কে পরামর্শ পান।',
    'card.harassment.title': 'কেউ আমাকে হেনস্থা বা হুমকি দিচ্ছে',
    'card.harassment.desc': 'ব্ল্যাকমেল, চাঁদাবাজি এবং ভুয়া অ্যাকাউন্টে সাহায্য পান।',
    'card.hacked.title': 'আমার অ্যাকাউন্ট বা ডিভাইস হ্যাক হয়েছে',
    'card.hacked.desc': 'আপনার অ্যাকাউন্ট সুরক্ষিত করুন এবং ঘটনার রিপোর্ট করুন।',
    'card.anonymous.title': 'আমি বেনামে রিপোর্ট করতে চাই',
    'card.anonymous.desc': 'আপনার পরিচয় প্রকাশ না করে তথ্য ভাগ করুন।',
    'card.verify.title': 'সন্দেহজনক নম্বর, UPI বা ওয়েবসাইট যাচাই করুন',
    'card.verify.desc': 'বিশ্বাস করার আগে যাচাই করুন।',
    'card.needHelp.title': 'আমার সাহায্য দরকার',
    'card.needHelp.desc': 'সঠিক যোগাযোগ, থানা বা সহায়তা পরিষেবা খুঁজুন।',

    // Financial Fraud Form
    'form.financial.badge': 'প্রমাণ → সুনির্দিষ্ট অভিযোগ',
    'form.financial.title': 'আর্থিক জালিয়াতি রিপোর্ট করুন',
    'form.financial.subtitle': 'আপনার লেনদেন সম্পর্কে বলুন। আমরা প্রমাণ সংযুক্ত করতে এবং অর্থ পুনরুদ্ধারে সাহায্য করব।',
    'form.financial.step1': '১. ঘটনার বিবরণ',
    'form.financial.step2': '২. প্রমাণ আপলোড',
    'form.financial.step3': '৩. বিবরণ পর্যালোচনা',
    'form.financial.step4': '৪. নিশ্চিতকরণ ও জমা',
    'form.financial.amountLabel': 'আনুমানিক ক্ষতির পরিমাণ (₹)',
    'form.financial.dateLabel': 'ঘটনা / ডেবিটের তারিখ',
    'form.financial.paymentMethod': 'পেমেন্ট পদ্ধতি',
    'form.financial.titleLabel': 'সংক্ষিপ্ত ঘটনার শিরোনাম',
    'form.financial.titlePlaceholder': 'যেমন: QR কোড বা ভুয়া কাস্টমার কেয়ারের মাধ্যমে অননুমোদিত অর্থ স্থানান্তর',
    'form.financial.narrativeLabel': 'কি ঘটেছে? (সহজ ভাষায় বর্ণনা)',
    'form.financial.narrativePlaceholder': 'কীভাবে জালিয়াতি হয়েছে, কোন লিঙ্ক বা কিউআর কোড স্ক্যান করা হয়েছে তা বিস্তারিত লিখুন।',
    'form.financial.continueToEvidence': 'প্রমাণ আপলোড করতে এগিয়ে যান',
    'form.financial.uploadTitle': 'লেনদেনের প্রমাণ আপলোড করুন',
    'form.financial.uploadSubtitle': 'রসিদের স্ক্রিনশট, এসএমএস সতর্কতা বা ব্যাংক স্টেটমেন্ট আপলোড করুন।',
    'form.financial.reviewExtractedTitle': 'আমরা এই বিবরণ পেয়েছি',
    'form.financial.reviewExtractedSubtitle': 'দয়া করে নিচে তথ্য পর্যালোচনা করুন।',
    'form.financial.confirmCheckbox': 'আমি পর্যালোচনা করেছি এবং নিশ্চিত করছি যে এই তথ্য সঠিক।',
    'form.financial.proceedFinal': 'চূড়ান্ত পর্যালোচনার জন্য এগিয়ে যান',
    'form.financial.finalReviewTitle': 'অভিযোগ পর্যালোচনা করুন',
    'form.financial.finalReviewSubtitle': 'জমা দেওয়ার আগে অভিযোগের সারাংশ পর্যালোচনা করুন।',
    'form.financial.submitBtn': 'অফিসিয়াল অভিযোগ জমা দিন',
    'form.financial.submitting': 'অভিযোগ নথিভুক্ত করা হচ্ছে...',
    'form.financial.successTitle': 'অভিযোগ সফলভাবে নথিভুক্ত হয়েছে',
    'form.financial.trackBtn': 'আমার অভিযোগ ট্র্যাক করুন',

    // Harassment Form
    'form.harassment.badge': 'গুরুত্বপূর্ণ রিপোর্টিং',
    'form.harassment.title': 'কেউ আমাকে হেনস্থা বা হুমকি দিচ্ছে',
    'form.harassment.subtitle': 'সহজ ভাষায় বলুন কি ঘটেছে। আপনি চ্যাট বার্তা বা ইমেলের স্ক্রিনশট শেয়ার করতে পারেন।',
    'form.harassment.safetyNoticeTitle': 'জরুরী নিরাপত্তা বিজ্ঞপ্তি',
    'form.harassment.safetyNotice': 'শারীরিক ক্ষতি বা প্রাণের ঝুঁকির ক্ষেত্রে অবিলম্বে ১১২ নম্বরে পুলিশে কল করুন।',
    'form.harassment.platformLabel': 'জড়িত প্ল্যাটফর্ম বা অ্যাপ',
    'form.harassment.platformPlaceholder': 'যেমন: WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'সংক্ষিপ্ত বিবরণ / শিরোনাম',
    'form.harassment.titlePlaceholder': 'যেমন: অজানা কলারের কাছ থেকে হোয়াটসঅ্যাপে ব্ল্যাকমেল বার্তা',
    'form.harassment.narrativeLabel': 'আমাদের বলুন কি হয়েছে',
    'form.harassment.narrativePlaceholder': 'বার্তার প্রকৃতি এবং দাবির বিশদ বর্ণনা করুন।',
    'form.harassment.suspectLabel': 'সন্দেহভাজনের যোগাযোগের বিবরণ / সোশ্যাল হ্যান্ডেল (যদি জানা থাকে)',
    'form.harassment.suspectPlaceholder': 'যেমন: ফোন নম্বর বা ব্যবহারকারীর নাম',
    'form.harassment.continueProof': 'প্রমাণ সংযুক্ত করতে এগিয়ে যান',
    'form.harassment.uploadProofTitle': 'চ্যাটের স্ক্রিনশট এবং প্রমাণ সংযুক্ত করুন',
    'form.harassment.uploadProofSubtitle': 'হুমকির বার্তা বা কল লগের স্ক্রিনশট আপলোড করুন।',
    'form.harassment.submitBtn': 'রিপোর্ট জমা দিন',
    'form.harassment.submitting': 'রিপোর্ট জমা দেওয়া হচ্ছে...',
    'form.harassment.successTitle': 'অভিযোগ নথিভুক্ত হয়েছে',
    'form.harassment.trackTimeline': 'অভিযোগের সময়রেখা ট্র্যাক করুন',

    // Account Hacked Form
    'form.hacked.triageBadge': 'জরুরী পদক্ষেপ: প্রথমে আপনার অ্যাকাউন্ট সুরক্ষিত করুন',
    'form.hacked.title': 'অ্যাকাউন্ট বা ডিভাইস হ্যাক হয়েছে',
    'form.hacked.subtitle': 'আনুষ্ঠানিক অভিযোগ করার আগে অপব্যবহার রোধে এই পদক্ষেপগুলি নিন।',
    'form.hacked.proceedBtn': 'ঘটনার রিপোর্ট করতে এগিয়ে যান',

    // Anonymous Report Form
    'form.anonymous.badge': 'গোপনীয় তথ্য গ্রহণ',
    'form.anonymous.title': 'বেনামে রিপোর্ট করুন',
    'form.anonymous.subtitle': 'আপনার ব্যক্তিগত পরিচয় প্রকাশ না করে হুমকি বা অপরাধের তথ্য শেয়ার করুন।',
    'form.anonymous.categoryLabel': 'অপরাধের বিভাগ',
    'form.anonymous.titleLabel': 'বিষয় / সারাংশ',
    'form.anonymous.detailsLabel': 'বিস্তারিত তথ্য এবং প্রমাণের লিঙ্ক',
    'form.anonymous.submitBtn': 'বেনামী টিপ জমা দিন',
  },

  mr: {
    // Header & Navigation
    'nav.home': 'होम',
    'nav.track': 'तक्रार ट्रॅक करा',
    'nav.verify': 'तपासा आणि पडताळणी',
    'nav.help': 'मदत मिळवा',
    'nav.volunteer': 'स्वयंसेवक',
    'header.govTitle': 'भारत सरकार',
    'header.ministry': 'गृह मंत्रालय • भारतीय सायबर गुन्हे समन्वय केंद्र (I4C)',
    'header.portalTitle': 'राष्ट्रीय सायबर गुन्हे रिपोर्टिंग पोर्टल',
    'header.portalSubtitle': 'गृह मंत्रालय • भारत सरकार',
    'header.helpline': 'हेल्पलाईन: 1930',
    'header.goldenHourHelpline': 'गोल्डन अवर हेल्पलाईन: 1930',
    'header.login': 'नागरिक लॉगिन',
    'header.skipToContent': 'मुख्य सामग्रीवर जा',
    'header.highContrast': 'उच्च कॉन्ट्रास्ट',
    'header.normalMode': 'सामान्य मोड',
    'header.searchPlaceholder': 'सायबर गुन्हे मार्गदर्शन, 1930 हेल्पलाईन किंवा पोलीस ठाणे शोधा...',
    'common.backToHome': 'मुख्य पानावर परत जा',
    'common.back': 'मागे',

    // Home Page Hero & Cards
    'home.heroBadge': 'सुरक्षित नागरिक। अधिक सुरक्षित डिजिटल भारत।',
    'home.howCanWeHelp': 'आम्ही कशी मदत करू शकतो?',
    'home.heroSubtitle': 'काय घडले ते आम्हाला सांगा. आम्ही तुम्हाला पुढील चरणांमध्ये मार्गदर्शन करू.',
    'home.trackBannerTitle': 'आधीच तक्रार नोंदवली आहे का?',
    'home.trackBannerSubtitle': 'आपल्या तक्रारीची स्थिती ट्रॅक करा आणि तपास अधिकाऱ्यांकडून थेट अपडेट पहा.',
    'home.trackNow': 'आता ट्रॅक करा',
    'home.emergencyBadge': 'आर्थिक फसवणूक? त्वरित कारवाई करा.',
    'home.emergencyTitle': '1930 वर कॉल करा',
    'home.emergencySubtitle': 'सायबर आर्थिक फसवणुकीची तक्रार करा आणि त्वरित मदत मिळवा.',
    'home.call1930Now': 'आताच 1930 वर कॉल करा',
    'home.otherWaysHelp': 'मदत मिळवण्याचे इतर मार्ग',
    'home.findPoliceStation': 'माझे सायबर पोलीस ठाणे शोधा',
    'home.bankAssistance': 'बँकेशी संबंधित मदत',
    'home.complaintEscalation': 'तक्रार निवारण वाढ',
    'home.officialContacts': 'अधिकृत संपर्क',

    // Intent Cards
    'card.lostMoney.title': 'माझे पैसे गेले / आर्थिक नुकसान',
    'card.lostMoney.desc': 'आर्थिक फसवणुकीची तक्रार नोंदवा आणि पुढे काय करावे याचे मार्गदर्शन मिळवा.',
    'card.harassment.title': 'कोणीतरी मला त्रास देत आहे किंवा धमकावत आहे',
    'card.harassment.desc': 'ब्लॅकमेल, खंडणी आणि बनावट प्रोफाइल्सबाबत मदत मिळवा.',
    'card.hacked.title': 'माझे खाते किंवा डिव्हाइस हॅक झाले',
    'card.hacked.desc': 'आपले खाते सुरक्षित करा आणि घटनेची नोंद करा.',
    'card.anonymous.title': 'मला अनामिकपणे तक्रार करायची आहे',
    'card.anonymous.desc': 'आपली ओळख उघड न करता माहिती शेअर करा.',
    'card.verify.title': 'संशयास्पद नंबर, UPI किंवा वेबसाइट तपासा',
    'card.verify.desc': 'विश्वास ठेवण्यापूर्वी पडताळणी करा.',
    'card.needHelp.title': 'मला मदतीची गरज आहे',
    'card.needHelp.desc': 'योग्य संपर्क, पोलीस ठाणे किंवा सहाय्य सेवा शोधा.',

    // Financial Fraud Form
    'form.financial.badge': 'पुरावा → संरचित तक्रार',
    'form.financial.title': 'आर्थिक फसवणुकीची तक्रार नोंदवा',
    'form.financial.subtitle': 'आपल्या व्यवहाराबद्दल सांगा. आम्ही पुरावे जोडण्यासाठी आणि पैसे परत मिळवण्यासाठी मार्गदर्शन करू.',
    'form.financial.step1': '1. घटनेचा तपशील',
    'form.financial.step2': '2. पुरावा अपलोड करा',
    'form.financial.step3': '3. तपशील पुनरावलोकन',
    'form.financial.step4': '4. पुष्टी आणि सबमिट',
    'form.financial.amountLabel': 'अंदाजे नुकसानीची रक्कम (₹)',
    'form.financial.dateLabel': 'घटनेची / कपातीची तारीख',
    'form.financial.paymentMethod': 'वापरलेली देयक पद्धत',
    'form.financial.titleLabel': 'घटनेचे संक्षिप्त शीर्षक',
    'form.financial.titlePlaceholder': 'उदा. QR कोड किंवा बनावट कॉलद्वारे अनधिकृत UPI व्यवहार',
    'form.financial.narrativeLabel': 'काय घडले? (सोप्या भाषेत स्पष्टीकरण)',
    'form.financial.narrativePlaceholder': 'फसवणूक कशी झाली, कोणती लिंक किंवा QR स्कॅन केला गेला ते लिहा.',
    'form.financial.continueToEvidence': 'पुरावा अपलोड करण्यासाठी पुढे जा',
    'form.financial.uploadTitle': 'व्यवहाराचा पुरावा अपलोड करा',
    'form.financial.uploadSubtitle': 'पावती, एसएमएस किंवा बँक स्टेटमेंटचे स्क्रीनशॉट अपलोड करा.',
    'form.financial.reviewExtractedTitle': 'आम्हाला हे तपशील आढळले',
    'form.financial.reviewExtractedSubtitle': 'कृपया खालील माहिती तपासा. आपण आवश्यकतेनुसार बदल करू शकता.',
    'form.financial.confirmCheckbox': 'मी तपशील तपासले आहेत आणि पुष्टी करतो की ही माहिती योग्य आहे.',
    'form.financial.proceedFinal': 'अंतिम पुनरावलोकनासाठी पुढे जा',
    'form.financial.finalReviewTitle': 'तक्रारीचे पुनरावलोकन करा',
    'form.financial.finalReviewSubtitle': 'पोर्टलवर पाठवण्यापूर्वी तक्रार सारांशाची पडताळणी करा.',
    'form.financial.submitBtn': 'अधिकृत तक्रार नोंदवा',
    'form.financial.submitting': 'तक्रार नोंदवली जात आहे...',
    'form.financial.successTitle': 'तक्रार यशस्वीरित्या नोंदवली गेली',
    'form.financial.trackBtn': 'माझी तक्रार ट्रॅक करा',

    // Harassment Form
    'form.harassment.badge': 'तातडीची नोंदणी',
    'form.harassment.title': 'कोणीतरी मला त्रास देत आहे किंवा धमकावत आहे',
    'form.harassment.subtitle': 'साध्या भाषेत काय घडले ते सांगा. आपण चॅटचे स्क्रीनशॉट किंवा ईमेल जोडू शकता.',
    'form.harassment.safetyNoticeTitle': 'तातडीची सुरक्षा सूचना',
    'form.harassment.safetyNotice': 'शारीरिक इजा किंवा जीवितास धोका असल्यास त्वरित 112 वर पोलिसांशी संपर्क साधा.',
    'form.harassment.platformLabel': 'संबंधित प्लॅटफॉर्म किंवा अॅप',
    'form.harassment.platformPlaceholder': 'उदा. WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'संक्षिप्त सारांश / शीर्षक',
    'form.harassment.titlePlaceholder': 'उदा. अनोळखी कॉलरकडून व्हॉट्सअॅपवर ब्लॅकमेल संदेश',
    'form.harassment.narrativeLabel': 'काय घडले ते आम्हाला सांगा',
    'form.harassment.narrativePlaceholder': 'संदेशांचे स्वरूप आणि मागण्यांचे वर्णन करा.',
    'form.harassment.suspectLabel': 'संशयिताचे संपर्क तपशील / सोशल मीडिया हँडल (माहित असल्यास)',
    'form.harassment.suspectPlaceholder': 'उदा. फोन नंबर किंवा वापरकर्तानाव',
    'form.harassment.continueProof': 'पुरावा जोडण्यासाठी पुढे जा',
    'form.harassment.uploadProofTitle': 'चॅट स्क्रीनशॉट आणि पुरावे जोडा',
    'form.harassment.uploadProofSubtitle': 'धमकीचे संदेश किंवा कॉल लॉगचे स्क्रीनशॉट अपलोड करा.',
    'form.harassment.submitBtn': 'तक्रार सबमिट करा',
    'form.harassment.submitting': 'नोंदणी होत आहे...',
    'form.harassment.successTitle': 'तक्रार नोंदवली गेली',
    'form.harassment.trackTimeline': 'तक्रार टाइमलाइन ट्रॅक करा',

    // Account Hacked Form
    'form.hacked.triageBadge': 'तातडीचे पाऊल: आधी आपले खाते सुरक्षित करा',
    'form.hacked.title': 'खाते किंवा डिव्हाइस हॅक झाले',
    'form.hacked.subtitle': 'तक्रार करण्यापूर्वी गैरवापर रोखण्यासाठी ही पावले उचला.',
    'form.hacked.proceedBtn': 'घटनेची तक्रार करण्यासाठी पुढे जा',

    // Anonymous Report Form
    'form.anonymous.badge': 'गोपनीय माहिती संकलन',
    'form.anonymous.title': 'अनामिकपणे तक्रार करा',
    'form.anonymous.subtitle': 'आपली वैयक्तिक ओळख उघड न करता संशयास्पद सायबर गुन्ह्याची माहिती द्या.',
    'form.anonymous.categoryLabel': 'गुन्ह्याचा प्रकार',
    'form.anonymous.titleLabel': 'विषय / सारांश',
    'form.anonymous.detailsLabel': 'तपशीलवार माहिती आणि पुराव्यांच्या लिंक्स',
    'form.anonymous.submitBtn': 'अनामिक टीप सबमिट करा',
  },

  ta: {
    // Header & Navigation
    'nav.home': 'முகப்பு',
    'nav.track': 'புகாரைக் கண்காணிக்க',
    'nav.verify': 'சரிபார்த்தல்',
    'nav.help': 'உதவி பெற',
    'nav.volunteer': 'தன்னார்வலர்',
    'header.govTitle': 'இந்திய அரசு',
    'header.ministry': 'உள்துறை அமைச்சகம் • இந்திய சைபர் குற்ற ஒருங்கிணைப்பு மையம் (I4C)',
    'header.portalTitle': 'தேசிய சைபர் குற்ற அறிக்கை போர்டல்',
    'header.portalSubtitle': 'உள்துறை அமைச்சகம் • இந்திய அரசு',
    'header.helpline': 'உதவி எண்: 1930',
    'header.goldenHourHelpline': 'பொன் நேரம் உதவி எண்: 1930',
    'header.login': 'குடிமக்கள் உள்நுழைவு',
    'header.skipToContent': 'முக்கிய பகுதிக்குச் செல்க',
    'header.highContrast': 'அதிக மாறுபாடு',
    'header.normalMode': 'சாதாரண பயன்முறை',
    'header.searchPlaceholder': 'சைபர் குற்ற வழிகாட்டல், 1930 உதவி எண் அல்லது காவல் நிலையத்தைத் தேடுங்கள்...',
    'common.backToHome': 'முகப்புக்குத் திரும்பு',
    'common.back': 'பின்செல்',

    // Home Page Hero & Cards
    'home.heroBadge': 'பாதுகாப்பான குடிமக்கள். பாதுகாப்பான டிஜிட்டல் இந்தியா.',
    'home.howCanWeHelp': 'நாங்கள் எப்படி உதவ முடியும்?',
    'home.heroSubtitle': 'என்ன நடந்தது என்று எங்களிடம் கூறுங்கள். அடுத்த கட்ட நடவடிக்கைகளில் நாங்கள் உங்களுக்கு வழிகாட்டுவோம்.',
    'home.trackBannerTitle': 'ஏற்கனவே ஏதேனும் புகாரளித்துள்ளீர்களா?',
    'home.trackBannerSubtitle': 'உங்கள் புகாரின் நிலையைக் கண்காணித்து, அதிகாரிகளின் நேரலை புதுப்பிப்புகளைப் பார்க்கவும்.',
    'home.trackNow': 'இப்போது கண்காணிக்கவும்',
    'home.emergencyBadge': 'நிதி மோசடியா? விரைந்து செயல்படுங்கள்.',
    'home.emergencyTitle': '1930 ஐ அழைக்கவும்',
    'home.emergencySubtitle': 'சைபர் நிதி மோசடியைப் புகாரளித்து உடனடி உதவியைப் பெறுங்கள்.',
    'home.call1930Now': 'இப்போது 1930 ஐ அழைக்கவும்',
    'home.otherWaysHelp': 'உதவி பெற பிற வழிகள்',
    'home.findPoliceStation': 'சைபர் காவல் நிலையத்தைக் கண்டறியவும்',
    'home.bankAssistance': 'வங்கி தொடர்பான உதவி',
    'home.complaintEscalation': 'புகார் தீர்வு மற்றும் மேல்முறையீடு',
    'home.officialContacts': 'அதிகாரப்பூர்வ தொடர்புகள்',

    // Intent Cards
    'card.lostMoney.title': 'நான் பணத்தை இழந்தேன்',
    'card.lostMoney.desc': 'நிதி மோசடி குறித்து புகாரளித்து அடுத்த கட்ட வழிகாட்டுதலைப் பெறுங்கள்.',
    'card.harassment.title': 'யாரோ என்னை துன்புறுத்துகிறார்கள் அல்லது மிரட்டுகிறார்கள்',
    'card.harassment.desc': 'மிரட்டி பணம் பறித்தல், ஆள்மாறாட்டம் போன்றவற்றுக்கு உதவி பெறவும்.',
    'card.hacked.title': 'என் கணக்கு அல்லது சாதனம் ஹேக் செய்யப்பட்டது',
    'card.hacked.desc': 'உங்கள் கணக்கைப் பாதுகாத்து சம்பவத்தைப் புகாரளிக்கவும்.',
    'card.anonymous.title': 'நான் அநாமதேயமாகப் புகாரளிக்க விரும்புகிறேன்',
    'card.anonymous.desc': 'உங்கள் அடையாளத்தை வெளிப்படுத்தாமல் தகவல்களைப் பகிருங்கள்.',
    'card.verify.title': 'சந்தேகத்திற்குரிய எண், UPI அல்லது வலைத்தளத்தைச் சரிபார்க்கவும்',
    'card.verify.desc': 'நம்புவதற்கு முன் சரிபார்க்கவும்.',
    'card.needHelp.title': 'எனக்கு உதவி தேவை',
    'card.needHelp.desc': 'சரியான தொடர்பு, காவல் நிலையம் அல்லது உதவி சேவையைக் கண்டறியவும்.',

    // Financial Fraud Form
    'form.financial.badge': 'ஆதாரம் → கட்டமைக்கப்பட்ட புகார்',
    'form.financial.title': 'நிதி மோசடி குறித்து புகாரளிக்கவும்',
    'form.financial.subtitle': 'உங்கள் பரிவர்த்தனை பற்றி கூறுங்கள். ஆதாரங்களை இணைக்கவும் பணத்தை மீட்கவும் நாங்கள் வழிகாட்டுவோம்.',
    'form.financial.step1': '1. சம்பவ விவரங்கள்',
    'form.financial.step2': '2. ஆதாரம் பதிவேற்றம்',
    'form.financial.step3': '3. விவரங்களை மதிப்பாய்வு செய்தல்',
    'form.financial.step4': '4. உறுதிசெய்து சமர்ப்பித்தல்',
    'form.financial.amountLabel': 'மதிப்பிடப்பட்ட இழப்புத் தொகை (₹)',
    'form.financial.dateLabel': 'சம்பவம் / பணம் பிடித்தம் செய்யப்பட்ட தேதி',
    'form.financial.paymentMethod': 'பயன்படுத்தப்பட்ட கட்டண முறை',
    'form.financial.titleLabel': 'சுருக்கமான சம்பவ தலைப்பு',
    'form.financial.titlePlaceholder': 'எ.கா: QR குறியீடு அல்லது போலி அழைப்பு மூலம் அங்கீகரிக்கப்படாத UPI பரிவர்த்தனை',
    'form.financial.narrativeLabel': 'என்ன நடந்தது? (எளிய விளக்கம்)',
    'form.financial.narrativePlaceholder': 'மோசடி எவ்வாறு நடந்தது, எந்த இணைப்பு அல்லது QR குறியீடு பயன்படுத்தப்பட்டது என்பதை விளக்குங்கள்.',
    'form.financial.continueToEvidence': 'ஆதாரம் பதிவேற்ற தொடரவும்',
    'form.financial.uploadTitle': 'பரிவர்த்தனை ஆதாரங்களைப் பதிவேற்றவும்',
    'form.financial.uploadSubtitle': 'ரசீது ஸ்கிரீன்ஷாட்கள், எஸ்எம்எஸ் எச்சரிக்கைகள் அல்லது வங்கி அறிக்கைகளைப் பதிவேற்றவும்.',
    'form.financial.reviewExtractedTitle': 'நாங்கள் இந்த விவரங்களைக் கண்டறிந்தோம்',
    'form.financial.reviewExtractedSubtitle': 'கீழே உள்ள தகவல்களை மதிப்பாய்வு செய்யவும். சமர்ப்பிக்கும் முன் மாற்றலாம்.',
    'form.financial.confirmCheckbox': 'நான் விவரங்களை மதிப்பாய்வு செய்து அவை துல்லியமாக உள்ளன என்பதை உறுதிப்படுத்துகிறேன்.',
    'form.financial.proceedFinal': 'இறுதி மதிப்பாய்வுக்குச் செல்லவும்',
    'form.financial.finalReviewTitle': 'புகாரை மதிப்பாய்வு செய்யவும்',
    'form.financial.finalReviewSubtitle': 'தேசிய போர்ட்டலில் சமர்ப்பிக்கும் முன் புகார் சுருக்கத்தை சரிபார்க்கவும்.',
    'form.financial.submitBtn': 'அதிகாரப்பூர்வ புகாரைச் சமர்ப்பிக்கவும்',
    'form.financial.submitting': 'புகார் பதிவு செய்யப்படுகிறது...',
    'form.financial.successTitle': 'புகார் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது',
    'form.financial.trackBtn': 'என் புகாரைக் கண்காணிக்கவும்',

    // Harassment Form
    'form.harassment.badge': 'முன்னுரிமை அறிக்கை',
    'form.harassment.title': 'யாரோ என்னை துன்புறுத்துகிறார்கள் அல்லது மிரட்டுகிறார்கள்',
    'form.harassment.subtitle': 'என்ன நடந்தது என்று எளிய மொழியில் சொல்லுங்கள். ஸ்கிரீன்ஷாட்கள் அல்லது மின்னஞ்சல்களைப் பகிரலாம்.',
    'form.harassment.safetyNoticeTitle': 'உடனடி பாதுகாப்பு அறிவிப்பு',
    'form.harassment.safetyNotice': 'உடனடி உடல் ரீதியான ஆபத்து இருந்தால் உடனே 112 ஐ அழைத்து காவல்துறையைத் தொடர்பு கொள்ளவும்.',
    'form.harassment.platformLabel': 'சம்பந்தப்பட்ட தளம் அல்லது பயன்பாடு',
    'form.harassment.platformPlaceholder': 'எ.கா: WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'சுருக்கமான தகவல் / தலைப்பு',
    'form.harassment.titlePlaceholder': 'எ.கா: வாட்ஸ்அப்பில் அறியப்படாத எண்ணிலிருந்து மிரட்டல் செய்தி',
    'form.harassment.narrativeLabel': 'என்ன நடந்தது என்று சொல்லுங்கள்',
    'form.harassment.narrativePlaceholder': 'செய்திகளின் தன்மை மற்றும் கோரிக்கைகளை விவரிக்கவும்.',
    'form.harassment.suspectLabel': 'சந்தேக நபரின் தொடர்பு விவரங்கள் / சமூக கணக்கு (தெரிந்தால்)',
    'form.harassment.suspectPlaceholder': 'எ.கா: தொலைபேசி எண் அல்லது பயனர்பெயர்',
    'form.harassment.continueProof': 'ஆதாரங்களை இணைக்க தொடரவும்',
    'form.harassment.uploadProofTitle': 'அரட்டை ஸ்கிரீன்ஷாட்கள் மற்றும் ஆதாரங்களை இணைக்கவும்',
    'form.harassment.uploadProofSubtitle': 'மிரட்டல் செய்திகள் அல்லது அழைப்பு பதிவுகளின் ஸ்கிரீன்ஷாட்களைப் பதிவேற்றவும்.',
    'form.harassment.submitBtn': 'புகாரைச் சமர்ப்பிக்கவும்',
    'form.harassment.submitting': 'புகார் பதிவு செய்யப்படுகிறது...',
    'form.harassment.successTitle': 'புகார் பதிவு செய்யப்பட்டது',
    'form.harassment.trackTimeline': 'புகார் காலவரிசையைக் கண்காணிக்கவும்',

    // Account Hacked Form
    'form.hacked.triageBadge': 'உடனடி பாதுகாப்பு: முதலில் உங்கள் கணக்கைப் பாதுகாக்கவும்',
    'form.hacked.title': 'கணக்கு அல்லது சாதனம் ஹேக் செய்யப்பட்டது',
    'form.hacked.subtitle': 'முறையான புகார் அளிப்பதற்கு முன் அங்கீகரிக்கப்படாத பயன்பாட்டைத் தடுக்க இந்த நடவடிக்கைகளை எடுக்கவும்.',
    'form.hacked.proceedBtn': 'சம்பவத்தைப் புகாரளிக்க தொடரவும்',

    // Anonymous Report Form
    'form.anonymous.badge': 'ரகசிய தகவல் பதிவு',
    'form.anonymous.title': 'அநாமதேயமாகப் புகாரளிக்கவும்',
    'form.anonymous.subtitle': 'உங்கள் தனிப்பட்ட அடையாளத்தை வெளிப்படுத்தாமல் சந்தேகத்திற்கிடமான குற்றத் தகவல்களைப் பகிருங்கள்.',
    'form.anonymous.categoryLabel': 'குற்ற வகை',
    'form.anonymous.titleLabel': 'பொருள் / சுருக்கம்',
    'form.anonymous.detailsLabel': 'விரிவான தகவல் மற்றும் ஆதார இணைப்புகள்',
    'form.anonymous.submitBtn': 'அநாமதேய தகவலைச் சமர்ப்பிக்கவும்',
  },

  te: {
    // Header & Navigation
    'nav.home': 'హోమ్',
    'nav.track': 'ఫిర్యాదును ట్రాక్ చేయండి',
    'nav.verify': 'తనిఖీ మరియు ధృవీకరణ',
    'nav.help': 'సహాయం పొందండి',
    'nav.volunteer': 'వాలంటీర్',
    'header.govTitle': 'భారత ప్రభుత్వం',
    'header.ministry': 'హోం వ్యవహారాల మంత్రిత్వ శాఖ • భారత సైబర్ క్రైమ్ సమన్వయ కేంద్రం (I4C)',
    'header.portalTitle': 'జాతీయ సైబర్ నేరాల రిపోర్టింగ్ పోర్టల్',
    'header.portalSubtitle': 'హోం మంత్రిత్వ శాఖ • భారత ప్రభుత్వం',
    'header.helpline': 'హెల్ప్‌లైన్: 1930',
    'header.goldenHourHelpline': 'గోల్డెన్ అవర్ హెల్ప్‌లైన్: 1930',
    'header.login': 'పౌర లాగిన్',
    'header.skipToContent': 'ప్రధాన విషయానికి వెళ్లండి',
    'header.highContrast': 'అధిక కాంట్రాస్ట్',
    'header.normalMode': 'సాధారణ మోడ్',
    'header.searchPlaceholder': 'సైబర్ క్రైమ్ మార్గదర్శకాలు, 1930 హెల్ప్‌లైన్ లేదా పోలీస్ స్టేషన్‌ను శోధించండి...',
    'common.backToHome': 'హోమ్‌కి తిరిగి వెళ్లండి',
    'common.back': 'వెనుకకు',

    // Home Page Hero & Cards
    'home.heroBadge': 'సురక్షిత పౌరులు. సురక్షిత డిజిటల్ భారతదేశం.',
    'home.howCanWeHelp': 'మేము ఎలా సహాయపడగలము?',
    'home.heroSubtitle': 'ఏమి జరిగిందో మాకు చెప్పండి. తదుపరి దశల్లో మేము మీకు మార్గనిర్దేశం చేస్తాము.',
    'home.trackBannerTitle': 'ఇప్పటికే ఏదైనా నివేదించారా?',
    'home.trackBannerSubtitle': 'మీ ఫిర్యాదు స్థితిని ట్రాక్ చేయండి మరియు ఇన్వెస్టిగేషన్ అధికారుల నుండి ప్రత్యక్ష నవీకరణలను చూడండి.',
    'home.trackNow': 'ఇప్పుడే ట్రాక్ చేయండి',
    'home.emergencyBadge': 'ఆర్థిక మోసమా? వెంటనే చర్య తీసుకోండి.',
    'home.emergencyTitle': '1930 కి కాల్ చేయండి',
    'home.emergencySubtitle': 'సైబర్ ఆర్థిక మోసాన్ని నివేదించండి మరియు తక్షణ సహాయం పొందండి.',
    'home.call1930Now': 'ఇప్పుడే 1930 కి కాల్ చేయండి',
    'home.otherWaysHelp': 'సహాయం పొందడానికి ఇతర మార్గాలు',
    'home.findPoliceStation': 'నా సైబర్ పోలీస్ స్టేషన్‌ను కనుగొనండి',
    'home.bankAssistance': 'బ్యాంకు సంబంధిత సహాయం',
    'home.complaintEscalation': 'ఫిర్యాదు పరిష్కార పెరుగుదల',
    'home.officialContacts': 'అధికారిక పరిచయాలు',

    // Intent Cards
    'card.lostMoney.title': 'నేను డబ్బు కోల్పోయాను',
    'card.lostMoney.desc': 'ఆర్థిక మోసాన్ని నివేదించండి మరియు తర్వాత ఏమి చేయాలో మార్గదర్శకత్వం పొందండి.',
    'card.harassment.title': 'ఎవరైనా నన్ను వేధిస్తున్నారు లేదా బెదిరిస్తున్నారు',
    'card.harassment.desc': 'బ్లాక్‌మెయిల్, దోపిడీ, నకిలీ ప్రొఫైల్స్ సంబంధిత విషయాల్లో సహాయం పొందండి.',
    'card.hacked.title': 'నా ఖాతా లేదా పరికరం హ్యాక్ చేయబడింది',
    'card.hacked.desc': 'మీ ఖాతాను సురక్షితం చేసుకోండి మరియు సంఘటనను నివేదించండి.',
    'card.anonymous.title': 'నేను అనామకంగా నివేదించాలనుకుంటున్నాను',
    'card.anonymous.desc': 'మీ గుర్తింపును బహిర్గతం చేయకుండా సమాచారాన్ని పంచుకోండి.',
    'card.verify.title': 'అనుమానాస్పద నంబర్, UPI లేదా వెబ్‌సైట్‌ను తనిఖీ చేయండి',
    'card.verify.desc': 'నమ్మే ముందు ధృవీకరించండి.',
    'card.needHelp.title': 'నాకు సహాయం కావాలి',
    'card.needHelp.desc': 'సరైన పరిచయం, పోలీస్ స్టేషన్ లేదా మద్దతు సేవను కనుగొనండి.',

    // Financial Fraud Form
    'form.financial.badge': 'సాక్ష్యం → నిర్మాణాత్మక ఫిర్యాదు',
    'form.financial.title': 'ఆర్థిక మోసాన్ని నివేదించండి',
    'form.financial.subtitle': 'మీ లావాదేవీ గురించి చెప్పండి. సాక్ష్యాలను జతచేయడంలో మరియు నిధులను రికవరీ చేయడంలో మేము మార్గనిర్దేశం చేస్తాము.',
    'form.financial.step1': '1. సంఘటన వివరాలు',
    'form.financial.step2': '2. సాక్ష్యాల అప్‌లోడ్',
    'form.financial.step3': '3. వివరాల సమీక్ష',
    'form.financial.step4': '4. నిర్ధారణ & సమర్పణ',
    'form.financial.amountLabel': 'అంచనా వేసిన నష్టం మొత్తం (₹)',
    'form.financial.dateLabel': 'సంఘటన / డెబిట్ తేదీ',
    'form.financial.paymentMethod': 'చెల్లింపు విధానం',
    'form.financial.titleLabel': 'సంక్షిప్త సంఘటన శీర్షిక',
    'form.financial.titlePlaceholder': 'ఉదా: QR కోడ్ లేదా నకిలీ కాల్ ద్వారా అనధికారిక UPI బదిలీ',
    'form.financial.narrativeLabel': 'ఏమి జరిగింది? (సరళ భాషలో వివరణ)',
    'form.financial.narrativePlaceholder': 'మోసం ఎలా జరిగిందో, ఏ లింక్ లేదా QR స్కాన్ చేయబడిందో వివరించండి.',
    'form.financial.continueToEvidence': 'సాక్ష్యాలను అప్‌లోడ్ చేయడానికి కొనసాగించండి',
    'form.financial.uploadTitle': 'లావాదేవీ సాక్ష్యాలను అప్‌లోడ్ చేయండి',
    'form.financial.uploadSubtitle': 'రసీదు స్క్రీన్‌షాట్లు, SMS హెచ్చరికలు లేదా బ్యాంక్ స్టేట్‌మెంట్‌లను అప్‌లోడ్ చేయండి.',
    'form.financial.reviewExtractedTitle': 'మేము ఈ వివరాలను కనుగొన్నాము',
    'form.financial.reviewExtractedSubtitle': 'దయచేసి కింద ఉన్న సమాచారాన్ని సమీక్షించండి. సమర్పించే ముందు సవరించవచ్చు.',
    'form.financial.confirmCheckbox': 'నేను వివరాలను సమీక్షించాను మరియు అవి ఖచ్చితమైనవని ధృవీకరిస్తున్నాను.',
    'form.financial.proceedFinal': 'తుది సమీక్షకు వెళ్లండి',
    'form.financial.finalReviewTitle': 'ఫిర్యాదును సమీక్షించండి',
    'form.financial.finalReviewSubtitle': 'జాతీయ పోర్టల్‌లో సమర్పించే ముందు ఫిర్యాదు సారాంశాన్ని తనిఖీ చేయండి.',
    'form.financial.submitBtn': 'అధికారిక ఫిర్యాదును సమర్పించండి',
    'form.financial.submitting': 'ఫిర్యాదు నమోదు చేయబడుతోంది...',
    'form.financial.successTitle': 'ఫిర్యాదు విజయవంతంగా నమోదైంది',
    'form.financial.trackBtn': 'నా ఫిర్యాదును ట్రాక్ చేయండి',

    // Harassment Form
    'form.harassment.badge': 'ప్రాధాన్యత రిపోర్టింగ్',
    'form.harassment.title': 'ఎవరైనా నన్ను వేధిస్తున్నారు లేదా బెదిరిస్తున్నారు',
    'form.harassment.subtitle': 'ఏమి జరిగిందో సరళమైన భాషలో చెప్పండి. మీరు చాట్ స్క్రీన్‌షాట్లు లేదా ఇమెయిల్‌లను పంచుకోవచ్చు.',
    'form.harassment.safetyNoticeTitle': 'తక్షణ భద్రతా నోటీసు',
    'form.harassment.safetyNotice': 'మీకు శారీరక హాని లేదా ప్రాణాపాయం ఉంటే, వెంటనే 112 కు కాల్ చేసి పోలీసులను సంప్రదించండి.',
    'form.harassment.platformLabel': 'పాల్గొన్న ప్లాట్‌ఫామ్ లేదా యాప్',
    'form.harassment.platformPlaceholder': 'ఉదా: WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'సంక్షిప్త సారాంశం / శీర్షిక',
    'form.harassment.titlePlaceholder': 'ఉదా: వాట్సాప్‌లో గుర్తుతెలియని కాలర్ నుండి బ్లాక్‌మెయిల్ సందేశాలు',
    'form.harassment.narrativeLabel': 'ఏమి జరిగిందో మాకు చెప్పండి',
    'form.harassment.narrativePlaceholder': 'సందేశాల స్వభావం మరియు డిమాండ్లను వివరించండి.',
    'form.harassment.suspectLabel': 'అనుమానితుడి సంప్రదింపు వివరాలు / సోషల్ హ్యాండిల్ (తెలిస్తే)',
    'form.harassment.suspectPlaceholder': 'ఉదా: ఫోన్ నంబర్ లేదా యూజర్‌నేమ్',
    'form.harassment.continueProof': 'ఆధారాలను జతచేయడానికి కొనసాగించండి',
    'form.harassment.uploadProofTitle': 'చాట్ స్క్రీన్‌షాట్లు మరియు ఆధారాలను జతచేయండి',
    'form.harassment.uploadProofSubtitle': 'బెదిరింపు సందేశాలు లేదా కాల్ లాగ్‌ల స్క్రీన్‌షాట్‌లను అప్‌లోడ్ చేయండి.',
    'form.harassment.submitBtn': 'నివేదికను సమర్పించండి',
    'form.harassment.submitting': 'నివేదిక నమోదు చేయబడుతోంది...',
    'form.harassment.successTitle': 'ఫిర్యాదు నమోదైంది',
    'form.harassment.trackTimeline': 'ఫిర్యాదు కాలక్రమాన్ని ట్రాక్ చేయండి',

    // Account Hacked Form
    'form.hacked.triageBadge': 'తక్షణ భద్రత: ముందుగా మీ ఖాతాను రక్షించుకోండి',
    'form.hacked.title': 'ఖాతా లేదా పరికరం హ్యాక్ చేయబడింది',
    'form.hacked.subtitle': 'అధికారిక ఫిర్యాదు చేయడానికి ముందు దుర్వినియోగాన్ని ఆపడానికి ఈ చర్యలు తీసుకోండి.',
    'form.hacked.proceedBtn': 'సంఘటనను నివేదించడానికి కొనసాగించండి',

    // Anonymous Report Form
    'form.anonymous.badge': 'గోప్య సమాచార స్వీకరణ',
    'form.anonymous.title': 'అనామకంగా నివేదించండి',
    'form.anonymous.subtitle': 'మీ వ్యక్తిగత గుర్తింపును వెల్లడించకుండా అనుమానాస్పద నేర సమాచారాన్ని పంచుకోండి.',
    'form.anonymous.titleLabel': 'విషయం / సారాంశం',
    'form.anonymous.detailsLabel': 'వివరణాత్మక సమాచారం మరియు ఆధారాల లింకులు',
    'form.anonymous.submitBtn': 'అనామక సమాచారాన్ని సమర్పించండి',
  },

  pa: {
    // Header & Navigation
    'nav.home': 'ਮੁੱਖ ਪੰਨਾ',
    'nav.track': 'ਸ਼ਿਕਾਇਤ ਟ੍ਰੈਕ ਕਰੋ',
    'nav.verify': 'ਜਾਂਚ ਕਰੋ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰੋ',
    'nav.help': 'ਮਦਦ ਲਵੋ',
    'nav.volunteer': 'ਵਲੰਟੀਅਰ',
    'header.govTitle': 'ਭਾਰਤ ਸਰਕਾਰ',
    'header.ministry': 'ਗ੍ਰਹਿ ਮੰਤਰਾਲਾ • ਭਾਰਤੀ ਸਾਈਬਰ ਕ੍ਰਾਈਮ ਕੋਆਰਡੀਨੇਸ਼ਨ ਸੈਂਟਰ (I4C)',
    'header.portalTitle': 'ਰਾਸ਼ਟਰੀ ਸਾਈਬਰ ਕ੍ਰਾਈਮ ਰਿਪੋਰਟਿੰਗ ਪੋਰਟਲ',
    'header.portalSubtitle': 'ਗ੍ਰਹਿ ਮੰਤਰਾਲਾ • ਭਾਰਤ ਸਰਕਾਰ',
    'header.helpline': 'ਹੈਲਪਲਾਈਨ: 1930',
    'header.goldenHourHelpline': 'ਗੋਲਡਨ ਆਵਰ ਹੈਲਪਲਾਈਨ: 1930',
    'header.login': 'ਨਾਗਰਿਕ ਲੌਗਇਨ',
    'header.skipToContent': 'ਮੁੱਖ ਸਮੱਗਰੀ ਤੇ ਜਾਓ',
    'header.highContrast': 'ਹਾਈ ਕੰਟ੍ਰਾਸਟ',
    'header.normalMode': 'ਸਧਾਰਨ ਮੋਡ',
    'header.searchPlaceholder': 'ਸਾਈਬਰ ਅਪਰਾਧ ਮਾਰਗਦਰਸ਼ਨ, 1930 ਹੈਲਪਲਾਈਨ ਜਾਂ ਪੁਲਿਸ ਸਟੇਸ਼ਨ ਖੋਜੋ...',
    'common.backToHome': 'ਮੁੱਖ ਪੰਨੇ ਤੇ ਵਾਪਸ ਜਾਓ',
    'common.back': 'ਪਿੱਛੇ',

    // Home Page Hero & Cards
    'home.heroBadge': 'ਸੁਰੱਖਿਅਤ ਨਾਗਰਿਕ। ਇੱਕ ਸੁਰੱਖਿਅਤ ਡਿਜੀਟਲ ਭਾਰਤ।',
    'home.howCanWeHelp': 'ਅਸੀਂ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?',
    'home.heroSubtitle': "ਸਾਨੂੰ ਦੱਸੋ ਕੀ ਹੋਇਆ। ਅਸੀਂ ਤੁਹਾਨੂੰ ਅਗਲੇ ਕਦਮਾਂ ਬਾਰੇ ਸੇਧ ਦੇਵਾਂਗੇ ਅਤੇ ਸਹੀ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗੇ।",
    'home.trackBannerTitle': 'ਪਹਿਲਾਂ ਹੀ ਕੁਝ ਰਿਪੋਰਟ ਕੀਤਾ ਹੈ?',
    'home.trackBannerSubtitle': 'ਆਪਣੀ ਸ਼ਿਕਾਇਤ ਦੀ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ ਅਤੇ ਜਾਂਚ ਅਧਿਕਾਰੀਆਂ ਤੋਂ ਰੀਅਲ-ਟਾਈਮ ਅੱਪਡੇਟ ਵੇਖੋ।',
    'home.trackNow': 'ਹੁਣੇ ਟ੍ਰੈਕ ਕਰੋ',
    'home.emergencyBadge': 'ਵਿੱਤੀ ਧੋਖਾਧੜੀ? ਤੁਰੰਤ ਕਾਰਵਾਈ ਕਰੋ।',
    'home.emergencyTitle': '1930 ਤੇ ਕਾਲ ਕਰੋ',
    'home.emergencySubtitle': 'ਸਾਈਬਰ ਵਿੱਤੀ ਧੋਖਾਧੜੀ ਦੀ ਰਿਪੋਰਟ ਕਰੋ ਅਤੇ ਤੁਰੰਤ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ।',
    'home.call1930Now': 'ਹੁਣੇ 1930 ਤੇ ਕਾਲ ਕਰੋ',
    'home.otherWaysHelp': 'ਮਦਦ ਲੈਣ ਦੇ ਹੋਰ ਤਰੀਕੇ',
    'home.findPoliceStation': 'ਮੇਰਾ ਸਾਈਬਰ ਪੁਲਿਸ ਸਟੇਸ਼ਨ ਲੱਭੋ',
    'home.bankAssistance': 'ਬੈਂਕ ਸਬੰਧੀ ਸਹਾਇਤਾ',
    'home.complaintEscalation': 'ਸ਼ਿਕਾਇਤ ਦਾ ਨਿਵਾਰਨ / ਐਸਕੇਲੇਸ਼ਨ',
    'home.officialContacts': 'ਅਧਿਕਾਰਤ ਸੰਪਰਕ',

    // Intent Cards
    'card.lostMoney.title': 'ਮੇਰੇ ਪੈਸੇ ਗੁੰਮ ਹੋ ਗਏ',
    'card.lostMoney.desc': 'ਵਿੱਤੀ ਧੋਖਾਧੜੀ ਦੀ ਰਿਪੋਰਟ ਕਰੋ ਅਤੇ ਅੱਗੇ ਕੀ ਕਰਨਾ ਹੈ ਇਸ ਬਾਰੇ ਮਾਰਗਦਰਸ਼ਨ ਲਵੋ।',
    'card.harassment.title': 'ਕੋਈ ਮੈਨੂੰ ਪ੍ਰੇਸ਼ਾਨ / ਧਮਕੀ ਦੇ ਰਿਹਾ ਹੈ',
    'card.harassment.desc': 'ਬਲੈਕਮੇਲਿੰਗ, ਜਬਰੀ ਵਸੂਲੀ, ਨਕਲੀ ਪਛਾਣ ਅਤੇ ਹੋਰ ਮਾਮਲਿਆਂ ਵਿੱਚ ਮਦਦ ਲਵੋ।',
    'card.hacked.title': 'ਮੇਰਾ ਖਾਤਾ ਜਾਂ ਡਿਵਾਈਸ ਹੈਕ ਹੋ ਗਿਆ',
    'card.hacked.desc': 'ਆਪਣਾ ਖਾਤਾ ਸੁਰੱਖਿਅਤ ਕਰੋ ਅਤੇ ਘਟਨਾ ਦੀ ਰਿਪੋਰਟ ਕਰੋ।',
    'card.anonymous.title': 'ਮੈਂ ਗੁਪਤ ਰੂਪ ਵਿੱਚ ਰਿਪੋਰਟ ਕਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ',
    'card.anonymous.desc': 'ਆਪਣੀ ਪਛਾਣ ਦੱਸੇ ਬਿਨਾਂ ਜੋ ਜਾਣਕਾਰੀ ਤੁਹਾਡੇ ਕੋਲ ਹੈ ਉਹ ਸਾਂਝੀ ਕਰੋ।',
    'card.verify.title': 'ਸ਼ੱਕੀ ਨੰਬਰ ਜਾਂ ਵੈੱਬਸਾਈਟ ਦੀ ਜਾਂਚ ਕਰੋ',
    'card.verify.desc': 'ਭਰੋਸਾ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਜਾਂਚ ਕਰੋ।',
    'card.needHelp.title': 'ਮੈਨੂੰ ਮਦਦ ਚਾਹੀਦੀ ਹੈ',
    'card.needHelp.desc': 'ਸਹੀ ਸੰਪਰਕ, ਪੁਲਿਸ ਸਟੇਸ਼ਨ ਜਾਂ ਸਹਾਇਤਾ ਸੇਵਾ ਲੱਭੋ।',

    // Financial Fraud Form
    'form.financial.badge': 'ਸਬੂਤ → ਢਾਂਚਾਗਤ ਸ਼ਿਕਾਇਤ',
    'form.financial.title': 'ਵਿੱਤੀ ਧੋਖਾਧੜੀ ਦੀ ਰਿਪੋਰਟ ਕਰੋ',
    'form.financial.subtitle': 'ਸਾਨੂੰ ਆਪਣੇ ਲੈਣ-ਦੇਣ ਬਾਰੇ ਦੱਸੋ। ਅਸੀਂ ਤੁਹਾਨੂੰ ਸਬੂਤ ਨੱਥੀ ਕਰਨ ਅਤੇ ਅੰਤਰ-ਬੈਂਕ ਫੰਡ ਰਿਕਵਰੀ ਸ਼ੁਰੂ ਕਰਨ ਵਿੱਚ ਮਾਰਗਦਰਸ਼ਨ ਦੇਵਾਂਗੇ।',
    'form.financial.step1': '1. ਘਟਨਾ ਦੇ ਵੇਰਵੇ',
    'form.financial.step2': '2. ਸਬੂਤ ਅੱਪਲੋਡ ਕਰੋ',
    'form.financial.step3': '3. ਪ੍ਰਾਪਤ ਵੇਰਵਿਆਂ ਦੀ ਸਮੀਖਿਆ',
    'form.financial.step4': '4. ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਜਮ੍ਹਾਂ ਕਰੋ',
    'form.financial.amountLabel': 'ਅੰਦਾਜ਼ਨ ਨੁਕਸਾਨ ਦੀ ਰਕਮ (₹)',
    'form.financial.dateLabel': 'ਘਟਨਾ / ਡੈਬਿਟ ਦੀ ਮਿਤੀ',
    'form.financial.paymentMethod': 'ਵਰਤਿਆ ਗਿਆ ਭੁਗਤਾਨ ਦਾ ਤਰੀਕਾ',
    'form.financial.titleLabel': 'ਸੰਖੇਪ ਘਟਨਾ ਦਾ ਸਿਰਲੇਖ',
    'form.financial.titlePlaceholder': 'ਜਿਵੇਂ ਕਿ QR ਕੋਡ ਰਾਹੀਂ ਅਣਅਧਿਕਾਰਤ UPI ਟ੍ਰਾਂਸਫਰ ਜਾਂ ਜਾਅਲੀ ਗਾਹਕ ਸੇਵਾ ਕਾਲ',
    'form.financial.narrativeLabel': 'ਕੀ ਹੋਇਆ ਸੀ? (ਸਧਾਰਨ ਭਾਸ਼ਾ ਵਿੱਚ ਵੇਰਵਾ)',
    'form.financial.narrativePlaceholder': 'ਕਿਰਪਾ ਕਰਕੇ ਦੱਸੋ ਕਿ ਧੋਖਾਧੜੀ ਕਿਵੇਂ ਹੋਈ, ਕਿਹੜਾ ਲਿੰਕ ਜਾਂ QR ਕਲਿੱਕ ਕੀਤਾ ਗਿਆ ਸੀ, ਅਤੇ ਸ਼ੱਕੀ ਮੋਬਾਈਲ ਜਾਂ UPI ID।',
    'form.financial.continueToEvidence': 'ਸਬੂਤ ਅੱਪਲੋਡ ਕਰਨ ਲਈ ਅੱਗੇ ਵਧੋ',
    'form.financial.uploadTitle': 'ਲੈਣ-ਦੇਣ ਦੇ ਸਬੂਤ ਅੱਪਲੋਡ ਕਰੋ',
    'form.financial.uploadSubtitle': 'ਟ੍ਰਾਂਜੈਕਸ਼ਨ ਰਸੀਦ, SMS ਅਲਰਟ ਜਾਂ ਬੈਂਕ ਡੈਬਿਟ ਸਟੇਟਮੈਂਟ ਦੇ ਸਕ੍ਰੀਨਸ਼ੌਟ ਅੱਪਲੋਡ ਕਰੋ। ਸਾਡਾ ਸਿਸਟਮ ਤੁਹਾਡੀ ਸਮੀਖਿਆ ਲਈ ਮੁੱਖ ਵੇਰਵੇ ਆਪਣੇ ਆਪ ਕੱਢ ਲਵੇਗਾ।',
    'form.financial.reviewExtractedTitle': 'ਸਾਨੂੰ ਇਹ ਵੇਰਵੇ ਮਿਲੇ ਹਨ',
    'form.financial.reviewExtractedSubtitle': 'ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਕੱਢੀ ਗਈ ਜਾਣਕਾਰੀ ਦੀ ਸਮੀਖਿਆ ਕਰੋ। ਤੁਸੀਂ ਜਮ੍ਹਾਂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਕਿਸੇ ਵੀ ਖੇਤਰ ਦੀ ਪੁਸ਼ਟੀ ਜਾਂ ਸੋਧ ਕਰ ਸਕਦੇ ਹੋ।',
    'form.financial.confirmCheckbox': 'ਮੈਂ ਕੱਢੇ ਗਏ ਲੈਣ-ਦੇਣ ਦੇ ਵੇਰਵਿਆਂ ਦੀ ਸਮੀਖਿਆ ਕੀਤੀ ਹੈ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹਾਂ ਕਿ ਉਹ ਧੋਖਾਧੜੀ ਵਾਲੇ ਡੈਬਿਟ ਨੂੰ ਸਹੀ ਢੰਗ ਨਾਲ ਦਰਸਾਉਂਦੇ ਹਨ।',
    'form.financial.proceedFinal': 'ਅੰਤਿਮ ਸਮੀਖਿਆ ਲਈ ਅੱਗੇ ਵਧੋ',
    'form.financial.finalReviewTitle': 'ਢਾਂਚਾਗਤ ਸ਼ਿਕਾਇਤ ਦੀ ਸਮੀਖਿਆ ਕਰੋ',
    'form.financial.finalReviewSubtitle': 'ਕਿਰਪਾ ਕਰਕੇ ਰਾਸ਼ਟਰੀ ਸਾਈਬਰ ਕ੍ਰਾਈਮ ਪੋਰਟਲ ਤੇ ਜਮ੍ਹਾਂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੀ ਸ਼ਿਕਾਇਤ ਦੇ ਸੰਖੇਪ ਦੀ ਸਮੀਖਿਆ ਕਰੋ।',
    'form.financial.submitBtn': 'ਅਧਿਕਾਰਤ ਸ਼ਿਕਾਇਤ ਜਮ੍ਹਾਂ ਕਰੋ',
    'form.financial.submitting': 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
    'form.financial.successTitle': 'ਸ਼ਿਕਾਇਤ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਕੀਤੀ ਗਈ',
    'form.financial.trackBtn': 'ਮੇਰੀ ਸ਼ਿਕਾਇਤ ਟ੍ਰੈਕ ਕਰੋ',

    // Harassment Form
    'form.harassment.badge': 'ਤਰਜੀਹੀ ਰਿਪੋਰਟਿੰਗ',
    'form.harassment.title': 'ਕੋਈ ਮੈਨੂੰ ਪ੍ਰੇਸ਼ਾਨ ਜਾਂ ਧਮਕੀ ਦੇ ਰਿਹਾ ਹੈ',
    'form.harassment.subtitle': 'ਸਾਨੂੰ ਸਧਾਰਨ ਭਾਸ਼ਾ ਵਿੱਚ ਦੱਸੋ ਕੀ ਹੋਇਆ। ਤੁਸੀਂ ਚੈਟ ਸੰਦੇਸ਼ਾਂ, ਜਬਰੀ ਵਸੂਲੀ ਦੀਆਂ ਈਮੇਲਾਂ ਜਾਂ ਜਾਅਲੀ ਪ੍ਰੋਫਾਈਲਾਂ ਦੇ ਸਕ੍ਰੀਨਸ਼ੌਟ ਸਾਂਝੇ ਕਰ ਸਕਦੇ ਹੋ।',
    'form.harassment.safetyNoticeTitle': 'ਤੁਰੰਤ ਸੁਰੱਖਿਆ ਸੂਚਨਾ',
    'form.harassment.safetyNotice': 'ਜੇਕਰ ਤੁਹਾਨੂੰ ਤੁਰੰਤ ਸਰੀਰਕ ਨੁਕਸਾਨ ਜਾਂ ਜਾਨਲੇਵਾ ਧਮਕੀ ਦਾ ਸਾਹਮਣਾ ਕਰਨਾ ਪੈ ਰਿਹਾ ਹੈ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ 112 ਤੇ ਪੁਲਿਸ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।',
    'form.harassment.platformLabel': 'ਵਰਤਿਆ ਗਿਆ ਪਲੇਟਫਾਰਮ ਜਾਂ ਐਪ',
    'form.harassment.platformPlaceholder': 'ਜਿਵੇਂ ਕਿ WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'ਸੰਖੇਪ ਸਾਰ / ਸਿਰਲੇਖ',
    'form.harassment.titlePlaceholder': 'ਜਿਵੇਂ ਕਿ ਅਣਜਾਣ ਕਾਲਰ ਤੋਂ WhatsApp ਤੇ ਬਲੈਕਮੇਲ ਸੁਨੇਹੇ',
    'form.harassment.narrativeLabel': 'ਸਾਨੂੰ ਦੱਸੋ ਕੀ ਹੋਇਆ',
    'form.harassment.narrativePlaceholder': 'ਸੁਨੇਹਿਆਂ ਦੀ ਕਿਸਮ, ਕੀ ਮੰਗਾਂ ਕੀਤੀਆਂ ਗਈਆਂ ਸਨ ਅਤੇ ਕੋਈ ਮਿਤੀ/ਸਮਾਂ ਦੱਸੋ।',
    'form.harassment.suspectLabel': 'ਸ਼ੱਕੀ ਸੰਪਰਕ ਵੇਰਵੇ / ਸੋਸ਼ਲ ਹੈਂਡਲ (ਜੇ ਪਤਾ ਹੋਵੇ)',
    'form.harassment.suspectPlaceholder': 'ਜਿਵੇਂ ਕਿ ਫ਼ੋਨ ਨੰਬਰ +91-9870001122 ਜਾਂ ਉਪਭੋਗਤਾ ਨਾਮ @fake_profile',
    'form.harassment.continueProof': 'ਸਬੂਤ ਨੱਥੀ ਕਰਨ ਲਈ ਅੱਗੇ ਵਧੋ',
    'form.harassment.uploadProofTitle': 'ਚੈਟ ਸਕ੍ਰੀਨਸ਼ੌਟ ਅਤੇ ਸਬੂਤ ਨੱਥੀ ਕਰੋ',
    'form.harassment.uploadProofSubtitle': 'ਧਮਕੀ ਭਰੇ ਸੁਨੇਹਿਆਂ, ਕਾਲ ਲੌਗਸ ਜਾਂ URL ਦੇ ਸਕ੍ਰੀਨਸ਼ੌਟ ਅੱਪਲੋਡ ਕਰੋ।',
    'form.harassment.submitBtn': 'ਰਿਪੋਰਟ ਜਮ੍ਹਾਂ ਕਰੋ',
    'form.harassment.submitting': 'ਰਿਪੋਰਟ ਦਰਜ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
    'form.harassment.successTitle': 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕੀਤੀ ਗਈ',
    'form.harassment.trackTimeline': 'ਸ਼ਿਕਾਇਤ ਟਾਈਮਲਾਈਨ ਟ੍ਰੈਕ ਕਰੋ',

    // Account Hacked Form
    'form.hacked.triageBadge': 'ਤੁਰੰਤ ਕਾਰਵਾਈ: ਪਹਿਲਾਂ ਆਪਣਾ ਖਾਤਾ ਸੁਰੱਖਿਅਤ ਕਰੋ',
    'form.hacked.title': 'ਖਾਤਾ ਜਾਂ ਡਿਵਾਈਸ ਹੈਕ ਹੋ ਗਿਆ',
    'form.hacked.subtitle': 'ਰਸਮੀ ਸਾਈਬਰ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, ਅਣਅਧਿਕਾਰਤ ਦੁਰਵਰਤੋਂ ਨੂੰ ਰੋਕਣ ਲਈ ਇਹ ਤੁਰੰਤ ਕਦਮ ਚੁੱਕੋ।',
    'form.hacked.proceedBtn': 'ਘਟਨਾ ਦੀ ਰਿਪੋਰਟ ਕਰਨ ਲਈ ਅੱਗੇ ਵਧੋ',

    // Anonymous Report Form
    'form.anonymous.badge': 'ਗੁਪਤ ਜਾਣਕਾਰੀ ਸਵੀਕਾਰਤਾ',
    'form.anonymous.title': 'ਗੁਪਤ ਰੂਪ ਵਿੱਚ ਰਿਪੋਰਟ ਕਰੋ',
    'form.anonymous.subtitle': 'ਆਪਣੀ ਨਿੱਜੀ ਪਛਾਣ ਦੱਸੇ ਬਿਨਾਂ ਸ਼ੱਕੀ ਸਾਈਬਰ ਗਤੀਵਿਧੀ ਜਾਂ ਰਾਸ਼ਟਰੀ ਖਤਰੇ ਦੀ ਜਾਣਕਾਰੀ ਸਾਂਝੀ ਕਰੋ।',
    'form.anonymous.categoryLabel': 'ਅਪਰਾਧ ਸ਼੍ਰੇਣੀ',
    'form.anonymous.titleLabel': 'ਵਿਸ਼ਾ / ਸੰਖੇਪ',
    'form.anonymous.detailsLabel': 'ਵਿਸਤ੍ਰਿਤ ਜਾਣਕਾਰੀ ਅਤੇ ਸਬੂਤ ਲਿੰਕ',
    'form.anonymous.submitBtn': 'ਗੁਪਤ ਜਾਣਕਾਰੀ ਜਮ੍ਹਾਂ ਕਰੋ',
  },

  or: {
    // Header & Navigation
    'nav.home': 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    'nav.track': 'ଅଭିଯୋଗ ଟ୍ରାକ୍ କରନ୍ତୁ',
    'nav.verify': 'ଯାଞ୍ଚ ଏବଂ ଯାଞ୍ଚ କରନ୍ତୁ',
    'nav.help': 'ସହାୟତା ପାଆନ୍ତୁ',
    'nav.volunteer': 'ସ୍ୱେଚ୍ଛାସେବୀ',
    'header.govTitle': 'ଭାରତ ସରକାର',
    'header.ministry': 'ଗୃହ ମନ୍ତ୍ରଣାଳୟ • ଭାରତୀୟ ସାଇବର ଅପରାଧ ସମନ୍ୱୟ କେନ୍ଦ୍ର (I4C)',
    'header.portalTitle': 'ଜାତୀୟ ସାଇବର କ୍ରାଇମ୍ ରିପୋର୍ଟିଂ ପୋର୍ଟାଲ୍',
    'header.portalSubtitle': 'ଗୃହ ମନ୍ତ୍ରଣାଳୟ • ଭାରତ ସରକାର',
    'header.helpline': 'ହେଲ୍ପଲାଇନ୍: 1930',
    'header.goldenHourHelpline': 'ଗୋଲ୍ଡେନ୍ ଆୱାର୍ ହେଲ୍ପଲାଇନ୍: 1930',
    'header.login': 'ନାଗରିକ ଲଗଇନ୍',
    'header.skipToContent': 'ମୁଖ୍ୟ ବିଷୟବସ୍ତୁକୁ ଯାଆନ୍ତୁ',
    'header.highContrast': 'ହାଇ କଣ୍ଟ୍ରାଷ୍ଟ',
    'header.normalMode': 'ସାଧାରଣ ମୋଡ୍',
    'header.searchPlaceholder': 'ସାଇବର କ୍ରାଇମ୍ ନିର୍ଦ୍ଦେଶାବଳୀ, 1930 ହେଲ୍ପଲାଇନ୍ କିମ୍ବା ପୋଲିସ୍ ଷ୍ଟେସନ୍ ସନ୍ଧାନ କରନ୍ତୁ...',
    'common.backToHome': 'ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ',
    'common.back': 'ପଛକୁ',

    // Home Page Hero & Cards
    'home.heroBadge': 'ସୁରକ୍ଷିତ ନାଗରିକ। ଏକ ସୁରକ୍ଷିତ ଡିଜିଟାଲ୍ ଭାରତ।',
    'home.howCanWeHelp': 'ଆମେ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବା?',
    'home.heroSubtitle': 'କ’ଣ ଘଟିଲା ଆମକୁ ଜଣାନ୍ତୁ। ଆମେ ଆପଣଙ୍କୁ ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପଗୁଡ଼ିକ ବିଷୟରେ ମାର୍ଗଦର୍ଶନ କରିବୁ ଏବଂ ସଠିକ୍ ସହାୟତା ପାଇବାରେ ସାହାଯ୍ୟ କରିବୁ।',
    'home.trackBannerTitle': 'ପୂର୍ବରୁ କିଛି ଅଭିଯୋଗ କରିଛନ୍ତି କି?',
    'home.trackBannerSubtitle': 'ଆପଣଙ୍କ ଅଭିଯୋଗର ସ୍ଥିତି ଟ୍ରାକ୍ କରନ୍ତୁ ଏବଂ ତଦନ୍ତକାରୀ ଅଧିକାରୀଙ୍କ ଠାରୁ ରିଅଲ୍-ଟାଇମ୍ ଅପଡେଟ୍ ଦେଖନ୍ତୁ।',
    'home.trackNow': 'ବର୍ତ୍ତମାନ ଟ୍ରାକ୍ କରନ୍ତୁ',
    'home.emergencyBadge': 'ଆର୍ଥିକ ଠକେଇ? ତୁରନ୍ତ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ଗ୍ରହଣ କରନ୍ତୁ।',
    'home.emergencyTitle': '1930 କୁ କଲ୍ କରନ୍ତୁ',
    'home.emergencySubtitle': 'ସାଇବର ଆର୍ଥିକ ଠକେଇର ଅଭିଯୋଗ କରନ୍ତୁ ଏବଂ ତୁରନ୍ତ ସହାୟତା ପାଆନ୍ତୁ।',
    'home.call1930Now': 'ବର୍ତ୍ତମାନ 1930 କୁ କଲ୍ କରନ୍ତୁ',
    'home.otherWaysHelp': 'ସହାୟତା ପାଇବା ପାଇଁ ଅନ୍ୟାନ୍ୟ ଉପାୟ',
    'home.findPoliceStation': 'ମୋର ସାଇବର ପୋଲିସ୍ ଷ୍ଟେସନ୍ ଖୋଜନ୍ତୁ',
    'home.bankAssistance': 'ବ୍ୟାଙ୍କ ସମ୍ବନ୍ଧୀୟ ସହାୟତା',
    'home.complaintEscalation': 'ଅଭିଯୋଗ ନିବାରଣ / ଏସ୍କାଲେସନ୍',
    'home.officialContacts': 'ସରକାରୀ ଯୋଗାଯୋଗ',

    // Intent Cards
    'card.lostMoney.title': 'ମୋର ଟଙ୍କା ଚାଲିଗଲା',
    'card.lostMoney.desc': 'ଆର୍ଥିକ ଠକେଇର ରିପୋର୍ଟ କରନ୍ତୁ ଏବଂ ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ ବିଷୟରେ ମାର୍ଗଦର୍ଶନ ପାଆନ୍ତୁ।',
    'card.harassment.title': 'କେହି ମୋତେ ହଇରାଣ / ଧମକ ଦେଉଛନ୍ତି',
    'card.harassment.desc': 'ବ୍ଲାକମେଲ୍, ବଟି ଆଦାୟ, ନକଲି ପ୍ରୋଫାଇଲ୍ ଏବଂ ଅନ୍ୟାନ୍ୟ ସମସ୍ୟାରେ ସହାୟତା ପାଆନ୍ତୁ।',
    'card.hacked.title': 'ମୋର ଆକାଉଣ୍ଟ କିମ୍ବା ଡିଭାଇସ୍ ହ୍ୟାକ୍ ହୋଇଛି',
    'card.hacked.desc': 'ଆପଣଙ୍କ ଆକାଉଣ୍ଟ୍ ସୁରକ୍ଷିତ କରନ୍ତୁ ଏବଂ ଘଟଣାର ଅଭିଯୋଗ କରନ୍ତୁ।',
    'card.anonymous.title': 'ମୁଁ ଅଜ୍ଞାତ ଭାବରେ ଅଭିଯୋଗ କରିବାକୁ ଚାହୁଁଛି',
    'card.anonymous.desc': 'ଆପଣଙ୍କ ପରିଚୟ ପ୍ରକାଶ ନକରି ଆପଣ ଜାଣିଥିବା ତଥ୍ୟ ସେୟାର କରନ୍ତୁ।',
    'card.verify.title': 'ସନ୍ଦେହଜନକ ନମ୍ବର କିମ୍ବା ୱେବସାଇଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ',
    'card.verify.desc': 'ବିଶ୍ୱାସ କରିବା ପୂର୍ବରୁ ଯାଞ୍ଚ କରନ୍ତୁ।',
    'card.needHelp.title': 'ମୋତେ ସାହାଯ୍ୟ ଦରକାର',
    'card.needHelp.desc': 'ସଠିକ୍ ଯୋଗାଯୋଗ, ପୋଲିସ୍ ଷ୍ଟେସନ୍ କିମ୍ବା ସହାୟତା ସେବା ଖୋଜନ୍ତୁ।',

    // Financial Fraud Form
    'form.financial.badge': 'ପ୍ରମାଣ → ସଂରଚିତ ଅଭିଯୋଗ',
    'form.financial.title': 'ଆର୍ଥିକ ଠକେଇର ରିପୋର୍ଟ କରନ୍ତୁ',
    'form.financial.subtitle': 'ଆପଣଙ୍କ କାରବାର ସହିତ କ’ଣ ଘଟିଲା ଆମକୁ ଜଣାନ୍ତୁ। ପ୍ରମାଣ ସଂଲଗ୍ନ କରିବା ଏବଂ ଆନ୍ତଃ-ବ୍ୟାଙ୍କ ପାଣ୍ଠି ପୁନରୁଦ୍ଧାର ଆରମ୍ଭ କରିବାରେ ଆମେ ଆପଣଙ୍କୁ ମାର୍ଗଦର୍ଶନ କରିବୁ।',
    'form.financial.step1': '1. ଘଟଣାର ବିବରଣୀ',
    'form.financial.step2': '2. ପ୍ରମାଣ ଅପଲୋଡ୍ କରନ୍ତୁ',
    'form.financial.step3': '3. ସଂଗୃହିତ ତଥ୍ୟର ସମୀକ୍ଷା',
    'form.financial.step4': '4. ନିଶ୍ଚିତ କରନ୍ତୁ ଏବଂ ଦାଖଲ କରନ୍ତୁ',
    'form.financial.amountLabel': 'ଆନୁମାନିକ କ୍ଷତି ପରିମାଣ (₹)',
    'form.financial.dateLabel': 'ଘଟଣା / ଡେବିଟ୍ ତାରିଖ',
    'form.financial.paymentMethod': 'ବ୍ୟବହୃତ ଦେୟ ପଦ୍ଧତି',
    'form.financial.titleLabel': 'ସଂକ୍ଷିପ୍ତ ଘଟଣାର ଶୀର୍ଷକ',
    'form.financial.titlePlaceholder': 'ଯଥା: QR କୋଡ୍ ମାଧ୍ୟମରେ ଅନଧିକୃତ UPI ସ୍ଥାନାନ୍ତର କିମ୍ବା ନକଲି ଗ୍ରାହକ ସେବା କଲ୍',
    'form.financial.narrativeLabel': 'କ’ଣ ଘଟିଥିଲା? (ସରଳ ଭାଷାରେ ବର୍ଣ୍ଣନା)',
    'form.financial.narrativePlaceholder': 'ଦୟାକରି ବର୍ଣ୍ଣନା କରନ୍ତୁ କିପରି ଠକେଇ ଘଟିଲା, କେଉଁ ଲିଙ୍କ୍ ବା QR କ୍ଲିକ୍ ହୋଇଥିଲା, ଏବଂ ସନ୍ଦିଗ୍ଧ ମୋବାଇଲ୍ ବା UPI ID।',
    'form.financial.continueToEvidence': 'ପ୍ରମାଣ ଅପଲୋଡ୍ କରିବାକୁ ଆଗକୁ ବଢ଼ନ୍ତୁ',
    'form.financial.uploadTitle': 'କାରବାର ପ୍ରମାଣ ଅପଲୋଡ୍ କରନ୍ତୁ',
    'form.financial.uploadSubtitle': 'କାରବାର ରସିଦ, SMS ଆଲର୍ଟ ବା ବ୍ୟାଙ୍କ ଡେବିଟ୍ ଷ୍ଟେଟମେଣ୍ଟର ସ୍କ୍ରିନସଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ। ଆମର ସ୍ୱୟଂଚାଳିତ ପ୍ରଣାଳୀ ଆପଣଙ୍କ ସମୀକ୍ଷା ପାଇଁ ମୁଖ୍ୟ ବିବରଣୀ ସଂଗ୍ରହ କରିବ।',
    'form.financial.reviewExtractedTitle': 'ଆମକୁ ଏହି ବିବରଣୀଗୁଡ଼ିକ ମିଳିଛି',
    'form.financial.reviewExtractedSubtitle': 'ଦୟାକରି ତଳେ ଥିବା ସୂଚନା ସମୀକ୍ଷା କରନ୍ତୁ। ଦାଖଲ କରିବା ପୂର୍ବରୁ ଆପଣ ଯେକୌଣସି କ୍ଷେତ୍ର ନିଶ୍ଚିତ ବା ସଂଶୋଧନ କରିପାରିବେ।',
    'form.financial.confirmCheckbox': 'ମୁଁ ସଂଗୃହିତ କାରବାର ବିବରଣୀ ସମୀକ୍ଷା କରିଛି ଏବଂ ନିଶ୍ଚିତ କରୁଛି ଯେ ଏହା ଠକେଇ ଡେବିଟ୍କୁ ସଠିକ୍ ଭାବରେ ପ୍ରତିଫଳିତ କରେ।',
    'form.financial.proceedFinal': 'ଅନ୍ତିମ ସମୀକ୍ଷାକୁ ଆଗକୁ ବଢ଼ନ୍ତୁ',
    'form.financial.finalReviewTitle': 'ସଂରଚିତ ଅଭିଯୋଗ ସମୀକ୍ଷା କରନ୍ତୁ',
    'form.financial.finalReviewSubtitle': 'ଜାତୀୟ ସାଇବର କ୍ରାଇମ୍ ପୋର୍ଟାଲରେ ଦାଖଲ କରିବା ପୂର୍ବରୁ ଦୟାକରି ଆପଣଙ୍କ ଅଭିଯୋଗ ସାରାଂଶ ସମୀକ୍ଷା କରନ୍ତୁ।',
    'form.financial.submitBtn': 'ଅଫିସିଆଲ୍ ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ',
    'form.financial.submitting': 'ଅଭିଯୋଗ ପଞ୍ଜିକୃତ ହେଉଛି...',
    'form.financial.successTitle': 'ଅଭିଯୋଗ ସଫଳତାର ସହିତ ପଞ୍ଜିକୃତ ହେଲା',
    'form.financial.trackBtn': 'ମୋର ଅଭିଯୋଗ ଟ୍ରାକ୍ କରନ୍ତୁ',

    // Harassment Form
    'form.harassment.badge': 'ପ୍ରାଥମିକତା ରିପୋର୍ଟିଂ',
    'form.harassment.title': 'କେହି ମୋତେ ହଇରାଣ ବା ଧମକ ଦେଉଛନ୍ତି',
    'form.harassment.subtitle': 'କ’ଣ ଘଟିଲା ସରଳ ଭାଷାରେ କୁହନ୍ତୁ। ଆପଣ ଚାଟ୍ ସନ୍ଦେଶ, ବଟି ଆଦାୟ ଇମେଲ୍ ବା ନକଲି ପ୍ରୋଫାଇଲ୍ ସ୍କ୍ରିନସଟ୍ ସେୟାର କରିପାରିବେ।',
    'form.harassment.safetyNoticeTitle': 'ଜରୁରୀ ସୁରକ୍ଷା ସୂଚନା',
    'form.harassment.safetyNotice': 'ଯଦି ଆପଣ ତୁରନ୍ତ ଶାରୀରିକ କ୍ଷତି ବା ଜୀବନ ପ୍ରତି ବିପଦର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି, ଦୟାକରି ତୁରନ୍ତ 112 ରେ ପୋଲିସକୁ କଲ୍ କରନ୍ତୁ।',
    'form.harassment.platformLabel': 'ଜଡ଼ିତ ପ୍ଲାଟଫର୍ମ ବା ଆପ୍',
    'form.harassment.platformPlaceholder': 'ଯଥା: WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'ସଂକ୍ଷିପ୍ତ ସାରାଂଶ / ଶୀର୍ଷକ',
    'form.harassment.titlePlaceholder': 'ଯଥା: ଅଜଣା କଲର୍ ଠାରୁ WhatsApp ରେ ବ୍ଲାକମେଲ୍ ସନ୍ଦେଶ',
    'form.harassment.narrativeLabel': 'କ’ଣ ଘଟିଲା ଆମକୁ ଜଣାନ୍ତୁ',
    'form.harassment.narrativePlaceholder': 'ସନ୍ଦେଶର ପ୍ରକୃତି, କ’ଣ ଦାବି କରାଯାଇଥିଲା ଏବଂ କୌଣସି ତାରିଖ/ସମୟ ବର୍ଣ୍ଣନା କରନ୍ତୁ।',
    'form.harassment.suspectLabel': 'ସନ୍ଦିଗ୍ଧ ବ୍ୟକ୍ତିଙ୍କ ଯୋଗାଯୋଗ ବିବରଣୀ / ସୋସିଆଲ୍ ହ୍ୟାଣ୍ଡେଲ୍ (ଯଦି ଜଣାଥାଏ)',
    'form.harassment.suspectPlaceholder': 'ଯଥା: ଫୋନ୍ ନମ୍ବର +91-9870001122 କିମ୍ବା ୟୁଜରନେମ୍ @fake_profile',
    'form.harassment.continueProof': 'ପ୍ରମାଣ ସଂଲଗ୍ନ କରିବାକୁ ଆଗକୁ ବଢ଼ନ୍ତୁ',
    'form.harassment.uploadProofTitle': 'ଚାଟ୍ ସ୍କ୍ରିନସଟ୍ ଏବଂ ପ୍ରମାଣ ସଂଲଗ୍ନ କରନ୍ତୁ',
    'form.harassment.uploadProofSubtitle': 'ଧମକପୂର୍ଣ୍ଣ ସନ୍ଦେଶ, କଲ୍ ଲଗ୍ ବା URL ର ସ୍କ୍ରିନସଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ।',
    'form.harassment.submitBtn': 'ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ',
    'form.harassment.submitting': 'ଅଭିଯୋଗ ପଞ୍ଜିକୃତ ହେଉଛି...',
    'form.harassment.successTitle': 'ଅଭିଯୋଗ ପଞ୍ଜିକୃତ ହେଲା',
    'form.harassment.trackTimeline': 'ଅଭିଯୋଗ ଟାଇମଲାଇନ୍ ଟ୍ରାକ୍ କରନ୍ତୁ',

    // Account Hacked Form
    'form.hacked.triageBadge': 'ତୁରନ୍ତ ପଦକ୍ଷେପ: ପ୍ରଥମେ ଆପଣଙ୍କ ଆକାଉଣ୍ଟ୍ ସୁରକ୍ଷିତ କରନ୍ତୁ',
    'form.hacked.title': 'ଆକାଉଣ୍ଟ୍ କିମ୍ବା ଡିଭାଇସ୍ ହ୍ୟାକ୍ ହୋଇଛି',
    'form.hacked.subtitle': 'ଔପଚାରିକ ସାଇବର ଅଭିଯୋଗ କରିବା ପୂର୍ବରୁ ଅନଧିକୃତ ଦୁରୁପଯୋଗ ରୋକିବାକୁ ଏହି ତୁରନ୍ତ ପଦକ୍ଷେପ ନିଅନ୍ତୁ।',
    'form.hacked.proceedBtn': 'ଘଟଣା ଅଭିଯୋଗ କରିବାକୁ ଆଗକୁ ବଢ଼ନ୍ତୁ',

    // Anonymous Report Form
    'form.anonymous.badge': 'ଗୋପନୀୟ ସୂଚନା ଗ୍ରହଣ',
    'form.anonymous.title': 'ଅଜ୍ଞାତ ଭାବରେ ଅଭିଯୋଗ କରନ୍ତୁ',
    'form.anonymous.subtitle': 'ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ପରିଚୟ ପ୍ରକାଶ ନକରି ସନ୍ଦେହଜନକ ସାଇବର କାର୍ଯ୍ୟକଳାପ ବା ଜାତୀୟ ବିପଦ ସୂଚନା ସେୟାର କରନ୍ତୁ।',
    'form.anonymous.categoryLabel': 'ଅପରାଧ ବର୍ଗ',
    'form.anonymous.titleLabel': 'ବିଷୟ / ସାରାଂଶ',
    'form.anonymous.detailsLabel': 'ବିସ୍ତୃତ ସୂଚନା ଏବଂ ପ୍ରମାଣ ଲିଙ୍କ୍',
    'form.anonymous.submitBtn': 'ଅଜ୍ଞାତ ସୂଚନା ଦାଖଲ କରନ୍ତୁ',
  },

  gu: {
    // Header & Navigation
    'nav.home': 'મુખ્ય પૃષ્ઠ',
    'nav.track': 'ફરિયાદ ટ્રેક કરો',
    'nav.verify': 'ચકાસો અને પુષ્ટિ કરો',
    'nav.help': 'સહાય મેળવો',
    'nav.volunteer': 'સ્વયંસેવક',
    'header.govTitle': 'ભારત સરકાર',
    'header.ministry': 'ગૃહ મંત્રાલય • ભારતીય સાયબર ક્રાઈમ કોઓર્ડિનેશન સેન્ટર (I4C)',
    'header.portalTitle': 'રાષ્ટ્રીય સાયબર ક્રાઈમ રિપોર્ટિંગ પોર્ટલ',
    'header.portalSubtitle': 'ગૃહ મંત્રાલય • ભારત સરકાર',
    'header.helpline': 'હેલ્પલાઇન: 1930',
    'header.goldenHourHelpline': 'ગોલ્ડન અવર હેલ્પલાઇન: 1930',
    'header.login': 'નાગરિક લૉગિન',
    'header.skipToContent': 'મુખ્ય સામગ્રી પર જાઓ',
    'header.highContrast': 'હાઇ કોન્ટ્રાસ્ટ',
    'header.normalMode': 'સામાન્ય મોડ',
    'header.searchPlaceholder': 'સાયબર ક્રાઈમ માર્ગદર્શન, 1930 હેલ્પલાઇન અથવા પોલીસ સ્ટેશન શોધો...',
    'common.backToHome': 'મુખ્ય પૃષ્ઠ પર પાછા જાઓ',
    'common.back': 'પાછા',

    // Home Page Hero & Cards
    'home.heroBadge': 'સુરક્ષિત નાગરિકો. સુરક્ષિત ડિજિટલ ભારત.',
    'home.howCanWeHelp': 'અમે કેવી રીતે મદદ કરી શકીએ?',
    'home.heroSubtitle': 'શું બન્યું તે અમને જણાવો. અમે તમને આગલા પગલાંઓ અંગે માર્ગદર્શન આપીશું અને યોગ્ય સહાય મેળવવામાં મદદ કરીશું.',
    'home.trackBannerTitle': 'પહેલેથી જ કંઈક રિપોર્ટ કર્યું છે?',
    'home.trackBannerSubtitle': 'તમારી ફરિયાદની સ્થિતિ ટ્રૅક કરો અને તપાસ અધિકારીઓ પાસેથી વાસ્તવિક સમયના અપડેટ્સ જુઓ.',
    'home.trackNow': 'હમણાં ટ્રેક કરો',
    'home.emergencyBadge': 'નાણાકીય છેતરપિંડી? તાત્કાલિક પગલાં લો.',
    'home.emergencyTitle': '1930 પર કૉલ કરો',
    'home.emergencySubtitle': 'સાયબર નાણાકીય છેતરપિંડીની જાણ કરો અને તાત્કાલિક સહાય મેળવો.',
    'home.call1930Now': 'હમણાં 1930 પર કૉલ કરો',
    'home.otherWaysHelp': 'મદદ મેળવવાની અન્ય રીતો',
    'home.findPoliceStation': 'મારું સાયબર પોલીસ સ્ટેશન શોધો',
    'home.bankAssistance': 'બેંક સંબંધિત સહાય',
    'home.complaintEscalation': 'ફરિયાદ નિવારણ / એસ્કેલેશન',
    'home.officialContacts': 'સત્તાવાર સંપર્કો',

    // Intent Cards
    'card.lostMoney.title': 'મેં પૈસા ગુમાવ્યા છે',
    'card.lostMoney.desc': 'નાણાકીય છેતરપિંડીની જાણ કરો અને આગળ શું કરવું તેનું માર્ગદર્શન મેળવો.',
    'card.harassment.title': 'કોઈ મને હેરાન / ધમકી આપી રહ્યું છે',
    'card.harassment.desc': 'બ્લેકમેઇલ, ખંડણી, નકલી પ્રોફાઇલ અને અન્ય સમસ્યાઓમાં સહાય મેળવો.',
    'card.hacked.title': 'મારું એકાઉન્ટ અથવા ડિવાઇસ હેક થયું છે',
    'card.hacked.desc': 'તમારું એકાઉન્ટ સુરક્ષિત કરો અને ઘટનાની જાણ કરો.',
    'card.anonymous.title': 'હું અનામી રીતે રિપોર્ટ કરવા માંગુ છું',
    'card.anonymous.desc': 'તમારી ઓળખ જાહેર કર્યા વિના માહિતી શેર કરો.',
    'card.verify.title': 'શંકાસ્પદ નંબર અથવા વેબસાઇટ તપાસો',
    'card.verify.desc': 'વિશ્વાસ કરતા પહેલા ચકાસો.',
    'card.needHelp.title': 'મને મદદની જરૂર છે',
    'card.needHelp.desc': 'યોગ્ય સંપર્ક, પોલીસ સ્ટેશન અથવા સહાય સેવા શોધો.',

    // Financial Fraud Form
    'form.financial.badge': 'પુરાવા → સંરચિત ફરિયાદ',
    'form.financial.title': 'નાણાકીય છેતરપિંડીની જાણ કરો',
    'form.financial.subtitle': 'તમારા વ્યવહાર વિશે અમને જણાવો. અમે પુરાવા જોડવા અને બેંક ફંડ પુનઃપ્રાપ્તિ શરૂ કરવામાં મદદ કરીશું.',
    'form.financial.step1': '1. ઘટનાની વિગતો',
    'form.financial.step2': '2. પુરાવા અપલોડ કરો',
    'form.financial.step3': '3. વિગતોની સમીક્ષા',
    'form.financial.step4': '4. પુષ્ટિ કરો અને સબમિટ કરો',
    'form.financial.amountLabel': 'અંદાજિત નુકસાનની રકમ (₹)',
    'form.financial.dateLabel': 'ઘટના / ડેબિટની તારીખ',
    'form.financial.paymentMethod': 'ચુકવણી પદ્ધતિ',
    'form.financial.titleLabel': 'સંક્ષિપ્ત ઘટના શીર્ષક',
    'form.financial.titlePlaceholder': 'દા.ત. QR કોડ અથવા નકલી કૉલ દ્વારા અનધિકૃત UPI ટ્રાન્સફર',
    'form.financial.narrativeLabel': 'શું બન્યું હતું? (સરળ ભાષામાં વર્ણન)',
    'form.financial.narrativePlaceholder': 'છેતરપિંડી કેવી રીતે થઈ, કઈ લિંક કે QR ક્લિક થઈ તે વિગતવાર જણાવો.',
    'form.financial.continueToEvidence': 'પુરાવા અપલોડ કરવા આગળ વધો',
    'form.financial.uploadTitle': 'વ્યવહારના પુરાવા અપલોડ કરો',
    'form.financial.uploadSubtitle': 'રસીદના સ્ક્રીનશોટ, SMS ચેતવણીઓ અથવા બેંક સ્ટેટમેન્ટ અપલોડ કરો.',
    'form.financial.reviewExtractedTitle': 'અમને આ વિગતો મળી છે',
    'form.financial.reviewExtractedSubtitle': 'કૃપા કરીને નીચે આપેલી માહિતી તપાસો. સબમિટ કરતા પહેલા સુધારી શકો છો.',
    'form.financial.confirmCheckbox': 'મેં વિગતોની સમીક્ષા કરી છે અને પુષ્ટિ કરું છું કે તે સચોટ છે.',
    'form.financial.proceedFinal': 'અંતિમ સમીક્ષા માટે આગળ વધો',
    'form.financial.finalReviewTitle': 'ફરિયાદની સમીક્ષા કરો',
    'form.financial.finalReviewSubtitle': 'રાષ્ટ્રીય પોર્ટલ પર સબમિટ કરતા પહેલા સારાંશ તપાસો.',
    'form.financial.submitBtn': 'સત્તાવાર ફરિયાદ સબમિટ કરો',
    'form.financial.submitting': 'ફરિયાદ નોંધાઈ રહી છે...',
    'form.financial.successTitle': 'ફરિયાદ સફળતાપૂર્વક નોંધાઈ',
    'form.financial.trackBtn': 'મારી ફરિયાદ ટ્રેક કરો',

    // Harassment Form
    'form.harassment.badge': 'પ્રાથમિકતા રિપોર્ટિંગ',
    'form.harassment.title': 'કોઈ મને હેરાન કે ધમકી આપી રહ્યું છે',
    'form.harassment.subtitle': 'સરળ ભાષામાં જણાવો. તમે ચેટ સ્ક્રીનશોટ કે નકલી પ્રોફાઇલ શેર કરી શકો છો.',
    'form.harassment.safetyNoticeTitle': 'તાત્કાલિક સુરક્ષા સૂચના',
    'form.harassment.safetyNotice': 'જો તમને શારીરિક નુકસાન કે જીવનું જોખમ હોય, તો તાત્કાલિક 112 પર કૉલ કરો.',
    'form.harassment.platformLabel': 'સંકળાયેલ પ્લેટફોર્મ અથવા એપ્લિકેશન',
    'form.harassment.platformPlaceholder': 'દા.ત. WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'સંક્ષિપ્ત સારાંશ / શીર્ષક',
    'form.harassment.titlePlaceholder': 'દા.ત. અજાણ્યા નંબર પરથી WhatsApp પર બ્લેકમેઇલ મેસેજ',
    'form.harassment.narrativeLabel': 'શું થયું તે અમને જણાવો',
    'form.harassment.narrativePlaceholder': 'સંદેશાઓનું સ્વરૂપ અને માંગણીઓ વર્ણવો.',
    'form.harassment.suspectLabel': 'શંકાસ્પદ સંપર્ક વિગતો / સોશિયલ હેન્ડલ',
    'form.harassment.suspectPlaceholder': 'દા.ત. ફોન નંબર અથવા વપરાશકર્તા નામ',
    'form.harassment.continueProof': 'પુરાવા જોડવા આગળ વધો',
    'form.harassment.uploadProofTitle': 'ચેટ સ્ક્રીનશોટ અને પુરાવા જોડો',
    'form.harassment.uploadProofSubtitle': 'ધમકીભર્યા સંદેશાઓ અથવા કૉલ લૉગ્સના સ્ક્રીનશોટ અપલોડ કરો.',
    'form.harassment.submitBtn': 'રિપોર્ટ સબમિટ કરો',
    'form.harassment.submitting': 'રિપોર્ટ નોંધાઈ રહ્યો છે...',
    'form.harassment.successTitle': 'ફરિયાદ નોંધાઈ ગઈ',
    'form.harassment.trackTimeline': 'ફરિયાદ સમયરેખા ટ્રેક કરો',

    // Account Hacked Form
    'form.hacked.triageBadge': 'તાત્કાલિક સુરક્ષા: પ્રથમ તમારું એકાઉન્ટ સુરક્ષિત કરો',
    'form.hacked.title': 'એકાઉન્ટ અથવા ડિવાઇસ હેક થયું છે',
    'form.hacked.subtitle': 'દુરુપયોગ રોકવા માટે તાત્કાલિક આ પગલાં લો.',
    'form.hacked.proceedBtn': 'ઘટનાની જાણ કરવા આગળ વધો',

    // Anonymous Report Form
    'form.anonymous.badge': 'ગુપ્ત માહિતી ઇન્ટેક',
    'form.anonymous.title': 'અનામી રીતે રિપોર્ટ કરો',
    'form.anonymous.subtitle': 'ઓળખ જાહેર કર્યા વિના શંકાસ્પદ સાયબર પ્રવૃત્તિની માહિતી શેર કરો.',
    'form.anonymous.categoryLabel': 'ગુના શ્રેણી',
    'form.anonymous.titleLabel': 'વિષય / સારાંશ',
    'form.anonymous.detailsLabel': 'વિગતવાર માહિતી અને પુરાવા લિંક્સ',
    'form.anonymous.submitBtn': 'અનામી માહિતી સબમિટ કરો',
  },

  kn: {
    // Header & Navigation
    'nav.home': 'ಮುಖಪುಟ',
    'nav.track': 'ದೂರನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    'nav.verify': 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ದೃಢೀಕರಿಸಿ',
    'nav.help': 'ಸಹಾಯ ಪಡೆಯಿರಿ',
    'nav.volunteer': 'ಸ್ವಯಂಸೇವಕ',
    'header.govTitle': 'ಭారತ ಸರ್ಕಾರ',
    'header.ministry': 'ಗೃಹ ಸಚಿವಾಲಯ • ಭಾರತೀಯ ಸೈಬರ್ ಅಪರಾಧ ಸಮನ್ವಯ ಕೇಂದ್ರ (I4C)',
    'header.portalTitle': 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ವರದಿ ಪೋರ್ಟಲ್',
    'header.portalSubtitle': 'ಗೃಹ ಸಚಿವಾಲಯ • ಭಾರತ ಸರ್ಕಾರ',
    'header.helpline': 'ಹೆಲ್ಪ್‌ಲೈನ್: 1930',
    'header.goldenHourHelpline': 'ಗೋಲ್ಡನ್ ಅವರ್ ಹೆಲ್ಪ್‌ಲೈನ್: 1930',
    'header.login': 'ನಾಗರಿಕ ಲಾಗಿನ್',
    'header.skipToContent': 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
    'header.highContrast': 'ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್',
    'header.normalMode': 'ಸಾಮಾನ್ಯ ಮೋಡ್',
    'header.searchPlaceholder': 'ಸೈಬರ್ ಅಪರಾಧ ಮಾರ್ಗದರ್ಶನ, 1930 ಹೆಲ್ಪ್‌ಲೈನ್ ಅಥವಾ ಪೊಲೀಸ್ ಠಾಣೆಯನ್ನು ಹುಡುಕಿ...',
    'common.backToHome': 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    'common.back': 'ಹಿಂದೆ',

    // Home Page Hero & Cards
    'home.heroBadge': 'ಸುರಕ್ಷಿತ ನಾಗರಿಕರು. ಸುರಕ್ಷಿತ ಡಿಜಿಟಲ್ ಭಾರತ.',
    'home.howCanWeHelp': 'ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    'home.heroSubtitle': 'ಏನಾಯಿತು ಎಂಬುದನ್ನು ನಮಗೆ ತಿಳಿಸಿ. ಮುಂದಿನ ಹಂತಗಳ ಬಗ್ಗೆ ನಾವು ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇವೆ.',
    'home.trackBannerTitle': 'ಈಗಾಗಲೇ ದೂರನ್ನು ದಾಖಲಿಸಿದ್ದೀರಾ?',
    'home.trackBannerSubtitle': 'ನಿಮ್ಮ ದೂರಿನ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ತನಿಖಾಧಿಕಾರಿಗಳಿಂದ ಲೈವ್ ನವೀಕರಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
    'home.trackNow': 'ಈಗಲೇ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    'home.emergencyBadge': 'ಹಣಕಾಸು ವಂಚನೆಯೇ? ತಕ್ಷಣ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.',
    'home.emergencyTitle': '1930 ಗೆ ಕರೆ ಮಾಡಿ',
    'home.emergencySubtitle': 'ಸೈಬರ್ ಹಣಕಾಸು ವಂಚನೆಯನ್ನು ವರದಿ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣದ ಸಹಾಯವನ್ನು ಪಡೆಯಿರಿ.',
    'home.call1930Now': 'ಈಗಲೇ 1930 ಗೆ ಕರೆ ಮಾಡಿ',
    'home.otherWaysHelp': 'ಸಹಾಯ ಪಡೆಯಲು ಇತರ ಮಾರ್ಗಗಳು',
    'home.findPoliceStation': 'ನನ್ನ ಸೈಬರ್ ಪೊಲೀಸ್ ಠಾಣೆಯನ್ನು ಹುಡುಕಿ',
    'home.bankAssistance': 'ಬ್ಯಾಂಕ್ ಸಂಬಂಧಿತ ಸಹಾಯ',
    'home.complaintEscalation': 'ದೂರು ಪರಿಹಾರ ಮತ್ತು ಮೇಲ್ಮನವಿ',
    'home.officialContacts': 'ಅಧಿಕೃತ ಸಂಪರ್ಕಗಳು',

    // Intent Cards
    'card.lostMoney.title': 'ನಾನು ಹಣ ಕಳೆದುಕೊಂಡಿದ್ದೇನೆ',
    'card.lostMoney.desc': 'ಹಣಕಾಸು ವಂಚನೆಯನ್ನು ವರದಿ ಮಾಡಿ ಮತ್ತು ಮುಂದಿನ ಕ್ರಮಗಳ ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
    'card.harassment.title': 'ಯಾರಾದರೂ ನನಗೆ ಕಿರುಕುಳ / ಬೆದರಿಕೆ ಹಾಕುತ್ತಿದ್ದಾರೆ',
    'card.harassment.desc': 'ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್, ಸುಲಿಗೆ, ನಕಲಿ ಪ್ರೊಫೈಲ್‌ಗಳು ಮತ್ತು ಇತರ ವಿಷಯಗಳಲ್ಲಿ ಸಹಾಯ ಪಡೆಯಿರಿ.',
    'card.hacked.title': 'ನನ್ನ ಖಾತೆ ಅಥವಾ ಸಾಧನ ಹ್ಯಾಕ್ ಆಗಿದೆ',
    'card.hacked.desc': 'ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ ಮತ್ತು ಘಟನೆಯನ್ನು ವರದಿ ಮಾಡಿ.',
    'card.anonymous.title': 'ನಾನು ಅನಾಮಧೇಯವಾಗಿ ವರದಿ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ',
    'card.anonymous.desc': 'ನಿಮ್ಮ ಗುರುತನ್ನು ಬಹಿರಂಗಪಡಿಸದೆ ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.',
    'card.verify.title': 'ಅನುಮಾನಾಸ್ಪದ ಸಂಖ್ಯೆ ಅಥವಾ ವೆಬ್‌ಸೈಟ್ ಪರಿಶೀಲಿಸಿ',
    'card.verify.desc': 'ನಂಬುವ ಮೊದಲು ಪರಿಶೀಲಿಸಿ.',
    'card.needHelp.title': 'ನನಗೆ ಸಹಾಯ ಬೇಕು',
    'card.needHelp.desc': 'ಸರಿಯಾದ ಸಂಪರ್ಕ, ಪೊಲೀಸ್ ಠಾಣೆ ಅಥವಾ ಬೆಂಬಲ ಸೇವೆಯನ್ನು ಹುಡುಕಿ.',

    // Financial Fraud Form
    'form.financial.badge': 'ಸಾಕ್ಷ್ಯ → ರಚನಾತ್ಮಕ ದೂರು',
    'form.financial.title': 'ಹಣಕಾಸು ವಂಚನೆಯನ್ನು ವರದಿ ಮಾಡಿ',
    'form.financial.subtitle': 'ನಿಮ್ಮ ವಹಿವಾಟಿನ ಬಗ್ಗೆ ತಿಳಿಸಿ. ಸಾಕ್ಷ್ಯಗಳನ್ನು ಲಗತ್ತಿಸಲು ಮತ್ತು ನಿಧಿ ಮರುಪಡೆಯಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.',
    'form.financial.step1': '1. ಘಟನೆಯ ವಿವರಗಳು',
    'form.financial.step2': '2. ಸಾಕ್ಷ್ಯಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'form.financial.step3': '3. ವಿವರಗಳ ಪರಿಶೀಲನೆ',
    'form.financial.step4': '4. ದೃಢೀಕರಿಸಿ ಮತ್ತು ಸಲ್ಲಿಸಿ',
    'form.financial.amountLabel': 'ಅಂದಾಜು ನಷ್ಟದ ಮೊತ್ತ (₹)',
    'form.financial.dateLabel': 'ಘಟನೆ / ಡೆಬಿಟ್ ದಿನಾಂಕ',
    'form.financial.paymentMethod': 'ಪಾವತಿ ವಿಧಾನ',
    'form.financial.titleLabel': 'ಸಂಕ್ಷಿಪ್ತ ಘಟನೆಯ ಶೀರ್ಷಿಕೆ',
    'form.financial.titlePlaceholder': 'ಉದಾ: QR ಕೋಡ್ ಅಥವಾ ನಕಲಿ ಕರೆ ಮೂಲಕ ಅನಧಿಕೃತ UPI ವರ್ಗಾವಣೆ',
    'form.financial.narrativeLabel': 'ಏನಾಯಿತು? (ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಣೆ)',
    'form.financial.narrativePlaceholder': 'ವಂಚನೆ ಹೇಗೆ ನಡೆಯಿತು, ಯಾವ ಲಿಂಕ್ ಅಥವಾ QR ಕ್ಲಿಕ್ ಮಾಡಲಾಗಿದೆ ಎಂಬುದನ್ನು ವಿವರಿಸಿ.',
    'form.financial.continueToEvidence': 'ಸಾಕ್ಷ್ಯಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಮುಂದುವರಿಯಿರಿ',
    'form.financial.uploadTitle': 'ವಹಿವಾಟಿನ ಸಾಕ್ಷ್ಯಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'form.financial.uploadSubtitle': 'ರಶೀದಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು, SMS ಎಚ್ಚರಿಕೆಗಳು ಅಥವಾ ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    'form.financial.reviewExtractedTitle': 'ನಾವು ಈ ವಿವರಗಳನ್ನು ಪಡೆದಿದ್ದೇವೆ',
    'form.financial.reviewExtractedSubtitle': 'ದಯವಿಟ್ಟು ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ. ಸಲ್ಲಿಸುವ ಮೊದಲು ತಿದ್ದುಪಡಿ ಮಾಡಬಹುದು.',
    'form.financial.confirmCheckbox': 'ನಾನು ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ ಮತ್ತು ಅವು ನಿಖರವಾಗಿವೆ ಎಂದು ದೃಢೀಕರಿಸುತ್ತೇನೆ.',
    'form.financial.proceedFinal': 'ಅಂತಿಮ ಪರಿಶೀಲನೆಗೆ ಮುಂದುವರಿಯಿರಿ',
    'form.financial.finalReviewTitle': 'ದೂರನ್ನು ಪರಿಶೀಲಿಸಿ',
    'form.financial.finalReviewSubtitle': 'ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ಸಾರಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ.',
    'form.financial.submitBtn': 'ಅಧಿಕೃತ ದೂರನ್ನು ಸಲ್ಲಿಸಿ',
    'form.financial.submitting': 'ದೂರನ್ನು ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ...',
    'form.financial.successTitle': 'ದೂರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ',
    'form.financial.trackBtn': 'ನನ್ನ ದೂರನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',

    // Harassment Form
    'form.harassment.badge': 'ಆದ್ಯತೆಯ ವರದಿ',
    'form.harassment.title': 'ಯಾರಾದರೂ ನನಗೆ ಕಿರುಕುಳ ಅಥವಾ ಬೆದರಿಕೆ ಹಾಕುತ್ತಿದ್ದಾರೆ',
    'form.harassment.subtitle': 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ ತಿಳಿಸಿ. ನೀವು ಚಾಟ್ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದು.',
    'form.harassment.safetyNoticeTitle': 'ತುರ್ತು ಸುರಕ್ಷತಾ ಸೂಚನೆ',
    'form.harassment.safetyNotice': 'ನಿಮಗೆ ದೈಹಿಕ ಹಾನಿ ಅಥವಾ ಜೀವ ಬೆದರಿಕೆ ಇದ್ದರೆ, ತಕ್ಷಣ 112 ಗೆ ಕರೆ ಮಾಡಿ.',
    'form.harassment.platformLabel': 'ಸಂಬಂಧಿತ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅಥವಾ ಅಪ್ಲಿಕೇಶನ್',
    'form.harassment.platformPlaceholder': 'ಉದಾ: WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'ಸಂಕ್ಷಿಪ್ತ ಶೀರ್ಷಿಕೆ',
    'form.harassment.titlePlaceholder': 'ಉದಾ: ಅಪರಿಚಿತ ಸಂಖ್ಯೆಯಿಂದ WhatsApp ನಲ್ಲಿ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಸಂದೇಶಗಳು',
    'form.harassment.narrativeLabel': 'ಏನಾಯಿತು ಎಂಬುದನ್ನು ತಿಳಿಸಿ',
    'form.harassment.narrativePlaceholder': 'ಸಂದೇಶಗಳ ಸ್ವರೂಪ ಮತ್ತು ಬೇಡಿಕೆಗಳನ್ನು ವಿವರಿಸಿ.',
    'form.harassment.suspectLabel': 'ಶಂಕಿತರ ಸಂಪರ್ಕ ವಿವರಗಳು / ಸೋಷಿಯಲ್ ಹ್ಯಾಂಡಲ್',
    'form.harassment.suspectPlaceholder': 'ಉದಾ: ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ ಬಳಕೆದಾರ ಹೆಸರು',
    'form.harassment.continueProof': 'ಸಾಕ್ಷ್ಯ ಲಗತ್ತಿಸಲು ಮುಂದುವರಿಯಿರಿ',
    'form.harassment.uploadProofTitle': 'ಚಾಟ್ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು ಮತ್ತು ಸಾಕ್ಷ್ಯಗಳನ್ನು ಲಗತ್ತಿಸಿ',
    'form.harassment.uploadProofSubtitle': 'ಬೆದರಿಕೆ ಸಂದೇಶಗಳು ಅಥವಾ ಕರೆ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    'form.harassment.submitBtn': 'ವರದಿಯನ್ನು ಸಲ್ಲಿಸಿ',
    'form.harassment.submitting': 'ವರದಿ ದಾಖಲಾಗುತ್ತಿದೆ...',
    'form.harassment.successTitle': 'ದೂರು ದಾಖಲಾಗಿದೆ',
    'form.harassment.trackTimeline': 'ದೂರಿನ ಕಾಲಮಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',

    // Account Hacked Form
    'form.hacked.triageBadge': 'ತಕ್ಷಣದ ಕ್ರಮ: ಮೊದಲು ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ',
    'form.hacked.title': 'ಖಾತೆ ಅಥವಾ ಸಾಧನ ಹ್ಯಾಕ್ ಆಗಿದೆ',
    'form.hacked.subtitle': 'ದುರುಪಯೋಗವನ್ನು ತಡೆಯಲು ತಕ್ಷಣ ಈ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.',
    'form.hacked.proceedBtn': 'ಘಟನೆಯನ್ನು ವರದಿ ಮಾಡಲು ಮುಂದುವರಿಯಿರಿ',

    // Anonymous Report Form
    'form.anonymous.badge': 'ರಹಸ್ಯ ಮಾಹಿತಿ ಸ್ವೀಕಾರ',
    'form.anonymous.title': 'ಅನಾಮಧೇಯವಾಗಿ ವರದಿ ಮಾಡಿ',
    'form.anonymous.subtitle': 'ಗುರುತನ್ನು ಬಹಿರಂಗಪಡಿಸದೆ ಸೈಬರ್ ಚಟುವಟಿಕೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಿ.',
    'form.anonymous.categoryLabel': 'ಅಪರಾಧ ವಿಭಾಗ',
    'form.anonymous.titleLabel': 'ವಿಷಯ / ಸಾರಾಂಶ',
    'form.anonymous.detailsLabel': 'ವಿವರವಾದ ಮಾಹಿತಿ ಮತ್ತು ಸಾಕ್ಷ್ಯ ಲಿಂಕ್‌ಗಳು',
    'form.anonymous.submitBtn': 'ಅನಾಮಧೇಯ ಮಾಹಿತಿಯನ್ನು ಸಲ್ಲಿಸಿ',
  },

  ml: {
    // Header & Navigation
    'nav.home': 'ഹോം',
    'nav.track': 'പരാതി ട്രാക്ക് ചെയ്യുക',
    'nav.verify': 'പരിശോധിച്ച് ഉറപ്പാക്കുക',
    'nav.help': 'സഹായം നേടുക',
    'nav.volunteer': 'വോളണ്ടിയർ',
    'header.govTitle': 'ഭാരത സർക്കാർ',
    'header.ministry': 'ആഭ്യന്തര മന്ത്രാലയം • ഇന്ത്യൻ സൈബർ ക്രൈം കോർഡിനേഷൻ സെന്റർ (I4C)',
    'header.portalTitle': 'ദേശീയ സൈബർ ക്രൈം റിപ്പോർട്ടിംഗ് പോർട്ടൽ',
    'header.portalSubtitle': 'ആഭ്യന്തര മന്ത്രാലയം • ഭാരത സർക്കാർ',
    'header.helpline': 'ഹെൽപ്പ്‌ലൈൻ: 1930',
    'header.goldenHourHelpline': 'ഗോൾഡൻ അവർ ഹെൽപ്പ്‌ലൈൻ: 1930',
    'header.login': 'പൗര ലോഗിൻ',
    'header.skipToContent': 'പ്രധാന ഉള്ളടക്കത്തിലേക്ക് പോകുക',
    'header.highContrast': 'ഹൈ കോൺട്രാസ്റ്റ്',
    'header.normalMode': 'സാധാരണ മോഡ്',
    'header.searchPlaceholder': 'സൈബർ ക്രൈം മാർഗ്ഗനിർദ്ദേശങ്ങൾ, 1930 ഹെൽപ്പ്‌ലൈൻ അല്ലെങ്കിൽ പോലീസ് സ്റ്റേഷൻ തിരയുക...',
    'common.backToHome': 'ഹോമിലേക്ക് മടങ്ങുക',
    'common.back': 'പിന്നിലേക്ക്',

    // Home Page Hero & Cards
    'home.heroBadge': 'സുരക്ഷിതരായ പൗരന്മാർ. സുരക്ഷിതമായ ഡിജിറ്റൽ ഭാരതം.',
    'home.howCanWeHelp': 'ഞങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാനാകും?',
    'home.heroSubtitle': 'എന്താണ് സംഭവിച്ചതെന്ന് ഞങ്ങളോട് പറയുക. അടുത്ത ഘട്ടങ്ങളിൽ ഞങ്ങൾ നിങ്ങളെ നയിക്കുകയും ശരിയായ സഹായം നൽകുകയും ചെയ്യും.',
    'home.trackBannerTitle': 'മുമ്പ് എന്തെങ്കിലും റിപ്പോർട്ട് ചെയ്തിട്ടുണ്ടോ?',
    'home.trackBannerSubtitle': 'നിങ്ങളുടെ പരാതിയുടെ അവസ്ഥ ട്രാക്ക് ചെയ്യുകയും അന്വേഷണ ഉദ്യോഗസ്ഥരിൽ നിന്നുള്ള തത്സമയ അപ്‌ഡേറ്റുകൾ കാണുകയും ചെയ്യുക.',
    'home.trackNow': 'ഇപ്പോൾ ട്രാക്ക് ചെയ്യുക',
    'home.emergencyBadge': 'സാമ്പത്തിക തട്ടിപ്പോ? ഉടൻ നടപടിയെടുക്കൂ.',
    'home.emergencyTitle': '1930 ലേക്ക് വിളിക്കുക',
    'home.emergencySubtitle': 'സൈബർ സാമ്പത്തിക തട്ടിപ്പ് റിപ്പോർട്ട് ചെയ്യുകയും ഉടനടി സഹായം നേടുകയും ചെയ്യുക.',
    'home.call1930Now': 'ഇപ്പോൾ 1930 ലേക്ക് വിളിക്കുക',
    'home.otherWaysHelp': 'സഹായം നേടാനുള്ള മറ്റ് വഴികൾ',
    'home.findPoliceStation': 'എന്റെ സൈബർ പോലീസ് സ്റ്റേഷൻ കണ്ടെത്തുക',
    'home.bankAssistance': 'ബാങ്ക് സംബന്ധമായ സഹായം',
    'home.complaintEscalation': 'പരാതി പരിഹാര മേൽനോട്ടം',
    'home.officialContacts': 'ഔദ്യോഗിക ബന്ധപ്പെടലുകൾ',

    // Intent Cards
    'card.lostMoney.title': 'എനിക്ക് പണം നഷ്ടപ്പെട്ടു',
    'card.lostMoney.desc': 'സാമ്പത്തിക തട്ടിപ്പ് റിപ്പോർട്ട് ചെയ്യുകയും തുടർന്ന് എന്ത് ചെയ്യണമെന്ന് മാർഗ്ഗനിർദ്ദേശം നേടുകയും ചെയ്യുക.',
    'card.harassment.title': 'ആരെങ്കിലും എന്നെ ഉപദ്രവിക്കുകയോ ഭീഷണിപ്പെടുത്തുകയോ ചെയ്യുന്നു',
    'card.harassment.desc': 'ബ്ലാക്ക്‌മെയിലിംഗ്, ഭീഷണിപ്പെടുത്തൽ, വ്യാജ പ്രൊഫൈലുകൾ എന്നിവയിൽ സഹായം നേടുക.',
    'card.hacked.title': 'എന്റെ അക്കൗണ്ടോ ഉപകരണമോ ഹാക്ക് ചെയ്യപ്പെട്ടു',
    'card.hacked.desc': 'നിങ്ങളുടെ അക്കൗണ്ട് സുരക്ഷിതമാക്കുകയും സംഭവം റിപ്പോർട്ട് ചെയ്യുകയും ചെയ്യുക.',
    'card.anonymous.title': 'രഹസ്യമായി റിപ്പോർട്ട് ചെയ്യാൻ ഞാൻ ആഗ്രഹിക്കുന്നു',
    'card.anonymous.desc': 'നിങ്ങളുടെ വിവരങ്ങൾ വെളിപ്പെടുത്താതെ അറിവുള്ള കാര്യങ്ങൾ പങ്കിടുക.',
    'card.verify.title': 'സംശയാസ്പദമായ നമ്പർ അല്ലെങ്കിൽ വെബ്‌സൈറ്റ് പരിശോധിക്കുക',
    'card.verify.desc': 'വിശ്വസിക്കുന്നതിന് മുമ്പ് പരിശോധിക്കുക.',
    'card.needHelp.title': 'എനിക്ക് സഹായം വേണം',
    'card.needHelp.desc': 'ശരിയായ കോൺടാക്റ്റ്, പോലീസ് സ്റ്റേഷൻ അല്ലെങ്കിൽ പിന്തുണാ സേവനം കണ്ടെത്തുക.',

    // Financial Fraud Form
    'form.financial.badge': 'തെളിവ് → ഘടനാപരമായ പരാതി',
    'form.financial.title': 'സാമ്പത്തിക തട്ടിപ്പ് റിപ്പോർട്ട് ചെയ്യുക',
    'form.financial.subtitle': 'ഇടപാടിനെക്കുറിച്ച് പറയുക. തെളിവുകൾ അറ്റാച്ചുചെയ്യാനും ഫണ്ട് വീണ്ടെടുക്കാനും ഞങ്ങൾ സഹായിക്കും.',
    'form.financial.step1': '1. സംഭവ വിവരങ്ങൾ',
    'form.financial.step2': '2. തെളിവുകൾ അപ്‌ലോഡ് ചെയ്യുക',
    'form.financial.step3': '3. വിവരങ്ങൾ പരിശോധിക്കുക',
    'form.financial.step4': '4. സ്ഥിരീകരിച്ച് സമർപ്പിക്കുക',
    'form.financial.amountLabel': 'നഷ്ടപ്പെട്ട തുക (₹)',
    'form.financial.dateLabel': 'സംഭവ / ഡെബിറ്റ് തീയതി',
    'form.financial.paymentMethod': 'ഉപയോഗിച്ച പേയ്‌മെന്റ് രീതി',
    'form.financial.titleLabel': 'സംഭവത്തിന്റെ ചുരുക്കരൂപം',
    'form.financial.titlePlaceholder': 'ഉദാ: QR കോഡ് വഴി അല്ലെങ്കിൽ വ്യാജ കോൾ വഴി അനധികൃത UPI ട്രാൻസ്ഫർ',
    'form.financial.narrativeLabel': 'എന്താണ് സംഭവിച്ചത്? (ലളിതമായ വിവരണം)',
    'form.financial.narrativePlaceholder': 'തട്ടിപ്പ് എങ്ങനെ നടന്നു, ഏത് ലിങ്ക് അല്ലെങ്കിൽ QR ക്ലിക്ക് ചെയ്തു എന്ന് വിശദീകരിക്കുക.',
    'form.financial.continueToEvidence': 'തെളിവുകൾ അപ്‌ലോഡ് ചെയ്യാൻ തുടരുക',
    'form.financial.uploadTitle': 'ഇടപാട് തെളിവുകൾ അപ്‌ലോഡ് ചെയ്യുക',
    'form.financial.uploadSubtitle': 'രസീത് സ്ക്രീൻഷോട്ടുകൾ, SMS അലേർട്ടുകൾ അല്ലെങ്കിൽ ബാങ്ക് സ്റ്റേറ്റ്‌മെന്റുകൾ അപ്‌ലോഡ് ചെയ്യുക.',
    'form.financial.reviewExtractedTitle': 'ഞങ്ങൾ ഈ വിവരങ്ങൾ കണ്ടെത്തി',
    'form.financial.reviewExtractedSubtitle': 'വിവരങ്ങൾ പരിശോധിക്കുക. സമർപ്പിക്കുന്നതിന് മുമ്പ് തിരുത്തലുകൾ വരുത്താം.',
    'form.financial.confirmCheckbox': 'വിവരങ്ങൾ കൃത്യമാണെന്ന് ഞാൻ സ്ഥിരീകരിക്കുന്നു.',
    'form.financial.proceedFinal': 'അന്തിമ പരിശോധനയിലേക്ക് പോകുക',
    'form.financial.finalReviewTitle': 'പരാതി പരിശോധിക്കുക',
    'form.financial.finalReviewSubtitle': 'പോർട്ടലിൽ സമർപ്പിക്കുന്നതിന് മുമ്പ് പരാതിയുടെ സംഗ്രഹം പരിശോധിക്കുക.',
    'form.financial.submitBtn': 'ഔദ്യോഗിക പരാതി സമർപ്പിക്കുക',
    'form.financial.submitting': 'പരാതി രജിസ്റ്റർ ചെയ്യുന്നു...',
    'form.financial.successTitle': 'പരാതി വിജയകരമായി രജിസ്റ്റർ ചെയ്തു',
    'form.financial.trackBtn': 'പരാതി ട്രാക്ക് ചെയ്യുക',

    // Harassment Form
    'form.harassment.badge': 'മുൻഗണനാ റിപ്പോർട്ടിംഗ്',
    'form.harassment.title': 'ആരെങ്കിലും എന്നെ ഉപദ്രവിക്കുകയോ ഭീഷണിപ്പെടുത്തുകയോ ചെയ്യുന്നു',
    'form.harassment.subtitle': 'ലളിതമായ ഭാഷയിൽ പറയുക. ചാറ്റ് സ്ക്രീൻഷോട്ടുകൾ പങ്കിടാം.',
    'form.harassment.safetyNoticeTitle': 'അടിയന്തര സുരക്ഷാ അറിയിപ്പ്',
    'form.harassment.safetyNotice': 'ശാരീരിക ഉപദ്രവമോ ജീവന് ഭീഷണിയോ ഉണ്ടെങ്കിൽ, ഉടൻ 112-ൽ പോലീസിനെ വിളിക്കുക.',
    'form.harassment.platformLabel': 'ഉൾപ്പെട്ട പ്ലാറ്റ്‌ഫോം അല്ലെങ്കിൽ ആപ്പ്',
    'form.harassment.platformPlaceholder': 'ഉദാ: WhatsApp, Instagram, Telegram, SMS',
    'form.harassment.titleLabel': 'ചുരുക്കരൂപം / തലക്കെട്ട്',
    'form.harassment.titlePlaceholder': 'ഉദാ: അജ്ഞാത നമ്പറിൽ നിന്ന് WhatsApp-ൽ ബ്ലാക്ക്‌മെയിൽ സന്ദേശങ്ങൾ',
    'form.harassment.narrativeLabel': 'എന്താണ് സംഭവിച്ചതെന്ന് പറയുക',
    'form.harassment.narrativePlaceholder': 'സന്ദേശങ്ങളുടെ സ്വഭാവവും ആവശ്യങ്ങളും വിവരിക്കുക.',
    'form.harassment.suspectLabel': 'സംശയിക്കപ്പെടുന്നയാളുടെ കോൺടാക്റ്റ് വിവരങ്ങൾ',
    'form.harassment.suspectPlaceholder': 'ഉദാ: ഫോൺ നമ്പർ അല്ലെങ്കിൽ ഉപയോക്തൃനാമം',
    'form.harassment.continueProof': 'തെളിവുകൾ ചേർക്കാൻ തുടരുക',
    'form.harassment.uploadProofTitle': 'ചാറ്റ് സ്ക്രീൻഷോട്ടുകളും തെളിവുകളും ചേർക്കുക',
    'form.harassment.uploadProofSubtitle': 'ഭീഷണി സന്ദേശങ്ങൾ അല്ലെങ്കിൽ കോൾ ലോഗുകൾ അപ്‌ലോഡ് ചെയ്യുക.',
    'form.harassment.submitBtn': 'റിപ്പോർട്ട് സമർപ്പിക്കുക',
    'form.harassment.submitting': 'റിപ്പോർട്ട് രജിസ്റ്റർ ചെയ്യുന്നു...',
    'form.harassment.successTitle': 'പരാതി രജിസ്റ്റർ ചെയ്തു',
    'form.harassment.trackTimeline': 'പരാതി ടൈംലൈൻ ട്രാക്ക് ചെയ്യുക',

    // Account Hacked Form
    'form.hacked.triageBadge': 'ഉടനടി സുരക്ഷ: ആദ്യം അക്കൗണ്ട് സുരക്ഷിതമാക്കുക',
    'form.hacked.title': 'അക്കൗണ്ടോ ഉപകരണമോ ഹാക്ക് ചെയ്യപ്പെട്ടു',
    'form.hacked.subtitle': 'ദുരുപയോഗം തടയാൻ ഉടനടി ഈ നടപടികൾ സ്വീകരിക്കുക.',
    'form.hacked.proceedBtn': 'സംഭവം റിപ്പോർട്ട് ചെയ്യാൻ തുടരുക',

    // Anonymous Report Form
    'form.anonymous.badge': 'രഹസ്യ വിവര ശേഖരണം',
    'form.anonymous.title': 'രഹസ്യമായി റിപ്പോർട്ട് ചെയ്യുക',
    'form.anonymous.subtitle': 'തിരിച്ചറിയൽ വിവരങ്ങൾ വെളിപ്പെടുത്താതെ സൈബർ വിവരങ്ങൾ പങ്കിടുക.',
    'form.anonymous.categoryLabel': 'കുറ്റകൃത്യ വിഭാഗം',
    'form.anonymous.titleLabel': 'വിഷയം / സംഗ്രഹം',
    'form.anonymous.detailsLabel': 'വിശദമായ വിവരങ്ങളും തെളിവ് ലിങ്കുകളും',
    'form.anonymous.submitBtn': 'രഹസ്യ വിവരം സമർപ്പിക്കുക',
  },
};

// Aliases
TRANSLATIONS.od = TRANSLATIONS.or;
TRANSLATIONS.punjabi = TRANSLATIONS.pa;
TRANSLATIONS.odia = TRANSLATIONS.or;
TRANSLATIONS.gujarati = TRANSLATIONS.gu;
TRANSLATIONS.kannada = TRANSLATIONS.kn;
TRANSLATIONS.malayalam = TRANSLATIONS.ml;

export interface LanguageContextType {
  currentLang: string;
  language: string;
  setCurrentLang: (code: string) => void;
  setLanguage: (code: string) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
  currentLangOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'ncrp_selected_language';

const KEY_ALIASES: Record<string, string> = {
  heroTagline: 'home.heroBadge',
  heroTitle: 'home.howCanWeHelp',
  heroSubtitle: 'home.heroSubtitle',
  cardLostMoneyTitle: 'card.lostMoney.title',
  cardLostMoneyDesc: 'card.lostMoney.desc',
  cardHarassmentTitle: 'card.harassment.title',
  cardHarassmentDesc: 'card.harassment.desc',
  cardHackedTitle: 'card.hacked.title',
  cardHackedDesc: 'card.hacked.desc',
  cardAnonymousTitle: 'card.anonymous.title',
  cardAnonymousDesc: 'card.anonymous.desc',
  cardVerifyTitle: 'card.verify.title',
  cardVerifyDesc: 'card.verify.desc',
  cardNeedHelpTitle: 'card.needHelp.title',
  cardNeedHelpDesc: 'card.needHelp.desc',
  helplineTitle: 'home.emergencyBadge',
  helplineCallBtn: 'home.call1930Now',
  quickTrackTitle: 'home.trackBannerTitle',
  quickTrackBtn: 'home.trackNow',
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLangState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    }
    return 'en';
  });

  const setCurrentLang = (code: string) => {
    const normalized =
      code === 'od' || code === 'odia'
        ? 'or'
        : code === 'punjabi'
        ? 'pa'
        : code === 'gujarati'
        ? 'gu'
        : code === 'kannada'
        ? 'kn'
        : code === 'malayalam'
        ? 'ml'
        : code;
    setCurrentLangState(normalized);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
      document.documentElement.lang = normalized;
    }
  };

  const setLanguage = setCurrentLang;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  const t = (key: string, fallback?: string): string => {
    const lookupKey = KEY_ALIASES[key] || key;
    const normalizedCode =
      currentLang === 'od' || currentLang === 'odia'
        ? 'or'
        : currentLang === 'punjabi'
        ? 'pa'
        : currentLang === 'gujarati'
        ? 'gu'
        : currentLang === 'kannada'
        ? 'kn'
        : currentLang === 'malayalam'
        ? 'ml'
        : currentLang;
    const langDict = TRANSLATIONS[normalizedCode] || TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (langDict && lookupKey in langDict) {
      return langDict[lookupKey];
    }
    // Fallback to English dictionary if key not translated in current language
    if (TRANSLATIONS.en && lookupKey in TRANSLATIONS.en) {
      return TRANSLATIONS.en[lookupKey];
    }
    return fallback !== undefined ? fallback : key;
  };

  const currentLangOption =
    SUPPORTED_LANGUAGES.find(
      (l) =>
        l.code === currentLang ||
        (currentLang === 'od' && l.code === 'or') ||
        (currentLang === 'punjabi' && l.code === 'pa') ||
        (currentLang === 'odia' && l.code === 'or') ||
        (currentLang === 'gujarati' && l.code === 'gu') ||
        (currentLang === 'kannada' && l.code === 'kn') ||
        (currentLang === 'malayalam' && l.code === 'ml')
    ) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        language: currentLang,
        setCurrentLang,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLangOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
