const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve mock_questions folder statically (after payment verified)
app.use("/mock_questions", express.static("mock_questions"));

// Endpoint to verify Paystack payment
app.post("/verify-payment", async (req, res) => {
  const { reference, file } = req.body;
  if(!reference || !file) return res.status(400).json({status:false, message:"Missing reference or file"});

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    if(response.data.status && response.data.data.status === "success"){
      // Payment successful, provide download link
      return res.json({status:true, downloadUrl:`/mock_questions/${file}`});
    } else {
      return res.status(400).json({status:false, message:"Payment not successful"});
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({status:false, message:"Server error"});
  }
});

// Optional: store comments in JSON
app.post("/save-comment", (req,res) => {
  const { name, comment } = req.body;
  if(!name || !comment) return res.status(400).json({status:false, message:"Missing fields"});

  const commentsFile = "comments.json";
  let comments = [];
  if(fs.existsSync(commentsFile)) {
    comments = JSON.parse(fs.readFileSync(commentsFile));
  }
  comments.push({name, comment, date: new Date()});
  fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
  res.json({status:true, message:"Comment saved"});
});

// Fetch comments
app.get("/comments", (req,res) => {
  const commentsFile = "comments.json";
  if(fs.existsSync(commentsFile)) {
    const comments = JSON.parse(fs.readFileSync(commentsFile));
    return res.json(comments);
  } else {
    return res.json([]);
  }
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
