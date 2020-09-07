const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHttp);

let token, directorId;

describe('Director tests', () => {
	before('Get Token', (done) => {
		chai.request(server)
			.post('/authenticate')
			.send({username: 'alper', password: '123456'})
			.end((err, res) => {
				if (err){
                    throw err;
                }    

				token = res.body.token;
				done();
			});
	});

	describe('/GET Directors', () => {
		it('Get all directors records', (done) => {
			chai.request(server)
				.get('/api/directors')
				.set('x-access-token', token)
				.end((err, res) => {
					if (err)
						throw err;

					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
    });

    describe('/POST director', ()=>{
        it('it should post director by given parameters', (done)=>{
            const testDirector = {
                name : "testtesttest",
                surname : "director",
                bio : "test Directortest Directortest Directortest Directortest test Directortest Directortest Directortest DirectorDirectortest Directortest Director",
            };
            chai.request(server)
            .post('/api/directors')
            .send(testDirector)
            .set('x-access-token', token)
            .end((err, res)=>{
                if(err){
                    throw err;
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('surname');
                res.body.should.have.property('bio');
				directorId = res.body._id;
                
                done();
                   
            });

        });
    });

    describe('/GET/:director_id', () =>{
        it('it should GET director by given id', (done)=>{
            chai.request(server)
            .get('/api/directors/' + directorId)
            .set('x-access-token', token)
            .end((err, res)=>{
                if(err){
                    throw err;
                }
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
  
    describe('/PUT :director_id', () => {
		it('Update Director record', (done) => {
			const testDirector = {
				name: 'mahmut'
			};

			chai.request(server)
				.put('/api/directors/' + directorId)
				.send(testDirector)
				.set('x-access-token', token)
				.end((err, res) => {
					if (err)
						throw err;

					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql(testDirector.name);
					done();
			});
		});
	});

    describe('/DELETE :director_id', () => {
		it('Delete Director record by id', (done) => {
			chai.request(server)
				.del('/api/directors/' + directorId)
				.set('x-access-token', token)
				.end((err, res) => {
					if (err)
						throw err;

					res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
					done();
				});
		});
	});
});