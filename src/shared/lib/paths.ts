import { path as ROOT } from 'app-root-path';
import { join } from 'node:path';

export { ROOT };

export const RESOURCES: string = join(ROOT, 'resources');
export const ICON: string = join(RESOURCES, 'icon.png');
