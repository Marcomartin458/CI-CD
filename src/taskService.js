function validateTitle(title) {
  console.log('------------')
  console.log(typeof title);
  console.log(title.trim());
  

  if (typeof title !== 'string' || !title.trim()) {
    
    console.log('Devuelve error');
    const error = new Error('title debe ser texto no vacío');
    error.status = 400;
    throw error;
  }
  console.log('Devuelve titulo');
  console.log('------------');

  return title.trim();
  
  
}
function createService(repository) {
  return {
    list: () => repository.list(),
    async create(data) {
      const title = validateTitle(data?.title);
      return repository.create({ title, done: false });
    },
    async complete(id) {
      const updated = await repository.complete(Number(id));
      if (!updated) {
        const error = new Error('Tarea no encontrada');
        error.status = 404;
        throw error;
      }
      return updated;
    },
  };
}
module.exports = { validateTitle, createService };
