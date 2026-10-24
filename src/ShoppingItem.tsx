import type { Item } from "./types";

// item и onRemove приходят из родительского компонента App через props.
interface ShoppingItemProps {
  item: Item;
  onRemove: (id: string) => void;
}

function ShoppingItem({ item, onRemove }: ShoppingItemProps) {
  return (
    <li className="item">
      <span className="item-name">{item.name}</span>
      <span className="item-price">
        {item.price.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} сом
      </span>
      <button type="button" aria-label={`Удалить товар «${item.name}»`} onClick={() => onRemove(item.id)}>
        Удалить
      </button>
    </li>
  );
}

export default ShoppingItem;
