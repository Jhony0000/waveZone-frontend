import conf from '../conf/conf'
import {Databases , ID  , Query , Storage, Client , Permission, Role} from 'appwrite'



export class Service {
      clint = new Client();
      database;
      buket;

      constructor(){
        this.clint
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('66faa23000220213e067');
        this.database = new Databases(this.clint);
        this.buket = new Storage(this.clint); 
        console.log(conf.appwriteBucketId)
      }

      async createPost({content , media,userID,userName,profailImg}){
        try {
            return await this.database.createDocument(
                '66faa2a400028c3ad52c',
                '66fadc5a003180577b6c',
                 ID.unique(),
                 {
                    content ,
                    media,
                    userID,
                    userName,
                    profailImg
                 }
                )
        } catch (error) {
            throw error
        }
      }

      async allPost(){
        try {
            return await this.database.listDocuments(
              '66faa2a400028c3ad52c' ,
              '66fadc5a003180577b6c',
            )
        } catch (error) {
            throw error;
        }
      }

      async eaditPost(ID,{content,media}){
        try {
            return await this.database.updateDocument(
              conf.appwriteDatabaseId ,
              conf.appwriteCollectionIdUserPost,
                ID,
                {
                    content,
                    media
                }
            )
        } catch (error) {
            throw error
            return false
        }
      }
      async deletePost(ID){
        try {
          return await this.database.deleteDocument(
            conf.appwriteDatabaseId ,
            conf.appwriteCollectionIdUserPost,
            ID
        )
        return true
        } catch (error) {
          throw error
          return false
        }
       
      }
      async uplodPostFile(file){
        console.log('uplod file ' , file)
        try {
          return await this.buket.createFile(
            '66faa47d00240cd0b486',
            ID.unique(),
            file
          )
        } catch (error) {
          throw error
          
        }
      }

      async deleteFile(fileID){
        try {
          return await this.buket.deleteFile(
            conf.appwriteBucketId,
            fileID
          )
          return true
        } catch (error) {
          throw error
          return false
        }
      }

      async getFilePreview(fileId){
        try {
          const response = await this.buket.getFilePreview(
            '66faa47d00240cd0b486',
            fileId
          )
          console.log("Generated Preview URL: ", response.href);
          return  response.href;
          console.log(response)
        } catch (error) {
          console.log(error)
        }
          
      }

