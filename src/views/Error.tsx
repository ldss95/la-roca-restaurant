
import { Button } from 'antd';
import { AlertOutlined } from '@ant-design/icons'

const ErrorView = () => {
	return (
		<div className='error'>
			<div className='error-content'>
				<div className='icon'>
					<AlertOutlined style={{ fontSize: 80 }} />
				</div>

				<h1>Oops!</h1>
				<h2>Ha ocurrido un error inesperado, por favor intentalo mas tarde.</h2>
				<p>Trabajamos tan rapido como es posible para solucionar esta situacion, disculpa los inconvenientes.</p>
				<br />

				<Button type='primary'>
					<a href='/dashboard'>Volver al inicio</a>
				</Button>
			</div>
		</div>
	);
}

export default ErrorView;
