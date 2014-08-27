## Summary of application features

1. Show the average queue time using **only** data from the latest hour
2. Show the number of females, males and the sum of these using the same data
3. Ask the user for its gender and store it either locally or in
firebase so that it can be used when queue time is being calculated at
the different locations
4. Track the time between a user entering a Estimote-zone and being 1m from
the estimote and then store this session (with the users gender) on the correct location


### Some clarifications

- "location" is referring to one of 3 night clubs' queues
where this application will be used
- Each location has its own Estimote
- An "Estimote-zone" is the area where the Estimote is close
enought to communicate with, and report its distance from,
an iPhone

## Development

### Installing dependencies

This guide is assuming that you have node and npm installed.

1. Run `npm install grunt-cli -g`
2. Then from project root run `npm install`

### When developing

Run `grunt watch` to atomatically compile less and js files when they're changed.

### Building

From project root directory:

1. Run `grunt dist` which is concatinating the less and js files.
2. Then `phonegap build ios`
3. Open Xcode project with `open platforms/ios/Queue\ App.xcodeproj/`
