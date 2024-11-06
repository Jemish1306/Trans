// src/components/CKEditorComponent.js
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = () => {
  const [editorData, setEditorData] = useState('');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">CKEditor 5 in React</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
          config={{
            toolbar: [
              'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
              'insertTable', 'blockQuote', 'mediaEmbed', 'undo', 'redo'
            ],
            mediaEmbed: {
              previewsInData: true
            }
          }}
        />
      </div>
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-xl font-medium">Output HTML</h3>
        <div className="mt-2 p-4 border border-gray-300 rounded-lg bg-white">
          {editorData}
        </div>
      </div>
    </div>
  );
};

export default CKEditorComponent;
