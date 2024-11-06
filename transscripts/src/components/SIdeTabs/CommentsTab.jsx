import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // For the Add New button icon

const CommentsTab = () => {
  const [comments, setComments] = useState([
    { id: 1, user: 'Phoenix Baker', timestamp: '0:30', content: 'Looks good!' },
    { id: 2, user: 'Lana Steiner', timestamp: '1:30', content: 'Thanks so much, happy with that.' },
    { id: 3, user: 'Demi Wilkinson', timestamp: '2:21', content: 'There’s a typo here' },
    { id: 4, user: 'Candice Wu', timestamp: '0:35', content: 'This looks good' },
    { id: 5, user: 'Natali Craig', timestamp: '1:30', content: 'This is how the style should follow' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    const nextId = comments.length + 1; 
    const newEntry = {
      id: nextId,
      user: 'New User', 
      timestamp: new Date().toLocaleTimeString(), 
      content: newComment
    };
    setComments([...comments, newEntry]);
    setNewComment(''); 
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <ul className="space-y-4">
        {comments.map(comment => (
          <li key={comment.id} className="border-b pb-2">
            <strong>{comment.user}</strong> at {comment.timestamp}
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 ">
        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a new comment..."
          className="border rounded p-2 mr-2 w-full"
        />
        <div className='flex flex-col items-center justify-center '>

        <button onClick={handleAddComment} className="mt-6 text-blue-600  flex items-center justify-center w-full border border-blue-500    rounded">
          <FaPlus className=' m-1 mr-2 font-medium text-sm' /> Add New
        </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsTab;
