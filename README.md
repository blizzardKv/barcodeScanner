# barcodeScanner

Сканнеры работают в режиме эмуляции с клавиатуры, поэтому нам необходимо "собирать" из кусочков нажатия на клавиши полный штрихкод
Обрабатываем ввод штрихкодов типа EAN-13, возвращаем обрабатываем штрихкод
Пример использования:

Подключаем скрипт
Инициализируем
Подписываемся на событие обработки

 if (window.BarcodeScanner) {
   const instanceBarcode = new window.BarcodeScanner();
   instanceBarcode.initialize();
     
   document.addEventListener("onBarcodeScan", function(e) {
     console.log(e.detail.barcode);
   });
 }
