const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

// Formatação dos logs
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Criar o logger
const logger = createLogger({
  level: "info", // Nível mínimo de log (info, warn, error)
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Para logar stack trace
    logFormat
  ),
  defaultMeta: { service: "be-hero-backend" },
  transports: [
    new transports.Console(), // Exibir logs no console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log de erros em arquivo
    new transports.File({ filename: "logs/combined.log" }), // Todos os logs em arquivo
  ],
});

module.exports = logger;
