import PARAMETRES from '../../json/evaluation.json'

//retourne la valeur d'un coup
export default function Evaluation(idPion, listYellow, listRed, currPlateau, currPower){
    const pawn = listYellow.filter(pion =>  pion.id === idPion)
    console.log("le pouvoir :")
    console.log(currPower)
    const pawnParameters = { 
        id: idPion, 
        AR: (currPower > 0)? 1: 0,
        move : currPower,
        risk : evalRisk(pawn[0].x, pawn[0].y, currPlateau, listRed),
        menace : evalMenace(pawn[0].x, pawn[0].y, currPlateau),
        staking : evalStack(pawn[0].x, listYellow),
        distance : (currPower > 0)? (6 - pawn[0].x)/6 : (6 + pawn[0].x)/6
    }
    console.log(pawnParameters)
    const allerRetour = (pawnParameters.AR === 1) ? PARAMETRES['A/R'].ALLER : PARAMETRES['A/R'].RETOUR
    const deplacement = PARAMETRES['DEPLACEMENT'][`${pawnParameters.move}`]
    const risque = pawnParameters.distance * pawnParameters.risk * PARAMETRES.RISQUE 
    const menace = pawnParameters.menace * PARAMETRES.MENACE
    const staking = pawnParameters.staking * PARAMETRES.STAKING
    return allerRetour + deplacement + risque + menace + staking
}

function evalRisk(x, y, currPlateau, listRed){
    /*console.log(currPlateau)
    console.log(x + " : " +y)
    //à revoir quand la valeur de currentPower peut être récupérée pour tous les pions
    {
        "DERRIERE" : 1,
        "DEVANT" : {
            "HORSPORTEE" : 1,
            "PROTEGE" : 1,
            "NONPROTEGE" : 1
        }
    }
    const pionAdverse = listRed.filter(pion => pion.x === x)
    console.log(pionAdverse)
    return evalMenace(pionAdverse[0].x, pionAdverse[0].x, 'red', pionAdverse[0].currentPower, currPlateau)*/
    return 1
}
function evalMenace(x, y, color, currPower, currPlateau){
    //on check s'il y a des pions adverses devant à une distance <= x+power (prochaine case du pion)
    var total = 0; 
    for(var i = x; i <= x + currPower ; i++){
        if (color === 'yellow'){
            if (currPlateau[i][y] === 'r') total+=1
        }
        else{
            if (currPlateau[x][i] === 'y') total=1
        }
    }
    return total
}
function evalStack(x, listYellow){
    var compt = 0
    listYellow.forEach(pion => {
        if(pion.x === x) compt++;
    });
    return compt;
}
