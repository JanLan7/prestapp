import { useState } from 'react';

export function useUIState() {
  // Estados para UI y formularios
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarFormUsuario, setMostrarFormUsuario] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    password: ""
  });
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarFormEditarUsuario, setMostrarFormEditarUsuario] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    password: ''
  });

  // Estados para alquileres
  const [cedulaAlquiler, setCedulaAlquiler] = useState("");
  const [elementoParaAlquilar, setElementoParaAlquilar] = useState(null);
  const [mostrarFormAlquiler, setMostrarFormAlquiler] = useState(false);

  // Estados para agregar elemento
  const [mostrarFormAgregarElemento, setMostrarFormAgregarElemento] = useState(false);
  const [nuevoElemento, setNuevoElemento] = useState({
    nombre: "",
    descripcion: ""
  });

  // Estados para editar elemento
  const [mostrarFormEditarElemento, setMostrarFormEditarElemento] = useState(false);
  const [elementoEditado, setElementoEditado] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    categoria: ""
  });

  // Estados para crear categoría
  const [mostrarFormCategoria, setMostrarFormCategoria] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
    icono: "📦"
  });

  // Estados para editar categoría
  const [mostrarFormEditarCategoria, setMostrarFormEditarCategoria] = useState(false);
  const [categoriaEditada, setCategoriaEditada] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    icono: "📦"
  });

  // Estados para selector de emojis
  const [mostrarSelectorEmojis, setMostrarSelectorEmojis] = useState(false);
  const [categoriaEmojiSeleccionada, setCategoriaEmojiSeleccionada] = useState("objetos");

  // Estados para dashboard de usuario
  const [fechaFiltroUsuario, setFechaFiltroUsuario] = useState("");

  // Estados para registros de movimientos
  const [mostrarRegistros, setMostrarRegistros] = useState(false);
  const [fechaInicioRegistros, setFechaInicioRegistros] = useState("");
  const [fechaFinRegistros, setFechaFinRegistros] = useState("");

  return {
    // Estados y setters para categorías
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    
    // Estados y setters para usuarios
    mostrarFormUsuario,
    setMostrarFormUsuario,
    nuevoUsuario,
    setNuevoUsuario,
    usuarioSeleccionado,
    setUsuarioSeleccionado,
    mostrarFormEditarUsuario,
    setMostrarFormEditarUsuario,
    usuarioEditado,
    setUsuarioEditado,
    
    // Estados y setters para alquileres
    cedulaAlquiler,
    setCedulaAlquiler,
    elementoParaAlquilar,
    setElementoParaAlquilar,
    mostrarFormAlquiler,
    setMostrarFormAlquiler,
    
    // Estados y setters para elementos
    mostrarFormAgregarElemento,
    setMostrarFormAgregarElemento,
    nuevoElemento,
    setNuevoElemento,
    mostrarFormEditarElemento,
    setMostrarFormEditarElemento,
    elementoEditado,
    setElementoEditado,
    
    // Estados y setters para categorías
    mostrarFormCategoria,
    setMostrarFormCategoria,
    nuevaCategoria,
    setNuevaCategoria,
    mostrarFormEditarCategoria,
    setMostrarFormEditarCategoria,
    categoriaEditada,
    setCategoriaEditada,
    
    // Estados y setters para emojis
    mostrarSelectorEmojis,
    setMostrarSelectorEmojis,
    categoriaEmojiSeleccionada,
    setCategoriaEmojiSeleccionada,
    
    // Estados y setters para usuario dashboard
    fechaFiltroUsuario,
    setFechaFiltroUsuario,
    
    // Estados y setters para registros
    mostrarRegistros,
    setMostrarRegistros,
    fechaInicioRegistros,
    setFechaInicioRegistros,
    fechaFinRegistros,
    setFechaFinRegistros
  };
}
