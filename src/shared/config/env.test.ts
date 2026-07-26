import { describe, expect, it } from 'vitest';
import { env } from './env';

describe('env', () => {
  it('exposes a non-empty apiBaseUrl', () => {
    expect(env.apiBaseUrl.length).toBeGreaterThan(0);
  });
});
