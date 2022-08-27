import { useReducer } from 'react';

import { TOGGLE_NAV } from '../types';
import Reducer from './reducer';
import NavbarContext from './context';

const isOpen = false;

const NavbarState = ({ children }: any) => {
	const [state, dispatch] = useReducer(Reducer, { isOpen });

	function toggle(){
		dispatch({ type: TOGGLE_NAV });
	}

	return (
		<NavbarContext.Provider
			value={{
				toggle,
				isOpen: state.isOpen
			}}
		>
			{children}
		</NavbarContext.Provider>
	);
}

export default NavbarState;
