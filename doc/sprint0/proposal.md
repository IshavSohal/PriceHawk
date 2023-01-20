## WoofTrails, *a quicker and more secure dog walking service*

#### Problem Statement and Solution
Most people live busy lives so they don't have enough time to walk their dogs. They need a dog walking service that connects them to trustworthy dog walkers. But most importantly, they want it done fast without the hassle of looking for walkers and old fashioned scheduling that takes up time and effort from people's already hectic lives. Most dog walking apps, (like the popular [Rover](https://www.rover.com/ca/)), use a map with plotted dog walker profiles on it that users must manually sift through (after inputting their location) until they find a walker that fits their schedule and their rating standards (for walkers). On top of that, if schedules don't align, the client has to contact the walker to work out a time and place. WoofTrails offers a more responsive connecting proccess. All a client has to do is press a button that (in real time) connects them to a dog walker (that is also searching for a client in real time). Ideally the pickup location is at the client's home, so the walker must be committed to a drive if necessary. Furthermore, people love their dogs and would hate for something to happen to them, that's why a lot of people hesitate and are paranoid when giving away their pet to a stranger. No matter how good someone's ratings are, anything can happen. WoofTrails features added security for your dog with a live tracking map feature and the ability to set custom walking paths in your neighbourhood (both of which are optional). 

#### Key Users
<ins>Dog walkers</ins>: background checked people who meet the standards to walk a dog

<ins>Dog owners</ins>: people who wan't their dog(s) walked  

#### Scenarios
- As a client, I search up a walker on the app. If I find one in real time, great. But before I actually connect to the walker, the walker's profile pops up on my screen with their profile summary (totals ratings, rating average, most recent ratings) and I have to hit accept if I'm satisfied. If not, I can decline and matchmaking will look for another walker near me.
- As a client, If I don't find something with live matchmaking, I will have to use the secondary booking system where I manually search and contact a walker to set a time and place. 
- As a client, whether the walk was scheduled with live matching or regular scheduling, I can enable live tracking (which my walker also has to enable on their device) to see my dog live on a map. This is optional
- As a client, before the walk, I can set a custom walking path that my walker should take. This is also optional
- As a client who's using the security features, If I notice anything suspicious (like the dot stopped moving on the map) I can directly call the walker through the app, and if they don't respond I can alert authorities with the last known location I saw on the app. I will recieve a push notification if the walkers connection is lost. The dog walkers internet could also just be down. 
- As a dog walker, I can search up owners looking for their dogs to be walked. If live matching is found..., otherwise,... (similar scenarios as the client)
- As both a dog walker and client, I can rate my walker / client afterwards

Note: walks times are categorized and billed differently (e.g. $20 for half an hour $10 for 15mins etc...), so before a walker / client hits the search button, they can select a category. 

#### Market Sizing Analysis and Business Potential

<ins>Main Goal</ins>: to get enough traffic so that clients and walkers can find eachother more often to the point where the real time matchmaking system takes over the old fashioned booking system. 

[Number of households in Canada](https://www.globaldata.com/data-insights/macroeconomic/number-of-households-in-canada-2096147/#:~:text=2022%20Source%3A%20GlobalData-,Number%20of%20Households%20in%20Canada,the%20indicator%20increased%20by%2016.1%25.) : around 15.3 million

[Percentage of households that own a dog in Canada](https://petkeen.com/pet-ownership-statistics-canada/) : around 35%

<ins>Ballpark estimated revenue if our app successfuly operates in Canada</ins>: Since there are roughly 5.4 million households in Canada with dogs (0.35*15.3million), the potential is huge. Users on rover usually pay around $15-$30 per walk and rover charges a 20% service fee per walk. Assuming we offer an initial fee of 1-5% to increase popularity and traffic, and assuming we’re at a point where we have enough activity that allows us to charge a 10% fee: we would make roughly 0.10 * $20 (assuming avg. of 20 per walk) = $2 per walk. Assuming enough Canadians use the app so that in a given year (given 5-6 months of chilly weather), we average 10,000 walks per day (assuming 1 walk per household, is only 0.002% (10k/5.4mill) of the total number of households with dogs in Canada), that’s 10k walks per day =  $10k * $20 * 0.10 = $20k a day * 365 days = $7.3 mill a year revenue. This is possible but unrealistic since it assumes an already functioning business with a lot of traffic. Rover (which operates in US & Canada, but primarily in the states) anticipated revenue in the range of [$171 - $173 million in the third quarter of 2022](https://investors.rover.com/news-releases/news-release-details/rover-reports-third-quarter-2022-financial-results)

Since we wouldn’t be known at the start of launch, our goal would be to take over Rover’s (and others’) market share in Canada and gain popularity by marketing and promoting the fact that we will be a Canadian (Rover is based in Seattle) company with the lowest service fees (amongst other Canadian dog walking apps), with a way quicker and more convinnient way of connecting to walkers, and added security for your pet. 

#### Principles
TODO

#### Feasibility
We believe this idea is feasible, and can be completed in the timeframe of this course
Possible tech stack:
Frontend: typescript, react
Backend: python, django/flask/fastapi, postgresql/mongodb/dynamodb,
Hosting if required: aws, azure, heroku
