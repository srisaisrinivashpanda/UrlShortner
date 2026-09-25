# Stage 1: Build the Spring Boot application
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper and POM to leverage layer caching
COPY mvnw ./
COPY .mvn/ .mvn/
COPY pom.xml ./

# Normalize line endings for Windows checkouts and make executable
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# Resolve dependencies
RUN ./mvnw dependency:resolve -B

# Copy application source and build package
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Minimal Java 21 runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built JAR from build stage
COPY --from=build /app/target/*.jar app.jar
RUN chown -R appuser:appgroup /app

USER appuser

# Expose default port (overridable via PORT env variable)
EXPOSE 9090

# Container JVM optimization: respects cgroup limits in cloud platforms
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

