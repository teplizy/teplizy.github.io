<?php
error_reporting(E_ALL);
define('FPDF_FONTPATH', __DIR__.'/fpdf/font/');

include_once __DIR__.'/fpdf/fpdf.php';
include_once __DIR__.'/fpdi/fpdi.php';

ob_clean();
$file = __DIR__.'/cupon_001.pdf';
if (!file_exists($file)) {
	die("File does not exist");
} else {
	$fullName = $_REQUEST['suname'].' '.$_REQUEST['name'].' '.$_REQUEST['midlname'];
	$currentDate = currentDate();
	$cuponNum = generateCuponNumber();
	sendEmail($cuponNum, $currentDate, $fullName);
	$pdf = new FPDI();
	$pdf->setSourceFile($file);
	$tpl = $pdf->importPage(1);
	$size = $pdf->getTemplateSize($tpl);
	$orientation = $size['h'] > $size['w'] ? 'P' : 'L';
	$pdf->AddPage($orientation);
	$pdf->useTemplate($tpl, null, null, $size['w'], $size['h'], true);
	$pdf->AddFont('AgencyFBCyrillic', '', 'agenfbcyr.php');
	$pdf->AddFont('GoodVibesPro', '', 'good_vibes_pro_regular.php');
	$pdf->SetXY(41.628, 91.017);
	$pdf->SetFont('GoodVibesPro', '', 40);
	$pdf->SetTextColor(184, 153, 106);
	$pdf->Cell(212.019, 20.814, iconv('UTF-8', 'CP1251', $fullName), 0, 2, 'C');
	$pdf->SetXY(56.797, 160.396);
	$pdf->SetFont('AgencyFBCyrillic', '', 21);
	$pdf->SetTextColor(32, 22, 0);
	$pdf->Cell(44.097, 7.173, iconv('UTF-8', 'CP1251', $currentDate), 0, 2, 'C');
	$pdf->SetXY(194.263, 160.396);
	$pdf->SetFont('AgencyFBCyrillic', '', 21);
	$pdf->SetTextColor(32, 22, 0);
	$pdf->Cell(44.332, 7.173, iconv('UTF-8', 'CP1251', $cuponNum), 0, 2, 'C');
	$pdf->Output('Your_Cupon.pdf', 'D');
}

function currentDate() {
	$date = explode('.', date('j.n.Y'));
	switch ($date[1]){
		case 1: $m='января'; break;
		case 2: $m='февраля'; break;
		case 3: $m='марта'; break;
		case 4: $m='апреля'; break;
		case 5: $m='мая'; break;
		case 6: $m='июня'; break;
		case 7: $m='июля'; break;
		case 8: $m='августа'; break;
		case 9: $m='сентября'; break;
		case 10: $m='октября'; break;
		case 11: $m='ноября'; break;
		case 12: $m='декабря'; break;
	}
	return $date[0].' '.$m.' '.$date[2].' г.';
}

function generateCuponNumber() {
	$start = $midle = $end = '';
	$midle_arr = range('A','Z');
	unset($midle_arr['3'], $midle_arr['14']);
	sort($midle_arr);
	for ($i = 0; $i < 3; $i++) {
		$start .= mt_rand(0,9);
		$end .= mt_rand(0,9);
	}
	for ($i = 0; $i < 3; $i++) {
		$midle .= $midle_arr[mt_rand(0,23)];
	}
	return $start.'-'.$midle.'-'.$end;
}

function sendEmail($cupon, $date, $fullName) {
	$to = 'tepliza38@yandex.ru, polikarbonat38@yandex.ru, kia-irk@ya.ru';
	$from = $_REQUEST['email'] ? $_REQUEST['email'] : 'no-reply@teplizy-irkutska.ru';
	$message = "Выписан купон № {$cupon}\nВыдан: {$date}\nE-mail: {$_REQUEST['email']}\nТелефон: {$_REQUEST['mobile']}\nФИО получателя: {$fullName}\n";
	mail($to, 'Выписан новый купон', $message, null, '-f'.$from);
}
?>