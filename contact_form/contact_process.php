<?php

define("CONTACT_FORM", 'taksenov@gmail.com');

// функция проверки введенного email клиентом
function ValidateEmail($value){
    $regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';

    if($value == '') {
        return false;
    } else {
        $string = preg_replace($regex, '', $value);
    }

    return empty($string) ? true : false;
}
//============================================

$post = (!empty($_POST)) ? true : false;

if($post){


    $name = stripslashes($_POST['name']);
    $phone = stripslashes($_POST['phone']);
    $email = stripslashes($_POST['email']);


    $subject = 'Заявка на создание интернет-магазина для малого бизнеса';

    $messageToClient = '
	<html>
		<head>
			<title>Заявка на создание интернет-магазина для малого бизнеса</title>
			<style>
		     td, th{
		      border: 1px solid #d4d4d4;
		      padding: 5px;
		     }
		  	</style>
		</head>
		<body>
			<h2>Заказ</h2>
            <p>
		        Здравствуйте, от Вас поступила заявка на создание интернет-магазина для малого бизнеса.
		    </p>

			<h2>Ваши данные</h2>
			<table>
				<thead>
					<tr>
						<th>Имя</th>
						<th>Телефон</th>
                        <th>Электропочта</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>' . $name . '</td>
						<td>' . $phone . '</td>
                        <td>' . $email . '</td>
					</tr>
				</tbody>
			</table>
            <p>В самое ближайшее время с вами свяжется наш менеджер, для уточнения деталей.</p>
            <p>Если у вас остались вопросы или пожелания, то пишите на наш адрес электронной почты <a href="mailto:info@ip34.ru"><b>info@ip34.ru</b></p>
		</body>
	</html>';

    $messageToMe = '
    <html>
        <head>
            <title>Заявка на создание интернет-магазина для малого бизнеса</title>
            <style>
             td, th{
              border: 1px solid #d4d4d4;
              padding: 5px;
             }
            </style>
        </head>
        <body>
            <p>Поступила заявка от клиента на создание интернет-магазина для малого бизнеса.</p>

            <h2>Заказчик</h2>
            <table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th>Электропочта</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>' . $name . '</td>
                        <td>' . $phone . '</td>
                        <td>' . $email . '</td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>';

    $error = '';

    if(!$name)
    {
        $error .= 'Пожалуйста, введите ваше имя.<br />';
    }

    if(!$phone)
    {
        $error .= 'Пожалуйста, введите ваш телефон.<br />';
    }

    if (!ValidateEmail($email)){
        $error = 'Email введен неправильно!';
    }

    if(!$error){
        //отправка почты клиенту
        $mailToClient = mail(
         $email,
         $subject, $messageToClient,
             "From:  Студия разработки сайтов -- ip34.ru <info@ip34.ru>\r\n"
            ."Reply-To: info@ip34.ru\r\n"
            ."Content-type: text/html; charset=utf-8 \r\n"
            ."X-Mailer: PHP/" . phpversion());

        //Отправка почты мне
        $mailToMe = mail(
         'taksenov@gmail.com',
         //$email,
         $subject,
         $messageToMe,
             "From: Студия разработки сайтов -- ip34.ru <info@ip34.ru>\r\n"
            ."Reply-To: ".$email."\r\n"
            ."Content-type: text/html; charset=utf-8 \r\n"
            ."X-Mailer: PHP/" . phpversion());

        if($mailToClient && $mailToMe){
            echo 'OK';
        }

    }else{
        echo '<div class="bg-danger">'.$error.'</div>';
    }

}
?>
