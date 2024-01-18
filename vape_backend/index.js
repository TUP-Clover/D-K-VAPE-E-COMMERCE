import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express()


app.listen(8800, () =>{
 console.log("connected to backend")
})

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"MyNewPass",
    database:"vape_db"
})

app.use(express.json())
app.use(cors())
app.use(express.static('public'));

app.get("/", (req, res) =>{
    res.json("this is the backend")
})

//Login ADMIN
app.get("/admin", (req, res)=>{
    const q = "SELECT `username`, `password` FROM admin"
    
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })

    
})

// Fetching the vape products data
app.get("/vape", (req, res) =>{
    const q = "SELECT * FROM vape"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

const adminstorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/images")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});
const adminupload = multer({ storage: adminstorage });

app.post("/vape", adminupload.single('image'), (req, res) =>{
    const q = "INSERT INTO vape (`brand`,`product_name`,`flavor`,`size`,`battery_capacity`,`nicotine`,`puffs`,`coil`,`charger`,`duration`,`price`,`image`) VALUES(?)";
    const values=[ 
         req.body.brand,  
         req.body.product_name,
         req.body.flavor,
         req.body.size,
         req.body.battery_capacity, 
         req.body.nicotine, 
         req.body.puffs,
         req.body.coil, 
         req.body.charger, 
         req.body.duration, 
         req.body.price, 
         req.file ? req.file.filename : null
    ];
    console.log(values);

    db.query(q,[values], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error creating product." });
        }
        return res.json({ message: "Product created successfully." });
    });  
})

app.delete("/vape/:vapeID", (req, res)=>{
        const vapeid = req.params.vapeID;
        const q ="DELETE FROM vape WHERE vapeID = ?"

        db.query(q, [vapeid], (err,data)=>{
        if (err)  return res.json(err);
        return res.json("vape product deleted");
        })
    })
    
app.put("/vape/:vapeID", adminupload.single('image'), (req, res)=>{
        const vapeid = req.params.vapeID;
     /*   const image = req.params.image;
        const imagePath = "./public/images/" + image;*/
      const q ="UPDATE vape SET `brand`= ?, `product_name` = ?, `flavor`= ?, `size` = ?, `battery_capacity` = ?, `nicotine`= ?, `puffs`= ?, `coil`= ?, `charger`= ?, `duration`= ?, `price`= ?, `image`= ? WHERE `vapeID` = ?"
       
        const values=[ 
            req.body.brand,  
            req.body.product_name,
            req.body.flavor,
            req.body.size,
            req.body.battery_capacity, 
            req.body.nicotine, 
            req.body.puffs,
            req.body.coil, 
            req.body.charger, 
            req.body.duration, 
            req.body.price, 
            req.file.filename,
            vapeid
       ];

       if (req.file) {
        values.push(req.file.filename);

        // Delete the old image file if it exists
        const imagePath = "./public/images/" + req.body.oldImage; // Provide the field name used to store the old image
        const imagePathExists = fs.existsSync(imagePath);

        if (imagePathExists) {
            fs.unlinkSync(imagePath);
        }
    }
        db.query(q, [...values,vapeid], (err,data)=>{
        if (err)  return res.json(err);
        return res.json("vape product updated");
        })
    })

// Form collecting the inquiries from buyer

app.post("/customer_table", (req,res)=>{
    const q="INSERT INTO customer_table (`first_name`, `last_name`, `email`, `address`,`contact_number`, `vape_vape_id`) VALUES (?)";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.address,
        req.body.contact_number,
        req.body.vape_vape_id,
    ];console.log(values);

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Successfully added")
    })
})

// API THAT GET THE INQUIRIES FROM DB TO ADMIN

app.get("/customer_table", (req, res) => {
    const q = "SELECT * FROM customer_table";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });