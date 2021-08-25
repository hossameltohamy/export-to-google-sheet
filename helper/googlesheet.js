const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'keys.json', //the key file
  //url to spreadsheets API
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

//Auth client Object
const authClientObject = await auth.getClient();

//Google sheets instance
const googleSheetsInstance = google.sheets({
  version: 'v4',
  auth: authClientObject,
});
// spreadsheet id
const spreadsheetId = '1rvjuH2KtDN1ZTJVqNIT44DYR2A0nOONrjuTKd2nJuHQ';

//write data into the google sheets
await googleSheetsInstance.spreadsheets.values.append({
  auth, //auth object
  spreadsheetId, //spreadsheet id
  range: 'Sheet1!A:B', //sheet name and range of cells
  valueInputOption: 'USER_ENTERED', // The information will be passed according to what the usere passes in as date, number or text
  resource: {
    values: [['Git followers tutorial', 'Mia Roberts']],
  },
});
//Read front the spreadsheet
const readData = await googleSheetsInstance.spreadsheets.values.get({
  auth, //auth object
  spreadsheetId, // spreadsheet id
  range: 'Sheet1!A:A', //range of cells to read from.
});

//send the data reae with the response
response.send(readData.data);
