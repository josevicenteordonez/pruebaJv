var mutantModel = {};

mutantModel.isMutant = function (dna) {

    var validChain = 0;

    // Defino casos base (para evitar realizar operaciones innecesarias)
    
    // 1ERO Se valida que la matriz sea cuadrada
    var x = dna.length;
    var y = dna[0].length;
    console.log('x', x);
    console.log('y', y);

    if(x != y ){
        return false;
    }

    // 2DO validar que contenga solo las caracteres validos
    var pattInvalidCharacter = /[^ATCG]/g;

    var matrix = new Array();

    for (var i = 0; i < dna.length; i++) {
        var invalid = pattInvalidCharacter.test(dna[i]);

        console.log('Cadena ' + dna[i] + ' invalid ' + invalid);

        if(invalid){
            return false;
        }

        matrix[i] = dna[i].split('');
    }

    // validar las cadenas horizontales

    // validar las cadenas verticales

    console.log('Matrix∫', matrix);

    return true;
};

module.exports = mutantModel;