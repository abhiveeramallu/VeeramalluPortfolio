/** Data for the interactive token inspector embedded in Design Systems case studies. */
export interface TokenSet {
  globals: Record<string, string>;
  semantic: Record<string, { light: string; dark: string }>;
  components: { name: string; label: string; bg: string; fg: string }[];
}

const lumina: TokenSet = {
  globals: {
    'indigo.400': '#94A2FF',
    'indigo.500': '#5B5BFF',
    'indigo.700': '#3F3BC1',
    'lime.500': '#C6F432',
    'orange.500': '#FF5A1F',
    'orange.300': '#FFAD94',
    'neutral.0': '#FFFFFF',
    'neutral.50': '#F6F4EF',
    'neutral.800': '#1B1B1A',
    'neutral.900': '#111111',
  },
  semantic: {
    'action.bg': { light: 'indigo.500', dark: 'indigo.400' },
    'action.fg': { light: 'neutral.0', dark: 'neutral.900' },
    'surface.raised': { light: 'neutral.0', dark: 'neutral.800' },
    'text.primary': { light: 'neutral.900', dark: 'neutral.50' },
    'feedback.success': { light: 'lime.500', dark: 'lime.500' },
    'feedback.danger': { light: 'orange.500', dark: 'orange.300' },
  },
  components: [
    { name: 'button.primary', label: 'Save changes', bg: 'action.bg', fg: 'action.fg' },
    { name: 'card.default', label: 'Card title', bg: 'surface.raised', fg: 'text.primary' },
    { name: 'badge.success', label: 'Deployed', bg: 'feedback.success', fg: 'text.primary' },
    { name: 'badge.danger', label: 'Failed', bg: 'feedback.danger', fg: 'action.fg' },
  ],
};

const auraFlora: TokenSet = {
  globals: {
    'temp.mint': '#BFEBD9',
    'temp.sage': '#DDF3E4',
    'temp.butter': '#FFF0C2',
    'temp.peach': '#FFD8B8',
    'temp.apricot': '#FFB89A',
    'ink.900': '#111111',
    'ink.50': '#F6F4EF',
    'night.800': '#1F2A27',
  },
  semantic: {
    'comfort.too-cold': { light: 'temp.mint', dark: 'temp.mint' },
    'comfort.ideal': { light: 'temp.butter', dark: 'temp.butter' },
    'comfort.too-hot': { light: 'temp.apricot', dark: 'temp.peach' },
    'surface.panel': { light: 'ink.50', dark: 'night.800' },
    'text.on-comfort': { light: 'ink.900', dark: 'ink.900' },
    'text.primary': { light: 'ink.900', dark: 'ink.50' },
  },
  components: [
    { name: 'zone.cold', label: 'Zone B · 9°', bg: 'comfort.too-cold', fg: 'text.on-comfort' },
    { name: 'zone.ideal', label: 'Zone A · 22°', bg: 'comfort.ideal', fg: 'text.on-comfort' },
    { name: 'zone.hot', label: 'Zone D · 33°', bg: 'comfort.too-hot', fg: 'text.on-comfort' },
    { name: 'panel.forecast', label: 'Forecast', bg: 'surface.panel', fg: 'text.primary' },
  ],
};

export const TOKEN_SETS: Record<string, TokenSet> = {
  'lumina-design-system': lumina,
  'greenhouse-telemetry': auraFlora,
};

export function resolveToken(set: TokenSet, semantic: string, theme: 'light' | 'dark') {
  const global = set.semantic[semantic][theme];
  return { global, hex: set.globals[global] };
}
