const express = require("express");
const router = express.Router();
 
router.get("/", (req, res) => {
    res.render("pages/index", {
        retorno: null,
        valores: { salario: "" }
    });
});
 
router.post("/reajuste", (req, res) => {
 
   
    let salario = parseFloat(req.body.salario);
 
 
    if (salario <= 1400) {
        percentual = 15;
    } else if (salario <= 4500) {
        percentual = 10;
    } else if (salario <= 10000) {
        percentual = 7.5;
    } else {
        percentual = 5;
    }
 
 
    let aumento = salario * (percentual / 100);
 
 
    let novoSalario = salario + aumento;
 
   
    let objJson = {
        salario: salario.toFixed(2),
        percentual: percentual,
        aumento: aumento.toFixed(2),
        novoSalario: novoSalario.toFixed(2)
    };
 
 
    res.render("pages/index", {
        retorno: objJson,
        valores: { salario: req.body.salario }
    });
 
});
 
module.exports = router;
 