function EmojiSelector({ 
  mostrarSelectorEmojis, 
  setMostrarSelectorEmojis, 
  categoriaEmojiSeleccionada, 
  setCategoriaEmojiSeleccionada,
  onSeleccionarEmoji 
}) {
  const emojisDisponibles = {
    objetos: [
      "📦", "📚", "🎸", "🔑", "⚗️", "💻", "📱", "📊", "📋", "🔧",
      "⚙️", "🔩", "🧰", "🛠️", "🔨", "⛏️", "🪓", "🪚", "🔗", "⛓️",
      "📏", "📐", "✂️", "📌", "📍", "🖇️", "📎", "🖊️", "✏️", "📝",
      "📄", "📃", "📑", "📜", "📰", "📓", "📔", "📕", "📗", "📘",
      "📙", "📒", "📚", "📖", "🔖", "💳", "💰", "💎", "⚖️", "🏺"
    ],
    tecnologia: [
      "💻", "🖥️", "🖨️", "⌨️", "🖱️", "🖲️", "💽", "💾", "💿", "📀",
      "📱", "☎️", "📞", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️",
      "⏰", "⏱️", "⏲️", "⏳", "⌛", "📡", "🔋", "🔌", "💡", "🔦",
      "🕯️", "📷", "📸", "📹", "📼", "🔍", "🔎", "🔬", "🔭", "📰"
    ],
    hogar: [
      "🏠", "🏡", "🏘️", "🏢", "🏬", "🏭", "🏪", "🏫", "🏨", "🏦",
      "🛏️", "🛋️", "🚪", "🪟", "🚿", "🛁", "🚽", "🧻", "🧸", "🖼️",
      "🕰️", "🧹", "🧽", "🧴", "🧼", "🪣", "🧺", "🗑️", "🛒", "🛍️",
      "🔑", "🗝️", "🔒", "🔓", "🔐", "🛎️", "🔔", "🔕", "📯", "📢"
    ],
    transporte: [
      "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐",
      "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍️", "🛺", "🚨", "🚥",
      "🚦", "🛑", "🚧", "⚓", "⛵", "🛶", "🚤", "🛳️", "⛴️", "🚢",
      "✈️", "🛩️", "🛫", "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡"
    ],
    comida: [
      "🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑",
      "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒",
      "🌶️", "🌽", "🥕", "🧄", "🧅", "🥔", "🍠", "🥐", "🍞", "🥖",
      "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗",
      "🍖", "🍤", "🍣", "🍱", "🍜", "🍲", "🍛", "🍝", "🍕", "🌭"
    ],
    deportes: [
      "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱",
      "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳",
      "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛷", "⛸️",
      "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤸", "🤺", "🤾", "🏇"
    ],
    musica: [
      "🎵", "🎶", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻",
      "🪘", "🎤", "🎧", "📻", "🎙️", "🎚️", "🎛️", "🎪", "🎭", "🎨",
      "🖌️", "🖍️", "🎬", "🎞️", "📽️", "🎮", "🕹️", "🎲", "🧩", "♠️"
    ],
    trabajo: [
      "💼", "💻", "📊", "📈", "📉", "💰", "💵", "💴", "💶", "💷",
      "💳", "🧾", "💎", "⚖️", "🔧", "🔨", "⛏️", "🛠️", "⚙️", "🔩",
      "⚗️", "🧪", "🧫", "🧬", "🔬", "🔭", "📡", "💉", "🩹", "🩺",
      "🏥", "🎓", "🏭", "🏪", "🏬", "🏦", "🏛️", "⛪", "🏟️", "🏗️"
    ],
    naturaleza: [
      "🌱", "🌿", "☘️", "🍀", "🎍", "🎋", "🍃", "🍂", "🍁", "🍄",
      "🌾", "💐", "🌷", "🌹", "🥀", "🌺", "🌸", "🌼", "🌻", "🌞",
      "🌝", "🌛", "🌜", "🌚", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒",
      "🌓", "🌔", "🌙", "🌎", "🌍", "🌏", "🪐", "⭐", "🌟", "✨",
      "⚡", "☄️", "💥", "🔥", "🌪️", "🌈", "☀️", "🌤️", "⛅", "🌦️"
    ],
    simbolos: [
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
      "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️",
      "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "☦️", "☯️", "☦️", "🛐",
      "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐",
      "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳"
    ]
  };

  const seleccionarEmoji = (emoji) => {
    onSeleccionarEmoji(emoji);
    setMostrarSelectorEmojis(false);
  };

  if (!mostrarSelectorEmojis) return null;

  return (
    <div className="form-overlay">
      <div className="form-modal" style={{ maxWidth: '600px', maxHeight: '80vh', overflow: 'hidden' }}>
        <div className="form-header">
          <h3>
            <i className="bi bi-emoji-smile" style={{ marginRight: '10px' }}></i>
            Selector de Emojis
          </h3>
          <button 
            onClick={() => setMostrarSelectorEmojis(false)}
            className="btn-close"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        {/* Pestañas de categorías */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '5px',
          padding: '15px 20px 10px',
          borderBottom: '1px solid #e9ecef',
          backgroundColor: '#f8f9fa'
        }}>
          {Object.keys(emojisDisponibles).map(categoria => (
            <button
              key={categoria}
              onClick={() => setCategoriaEmojiSeleccionada(categoria)}
              style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease',
                background: categoriaEmojiSeleccionada === categoria 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : '#e9ecef',
                color: categoriaEmojiSeleccionada === categoria ? 'white' : '#666'
              }}
            >
              {categoria}
            </button>
          ))}
        </div>
        
        {/* Grid de emojis */}
        <div style={{ 
          padding: '20px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))',
            gap: '8px'
          }}>
            {emojisDisponibles[categoriaEmojiSeleccionada].map((emoji, index) => (
              <button
                key={index}
                onClick={() => seleccionarEmoji(emoji)}
                style={{
                  width: '45px',
                  height: '45px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  background: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                title={`Seleccionar ${emoji}`}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        {/* Información adicional */}
        <div style={{ 
          padding: '15px 20px', 
          background: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            💡 Haz clic en cualquier emoji para seleccionarlo
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmojiSelector;
