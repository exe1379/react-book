
import { useState,useEffect } from 'react'
import './App.css'

 
DataTable.use(DT);

function App() {
  const [book, setbook] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [pub, setPub] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 判斷是否為編輯模式

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
  
  const handleSubmit = () => {
  if (!name || !price || !amount) {
    alert("所有欄位皆為必填，請確認輸入資料");
    return;
  }

  const newBook = {
    name,
    price: Number(price),
    amount: Number(amount),
    pub
    
  }
  ;
  if (isEditing) {
  newBook.id = id; // 編輯時才送 id
  }



  if (isEditing) {
    // 編輯模式下使用 PUT
    fetch(`http://localhost:8080/book/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook)
    })
      .then(res => res.json())
      .then(result => {
        const updatedBook = result.data;
        setbook(book.map(b => (b.id === updatedBook.id ? updatedBook : b)));
        clearForm();
      })
      .catch(err => {
        console.error("更新失敗", err);
      });
  } else {
    // 新增模式下使用 POST
    fetch("http://localhost:8080/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook)
    })
      .then(res => res.json())
      .then(result => {
        const addedBook = result.data;
        setbook([...book, addedBook]);
        clearForm();
      })
      .catch(err => {
        console.error("新增失敗", err);
      });
  }
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

  const handleEdit = (bookToEdit) => {
  setId(bookToEdit.id);
  setName(bookToEdit.name);
  setPrice(bookToEdit.price);
  setAmount(bookToEdit.amount);
  setPub(bookToEdit.pub);
  setIsEditing(true);
};
  const clearForm = () => {
  setId('');
  setName('');
  setPrice('');
  setAmount('');
  setPub(false);
  setIsEditing(false);
};
  

  return (
    <>
      <div>
        <legend>{isEditing ? "編輯書籍" : "新增書籍"}</legend>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              書名: <input name="name" value={name} onChange={(e) => setName(e.target.value)} required /><p/>
              價格: <input name="price" value={price} onChange={(e) => setPrice(e.target.value)} required /><p/>
              數量: <input name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required /><p/>
              出刊: <input type="checkbox" checked={pub} onChange={(e) => setPub(e.target.checked)} /><p/>
             <button type="submit">{isEditing ? "更新" : "新增"}</button>
           {isEditing && <button type="button" onClick={clearForm}>取消編輯</button>}
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
          {book.map((book) => (
            <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.price}</td>
            <td>{book.amount}</td>
            <td>{book.pub ? "出版" : "未出版"}</td>
            <td>
              <button type="button" onClick={() => handleEdit(book)}>編輯</button>
              <button type="button" onClick={() => handleDelete(book.id)}>刪除</button>
            </td>
          </tr>))}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default App
