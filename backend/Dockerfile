FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

mvnw dependency:go-offline (agar maven wrapper hai) ya pom.xml aur source code copy karein:
COPY . .

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar"]