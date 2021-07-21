import express from "express";
const router = express.Router();
var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')
const func = require('./functions')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

const upload = require('express-fileupload')
const fs = require('fs')
router.use(upload())

const storage = '/home/myuser/amit/public/images/'
// const storage = './src/public/images/'

router.get('/AdminUsers', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =   `SELECT name, email, role, created_at FROM users`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }) }
        }catch(e){ func.logError(e); res.status(403); return; }       
    })    
}))

router.get('/AdminMetas', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, title, url, description, keyword, updated_at FROM metas ORDER BY id DESC`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const pending = await func.pendingMeta()
                res.send({ data: results, pending }); }
        }catch(e){ func.logError(e); res.status(500); return; }
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
            if(err){ throw err }
            if(results){
                let sql = `SELECT id, title, url, description, keyword, updated_at FROM metas ORDER BY id DESC LIMIT 1`
                pool.query(sql, async(err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            const pending = await func.pendingMeta()
                            res.send({ success: true, data: results2[0], pending, message: 'Meta added successfuly' });
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
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
            if(err){ throw err }
            if(results){
                let sql = `SELECT id, title, url, description, keyword, updated_at FROM metas WHERE id = ${req.body.id}`
                pool.query(sql, async(err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            const pending = await func.pendingMeta()
                            res.send({ success: true, data: results2[0], pending, message: 'Meta updated successfuly' });
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/adminBlogMeta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, name, url FROM blog_metas ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(403); return; }
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
            // var filename = file.name
            var filename = Date.now() + '-' + file.name;
            file.mv(storage+'cover/'+filename, function(err){ if(err){ func.printError(err) } })
            post.name = filename
        }
    }else{
        post.name = req.body.name
    }    
    let sql = 'INSERT INTO blog_metas SET ?'
    pool.query(sql, post, (err, results) => {
        try{ 
            if(err) throw err;
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
            // var filename = file.name
            var filename = Date.now() + '-' + file.name;
            var oldCover = req.body.oldCover
            if(oldCover){
                if (fs.existsSync(storage+'cover/'+oldCover)) { fs.unlinkSync(storage+'cover/'+oldCover) }
                file.mv(storage+'cover/'+filename, function(err){ if(err){ func.printError(err) } })
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
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.get('/blogMetaOptions', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =   `SELECT name as text, id as value FROM blog_metas WHERE type = 'category';
                SELECT name as text, id as value FROM blog_metas WHERE type = 'tag';`
    pool.query(sql, [1, 2], (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                res.send({ 
                    catOptions:             results[0],
                    tagOptions:             results[1]
                });
            }
        }catch(e){ func.logError(e); res.status(403); return; }
    });
}))

router.post('/addBlog', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'title':                req.body.title,
        'url':                  req.body.url,
        'content':              req.body.content,
        'excerpt':              req.body.excerpt,
        'category':             req.body.category,
        'tag':                  req.body.tag,
        "created_at":           time,
        "updated_at":           time,
    }
    if(req.files){
        // var file = req.files.file
        // var filename = file.name
        // post.coverImg = filename
        // file.mv(storage+'blog/'+filename, function(err){ if(err){ func.logError(err) } })
        if(req.files.file){
            var file = req.files.file
            var filename = file.name
            post.coverImg = filename
            file.mv(storage+'blog/'+filename, function(err){ if(err){ throw err; } })
        }
        if(req.files.smallBlogImage){
            var file2 = req.files.smallBlogImage
            var filename2 = file2.name
            post.smallImg = filename2
            file2.mv(storage+'blog/'+filename2, function(err){ if(err){ throw err; } })
        }
    }
    let sql = `INSERT INTO blogs SET ?`
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ success: true, message: 'Blog added successfuly' }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/getBlog/:id', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, title, url, coverImg, smallImg, excerpt, content, category, tag, updated_at FROM blogs WHERE id = '${req.params.id}'`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const catList = await func.catName(JSON.parse(results[0].category))
                const tagList = await func.tagName(JSON.parse(results[0].tag))
                res.send({ data: results[0], catList, tagList });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateBlog', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'title':                req.body.title,
        'url':                  req.body.url,
        'excerpt':              req.body.excerpt,
        'content':              req.body.content,
        'category':             req.body.category,
        'tag':                  req.body.tag,
        "updated_at":           time,
    }
    if(req.files){
        // var file = req.files.file
        // var filename = file.name
        // post.coverImg = filename
        // file.mv(storage+'blog/'+filename, function(err){ if(err){ func.logError(e) } })
        // if (fs.existsSync(storage+'blog/'+req.body.oldCoverImg)) { fs.unlinkSync(storage+'blog/'+req.body.oldCoverImg) }
        if(req.files.file){
            var file = req.files.file
            var filename = file.name
            post.coverImg = filename
            file.mv(storage+'blog/'+filename, function(err1){ if(err1){ throw err1; } })
            if (fs.existsSync(storage+'blog/'+req.body.oldCoverImg)) { fs.unlinkSync(storage+'blog/'+req.body.oldCoverImg) }
        }
        if(req.files.smallBlogImage){
            var file2 = req.files.smallBlogImage
            var filename2 = file2.name
            post.smallImg = filename2
            file2.mv(storage+'blog/'+filename2, function(err){ if(err){ throw err; } })
            if (fs.existsSync(storage+'blog/'+req.body.oldSmallBlogImage)) { fs.unlinkSync(storage+'blog/'+req.body.oldSmallBlogImage) }
        }
    }
    let sql = `UPDATE blogs SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ success: true, message: 'Blog updated successfuly' }); }
        }catch(e){ func.logError(e); res.status(403); return; }
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
            if(err){ throw err }
            if(results){ res.send({ success: true, message: 'Comment submitted for approval' }); }
        }catch(e){ func.logError(e); res.status(403); return; }
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
            if(err){ throw err }
            if(results){
                let sql =   `SELECT a.id, a.blogId, a.c_order, a.commentId, a.user, a.email, a.comment, a.status, a.updated_at, b.url, b.title FROM comments as a
                    left join blogs as b on b.id = a.blogId WHERE a.id = ${req.body.id}`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){ res.send({ success: true, data: results2[0], message: 'Comment updated successfuly' }); }
                    }catch(e){ func.logError(e); res.status(403); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.get('/adminComments', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =   `SELECT a.id, a.blogId, a.c_order, a.commentId, a.user, a.email, a.comment, a.status, a.updated_at, b.url, b.title FROM comments as a
                left join blogs as b on b.id = a.blogId  ORDER BY a.id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.get('/adminContacts', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT name, email, phone, message, created_at FROM contact_forms ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.get('/adminBasic', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, name, tab1, tab2 FROM basic ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addBasic', asyncMiddleware( async(req, res, next) => {
    let post= {
        "name":                         req.body.name,
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
            if(req.body.type=='Category'){
                file.mv(storage+'category/'+imageName, function(err){ if(err){ func.logError(err) } })
                post.tab2 = imageName
            }else{
                file.mv(storage+'basic/'+imageName, function(err){ if(err){ func.logError(err) } })
                post.name = imageName
            }
        }
    }
    let sql = 'INSERT INTO basic SET ?'
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getBasic(results.insertId)
                res.send({ success: true, data: data, message: 'Basic added successfuly' });
            }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.post('/updateBasic', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        "name":                         req.body.name,
        "type":                         req.body.type,
        "tab1":                         req.body.tab1,
        "tab2":                         req.body.tab2,
        "updated_at":                   time,
    }
    if(req.files){
        if(req.files.image){
            var file = req.files.image
            var imageName = file.name
            if(req.body.type=='Category'){
                file.mv(storage+'category/'+imageName, function(err){ if(err){ func.logError(err) } })
                if (fs.existsSync(storage+'category/'+req.body.oldImage && req.body.oldImage)) { fs.unlinkSync(storage+'category/'+req.body.oldImage) }
                post.tab2 = imageName
            }else{
                file.mv(storage+'basic/'+imageName, function(err){ if(err){ func.logError(err) } })
                if (fs.existsSync(storage+'basic/'+req.body.oldImage)) { fs.unlinkSync(storage+'basic/'+req.body.oldImage) }
                post.name = imageName
            }
        }
    }
    let sql = `UPDATE basic SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getBasic(req.body.id)
                res.send({ success: true, data: data, message: 'Basic updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.post('/deleteProductCategory', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    await func.updateProductsOfCat(req.body.id)
    let sql =   `DELETE FROM basic WHERE id='${req.body.id}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ res.send({ success: false, message: err.sqlMessage }) }
            if(results){ res.send({ success: true, message: 'Product Category Deleted Successfuly' }); }
        }catch(e){ func.logError(e, req.url); res.status(403); return; }
    })
}))

