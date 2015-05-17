var express = require('express');
var underscore = require('underscore');

var routes = function(Product){

    var productRouter = express.Router();
    productRouter.route('/')
        .post(function(req, res){
            var product = new Product(req.body);

            product.save();
            res.status(201).send(product);
        })
        .get(function(req, res){

            var query = {};
            var tagsString=[];
            var tagsRegExp =[]; 

            if(req.query.tags)
            {
                tagsString = req.query.tags.split(" ");
                
                for(var i=0; i<tagsString.length;i++)
                    tagsRegExp[i] =new RegExp(tagsString[i], 'i');
                query.tags = {$in:tagsRegExp};
                
            }
            if(req.query.productType && req.query.productType!='Todos')
            {
                query.productType = req.query.productType;
            }
            //var a=new RegExp("pal", 'i').toString();
            //console.log("hello"+a);
            Product.find(query, function(err, products){
                if(err)
                    console.log(err);
                else{
                    var result;
                    result= {data:products};
                    res.json(products);
                }
            })
            //.where('tags').in(tagsRegExp);
            //.select({name : 1,imageUrl :1, normalSellingPricePerPackage: 1})
            .limit(50);
   
    });

    productRouter.use('/:productId', function(req, res, next){
        Product.findById(req.params.productId, function(err, product){
            if(err)
                res.status(500).send(er);
            else if(product){
                req.product = product;
                next();
            }
            else{
                res.status(404).send('no product found');                
            }
        });            
    });
    productRouter.route('/:productId')
        .get(function(req, res){

            res.json(req.product);
        })
        .put(function(req, res){            
            req.product.name = req.body.name;
            req.product.quantity = req.body.quantity;
            req.product.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.product);                    
                }
            });                                        
        })
        .patch(function(req, res){ 
            if(req.body._id)
                delete req.body._id;
        
            for(var key in req.body){
                req.product[key] = req.body[key];
            }
            req.product.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.product);                    
                }
            });
        })
        .delete(function(req, res){
            req.product.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');                    
                }                
            });        
        }); 
    return productRouter;
};

module.exports = routes;

