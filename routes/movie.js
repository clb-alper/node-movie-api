const express = require('express');
const router = express();

//Models
const Movie = require('../models/Movie');
const { findById } = require('../models/Movie');





router.get('/', (req, res) =>{
    
    const promise = Movie.find({ });
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});
 //TOP 10 LIST

 router.get('/top10', (req, res) =>{
    
    const promise = Movie.find({ }).limit(10).sort({imdb_score : -1});
    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});




router.get('/:movie_id', (req,res,next)=>{

    const promise = Movie.findById(req.params.movie_id);

    promise.then((movie)=>{
        if(!movie)
            next({message : 'movie was not found', code : 1});

        res.json(movie);
    }).catch((err)=>{
        res.json(err);
    });

});

router.put('/:movie_id', (req,res,next)=>{

    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new : true});

    promise.then((movie)=>{
        if(!movie)
            next({message : 'movie was not found', code : 1});
            
        res.json(movie);
    }).catch((err)=>{
        res.json(err);
    });

});

router.delete('/:movie_id', (req,res,next)=>{

    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie)=>{
        if(!movie)
            next({message : 'movie was not found', code : 1});

        res.json(movie);
    }).catch((err)=>{
        res.json(err);
    });

});

router.post('/', (req, res , next) => {
    const movie = new Movie(req.body);

    /*movie.save((err, data ) =>{
        if(err)
            res.json(err);
        else    
            res.json({status: 1});   
    })*/

    const promise = movie.save();

    promise.then((data) =>{
        res.json(data);
    }).catch((err) =>{
        res.json(err);
    });


    //Between
    router.get('/between/:start_yer/:end_year', (req, res) =>{
    
        const {start_year, end_year} = req.params;
        const promise = Movie.find(
            {

                year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year)}        

             }
            );
        promise.then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json(err);
        });
    });

});

module.exports = router;