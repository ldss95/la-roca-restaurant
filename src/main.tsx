import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { NextUIProvider } from '@nextui-org/react';
import reportWebVitals from './reportWebVitals';
import 'moment/dist/locale/es';

import Router from './router';
import 'sweetalert2/dist/sweetalert2.min.css';
import './main.scss';
import UnexpectedError from './views/Error';

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	integrations: [new BrowserTracing()],
	tracesSampleRate: 1.0,
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<Sentry.ErrorBoundary fallback={<UnexpectedError />}>
		<BrowserRouter>
			<NextUIProvider>
				<Router />
			</NextUIProvider>
		</BrowserRouter>
	</Sentry.ErrorBoundary>
);

reportWebVitals();
