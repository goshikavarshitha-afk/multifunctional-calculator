import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {

    public static void main(String[] args) throws Exception {

        int port = Integer.parseInt(
                System.getenv().getOrDefault("PORT", "8080")
        );

        HttpServer server = HttpServer.create(
                new InetSocketAddress("0.0.0.0", port),
                0
        );

        server.createContext("/", Main::serveWebsite);

        server.start();

        System.out.println();
        System.out.println("==========================================");
        System.out.println("      MULTI-FUNCTIONAL CALCULATOR");
        System.out.println("==========================================");
        System.out.println("Java SE Server Started Successfully!");
        System.out.println("Open: http://localhost:" + port);
        System.out.println("==========================================");
        System.out.println();

    }


    private static void serveWebsite(HttpExchange exchange) {

        try {

            String requestPath =
                    exchange.getRequestURI().getPath();


            if (requestPath.equals("/")) {

                requestPath = "/index.html";

            }


            // Prevent paths such as /../
            if (requestPath.contains("..")) {

                sendText(
                        exchange,
                        403,
                        "403 - Forbidden"
                );

                return;
            }


            Path filePath =
                    Paths.get("web" + requestPath);


            if (!Files.exists(filePath)
                    || Files.isDirectory(filePath)) {

                sendText(
                        exchange,
                        404,
                        "404 - File Not Found"
                );

                return;
            }


            byte[] fileBytes =
                    Files.readAllBytes(filePath);


            String contentType =
                    getContentType(filePath);


            exchange.getResponseHeaders()
                    .set(
                            "Content-Type",
                            contentType
                    );


            exchange.getResponseHeaders()
                    .set(
                            "Cache-Control",
                            "no-cache"
                    );


            exchange.sendResponseHeaders(
                    200,
                    fileBytes.length
            );


            try (OutputStream output =
                         exchange.getResponseBody()) {

                output.write(fileBytes);

            }

        } catch (Exception e) {

            e.printStackTrace();

            try {

                sendText(
                        exchange,
                        500,
                        "500 - Internal Server Error"
                );

            } catch (Exception ignored) {
            }

        }

    }


    private static void sendText(
            HttpExchange exchange,
            int statusCode,
            String message
    ) throws Exception {

        byte[] bytes =
                message.getBytes();


        exchange.getResponseHeaders()
                .set(
                        "Content-Type",
                        "text/plain; charset=UTF-8"
                );


        exchange.sendResponseHeaders(
                statusCode,
                bytes.length
        );


        try (OutputStream output =
                     exchange.getResponseBody()) {

            output.write(bytes);

        }

    }


    private static String getContentType(
            Path path
    ) {

        String fileName =
                path.toString().toLowerCase();


        if (fileName.endsWith(".html")) {

            return "text/html; charset=UTF-8";

        }


        if (fileName.endsWith(".css")) {

            return "text/css; charset=UTF-8";

        }


        if (fileName.endsWith(".js")) {

            return "application/javascript; charset=UTF-8";

        }

        if (fileName.endsWith(".xml")) {
                return "application/xml";
        }

        if (fileName.endsWith(".txt")) {
                return "text/plain";
       }

       
        if (fileName.endsWith(".svg")) {

            return "image/svg+xml";

        }


        if (fileName.endsWith(".png")) {

            return "image/png";

        }


        if (fileName.endsWith(".jpg")
                || fileName.endsWith(".jpeg")) {

            return "image/jpeg";

        }


        if (fileName.endsWith(".ico")) {

            return "image/x-icon";

        }


        return "application/octet-stream";

    }

}