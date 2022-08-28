import React from 'react'
import { Counter } from './Counter'

export { Page }

function Page() {
  return (
    <div className='h-screen flex flex-col gap-4 justify-center items-center'>
      <h1 >Welcome</h1>
      <p>Rendered to HTML.</p>
      <Counter />
    </div >
  )
}
