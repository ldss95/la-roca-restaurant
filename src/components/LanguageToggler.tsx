import { memo, useContext } from 'react';
import { Button, Spacer } from '@nextui-org/react'

import FlagUsa from '@/assets/usa_flag.svg';
import FlagSpain from '@/assets/spain_flag.svg';
import RenderIf from './RenderIf';
import LanguageContext from '@/context/language/context';

const LanguageToggler = () => {
	const { lang, setLang } = useContext(LanguageContext);

	return (
		<Button
			onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
			css={{ background: '#fff', padding: 10 }}
			auto
		>
			<svg width='23' height='20' viewBox='0 0 23 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<path d='M0.596478 6.42415L3.73569 9.42067C3.93024 9.60791 4.16171 9.75653 4.41674 9.85795C4.67176 9.95937 4.9453 10.0116 5.22158 10.0116C5.49786 10.0116 5.7714 9.95937 6.02642 9.85795C6.28145 9.75653 6.51292 9.60791 6.70747 9.42067C7.02507 9.10245 7.22387 8.69313 7.27306 8.25613C7.32224 7.81912 7.21907 7.37883 6.97954 7.00348H14.6392C15.1943 7.00348 15.7266 6.793 16.119 6.41837C16.5115 6.04373 16.732 5.53561 16.732 5.00579C16.732 4.47597 16.5115 3.96785 16.119 3.59322C15.7266 3.21858 15.1943 3.00811 14.6392 3.00811H6.97954C7.21907 2.63275 7.32224 2.19246 7.27306 1.75546C7.22387 1.31845 7.02507 0.909134 6.70747 0.590911C6.51292 0.403672 6.28145 0.255055 6.02642 0.153636C5.7714 0.0522159 5.49786 0 5.22158 0C4.9453 0 4.67176 0.0522159 4.41674 0.153636C4.16171 0.255055 3.93024 0.403672 3.73569 0.590911L0.596478 3.58744C0.405948 3.77742 0.256595 4.00145 0.156989 4.24667C-0.0523296 4.73303 -0.0523296 5.27855 0.156989 5.76491C0.256595 6.01013 0.405948 6.23416 0.596478 6.42415ZM22.843 14.2351C22.7434 13.9899 22.594 13.7658 22.4035 13.5759L19.2643 10.5793C19.0698 10.3921 18.8383 10.2435 18.5833 10.1421C18.3282 10.0406 18.0547 9.98842 17.7784 9.98842C17.5021 9.98842 17.2286 10.0406 16.9736 10.1421C16.7185 10.2435 16.4871 10.3921 16.2925 10.5793C15.9749 10.8976 15.7761 11.3069 15.7269 11.7439C15.6778 12.1809 15.7809 12.6212 16.0205 12.9965H8.36079C7.80574 12.9965 7.27343 13.207 6.88095 13.5816C6.48847 13.9563 6.26798 14.4644 6.26798 14.9942C6.26798 15.524 6.48847 16.0321 6.88095 16.4068C7.27343 16.7814 7.80574 16.9919 8.36079 16.9919H16.0205C15.7809 17.3673 15.6778 17.8075 15.7269 18.2445C15.7761 18.6815 15.9749 19.0909 16.2925 19.4091C16.4871 19.5963 16.7185 19.7449 16.9736 19.8464C17.2286 19.9478 17.5021 20 17.7784 20C18.0547 20 18.3282 19.9478 18.5833 19.8464C18.8383 19.7449 19.0698 19.5963 19.2643 19.4091L22.4035 16.4126C22.594 16.2226 22.7434 15.9985 22.843 15.7533C23.0523 15.267 23.0523 14.7214 22.843 14.2351Z' fill='#EB2A00'/>
			</svg>

			<Spacer x={0.5} />

			<RenderIf condition={lang === 'es'}>
				<img src={FlagSpain} style={{ height: 15 }} />
			</RenderIf>

			<RenderIf condition={lang === 'en'}>
				<img src={FlagUsa} style={{ height: 15 }} />
			</RenderIf>
		</Button>
	)
}

export default memo(LanguageToggler);
