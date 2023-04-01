### User story 1: Extension Tool Panel and Tracking Info Page
Regardless of being a basic or pro user, I need a small panel to pop up when I click on the extension in my browser with all the tools necessary to begin tracking an item's price. Within the panel, I also need a link that opens a new tab with all my tracking information. I need the panel to act like a toolbox so that when I'm browsing a website like amazon or eBay, I can easily open the tool panel to select an item to track. I need the tracking info page to monitor all my tracked items for price changes, price history, and other analysis. 

**Acceptance Criteria**  

* When the user clicks our extension icon in their web browser, a small "toolbox" panel should come up
* In the panel, when a user clicks a button/icon link, it should open a new tab that displays all the items they're tracking and all their related data (seller name, price, etc.)
*The tracking page should show all the data (item list) that the user is tracking.

### User story 2: Create/Add an Item to Track  
As a basic user that is a general consumer, I want to <ins>begin</ins> tracking an item's price on any website so that I know when its price dips in order to save money. As a pro user that is a business owner, I want to <ins>begin</ins> tracking an item's price from my competitor's website so I am able to price match or offer better deals.

**Acceptance Criteria**  
* There should be a new item button that, when clicked, a small UI form drops down with two text input fields ("item name" and "item price") and a "save item" button.
* The user should be able to manually input a name and a price. When the user hits "save item", that item should appear in the user's tracking info page (mentioned in user story 1. The data is stored according to user story 3 and 4/5).

### User story 3: Guest User
As a basic user and general consumer who uses the extension once in a while to lookout for sales, I should not be forced to go through the registration process to make an account (out of pure convenience).

**Acceptance Criteria** 
* By default, users of the extension should be "signed in" as guests and be able to add items to track right away
* In the top of the toolbox panel, the user's given guest ID should be visible (user6, user5974, ...) 


### User story 4: User Registration
As a basic user and general consumer that uses PriceHawk religiously who is pedantic about savings and is currently tracking a lot of items, or as a pro user and e-commerce student that is using PriceHawk to track multiple items to generate useful analysis for my assignments, I want to have an account on PriceHawk so that my data is securely stored on a server so I don't lose it.

**Acceptance Criteria** 
* The toolbox panel should have a register link if not signed in. Upon clicking the link, a small UI should come up in the panel that allows the user to register.
* Registration form: username, email, password, re-type password, captcha for bots
* Form should have proper validation and email confirmation


### User story 5: User Sign In
As a registered user, either pro or basic, I want to be able to sign into my account with ease (stay signed in / remember me) and assurance (knowing that my data is secured on the server) so that I feel like I am in control of my data and account.  

**Acceptance Criteria** 
* In the toolbox panel I should see a sign in option that when clicked, a small UI login comes up with username, password
* The login form should also have a stay signed in / remember me checkbox for the user's convenience (keeps users logged in)
* There should also be a forgot password link in the login form (see user story 6)
* There should be a SSO option in the login form to sign in with external accounts (see user story 7)


