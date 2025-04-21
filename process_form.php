<?php

$recipient_email = "mustafacan2004.jbs@gmail.com"; 
$email_subject = "Neue Kontaktanfrage von der Portfolio-Website";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
    $name = filter_var($_POST["name"] ?? '', FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["phone"] ?? '', FILTER_SANITIZE_STRING);
    $message = filter_var($_POST["message"] ?? '', FILTER_SANITIZE_STRING);
    
    /
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Bitte füllen Sie alle Felder aus."]);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Bitte geben Sie eine gültige E-Mail-Adresse ein."]);
        exit;
    }
    
    
    $email_content = "Name: $name\n";
    $email_content .= "E-Mail: $email\n";
    $email_content .= "Telefon: $phone\n\n";
    $email_content .= "Nachricht:\n$message\n";
    
  
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
 
    if (mail($recipient_email, $email_subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Ihre Nachricht wurde erfolgreich gesendet!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut."]);
    }
} else {

    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Zugriff verweigert."]);
}
?>