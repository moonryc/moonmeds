# MoonMeds

## Description

A single page web application that keeps track of users medications and provides warnings for when medications are
missed, as well as provide info for when the next refill for a medication is approaching. Multiple peoples medication
can be managed on one account to help parents. Medication notes can be saved and custom dosages can se saved for each
medication which will be visible in the future when you select a day on the calendar. This is my first React Application
as well as my first Express Application.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Questions](#questions)

## Installation

clone the repo and run ```yarn``` cd into ```/frontend``` and run ```yarn``` to install the required dependencies. in
the root folder create a ```.env``` with the following values:

```
NODE_ENV = DEV

MONGODB_USERNAME = ''
MONGODB_PASSWORD = ''
MONGODB_DATABASE = ''

MEDICATION_MODEL_NAME = "Medications_Dev"
MEDICATION_DOSAGES_MODEL_NAME = "Medication_Dosages_Dev"
DOSAGES_MODEL_NAME = "Dosages_Dev"
PERSONS_MODEL_NAME = "Persons_Dev"
USERS_MODEL_NAME = "Users_Dev"
```

The application should now be ready to run.

## Usage

run ```npm start:dev``` in the root folder and then cd into the frontend folder and run ```npm start```. Then open
localhost:3000 to use the application, or click [HERE](https://moonmeds.herokuapp.com) to visit the deployed version.

## Credits

Ryan Moon - Frontend, Backend

Travis Anderson - Frontend UI, CSS

Sara Sara Brazille - Code Review/Mentor

## Questions

Find me on GitHub here: [here](http://github.com/moonryc)

If you have any additional question feel free to email me at [rycmoon@gmail.com](mailto:rycmoon@gmail.com)
