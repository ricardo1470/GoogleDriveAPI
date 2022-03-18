const spreadsheetId = '1wiSszIRLh_R4DRlU6blnzY1r4-M4u1R0C0r_c2Msywo';

    const getRows = await sheets.spreadsheets.values.get({
        auth: oauth2Client,
        spreadsheetId,
        range: 'Hoja 1!A2:F',
    });

    await googleSheetsInstance.spreadsheets.values.append({
        auth, //auth object
        spreadsheetId, //spreadsheet id
        range: "Sheet1!A7:Z", //sheet name and range of cells
        valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
        resource: {
            values: [
                [name, activity, description, hour]
            ]
        },
    }, (err, result) => {
        if (err) {
            // Handle error.
            console.log(err);
        } else {
            console.log(`${result} cells appended.`);
        }
    });