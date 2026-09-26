import React from 'react'

function SpecificationsCart({keyWord,value}) {
  return (
              <div
            key={keyWord}
            className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3 dark:bg-[#0f172a]"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {keyWord}
            </span>

            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              {value}
            </span>
          </div>
  )
}

export default SpecificationsCart