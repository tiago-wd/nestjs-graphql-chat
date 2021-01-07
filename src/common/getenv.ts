import * as dotenv from 'dotenv';
import * as fs from 'fs';

export const getEnv = (key: string): string => {
  const env = dotenv.parse(fs.readFileSync('.env'));
  return env[key];
};
