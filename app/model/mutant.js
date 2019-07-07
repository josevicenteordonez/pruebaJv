var operations = require('../db/operations');

var mutantModel = {};

mutantModel.isMutant = function (dna) {

    return new Promise((resolve, reject) => {

        /**
          * DEFINO CASOS BASES
          * (para evitar realizar operaciones innecesarias)
        **/

        /**
          * 0
          * (Se valida que la matriz exista)
        **/
        if (dna === null || dna === undefined || dna === 'undefined') {
            resolve(false);
            return;
        }

        /**
          * 1
          * (Se valida que la matriz sea cuadrada NxN)
        **/
        var x = dna.length;
        var y = dna[0].length;

        if (x != y) {
            // retorno FALSE, ya que no es una matriz valida de NxN
            resolve(false);
            return;
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
                resolve(false);
                return;
            }

            // Aprovecho el recorrido para validar los cadenas y genero una matriz real con los valores recibidos
            matrix[i] = dna[i].split('');

            console.log('Matrix', matrix);
        }

        /**
          * 3
          * (Se valida si DNA existe en la base de datos para no repetirlo e evitar calculos innecesarios.
          * 
        **/
        operations.find('pruebajv', 'mutant', { "dna": dna }).then(function (value) {
            // Si existe el ADN devuelvo el SI es mutanto o NO, basado en un calculo previo realizado para almacenarlo.
            if (value.length > 0) {
                resolve(value[0].isMutant);
                return;

            } else {
                /**
                     * 4
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
                    resolve(false);
                    return;
                }

                /**
                  * INICIO LA EVALUACION DE LAS CADENAS HORIZONTALES
                **/
                var validChain = 0;
                // FOR validar con Expresion regular las cadenas AAAA , TTTT, CCCC, GGGG dentro de los String
                // si consigo 2 casos horizontales ya es exitoso y mando el 200

                var pattValidateCharacter = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];

                for (var i = 0; i < dna.length; i++) {
                    for (var j = 0; j < pattValidateCharacter.length; j++) {
                        if (dna[i].search(pattValidateCharacter[j]) != -1) {
                            validChain++;
                        }

                        if (validChain == 2) {
                            // guardo en la BD como mutante
                            var data = {
                                'dna': dna,
                                'isMutant': true,
                                'createdAt': new Date()
                            }

                            operations.insert('pruebajv', 'mutant', data).then(function (value) {
                            });
                            // retorno TRUE, ya que la matriz tiene 2 coincidencias de cadenas validas
                            resolve(true);
                            return;
                        }
                    }
                }

                /**
                 * INICIO LA EVALUACION DE LAS CADENAS VERTICALES
                 * (para esto invierto la matriz)
                **/

                var invertMatrix = matrix.reduce((prev, next) => next.map((item, i) =>
                    (prev[i] || []).concat(next[i])
                ), []);

                console.log(invertMatrix);

                for (var i = 0; i < dna.length; i++) {
                    for (var j = 0; j < pattValidateCharacter.length; j++) {
                        if (invertMatrix[i].join('').search(pattValidateCharacter[j]) != -1) {
                            validChain++;
                        }

                        if (validChain == 2) {
                            // guardo en la BD como mutante
                            var data = {
                                'dna': dna,
                                'isMutant': true,
                                'createdAt': new Date()
                            }

                            operations.insert('pruebajv', 'mutant', data).then(function (value) {
                            });
                            // retorno TRUE, ya que la matriz tiene 2 coincidencias de cadenas validas
                            resolve(true);
                            return;
                        }
                    }
                }

                // Si consigo menos de 2 cadenas validas ES HUMANO
                if (validChain < 2) {
                    var data = {
                        'dna': dna,
                        'isMutant': false,
                        'createdAt': new Date()
                    }

                    operations.insert('pruebajv', 'mutant', data).then(function (value) {
                    });
                    // retorno FALSE, ya que la matriz NO tiene al menos 2 coincidencias de cadenas validas
                    resolve(false);
                    return;
                }
            }
        });

    });
};

module.exports = mutantModel;