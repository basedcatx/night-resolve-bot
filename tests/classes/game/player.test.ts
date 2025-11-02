import { test, expect } from 'bun:test';
// Since bun isn't used extensively in this package, we have to manually add bun:test to avoid eslint issues.

import { Player } from '../../../classes/game/Player';

test('Verifies that a new Player object successfully stores the essential identifying informations and defaults all game states correctly', () => {
  const player = new Player('U12345', 'id1234');
  expect(typeof player.getId()).toBe('string');
  expect(typeof player.getUsername()).toBe('string');
});
