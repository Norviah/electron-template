import type { LucideIcon } from 'lucide-react';
import type { Route } from 'next';

export interface RouteItem {
  title: string;
  icon: LucideIcon;
  path: Route;
}
