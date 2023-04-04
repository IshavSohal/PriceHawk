# sprint4.md

<br>

**Sprint Goal:**

For this sprint our goal is to implement scheduled price updates, email notifications for price changes, guest user migration, how users see their item data (multiple vendors per item and filtering/sorting), and password resets

<br>

**Spikes**

No spikes encountered 

<br>

**Standup details:**

* Time: ~ 6:20 pm EST
* Date: March 23th, 2023
* Location: Online via Discord

<br>

|Member|Task|
|--|--|
|Taha|User story 22, 14|
|Ishav|User story 6, 14|
|Mustafa|User story 19, 17|
|Justin|User story 12|
|Ovidiu|User story 11, 19|
|Ryan|User Story 23, 3, 11|

<br>

**Team Capacity:**

Each team member pledges to contribute to at least 1 user story.

<br>

**User Story Decisions:**

|User Story|Story Acceptance Criteria|Story Points|
|--|--|--|
|User story 6: Forgot Password|<ul><li>Upon clicking forgot password in the login UI, another form UI should prompt the user to enter their new password and retype their new password</li><li>The user should receive an email to the email associated with their account that has a code</li><li>The user needs to input this code under the password fields and then click the change password button for their password to be reset</li><li>Upon successful reset, the form UIs should disappear, the user should get a quick tooltip that reads "password changed", and they should be logged in</li></ul>|3|
|User Story 14:Notify Price Changes|<ul><li>The user should get an email notification to the email linked to their account (if enabled) upon a price change</li><li>This feature is enabled in the settings tab (see user story 15)</li><li>For user initiated updates, alert the user of a price change via the extension.</li></ul>|3|
|User Story 12: Price Tracking|At a user-configurable timeframe, rescan the stored item’s price and update it if there's a change.|5|
|User story 11: Tracking Page: Item Organization (multiple sellers per item)|If a user has multiple items with the same name, those items should be organized so that the item name appears on the dropdown, and inside the dropdown all the vendors for that item should appear in a table. All previous functionality remains the same: each row in the table in the dropdown is the same as the row in the previous view where all items would be displayed in a single table (refresh, delete, price history)|5|
|User story 19: Data Filtering and Sorting|<ul><li>For each item, the user can sort the vendors by ascending/descending prices, by ascending/descending first date created or by vendors that had a recent price update (after a certain date inputted by user)</li><li>The sorting and filter should only apply to the vendors within the item dropdown</li></ul>|5|
|User Story 23: Guest User Migration|If the guest user has any data stored and they had just made an account or signed in with an SSO, their data should be transferred to the server.|3|
|User story 3: Guest User|By default, users of the extension should be "signed in" as guests and be able to add items to track right away, so, in the top of the toolbox panel, the user's given guest ID should be visible (user6, user5974, ...)|1|

<br>

## User Story Task Breakdown

#### User Story 12: Price Tracking

|Subtask|Description|
|--|--|
|User-initiated updates|<ul><li>Create a button which initiates a price update.</li><li>Create an API endpoint which begins the price update.</li><li>Create a library which retrieves the relevant webpage, parses it, and extracts the price.</li></ul>|
|Scheduled updates|Create a scheduler which updates prices on a user-configurable timeframe.|

<br>

#### User Story 14: Notify Price Changes

|Subtask|Description|
|--|--|
|Implement frontend|<ul><li>Create a refresh button that, when clicked, updates the prices of the items which received a price change</li><li>Have an alert that appears if the price of an item(or items) has changed once the refresh for an item's price is done. It should showcase a message indicating which items experienced a price change. </li></u>|
|Implement backend|Once a price change occurs, send an email to the user regarding this|

<br>


#### User Story 6: Forgot password

|Subtask|Description|
|--|--|
|Implement Frontend|Create a button in the log in page that prompts the user to change their password|
|Implement Backend|Once the user types their email and new password, an email is sent to them, containing a generated code that they must enter to successfully change their password|

<br>

#### User story 11: Tracking Page: Item Organization (multiple sellers per item)

|Subtask|Description|
|--|--|
|Implement Frontend|Every item with the same name is grouped into a dropdown (labeled by that name) and every vendor (duplicate items (same name)) is displayed within a row in a table in the dropdown|
|Implement Backend|Endpoint returns a reformatted json list of items where the list is a list of objects (item's name) where each object has a list of vendors|

<br>

#### User Story 19: Data Filtering and Sorting

|Subtask|Description|
|--|--|
|frontend|The sorting and filter should only apply to the vendors within the item dropdown. So every item should have their own filtering options and so the filters must be displayed whitin each dropdown|
|backend|Endpoints for all sort/filter features: sort the vendors by ascending/descending prices, by ascending/descending first date created or by vendors that had a recent price update (after a certain date inputted by user).|

<br>

#### User Story 23: Guest User Migration

|Subtask|Description|
|--|--|
|Backend|Add endpoint to allow for the items belonging a guest user to change ownership to a new user|
|Frontend|Add logic so that when a user creates a new account, their guest data gets transferred to the new account.|

<br>

#### User story 3: Guest User

|Subtask|Description|
|--|--|
|Backend & Frontend|Display the guest user id at the top of the extension toolbox page|

<br>



