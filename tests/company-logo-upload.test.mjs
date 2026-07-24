import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

const uploadComponentPath = path.join(projectRoot, 'components/company/CompanyLogoUpload.js');
const axiosConfigPath = path.join(projectRoot, 'lib/axios.js');

test('company logo upload uses the protected PUT upload route', () => {
  const componentSource = readFileSync(uploadComponentPath, 'utf8');
  assert.match(componentSource, /api\.put\("\/company\/logo"/);
  assert.doesNotMatch(componentSource, /api\.post\("\/company\/logo"/);
});

test('axios attaches auth from cookies for dashboard requests', () => {
  const axiosSource = readFileSync(axiosConfigPath, 'utf8');
  assert.match(axiosSource, /import Cookies from "js-cookie"/);
  assert.match(axiosSource, /Cookies\.get\("accessToken"\)/);
});
