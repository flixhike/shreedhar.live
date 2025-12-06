import React, { useState, useRef, useEffect } from 'react';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange, placeholder = "Enter description..." }) => {
  const editorRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState('#000000');

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const emojis = ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👏', '🙌', '👐', '🤲', '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅', '👄', '🎨', '🎭', '🎪', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰', '🧩', '🚀', '✨', '💡', '💻', '📱', '⌨️', '🖱️', '🖥️', '🖨️', '⏰', '📆', '📅', '📊', '📈', '📉', '💼', '📝', '✏️', '📌', '📍', '🎯', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '⭐', '🌟', '💫', '✅', '❌', '⚠️', '🔥', '💯', '🎉', '🎊'];

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertEmoji = (emoji) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(emoji));
      range.collapse(false);
    }
    setShowEmojiPicker(false);
    editorRef.current?.focus();
  };

  const handleColorChange = (color) => {
    setTextColor(color);
    applyFormat('foreColor', color);
    setShowColorPicker(false);
  };

  const handleInput = () => {
    const content = editorRef.current?.innerHTML || '';
    onChange(content);
  };

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('bold')}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('italic')}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('underline')}
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('strikeThrough')}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={(e) => applyFormat('fontSize', e.target.value)}
            defaultValue="3"
            title="Font Size"
          >
            <option value="1">8px</option>
            <option value="2">10px</option>
            <option value="3">12px</option>
            <option value="4">14px</option>
            <option value="5">18px</option>
            <option value="6">24px</option>
            <option value="7">36px</option>
          </select>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <div className="color-picker-wrapper">
            <button
              type="button"
              className="toolbar-btn color-btn"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Text Color"
            >
              <span className="color-icon" style={{ backgroundColor: textColor }}>A</span>
            </button>
            {showColorPicker && (
              <div className="color-picker-dropdown">
                <div className="color-picker-header">
                  <span>Text Color</span>
                  <button type="button" onClick={() => setShowColorPicker(false)}>×</button>
                </div>
                <div className="color-grid">
                  {['#000000', '#424242', '#666666', '#999999', '#CCCCCC', '#EEEEEE', '#F3F3F3', '#FFFFFF',
                    '#FF0000', '#FF5722', '#FF9800', '#FFC107', '#FFEB3B', '#CDDC39', '#8BC34A', '#4CAF50',
                    '#009688', '#00BCD4', '#03A9F4', '#2196F3', '#3F51B5', '#673AB7', '#9C27B0', '#E91E63',
                    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'].map(color => (
                    <button
                      key={color}
                      type="button"
                      className="color-swatch"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    />
                  ))}
                </div>
                <div className="custom-color">
                  <label>Custom:</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('insertUnorderedList')}
            title="Bullet List"
          >
            ≡
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('insertOrderedList')}
            title="Numbered List"
          >
            ⋮
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <div className="emoji-picker-wrapper">
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Insert Emoji"
            >
              😀
            </button>
            {showEmojiPicker && (
              <div className="emoji-picker-dropdown">
                <div className="emoji-picker-header">
                  <span>Insert Emoji</span>
                  <button type="button" onClick={() => setShowEmojiPicker(false)}>×</button>
                </div>
                <div className="emoji-grid">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      className="emoji-btn"
                      onClick={() => insertEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('justifyLeft')}
            title="Align Left"
          >
            ⫷
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('justifyCenter')}
            title="Align Center"
          >
            ≡
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('justifyRight')}
            title="Align Right"
          >
            ⫸
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => applyFormat('removeFormat')}
            title="Clear Formatting"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;

