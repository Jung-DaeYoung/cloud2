import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [view, setView] = useState('list') // 'list', 'detail', 'write', 'edit'
  const [currentPost, setCurrentPost] = useState(null)
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/posts'

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      console.log(`Fetching posts from: ${API_URL}`);
      const response = await fetch(API_URL)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleCreatePost = async (postData) => {
    try {
      console.log(`Creating post at: ${API_URL}`, postData);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      if (response.ok) {
        alert('게시글이 등록되었습니다.');
        fetchPosts()
        setView('list')
      } else {
        alert('등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('서버 통신 오류가 발생했습니다.');
    }
  }

  const handleDeletePost = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      const url = `${API_URL}/${id}`;
      console.log(`Deleting post at: ${url}`);
      const response = await fetch(url, {
        method: 'DELETE'
      })
      if (response.ok) {
        alert('삭제되었습니다.');
        fetchPosts()
        setView('list')
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('서버 통신 오류가 발생했습니다.');
    }
  }

  const handleUpdatePost = async (id, postData) => {
    try {
      const url = `${API_URL}/${id}`;
      console.log(`Updating post at: ${url}`, postData);
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
      if (response.ok) {
        alert('수정되었습니다.');
        fetchPosts()
        setView('list')
      } else {
        alert('수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating post:', error)
      alert('서버 통신 오류가 발생했습니다.');
    }
  }

  // UI rendering logic will go here in next phases
  return (
    <div className="App">
      <header>
        <h1>심플 게시판</h1>
        <button onClick={() => { setView('list'); fetchPosts(); }}>목록</button>
        <button onClick={() => setView('write')}>글쓰기</button>
      </header>
      <main>
        {view === 'list' && (
          <div className="post-list">
            <h2>게시글 목록</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} onClick={() => { setCurrentPost(post); setView('detail'); }}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {posts.length === 0 && <p>게시글이 없습니다.</p>}
          </div>
        )}

        {view === 'write' && (
          <div className="post-form">
            <h2>글쓰기</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleCreatePost({
                title: formData.get('title'),
                author: formData.get('author'),
                content: formData.get('content')
              })
            }}>
              <div>
                <label>제목</label>
                <input name="title" required />
              </div>
              <div>
                <label>작성자</label>
                <input name="author" required />
              </div>
              <div>
                <label>내용</label>
                <textarea name="content" required rows="10" />
              </div>
              <button type="submit">등록</button>
              <button type="button" onClick={() => setView('list')}>취소</button>
            </form>
          </div>
        )}

        {view === 'detail' && currentPost && (
          <div className="post-detail">
            <h2>{currentPost.title}</h2>
            <div className="post-info">
              <span>작성자: {currentPost.author}</span> | 
              <span> 작성일: {new Date(currentPost.createdAt).toLocaleString()}</span>
            </div>
            <hr />
            <div className="post-content">
              {currentPost.content}
            </div>
            <hr />
            <button onClick={() => setView('list')}>목록으로</button>
            <button onClick={() => setView('edit')}>수정</button>
            <button onClick={() => handleDeletePost(currentPost.id)}>삭제</button>
          </div>
        )}
        
        {view === 'edit' && currentPost && (
          <div className="post-form">
            <h2>글 수정</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleUpdatePost(currentPost.id, {
                title: formData.get('title'),
                author: formData.get('author'),
                content: formData.get('content')
              })
            }}>
              <div>
                <label>제목</label>
                <input name="title" defaultValue={currentPost.title} required />
              </div>
              <div>
                <label>작성자</label>
                <input name="author" defaultValue={currentPost.author} required />
              </div>
              <div>
                <label>내용</label>
                <textarea name="content" defaultValue={currentPost.content} required rows="10" />
              </div>
              <button type="submit">저장</button>
              <button type="button" onClick={() => setView('detail')}>취소</button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
