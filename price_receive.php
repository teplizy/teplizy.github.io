<?php
date_default_timezone_set('Asia/Irkutsk');
mb_regex_encoding('utf-8');
mb_internal_encoding('utf-8');
$uploaddir = dirname(__FILE__) . '/price/';
$pricedir = dirname(__FILE__) . '/images/';

if (move_uploaded_file($_FILES['file']['tmp_name'], $uploaddir . $_FILES['file']['name']))
{
	if ($_FILES['file']['type'] == 'application/zip')
	{
		$zip = new ZipArchive;
		$res = $zip->open($uploaddir.$_FILES['file']['name']);
		if ($res === TRUE)
		{
			for ($i = 0; $i <= $zip->numFiles; $i++)
			{
				if (preg_match("/теплиц/ui", $zip->getNameIndex($i)))
				{
					debug('Найден прайс теплиц.');
					$new_name = 'price-teplizy.pdf';
					debug('Переименование файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match("/спк/ui", $zip->getNameIndex($i)))
				{
					debug('Найден прайс СПК.');
					$new_name = 'price-SPK.pdf';
					debug('Переименование файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match('/удск/ui', $zip->getNameIndex($i)))
				{
					debug('Найден прайс уличных ДСК.');
					$new_name = 'price-udsk.pdf';
					debug('Переивание файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match('/козырьк/ui', $zip->getNameIndex($i)))
				{
					debug('Найден прайс козырьки.');
					$new_name = 'price-kozyrki.pdf';
					debug('Переивание файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match('/дск/ui', $zip->getNameIndex($i)))
				{
					debug('Найден прайс ДСК.');
					$new_name = 'price-dsk.pdf';
					debug('Переивание файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match('/бесед/ui', $zip->getNameIndex($i)))
				{
					debug('Найден прайс беседок.');
					$new_name = 'price-kozyrki.pdf';
					debug('Переивание файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match('/душ/ui', $zip->getNameIndex($i)))
				{
					debug('Найден прайс душевых кабин.');
					$new_name = 'price-dush.pdf';
					debug('Переивание файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match('/бак/ui', $zip->getNameIndex($i)))
				{
					debug('Найден прайс баков.');
					$new_name = 'price-bak.pdf';
					debug('Переивание файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match('/емкост/ui', $zip->getNameIndex($i)) || preg_match('/ёмкост/ui', $zip->getNameIndex($i)))
				{
					debug('Найден прайс баков.');
					$new_name = 'price-bak.pdf';
					debug('Переивание файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
				elseif (preg_match('/авто/ui', $zip->getNameIndex($i)))
				{
					debug('Найден прайс автонавесов.');
					$new_name = 'price-auto.pdf';
					debug('Переивание файла "'.$zip->getNameIndex($i).'" в "'.$new_name.'"');
					$zip->renameIndex($i, $new_name);
					$files[] = $new_name;
				}
			}

			if ($zip->extractTo($pricedir, $files))
				debug('Архив распакован');
			else
				debug('Ошибка распаковки архива!');
			$zip->close();
		}
	}
	elseif ($_FILES['file']['type'] == 'application/pdf' || $_FILES['file']['type'] == 'application/x-pdf')
	{
		if (preg_match("/теплиц/ui", $_FILES['file']['name']))
		{
			debug('Найден прайс теплиц.');
			$new_name = 'price-teplizy.pdf';
			debug('Переименование файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match("/спк/ui", $_FILES['file']['name']))
		{
			debug('Найден прайс СПК.');
			$new_name = 'price-SPK.pdf';
			debug('Переименование файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match('/удск/ui', $_FILES['file']['name']))
		{
			debug('Найден прайс уличных ДСК.');
			$new_name = 'price-udsk.pdf';
			debug('Переивание файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match('/козырьк/ui', $_FILES['file']['name']))
		{
			debug('Найден прайс козырьки.');
			$new_name = 'price-kozyrki.pdf';
			debug('Переивание файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match('/дск/ui', $_FILES['file']['name']))
		{
			debug('Найден прайс ДСК.');
			$new_name = 'price-dsk.pdf';
			debug('Переивание файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match('/бесед/ui', $_FILES['file']['name']))
		{
			debug('Найден прайс беседок.');
			$new_name = 'price-kozyrki.pdf';
			debug('Переивание файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match('/душ/ui', $_FILES['file']['name']))
		{
			debug('Найден прайс душевых кабин.');
			$new_name = 'price-dush.pdf';
			debug('Переивание файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match('/бак/ui', $_FILES['file']['name']))
		{
			debug('Найден прайс баков.');
			$new_name = 'price-bak.pdf';
			debug('Переивание файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match('/емкост/ui', $_FILES['file']['name']) || preg_match('/ёмкост/ui', $_FILES['file']['name']))
		{
			debug('Найден прайс баков.');
			$new_name = 'price-bak.pdf';
			debug('Переивание файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
		elseif (preg_match('/авто/ui', $_FILES['file']['name']))
		{
			debug('Найден прайс автонавесов.');
			$new_name = 'price-auto.pdf';
			debug('Переивание файла "'.$_FILES['file']['name'].'" в "'.$new_name.'"');
			rename($uploaddir.$_FILES['file']['name'], $pricedir.$new_name);
		}
	}
}
else
{
	print "There some errors!";
}

function debug($msg)
{
	global $uploaddir;
	$msg = date('[d-m-Y h:i:s] ').$msg."\n";
	file_put_contents($uploaddir.'debug.log', $msg, FILE_APPEND | LOCK_EX);
}

?>