import { createContext } from 'react';

const NavbarContext = createContext({} as { isOpen: boolean, toggle: () => void });

export default NavbarContext;
