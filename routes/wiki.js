var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page; 
var User = models.User; 



router.get('/',function(req,res)
{
	console.log('default wiki page');
	res.redirect('/');
});

router.post('/',function(req,res)
{
	// STUDENT ASSIGNMENT:
	console.log(req.body);
  // add definitions for `title` and `content`
  var title = req.body.title;

  var page = Page.build({
    title: title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(
  	res.redirect('/')
  	);
  // -> after save -> res.redirect('/');


});

router.get('/add',function(req,res)
{
	console.log('add wiki page');
	res.render('addpage');
});








module.exports = router;	





