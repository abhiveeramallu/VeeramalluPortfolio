import { describe, expect, it } from 'vitest';
import { INTRO_LANGUAGES, DEFAULT_INTRO_SETTINGS } from '@/components/intro/introConfig';

describe('Multilingual intro configuration', () => {
  it('includes unique script languages in sequence', () => {
    expect(INTRO_LANGUAGES).toHaveLength(10);
    const expectedIds = ['en', 'te', 'hi', 'ta', 'kn', 'ml', 'ja', 'ko', 'zh', 'ar'];
    expect(INTRO_LANGUAGES.map((l) => l.id)).toEqual(expectedIds);
  });

  it('has accurate transliterations for Abhiram across scripts', () => {
    const langMap = Object.fromEntries(INTRO_LANGUAGES.map((l) => [l.id, l]));

    expect(langMap.en.name).toBe('ABHIRAM');
    expect(langMap.te.name).toBe('అభిరామ్'); // Telugu
    expect(langMap.hi.name).toBe('अभिराम'); // Hindi
    expect(langMap.ta.name).toBe('அபிராம்'); // Tamil
    expect(langMap.kn.name).toBe('ಅಭಿರಾಮ್'); // Kannada
    expect(langMap.ml.name).toBe('അഭിറാം'); // Malayalam
    expect(langMap.ja.name).toBe('アビラム'); // Japanese
    expect(langMap.ko.name).toBe('아비람'); // Korean
    expect(langMap.zh.name).toBe('阿比拉姆'); // Chinese
    expect(langMap.ar.name).toBe('أبهيرام'); // Arabic
  });

  it('has verified professional titles for Full Stack Developer', () => {
    const langMap = Object.fromEntries(INTRO_LANGUAGES.map((l) => [l.id, l]));

    expect(langMap.en.title).toBe('Full Stack Developer');
    expect(langMap.te.title).toBe('ఫుల్ స్టాక్ డెవలపర్');
    expect(langMap.hi.title).toBe('फुल स्टैक डेवलपर');
    expect(langMap.ta.title).toBe('ஃபுல் ஸ்டாக் டெவலப்பர்');
    expect(langMap.kn.title).toBe('ಫುಲ್ ಸ್ಟಾಕ್ ಡೆವಲಪರ್');
    expect(langMap.ml.title).toBe('ഫുൾ സ്റ്റാക്ക് ഡെവലപ്പർ');
    expect(langMap.ja.title).toBe('フルスタック開発者');
    expect(langMap.ko.title).toBe('풀스택 개발자');
    expect(langMap.zh.title).toBe('全栈开发工程师');
    expect(langMap.ar.title).toBe('مطور فل ستاك');
  });

  it('correctly sets RTL direction exclusively for Arabic', () => {
    const langMap = Object.fromEntries(INTRO_LANGUAGES.map((l) => [l.id, l]));
    expect(langMap.ar.dir).toBe('rtl');

    const nonRtl = INTRO_LANGUAGES.filter((l) => l.id !== 'ar');
    for (const lang of nonRtl) {
      expect(lang.dir).toBe('ltr');
    }
  });

  it('has a total duration tuned for readability and smooth pacing', () => {
    expect(DEFAULT_INTRO_SETTINGS.totalDurationMs).toBeGreaterThanOrEqual(5000);
    expect(DEFAULT_INTRO_SETTINGS.totalDurationMs).toBeLessThanOrEqual(8000);
    expect(DEFAULT_INTRO_SETTINGS.storageMode).toBe('session');
    expect(DEFAULT_INTRO_SETTINGS.exitFadeDurationMs).toBeLessThan(1000);
  });
});
