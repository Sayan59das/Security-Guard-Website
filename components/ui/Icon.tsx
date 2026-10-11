import {
  BadgeCheck,
  Building2,
  CalendarDays,
  CircleParking,
  ClipboardCheck,
  Factory,
  GraduationCap,
  HardHat,
  Hospital,
  House,
  Moon,
  RefreshCw,
  School,
  Store,
  Timer,
  UserCheck,
  Warehouse,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/content/siteContent';

/**
 * The only icon set used on the site is lucide-react. To use a new icon in the content
 * file, add its name to `IconName` in content/siteContent.ts and map it here.
 */
const icons: Record<IconName, LucideIcon> = {
  house: House,
  building: Building2,
  calendar: CalendarDays,
  factory: Factory,
  moon: Moon,
  'user-check': UserCheck,
  'badge-check': BadgeCheck,
  'graduation-cap': GraduationCap,
  timer: Timer,
  'clipboard-check': ClipboardCheck,
  refresh: RefreshCw,
  store: Store,
  warehouse: Warehouse,
  school: School,
  hospital: Hospital,
  'hard-hat': HardHat,
  parking: CircleParking,
};

interface IconProps {
  name: IconName;
  className?: string;
}

/** Decorative icon (hidden from screen readers; the text next to it carries the meaning). */
export function Icon({ name, className }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.5} className={className} />;
}
