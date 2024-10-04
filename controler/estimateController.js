 

const getallestimate = async(req,res,next) =>{
    let {username} =req.body;
    let userid=req.param.userid;
    return res.status(200).json('estimate');
}

const newestimate = async (req,res,next) =>{
    let singleestimate =req.body;
    let userid=req.param.userid;
   
    
    return res.status(200).json('new estimation added '+singleestimate);
}

const updateestimate = async (req,res,next) =>{
    let singleestimate =req.body;
    let userid=req.param.userid;
   
    
    return res.status(200).json('estimate updated'+singleestimate);
}

exports.getallestimate=getallestimate;
exports.newestimate=newestimate;
exports.updateestimate=updateestimate;