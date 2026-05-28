const db = require("../config/db");

async function buscarPorEmail(email) {
    const {rows} = await db.execute(
        "SELECT * FROM usuarios WHERE email = ? "
        [email]
    );
    return rows[0];    
}

async function criarUsuario(nome, email, senhaHash) {
    const [result] = await db.execute(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senhaHash]
    );
    return result;
}

module.exports = {
    buscarPorEmail,
    criarUsuario
};