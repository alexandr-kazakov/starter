<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = strip_tags(trim($_POST["contact-name"]));
	$name = str_replace(array("\r", "\n"), array(" ", " "), $name);
	$tel = trim($_POST["contact-phone"]);
	$email = trim($_POST["contact-email"]);
	$product = trim($_POST["contact-product"]);
	$message = trim($_POST["contact-message"]);

	if (empty($name) OR empty($tel)) {
		http_response_code(400);
		echo "К сожалению! С отправкой сообщения возникла проблема. Заполните форму и повторите попытку.";
		exit;
	}

	$recipient = "alexandr.kazakov1@gmail.com"; // Замените на свой email

	$subject = "Письмо с сайта erweb.ru, от посетителя: $name"; // Замените на адрес своего сайта

	$email_content = "От кого: $name\n\n";
	$email_content .= "Телефон отправителя: $tel\n\n";
	$email_content .= "Email отправителя: $email\n\n";
	$email_content .= "Продукт: $product\n\n";
	$email_content .= "Сообщение отправителя:\n$message\n";

	$email_headers = "From: $name $tel";

	if (mail($recipient, $subject, $email_content, $email_headers)) {
		http_response_code(200);
		echo "Спасибо! Ваше сообщение было отправлено.";
	} else {
		http_response_code(500);
		echo "К сожалению! Что-то пошло не так, и мы не смогли отправить ваше сообщение.";
	}

} else {
	http_response_code(403);
	echo "Возникла проблема, повторите попытку.";
}

?>