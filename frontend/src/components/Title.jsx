import React from 'react'

const Title = ({ title, subtitle, text, direction ,color}) => {
  
  const alignment =
    direction === "center"
      ? "text-center items-center"
      : "text-start items-start"

  return (
    <div className={`flex flex-col justify-center ${alignment}`}>
      
      <div className="flex justify-start items-center gap-3 text-accent">
        <p className="w-16 h-0.5 rounded-full bg-accent"></p>
        <p>{title}</p>
      </div>

      
      <div className="mt-3 ">
        <h1 className={`font-semibold text-${color} text-3xl ${direction === "center" ? "text-center" : "text-start"}`}>
          {subtitle}
        </h1>
        <p className={`mt-3 text-textSecondary ${direction === "center" ? "text-center" : "text-start"}`}>
          {text}
        </p>
      </div>
    </div>
  )
}

export default Title
