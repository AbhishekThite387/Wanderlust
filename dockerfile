# ==========================
# Stage 1 - Build
# ==========================
FROM node:22.18.0-alpine3.22 AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source
COPY . .

# ==========================
# Stage 2 - Runtime
# ==========================
FROM node:22.18.0-alpine3.22

WORKDIR /app

ENV NODE_ENV=production

# Copy application from builder stage
COPY --from=builder /app .

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

USER appuser

EXPOSE 8080

# Optional health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --spider -q http://localhost:8080/ || exit 1

CMD ["node", "app.js"]