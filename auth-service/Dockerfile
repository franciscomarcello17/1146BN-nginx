FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw

EXPOSE 8085

ENTRYPOINT ["./mvnw", "spring-boot:run"]
