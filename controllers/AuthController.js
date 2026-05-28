const bcrypt = require("bcrypt");
const { buscarPorEmail, criarUsuario } = require("../models/UsuarioModel");

async function cadastrar(req, res) {
    try {
        const { nome, email, senha } = req.body;
        
        if (!nome || !senha) {
            return res.status(400).json({ erro: "Preencha todos os campos"});
        }

        const usuarioExistente = await buscarPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ erro: "Email já cadastro" });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await criarUsuario(nome, email, senhaHash);

        res.json({ mensagem: "Usuário cadastrado com sucesso" });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro no servidor "});
    }
}       

async function login(req, res) {
    try {
        const { email, senha } = req.body;
        const usuario = await buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ erro: "Usuário não encontrado" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: "Senha inválida" });
        }

        res.json({ mensagem: "Login realizado com sucesso "});

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro no servidor" });
    }
}

module.exports = {
    cadastrar,
    login
};