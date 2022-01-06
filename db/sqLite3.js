const path=require('path')
const dirDB=path.normalize(__dirname + "/db/")
const dirFilename = require(dirDB+'sqLite3.js')
const options = {
    client: 'sqlite3',
    connection: {
        filename: dirFilename
    }
}
module.exports = {options};