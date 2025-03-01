# Google Ads Exclusion Scripts

This is a collection of Google Ads scripts to enable exclusions at scale.
There are three scripts, one each for keywords, topics and placements

## Prerequisite

* Edit access to the Google Ads MCC
* Copy of the [Exclusions Template](https://docs.google.com/spreadsheets/d/1CCU-qP25-WQipgnHQ9y05DUrevmbUHT0cOnDcDJPuUk/copy) > Please request access by joining this [Google Group](https://groups.google.com/g/vnexclusionlist-external)
* For Placements Script, necessary exclusions must be added to an MCC level Placement Exclusion list


## Impact:

**Accounts List script:**

A separate Google Sheet (named “[<MCC account name>] Account List”) is created with a list of sub-account IDs in the MCCs

**Keywords Exclusion script:**

A negative keyword list called “[Script-Created] Exclusion List” will be created across all sub-accounts.
Keywords will be added in these lists from a advertiser-maintained list following the specific template.
That Negative keywords list will be applied to all Search, Display, Video and Shopping Campaigns under each sub-account.

**Topics Exclusion script:**

The listed topics (that have matching topic IDs) will be added to all Display and Video campaigns under each managed account

**Placements Exclusion script:**
The placements (website, YT channel and YT video) will be read from an MCC-level Placement Exclusion list, and individually added to all Display and Video campaigns under each child account of the MCC. 

*Note:*

* Account List script must run successfully at least once before running any other scripts

## How to use:

* Create a new Google Ads script in your Google Ads MCC
* Copy the contents of the relevant script file in the newly generated Code.gs file
* Where needed, replace `INSERT_SPREADSHEET_URL_HERE` with the link to your copy of the 
exclusion list template (Only replace the line with the comment 'Replace Here' against it)
