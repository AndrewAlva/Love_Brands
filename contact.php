<?php 

	$mail_to = 'andrew@mandelbrot.mx';


	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$subject = $_POST['subject'];
	$formcontent="De: $name ($email) \nAsunto: $subject \nMensaje: \n$message";
	$mailheader = "From: $email \r\n";
	$mail_sent = mail($mail_to, $subject, $formcontent, $mailheader) or die("Error!");
	

	if ($mail_sent == true){ ?>
		<script language="javascript" type="text/javascript">
			alert('Gracias por escribirnos! Tu mensaje fue enviado correctamente.');
			window.location = 'contact.html';
		</script>
	<?php } else { ?>

		<script type="text/javascript">
			alert('Mensaje no enviado, intenta de nuevo o si el problema persiste consulta al administrador.');
		</script>
	<?php } 
	?>