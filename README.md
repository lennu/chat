# Chat

Example of how to create a chat application that has multiple channels.

For learning purposes the example is built with long polling mechanism instead of traditional web sockets that one would normally use in similar kind of applications.

## How to run and use the app and the API

Tested with node v14.18.0 on a MacBook Pro M1

In terminal:
- cd backend
- npm install
- npm start

In another terminal:
- cd client
- npm install
- npm start

Client can be found from: http://localhost:1234

Server can be found from: http://localhost:12345

## About

The client is written in TypeScript, builds with Parcel, uses React and Fetch, and has simple UI made with grid layout.

The backend is written in TypeScript, builds with ts-node with nodemon and uses Express.

## Long polling

- Client makes requests with header `Long-Poll-Cursor` and with the length of the current amount of messages in the chosen channel as value
- Backend gets latest messages for a channel and compares the number given in header
- Backend responses to the client if the values don't match or saves the response for later use
- When a new message is posted then responses for all of the long pollers are given
