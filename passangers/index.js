/**
 *
 * Define Classes:
 * Create classes to represent flights and passengers. Each flight should have attributes such\
 * as flight number, departure city, destination city, departure time, available seats, etc.
 * Each passenger should have attributes like name, contact information, and seat number.
 * mplement Functionality:

1.) Allow passengers to book tickets for flights:
    - This method should check if there are available seats on the
    specified flight and assign a seat to the passenger if available.

2.) Display available seats for a given flight:
    - This method should show the available seats for a specific flight so passengers can choose their preferred seat.

3.) Cancel reservations for a flight:
    -This method should allow passengers to cancel their reservations and free up their seats.

4.) Display passenger information for a specific flight:
    -This method should display the list of passengers along with their seat numbers for a specific flight.

5.) Error Handling:
    -Implement error handling mechanisms to handle
    cases such as invalid flight numbers, attempting to book a seat that
    is already occupied, or trying to cancel a reservation that doesn't exist.

6.) Data Storage:
    -Consider how you will store flight and passenger data. You can use data
    structures like dictionaries or arrays to store flight information and
    passenger reservations.

NVT

NOUN

passengers
flights
seats

verb
-
-
-
-

Relatioinship

flights
 - seats available (dependent relationship with the flight)
 - passengers (independent relationship)

- Display available seats
- Cancel reservations for a flight
- Display passenger information for a specific flight

passengers
- name
- phone
- address
 -seats properties/attribute
 -flights properties/attribute

 -

flightSystem
    - flight 1:n
    - book ticker

    book reservation
    Cancel reservations for a flight



PassangerSystem
    - passangers 1:n

    - find specifict consumer
    -


 */

class AirPortSystem {
  constructor(PassangersSystemInstance) {
    this.flights = new Map();
    this.passangers = PassangersSystemInstance;
  }
  createFlights(airPort, flightId, from, to) {
    if (this.flights.has(flightId)) {
      console.log(`flight is already exist`);
    } else {
      const newFlights = new Flight(airPort, flightId, from, to);
      this.flights.set(flightId, newFlights);
    }
    return this;
  }
  bookFlight(flightId, passanger, seat) {
    if (!this.flights.has(flightId)) {
      console.log(`flight is not exists`);
    } else {
      const flight = this.flights.get(flightId);
      flight.book(passanger, seat);
    }
    return this;
  }
  cancelFlight(passanger) {
    if (!passanger.flightID) {
      console.log("passanger dosent have any flights");
      return this;
    } else {
      const flight = this.flights.get(passanger.flightID);
      flight.cancel(passanger);
      return this;
    }
  }
  disPlaySeats(flightID) {
    if (!this.flights.has(flightID)) {
      console.log(`flight is not exists`);
    } else {
      const flight = this.flights.get(flightID);
      console.log(flight.availabeSeats());
    }
    return this;
  }
  getPassanger(phone) {
    this.passangers.getPassangerInfo(phone);
    return this;
  }
}
class PassangerSystem {
  constructor() {
    this.passangers = new Map();
  }
  createPassanger(name, phone, addres) {
    if (this.passangers.has(phone)) {
      console.log("user has already created");
    } else {
      const newPassanger = new Passanger(name, phone, addres);
      this.passangers.set(phone, newPassanger);
      return newPassanger;
    }
    return this;
  }
  getPassangerInfo(phone) {
    if (this.passangers.has(phone)) {
      console.log(this.passangers.get(phone));
    } else {
      console.log("passanger is not exist");
    }
    return this;
  }
}
class Passanger {
  constructor(name, phone, addres) {
    this.name = name;
    this.phone = phone;
    this.addres = addres;
    this.flightID = undefined;
    this.seat = undefined;
  }
}
class Flight {
  constructor(airPort, flightId, from, to) {
    this.airPort = airPort;
    this.flightId = flightId;
    this.from = from;
    this.to = to;
    this.seats = new Seats();
    this.passagers = new Map();
  }
  book(passager, seat) {
    this.seats.setseat(passager, seat, this.flightId);
    this.passagers.set(passager, passager);
    return this;
  }
  cancel(passager) {
    if (this.passagers.has(passager)) {
      this.passagers.delete(passager);
      this.seats.unSeat(passager);
    }
  }

  availabeSeats() {
    return this.seats.disAvailableSeats();
  }
}
class Seats {
  constructor() {
    //seats properties/attribute
    this.seats = this.#initSeats();
  }
  #initSeats() {
    const listRow = ["A", "B", "C"];
    const map = new Map();
    for (let char of listRow) {
      for (let i = 1; i < 4; i++) {
        map.set(`${char}${i}`, false);
      }
    }
    return map;
  }
  #isOcupied(seat) {
    return this.seats.get(seat);
  }
  setseat(passager, seat, flightId) {
    if (!this.#isOcupied(seat)) {
      this.seats.set(seat, passager);
      passager.seat = seat;
      passager.flightID = flightId;
    } else {
      console.log(`seat ${seat} occupied`);
    }
    return this;
  }
  unSeat(passager) {
    this.seats.set(passager.seat, false);
    passager.seat = undefined;
    passager.flightID = undefined;
    return this;
  }
  disAvailableSeats() {
    return Array.from(this.seats);
  }
}

const passangerSystem = new PassangerSystem();
const flightSystem = new AirPortSystem(passangerSystem);
flightSystem.createFlights(
  "American Airlines",
  "6789efawef789",
  "Nebraksa",
  "Texas"
);
const passanger1 = passangerSystem.createPassanger(
  "farell",
  "3085290651",
  "garland 33 medision"
);
const passanger2 = passangerSystem.createPassanger(
  "Rafael",
  "3086349871",
  "Texas 33 medision"
);
flightSystem.bookFlight("6789efawef789", passanger1, "A1");
flightSystem.cancelFlight(passanger1);
flightSystem.bookFlight("6789efawef789", passanger2, "A1");
flightSystem.getPassanger("3085290651");
flightSystem.getPassanger("3086349871");
