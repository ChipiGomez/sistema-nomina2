export function filterEmployees(personas, { nombre = '', apellido = '', documento = '' } = {}) {
  const n = nombre.toLowerCase();
  const a = apellido.toLowerCase();
  return personas.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(n);
    const coincideApellido = p.apellido.toLowerCase().includes(a);
    const coincideDocumento = (p.documento || '').includes(documento);
    return coincideNombre && coincideApellido && coincideDocumento;
  });
}
