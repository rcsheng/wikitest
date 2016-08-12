var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');


var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        validate: {
        	allowNull: false
        }
        
    },
    urlTitle: {
        type: Sequelize.STRING,
        validate:
        {
        	allowNull: false       	
        }  
    },
    route:
    {
    	type: Sequelize.VIRTUAL,
    	get      : function()  {
	      
	      return '\/wiki\/' + this.getDataValue('urlTitle');
	    }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
        	allowNull: false,
        	isEmail: true
        }
        
    }
});


function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

Page.hook('beforeValidate', function(page, options) {
	console.log('hooked!!!',page);
  page.urlTitle = generateUrlTitle(page.title);
  console.log(page.urlTitle)
})

module.exports = {
  Page: Page,
  User: User
};

