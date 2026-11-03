import type { IllustrationKind } from '@/data/content';

/** What each project's comic panel shows — used as its accessible description. */
export const ILLUSTRATION_DESCRIPTIONS: Record<IllustrationKind, string> = {
  city: 'comic panel — a man with a phone says "One trip, two drops!" beside a little car on a route between a pickup pin and a parcel.',
  radar:
    'comic panel — a man at his laptop says "Bot spotted!" while a robot is circled and a shield with a tick floats above.',
  fracture:
    'comic panel — an inspector says "Copy found!" as a magnifying glass passes over a picture where the same flower appears twice.',
  frames:
    'comic panel — a man shrugs "Not on the slide!" next to a lecture slide flagged with a red exclamation mark and a film-strip timeline.',
  network: 'comic panel — a man says "Gotcha!" while bees wearing coloured tags fly into a honey pot.',
  board:
    'comic panel — a man with a coffee says "Fan on, early!" next to a thermometer, rising heat, a microcontroller board and a spinning fan.',
  greenhouse:
    'comic panel — a man says "Rain\'s coming!" beside a greenhouse of potted plants under a rain cloud.',
  sheets:
    'comic panel — a man with a phone says "Stays on my laptop!" while a shy paper character is scanned next to a padlock.',
  racks:
    'comic panel — a man says "Shelf is low!" while a camera watches warehouse shelves with one gap outlined.',
  chat: 'comic panel — a man says "Read by all!" as a green message hops from one phone to another, which shows two blue ticks, next to a padlock.',
};
