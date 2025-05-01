<?php
// Настройки
$to = 'info@shigapov.studio';
$subject = 'Новая заявка с формы';

// Проверка наличия данных
if (empty($_POST)) {
    http_response_code(400);
    echo 'Нет данных';
    exit;
}

// CAPTCHA проверка
$captchaToken = $_POST['smart-token'] ?? '';

if (!$captchaToken) {
    http_response_code(400);
    echo 'Не пройдена проверка CAPTCHA';
    exit;
}

$secret = getenv('YANDEX_API_KEY');
$captchaCheck = verifyCaptcha($captchaToken, $secret);

if (!$captchaCheck) {
    http_response_code(403);
    echo 'Неверная CAPTCHA';
    exit;
}

// Функция верификации SmartCaptcha
function verifyCaptcha($token, $secret) {
    $url = 'https://smartcaptcha.yandexcloud.net/validate';
    $data = http_build_query([
        'secret' => $secret,
        'token' => $token
    ]);

    $options = [
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n" .
                         "Content-Length: " . strlen($data) . "\r\n",
            'content' => $data
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    return $result === 'true';
}

// Защита от XSS
function sanitize($value) {
    return htmlspecialchars(strip_tags(trim($value)));
}

// Собираем текст письма
$message = "Новая заявка:\n\n";
$message .= "Имя: " . sanitize($_POST['name'] ?? '') . "\n";
$message .= "Телефон: " . sanitize($_POST['tel'] ?? '') . "\n";
$message .= "Компания: " . sanitize($_POST['company'] ?? '') . "\n";
$message .= "Email: " . sanitize($_POST['email'] ?? '') . "\n";
$message .= "Длительность: " . sanitize($_POST['duration'] ?? '') . "\n";
$message .= "Согласие на обработку: " . (isset($_POST['conscent']) && $_POST['conscent'] === 'yes' ? 'Да' : 'Нет') . "\n";

// Проверка вложения
$file_attached = isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK;

if ($file_attached) {
    $file_tmp_path = $_FILES['file']['tmp_name'];
    $file_name = $_FILES['file']['name'];
    $file_type = $_FILES['file']['type'];
    $file_content = chunk_split(base64_encode(file_get_contents($file_tmp_path)));
    $boundary = md5(time());

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: noreply@shigapov.studio\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=utf-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n";

    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: {$file_type}; name=\"{$file_name}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$file_name}\"\r\n\r\n";
    $body .= $file_content . "\r\n";
    $body .= "--{$boundary}--";

    if (mail($to, $subject, $body, $headers)) {
        echo 'OK';
    } else {
        http_response_code(500);
        echo 'Ошибка при отправке';
    }
} else {
    $headers = "Content-Type: text/plain; charset=utf-8\r\n";
    $headers .= "From: noreply@shigapov.studio\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo 'OK';
    } else {
        http_response_code(500);
        echo 'Ошибка при отправке';
    }
}
?>