### User story 6: "Forgot Password" (for the login UI form)
As any type of user of PriceHawk (except for guest users), I am prone to lose my saved password (by accidental deletion or overwrite) or forget it (if I didn't save it in the first place) so I need a way to recover my account and reset my password if this happens. 

**Acceptance Criteria** 
* Upon clicking forgot password in the login UI, another form UI should prompt the user to enter their new password and retype their new password
* The user should receive an email to the email associated with their account that has a code
* The user needs to input this code under the password fields and then click the change password button for their password to be reset
* Upon successful reset, the form UIs should disappear, the user should get a quick tooltip that reads "password changed", and they should be logged in


### User story 7: SSO Login (for login UI/form)
As any type of user of PriceHawk (except for guest user), I should be able to login with other external emails I already have out of pure convenience to save myself the time and effort of having to go through the registration process.

**Acceptance Criteria** 
* Give the user the option to login with their google, apple, twitter, or Facebook accounts in a single click
* This option should be in the sign in form at the bottom labeled by "sign in with" and then the options stated above as icons

### User story 8: Extract Name and Price (continuation of user story 2)  
As any type of user of PriceHawk I want to be able to mark an item anywhere on a web page on any website so that I can monitor that item's price for my own reasons (whether its for marketing research, price matching my competitor, or simply trying to save money).

**Acceptance Criteria**  
* In user story 2, manually inputting a name and price after creating a new item to track, doesn't actually track the item's price since the server only has text and not the actual DOM element that contains the price (which would periodically need to be checked to update an item's price: see user story 12)
* Like in user story 2, when clicking the add item button, a UI form to create the item pops up (input fields: item name, item price). These input fields should be read only
* On the item name field, there should be a clickable "select item name" tooltip 
* When the tooltip is clicked, (just like the AdBlock feature to select an element on the page to block) the user should be able to hover anywhere on the page to select the DOM element that contains the item's name. 
* After the user selects the element containing the name of the product, the name field should be filled with the name and another tooltip should pop up on top of the "item price" field, that when clicked, should prompt the user to select the DOM element that has the price. After selection, the price field should be filled automatically with the selected price. 
* After they hit "save item", the item is added to their profile's tracking page and the tracking info (DOM elements) are sent to server.


### User story 9: Name and Price DOM Element Validation
As any type of user of PriceHawk, when I'm selecting the elements on the page that should contain the product's name and price, I want there to be a failsafe in case I accidentally select the wrong element so I don't have to restart the entire process by having to go to my tracking info page, deleting the item, and then starting all over again in the toolbox.  

**Acceptance Criteria**  

* After a user selects a DOM (supposed name or price), it should go through some basic validation to make sure it contains text (for product name) and a price point (currency symbol with number). 
* After basic validation passes, and before the input fields are automatically filled, prompt the user with "are you sure this is the item and its price?". If they select "yes", the fields are filled with what they selected (name and price). After they hit "save item", the item is added to their profile tracking page and tracking info is sent to the server.

### User story 10: Tracking Page: Item Organization
As any type of PriceHawk user, after I created an item to track, it should appear in a visually appealing list of items in my tracking info page (which I open by clicking the tracking info link in the extension's toolbox panel (user story 1)). I need this in order to see the items that I'm tracking (and their prices) for my own reasons (personal, business, or career use).

**Acceptance Criteria**  
* The items should be organized vertically (top to bottom) with a clear indication that they are separated
* The item object should have its name, its price, and the seller's name (amazon, kijiji, etc.)
* The user should be able to add multiple objects


### User story 11: Tracking Page: Item Organization (multiple sellers per item)
As a general consumer who wants to compare prices from multiple retailers to find the cheapest price to save money, or as an e-commerce researcher who wants to compare the prices of multiple items from multiple sources for market analysis, I want the option to track the price of an item from multiple sources. 

**Acceptance Criteria** 

If a user has multiple items with the same name, those items should be organized so that the item name appears on the dropdown, and inside the dropdown all the vendors for that item should appear in a table. All previous functionality remains the same: each row in the table in the dropdown is the same as the row in the previous view where all items would be displayed in a single table (refresh, delete, price history)

### User story 12: Price Tracking
As any type of user that uses PriceHawk, I want the prices for the items that I'm tracking to be automatically updated in case a seller changes the price of an item, so I don't have to keep manually checking an item's price. As a Costco shopper that has been tracking a TV's price, I want to be able to check if its price went down (in my tracking page) so I can get it cheap. As a business owner, I want to check if my competitor lowered or raised their prices for the same items I'm selling to be able to get the upper hand. 

**Acceptance Criteria** 
* At some set interval (12 hours for basic users, 1 hour for pro users), rescan the stored item’s price and update it if there's a change.
* If an item has multiple sellers, update the price of each seller


### User story 13: Price Tracking Failure (page re-styling)
As any type of user, in the event that a website moves around / deletes / changes the DOM element that contains the price of an item, I want PriceHawk to automatically find the DOM again so that the prices for my stored items are accurate and up to date. If PriceHawk cannot do this automatically, I want to be prompted to select the DOM of the price for the item that PriceHawk is unable to track anymore. As a market researcher who is performing a pricing analysis for multiple items which have multiple sources, I need this feature so that my data is not misleading or false. 

**Acceptance Criteria** 
* At some point, an interval price request for a DOM element that contains an item's price might fail. This should be caught as an exception in the backend and should be resolved by trying to find the new DOM that contains the price for the item.
* Should be attempted automatically by first scraping the DOM's parent and then searching the parent's nested elements to find the price (by looking for any currency symbols). If this fails, an entire page search might need to be done. 
* If the new price is "found", the user should still be made aware of the change and be prompted to double check that the automatically updated price is in fact correct
* If the new price cannot be found, the user should be made aware and prompted to re-select the price DOM for the item
* If the seller removes the item from their page, the user should also be notified of this before they confirm to delete the item and its data from their profile.  



### User story 14: Notify Price Changes  
As any type of user, I want to be notified of a price change, so I have the opportunity to benefit financially, regardless of my motivation. For example, as a Canada Computers shopper, I want to know when the price of a 4090 graphics card goes down so I can buy it at a lower price and save money. 

**Acceptance Criteria** 
* The user should get an email notification to the email linked to their account (if enabled) upon a price change 
* The user should get a text notification to the number linked to their account (if enabled) upon a price change
* These features are enabled in the settings tab (see user story 15)
* In the toolbox panel (and in the extension icon itself) there should appear a notification alert (like a red exclamation mark), that when clicked, opens a small message saying that the price for one (or more) items have been changed. Upon clicking this message, the user should be re-directed to their tracking info page.
* The items or sellers that have changed prices recently (within a certain time frame that the user can set themselves in the options tab (user story 15)), should be marked with a new color or text to identify the items/sources that have recently had a price change


### User story 15: Account / Other Settings
As any type of user, I should be able to access my account settings to change my account information (if I want a new password, new email, etc.), to modify notification settings (to control how I get notified of price fluctuations), and other miscellaneous settings, like, when an item's price changes, what is considered a "new price" (a change within 12 hours, 6 hours, or 1 hour?). As a user, I need these account/app settings to be able to customize the PriceHawk experience to my liking. For instance, as a general consumer who is monitoring a hot item that's out of stock, I want to enable all possible types of notifications so I know when the item goes back in stock (the price of a monitored item can also be "out of stock")

**Acceptance Criteria**  
* In the tracking info page that opens up, the user should have a separate tab in that page dedicated to changing their account/app settings.

Setting options include:  

1. changing password
2. changing email
3. adding/deleting/changing account number
4. enabling/disabling email push notification
5. enabling/disabling text notification
6. setting the time frame of what is considered a new change (12h, 6h, 1h, etc..)
7. more settings to be added as project progresses

### User story 16: Price History of Items
As a businessman that has a pro account, I want to have a visual representation of the price history of my item(s) (potentially across multiple sources) within a customizable time interval displayed on the x-axis of the graph (last 12 months, last 6 hours, all-time) so that I can analyze the price trends of my item(s) in order to anticipate future trends to benefit my company.   

**Acceptance Criteria**  
* Show the price history of items using a graph API
* For each item, the x-axis on the graph should display (by default) the total time elapsed since monitoring (by hours, days, months, or years)
* The y-axis represents the pricing of the item
* Each line in the graph represents a source/seller and should be labelled with the seller's name
* The user should be able to see the graph pop up in their tracking info page beside the item if they click a "price history" button beside their item
* Should only be available for pro users that pay a monthly 



### User story 17: Deleting an Item or Source from an Item
As any type of user for any type of purpose, I want the ability to delete an item completely (along with all its sources) or just a source from an item in case I lose interest in tracking a certain item or a certain source from an item. As an entrepreneur that is tracking an item from multiple sources to get an idea for the value of a product I want to soon start selling, I want to remove a source from the item because it's not accurate with respect to the actual value of the product I'm monitoring. As college student, I want to completely remove an item I'm monitoring, and all its sources, because I cannot afford the item anymore and I will not be purchasing it in the near future. 

**Acceptance Criteria**  
* Have a delete option for each item which deletes the item and all the sources underneath
* Have a delete option for each individual source 


### User story 18: Recommended Sellers for an Item
As any type of persona, it would be more convenient and less annoying that after I created an item for the first time (only one source), I get a starter list of recommended sellers/sources for the same item, so I don't have to manually add the main popular sellers (amazon, eBay, kijiji, etc..). For instance, as a general consumer who is only interested in tracking info for an item only across well known sources like amazon, eBay, Newegg, etc., and who is not interested in the marking features of PriceHawk, it would be more convenient for me to automatically get a list of similar sources for the item I'm looking for and to add all of them to my tracking page to save time and effort. 

**Acceptance Criteria**  
* After an item has already been added to track in the tracking page, beside each item should be a "find other sellers" button that when clicked, will output a list of links (5-10) of different sellers/sources that sell the same item.
*Beside each link item should be a "add seller" button that adds that source under the current item
*At the bottom of the list. there should be a "add all" button that adds all the recommended sellers displayed in the list under the current item

### User story 19: Data Filtering and Sorting
As general consumer, I want to be able to quickly see the lowest price for an item. As a pro user that manages a business, I want to keep track of multiple products (that my business also sells), each of which have multiple sources (my competitors), and, for instance, sort all items' sources by "most recently updated" to see which companies are trying to undercut our products (by comparing their products' (lower) pricing to ours). 

**Acceptance Criteria**  
* For each item, the user can sort the vendors by ascending/descending prices, by ascending/descending first date created or by vendors that had a recent price update (after a certain date inputted by user)
* The sorting and filter should only apply to the vendors within the item dropdown


### User story 20: Optional Item Photo
As any type of persona, I want to have a photo of my item beside it on my tracking page, so I am able to identify the item I'm looking for faster without reading item titles or searching item names. 

**Acceptance Criteria**  
* When adding an item for the first time (user story 8), I also have an additional (and optional) field named "select image" that allows the user to select the DOM element that contains the image.
* This feature should also be available in the tracking page to add a photo to an already existing item that doesn't already have one (if the user didn't add it upon item creation)
* Instead of selecting a DOM, the user should also have the option to select their own image (for both points above)

### User story 21: Refresh Button (PRO)
As a pro user, I want to be able to refresh my tracked item list any time I want with the latest prices for all of my tracked items so that my tracked item list is update to date.

**Acceptance Crtieria**
* Have a button near the top of the tracked item page that will get the latest prices for the tracked items for the current user 

### User story 22: Trending Items (PRO)
As a pro user, I want to be able to view the top most trending items.

**Acceptance Crtieria**
* Have a dedicated page for trending items.
* Trending item is an item that is being tracked my a lot of users.
* Display the Top K most tracked items 


### Prioritization  
User stories at the top of the table have higher priority than the ones at the bottom

|User Story|Priority|
|---|---|
|(1) Extension Tool Panel and Tracking Info Page|High|
|(2) Create/Add an Item to Track|High|
|(8) Extract Name and Price	|High|
|(12) Price Tracking|High|
|(4) Account Registration|High|
|(5) Sign In/Out|High|
|(14) Notifications|High|
|(13) Price Tracking Failure|High|
|(16) Price History of Items|Medium|
|(19) Data Filtering and Sorting|Medium|
|(17) Deleting an Item/Source|Medium|
|(10/11) Item Organization|Medium|
|(15) Account Settings|Medium|
|(18) Recommended Sellers|Medium|
|(6) Forgot Password|Medium|
|(7) SSO Login|Medium|
|(9) DOM Element Validation|Medium|
|(3) Guest User|Low|
|(21) Refresh Button|Low|
|(22) Trending Items|Low|
|(20) Optional Item Photo|Low|