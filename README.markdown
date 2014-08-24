Summary of application features
-------------------------------

1. Show the average queue time with data from the last hour
2. Show the number of females, males and the sum of these from the same data
3. Ask the user for its gender and store it either locally or in
firebase so that it can be used when queue time is being calculated at
the different locations
4. Track the time between a user entering a Estimote-zone and being 1m from
the estimote and then store this session on the correct location.


Explanation of terms
--------------------

- "location" is referring to one of 3 night clubs' queues
where this application will be used.
- Each location has its own Estimote.
- An "Estimote-zone" is the area where the Estimote is close
enought to communicate with, and report its distance from,
an iPhone.
