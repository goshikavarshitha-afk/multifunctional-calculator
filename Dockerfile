FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY src /app/src
COPY web /app/web

RUN mkdir -p /app/out

RUN javac -d /app/out /app/src/Main.java

EXPOSE 8080

CMD ["java", "-cp", "/app/out", "Main"]
