const pacientesRouter = require('./pacientesRouter');
module.exports = (app) => {
  app.use('/pacientes', pacientesRouter);
};