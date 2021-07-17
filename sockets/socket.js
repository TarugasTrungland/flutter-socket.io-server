// mensajes de sockets
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
 bands.addBand(new Band( 'Martyn Bennet'));
 bands.addBand(new Band( 'Cosmo'));
 bands.addBand(new Band( 'Franco Battiato'));
 bands.addBand(new Band( 'Ronaldos'));

 console.log('bands');

io.on('connection', client =>{

    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());
 
    client.on('disconnect', ()=> {console.log('Cliente desconectado')});

client.on('mensaje', (payload)=> {

    console.log('Mensaje !!!', payload);

    io.emit('mensaje', {admin: 'nuevo mesaje'});
});
client.on('nuevo-mensaje', (payload)=>{
    console.log(payload);  
    //io.emit('nuevo-mensaje',payload) // emite a todos los usuarios
client.broadcast.emit('nuevo-mensaje', payload);
});


client.on('new-vote', (id)=> {

bands.voteBand(id.id);  
io.emit('active-bands', bands.getBands());
});

client.on('add-band', (band)=>{
console.log(band.name);

    bands.addBand(new Band( band.name));
    io.emit('active-bands', bands.getBands());
});

client.on('delete-band', (band)=>{

    bands.deleteBand(band.id);
    io.emit('active-bands', bands.getBands());
})

});