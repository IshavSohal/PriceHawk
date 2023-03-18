# sprint3.md

<br>

**Sprint Goal:**

For this sprint our goal is to implement semi-automated price tracking, user profile updates, price history graphs, and password resets.

<br>

**Spikes**

No spikes encountered 

<br>

**Standup details:**

* Time: ~ 7:30 pm EST
* Date: March 10th, 2023
* Location: Online via Discord

<br>

|Member|Task|
|--|--|
|Taha|User story 16|
|Ishav|User story 6 |
|Mustafa|User story 19|
|Justin|User story 12|
|Ovidiu|User story 19|
|Ryan|User Story 15|

<br>

**Team Capacity:**

Each team member pledges to contribute to at least 1 user story.

|Member|Story Points pledged|
|--|--|
|Justin|3|
|Ishav|3|
|Taha|8|
|Mustafa and Ovidiu|5|
|Ryan|3|

<br>

**User Story Decisions:**

|User Story|Story Acceptance Criteria|Story Points|
|--|--|--|
|User story 6: Forgot Password|<ul><li>Upon clicking forgot password in the login UI, another form UI should prompt the user to enter their new password and retype their new password</li><li>The user should receive an email to the email associated with their account that has a code</li><li>The user needs to input this code under the password fields and then click the change password button for their password to be reset</li><li>Upon successful reset, the form UIs should disappear, the user should get a quick tooltip that reads "password changed", and they should be logged in</li></ul>|5|
|User Story 16: Price History of Item|<ul><li>Show the price history of items using a graph API</li><li>For each item, the x-axis on the graph should display (by default) the total time elapsed since monitoring (by hours, days, months, or years)</li><li>The y-axis represents the pricing of the item</li><li>Each line in the graph represents a source/seller and should be labeled with the seller's name</li><li>The user should be able to see the graph pop up in their tracking info page beside the item if they click a "price history" button beside their item</li><li>Should only be available for registered users</li></ul>|8|
|User story 19: Data Filtering and Sorting|<ul><li>On the user's tracking page, beside each of the user’s tracked items we show the source with the lowest price *On the pro version, the user has a data filter for each item. For each item, the user can sort the sources by ascending/descending prices, sort the sources by ascending/descending first date created or last modified (if a price for a source changes), and sort the sources by "most/least volatile" (sources that had the greatest/least price change difference (compared to their previous price listing))</li><li>Also on the pro version, the user can sort each item ascending/descending by price (which would relocate item objects vertically along with all their sources)</li></ul>|5|
|User Story 12: Price Tracking|<ul><li>At some set interval (12 hours for basic users, 1 hour for pro users), rescan the stored item’s price and update it if there's a change.</li><li>If an item has multiple sellers, update the price of each seller</li></ul>|5|
|User Story 15: Account/Other Settings|<ul><li>There should be a separate page dedicated to changing the user’s account/app settings.</li><li>Setting options include: changing password, changing email, enabling/disabling email push notification, and setting the time frame of what is considered a new change (12h, 6h, 1h, etc..)</li></ul>|3|

<br>

## User Story Task Breakdown

#### User Story 12: Price Tracking

|Subtask|Description|
|--|--|
|User-initiated updates|<ul><li>Create a button which initiates a price update.</li><li>Create an API endpoint which begins the price update.</li><li>Create a library which retrieves the relevant webpage, parses it, and extracts the price.</li></ul>|
|Scheduled updates|Create a scheduler which updates prices every 12 hours.|

<br>

#### User story 16: Price History of Items

|Subtask|Description|
|--|--|
|Frontend UI|<ul><li>Component for displaying the price history of an item in a line graph over time passed</li><li>y axis should be the price</li><li>x axis should be the time</li><li>A main page with dynamic url based on item id</li></ul>|
|Backend|<ul><li>Price Model with many to one relationship with Items</li><li>Should have fields: Item (item price belongs to), Value (price value), Date created</li><li>Create Price on Item creation</li><li>Endpoint for getting all the prices of an item</li></ul>|

<br>

#### User Story 6: Forgot password

|Subtask|Description|
|--|--|
|Implement Frontend|Create a button in the log in page that prompts the user to change their password|
|Implement Backend|Once the user types their email and new password, an email is sent to them, containing a generated code that they must enter to successfully change their password|

<br>

#### User Story 19: Data Filtering and Sorting

|Subtask|Description|
|--|--|
|frontend|<ul><li>Highlight the lowest priced vendor for each item with a green border with small text near the border saying “cheapest”</li><li>A “filter by” dropdown with price, recently updated price, and recently added as options</li></ul>|
|backend|<ul><li>For each item, show the lowest priced vendor</li><li>Sort vendors within each item by prices (top to bottom, top lowest, bottom highest), most recently updated vendor price (mru at the top), and date the vendor was added to the item</li></ul>|

<br>

#### User Story 15: Account/Other Settings

|Subtask|Description|
|--|--|
|Backend|Add endpoint to allow for the user model to be updated with new values and other changes to the serializers, models and views to facilitate that|
|Frontend|Add a page that allows the user to edit their account information and other settings|

