import { useState } from "react";
import '../auth.css';

const Auth = ({ onLogin, mensaje, loading }) => {
  const [vistaActual, setVistaActual] = useState("login");
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    
    if (vistaActual === "login") {
      await onLogin(cedula, password);
    } else {
      await onLogin(cedula, password, nombre, apellido, email, telefono, "registro");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{
        background: 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '500px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '800', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            PRESTAPP
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '1.1rem', 
            fontWeight: '500',
            margin: '0'
          }}>
            Sistema de Gestión de Préstamos
          </p>
        </div>
        
        <h2 className="auth-title">
          {vistaActual === "login" ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        
        <form onSubmit={manejarSubmit}>
          <div className="form-group">
            <label>Cédula</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 1)',
                opacity: 1
              }}
            />
          </div>
          
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 1)',
                opacity: 1
              }}
            />
          </div>
          
          {vistaActual === "registro" && (
            <>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 1)',
                    opacity: 1
                  }}
                />
              </div>
              
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 1)',
                    opacity: 1
                  }}
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 1)',
                    opacity: 1
                  }}
                />
              </div>
              
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 1)',
                    opacity: 1
                  }}
                />
              </div>
            </>
          )}
          
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Cargando..." : vistaActual === "login" ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        
        <div className="auth-switch">
          {vistaActual === "login" ? (
            <>
              ¿No tienes cuenta?{" "}
              <button 
                type="button" 
                onClick={() => setVistaActual("registro")}
                className="auth-link"
              >
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <button 
                type="button" 
                onClick={() => setVistaActual("login")}
                className="auth-link"
              >
                Inicia Sesión
              </button>
            </>
          )}
        </div>
        
        {mensaje && <div className="mensaje">{mensaje}</div>}
      </div>
    </div>
  );
};

export default Auth;
