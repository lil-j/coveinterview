"use client"

import Image from "next/image";
import {motion} from "framer-motion";
import { useState } from "react";

const spotlightedDishes = [
  4, 5
]
const returnedMenu = [
  {
    type: "Category",
    items: [
      {
        id: 1,
        name: "Pasta",
        linkedIds: [4],
      },
      {
        id: 2, 
        name: "Pizza",
        linkedIds: [5]
      }
    ]
  },
  {
    type: "Dish",
    items: [
      {
        id: 4,
        name: "Spaghetti",
        price: 10.95,
        linkedIds: [2, 3]
      },
      {
        id: 5,
        name: "Margherita Pizza",
        price: 12.95,
        linkedIds: [6, 7]
      }
    ]
  },
  {
    type: "Option",
    items: [
      {
        id: 2,
        name: "Meatballs",
        price: 1.00,
      },
      {
        id: 3,
        name: "Chicken",
        price: 2.00,
      },
      {
        id: 6,
        name: "Extra Cheese",
        price: 1.50,
      },
      {
        id: 7,
        name: "Pepperoni",
        price: 2.00,
      }
    ]
  }
]



export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(returnedMenu[0].items[0].id);
  function handleCategoryClick(id) {
    setSelectedCategory(id);
    // scroll to category
    const category = document.getElementById(id);
    category.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  
  return (
    <div className="max-w-3xl mx-auto mt-24">
      
      <div className="flex justify-between fixed top-0 w-full left-0 gap-4 bg-red-600 text-white px-4 py-4">
      <h1 className="text-4xl font-boldtext-center">
        Italian Restaurant
      </h1>
      <div className="flex gap-4">
      {
        returnedMenu[0].items.map((item) => {
          return <div className="" key={item.id}>
            <a className={`text-2xl font-medium cursor-pointer ${selectedCategory === item.id ? "" : "opacity-60"}`} onClick={
              () => handleCategoryClick(item.id)
            }>
            {item.name}
            {
              selectedCategory === item.id && (
                <motion.div 
                layoutId="underline"
                className="h-1 bg-white w-full">
                </motion.div>
              )
            }
            </a>
            </div>
        })
      }
      </div>
      
      </div>
      {
        returnedMenu[0].items.map((item) => {
          return <div id={item.id} className="h-screen pt-32" key={item.id}>
            <h2 className='text-2xl font-bold mb-2'>
            {item.name}
            </h2>
            {
              item.linkedIds.map((linkedId) => {
                const linkedItem = returnedMenu[1].items.find((item) => item.id === linkedId);
                return <div id={linkedId} key={linkedId}>
                  <div className="flex justify-between">
                  <h3 className="text-xl font-bold mb-1">{linkedItem.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">${linkedItem.price}</p>
                    </div>
                  {
                    linkedItem.linkedIds.map((linkedId) => {
                      const linkedItem = returnedMenu[2].items.find((item) => item.id === linkedId);
                      return <div className="flex justify-between">
                        <h4 className="text-sm font-medium mb-1">Add {linkedItem.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">${linkedItem.price}</p>
                      </div>
                    })
                  }
                  </div>
              })
            }
          </div>
        })
      }

    </div>
  );
}
