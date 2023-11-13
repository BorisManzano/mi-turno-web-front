import { faker } from "@faker-js/faker";

const USERS = [
  {
    id: 1,
    name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    dni: "123456789",
    password: "hashedpassword1",
    salt: "somesalt1",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 2,
    name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    dni: "987654321",
    password: "hashedpassword2",
    salt: "somesalt2",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 3,
    name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    dni: "555555555",
    password: "hashedpassword3",
    salt: "somesalt3",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 4,
    name: "Bob",
    last_name: "Williams",
    email: "bob.williams@example.com",
    dni: "111111111",
    password: "hashedpassword4",
    salt: "somesalt4",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 5,
    name: "Eva",
    last_name: "Anderson",
    email: "eva.anderson@example.com",
    dni: "222222222",
    password: "hashedpassword5",
    salt: "somesalt5",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 6,
    name: "David",
    last_name: "Johnson",
    email: "david.johnson@example.com",
    dni: "333333333",
    password: "hashedpassword6",
    salt: "somesalt6",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 7,
    name: "Linda",
    last_name: "Clark",
    email: "linda.clark@example.com",
    dni: "444444444",
    password: "hashedpassword7",
    salt: "somesalt7",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 8,
    name: "Michael",
    last_name: "Jones",
    email: "michael.jones@example.com",
    dni: "555555555",
    password: "hashedpassword8",
    salt: "somesalt8",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 9,
    name: "Sophia",
    last_name: "Martin",
    email: "sophia.martin@example.com",
    dni: "666666666",
    password: "hashedpassword9",
    salt: "somesalt9",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 10,
    name: "Chris",
    last_name: "Taylor",
    email: "chris.taylor@example.com",
    dni: "777777777",
    password: "hashedpassword10",
    salt: "somesalt10",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 11,
    name: "Olivia",
    last_name: "White",
    email: "olivia.white@example.com",
    dni: "888888888",
    password: "hashedpassword11",
    salt: "somesalt11",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 12,
    name: "Daniel",
    last_name: "Harris",
    email: "daniel.harris@example.com",
    dni: "999999999",
    password: "hashedpassword12",
    salt: "somesalt12",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 13,
    name: "Emily",
    last_name: "Young",
    email: "emily.young@example.com",
    dni: "121212121",
    password: "hashedpassword13",
    salt: "somesalt13",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 14,
    name: "Ryan",
    last_name: "Scott",
    email: "ryan.scott@example.com",
    dni: "131313131",
    password: "hashedpassword14",
    salt: "somesalt14",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 15,
    name: "Ava",
    last_name: "Walker",
    email: "ava.walker@example.com",
    dni: "141414141",
    password: "hashedpassword15",
    salt: "somesalt15",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 16,
    name: "Matthew",
    last_name: "Evans",
    email: "matthew.evans@example.com",
    dni: "151515151",
    password: "hashedpassword16",
    salt: "somesalt16",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 17,
    name: "Chloe",
    last_name: "Ward",
    email: "chloe.ward@example.com",
    dni: "161616161",
    password: "hashedpassword17",
    salt: "somesalt17",
    isAdmin: true,
    isOperator: false,
  },
  {
    id: 18,
    name: "Brian",
    last_name: "Barnes",
    email: "brian.barnes@example.com",
    dni: "171717171",
    password: "hashedpassword18",
    salt: "somesalt18",
    isAdmin: false,
    isOperator: true,
  },
  {
    id: 19,
    name: "Grace",
    last_name: "Parker",
    email: "grace.parker@example.com",
    dni: "181818181",
    password: "hashedpassword19",
    salt: "somesalt19",
    isAdmin: false,
    isOperator: false,
  },
  {
    id: 20,
    name: "Owen",
    last_name: "Reed",
    email: "owen.reed@example.com",
    dni: "191919191",
    password: "hashedpassword20",
    salt: "somesalt20",
    isAdmin: false,
    isOperator: false,
  },
];

