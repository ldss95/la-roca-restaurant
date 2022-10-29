import { useContext } from 'react';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Grid, Table } from '@nextui-org/react';

import NavbarContext from '@/context/navbar/context';
import { useFetchUsers } from '@/hooks/useUsers';
import { ModalOpener$ } from '@/utils/helpers';
import { redColor50 } from '@/contants/colors';
import ModalUser from './components/ModalUser';
import { resetPassword } from '@/services/users';

function UsersView () {
	const { toggle: toggleNavBar } = useContext(NavbarContext);
	const [users] = useFetchUsers();

	return (
		<>
			<Grid.Container justify='space-between' alignItems='center'>
				<button
					style={{
						background: 'none',
						border: 'none',
						fontSize: 24,
						paddingLeft: 0,
						cursor: 'pointer'
					}}
					onClick={toggleNavBar}
				>
					<MenuOutlined />
				</button>

				<h3 style={{ margin: 0 }}>Usuarios</h3>
			</Grid.Container>
			<br />

			<Grid.Container>
				<Grid xs={12} sm={4} md={2}>
					<Button
						icon={<PlusOutlined />}
						onClick={() => ModalOpener$.next({ name: 'USER' })}
						css={{ width: '100%', background: redColor50, color: '#000' }}
					>
						Nuevo Usuario
					</Button>
				</Grid>
			</Grid.Container>
			<br />

			<Table
				css={{ background: '#fff' }}
			>
				<Table.Header>
					<Table.Column>Nombre</Table.Column>
					<Table.Column>Email</Table.Column>
					<Table.Column align='center'>Opciones</Table.Column>
				</Table.Header>
				<Table.Body>
					{users.map(({ name, email, uid }) => (
						<Table.Row key={uid}>
							<Table.Cell>{name}</Table.Cell>
							<Table.Cell>{email}</Table.Cell>
							<Table.Cell>
								<Button
									onClick={() => resetPassword(email)}
									flat
								>
									Restablecer contraseña
								</Button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>

			<ModalUser />
		</>
	)
}

export default UsersView;