router.post('/deleteBlogMeta', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res, next) => {
    await func.updateBlogsOfMeta(req.body.type, req.body.id)
    let sql =   `DELETE FROM blog_metas WHERE id='${req.body.id}';
                DELETE FROM metas WHERE url='/${req.body.type}/${req.body.url}';`
    pool.query(sql, [1,2], async(err, results) => {
        try{
            if(err){ res.send({ success: false, message: err.sqlMessage }) }
            if(results){
                res.send({ success: true, message: 'Blog Meta Deleted Successfuly' });
            }
        }catch(e){ func.logError(e, req.url); res.status(403); return; }
    })
}))

router.get('/addProductOptions', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT name as text, id as value FROM basic Where type='Category';
                SELECT name as text, id as value FROM basic Where type='Vendor';
                SELECT name as text, id as value, tab1 FROM basic Where type='Puja';
                SELECT name as text, id as value FROM products;`
    pool.query(sql, [1,2,3,4,5], (err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                res.send({ 
                    catOptions:             results[0],
                    vendorOptions:          results[1],
                    incOptions:             results[2],
                    productOptions:         results[3],
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
        'inclusion':            req.body.inclusion,
        'exclusion':            req.body.exclusion,
        'recom':                req.body.recom,
        'related':              req.body.related,
        'shortDesc':            req.body.shortDesc,
        'longDesc':             req.body.longDesc,
        'price':                req.body.price,
        'type':                 req.body.type,
        'rating':               JSON.stringify( [0,0] ),
        "updated_at":           time,
    }
    if(req.body.sale >0 ){ post.sale = req.body.sale }
    if(req.body.tagline !== 'undefined'){ post.tagline = req.body.tagline }
    if(req.files.images){
        var images = []
        for(var i = 0; i < req.files.images.length; i++){
            var file = req.files.images[i]
            // var filename = Date.now() + '-' + file.name;
            var filename = file.name;
            images.push(filename)
            file.mv(storage+'product/'+filename, function(err){ if(err){ func.logError(err) } })
        }
        post.images = JSON.stringify(images)
    }
    let sql = `INSERT INTO products SET ?`
    pool.query(sql, post, (err, results) => {
        try{    
            if(err){ throw err }
            if(results){ res.send({ success: true, message: "Product added succesfully" }) }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/getProducts', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql =   `SELECT a.id, a.name, a.images, a.url, a.images, a.vendor, a.price, a.sale, a.rating, a.status, a.updated_at, b.name as vendor, a.inclusion FROM products as a
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
    let sql =    `SELECT a.id, a.vendor as vendorId, a.name, a.type, a.images, a.url, a.images, a.category, a.shortDesc, a.longDesc, a.price, a.sale, a.status, a.inclusion, a.exclusion, a.recom, a.related, a.tagline, b.name as vendorName, b.tab1 as vendor 
                FROM products as a
                left join basic as b on b.id = a.vendor WHERE a.id = '${req.params.id}';
                SELECT name as text, id as value FROM basic Where type='Category';
                SELECT name as text, id as value FROM basic Where type='Vendor';
                SELECT name as text, id as value, tab1 FROM basic Where type='Puja';
                SELECT name as text, id as value FROM products where id NOT IN (${req.params.id});`
    pool.query(sql, [1,2,3,4,5], async(err, results) => {
        try{ 
            if(err){ throw err }
            if(results){ 
                const catList = await func.productCatName(JSON.parse(results[0][0].category))
                const incList = await func.productIncName(JSON.parse(results[0][0].inclusion))
                const excList = await func.productExcName(JSON.parse(results[0][0].exclusion))
                const recomList = await func.productRecomName(JSON.parse(results[0][0].recom))
                const relatedList = await func.productRelatedName(JSON.parse(results[0][0].related))
                res.send({ 
                    data:               results[0][0],
                    catOptions:         results[1],
                    vendorOptions:      results[2],
                    incOptions:         results[3],
                    productOptions:     results[4],
                    catList:            catList,
                    incList:            incList,
                    excList:            excList,
                    recomList:          recomList,
                    relatedList:        relatedList
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
        'inclusion':            req.body.inclusion,
        'exclusion':            req.body.exclusion,
        'recom':                req.body.recom,
        'related':              req.body.related,
        'shortDesc':            req.body.shortDesc,
        'longDesc':             req.body.longDesc,
        'price':                req.body.price,
        'type':                 req.body.type,
        "updated_at":           time,
    }
    if(req.body.sale!= 'null'){
        post.sale = req.body.sale
    }else{
        post.sale = null
    }
    if(req.body.sale >0 ){ post.sale = req.body.sale }
    if(req.body.tagline !== 'undefined'){ post.tagline = req.body.tagline }
    if(req.files){
        if(req.files.images){
            var images = []
            for(var i = 0; i < req.files.images.length; i++){
                var file = req.files.images[i]
                // var filename = Date.now() + '-' + file.name;
                var filename = file.name;
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

router.get('/getOrders', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.orderId, a.refId, a.buyer, a.address, a.cart, a.invoice, a.discount, a.status, a.remarks, a.created_at, a.updated_at, b.name, b.email FROM orders as a left join users as b on b.id = a.buyer `
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ orders: results }) }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateOrderStatus', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'status':               req.body.status,
        'remarks':              req.body.remarks,
        "updated_at":           time,
    }
    let sql = `UPDATE orders SET ? WHERE id = '${req.body.id}'`
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql2 = `SELECT a.id, a.orderId, a.buyer, a.address, a.cart, a.invoice, a.status, a.remarks, a.created_at, a.updated_at, b.name, b.email FROM orders as a
                        left join users as b on b.id = a.buyer WHERE a.id = '${req.body.id}'`
                pool.query(sql2, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Order updated successfuly' });
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/fetchproduct/:url', asyncMiddleware( async(req, res) => {
    let sql =    `SELECT a.id, a.vendor as vendorId, a.name, a.type, a.images, a.url, a.images, a.category, a.shortDesc, a.longDesc, a.price, a.sale, a.status, a.rating, a.inclusion, a.exclusion, a.recom, a.related, b.name as VendorName, b.tab1 as vendor
                FROM products as a
                left join basic as b on b.id = a.vendor WHERE a.url = '${req.params.url}';`
    pool.query(sql, async(err, results) => {
        try{    
            if(err){ throw err }
            if(results.length){
                const catProducts   = await func.similarCatProducts(JSON.parse(results[0].category), results[0].id )
                const incList       = await func.productIncName(JSON.parse(results[0].inclusion))
                const excList       = await func.productExcName(JSON.parse(results[0].exclusion))
                const recomList     = await func.productRecomName(JSON.parse(results[0].recom))
                const relatedList   = await func.productRelatedName(JSON.parse(results[0].related))
                const reviewList    = await func.productReview(JSON.parse( results[0].id ))
                res.send({ 
                    product:            results[0],
                    incList:            incList,
                    catProducts:        catProducts,
                    excList:            excList,
                    recomList:          recomList,
                    relatedList:        relatedList,
                    reviewList:         reviewList,
                });
            }else{
                res.redirect('/shop');
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/fetchReview/:product/:user', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, review, rating, created_at FROM rating WHERE productId= '${req.params.product}' AND userId = '${req.params.user}'`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const reviewList    = await func.productReview(JSON.parse( req.params.product ))
                res.send({ 
                    review:         results[0],
                    data:           reviewList
                }) 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addReview', [func.verifyToken], asyncMiddleware( async(req, res) => {
    let post= {
        "productId":                    req.body.id,
        "userId":                       req.body.userId,
        "rating":                       req.body.rating,
        "review":                       req.body.review,
        "created_at":                   time,
        "updated_at":                   time
    }
    let sql = 'INSERT INTO rating SET ?'
    pool.query(sql, post, (err, results) => {
        try{    
            if(err){ throw err }
            if(results){
                let post2= {
                    "rating": req.body.finalRating
                }
                let sql2 = `UPDATE products SET ? WHERE id = '${req.body.id}'`
                pool.query(sql2, post2, (err2, results2) => {
                    try{    
                        if(err2){ throw err2 }
                        if(results2){ 
                            let sql3 = `SELECT review, rating, updated_at FROM rating ORDER BY id DESC LIMIT 1`
                            pool.query(sql3, (err3, results3) => {
                                try{
                                    if(err3){ throw err3 }
                                    if(results3){ res.send({ success: true, data: results3[0], message: 'Review submitted successfuly' }) }
                                }catch(e){ func.logError(e); res.status(500); return; }
                            })
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateReview', [func.verifyToken], asyncMiddleware( async(req, res) => {
    let post= {
        "rating":                       req.body.rating,
        "review":                       req.body.review,
        "updated_at":                   time
    }
    let sql = `UPDATE rating SET ? WHERE id = '${req.body.reviewId}'`;
    pool.query(sql, post, (err, results) => {
        try{    
            if(err){ throw err }
            if(results){
                let post2= {
                    "rating":                       req.body.finalRating
                }
                let sql2 = `UPDATE products SET ? WHERE id = '${req.body.id}'`
                pool.query(sql2, post2, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){ 
                            let sql3 = `SELECT review, rating, updated_at FROM rating WHERE id = '${req.body.reviewId}'`
                            pool.query(sql3, (err3, results3) => {
                                try{  
                                    if(err3){ throw err3 }  
                                    if(results3){ res.send({ success: true, data:results3[0], message: 'Review updated successfuly' }) }
                                }catch(e){ func.logError(e); res.status(500); return; }
                            })
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/fetchShop', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT id, type, name, tab1 FROM basic where type = 'Category';
                SELECT id, name, url, images, price, sale, rating, category FROM products WHERE status = '1';`
    pool.query(sql, [1,2], async(err, results) => {
        try{
            if(err){ throw err }    
            if(results){
                const categories    = await func.addCatChecks(results[0])
                const products      = results[1]
                res.send({ categories, products });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/userOrders/:id', asyncMiddleware( async(req, res) => {
    let sql =    `SELECT id, orderId, address, cart, invoice, status, remarks, updated_at FROM orders WHERE buyer = '${req.params.id}' ORDER BY id DESC;`
    pool.query(sql, async(err, results) => {
        try{    
            if(err){ throw err }
            if(results){
                res.send({ data: results });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/adminCoupon', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, code, discount, dis_type, start, expiry, status, product, updated_at FROM coupon ORDER BY id DESC;
                SELECT name as text, id as value FROM products Where status=1;`
    pool.query(sql,[1,2], (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results[0], productOptions: results[1] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/productNames', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT name as text, id as value FROM products Where id IN (${JSON.parse(req.body.product)});`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ success: true, data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addCoupon', asyncMiddleware( async(req, res, next) => {
    let post= {
        "type":                       req.body.type,
        "code":                       req.body.code,
        "product":                    req.body.product,
        "discount":                   req.body.discount,
        "dis_type":                   req.body.dis_type,
        "start":                      req.body.start,
        "expiry":                     req.body.expiry,
        "status":                     req.body.status,
        "created_at":                 time,
        "updated_at":                 time,
    }
    let sql = 'INSERT INTO coupon SET ?'
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getCoupon(results.insertId)
                res.send({ success: true, data: data[0], message: 'Coupon added successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateCoupon', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        "type":                       req.body.type,
        "code":                       req.body.code,
        "discount":                   req.body.discount,
        "product":                    req.body.product,
        "dis_type":                   req.body.dis_type,
        "start":                      req.body.start,
        "expiry":                     req.body.expiry,
        "status":                     req.body.status,
        "updated_at":                 time,
    }
    let sql = `UPDATE coupon SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getCoupon(req.body.id)
                res.send({ success: true, data: data[0], message: 'Coupon updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/changeCouponStatus', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let post= {
        'status':               req.body.status,
        "updated_at":           time,
    }
    let sql = `UPDATE coupon SET ? WHERE id = '${req.body.id}'`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getCoupon(req.body.id)
                res.send({ success: true, data: data[0], message: 'Coupon updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/checkCoupon', asyncMiddleware( async(req, res) => {
    const rightNow = new Date().toISOString().slice(0,10)
    let sql = `SELECT id, type, code, discount, dis_type, product FROM coupon WHERE status=1 AND code='${req.body.coupon}' AND start <= '${rightNow}' AND expiry >= '${rightNow}'`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results && results[0]){
                if(results[0].type=='Single'){
                    const data = await func.checkSingleCoupon(req.body.coupon, req.body.userId)
                    if(data){
                        res.send({ success: false, message: 'Coupon already used in past' });
                    }else{
                        res.send({ success: true, data: results[0], message: 'Coupon applied successfuly' });
                    }
                }else{
                    res.send({ success: true, data: results[0], message: 'Coupon applied successfuly' });
                }
            }else{
                res.send({ success: false, message: 'Wrong coupon code' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/schemaData', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT url, coverImg, title, updated_at FROM blogs;
                SELECT id, name, url, images, price, sale, rating, tagline, shortDesc, updated_at FROM products Where status=1;
                SELECT a.review, a.rating, a.productId, a.updated_at, b.name FROM rating as a left join users as b on b.id = a.userId;`
    pool.query(sql,[1,2,3], (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ blogs: results[0], products: results[1], reviews: results[2] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/sitemapData', [func.verifyToken, func.verifyAdmin], asyncMiddleware( async(req, res) => {
    let sql = `SELECT url  FROM blogs;
                SELECT url FROM products;
                SELECT type, name, url FROM blog_metas WHERE type ='category' OR type = 'tag';
                SELECT tab1 FROM basic WHERE type = 'Category';`
    pool.query(sql,[1,2,3,4], (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ blogs: results[0], products: results[1], blogMeta: results[2], prodCat: results[3] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))



module.exports = router;