const router = require('express').Router()

const { Student, Campus } = require('../db/models');

//GET 
router.get('/',(req,res)=> {
	return Student.findAll({
		include: [{
			model: Campus
		}],
		order : ['id']
	})
		.then(students=> {
			console.log(students)
			res.json(students)
		})
})

//GET 
router.get(`/:id`, (req,res)=> {
	return Student.findById(req.params.id, {
		include : [{
			model : Campus
		}]
	})
		.then(student => {
			res.json(student)
		})
})

//CREATE
router.post('/', (req,res)=> {
	return Student.create(req.body)
		.then((student)=> {
			res.json(student)
		})
})

//PUT 
router.put('/:id',(req,res)=> {
	return Student.update(req.body, {
		where : {id : req.params.id}
	})
		.then((student)=> {
			res.json(student)
		})
})

//DELETE
router.delete('/:studentId', (req,res)=> {
	console.log('delete route', req.params.studentId)
	return Student.destroy({
		where : { id : req.params.studentId }
	})
		.then(()=> {
			res.json()
		})
})


module.exports = router
