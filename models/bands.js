const Band = require("./band");

class Bands {

    bands;

    constructor(){
        this.bands = [];
    }

    addBand(band = new Band()){
        this.bands.push(band);
    }
    countBands(){
        this.bands.length;
    }


    getBands() {
        return this.bands;
    }

    deleteBand (id =''){
        this.bands= this.bands.filter(band=> band.id != id);
        return this.bands;
    }

    voteBand (id =''){
        this.bands = this.bands.map(band =>{
            if (band.id ==id){
            band.votes++;
            return band;
            }else{
            return band;
            }
        });
    }
}

module.exports = Bands;