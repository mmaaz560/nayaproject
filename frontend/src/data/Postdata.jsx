import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // ✅ Icons Import Kiye

export const Postdata = [
  {
    id: 1,
    title: "Mountain Adventures ⛰️",
    media: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "Sometimes you just need to disconnect and enjoy nature's beauty. Best trip ever! 🌲✨",
    editBtn: <FaEdit />,   // ✅ Edit Icon Add kiya
    deleteBtn: <FaTrash /> // ✅ Delete Icon Add kiya
  },
  {
    id: 2,
    title: "Coding Setup 💻",
    media: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "Late night coding sessions hit different. Building my new project, wish me luck! 🚀☕",
    editBtn: <FaEdit />,
    deleteBtn: <FaTrash />
  },
  {
    id: 3,
    title: "Cheat Day 🍕",
    media: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "You can't buy happiness, but you can buy pizza. And that's kind of the same thing. 🍕🤤",
    editBtn: <FaEdit />,
    deleteBtn: <FaTrash />
  },
  {
    id: 4,
    title: "Fitness Journey 💪",
    media: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "The pain you feel today will be the strength you feel tomorrow. Keep grinding! 🏋️‍♂️🔥",
    editBtn: <FaEdit />,
    deleteBtn: <FaTrash />
  },
  {
    id: 5,
    title: "Meet Simba 🐶",
    media: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: "He's not just a dog, he's family. The goodest boy in the whole world! 🐾❤️",
    editBtn: <FaEdit />,
    deleteBtn: <FaTrash />
  },
];