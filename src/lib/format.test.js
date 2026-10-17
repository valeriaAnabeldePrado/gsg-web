import test from 'node:test';
import assert from 'node:assert/strict';
import { formatFileSize } from './format.js';

test('formatFileSize', () => {
  assert.equal(formatFileSize(null), '');
  assert.equal(formatFileSize(500), '500 B');
  assert.equal(formatFileSize(2048), '2 KB');
  assert.equal(formatFileSize(1572864), '1,5 MB');
});
