import express from "express";
const router = express.Router();
var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')
const func = require('./functions')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

const upload = require('express-fileupload')
const fs = require('fs')
router.use(upload())

// const storage = '/var/www/totalinfrasolutions.in/public_html/public/images/'
const storage = './src/public/images/'

router.get('/AdminUsers', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =   `SELECT name, email, role, created_at FROM users`
    pool.query(sql, (err, results) => {
        try{
            if(results){ res.send({ data: results }) }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }        
    })    
}))

router.get('/AdminMetas', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, title, url, description, keyword, updated_at FROM metas ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(results){ res.send({ data: results }); }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.post('/addMeta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        "url":                req.body.url,
        "title":              req.body.title,
        "description":        req.body.description,
        "keyword":            req.body.keyword,
        "created_at":         time,
        "updated_at":         time,
    }
    let sql = 'INSERT INTO metas SET ?'
    pool.query(sql, post, (err, results) => {
        try{
            if(results){
                let sql = `SELECT id, title, url, description, keyword, updated_at FROM metas ORDER BY id DESC LIMIT 1`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Meta added successfuly' });
                        }else if(err2){ throw err2 }
                    }catch(e){
                      func.logError(e)
                      res.status(500);
                      return;
                    }
                })
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.post('/updateMeta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        "url":                req.body.url,
        "title":              req.body.title,
        "description":        req.body.description,
        "keyword":            req.body.keyword,
        "updated_at":         time,
    }
    let sql = `UPDATE metas SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(results){
                let sql = `SELECT id, title, url, description, keyword, updated_at FROM metas WHERE id = ${req.body.id}`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Meta updated successfuly' });
                        }else if(err2){ throw err2 }
                    }catch(e){
                      func.logError(e)
                      res.status(500);
                      return;
                    }
                })
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/adminBlogMeta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, name, url FROM blog_metas ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(results){ res.send({ data: results }); }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.post('/addBlogMeta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        "type":                 req.body.type,
        "url":                  req.body.url,
        "created_at":           time,
        "updated_at":           time,
    }
    if(req.body.type === 'page'){
        if(req.files.cover){
            var file = req.files.cover
            var filename = file.name
            file.mv(storage+'cover/'+filename, function(err){ if(err){ console.log('err', err) } })
            post.name = filename
        }
    }else{
        post.name = req.body.name
    }    
    let sql = 'INSERT INTO blog_metas SET ?'
    pool.query(sql, post, (err, results) => {
        try{ if(err) throw err;
            if(err){ res.send({ success: false, message: err.sqlMessage }) }
            if(results){
                let sql = `SELECT id, type, name, url, updated_at FROM blog_metas ORDER BY id DESC LIMIT 1`
                pool.query(sql, (err, results2) => {
                    try{ if(err) throw err;
                        res.send({ success: true, data: results2[0], message: 'Blog meta added successfuly' });
                    }catch(e){ func.logError(e); res.status(403); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.post('/updateBlogMeta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= { 
        "type":                 req.body.type,
        "url":                  req.body.url,
        "updated_at":           time
    }
    if(req.body.type === 'page'){
        if(req.files.cover){
            var file = req.files.cover
            var filename = file.name
            var oldCover = req.body.oldCover
            if(oldCover){
                if (fs.existsSync(storage+'cover/'+oldCover)) { fs.unlinkSync(storage+'cover/'+oldCover) }
                file.mv(storage+'cover/'+filename, function(err){ if(err){ console.log('err', err) } })
            }
            post.name = filename
        }
    }else{
        post.name = req.body.name
    }
    let sql = `UPDATE blog_metas SET ? WHERE id = ${req.body.id} `;
    pool.query(sql, post, (err, results) => {
        try{ if(err) throw err;
            if(err){ res.send({ success: false, message: err.sqlMessage }) }
            if(results){
                let sql = `SELECT id, type, name, url, updated_at FROM blog_metas WHERE id = ${req.body.id}`
                pool.query(sql, (err, results2) => {
                    try{ if(err) throw err;
                        res.send({ success: true, data: results2[0], message: 'Blog meta updated successfuly' })
                    }catch(e){ func.logError(e); res.status(403); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.get('/adminBlogs', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, title, url, coverImg, updated_at FROM blogs ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(results){ res.send({ data: results }); }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/blogMetaOptions', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =   `SELECT name as text, id as value FROM blog_metas WHERE type = 'category';
                SELECT name as text, id as value FROM blog_metas WHERE type = 'tag';`
    pool.query(sql, [1, 2], (err, results) => {
        try{
            if(results){
                res.send({ 
                    catOptions:             results[0],
                    tagOptions:             results[1]
                });
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    });
}))

router.post('/addBlog', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'title':                req.body.title,
        'url':                  req.body.url,
        'content':              req.body.content,
        'category':             req.body.category,
        'tag':                  req.body.tag,
        "created_at":           time,
        "updated_at":           time,
    }
    if(req.files){
        var file = req.files.file
        var filename = file.name
        post.coverImg = filename
        file.mv(storage+'blog/'+filename, function(err){ if(err){ func.logError(err) } })
    }
    let sql = `INSERT INTO blogs SET ?`
    pool.query(sql, post, (err, results) => {
        try{
            if(results){
                res.send({ success: true, message: 'Blog added successfuly' });
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/getBlog/:id', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, title, url, coverImg, content, category, tag, updated_at FROM blogs WHERE id = '${req.params.id}'`
    pool.query(sql, async(err, results) => {
        try{
            if(results){ 
                const catList = await func.catName(JSON.parse(results[0].category))
                const tagList = await func.tagName(JSON.parse(results[0].tag))
                res.send({ data: results[0], catList, tagList });
            }else if(err){ throw err }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateBlog', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'title':                req.body.title,
        'url':                  req.body.url,
        'content':              req.body.content,
        'category':             req.body.category,
        'tag':                  req.body.tag,
        "updated_at":           time,
    }
    if(req.files){
        var file = req.files.file
        var filename = file.name
        post.coverImg = filename
        file.mv(storage+'blog/'+filename, function(err){ if(err){ func.logError(e) } })
        if (fs.existsSync(storage+'blog/'+req.body.oldCoverImg)) { fs.unlinkSync(storage+'blog/'+req.body.oldCoverImg) }
    }
    let sql = `UPDATE blogs SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(results){
                let sql = `SELECT id, title, url, coverImg, category, tag, content, updated_at FROM blogs WHERE id = ${req.body.id}`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Blog updated successfuly' });
                        }else if(err2){ throw err2 }
                    }catch(e){
                      func.logError(e)
                      res.status(500);
                      return;
                    }
                })
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }        
    })
}))

router.post('/addComment', asyncMiddleware( async(req, res, next) => {
    let post= {
        "blogId":                   req.body.id,
        "c_order":                  req.body.order,
        "status":                   req.body.status,
        "commentId":                req.body.commentId,
        "user":                     req.body.name,
        "email":                    req.body.email,
        "comment":                  req.body.comment,
        "created_at":               time,
        "updated_at":               time,
    }
    let sql = 'INSERT INTO comments SET ?'
    pool.query(sql, post, (err, results) => {
        try{
            if(results){ res.send({ success: true, message: 'Comment submitted for approval' }); }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.post('/updateComment', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'user':                 req.body.name,
        'email':                req.body.email,
        'comment':              req.body.comment,
        'status':               req.body.status,
        "updated_at":           time,
    }
    let sql = `UPDATE comments SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(results){
                let sql =   `SELECT a.id, a.blogId, a.c_order, a.commentId, a.user, a.email, a.comment, a.status, a.updated_at, b.url, b.title FROM comments as a
                    left join blogs as b on b.id = a.blogId WHERE a.id = ${req.body.id}`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Comment updated successfuly' });
                        }else if(err2){ throw err2 }
                    }catch(e){
                      func.logError(e)
                      res.status(500);
                      return;
                    }
                })
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/adminComments', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =   `SELECT a.id, a.blogId, a.c_order, a.commentId, a.user, a.email, a.comment, a.status, a.updated_at, b.url, b.title FROM comments as a
                left join blogs as b on b.id = a.blogId  ORDER BY a.id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(results){ res.send({ data: results }); }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/adminContacts', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT name, email, phone, message, created_at FROM contact_forms ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(results){ res.send({ data: results }); }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/adminBasic', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, name, tab1, tab2 FROM basic ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(results){ res.send({ data: results }); }else if(err){ throw err }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addBasic', asyncMiddleware( async(req, res, next) => {
    let post= {
        "type":                         req.body.type,
        "tab1":                         req.body.tab1,
        "tab2":                         req.body.tab2,
        "created_at":                   time,
        "updated_at":                   time,
    }
    if(req.files){
        if(req.files.image){
            var file = req.files.image
            var imageName = file.name
            post.name = imageName
            file.mv(storage+'basic/'+imageName, function(err){ if(err){ func.logError(err) } })
        }
    }else{
        post.name = req.body.name
    }
    let sql = 'INSERT INTO basic SET ?'
    pool.query(sql, post, (err, results) => {
        try{
            if(results){
                let sql = `SELECT id, type, name, tab1, tab2 FROM basic ORDER BY id DESC LIMIT 1`
                pool.query(sql, (err2, results2) => {
                    try{ if(err2) throw err;
                        res.send({ success: true, data: results2[0], message: 'Basic added successfuly' });
                    }catch(e){ func.logError(e); res.status(403); return; }
                })
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.post('/updateBasic', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        "type":                         req.body.type,
        "tab1":                         req.body.tab1,
        "tab2":                         req.body.tab2,
        "updated_at":                   time,
    }
    if(req.files){
        if(req.files.image){
            var file = req.files.image
            var imageName = file.name
            post.name = imageName
            file.mv(storage+'basic/'+imageName, function(err){ if(err){ func.logError(err) } })
            if (fs.existsSync(storage+'basic/'+req.body.oldImage)) { fs.unlinkSync(storage+'basic/'+req.body.oldImage) }
        }
    }else{
        post.name = req.body.name
    }
    let sql = `UPDATE basic SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(results){
                let sql = `SELECT id, type, name, tab1, tab2 FROM basic WHERE id = ${req.body.id}`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Basic updated successfuly' });
                        }else if(err2){ throw err2 }
                    }catch(e){
                      func.logError(e)
                      res.status(500);
                      return;
                    }
                })
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/addProductOptions', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT name as text, id as value FROM basic Where type='Category';
                SELECT name as text, id as value FROM basic Where type='Tag';
                SELECT name as text, id as value FROM basic Where type='Vendor';`
    pool.query(sql, [1,2,3], (err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                res.send({ 
                    catOptions: results[0],
                    tagOptions: results[1],
                    vendorOptions: results[2]
                });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addProduct', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'vendor':               req.body.vendor,
        'name':                 req.body.name,
        'url':                  req.body.url,
        'status':               req.body.status,
        'category':             req.body.category,
        'tags':                 req.body.tags,
        'shortDesc':            req.body.shortDesc,
        'longDesc':             req.body.longDesc,
        'price':                req.body.price,
        'rating':               0,
        "updated_at":           time,
    }
    if(req.files.images){
        var images = []
        for(var i = 0; i < req.files.images.length; i++){
            var file = req.files.images[i]
            var filename = Date.now() + '-' + file.name;
            images.push(filename)
            file.mv(storage+'product/'+filename, function(err){ if(err){ func.logError(err) } })
        }
        post.images = JSON.stringify(images)
    }
    let sql = `INSERT INTO products SET ?`
    pool.query(sql, post, (err, results) => {
        try{    
            if(results){ res.send({ success: true, message: "Product added succesfully" }) }else if(err){ throw err }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/getProducts', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =   `SELECT a.id, a.name, a.images, a.url, a.images, a.vendor, a.price, a.rating, a.status, a.updated_at, b.name as vendor FROM products as a
                left join basic as b on b.id = a.vendor ORDER BY a.id DESC`
    pool.query(sql, (err, results) => {
        try{    
            if(err){ throw err }
            if(results){ res.send({ data: results }) }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/changeProductStatus', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        "id":                       req.body.id,
        "status":                   req.body.status,
        "updated_at":               time,
    }
    let sql = `UPDATE products SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql =   `SELECT a.id, a.name, a.images, a.url, a.images, a.vendor, a.price, a.rating, a.status, a.updated_at, b.name as vendor FROM products as a
                left join basic as b on b.id = a.vendor WHERE a.id = '${req.body.id}';`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Product updated successfuly' });
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/editProductData/:id', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =    `SELECT a.id, a.vendor as vendorId, a.name, a.images, a.url, a.images, a.category, a.tags, a.shortDesc, a.longDesc, a.price, a.status, b.name as vendor 
                FROM products as a
                left join basic as b on b.id = a.vendor WHERE a.id = '${req.params.id}';
                SELECT name as text, id as value FROM basic Where type='Category';
                SELECT name as text, id as value FROM basic Where type='Tag';
                SELECT name as text, id as value FROM basic Where type='Vendor';`
    pool.query(sql, [1,2,3,4], async(err, results) => {
        try{ 
            if(err){ throw err }   
            if(results){ 
                const catList = await func.productCatName(JSON.parse(results[0][0].category))
                const tagList = await func.productTagName(JSON.parse(results[0][0].tags))
                res.send({ 
                    data:               results[0][0],
                    catOptions:         results[1],
                    tagOptions:         results[2],
                    vendorOptions:      results[3],
                    catList:            catList,
                    tagList:            tagList
                });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateProduct', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'vendor':               req.body.vendor,
        'name':                 req.body.name,
        'url':                  req.body.url,
        'status':               req.body.status,
        'category':             req.body.category,
        'tags':                 req.body.tags,
        'shortDesc':            req.body.shortDesc,
        'longDesc':             req.body.longDesc,
        'price':                req.body.price,
        "updated_at":           time,
    }
    if(req.files){
        if(req.files.images){
            var images = []
            for(var i = 0; i < req.files.images.length; i++){
                var file = req.files.images[i]
                var filename = Date.now() + '-' + file.name;
                images.push(filename)
                file.mv(storage+'product/'+filename, function(err){ if(err){ func.logError(err) } })
            }
            var oldImages = JSON.parse( req.body.oldImages )
            for(var i = 0; i < oldImages.length; i++){
                if (fs.existsSync(storage+'product/'+oldImages[i])) { fs.unlinkSync(storage+'product/'+oldImages[i]) }
            }
            post.images = JSON.stringify(images)
        }
    }
    let sql = `UPDATE products SET ? WHERE id = ${req.body.id}`
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ success: true, message: "Product updated succesfully" }) }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/placeOrder', asyncMiddleware( async(req, res) => {
    const id                = await func.checkUser(req.body.name, req.body.email)
    const order_number      = await func.latestOrderNumber()
    const buyer = id[1]
    const message = id[4]
    var count = 0
    JSON.parse(req.body.cart).forEach( i => {
        let post= {
            'order_number':         order_number,
            'buyer':                buyer,
            'address':              req.body.address,
            'cart':                 JSON.stringify(i),
            'invoice':              req.body.invoice,
            'status':               'Ordered',
            "created_at":           time,
            "updated_at":           time
        }
        let sql =   `INSERT INTO orders SET ?`
        pool.query(sql, post, async(err, results) => {
            try{    
                if(results){
                    count++
                    if(count == JSON.parse(req.body.cart).length){
                        await func.mailOrderToSeller() 
                        await func.mailOrderToBuyer( req.body.name, req.body.email, id[3] )
                        res.send({ 
                            success:    true,
                            account:    id[0],
                            user:       id[2],
                            message:    message
                        })
                    }
                }else if(err){ throw err }
            }catch(e){ func.logError(e); res.status(500); return; }
        })
    })

    
}))

module.exports = router;