const MongoClient     = require( 'mongodb' ).MongoClient;
const mongoUrl        = "mongodb://127.0.0.1:27017/Appiness_Task3"
const socketIO        = require('socket.io');
const http            = require('http')

var express       = require("express"); 
var path          = require('path');
var app           = express();
var publicPath    = path.join(__dirname,"/public");

let _db ;

app.use(express.static(publicPath));

let Response_Object = 
                      {
                        Category : "",
                        Products : [],
                        Count : 0
                      }
                      ;
                      

let server          = http.createServer(app).listen(3000,()=>{ console.log("Listening")});

startServer();

async function startServer(){
    //connecting to the mongodb server
    let mongoConnection   = await MongoClient.connect(mongoUrl)
                                  .then(function (db) 
                                   {
                                      _db = db; 
                                      
                                      //Fetch all the categories from the collection
                                      _db.collection('categories').find({}).toArray(function(err, result) {
                                      if(result)
                                      {
                                          
                                            let tempArray = result;
                                            //Loop through the products collection to fetch products associated to one category
                                            for(index = 0 ;index < tempArray.length ; index++)
                                            {
                                                  let Query = {"Category_Id" : tempArray[index]._id.toString(),"Active_Ind" : 1}
                                                  let temp = {}
                                                  temp.Category = tempArray[index].name;
                                                     
                                                  _db.collection('products').find(Query).toArray(function(err, products_result) {
                                                  if(products_result)
                                                  {
                                                      temp.count = products_result.length;
                                                      //Loop through all the products associated to one category and push the results to Response Object
                                                      for(Each_Product = 0 ; Each_Product < products_result.length ; Each_Product++)
                                                      {
                                                      
                                                          Response_Object.Products[Each_Product] =  products_result[Each_Product].name
                                                      }
                                                    
                                                      //Build the Response Object
                                                      Response_Object.Category = temp.Category
                                                      Response_Object.Count = temp.count
                                                     // delete temp;
                                                      console.log(Response_Object)
                                                  
                                                  }
                                                  else
                                                  {
                                                      console.log(err)
                                                  }
                                                  
                                                });
                                            }
                                      }
                                      else
                                      {
                                       console.log(err)
                                      }
                                      });
                                      
                                   })
                                  .catch(function (err) 
                                   { 
                                      console.log(err)
                                      console.log("MONGO_SERVER_ERROR")
                                   })
    
}










