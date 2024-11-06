import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TanyMCE = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');

  const handleEditorChange = (content) => {
    console.log('Content was updated:', content);
  };

  const handleFiles = (event) => {
    const files = event.target.files;
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      const fileType = file.type.startsWith('audio') ? 'audio' : 'video';
      insertMediaLink(url, fileType);
    });
  };

  const insertMediaLink = (url, type) => {
    if (editorRef.current) {
      const tag = type === 'audio'
        ? `<audio controls><source src="${url}" type="audio/mpeg"></audio>`
        : `<video controls><source src="${url}" type="video/mp4"></video>`;
      editorRef.current.insertContent(tag);
    }
  };

  const initTinyMCE = {
    height:  100,
    menubar: false,
    branding: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
      'spellchecker', 'media'
    ],
    toolbar: 'undo redo | formatselect |  italic underline strikethrough | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | addmedia | help',
    setup: (editor) => {
      editor.ui.registry.addButton('addmedia', {
        text: 'Add Media',
        onAction: () => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }
      });
    },
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  };

  return (
    <div className="transcript-editor">
      <Editor
        apiKey="qgccrrtye64vb335oxe52rr5ieaodh9rl1lqmypgvky3cojv"
        onInit={(evt, editor) => editorRef.current = editor}
        
        init={initTinyMCE}
        onEditorChange={handleEditorChange}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,video/*"
        onChange={handleFiles}
        style={{ display: 'none' }}
        multiple
      />
    </div>
  );
};

export default TanyMCE;
