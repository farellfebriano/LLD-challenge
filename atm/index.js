/*
Design a simplified ATM (Automated Teller Machine) system. Your system should be
able to handle basic ATM functionalities such as checking an account balance,
depositing money, withdrawing money, and transferring funds between accounts.
Focus on the design of classes and their interactions.


VERB
1.) checking account ballance
2.) Deposit money
3.) withdraw money
4.) tranfering to another account
4.) log in
5.) log out

Noun
ATM system
    keep active user

    4.) log in
    5.) log out

UsetDatabase
    store the user databases

User
    name
    addres
    password

checking account

    -the ammount of money

    2.) Deposit money
    3.) withdraw money
    4.) tranfering to another account
    5.) receive some money

RELATION
ATM system has agregation rel with account
account has composition rel with checking acc

*/
const crypto = require("crypto");
class AtmSystem {
  constructor(user_db) {
    if (!AtmSystem.instance) {
      AtmSystem.instance = this;
    } else {
      return AtmSystem.instance;
    }
    this.userDatabase = user_db;
    this.user_db = user_db.user_db;
    this.account = undefined;
  }
  createUser(name, idNumber, password, phone, deposit) {
    return this.userDatabase.createUser(
      name,
      idNumber,
      password,
      phone,
      deposit
    );
  }
  checkAmmount() {
    if (!this.account) {
      console.log("please put your pin and card");
    } else {
      console.log(`ammount:${this.account.checkAmmount()}$`);
    }
    return this;
  }
  logIn(idNumber, password) {
    if (this.account) {
      console.log("please log out");
    }
    if (!this.user_db.has(idNumber)) {
      console.log("the idNumber you put in is wrongs");
    }
    const user = this.user_db.get(idNumber);
    if (user.password !== password) {
      console.log("the password you put in is wrongs");
    } else {
      this.account = user.checkingAccount;
      console.log(`hello ${user.name} how can we help you`);
    }
    return this;
  }
  logOut() {
    if (!this.account) {
      console.log("you are not log in");
    } else {
      console.log(`thank you for using our atm ${this.account.name}`);
      this.account = undefined;
    }
    return this;
  }
  deposit(ammount) {
    if (!this.account) {
      console.log("please put your pin and card");
    } else {
      this.account.deposit(ammount);
    }
    return this;
  }
  withdraw(ammount) {
    if (!this.account) {
      console.log("please put your pin and card");
    } else {
      this.account.withdraw(ammount);
    }
    return this;
  }
  transfer(idNumber, moneyOut) {
    if (!this.account) {
      console.log("please put your pin and card");
    }
    if (!this.user_db.has(idNumber)) {
      console.log(`${idNumber} is not exist `);
    } else {
      const toUser = this.user_db.get(idNumber);
      this.account.transfer(toUser, moneyOut);
    }
    return this;
  }
}
class UserDatabase {
  constructor() {
    this.user_db = new Map();
  }
  createUser(name, idNumber, password, phone, deposit) {
    if (this.user_db.has(idNumber)) {
      console.log("user already exist");
    } else {
      const newUser = new User(name, idNumber, password, phone, deposit);
      this.user_db.set(idNumber, newUser);
      console.log(
        `congratulation you succesfully create new account with account number:${newUser.accountNumber}`
      );
    }
    return this;
  }
  forgetPassword(idNumber, newPassword) {
    if (!this.user_db.has(idNumber)) {
      console.log("user is nots exist");
    } else {
      const user = this.user_db.get(idNumber);
      user.password = newPassword;
      console.log("succesfully create new password");
    }
    return this;
  }
}
class User {
  constructor(name, idNumber, password, phone, deposit) {
    this.name = name;
    this.phone = phone;
    this.idNumber = idNumber;
    this.password = password;
    this.accountNumber =
      name.substring(0, 2) + idNumber.substring(0, 4) + phone.substring(0, 2);
    this.checkingAccount = new CheckingAccount(deposit);
  }
}
class CheckingAccount {
  constructor(ammount) {
    this.ammount = ammount;
  }
  checkAmmount() {
    return this.ammount;
  }
  // Money In
  deposit(moneyIn) {
    this.ammount += moneyIn;
    console.log(`you succesfully deposit money with ammount;${moneyIn}`);
    return this;
  }
  receive(moneyIn, user) {
    this.ammount += moneyIn;
    console.log(
      `you succesfully reveive money with ammount:${moneyIn} from ${user.name} `
    );
    return this;
  }
  // Money out
  withdraw(moneyOut) {
    this.ammount -= moneyOut;
    console.log(`you succesfully withdraw money with ammount;${moneyOut}`);
    return this;
  }
  transfer(toUser, moneyOut) {
    if (!toUser) {
      console.log(`account with:${toUser.idNumber} is not exist`);
    } else {
      this.ammount -= moneyOut;
      toUser.checkingAccount.ammount += moneyOut;
      console.log(
        `you succesfully tranfer money with ammount:${moneyOut} to ${toUser.idNumber} `
      );
    }

    return this;
  }
}
const user_db = new UserDatabase();
const atm_system = new AtmSystem(user_db);
const atm_system1 = new AtmSystem(user_db);
atm_system.createUser(
  "farell febriano",
  "34wer34",
  "password",
  "3085290651",
  1000
);
atm_system.createUser(
  "Rafael Delano",
  "34erer4",
  "password",
  "3085290651",
  1000
);
console.log("user_db", user_db.user_db);
atm_system
  .checkAmmount()
  .logIn("34wer34", "password")
  .transfer("34erer4", 50)
  .checkAmmount()
  .logIn("34erer4", "password")
  .checkAmmount()
  .transfer("34wer34", 150)
  .checkAmmount()
  .withdraw(70)
  .checkAmmount();
