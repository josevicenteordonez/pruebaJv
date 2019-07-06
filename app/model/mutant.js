var operations = require('../db/operations');

var mutantModel = {};

mutantModel.isMutant = function (dna) {

    /**
      * DEFINO CASOS BASES
      * (para evitar realizar operaciones innecesarias)
    **/

    /**
      * 0
      * (Se valida que la matriz exista)
    **/
    if (dna === null && dna === undefined && dna === 'undefined') {
        return false;
    }

    /**
      * 1
      * (Se valida que la matriz sea cuadrada NxN)
    **/
    var x = dna.length;
    var y = dna[0].length;
    console.log('x', x);
    console.log('y', y);

    if (x != y) {
        // retorno FALSE, ya que no es una matriz valida de NxN
        return false;
    }

    /**
      * 2
      * (Se valida que la matriz solo contenga los caracteres validos A, T, C, G )
    **/

    // Defino una expresion regular que valide si consigue un caracter diferente a A, T, C, G
    var pattInvalidCharacter = /[^ATCG]/g;

    var matrix = new Array();

    for (var i = 0; i < dna.length; i++) {

        var invalid = pattInvalidCharacter.test(dna[i]);

        console.log('Cadena: ' + dna[i] + ' Invalida: ' + invalid);

        if (invalid) {
            // retorno FALSE, ya que se consiguio un caracter diferente a A, T, C, G
            return false;
        }

        // Aprovecho el recorrido para validar los cadenas y genero una matriz real con los valores recibidos
        matrix[i] = dna[i].split('');

        console.log('Matrix', matrix);
    }

    /**
      * 3
      * (Se valida si la matriz es menor a 4x4,
      *  ya que si es menor de 4x4 debe ser un humano ya que no de pueden generar cadenas de 4 caracteres iguales 
      * seguidos que forman la cadena de un mutante)
    **/

    if (x < 4) {

        var data = {
            'dna': dna,
            'isMutant': false,
            'createdAt': new Date()
        }

        operations.insert('pruebajv', 'mutant', data).then(function (value) {

        });
        // retorno FALSE, ya que la matriz mide menos de 4x4, por lo que no se pueden armar cadenas de 4 caracteres
        return false;
    }

    // VALIDAR SI EL ADN EXISTE EN LA BD; DE ESA FORMA EVITO EVALUAR UN ADN YA EXISTENTE
    // Find en la BD con el ADN

    /**
      * Inicio la evaluación de las cadenas horizontales
    **/
    var validChain = 0;
    // FOR validar con Expresion regular las cadenas AAAA , TTTT, CCCC, GGGG dentro de los String
    // si consigo 2 casos horizontales ya es exitoso y mando el 200

    var pattvalidadCharacterA = /[^AAAA]/g;
    var pattvalidadCharacterT = /[^TTTT]/g;
    var pattvalidadCharacterC = /[^CCCC]/g;
    var pattvalidadCharacterG = /[^GGGG]/g;

    for (var i = 0; i < dna.length; i++) {

        var validA = pattvalidadCharacterA.test(dna[i]);
        var validT = pattvalidadCharacterT.test(dna[i]);
        var validC = pattvalidadCharacterC.test(dna[i]);
        var validG = pattvalidadCharacterG.test(dna[i]);

        console.log('Cadena: ' + dna[i] + ' Valida A: ' + validA);
        console.log('Cadena: ' + dna[i] + ' Valida T: ' + validT);
        console.log('Cadena: ' + dna[i] + ' Valida C: ' + validC);
        console.log('Cadena: ' + dna[i] + ' Valida G: ' + validG);

    }

    return true;
};

module.exports = mutantModel;