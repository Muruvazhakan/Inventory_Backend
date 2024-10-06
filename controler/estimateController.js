 
let estimate =[{clientAdd : "add", clientName: "name",clientPhno:"1231",estimatedate:"06/10/2024",estimatedate1:"2024-10-06",estimateid: "ES20241061000", grandtotalpvccost: "0.02",
     grandtotalupvccost:"0.02", grandtotalwoodcost:"0.02",granttotalsqft:"0.014",userid:"12" },
     {clientAdd : "add", clientName: "name",clientPhno:"1231",estimatedate:"06/10/2024",estimatedate1:"2024-10-06",estimateid: "ES20241061000", grandtotalpvccost: "0.02",
        grandtotalupvccost:"0.02", grandtotalwoodcost:"0.02",granttotalsqft:"0.014",userid:"12" },
        {clientAdd : "add", clientName: "name",clientPhno:"1231",estimatedate:"06/10/2024",estimatedate1:"2024-10-06",estimateid: "ES20241061000", grandtotalpvccost: "0.02",
            grandtotalupvccost:"0.02", grandtotalwoodcost:"0.02",granttotalsqft:"0.014",userid:"13" }
    ];
 
const getallestimate = async(req,res,next) =>{
    let {username} =req.body;
    let userid=req.params.userid;
    console.log(req.params.toString());
    let filteruserdata=estimate.filter((item)=>{
        return item.userid ===userid;
    })
    return res.status(200).json(filteruserdata);
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