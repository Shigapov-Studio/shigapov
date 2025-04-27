<?php
// Настройки
// diasshigapov@yandex.ru
$to = 'tmn98373@toaik.com'; // <-- сюда вставь свой email
$subject = 'Новая заявка с формы';

// Проверка наличия обязательных данных
if (empty($_POST)) {
    http_response_code(400);
    echo 'Нет данных';
    exit;
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

// Проверяем, есть ли файл
$file_attached = isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK;

// Если файл есть, подготовим письмо с вложением
if ($file_attached) {
    $file_tmp_path = $_FILES['file']['tmp_name'];
    $file_name = $_FILES['file']['name'];
    $file_type = $_FILES['file']['type'];
    $file_content = chunk_split(base64_encode(file_get_contents($file_tmp_path)));

    $boundary = md5(time());

    // Заголовки
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: noreply@shigapov.studio\r\n"; // <-- указали твой адрес
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    // Тело письма
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

    // Отправляем письмо
    if (mail($to, $subject, $body, $headers)) {
        echo 'OK';
    } else {
        http_response_code(500);
        echo 'Ошибка при отправке';
    }
} else {
    // Если файла нет, обычное текстовое письмо
    $headers = "Content-Type: text/plain; charset=utf-8\r\n";
    $headers .= "From: noreply@shigapov.studio\r\n"; // <-- указали твой адрес

    if (mail($to, $subject, $message, $headers)) {
        echo 'OK';
    } else {
        http_response_code(500);
        echo 'Ошибка при отправке';
    }
}
?>
