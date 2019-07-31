/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var readlineSync = require('readline-sync');
var fs = require('fs');

var listContact = [];



function showMenu() {
  console.log('0. Show all contacts')
  console.log('1. Create a new contact');
  console.log('2. Edit a contact');
  console.log('3. Delete a contact');
  console.log('4. Search a contact');
  console.log('5. Save & Edit');

  var option = readlineSync.question('> ');
  switch (option) {
    case '0':
      showContacts();
      showMenu();
      break;
    case '1':
      showCreateContact();
      showMenu();
      break;
    case '2':
      showEditContact();
      showMenu();
      break;
    case '3':
      showDeleteContact();
      showMenu();
      break;
    case '4':
      showSearchContact();
      showMenu();
      break;
    case '5':
      saveAndExit();
      break;
    default:
      console.log('Wrong option');
      showMenu();
      break;
  }
}



function main() {
  showMenu();
}

main();