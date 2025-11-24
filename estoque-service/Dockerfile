# === STAGE 1: build ===
FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn -q -e -DskipTests=true dependency:go-offline

COPY src ./src
RUN mvn -q -e -DskipTests=true package

# === STAGE 2: runtime ===
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