const RESERVATIONS = [
  {
    user_id: 1,
    date: "2023-11-13T18:30:00",
    sucursal_id: 101,
    reservationNumber: 12345,
  },
  {
    user_id: 2,
    date: "2023-11-14T20:00:00",
    sucursal_id: 102,
    reservationNumber: 54321,
  },
  {
    user_id: 3,
    date: "2023-11-15T19:15:00",
    sucursal_id: 103,
    reservationNumber: 98765,
  },
  {
    user_id: 4,
    date: "2023-11-16T17:45:00",
    sucursal_id: 101,
    reservationNumber: 67890,
  },
  {
    user_id: 5,
    date: "2023-11-17T21:30:00",
    sucursal_id: 102,
    reservationNumber: 24680,
  },
  {
    user_id: 1,
    date: "2023-11-18T18:00:00",
    sucursal_id: 103,
    reservationNumber: 13579,
  },
  {
    user_id: 6,
    date: "2023-11-19T19:45:00",
    sucursal_id: 101,
    reservationNumber: 11223,
  },
  {
    user_id: 2,
    date: "2023-11-20T20:30:00",
    sucursal_id: 102,
    reservationNumber: 44556,
  },
  {
    user_id: 7,
    date: "2023-11-21T17:15:00",
    sucursal_id: 103,
    reservationNumber: 77889,
  },
  {
    user_id: 3,
    date: "2023-11-22T18:45:00",
    sucursal_id: 101,
    reservationNumber: 99011,
  },
  {
    user_id: 8,
    date: "2023-11-23T19:30:00",
    sucursal_id: 102,
    reservationNumber: 11234,
  },
  {
    user_id: 4,
    date: "2023-11-24T20:15:00",
    sucursal_id: 103,
    reservationNumber: 55667,
  },
  {
    user_id: 9,
    date: "2023-11-25T21:00:00",
    sucursal_id: 101,
    reservationNumber: 88990,
  },
  {
    user_id: 5,
    date: "2023-11-26T17:30:00",
    sucursal_id: 102,
    reservationNumber: 11222,
  },
  {
    user_id: 10,
    date: "2023-11-27T18:15:00",
    sucursal_id: 103,
    reservationNumber: 33445,
  },
  {
    user_id: 6,
    date: "2023-11-28T19:00:00",
    sucursal_id: 101,
    reservationNumber: 11222,
  },
  {
    user_id: 11,
    date: "2023-11-29T20:00:00",
    sucursal_id: 102,
    reservationNumber: 55678,
  },
  {
    user_id: 7,
    date: "2023-11-30T21:30:00",
    sucursal_id: 103,
    reservationNumber: 99887,
  },
  {
    user_id: 12,
    date: "2023-12-01T17:45:00",
    sucursal_id: 101,
    reservationNumber: 34567,
  },
  {
    user_id: 8,
    date: "2023-12-02T18:30:00",
    sucursal_id: 102,
    reservationNumber: 89012,
  },
];

const BRANCHES = [
  {
    id: 101,
    name: "Sucursal A",
  },
  {
    id: 102,
    name: "Sucursal B",
  },
  {
    id: 103,
    name: "Sucursal C",
  },
  {
    id: 104,
    name: "Sucursal D",
  },
  {
    id: 105,
    name: "Sucursal E",
  },
  {
    id: 106,
    name: "Sucursal F",
  },
  {
    id: 107,
    name: "Sucursal G",
  },
  {
    id: 108,
    name: "Sucursal H",
  },
  {
    id: 109,
    name: "Sucursal I",
  },
  {
    id: 110,
    name: "Sucursal J",
  },
  {
    id: 111,
    name: "Sucursal K",
  },
  {
    id: 112,
    name: "Sucursal L",
  },
  {
    id: 113,
    name: "Sucursal M",
  },
  {
    id: 114,
    name: "Sucursal N",
  },
  {
    id: 115,
    name: "Sucursal O",
  },
  {
    id: 116,
    name: "Sucursal P",
  },
  {
    id: 117,
    name: "Sucursal Q",
  },
  {
    id: 118,
    name: "Sucursal R",
  },
  {
    id: 119,
    name: "Sucursal S",
  },
  {
    id: 120,
    name: "Sucursal T",
  },
];

class FakeData {
  constructor() {
    this.users = USERS;
    this.reservations = RESERVATIONS;
    this.branches = BRANCHES;
  }
  getUserReservations = (user_id) => {
    const results = [];
    results = this.reservations.filter((reservation) => reservation.user_id == user_id);
    return results;
  }
  getBranch = (branch_id) => { return this.branches.filter((branch) => branch.id == branch_id) };
  getUser = (user_id) => { return this.users.filter((user) => user.id == user_id) }
  getUsers = () => this.users;
  getBranches = () => this.branches;
  getReservations = () => this.reservations;
}

export default new FakeData();