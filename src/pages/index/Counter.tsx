import React, { useState } from 'react'

export { Counter }

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button className='border border-gray-500 px-2 py-1 rounded' type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count}
    </button>
  )
}
