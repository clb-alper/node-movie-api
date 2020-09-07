

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

let token, movieId;
describe('/api/movies tests', () => {
	    before((done) => {
		    chai.request(server)
			.post('/authenticate')
			.send({username: 'alper', password: '123456'})
			.end((err, res) => {
				token = res.body.token;
				done();
		    });
    });

	describe('/GET movies', () => {
		it('it should GET all the movies', (done) => {
			chai.request(server)
				.get('/api/movies')
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		})
    });
    

    describe('/Post movie', ()=>{
        it('it should post a movie', (done)=>{
            const movie = {
                title: 'Udemy',
                director_id :'5f4fe85ce1c05f3434353f74',
                category: 'komedi',
                country: 'Türkiye',
                imdb_score :2
            };
            
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token', token)
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('imdb_score');
                movieId = res.body._id;
                done();
            })
        });
    });

    describe('/Get/:Director_id movie', () =>{
        it('it should GET a movie by the given id', (done)=>{
            chai.request(server)
            .get('/api/movies/' +movieId)
            .set('x-access-token', token)
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('_id').eql(movieId);
                done();
            })
        })
    });

    
	describe('/PUT/:movie_id movie', () => {
		it('it should UPDATE a movie given by id', (done) => {
			const movie = {
				title: '93creative',
				director_id: '5f4fe85ce1c05f3434353f74',
				category: 'Suç',
				country: 'Fransa',
				imdb_score: 9
			};

			chai.request(server)
				.put('/api/movies/' + movieId)
				.send(movie)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title').eql(movie.title);
					res.body.should.have.property('director_id').eql(movie.director_id);
					res.body.should.have.property('category').eql(movie.category);
					res.body.should.have.property('country').eql(movie.country);
					res.body.should.have.property('imdb_score').eql(movie.imdb_score);

					done();
				});
		});
	});
});    