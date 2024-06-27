import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import 'dayjs/locale/es-do';

import Router from './router';
import 'sweetalert2/dist/sweetalert2.min.css';
import './main.scss';
import LanguageState from './context/language/state';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<BrowserRouter>
		<NextUIProvider>
			<LanguageState>
				<Router />
			</LanguageState>
		</NextUIProvider>
	</BrowserRouter>
);
