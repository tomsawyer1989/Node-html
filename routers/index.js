const pacienteRouter = require('./pacienteRouter');
const medicoRouter = require('./medicoRouter');
const secretarioRouter = require('./secretarioRouter');
const barrioRouter = require('./barrioRouter');
const ciudadRouter = require('./ciudadRouter');
const integranteRouter = require('./integranteRouter');
module.exports = (app) => {
  app.use('/pacientes', pacienteRouter);
  app.use('/medicos', medicoRouter);
  app.use('/', secretarioRouter);
  app.use('/barrios', barrioRouter);
  app.use('/ciudades', ciudadRouter);
  app.use('/integrantes', integranteRouter);
};