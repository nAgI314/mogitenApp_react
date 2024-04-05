import React, { useState } from 'react';



export const columns = [
    { Header: "商品", accessor: "product" },
    { Header: "値段", accessor: "price" }
    ];
  
  export const productData = [
    {product: "焼きそば",      price: "350"},
    {product: "フランクフルト",price: "200"},
    {product: "肉巻きおにぎり",price: "350"},
    {product: "チュロス",      price: "250"},
    {product: "かき氷",        price: "200"},
    {product: "チョコバナナ",  price: "300"},
    {product: "つぶつぶアイス",price: "350"},
    {product: "クレープ",      price: "300"},
    {product: "ドリンク各種",  price: "300"},
    {product: "ペットボトル",  price: "150"}
  ];

  interface Item {
    product: string;
    price: number;
    quantity: number;
  }

  const _productData: Item[] = [
    {product: "焼きそば",      price: 350, quantity:0},
    {product: "フランクフルト",price: 200, quantity:0},
    {product: "肉巻きおにぎり",price: 350, quantity:0},
    {product: "チュロス",      price: 250, quantity:0},
    {product: "かき氷",        price: 200, quantity:0},
    {product: "チョコバナナ",  price: 300, quantity:0},
    {product: "つぶつぶアイス",price: 350, quantity:0},
    {product: "クレープ",      price: 300, quantity:0},
    {product: "ドリンク各種",  price: 300, quantity:0},
    {product: "ペットボトル",  price: 150, quantity:0}
  ]
  
  const ItemTable: React.FC<{ items: Item[] }> = ({ items }) => {
    const [itemList, setItemList] = useState<Item[]>(items.map(item => ({ ...item, quantity: 0 })));
    const [_sum, setSum] = useState<number>(0);
    const [_inputValue, set_InputValue] = useState(0);
    
    const decreaseQuantity = (index: number) => {
      const updatedList = [...itemList];
      updatedList[index].quantity = Math.max(0, updatedList[index].quantity - 1);
      setItemList(updatedList);
      calculateSum(updatedList);
    };
  
    const increaseQuantity = (index: number) => {
      const updatedList = [...itemList];
      updatedList[index].quantity++;
      setItemList(updatedList);
      calculateSum(updatedList);
    };
    
    const calculateSum = (items: Item[]) => {
      let sum = 0;
      items.forEach(item => {
          sum += item.quantity * item.price;
      });
      setSum(sum);
  };

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>品物名</th>
              <th>減らす</th>
              <th>個数</th>
              <th>増やす</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={index}>
                <td>{item.product}</td>
                <td>
                  <button onClick={() => decreaseQuantity(index)}>-</button>
                </td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => increaseQuantity(index)}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p></p>
        <input 
          type="number"
          onChange={(e) => set_InputValue(parseInt(e.target.value)-_sum)}
        />
        <p>合計：{_sum}</p>
        <p>おつり：{_inputValue}</p>

      </div>
    );
  };
  
  // Example usage:
  const ExampleComponent: React.FC = () => {
    const initialItems: Item[] = [
//      { name: 'Item 1' },
//      { name: 'Item 2' },
//      { name: 'Item 3' },
//      { name: 'Item 4' },
//      { name: 'Item 5' },
    ];
  
    return <ItemTable items={initialItems} />;
  };
  
const CreateCal = ()=>{
  return(
      <ItemTable items={_productData} />
  );
}
export{CreateCal};