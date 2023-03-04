# sprint2.md

**Sprint Goal**

For this sprint, our goal is to implement forgot password, SSO login, name and price extraction, and the tracking info page features.

<br>

**Spikes**

No spikes encountered 

<br>

**Standup details**
* Time: ~ 3:30 pm EST
* Date: February 20th, 2023
* Location: Online via Discord

<br>

**Participants**

| Member      | Attended |
| ----------- | -----------|
|Taha|yes|
|Ishav|yes|
|Ethan|yes|
|Mustafa|yes|
|Justin|yes|
|Ovidiu|yes|
|Ryan|yes|

<br>

**Team Capacity**

Each team member pledges to contribute to at least 1 user story

| Member      | Story Points pledged |
| ----------- | -----------|
|Taha and Justin|13|
|Ishav|3|
|Ethan|3|
|Mustafa and Ovidiu|8|
|Ryan|5|

<br>

**User Story Decisions**

| User Story  | Story Acceptance Criteria |Story Points|
| ----------- | -----------|---|
|User story 6: Forgot Password|<ul><li>Upon clicking forgot password in the login UI, another form UI should prompt the user to enter their new password and retype their new password</li><li>The user should receive an email to the email associated with their account that has a code</li><li>The user needs to input this code under the password fields and then click the change password button for their password to be reset</li><li>Upon successful reset, the form UIs should disappear, the user should get a quick tooltip that reads "password changed", and they should be logged in</li></ul>|3|
|User Story 7: SSO login|<ul><li>Give the user the option to login with their google account in a single click</li><li>This option should be in the sign in form at the bottom labeled by "sign in with" and then the options stated above as icons</li></ul>|5|
|User story 1: tracking page|<ul><li>When the user clicks our extension icon in their web browser, a small "toolbox" panel should come up</li><li>In the panel, when a user clicks a button/icon link, it should open a new tab that displays all the items they're tracking and all their related data (seller name, price, etc.)</li><li>The tracking page should show all the data (item list) that the user is tracking</li><li>The user should be able to delete an item</li></ul>|8|
|User Story 8: extract name and price|<ul><li>Like in user story 2, when clicking the add item button, a UI form to create the item pops up (input fields: item name, item price). These input fields should be read only</li><li>On the item name field, there should be a clickable "select item name" tooltip</li><li>When the tooltip is clicked, (just like the AdBlock feature to select an element on the page to block) the user should be able to hover anywhere on the page to select the DOM element that contains the item's name.</li><li>After the user selects the element containing the name of the product, the name field should be filled with the name and another tooltip should pop up on top of the "item price" field, that when clicked, should prompt the user to select the DOM element that has the price. After selection, the price field should be filled automatically with the selected price.</li><li>After they hit "save item", the item is added to their profile's tracking page and the tracking info (DOM elements) are sent to server.</li></ul>|13|

<br>
<br>

**User Story Task Breakdown**

<br>

**User Story 8: extract name and price then track**

|Subtask|Description|
|--|--|
|Element selector|Implement a small library which extracts an HTML element under the cursor.|
|Tooltips|Using the element selector library, implement tooltips which insert the name / price into the proper fields.|
|Backend|<ul><li>Add fields to the Item model which stores the HTML elements.</li><li>Add optional fields to the Item serializer to accommodate new attributes in payload</li></ul>|

<br>

**User Story 6: Forgot password**

|Subtask|Description|
|--|--|
|Implement Frontend|Create a button in the log in page that prompts the user to change their password|
|Implement Backend|Once the user types their email and new password, an email is sent to them, containing a generated code that they must enter to successfully change their password|

<br>

**User Story 7: SSO login**

|Subtask|Description|
|--|--|
|Frontend UI|Create a button that allows a user to sign in with their Google account.|
|Frontend Logic|Have a function that gets the signed in user’s account information. With that information, send a request to the backend to register or login in the user.|

<br>

**User Story 1: tracking page**

|Subtask|Description|
|--|--|
|Frontend Display Items|After calling the get-items endpoint, parse the response data into the tracking page by components where each component is an item that has a name, price, and url|
|Frontend Delete Item|Have a delete item button next to each item in the list so that the user can easily delete the item. Also includes a popup window verification in case the user accidentally clicked delete|
|Backend "get-items" Endpoint|Returns a json list of all the users' items specified by the URL argument item_id provided by the frontend|
|Backend "delete-item" endpoint|Deletes a user's item from the DB given the item_id in the delete request URL argument|
