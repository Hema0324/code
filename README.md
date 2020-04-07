## Command to run 
`node app.js`

## Algorithm
Step 1 : Start  
Step 2 : Declare Response_Object  
Step 3 : Fetch all the categories     
&nbsp;&nbsp;&nbsp;&nbsp;Step 3.1 : Assign the categories to the Response_Object  
Step 4 : Repeat the steps for each category  
&nbsp;&nbsp;&nbsp;&nbsp;Step 4.1 : Get all the products for each category  
&nbsp;&nbsp;&nbsp;&nbsp;Step 4.2 : Compute the count of products in each category  
&nbsp;&nbsp;&nbsp;&nbsp;Step 4.3 : Assign the products and count to the Response_Object  
Step 5 : Print the Response_Object  
Step 6 : Stop 


##  Database Schema 

###  Categories

|_id|name   | Active_Ind  |
|---|-------|-------------|

### Products

|_id|name   | Active_Ind  |Category_Id|
|---|-------|-------------|-----------|



