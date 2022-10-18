import { useState } from 'react';
import { Spacer } from '@nextui-org/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

import { db } from '../firebase';
import logo from '../assets/logo.png'
import { FacebookOutlined, InstagramOutlined, PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import RenderIf from '../components/RenderIf';

function LandingView () {
	const [products, isLoading] = useCollection(collection(db, 'products'));
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div>
			<div className='header'>
				<button className='open-nav-btn' onClick={() => setMenuOpen(!menuOpen)}>
					<span />
					<span />
					<span />
				</button>

				<div className='social-media'>
					<Spacer>
						<a href='https://wa.me/14015851070' target='_blank'>
							<WhatsAppOutlined style={{ fontSize: 26 }} />
						</a>

						<a href='https://www.instagram.com' target='_blank'>
							<InstagramOutlined style={{ fontSize: 26 }} />
						</a>

						<a href='https://www.facebook.com/profile.php?id=100069137480372' target='_blank'>
							<FacebookOutlined style={{ fontSize: 26 }} />
						</a>
					</Spacer>
				</div>
			</div>

			<RenderIf condition={menuOpen}>
				<div className={`menu ${menuOpen ? 'visible': ''}`}>
					<a href='#menu' onClick={() => setMenuOpen(false)}>
						<h2>Menú</h2>
					</a>
					<h2>Option 2</h2>
					<h2>Option 3</h2>
				</div>
			</RenderIf>

			<div
				style={{
					backgroundImage: 'url(https://www.celebritycruises.com/blog/content/uploads/2022/06/dominican-food-hero.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					opacity: 0.9,
					backgroundPosition: 'center',
					width: '100%',
					height: '100vh',
					top: 0,
					left: 0,
					zIndex: -100,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<img src={logo} style={{ width: 300 }} />
			</div>

			<div id='menu' style={{ marginBottom: 60 }} />
			<h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: 0 }}>Menú</h2>
			<h4 style={{ textAlign: 'center' }}>All your favorite food in the same place</h4>
			<br />

			{products?.docs.map((doc) => {
				const { id } = doc;
				const { name, description, price } = doc.data();

				return (
					<div
						key={id}
						style={{
							padding: 15,
							marginBottom: 10
						}}
					>
						<h2 style={{ margin: 0 }}>{name}</h2>
						<p style={{ margin: 0 }}>{description}</p>
						<h3 style={{ margin: 0 }}>$ {price}</h3>
					</div>
					)}
			)}

			<h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: 0 }}>Find us</h2>
			<br />

			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.216718019255!2d-71.42192338442824!3d41.780542879229984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e44fa2e64555cf%3A0x7f5f99467e76953b!2sLa%20Roca%20Restaurant!5e0!3m2!1sen!2sdo!4v1661997440024!5m2!1sen!2sdo"
				width="100%"
				height="450"
				style={{ border: 0, margin: 0 }}
				loading="lazy"
			></iframe>

			<footer>
				<p>1150 Elmwood Ave, Providence, RI 02907, United States</p>
			</footer>
		</div>
	)
}

export default LandingView;
