# Routes
## /auth
  - ### POST /signup/
    - request
      - ```
        user: {
          username,
          password,
          level
        }
        ``` 
    - response
      - ```
        status: true
        ``` 
  - ### POST /login/
    - request
      - ```
        user: {
          username,
          password
        }
        ``` 
    - response
      - ```
        "status": true,
        "user": {
          "username": "User123",
          "isAdmin": false,
          "_id": "5dskal3k34lk3jlq61027241",
          "createdAt": "2020-12-21T16:50:49.781Z"
        }
        ``` 
## /user
- ### POST /one/
  - request 
    - ```
      "query": {
        _id
      }
      ```
  - response
    - ```
      "status": true,
      "user": {
        "username": "User123",
        "isAdmin": false,
        "_id": "5dskal3k34lk3jlq61027241",
          "createdAt": "2020-12-21T16:50:49.781Z"
      }
      ``` 
- ### POST /search/
  - request 
    - ```
      "query": {
        username
      }
      ```
  - response
    - ```
      "status": true,
      "users": [{
        "level": "Experte",
        "isAdmin": false,
        "friends": ["5dskal3k34lk3jlq61027241"],
        "_id": "5dskal3k34lk3jlq61027241",
        "username": "User123",
        "password": "$2b$10$XDsoK0RcRzt7yNOHd0RrEeo9YaYGhpAK.Z2MsiTzyBYKy.H9VwrQC",
        "createdAt": "2020-12-21T12:25:23.278Z",
        "updatedAt": "2020-12-21T12:25:23.278Z",
        "__v": 0
      },...]
      ```
- ### POST /friendsprogress/
  - request 
    - ```
      "user": {
        _id
      }
      ```
  - response
    - ```
      "status": true,
      "listOfFriendsWorkout": [{
        "absolved",
        "exercises: [{}
          amount: [{Beginner: 10},..],
          "absolved": False,
          "_id": 123,
          "exercise": "programm",
          "category": "brain lol",
        },...],
        "_id": 1234234,
        "userId": 123412341234,
        "username": "User123",
        "createdAt": date,
        "updatedAt": date
      },...]
      ```
- ### PUT /add/
  - request 
    - ```
      "user": {
        _id
      },
      "friend": {
        _id
      } 
      ```
  - response
    - ```
      "status": true
      ```
- ### PUT /update/
  - request 
    - ```
      "user": {
        _id
      },
      "update": {
        // everything is upgradeble..., example
        "prefrences" : {
          "theme": 1
        }


      } 
      ```
  - response
    - ```
      "status": true
      ```
## /workout
- ### POST /
  - request 
    - ```
      "user": {
        _id
      }
      ```
  - response
    - ```
      "status": true,
      "latestWorkout": {
        "absolved",
        "exercises: [{}
          amount: [{Beginner: 10},..],
          "absolved": False,
          "_id": 123,
          "exercise": "programm",
          "category": "brain lol",
        },...],
        "_id": 1234234,
        "userId": 123412341234,
        "username": "User123",
        "createdAt": date,
        "updatedAt": date
      }
      ```
## /exercise
- ### GET /listaftercat/
  - categories: [ 'Brust', 'Bauch', 'Arme', 'Beine', 'Rücken', 'Po', 'Waden', 'Schultern']
  - response
    - ```
      "status": true,
      "categories": {
        "Brust": [{
          amount: [{Beginner: 10},..],
          "absolved": False,
          "_id": 123,
          "exercise": "Liegestütze",
          "category": "Brust",
        },..],
        ...
      }
      ```
- ### POST /create/
  - request 
    - ```
      "user": {
        _id,
        isAdmin
      },
      exercise: {
        exercise,
        description,
        category,
        amount
      }
      ```
  - response
    - ```
      "status": true,
      "exercise": {
        "amount": [
          {
            "Beginner": 10
          },
          {
            "Expert": 20
          }
        ],
        "absolved": false,
        "_id": "asdasdsa",
        "exercise": "Liegestütze",
        "category": "Brust",
        "createdAt": "2020-12-21T17:51:53.084Z",
        "updatedAt": "2020-12-21T17:51:53.084Z",
        "__v": 0
      }
      ```
- ### PUT /update/
  - request 
    - ```
      "user": {
        _id,
        isAdmin
      },
      exercise: {
        _id
      },
      update: {
        category: "Beine"
      }
      ```
  - response
    - ```
      "status": true,
      "updatedExercise": ...
      ```
- ### DELETE /delete/
  - request 
    - ```
      "user": {
        _id,
        isAdmin
      },
      exercise: {
        _id
      }
      ```
  - response
    - ```
      "status": true
      ```