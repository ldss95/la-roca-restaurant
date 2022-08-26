import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ConfigProvider } from 'antd';
import reportWebVitals from './reportWebVitals';
import 'moment/dist/locale/es';
import es from 'antd/lib/locale/es_ES';

import Router from './router';
import 'antd/dist/antd.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './index.scss';
import UnexpectedError from './views/Error';

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	integrations: [new BrowserTracing()],
	tracesSampleRate: 1.0,
});

ReactDOM.render(
	<Sentry.ErrorBoundary fallback={<UnexpectedError />}>
		<BrowserRouter>
			<ConfigProvider locale={es}>
				<Router />
			</ConfigProvider>
		</BrowserRouter>
	</Sentry.ErrorBoundary>,
	document.getElementById('root')
);

reportWebVitals();
