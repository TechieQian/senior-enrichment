const router = require('express').Router();

const { Student, Campus } = require('../db/models');

//GET 
router.get('/',(req,res)=> {
	return Campus.findAll()
		.then(campuses=> {
			res.json(campuses)
		})
})

//GET 
router.get('/:id',(req,res)=> {
	return Campus.findById(req.params.id, {
		include : [{model : Student}]
	})
		.then(campus=> {
			res.json(campus)
		})
})

//DELETE
router.delete('/:campusId', (req,res)=> {
	return Campus.destroy({
		where : { id : req.params.campusId }
	})
})

//CREATE
router.post('/', (req,res)=> {
	return Campus.create(req.body)
		.then((campus)=> {
			res.json(campus)
		})
})

//PUT 
router.put('/:id',(req,res)=> {
	return Campus.update(req.body, {
		where : {id : req.params.id}
	})
		.then((campus)=> {
			res.json(campus)
		})
})

module.exports = router


