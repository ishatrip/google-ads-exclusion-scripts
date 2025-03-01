/**
 * URL of the accounts list template sheet
 */
const TEMPLATE = {
  'url': 'https://docs.google.com/spreadsheets/d/158vvN73QkXIc_Xof0r591autQ1pFlYPBV-pyGV1nnyc/'
}

/**
 * List of email recipients for the URL of the new sheet
 */
const EMAIL_RECIPIENTS = [
  // Add email ids here, e.g.
  // 'test1@test.com', 'test2@test.com'
]

/** 
 * main function to run when the script executes
 */
function main() {
  let account = {
    'mcc_id': AdsApp.currentAccount().getCustomerId(),
    'name': AdsApp.currentAccount().getName(),
    'account_ids': []
  };
  const managedAccountsIterator = AdsManagerApp.accounts().get();
  
  while(managedAccountsIterator.hasNext()) {
    let managedAccount = managedAccountsIterator.next();    
    
    account.account_ids.push([managedAccount.getCustomerId()]);    
  }
  if(!AdsApp.getExecutionInfo().isPreview()) {  
    writeToTrix(account);
  } else {
    console.log('Cannot write to file in Preview mode')
  }
}

/**
 * Function to write child account ids in the Google Sheet
 * 
 * @param {Object} account object containing specifics of parent MCC and child account ids
 */
function writeToTrix(account) {
  let sheetToWrite = findOrCreateFileInDrive('[' + account.name + '] Account List');
  
  let accountsSheet = sheetToWrite.getSheetByName('Accounts');
  
  let numOfAccounts = account.account_ids.length;
  
  accountsSheet.getRange('A2').setValue(account.mcc_id);
  accountsSheet.getRange(2,2, numOfAccounts).setValues(account.account_ids); 
 
  console.log('Updated Accounts list')
}

/**
 * Function to find or create a file with the given name 
 * 
 * @param  {string} name name of the file to be retrieved
 * @returns {Spreadsheet} A spreadsheet object representing the retrieved or created document
 */
function findOrCreateFileInDrive(name) {
  const files = DriveApp.getFilesByName(name);
  if (files.hasNext()) {
    let existingSheet = files.next();
    console.log('Fetched file with name', name, 'at ', existingSheet.getUrl());
    return SpreadsheetApp.open(existingSheet)
  } else {
      let newSheet = SpreadsheetApp.openByUrl(TEMPLATE.url).copy(name);
      let url = newSheet.getUrl();

      sendEmail(name, url);
      console.log('Created new file with the name ', name, 'at ', url)
      return newSheet
  }
}

/**
 * Sends an email to the configured email ids 
 * when the file is created the first time
 * 
 * @param {string} name Name of the created file
 * @param {string} url URL of the created file
 */
function sendEmail(name, url) {
  EMAIL_RECIPIENTS.foreach(recipient =>
                           MailApp.sendEmail(recipient,
                                             '[Google Ads Script] New file created', 
                                             `The Accounts List file with the name ${name} was created at ${url}`)
                          )    
}