import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
	BrowserRouter,
	useLocation,
	useNavigationType,
	createRoutesFromChildren,
	matchRoutes
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { NextUIProvider } from '@nextui-org/react';
import 'dayjs/locale/es-do';

import Router from './router';
import 'sweetalert2/dist/sweetalert2.min.css';
import './main.scss';
import UnexpectedError from './views/Error';
import LanguageState from './context/language/state';

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	integrations: [
		Sentry.reactRouterV6BrowserTracingIntegration({
			useEffect,
			useLocation,
			useNavigationType,
			createRoutesFromChildren,
			matchRoutes,
		}),
		Sentry.replayIntegration(),
	],
	tracesSampleRate: 1.0,
	environment: import.meta.env.DEV ? 'development' : 'production'
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<Sentry.ErrorBoundary fallback={<UnexpectedError />}>
		<BrowserRouter>
			<NextUIProvider>
				<LanguageState>
					<Router />
				</LanguageState>
			</NextUIProvider>
		</BrowserRouter>
	</Sentry.ErrorBoundary>
);
