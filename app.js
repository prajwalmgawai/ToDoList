// const express=require("express");
// const app=express();

// app.set("view engine", "ejs");

// app.get('/', function(req, res){

// // var date=new Date();
// // var day=date.getDay();
// var day=0;
// if((day==0) || (day==6)){
//     day="weekend";
// res.render("index", {day1:day});
// }else{
//     day="working day";
// res.render("index", {day1:day});
// } 
// });

// app.listen(3000, function(req, res){
//     console.log("running on port 3000");
// })












// const express=require("express");
// const app=express();

// app.set("view engine", "ejs");

// app.get('/', function(req, res){

// var date=new Date();
// // var day=date.getDay();
// // var day=0;                         
// //                                                      iiiimmmmmmmpppppppppppppppppppppppppppppppppppppppp



// var options={     // here, we can not change weekday, day nd month naming they are not var's they are constants
//   weekday: "long",         // weekday means day i.e sunday or  monday, or ....// here long is for character.
// day: "numeric",             // day is a date here.
// month: "long"             // here long is for character.
// };

// var day1=date.toLocaleDateString("en-US",options);     // if we dont use this fun'n then we will get in 1/4/2023 this format. now it is in Wednesday, January 4

 
// res.render("index", {day:day1});
// });

// app.listen(3000, function(req, res){
//     console.log("running on port 3000");
// });
















const express=require("express");
const bodyparser=require('body-parser');
const { urlencoded } = require("body-parser");
const app=express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('strictQuery', false);
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");




const itemSchema=mongoose.Schema({
  name: String
});

const item=mongoose.model("item", itemSchema);

const item1=new item({
  name: "Welcome to your toDoList" 
});
const item2=new item({
  name: "Hit + button to add new element" 
});
const item3=new item({
  name: "<-- Hit this to delete an item" 
});


var DefaultItems=[item1, item2, item3];

const ListSchema=mongoose.Schema({
  name: String, 
  items: [itemSchema]
});

const List=mongoose.model("List", ListSchema);




app.get('/', function(req, res){
  
item.find({}, function(err, content){
  if(err){
    console.log(err);
  }
if(content.length==0){
  item.insertMany(DefaultItems, function(err, content){
    if(err){
      console.log(err);
    }
  });

  res.redirect("/");
}
else{
res.render("index", {day1: "today", ite: content})
}
})

});




app.get("/:customListName", function(req, res){
const customListName=req.params.customListName;
List.findOne({name: customListName}, function(err, found){
  if(!err){
    if(!found){
      var new_item=new List({
        name: customListName,
        items: DefaultItems
      });
      new_item.save();
      res.redirect("/"+ customListName);
    }else{
      res.render("index", {day1: found.name, ite: found.items});
    }
  }
})


})






app.post("/", function(req, res){
var title=req.body.bttn;
var content=req.body.addtask;                 

const newitem=new item({
  name: content
});

if(title== "today"){
  newitem.save();
  res.redirect("/");
}
else{
  List.findOne({name: title}, function(err, found){
    found.items.push(newitem);                                   // imppppppppppppppppppppppppppppppppppppp
    found.save();
    res.redirect("/"+ title);
  });
}

});

app.post("/delete", function(req, res){
  var eledele=req.body.dele;
  item.findByIdAndRemove(eledele, function(err, content){
    if(err){
      console.log(err);
    }else{
      console.log("successfully deleted");
    }
  });
  res.redirect("/");
}
)





// app.get("/work", function(req, res){
//   console.log(req.body);
//   res.render("index", {day1 : "Work",ite : items2});
// })

app.listen(3000, function(req, res){
    console.log("running on port 3000");
});



// the concept behind above code is :
// when we do console.log(req.body);  we will get {newitem: newitementered, button_name: button_value}
// so using this fact we made logic, we replace button value with our page title i.e and our page title is different for different pages so from that we create this logic



// exporting functions :

// var ans= function(num){         // we can do like this to directly store return value of function into it.
//   return num*num;
// }
// we can export functions from other Files :
// module.exports.function_name=ans;

// and import in our file like function_name();

// and in our main file should import exporting file first like :
// const any_variable=require(__dirname, "/file_name");

// and much more read from code with harry's notes.
