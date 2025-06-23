import test from 'node:test';
import assert from 'node:assert/strict';
import { filterEmployees } from '../src/utils/employee.js';

test('filter by nombre', () => {
  const empleados = [
    { nombre: 'Ana', apellido: 'Lopez', documento: '123' },
    { nombre: 'Juan', apellido: 'Perez', documento: '456' },
  ];
  const res = filterEmployees(empleados, { nombre: 'ana' });
  assert.equal(res.length, 1);
  assert.equal(res[0].apellido, 'Lopez');
});

test('filter by multiple fields', () => {
  const empleados = [
    { nombre: 'Ana', apellido: 'Lopez', documento: '123' },
    { nombre: 'Ana', apellido: 'Gomez', documento: '999' },
  ];
  const res = filterEmployees(empleados, { nombre: 'ana', apellido: 'lo' });
  assert.deepEqual(res, [{ nombre: 'Ana', apellido: 'Lopez', documento: '123' }]);
});
