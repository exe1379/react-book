
import './App.css'

function App() {
  

  return (
    <>
      <div>
        <legend>新增書籍</legend>
        <form>
          id: <input name="id"/><p/>
          書名: <input name="name"/><p/>
          價格: <input name="price"/><p/>
          數量: <input name="amount"/><p/>
          出刊: <input type='checkbox' name="pub"/><p/>
          <button type="submit">新增</button>
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button type='button'>編輯</button>
              <button type='button'>刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  )
}

export default App
