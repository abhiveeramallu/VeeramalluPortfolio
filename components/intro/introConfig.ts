export interface IntroLanguage {
  id: string;
  name: string;
  title: string;
  dir?: 'ltr' | 'rtl';
  languageLabel: string;
}

export const INTRO_LANGUAGES: IntroLanguage[] = [
  {
    id: 'en',
    languageLabel: 'English',
    name: 'ABHIRAM',
    title: 'Full Stack Developer',
    dir: 'ltr',
  },
  {
    id: 'te',
    languageLabel: 'Telugu',
    name: 'అభిరామ్',
    title: 'ఫుల్ స్టాక్ డెవలపర్',
    dir: 'ltr',
  },
  {
    id: 'hi',
    languageLabel: 'Hindi',
    name: 'अभिराम',
    title: 'फुल स्टैक डेवलपर',
    dir: 'ltr',
  },
  {
    id: 'ta',
    languageLabel: 'Tamil',
    name: 'அபிராம்',
    title: 'ஃபுல் ஸ்டாக் டெவலப்பர்',
    dir: 'ltr',
  },
  {
    id: 'kn',
    languageLabel: 'Kannada',
    name: 'ಅಭಿರಾಮ್',
    title: 'ಫುಲ್ ಸ್ಟಾಕ್ ಡೆವಲಪರ್',
    dir: 'ltr',
  },
  {
    id: 'ml',
    languageLabel: 'Malayalam',
    name: 'അഭിറാം',
    title: 'ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ',
    dir: 'ltr',
  },
  {
    id: 'ja',
    languageLabel: 'Japanese',
    name: 'アビラム',
    title: 'フルスタック開発者',
    dir: 'ltr',
  },
  {
    id: 'ko',
    languageLabel: 'Korean',
    name: '아비람',
    title: '풀스택 개발자',
    dir: 'ltr',
  },
  {
    id: 'zh',
    languageLabel: 'Chinese',
    name: '阿比拉姆',
    title: '全栈开发工程师',
    dir: 'ltr',
  },
  
];

export interface IntroSettings {
  enabled: boolean;
  /** Storage mode: 'session' (once per browser session), 'always', 'first-visit' (localStorage), or 'none' */
  storageMode: 'session' | 'always' | 'first-visit' | 'none';
  sessionKey: string;
  localKey: string;
  totalDurationMs: number;
  initialHoldMs: number;
  stepIntervalMs: number;
  crossfadeDurationMs: number;
  exitFadeDurationMs: number;
}

export const DEFAULT_INTRO_SETTINGS: IntroSettings = {
  enabled: true,
  storageMode: 'session',
  sessionKey: 'abhiram_intro_session_seen',
  localKey: 'abhiram_intro_first_seen',
  totalDurationMs: 5200,
  initialHoldMs: 400,
  stepIntervalMs: 300,
  crossfadeDurationMs: 280,
  exitFadeDurationMs: 350,
};
