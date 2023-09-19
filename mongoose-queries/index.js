const express = require('express')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const connectToMongodb = require('./db.js');
const userModel = require('./User.js');
const postModel = require('./Post.js');

const app = express();
const PORT = 8000;
app.use(bodyParser.json());
connectToMongodb()

// Mongoose Queries-1: Create-> Model.Create()
// Route to create a user

app.post('/users', async (req,res)=>{
  try{
    const userData= req.body;
    const newUser= await userModel.create(userData); // here create is used create new  user ...
    // let's test this...
    res.status(201).json(newUser)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
  
})
app.post('/post', async (req,res)=>{
  try{
    const postData= req.body;
    const newPost= await postModel.create(postData); // here create is used create new  user ...
    // let's test this...
    res.status(201).json(newPost)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
  
})
// Mongoose Queries-2: Read-> Model.find()
// Route to fetch all user.

app.get('/users', async (req,res)=>{
  try{
    const users = await userModel.find() // Help us to find all the users...
    res.json(users);
  }
  catch(err){
    res.status(500).json({error: err.message})
  }
})

// Mongoose Queries-3: Read-> Model.findById()
// Route to fetch a user by ID

app.get('/users',async (req,res)=>{
  try{
    const userId = req.params.id
  // Use Model.findById() to retrieve a user..
  const user = await userModel.findById(userId);
  // just the condition if user not present..
  if(!user){
    res.status(404).json({error:'user not found'})
  }
  res.json(user)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
  
})

// Mongoose Queries-4: Read-> Model.findOne()
// Route to fetch a user by a condition (e.g., username)
app.get('users', async(req,res)=>{
  try{
     const condition = req.query.username;// get the condition from query parameters.

     // use Model.findOne() to retrieve a user by a condition...
    const user = await userModel.findOne({username:condition});
    if(!user){
      return res.status(404).json({error: 'user not found'})
    }
    res.json(user)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})

// Mongoose Queries-5: Update-> Model.updateOne()
// Route to update a user by a condition (e.g., username)

app.put('/users/:username', async (req,res)=>{
  try{
    const condition = req.params.username;// get the conditions from route Parameters.
    const UpdatedData= req.body;
    // use Model.UpdateOne() to updated a user by a condition..
    const result = await userModel.updateOne({username:condition},UpdatedData)
    if(result.nModified===0){
      return res.status(404).json({error:'User not found or no changes were made'})
    }
    res.json({message:'user Updated successfully'})
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Mongoose Queries-6: Update-> Model.updateMany()
// Route to update multiple users by a condition (e.g., age)
app.put('/users',async(req,res)=>{
  try{
    const condition = req.query.age;// Get the condition from query Parameters.
    const updatedData=req.body; // Get the updated body from the request body.
    // Use Model.UpdateMany() to update multiple users by a condition..
    const result = await userModel.updateMany({age:condition},updatedData);
    if(result.nModified===0){
      return res.status(404).json({error:'No users found'})
    }
    res.json({message:'Users updated successfully'})

  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Queries-7: Update-> Model.findOneAndUpdate()
// Route to find and update a user by a condition (e.g., username)

app.put('/users/:username',async(req,res)=>{
  try{
    const condition = req.params.username;// Get the condition from route Parameters
    const updatedData= req.body;// Get the Updated Data from the request body.

    const userData = await userModel.findOneAndUpdate({username:condition},updatedData,{
      new:true,
      runValidators: true
    })
    if(!user){
      res.status(404).json({message:'User not found'})
    }
    res.json(userData)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
})
// Mongoose Queries-8: Update-> Model.findByIdAndUpdate()
// Route to find and update a user by ID

app.put('/user/:id', async(req,res)=>{
  try{
    const userId = req.params.id;// get the user Id from route Parameters.
    const updatedBody =req.body; 
    const userData = await userModel.findByIdAndUpdate(userId,updatedBody,{
      new: true,
      runValidators:true
    })
    if(!userData){
      res.status(404).json({message:'user not found'})
    }
    res.status(userData)
  }
  catch(err){
    res.json({error:err.message})
  }
})
// Mongoose Queries-9: Update-> Model.deleteOne()
// Route to delete a user by a condition (e.g., username)

app.delete('/users/:username', async (req,res)=>{
  try{
    const condition = req.params.username;
    const result = await userModel.deleteOne({username:condition});
    if(result.deletedCount===0){
      return res.status(404).json({error:'User not Found'});
    }
    res.json({message:'User Deleted Successfully'})
  } 
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Queries-10: Update-> Model.deleteMany()
// Route to delete multiple users by a condition (e.g., age)

app.delete('/users',async (req,res)=>{
  try{
    const condition =  req.query.age;// Get the condition from query parameters...
    // Use Model.DeleteOne() to delete multiple users by a condition...
    const result =  await userModel.deleteMany({age:condition})
    if(result.deletedCount===0){
      return res.status(404).json({error:'User not found'})
    }
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Queries-11: Update-> Model.findOneAndDelete()
// Route to find and delete a user by a condition (e.g., username)

app.delete('/users/:username', async (req,res)=>{
  try{
    const condition =  req.params.username; // Get the condition from route Paramater..
    const user =  await userModel.findOneAndDelete({username:condition});
    if(!user){
      return res.status(404).json({error:'User not found'})
    }
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Mongoose Queries-12: Update-> Model.findByIdAndDelete()
// Route to find and delete a user by ID

app.delete('/users/:id',async(req,res)=>{
  try{
    const condition = req.params.id; // Get the user Id....

    const result = await userModel.findByIdAndDelete(condition)
    if(!result){
      return res.status(404).json({error:'User not found'});
    }
    res.json({message:'User deleted Successfully'})
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Mongoose Queries-13: Model.countDocuments()
// Route to count documents that match a condition (e.g., users with a specific role)

app.get('/userCount',async(req,res)=>{
  try{
    const condition =  {role: 'user'};// Specify the condition to count documents...
    const result =  await userModel.countDocuments(condition)
    res.json({result})
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Aggregation-1:Sample-Pipeline:
// Route to perform aggregation on user data

app.get('/userstats',async (req,res)=>{
  try{
    const Pipeline = [
      {
        $group: {
          _id:'$role',// Group by the role field..
          averageAge: {$avg:'$age'}// Calculate average age for each group,
        }
      }
    ]
    // use Model.aggregate() to perform aggregation..
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }

  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Create the Post...
app.post('/posts', async (req,res)=>{
  try{
    const postData= req.body;
    const newPost= await postModel.create(postData); // here create is used create new  user ...
    // let's test this...
    res.status(201).json(newPost)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
  
})
// Mongoose Aggregation-2:populate()
// Route to get posts and populate the author field

app.get('/posts',async(req,res)=>{
  try{
    // this populate will replace authors field with username email
    const result =  await postModel.find().populate('author','username email')
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-3: $match
// Route to perform aggregation with $match stage

app.get('/filteredUsers',async (req,res)=>{
  try{
    const minAge= parseInt(req.query.minAge) || 0;// here we get the min age for filtering the users
    // create the simple pipeline..
    const Pipeline = [
      {
        $match:{
          age: {$gte:minAge}
        }
      }
    ]
    const userData= await userModel.aggregate(Pipeline)
    res.json(userData)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-4: $project
// Route to perform aggregation with $project stage

app.get('/usersprotection', async(req,res)=>{
  try{
    // Example aggregation pipeline with $project stage to select specific fields.
    const Pipeline =[
      {
        $project:{
          _id:0, // Exclude the id field
          username:1, // Include the username field..
          age:1,// include the age field
          role:1,// include the role field
          fullName:{
            $concat:[
              '$username','(', {$toString:'$age'},'years old',//convert age to string..
            ]
          }

        }
      }
    ]
    // use Model.aggregate() to perform aggregation with $project stage..
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})


// Mongoose Aggregation-5: $Group
// Route to perform aggregation with $group stage

app.get('/usergroup', async(req,res)=>{
  try{
    // Create the simple pipeline..
    const Pipeline = [
      {
        $group:{
          _id: '$role',// group by the role field
          averageAge: {$avg:'$age'}

        }
      }
    ]
    // use Model.aggregate() to perform aggregation with $group stage..
    const result =  await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-6: $sort
// Route to perform aggregation with $sort stage


app.get('/usersort', async(req,res)=>{
  try{
    // use sort method to arrange our user according to accending, age...
    const Pipeline =[
      {
        $sort:{
          age: 1,// younger to older users....
        }
      }
    ]
    const result =  await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})


// Mongoose Aggregation-7: $limit
// Route to perform aggregation with $limit stage

app.get('/limitedusers',async(req,res)=>{
  try{
    const LimitValue = parseInt(req.query.limit);// You will this limit from query..
    const Pipeline=[
      {
        $limit:LimitValue
      }
    ]
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-8: $skip
// Route to perform aggregation with $skip stage

// Let's see the simple example where we will skip first 5 users from list using $skip..
app.get('/skippedusers',async(req,res)=>{
  try{
    const skipValue = parseInt(req.query.skip) || 0; // we get this value from query..
    const Pipeline =[
      {
        $skip: skipValue
      }
    ]
    const result = await userModel.aggregate(Pipeline)
    res.json(result);
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-9: $unwind
// Route to perform aggregation with $unwind stage

// The $unwind stage in MongoDB's aggregation framework is used to deconstruct arrays
// within documents and output one document for each element of the array. 
// It's commonly used when you have documents with arrays, and you want to perform operations on individual array elements.

// Let's understand with the simple example....
app.get('/userhobblies',async(req,res)=>{
  try{
    // Example aggregation pipeline with $unwind stage to decontruct the hobbies array.
    const Pipeline =[
      {
        $unwind: '$hobbies'// Decontruct the hobbies array...
      }
    ]
    // use Model.aggregate() to perform aggregation with $unwind stage....
    const result =  await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Aggregation-10: $lookup

// The $lookup stage in MongoDB's aggregation framework is used to perform a left outer join
// between two collections in a database. It allows you to combine documents from the current 
// collection (the "from" collection) with documents from another collection (the "localField"
//  collection) based on a specified key relationship.

/*

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  userId: mongoose.Schema.Types.ObjectId, // Reference to a user
  // ... other order properties
});
*/
// Route to perform aggregation with $lookup stage

app.get('/userOrders',async(req,res)=>{
  try{
    // Pipeline with $lookup stage to join User and Orders Collection....
    const Pipeline =[
      {
        $lookup:{
          from: 'orders',// the name of the target collection to join.
          localField:'_id',// The field from the current (User) that links to the target collection (orders)
          foreignField:'userId',// The field from the target collection (Order) that matches the localfield..
          as:'orders',/// the alias for the joined array field

        }
      }
    ]
    // use Model.aggregate() to perform aggregation with $lookup stage..
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-11: $out.

// The $out stage in MongoDB's aggregation framework is used to write the result of an aggregation
// pipeline to a specified collection in the database. It allows you to save the aggregated data 
// as a new collection or overwrite an existing collection with the aggregated data.

// Route to perform aggregation with $out stage
app.get('/createNewCollection',async(req,res)=>{
  try{
    // Aggregation pipeline with $out stage to create new collection...
    const Pipeline=[
      {
        $match:{
          age:{$gte:30}// filter users with age greater than or equal to 30
        }
      },
      {
        $out: 'newCollection'// create a new collection named 'newCollection'...
      }
    ]
    // use Model.aggregate() to perform aggregation with $out stage...
    await userModel.aggregate(Pipeline)
    res.json({message:'New Collection Created Successfully!'})
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-12: $addFields.

// The $addFields stage in MongoDB's aggregation framework is used to add new fields to documents in an aggregation pipeline. 
// It allows you to calculate or create new fields based on existing fields, constants, or expressions.

// Route to perform aggregation with $addFields stage

app.get('/addCustomField', async(req,res)=>{
  try{
    const Pipeline=[
      {
        $addFields:{
          fullName:{$concat:['$username','(',{$toString:'$age'},' Years Old)']}
        }
      }
    ]
    // use Model.aggregate() to perform aggregation with $addFields stage...
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Aggregation-13: $replaceRoot.

/*  The $replaceRoot stage in MongoDB's aggregation framework is used to replace
 the current document with a new document. It allows you to promote a subdocument 
 or a specific field to the top level of the resulting document structure. */
/*

// Define a User schema and model with nested address
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  address: {
    street: String,
    city: String,
    zipCode: String,
  },// this the address field.....
  // ... other user properties
});
*/ 
// Route to perform aggregation with $replaceRoot stage
app.get('/replaceRootAddress',async(req,res)=>{
  try{
    // Example aggregation pipeline with replaceroot stage to promote the address field...
    const Pipeline=[
      {
        $match:{
          username:'user6',//Filter docu by username
        }
      },
      {
        $replaceRoot:{
          newRoot:'$address'//Promote the 'address' field to the top level
        }
      }
    ]// This is the simple example of Replaceroot, THank's for watching..............
    const result =  await userModel.aggregate(Pipeline)// to perfrom aggregation with $replaceRoot Stage...
    res.status(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})


// Mongoose Aggregation-14: $facet.

// The $facet stage in MongoDB's aggregation framework allows you to perform multiple 
// separate aggregation operations within a single pipeline. 
// It's particularly useful when you need to compute multiple aggregations
//  on the same dataset and return the results as separate arrays or sets of documents.

// Route to perform aggregation with $facet stage

app.get('/aggregateUserData',async(req,res)=>{
  try{
    // Example Aggregation pipline with $facet stage to compute multiple aggregations.
    const Pipeline=[
      {
        $match:{
          age:{$gte:30}// Filter Users with age greate than or equal to 30
        }
      },
      {
        $facet:{
          //Define Multiple aggregation pipelines within $facet...
          totalUsers:[
            {
              $count: 'count'// Calculate the total number of users.
            },
          ],
          averageAge:[
            {
              $group:{
                _id:null,
                averageAge:{$avg:'$age'}// Calculate the average age of users.
              }
            }
          ]

        }
      }
    ]
    const result = await userModel.aggregate(Pipeline)
    res.json(result[0])// Extract the results from the $facet stage..
  }// Let's test api, Thank's for watching.........
  catch(err){
    res.status(505).json({error:err.message})
  }
})


// Mongoose Aggregation-15: $redact.


// The $redact stage in MongoDB's aggregation framework is used to control 
// the inclusion or exclusion of documents in the aggregation pipeline based
// on certain conditions. It allows you to filter documents and decide whether
// to keep, skip, or exclude them from the result set.


// Route to perform aggregation with $redact stage

// Let's explain this with simple example.....
app.get('/filterAdminUsers',async(req,res)=>{
  try{
    // Aggregation pipeline with $redact stage to filter admin users.
    const Pipeline=[
      {
        $redact:{
          $cond:{
            if:{$eq:['$role','admin']},// check if the user's role is admin..
            then:'$$KEEP',// Keep the document if the condition is true....
            else:'$$PRUNE',// Prune the document if the condition is false
          }
        }
      }
    ]
    // use Model.aggregate() to perform aggregation with $redact stage.
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})


// Mongoose Aggregation-16: $expr.

// Route to perform aggregation with $expr stage

// The $expr operator in MongoDB's aggregation framework 
// allows you to use aggregation expressions to perform 
// conditional operations within an aggregation pipeline. 
// It's useful when you need to compare fields, values, or
// perform conditional logic based on specific criteria.


// Define a User schema and model with age and retirementAge fields
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   age: Number,
//   retirementAge: Number, // Age at which a user can retire
//   // ... other user properties
// });


// Route to perform aggregation with $expr operator

// Let me explain this with simple example.....
app.get('/retirementEligiableUsers',async(req,res)=>{
  try{
    // Aggregation Pipeline with $expr operation to filter retirement-eligible users.
    const Pipeline= [
      {
        $match:{
          $expr:{
            $gte:['$age','$retirementAge'],// Check if age is greater than or equal to retirement age.
          }
        }
      }
    ]
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err) {
    res.status(505).json({error:err.message})
  }
})// This is simple example of it, i hope you like, Thank's for watching.......


// Mongoose Aggregation-17: $Merge.

// The $merge stage in MongoDB's aggregation framework is used 
// to write the result of an aggregation pipeline into a 
// specified collection or view. It allows you to create a new 
// collection or update an existing one with the documents 
// produced by the aggregation pipeline.

// Route to perform aggregation with $merge stage

// Let's see the simple example of it...
app.get('/mergeResult',async(req,res)=>{
  try{
    // Aggregation Pipeline with $merge stage to write results into a new collection
    const Pipeline =[
      {
        $match:{
           age:{$gte:30}// Filter users with age greater than or equal to  30..
        }
      },
      {
        $merge:{
          into:'filteredUserd',// Specify the name of the target collection....
        }
      }
      
    ]
    // use model.aggregate() to perform aggregation with $merge stage.
    await userModel.aggregate(Pipeline)
    res.json({message:'Aggregation Results merged into the  filterdUsers collection'})
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})


// Mongoose Aggregation-18: $graphLookup.

// The $graphLookup stage in MongoDB's aggregation framework is 
// used for recursive queries on graph data structures stored 
// in a collection. It allows you to perform hierarchical or 
// tree-like searches, such as finding ancestors or descendants 
// of a document in a graph.


// Define a Person schema and model for a family tree
// const personSchema = new mongoose.Schema({
//   name: String,// This is Person Schema...
//   parent: mongoose.Schema.Types.ObjectId, // Reference to the parent person
// });

// Route to perform aggregation with $graphLookup stage

// Let's Understands this with simple example.
app.get('/findAncestors',async(req,res)=>{
  try{
    // Aggregation Pipeline With $graphLookup stage to find ancestors...
    const Pipeline =[
      {
        $match:{
          name:'John'// Start with a person named 'john'
        }
      },
      {
        $graphLookup:{
          from:'people',// the Source collection..
          startWith:'$parent',// Field that contains the starting person's parent.
          connectToField:'_id',// Field that connects to the Id of other documents.
          as:'ancestors',// Alias for the result...

        }
      }

    ]
    // Use Model.aggregate to perform aggregation with $graphLookup stage.
    const result = await Person.aggregate(Pipeline)
    res.json(result)
  }
  catch{
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-19: $geoNear.

// The $geoNear stage in MongoDB's aggregation framework is used 
// to perform proximity-based searches, particularly in the context
//  of geospatial data. It allows you to find documents that are 
// near a specified geographic point and can calculate distances 
// between the documents and the given point.

/*
// Define a Location schema and model for geospatial data

const locationSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  // ... other location properties
});

locationSchema.index({ location: '2dsphere' }); // Create a 2dsphere index for geospatial queries

const Location = mongoose.model('Location', locationSchema);

*/
// Route to perform aggregation with $geoNear stage


app.get('/findNearByLocations',async(req,res)=>{
  try{
    // example aggregation pipeline with $geonear stage to find nearby locations..
    const Pipeline=[
      {
        $geoNear:{
          near:{
            type:'Point',
            coordinates:[longitude,latitude]// Provide the coordinates of the target location
          }
        },
        distanceField:'distance',// Field to store calculated distances,
        maxDistance:1000,//Maximum distance in meters
        spherical:true,//Use a spherical model..
      }
    ]
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-20: $bucket.

// The $bucket stage in MongoDB's aggregation framework is used 
// for grouping and categorizing documents into "buckets" based
// on specified criteria. It allows you to create histograms or
// group data into discrete ranges, making it useful for data 
// analysis and visualization.

// Define a Sale schema and model for sales data

/*
const saleSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  // ... other sale properties// This is the saleSchema
});

const Sale = mongoose.model('Sale', saleSchema);
*/
// Route to perform aggregation with $bucket stage

// Let's see the simple example of it.

app.get('/categorizeSales',async(req,res)=>{
  try{
    // Aggregation pipeline with Bucket stage to categorize sales by price range..
    const Pipeline=[
      {
        $bucket:{
          groupBy:'$price',// Field to group by (price in this case)
          boundaries:'[0,100,200,300]',// Price range boundaries..
          default:'Other',// Default bucket for values outside the sp. boundaries,
          output:{
            count:{$sum:1},// Count the number of sales in each bucket..
            totalPrice:{$sum:'$price'}//Calculate the total price in each bucket...
          }
        }
      }
    ]
    // Use Model.aggregate() to perform aggregation with $bucket stage...
    const result = await Sale.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})




// Mongoose Aggregation-21: $sortByCount.

// The $sortByCount stage in MongoDB's aggregation framework 
// is used to group documents by a specified field's values 
// and count the occurrences of each value. It is essentially
//  a combination of the $group and $sort stages, making it 
// convenient for tasks like creating frequency distributions 
// or finding the most common values in a field.


// Define a Product schema and model

/*

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  // ... other product properties
});

const Product = mongoose.model('Product', productSchema);

*/
// Route to perform aggregation with $sortByCount stage
app.get('/mostCommonCategories', async (req, res) => {
  try {
    // Example aggregation pipeline with $sortByCount stage to find most common categories
    const pipeline = [
      {
        $sortByCount: '$category', // Group and count by the 'category' field
      },
    ];

    // Use Model.aggregate() to perform aggregation with $sortByCount stage
    const result = await Product.aggregate(pipeline);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});