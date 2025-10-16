const pool = require("../config/db");

exports.registrarLibro = async (req, res) => {
  const { titulo, autor, isbn, stock } = req.body;

  if ( !titulo || !autor || !isbn || !stock ) {
    return res.status(400).json({
      mensaje: "Datos para Registrar el Libro Incompletos/Inválidos.",
    });
  }
  const sql =
    "INSERT INTO libros (titulo, autor, isbn, stock) VALUES (?,?,?,?)";
  try {
    const [result] = await pool.query(sql, [ titulo,autor,isbn,stock,]);
    res.status(201).json({
      id: result.insertId,
      mensaje: "Libro Registrado correctamente",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Hubo un Error Interno en el Servidor" });
  }
};

exports.obtenerLibros = async (req, res) => {
  const sql = `SELECT * FROM libros ORDER BY id DESC`;

  try {
    const [libros] = await pool.query(sql);
    res.status(200).json(libros);
  } catch (e) {
    console.error("Error al obtener la Lista de Libros:", e);
    res
      .status(500)
      .json({ mensaje: "Hubo un Error Interno en el Servidor" });
  }
};

//Buscar por ID
exports.obtenerLibroPorId = async (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT id, titulo, autor, isbn, stock FROM libros WHERE id  = ?";

  try {
    const [libros] = await pool.query(sql, [id]);

    if (libros.length == 0) {
      return res.status(404).json({ mensaje: "No encontramos el Libro solicitado por su ID" });
    }
    res.status(200).json(libros[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Hubo un Error Interno en el Servidor" });
  }
};

exports.actualizarLibro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, isbn, stock  } = req.body;

  if ( !titulo && !autor && !isbn && !stock ) {
    return res.status(400).json({ mensaje: "Falta completar los campos requeridos para Actualizar el Libro" });
  }

  let sqlParts = [];
  let values = [];

  if (titulo) {
    sqlParts.push("titulo = ?");
    values.push(titulo);
  }
  if (autor) {
    sqlParts.push("autor = ?");
    values.push(autor);
  }
  if (isbn) {
    sqlParts.push("isbn = ?");
    values.push(isbn);
  }
  if (stock) {
    sqlParts.push("stock = ?");
    values.push(stock);
  }
  if (sqlParts.length == 0) {
    return res.status(400).json({ mensaje: "No hay datos por actualizar" });
  }

  values.push(id);
  const sql = `UPDATE libros SET ${sqlParts.join(", ")} WHERE id = ?`;
  try {
    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: "No encontramos el libro con el ID" });
    }
    res.status(200).json({ mensaje: "Libro Actualizado Correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Hubo un Error Interno en el Servidor" });
  }
};

//Eliminar
exports.eliminarLibro = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM libros WHERE id = ?";
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: "El Libro a Eliminar no Existe" });
    }
    res.status(200).json({ mensaje: "El Libro ha sido Eliminado correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Hubo un Error Interno en el Servidor" });
  }
};
