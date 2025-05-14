
import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [book, setbook] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [pub, setPub] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/book")
    .then(res => res.json())
    .then(result => {
      const data = result.data;
      setbook(data);
      if(data.length > 0){
      setId(data[0].id);
      setName(data[0].name);
      setPrice(data[0].price);
      setAmount(data[0].amount);
      setPub(data[0].pub)
      }
    })
     .catch(err => {
        console.log("載入失敗", err);
      });
  }, [])
  
  const handleAdd = () => {
  const newBook = {
    id,
    name,
    price: Number(price),
    amount: Number(amount),
    pub
  };

  fetch("http://localhost:8080/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newBook)
  })
    .then(res => res.json())
    .then(result => {
      const addedBook = result.data; // 後端 ApiResponse 回傳的書籍
      setbook([...book, addedBook]); // ✅ 更新前端畫面
      // ✅ 清空輸入欄位
      setId("");
      setName("");
      setPrice("");
      setAmount("");
      setPub(false);
    })
    .catch(err => {
      console.error("新增失敗", err);
    });
};
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/book/${id}`, { method: "DELETE" })
    .then(res => {
      if (!res.ok){
        throw new Error("刪除失敗");
      }
       setbook(book.filter((b) => b.id !== id));
    })
    .catch(err => {
      console.error("刪除失敗:", err);
    });
  }

  return (
    <>
      <div>
        <legend>新增書籍</legend>
        <form>
          id: <input name="id" value={id} onChange={(e) => setId(e.target.value)}/><p/>
          書名: <input name="name" value={name} onChange={(e) => setName(e.target.value)}/><p/>
          價格: <input name="price" value={price} onChange={(e) => setPrice(e.target.value)}/><p/>
          數量: <input name="amount" value={amount} onChange={(e) => setAmount(e.target.value)}/><p/>
          出刊: <input type='checkbox' name="pub" value={pub} onChange={(e) => setPub(e.target.value)}/><p/>
          <button type="submit" onClick={handleAdd}>新增</button>
        </form>
          <h2>📖 書籍列表</h2>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
          <th>ID</th>
          <th>書名</th>
          <th>價格</th>
          <th>數量</th>
          <th>出刊</th>
          <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {book.map((book,index) => (
             <tr key={index}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.price}</td>
            <td>{book.amount}</td>
            <td>{book.pub ? "出版" : "未出版"}</td>
            <td>
              <button type='button'>編輯</button>
              <button type='button' onClick={() => handleDelete(book.id)}>刪除</button>
            </td>
          </tr>))}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default App
