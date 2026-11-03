import Image from 'next/image';
import { preload } from 'react-dom';
import { cn } from '@/lib/utils';
import { SCENE_PEEP, sceneBackground, sceneLayers, type SceneId } from './scenes';
import { Tilt3D } from './Tilt3D';

const VIEWBOX = '0 0 400 300';

/**
 * A flat editorial illustration presented in 3D, like a pop-up book: the colour card at the back, then the
 * scenery, props and character on separate planes at increasing depth, each casting a paper-cut shadow.
 * The card rests at an angle and turns towards the pointer. Inside an element with the `group` class its
 * hover animations (waving, driving, scanning…) also play. A hand-made image for the project
 * (public/illustrations/<slug>.*) replaces the layers if one exists.
 */
export function Illustration({
  scene,
  label,
  image,
  side,
  priority = false,
  className,
}: {
  scene: SceneId;
  label: string;
  image?: string | null;
  side?: 'left' | 'right';
  /** Preload this panel's character at high priority — set it on the first illustration in view. */
  priority?: boolean;
  className?: string;
}) {
  if (priority && !image) preload(`/peeps/${SCENE_PEEP[scene]}.svg`, { as: 'image', fetchPriority: 'high' });
  const layers = image ? null : sceneLayers(scene);
  return (
    <Tilt3D label={label} side={side} className={className}>
      <div className="pop-card">
        <div className="pop-plane" style={{ backgroundColor: sceneBackground(scene) }}>
          {image && (
            <Image src={image} alt="" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
          )}
        </div>
        {layers &&
          (['back', 'mid', 'front'] as const).map((depth) => (
            <svg key={depth} viewBox={VIEWBOX} aria-hidden className={cn('pop-layer', `pop-layer--${depth}`)}>
              {layers[depth]}
            </svg>
          ))}
      </div>
    </Tilt3D>
  );
}