      // profail section 
      async createProfail({userImg,userName,userCoverImg,userID}){
        try {
          return await this.database.createDocument(
              '66faa2a400028c3ad52c',
              '66fadc6d002b8de4f530',
               ID.unique(),
               {
                userImg ,
                userName,
                userCoverImg,
                userID,
               },
              
              )
      } catch (error) {
          throw error
      }
    }
    async updateProfail(userID,{userImg,userCoverImg}){
      console.log("User ID:", userID);
    
      try {
        return await this.database.updateDocument(
          '66faa2a400028c3ad52c',
          '66fadc6d002b8de4f530',
          userID,
          {
           
            userImg ,
            userCoverImg ,
          }
        
        )
       
      } catch (error) {
        console.log('update profail error',error)
      }
    }
    async  getProfail(userID) {
      console.log('get profail user id',userID)
      try {
        const response = await this.database.getDocument(
          '66faa2a400028c3ad52c',  // ডাটাবেস আইডি
          '66fadc6d002b8de4f530',  // কালেকশন আইডি
          userID                   // ডকুমেন্ট আইডি
        );
        console.log("Document exists:", response);
      } catch (error) {
        console.log("Document not found:", error);
      }
    }
    async alluserinfo(userID){
      try {
          const response = await this.database.listDocuments(
            '66faa2a400028c3ad52c' ,
           '66fadc6d002b8de4f530',
           [Query.equal('userID', userID)] 
          )
          console.log("Fetched Profile Data:", response); 
         
          return response.documents[0]
      } catch (error) {
          console.log( error);
          return false
      }
    }
      async updatePost(userID, { userImg, userName,userCoverImg}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                userID,
                {
                    userImg,
                    userName,
                    userCoverImg
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    async uplodProfailPhotoFile(file,userData){
      console.log('uplod file profailfile' , file)
      try {
        return await this.buket.createFile(
          '670bf8c90021c80a78bc',
          ID.unique(),
          file,
          [
            Permission.read(Role.user(userData.$id)), // শুধুমাত্র নির্দিষ্ট ইউজার ফাইল পড়তে পারবে
            Permission.update(Role.user(userData.$id)), // ইউজার আপডেট করতে পারবে
            Permission.delete(Role.user(userData.$id))  // ইউজার ডিলিট করতে পারবে
          ]
        )
      } catch (error) {
       console.log('uplodfile error' , error)
        
      }
    } 
    // async uploadProfileCoverFile(ProfailCoverPhtoID){
    //   console.log('uplod file coverfile' , ProfailCoverPhtoID)
    //   try {
    //     return await this.buket.createFile(
    //       '670ce2b20021886bd2dc',
    //       ID.unique(),
    //       ProfailCoverPhtoID
    //     )
    //   } catch (error) {
    //     throw error
        
    //   }
    // }

    async updataFile(fileID){
      try {
        return await this.buket.updateFile(
          '670bf8c90021c80a78bc',
          fileID
        )
      } catch (error) {
        console.log('this is update file error' , error)
      }
    }

    async allProfailPost(quries = [Query.equal(['userID' , 'userID'])]){
      try {
        return await this.database.listDocuments('66faa2a400028c3ad52c','66fadc5a003180577b6c',quries)
      } catch (error) {
        console.log()
      }
    }

    async getFilePreviewProfailImg(fileId,userID){
      console.log('file id' , fileId)
      try {
        const response = await this.buket.getFilePreview(
          '670bf8c90021c80a78bc',
          fileId,
          userID
        )
        return  response.href;
        console.log(response)
      } catch (error) {
        console.log(error)
      }
        
    }
    // async getFilePreviewCoverImgImg(fileId){
    //   try {
    //     const response = await this.buket.getFilePreview(
    //       '670ce2b20021886bd2dc',
    //       fileId
    //     )
    //     return  response.href;
    //     console.log(response)
    //   } catch (error) {
    //     console.log(error)
    //   }
        
    // }

    // create , update , delete friends 

    async sendFriendRequest(userID,FrendID,profailImg,userName,FriendName,FriendProfailImg){
      try {
        const response = await this.database.createDocument(
          '66faa2a400028c3ad52c',
          '67108f10000aee24976f',
          ID.unique(),
          {
            userID,
            FrendID,
            Status : 'panding',
            profailImg,
            userName,
            FriendName,
            FriendProfailImg
          }
        )
        console.log('this is response',response)
        return response
        
      } catch (error) {
        console.log('sendriendrequest error' , error)
      }
     
    }
    async accpitFrindRequest(requestId){
         try {
          const data = JSON.stringify({
               Status : 'accepted'
          })
           return await this.database.updateDocument(
            '66faa2a400028c3ad52c',
            '67108f10000aee24976f',
            requestId,
             data
           )
         } catch (error) {
          console.log('accpit friend request' , error)
         }
    }
    async cancleFriendRequest(requestId){
      try {
        return await this.database.deleteDocument(
          '66faa2a400028c3ad52c',
          '67108f10000aee24976f',
          requestId
        )
      } catch (error) {
        console.log('canclefriend request' , error)
      }
    }
    
    async chackedFriendRequest(userID,FrendID){
      try {
        const response = await this.database.listDocuments(
          '66faa2a400028c3ad52c',
          '67108f10000aee24976f',
          [
            Query.equal('userID',userID),
            Query.equal('FrendID',FrendID)
          ]
        
        )
        if (response.documents.length > 0) {
          return {
            exists: true,
            requestId: response.documents[0].$id, // রিকোয়েস্টের ডকুমেন্ট আইডি
          };
        } else {
          return { exists: false }; // ফ্রেন্ড রিকোয়েস্ট না পাওয়া গেলে
        }
      } catch (error) {
        console.log('chacked friend request error' , error)
      }
    }

    async allFriendRequest(userID){
      try {
         return await this.database.listDocuments(
          '66faa2a400028c3ad52c',
          '67108f10000aee24976f',
          [
            Query.equal('userID' ,userID),
            Query.equal('Status' , 'panding' )
          ]
         )
      } catch (error) {
        console.log('all friend request' , error)
      }
    }
    async showFriend(userID){
      try {
         return await this.database.listDocuments(
          '66faa2a400028c3ad52c',
          '67108f10000aee24976f',
          [
            Query.equal('userID' , userID ),
            Query.equal('Status' , 'accepted' )
          ]
         )
      } catch (error) {
        console.log('all friend request' , error)
      }
    }
    async showFrindTo(FrendID	){
      try {
         return await this.database.listDocuments(
          '66faa2a400028c3ad52c',
          '67108f10000aee24976f',
          [
            Query.equal('FrendID' ,FrendID),
            Query.equal('Status' , 'accepted' )
          ]
         )
      } catch (error) {
        console.log('all friend request' , error)
      }
    }
    async previewRequest(userID,FrendID	){
      try {
         return await this.database.listDocuments(
          '66faa2a400028c3ad52c',
          '67108f10000aee24976f',
          [
            Query.equal('userID' ,userID),
            Query.equal('FrendID' ,FrendID),
            Query.equal('Status' , 'accepted' )
          ]
         )
      } catch (error) {
        console.log('all friend request' , error)
      }
    }

    // message 

    async sendMessage({sendID,ReciveID,userMessage}){
      try {
        const response = await this.database.createDocument(
          '66faa2a400028c3ad52c',
          '67122b8c00335f69ff53',
          ID.unique(),
          {
            sendID,
            ReciveID,
            timeStamp : new Date(),
            userMessage,
          }
        )
        console.log('sendMessage',response)
        return response
        
      } catch (error) {
        console.log('sendMessage error' , error)
      }
     
    }

    async allMessage({sendID,ReciveID}){
      try {
        return await this.database.listDocuments(
          '66faa2a400028c3ad52c',
          '67122b8c00335f69ff53',
          [
            Query.equal("sendID", sendID),
            Query.equal("ReciveID", ReciveID)   
          ]
        )
      } catch (error) {
        console.log('all message error' , error)
      }
    }
    async allMessageTo({sendID,ReciveID}){
      try {
        return await this.database.listDocuments(
          '66faa2a400028c3ad52c',
          '67122b8c00335f69ff53',
          [
              Query.equal("sendID", ReciveID),
              Query.equal("ReciveID", sendID)   
          ]
        )
      } catch (error) {
        console.log('all message error' , error)
      }
    }

    async deleteMessage(sendID,ReciveID){
      try {
        return await this.database.deleteDocument(
          '66faa2a400028c3ad52c',
          '67122b8c00335f69ff53',
          {
            sendID,
            ReciveID
          }
        )
      } catch (error) {
        console.log('delete Message error' , error)
      }
    }

    async  messageProfail(ID) {
      console.log('get profail user id',ID)
      try {
        const response = await this.database.listDocuments(
          '66faa2a400028c3ad52c',  
          '67108f10000aee24976f', 
          [
            Query.equal('$id' , ID)
          ]              
        );
        if (response.total > 0) {
          console.log("Document exists:", response);
          return response.documents[0]; // Return the first document
        } else {
          console.log("No documents found for this ID");
          return null; // Return null if no documents found
        }
      } catch (error) {
        console.log("Document not found:", error);
      }
    }
    // async  currentUserData(ID) {
    //   console.log('get profail user id',ID)
    //   try {
    //     const response = await this.database.listDocuments(
    //       '66faa2a400028c3ad52c',  
    //       '67122b8c00335f69ff53', 
    //       [
    //         Query.equal('$id' , ID)
    //       ]              
    //     );
    //     if (response.total > 0) {
    //       console.log("Document exists:", response);
    //       return response.documents[0]; // Return the first document
    //     } else {
    //       console.log("No documents found for this ID");
    //       return null; // Return null if no documents found
    //     }
    //   } catch (error) {
    //     console.log("Document not found:", error);
    //   }
    // }
}

const service = new Service();

export default service;
