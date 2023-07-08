
const { Pool, Client } = require("pg");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "personalprojects",
  password: "postgres",
  port: 5432
};

// Connect with a connection pool.

async function poolDemo() {
  pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}


// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}

// Use a self-calling function so we can use async / await.

// (async () => {
//   const poolResult = await poolDemo();
//   console.log("Time with pool: " + poolResult.rows[0]["now"]);

//   const clientResult = await clientDemo();
//   console.log("Time with client: " + clientResult.rows[0]["now"]);
// })();

async function registerPerson(person) {

    const pool = new Pool(credentials);

    const text1 = `SELECT * FROM rs_notification_service.application`;
    // const res = await pool.query(text1);

    // await pool.end();
    // console.log('Result : ' + res.rows[0]["name"]);


    const text = `
      INSERT INTO rs_notification_service.people (fullname, gender, phone, age)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [person.fullname, person.gender, person.phone, person.age];

    return pool.query(text, values);
}

(async () => {
    // Register a new user and get an id, which comes from the RETURNING clause.

    const registerResult = await registerPerson({
      fullname: "Jane Doe",
      gender: "F",
      phone: "5555555555",
      age: 29,
    });
    // const personId = registerResult.rows[0]["id"];
    // console.log("Registered a person with id: " + personId);
  

    // Obtain the full person object from the database.
    // const getPersonResult = await getPerson(personId);
    // console.log(
    //   "Result of SELECT query for person '" +
    //     personId +
    //     "': " +
    //     JSON.stringify(getPersonResult.rows[0], null, "  ")
    // );
})();


module.exports = {
    Pool,
    Client,
    credentials
}