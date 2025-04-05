import rateLimit from "express-rate-limit";

export const weatherLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  standardHeaders: true, // Envia headers padrão como RateLimit-*
  legacyHeaders: false, // Remove os headers `X-RateLimit-*` antigos
  message: "Muitas requisições desta máquina. Tente novamente mais tarde.",
});
