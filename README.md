# Introduction
The **nk-realtime-service** project serves as a pilot project and/or a reference to be used by anyone who wishes to write software and learn [sockets](https://www.tutorialspoint.com/unix_sockets/what_is_socket.htm).

# Installation
In order to run the server, download the repository and perform the following steps:

1. ```npm install```
4. ```node app.js (The app will run on port 1337)```

In order to interact with the server, download the [client application](https://github.com/nicolaselkhoury/nk-realtime-service-client), and run it. 

# APIs

All of the APIs are triggered by a Socket request (generated by the client):

## Follow user
This API simulates a user following another user. The API will add the user to the room of the followed user, and broadcast a message to all the sockets in the room, that a user has joined the room.

## Unfollow user
This API simulates a user unfollowing another user. The API will remove the user from the room of the followed user, and broadcast a message to all the sockets in the room, that a user has left the room.

## Get Socket ID
This API retrieves the socket ID of the user and returns it.

# Future Work

This is a small pilot project, and is missing a lot of enhancements, including but not limited to:

1. Proper authentication mechanism.
2. Include Redis adapter, which renders the application stateless and scalable.
3. More realistic and complex APIs.
4. APIs triggered by HTTP calls, which in turn trigger socket events back to the client.