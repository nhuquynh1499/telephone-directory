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

function loadData() {
  var fileContent = fs.readFileSync('./data.json');
  listContact = JSON.parse(fileContent);
}

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
      var needSearch = readlineSync.question("> Search: ");
      var result = showSearchContact(needSearch);
      if (result !== [])
        console.log(result);
      else
        console.log('No contact');
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

function showContacts() {
  for (var contact of listContact)
    console.log(contact.name, contact.phoneNumber);
}

function showCreateContact() {
  var name = readlineSync.question('> Name: ');
  var phoneNumber = readlineSync.question('> Phone number: ');
  var newContact = {
    name: name,
    phoneNumber: phoneNumber
  }
  listContact.push(newContact);
}

function showEditContact() {
  var needEdit = readlineSync.question("Search a contact: ");
  var contact = showSearchContact(needEdit); 
  if (contact !== []) {
    listContact = listContact.map(function (item) {
      if (item === contact) {
        item.name = readlineSync.question("Input new name: ");
        item.phoneNumber = readlineSync.question("Input new phone number: ");
      }
      return item;
    });
  }
  else
    console.log("No contact");
}

function showDeleteContact() {
  var needDelete = readlineSync.question("Search a contact: ");
  var contact = showSearchContact(needDelete);
  if (contact !== []) {
    console.log(contact);
    var choice = readlineSync.question("Do you delete the contact? (Y/N)");
    if (choice === "N") {
      return -1;
    }
    else {
      listContact.splice(listContact.indexOf(contact), 1);
      console.log("Deleted.");
    }
  } else console.log('No contact');
}

function showSearchContact(needSearch) {
  var arrReult = [];
  for (var item of listContact) {
    if (item.phoneNumber.indexOf(needSearch) !== -1)
      arrReult.push(item);
    else {
      function unsignedName(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        return str;
      }
      var newName = unsignedName(needSearch.toLowerCase());
      if (item.name.toLowerCase().indexOf(newName) !== -1)
        arrReult.push(item);
    }
  }
  return arrReult;
}

function saveAndExit() {
  fs.writeFileSync('./data.json', JSON.stringify(listContact));
}

function main() {
  loadData();
  showMenu();
}

main();