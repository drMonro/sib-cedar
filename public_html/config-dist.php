<?php
// HTTP
define('HTTP_SERVER', 'http://sib-cedar.ru/');

// HTTPS
define('HTTPS_SERVER', 'https://sib-cedar.ru/');

// DIR
define('DIR_APPLICATION', '/home/c/ckseveql/sib-cedar.ru/public_html/catalog/');
define('DIR_SYSTEM', '/home/c/ckseveql/sib-cedar.ru/public_html/system/');
define('DIR_IMAGE', '/home/c/ckseveql/sib-cedar.ru/public_html/image/');
define('DIR_STORAGE', dirname(dirname(__FILE__)) . '/storage/');
define('DIR_LANGUAGE', DIR_APPLICATION . 'language/');
define('DIR_TEMPLATE', DIR_APPLICATION . 'view/theme/');
define('DIR_CONFIG', DIR_SYSTEM . 'config/');
define('DIR_CACHE', DIR_STORAGE . 'cache/');
define('DIR_DOWNLOAD', DIR_STORAGE . 'download/');
define('DIR_LOGS', DIR_STORAGE . 'logs/');
define('DIR_MODIFICATION', DIR_STORAGE . 'modification/');
define('DIR_SESSION', DIR_STORAGE . 'session/');
define('DIR_UPLOAD', DIR_STORAGE . 'upload/');

// DB
define('DB_DRIVER', 'mysqli');
define('DB_HOSTNAME', 'localhost');
define('DB_USERNAME', 'ckseveql_cedar');
define('DB_PASSWORD', 'Cedarpower7');
define('DB_DATABASE', 'ckseveql_cedar');
define('DB_PORT', '3306');
define('DB_PREFIX', 'oc_');
