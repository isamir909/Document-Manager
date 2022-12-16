# Document-Manager

- this is the back-End part of the document-manager, All the request of front-end will be handle here.

## Demo Video
(https://www.dropbox.com/s/yznvsmpf0avvt42/Samir_lohiya_9909779216.mp4?dl=0 )

## How to use project

- clone from the git repository using command `git clone https://github.com/isamir909/Document-Manager.git`
- run command `npm i` to install dependancy
- run command `npm run start` to start the server


## Project Details:


## FEATURE I - User

### Models
- User Model
```yaml
{ 
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true, unique: true },
    password: { type: String, require: true, trim: true },
    phone: { type: String, require: true, trim: true },
    profilePicture: { type: String, require: false, trim: true },
    isPremiumUser: { type: Boolean, default: false },
    availableStorage: { type: Number, default: 1024 }, //in kilobytes(kb)
    totalStorageCapacity: { type: Number, default: 1024 }, //in kilobytes(kb)
  },
  {
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```

## User APIs 
### POST /register

- all the user data will come from front-end and the data will stored in mongoDB and Image will be stored on AWS 
- Save password in encrypted format. (use bcrypt)
- On successfull response Return HTTP status is  201.


### POST /login

- Email and password will be recieved by user in body.
- Used JWT for the token generation.
- On successfull response Returnd token and used data.


### PUT  /user/:id

- first request will go into authentication, once authentication success request will go to user controller.
- validation will be performed on input data then updated inside database. and updated data will be send to user.



## FEATURE II - Document

### Models
- User Model
```yaml
{ 
    userId: { type: objectId, refs: "user", required: true },
    fileName: { type: String, require: true, trim: true },
    fileSize: { type: Number, trim: true },
    fileLink: { type: String, trim: true, require: true },
    extension: { type: String, trim: true, require: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
  createdAt: {timestamp},
  updatedAt: {timestamp}
}

```
### POST /upload-document

- Request will go into the authentication,once authentication success request will go to document controller.
- Document (pdf,xlsx,csv) will be recieved in the request. 
- Available storage on user cloude and incoming file size will be checked and then doc will uploaded on aws S3.
- URL from aws s3 will be stored on document with user id.

### GET /documents

- Request will go into the authentication,once authentication success request will go to document controller.
- All document with idDeleted:false key will be fetched and sent back to the user.


### GET  /documents/:documentid/to-text

- Request will go into the authentication,once authentication success request will go to document controller.
- Document with the params document id will be fetched.
- Document will be converted into text and finally text will be sent to user.

### DELETE /documents/:documentid

- Request will go into the authentication,once authentication success request will go to document controller.
- Document with the params document id will be fetched.
- isDeleted:false key will be updated to true and storage deail will be updated based on file size.