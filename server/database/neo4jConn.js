var neo4j = require("neo4j-driver")

const URI = process.env.neo4j_uri;
const USER = process.env.neo4j_user;
const PASSWORD = process.env.neo4j_pass

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
const session = driver.session()

module.exports = session