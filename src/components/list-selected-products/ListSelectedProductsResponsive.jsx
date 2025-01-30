import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ButtonListSelect from "@/components/buttons/buttonListSelect"
import { productTitle } from "../../utils/constants"


const ListSelectedProductsResponsive = () => {
  const handleItemClick = (close, title) => {
    close();
  };

  return (
    <Menu as="div" className="relative dropdown">
      {({ open }) => (
        <>
          <div>
            <MenuButton className="inline-flex w-full justify-end gap-x-1.5 bg-[#f6f6f6] rounded-full pt-4 pb-4 pr-4 py-2 text-lg font-semibold text-gray-700 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
              Categorías
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-7 text-red-600" />
            </MenuButton>
          </div>
         
          {open && (
            <MenuItems static className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
              <ul className="p-6 text-slate-700">
                {productTitle.map((title, index) => (
                  <MenuItem key={`button_${index}`} as="div">
                    {({ close }) => (
                      <div 
                        className="mb-3"
                        onClick={(e) => {
                          e.preventDefault();
                          handleItemClick(close, title);
                        }}
                      >
                        <ButtonListSelect tipo={title} />
                      </div>
                    )}
                  </MenuItem>
                ))}
              </ul>
            </MenuItems>
          )}
       
        </>
      )}
    </Menu>
  )
}

export default ListSelectedProductsResponsive