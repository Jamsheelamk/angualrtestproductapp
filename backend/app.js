const express= require('express');
const ProductData= require('./src/model/Productdata');
const cors=require('cors');
var bodyparser= require('body-parser');
var app=new express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('./public'));
const port = process.env.PORT || 3000; 
app.use(cors());

app.use(bodyparser.json());


app.get('/products', function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE,OPTIONS');

    ProductData.find()
        .then(function(products){                                                          
            res.send(products);
           
        });
});
app.get('/:id',  (req, res) => {
  
    const id = req.params.id;
      ProductData.findOne({"_id":id})
      .then((product)=>{
          res.send(product);
      });
  })
  

app.post('/insert', function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE,OPTIONS');
    console.log(req.body);
    var product = {
        productId: req.body.product.productId,
        productName: req.body.product.productName,
        productCode: req.body.product.productCode,
        releaseDate: req.body.product.releaseDate,
        description: req.body.product.description,
        price: req.body.product.price,
        starRating: req.body.product.starRating,
        imageUrl: req.body.product.imageUrl
    }
    var product = new ProductData(product);
    product.save();


});

app.put('/update',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    productId= req.body.productId,
    productName = req.body.productName,
    productCode = req.body.productCode,
    releaseDate = req.body.releaseDate,
    description = req.body.description,
    price = req.body.price,
    starRating = req.body.starRating,
    imageUrl = req.body.imageUrl
   ProductData.findByIdAndUpdate({"_id":id},
                                {$set:{"productId":productId,
                                "productName":productName,
                                "productCode":productCode,
                                "releaseDate":releaseDate,
                                "description":description,
                                "price":price,
                                "starRating":starRating,
                                "imageUrl":imageUrl}})
   .then(function(){
       res.send();
   })
 })
 
app.delete('/remove/:id',(req,res)=>{
 
   id = req.params.id;
   ProductData.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('confirm delete?')
       res.send();
   })
 })

// app.listen(3000,function(){
//     console.log('port ready at 3000');
app.listen(port,()=>{console.log("server ready at" + port)});
// });
