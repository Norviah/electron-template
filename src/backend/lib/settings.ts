import { Database } from '@backend/schemas/db';
import { Store } from '@backend/structs/Store';
import { app } from 'electron';
import { join } from 'node:path';

export const settings = new Store({
  path: join(app.getPath('userData'), 'store.json'),
  schema: Database,
  defaults: {
    dimensions: { width: 900, height: 670 },
  },
});
