import * as Icon from 'react-feather'
import { useState } from 'react'

const CategoryCollapse = ({children, title}) => {
    const [isOpen, setIsOpen] = useState(true) 

    const toggleCollapsible = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <div className='flex flex-col'>
            <button className='p-2 mx-4 flex flex-row hover:bg-gray-700 rounded ' style={{color: "#a3a3a3"}} onClick={toggleCollapsible}>
                <div className={`${isOpen ? 'rotate-180' : 'pt-0'} transition ease-in-out ml-0.5 mr-2.5`}>
                    <Icon.ChevronDown size={20} />
                </div>
                <div className='text-sm'>
                    {title}
                </div>
            </button>
            {isOpen&&
                <div className='flex flex-col space-y-1'>
                    {children}
                </div>
            }
        </div>
    )
}

export default CategoryCollapse
