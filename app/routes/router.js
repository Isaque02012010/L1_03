const express = require("express");
const router = express.Router();
// Importando os validadores necessários
const { body, validationResult } = require("express-validator");

// Rota GET - Renderiza a página inicial
router.get("/", (req, res) => {
    res.render("pages/index", {
        retorno: null,
        valores: { salario: "" },
        erros: null // Inicializa como null para o EJS não quebrar
    });
});

// Rota POST - Processa o formulário com as regras de validação
router.post(
    "/reajuste",
    [
        // Regras aplicadas ao campo "salario" do formulário
        body("salario")
            .trim()
            .notEmpty().withMessage("O campo salário não pode ficar vazio.")
            .isFloat({ min: 0.01 }).withMessage("Insira um número válido maior que zero (use ponto para centavos).")
    ],
    (req, res) => {
        // Coleta os erros gerados pelas regras acima
        const errosValidacao = validationResult(req);

        // Se houver erros, cancela a lógica e devolve os erros para a tela
        if (!errosValidacao.isEmpty()) {
            return res.render("pages/index", {
                retorno: null,
                valores: { salario: req.body.salario },
                erros: errosValidacao.array() // Passa o array de erros para a view
            });
        }

        // Se chegou aqui, os dados são válidos. Iniciamos o cálculo:
        let salario = parseFloat(req.body.salario);
        let percentual; // Declarada explicitamente com let

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

        // Renderiza o sucesso limpando o bloco de erros
        res.render("pages/index", {
            retorno: objJson,
            valores: { salario: req.body.salario },
            erros: null
        });
    }
);

module.exports = router;
