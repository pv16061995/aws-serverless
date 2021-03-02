const express=require('express');
var router=express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Employee }=require('../models/employee');


router.get('/list',(req,res)=>{
	Employee.find((err,docs)=>{
		if(!err)
		{
			response={"statuscode":200,"data":docs}
			//response=docs;
		}else{
			response={"statuscode":400,"data":err}
			console.log('Error in receive Employee:'+json.stringfy(err,undefined,2));
		}
		res.send(response);		
	});
});

router.get('/list/:id',(req,res)=>{
	if(!ObjectId.isValid(req.params.id))
	return res.send({"statuscode":400,"data":"No record found!!!"});

	Employee.findById(req.params.id,(err,docs)=>{
		if(!err)
		{
			response={"statuscode":200,"data":docs}
		}else{
			response={"statuscode":400,"data":err}
			console.log('Error in receive Employee:'+json.stringfy(err,undefined,2));
		}
		res.send(response);		
	});
});



router.post('/save',(req,res)=>{
	var emp=new Employee({
		'name':req.body.name,
		'position':req.body.position,
		'office':req.body.office,
		'salary':req.body.salary,
	});

	emp.save((err,docs)=>{
		if(!err)
		{
			response={"statuscode":200,"data":docs._id}
		}else{
			response={"statuscode":400,"data":err}
			console.log('Error in receive Employee:'+json.stringfy(err,undefined,2));
		}
		res.send(response);		
	});
});


router.put('/update/:id',(req,res)=>{
	if(!ObjectId.isValid(req.params.id))
	return res.send({"statuscode":400,"data":"No record found!!!"});
	
	var emp={
			'name':req.body.name,
			'position':req.body.position,
			'office':req.body.office,
			'salary':req.body.salary,
		};

	Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,docs)=>{
		if(!err)
		{
			response={"statuscode":200,"data":docs}
		}else{
			response={"statuscode":400,"data":err}
			console.log('Error in Update Employee:'+json.stringfy(err,undefined,2));
		}
		res.send(response);		
	});
});
router.delete('/delete/:id',(req,res)=>{
	if(!ObjectId.isValid(req.params.id))
	
	return res.send({"statuscode":400,"data":"No record found!!!"});

	Employee.findByIdAndRemove(req.params.id,(err,docs)=>{
		if(!err)
		{
			response={"statuscode":200,"data":docs}
		}else{
			response={"statuscode":400,"data":err}
			console.log('Error in Delete Employee:'+json.stringfy(err,undefined,2));
		}
		res.send(response);		
	});
});

module.exports = router;