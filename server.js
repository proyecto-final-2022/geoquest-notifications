const express = require("express")
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
  
    },
    android: {
      notification: {
        sound:'defauilt'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: 'default'
        }
      }
    },
    topic: topicName
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




