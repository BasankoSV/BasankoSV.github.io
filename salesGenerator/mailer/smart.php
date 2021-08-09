<?php

$email = $_POST['email'];
$phone = $_POST['phone'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->SMTPDebug = 3;                                // Enable verbose debug output

$mail->isSMTP();                                        // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';                           // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                                 // Enable SMTP authentication
$mail->Username = 'betatester@internet.ru';             // Наш логин
$mail->Password = '';               // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                              // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                      // TCP port to connect to

$mail->setFrom('betatester@internet.ru', 'Sales generator');    // От кого письмо
$mail->addAddress('video.server@rambler.ru');                       // Add a recipient
$mail->addAddress('order@salesgenerator.pro');                       // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                    // Set email format to HTML

$mail->Subject = 'Заявка Басанько С.В.';
$mail->Body    = '
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>