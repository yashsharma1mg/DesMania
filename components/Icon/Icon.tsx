import React from 'react';
import * as paths from './paths';
import type { IconWeight } from './paths';

export type IconName =
  | 'arrow-right' | 'arrow-left' | 'arrow-up-right'
  | 'chevron-down' | 'chevron-up' | 'chevron-right' | 'chevron-left'
  | 'double-chevron-down' | 'double-chevron-left' | 'double-chevron-right'
  | 'add' | 'subtract' | 'cross' | 'tick' | 'search'
  | 'filter' | 'sort' | 'delete' | 'download'
  | 'document-download' | 'document-upload'
  | 'home' | 'hamburger-menu' | 'navigation' | 'grid' | 'kebab-menu'
  | 'cart' | 'bag' | 'coupon' | 'discount' | 'reorder'
  | 'lab-test' | 'prescription' | 'consultation' | 'health-records'
  | 'rapid' | 'hearing'
  | 'bar-graph' | 'insights' | 'trends'
  | 'profile' | 'camera' | 'gallery' | 'play' | 'pause'
  | 'sound-on' | 'sound-off'
  | 'clock' | 'timer' | 'date-time' | 'information' | 'help'
  | 'lock' | 'unlock' | 'language'
  | 'left-to-right-list-bullet' | 'category';

const pathMap: Record<IconName, paths.IconPaths> = {
  'arrow-right':                paths.arrowRight,
  'arrow-left':                 paths.arrowLeft,
  'arrow-up-right':             paths.arrowUpRight,
  'chevron-down':               paths.chevronDown,
  'chevron-up':                 paths.chevronUp,
  'chevron-right':              paths.chevronRight,
  'chevron-left':               paths.chevronLeft,
  'double-chevron-down':        paths.doubleChevronDown,
  'double-chevron-left':        paths.doubleChevronLeft,
  'double-chevron-right':       paths.doubleChevronRight,
  'add':                        paths.add,
  'subtract':                   paths.subtract,
  'cross':                      paths.cross,
  'tick':                       paths.tick,
  'search':                     paths.search,
  'filter':                     paths.filter,
  'sort':                       paths.sort,
  'delete':                     paths.deleteIcon,
  'download':                   paths.download,
  'document-download':          paths.documentDownload,
  'document-upload':            paths.documentUpload,
  'home':                       paths.home,
  'hamburger-menu':             paths.hamburgerMenu,
  'navigation':                 paths.navigation,
  'grid':                       paths.grid,
  'kebab-menu':                 paths.kebabMenu,
  'cart':                       paths.cart,
  'bag':                        paths.bag,
  'coupon':                     paths.coupon,
  'discount':                   paths.discount,
  'reorder':                    paths.reorder,
  'lab-test':                   paths.labTest,
  'prescription':               paths.prescription,
  'consultation':               paths.consultation,
  'health-records':             paths.healthRecords,
  'rapid':                      paths.rapid,
  'hearing':                    paths.hearing,
  'bar-graph':                  paths.barGraph,
  'insights':                   paths.insights,
  'trends':                     paths.trends,
  'profile':                    paths.profile,
  'camera':                     paths.camera,
  'gallery':                    paths.gallery,
  'play':                       paths.play,
  'pause':                      paths.pause,
  'sound-on':                   paths.soundOn,
  'sound-off':                  paths.soundOff,
  'clock':                      paths.clock,
  'timer':                      paths.timer,
  'date-time':                  paths.dateTime,
  'information':                paths.information,
  'help':                       paths.help,
  'lock':                       paths.lock,
  'unlock':                     paths.unlock,
  'language':                   paths.language,
  'left-to-right-list-bullet':  paths.leftToRightListBullet,
  'category':                   paths.category,
};

export interface IconProps {
  name: IconName;
  size?: number;
  weight?: IconWeight;
  color?: string;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function Icon({
  name,
  size = 24,
  weight = 'regular',
  color = 'currentColor',
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  const iconPaths = pathMap[name];

  if (!iconPaths) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon] Unknown icon name: "${name}"`);
    }
    return null;
  }

  const d = iconPaths[weight];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={weight === 'bold' ? 2.5 : 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : undefined}
    >
      <path d={d} />
    </svg>
  );
}

export default Icon;
