const Pool = require('pg').Pool
const pool = new Pool({
    // user:'postgres',
    // host:'localhost',
    // database:'blog',
    // password:'root',
    // port:5432,
    user:'tpgiypcqnqsbrq',
    host:'ec2-34-238-26-109.compute-1.amazonaws.com',
    database:'d8v7bv8cds1rhu',
    password:'693088ab49c8c62c6fa2a1edd17e91e432cb146845b7f3e8b9514eaa4ef7d68c',
    port:5432,
});

const getadmin = (req,res) => {
    const { username, password} = req.body;
    pool.query('select * from admin where username=$1 AND password=$2', [username,password], (error,result) => {
        if(error)
        {
            console.log(error)
        }
        res.send({ status: 201, msg:"login success", data:result.rows});
        console.log(result.rows);
    })
}

const addcategory = (req,res) => {
    const {cname} = req.body;
    pool.query('insert into category(cname) values ($1)',
    [cname], (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(201).send(`Category Added.... With ID : ${result.cid}`);
    })
}

const listcategory = (req,res) => {
    pool.query('select * from category order by cid asc', (error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const getcategoryById =(req,res) => {
    const cid = parseInt(req.params.id)
    pool.query('select * from category where cid = $1',[cid],(error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
        console.log(result.rows)
    })
}

const updatecategory = (req,res) => {
    const cid = parseInt(req.body.cid);
    const {cname} = req.body;
    pool.query('update category set cname = $1 where cid = $2',
    [cname,cid],
    (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Updated By Id:-${cid}`);
    })
}

const deletecategory = (req,res) => {
    const cid = parseInt(req.params.cid);
    pool.query('delete from category where cid = $1',[cid],(error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Deleted by Id:-${cid}`);
    })
}

const addblog = (req,res) => {
   const {title,cat_id,isfeatured,isactive,description,image,created_at} = req.body;
   pool.query('insert into blogs(title,cat_id,isfeatured,isactive,image,description,created_at) values($1,$2,$3,$4,$5,$6,$7)',
   [title,cat_id,isfeatured,isactive,image[0],description,created_at], (error,result) => {
       if(error)
       {
           throw error;
       }
       res.status(201).send(`Blog Added.... With ID : ${result.bid}`);
   })
}

const listblog = (req,res) => {
    pool.query('select * from blogs order by bid asc', (error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const getblogById =(req,res) => {
    const bid = parseInt(req.params.id)
    pool.query('select * from blogs where bid = $1',[bid],(error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
        console.log(result.rows)
    })
}

const updateblog = (req,res) => {
    const bid = parseInt(req.body.bid);
    const {title,cat_id,isfeatured,isactive,description,image,created_at} = req.body;
    pool.query('update blogs set title=$1,cat_id=$2,isfeatured=$3,isactive=$4,description=$5,image=$6,created_at=$7 where bid = $8',
    [title,cat_id,isfeatured,isactive,description,image[0],created_at,bid],
    (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Updated By Id:-${bid}`);
    })
}

const deleteblog = (req,res) => {
    const bid = parseInt(req.params.bid);
    pool.query('delete from blogs where bid = $1',[bid],(error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Deleted by Id:-${bid}`);
    })
}

const getBlogFeature=(req,res) => {
    const isfeatured = true;
    pool.query('select * from blogs where isfeatured=$1 order by bid',[isfeatured],(error,result)=> {
        if(error)
        {
            throw error;
        }
        else{
            res.status(200).json(result.rows);
        }
    })
}

const getBlogActive=(req,res) => {
    const isactive = true;
    pool.query('select * from blogs where isactive=$1 order by bid',[isactive],(error,result)=> {
        if(error)
        {
            throw error;
        }
        else{
            res.status(200).json(result.rows);
        }
    })
}

const upload =(req,res) => {
    if(!req.file) {
        console.log('No file Recived');
        return res.send({
            success:false
        });
    }else{
        return res.send({
            success:true,name:req.file.filename
        })
    }
}
const countblogs = (req,res) => {
    pool.query('select count(*) as blogcount from blogs',(error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
    })
}
const countactive  =(req,res) => {
    const isactive = true;
    pool.query('select count(*) as activeblogcount from blogs where isactive=$1', [isactive],(error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
    })
}
const countfeatured = (req,res) => {
    const isfeatured = true;
    pool.query('select count(*) as featuredblogcount from blogs where isfeatured=$1',[isfeatured],(error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const blogupdate = (req,res) => {
    const bid = parseInt(req.body.bid);
    const {isfeatured} = false;
    pool.query('update blogs set ,isfeatured=$1 where bid = $2',
    [isfeatured,bid],
    (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Updated By Id:-${bid}`);
    })
}
module.exports ={
    getadmin,
    addcategory,
    listcategory,
    getcategoryById,
    updatecategory,
    deletecategory,
    addblog,
    listblog,
    getblogById,
    updateblog,
    deleteblog,
    getBlogFeature,
    getBlogActive,
    upload,
    countblogs,
    countfeatured,
    countactive,
    blogupdate
}