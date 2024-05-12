const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Block Controller', () => {
    describe('POST /block', () => {
        it('Skapar ett nytt block', (done) => {
            chai.request(app)
                .post('/block')
                .send({ data: 'Testdata' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message').equal('Nytt block skapat!');
                    expect(res.body).to.have.property('block');
                    expect(res.body.block).to.have.property('index').to.be.a('number');
                    expect(res.body.block).to.have.property('timestamp').to.be.a('string');
                    expect(res.body.block).to.have.property('data').to.equal('Testdata');
                    expect(res.body.block).to.have.property('previousHash').to.be.a('string');
                    expect(res.body.block).to.have.property('hash').to.be.a('string');
                    expect(res.body.block.hash.substring(0, 2)).to.equal('00'); // Kontrollera att hashen börjar med två nollor
                    done();
                });
        });
    });
});
