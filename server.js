const express = require("express")
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express()

var admin = require("firebase-admin");
var serviceAccount = require("./geoquest-bd752-firebase-adminsdk-ykb6g-e8d48ac341.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://geoquest-bd752.firebaseio.com"
})

app.post("/topic", (req, res) => {
  
  let topicName = req.query.topic

  var message = {
    notification: {
      title: 'Test from Admin SDK - Geoquest',
      body: 'test body'
    },
    data: {
      msgType: 'Notification',
      content: 'Has sido invitado a jugar a la busqueda',
      name: 'Nombre de busqueda',
      player: 'jugador que invitó'
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: 'dKn-cJsBRAO5scLM4Dn3CK:APA91bHod5eYcoVYzkeVfSvptzbOVJ1OBm26Z4HJ8TnwD7eZ3yv8MI4mhm15dEx_qEDeAqwL5XMh-1KsXP3GWPbs16Oc1G6GPYcTozptm2TrXxKn_AYqdeFF-dEMyWxYSlrYNKuUYarE'
//    topic: topicName
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })


})

app.post("/notifications/quest_invite", jsonParser, (req, res) => {
  
  let senderName = req.body.sender_name
  let token = req.body.token

  var message = {
    notification: {
      title: senderName + ' te ha invitado a una búsqueda!'
    },
    data: {
      msgType: 'Quest Invitation',
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: token


//    topic: topicName
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })
})

app.post("/notifications/quest_accept", jsonParser, (req, res) => {
  
  let senderName = req.body.sender_name
  let questID = req.body.quest_id.toString()
  let teamID = req.body.team_id.toString()
  let token = req.body.token

  var message = {
    notification: {
      title: senderName + ' ha aceptado tu invitación para la búsqueda!'
    },
    data: {
      msgType: 'Quest Accept',
      questID: questID,
      teamID: teamID,
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: token
//    topic: topicName
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })
})

app.post("/notifications/quest_deny", jsonParser, (req, res) => {
  
  let senderName = req.body.sender_name
  let questID = req.body.quest_id.toString()
  let teamID = req.body.team_id.toString()
  let token = req.body.token

  var message = {
    notification: {
      title: senderName + ' ha rechazado la invitación para la búsqueda'
    },
    data: {
      msgType: 'Quest Deny',
      questID: questID,
      teamID: teamID
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: token
//    topic: topicName
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })
})

app.post("/notifications/friend_request", jsonParser, (req, res) => {
  
  let senderName = req.body.sender_name
  let senderID = req.body.sender_id.toString()
  let token = req.body.token

  var message = {
    notification: {
      title: senderName + ' te ha enviado una solicitud de amistad!'
    },
    data: {
      msgType: 'Friend Request',
      senderID: senderID,
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: token
//    topic: topicName
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })
})

app.post("/notifications/friend_accept", jsonParser, (req, res) => {
  
  let senderName = req.body.sender_name
  let token = req.body.token

  var message = {
    notification: {
      title: senderName + ' ha aceptado tu solicitud de amistad!'
    },
    data: {
      msgType: 'Friend Accept'
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: token
//    topic: topicName
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })
})

app.post("/notifications/friend_deny", jsonParser, (req, res) => {
  
  let senderName = req.body.sender_name
  let token = req.body.token

  var message = {
    notification: {
      title: senderName + ' ha rechazado tu solicitud de amistad!'
    },
    data: {
      msgType: 'Friend Deny',
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: token
//    topic: topicName
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })
})

app.post("/notifications/coupon", jsonParser, (req, res) => {
  
  let senderName = req.body.sender_name

  var message = {
    notification: {
      title: senderName + ' ha rechazado tu solicitud de amistad!'
    },
    data: {
      msgType: 'Friend Deny',
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: 'dKn-cJsBRAO5scLM4Dn3CK:APA91bHod5eYcoVYzkeVfSvptzbOVJ1OBm26Z4HJ8TnwD7eZ3yv8MI4mhm15dEx_qEDeAqwL5XMh-1KsXP3GWPbs16Oc1G6GPYcTozptm2TrXxKn_AYqdeFF-dEMyWxYSlrYNKuUYarE'
//    topic: topicName
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })
})



app.listen(3000, () => {
  console.log("server running on port", 3000)
});

app.post("/notifications/quest_update", jsonParser, (req, res) => {

  let teamID = req.body.team_id
  console.log("teamID " + teamID)
  let questID = req.body.quest_id
  console.log("questID " + questID)
  let sender = req.body.sender
  console.log("Sender " + sender)
  let token = req.body.token
  console.log("Token " + token)
  let item = req.body.item_name
  console.log("Item " + item)

  var message = {
    notification: {
      title: sender + ' ha recolectado: ' + item + ' !!'
    },
    data: {
      msgType: 'Quest Update',
      teamID: teamID.toString(),
      questID: questID.toString()
    },
    android: {
      notification: {
        sound:'default'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    token: token
  }

  admin.messaging().send(message)
  .then(response => {
  console.log('Succesfully sent message: ', response)
  res.writeHead(200)
  res.end(response)
  })
  .catch(error => {
    console.log('Error sending message', error)
    res.writeHead(500)
    res.end(error)
  })
})



