import { useState, type FormEvent } from "react";
import ShoppingItem from "./ShoppingItem";
import type { Item } from "./types";

function App() {
  // state: список товаров и значения полей формы
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const numericPrice = Number(price);
  const isValid = name.trim() !== "" && price !== "" && Number.isFinite(numericPrice) && numericPrice >= 0;

  function addItem(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!isValid) {
      return;
    }

    const newItem: Item = { id: crypto.randomUUID(), name: name.trim(), price: numericPrice };

    // Новый массив вместо изменения старого: так React увидит обновление.
    setItems((current) => [...current, newItem]);
    setName("");
    setPrice("");
  }

  function removeItem(id: string): void {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  // Считаем в тыйынах (целые числа), чтобы не накапливалась погрешность дробных чисел.
  const total = items.reduce((sum, item) => sum + Math.round(item.price * 100), 0) / 100;

  return (
    <main>
      <h1>Список покупок</h1>

      <form onSubmit={addItem}>
        <input
          type="text"
          aria-label="Название товара"
          placeholder="Название"
          value={name}
          maxLength={100}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          aria-label="Цена в сомах"
          placeholder="Цена, сом"
          min="0"
          max="999999999"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <button type="submit" disabled={!isValid}>
          Добавить
        </button>
      </form>

      {items.length === 0 ? (
        <p className="empty">Список пока пуст.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <ShoppingItem key={item.id} item={item} onRemove={removeItem} />
          ))}
        </ul>
      )}

      <p className="total" aria-live="polite">
        Общая стоимость:{" "}
        <strong>{total.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} сом</strong>
      </p>
    </main>
  );
}

export default App;
