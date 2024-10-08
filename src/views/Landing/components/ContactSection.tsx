import { useContext } from 'react';
import { Grid, Image, Text, Spacer } from '@nextui-org/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import dictionary from '@/dictionary';
import doordashLogo from '@/assets/doordash_icon.webp';
import uberEatsLogo from '@/assets/uber-eats-icon.png';
import grubHubLogo from '@/assets/grubhub.png';
import LanguageContext from '@/context/language/context';
import WeekSchedule from './WeekSchedule';
import { CopyProps } from '@/types/copy';
import RenderIf from '@/components/RenderIf';
import { primaryColor, redColor, secondaryColor } from '@/constants/colors';
import { sizeCalc } from '@/utils/helpers';
import { useGetSchedule } from '@/hooks/useSchedule';

const ContactSection = ({ copy, imageUrl }: { copy: CopyProps, imageUrl: string }) => {
	const { lang } = useContext(LanguageContext);
	const [schedule] = useGetSchedule();

	return (
		<section id='contact' style={{ overflow: 'hidden' }}>
			<div style={{ padding: '0 30px' }}>
				<Text h2 css={{ fontSize: sizeCalc(15, 25), marginBottom: 40 }} showIn='xs'>{dictionary[lang].titles.contact_us}</Text>
			</div>

			<Grid.Container>
				<Grid xs={0} md={5} css={{ padding: `0 ${sizeCalc(10, 90)}px` }}>
					<LazyLoadImage
						src={imageUrl}
						height={sizeCalc(760, 760)}
						width='100%'
						style={{
							objectFit: 'cover',
							borderRadius: 10,
							width: '100%',
							backgroundPosition: 'center'
						}}
						effect='blur'
						placeholderSrc='/placeholder.webp'
					/>
				</Grid>

				<Grid xs={3} md={0}>
					<LazyLoadImage
						src={imageUrl}
						height={sizeCalc(760, 760)}
						width='100%'
						style={{
							objectFit: 'cover',
							borderRadius: 10,
							borderBottomLeftRadius: 0,
							borderTopLeftRadius: 0,
							backgroundPosition: '75% center'
						}}
						effect='blur'
						placeholderSrc='/placeholder.webp'
					/>
				</Grid>

				<Grid
					xs={9}
					md={7}
					direction='column'
					justify='center'
					css={{ padding: '0 30px' }}
				>
					<Text h2 css={{ fontSize: sizeCalc(15, 25) }} hideIn='sm'>{dictionary[lang].titles.contact_us}</Text>
					<br />

					<svg
						width={sizeCalc(30, 60)}
						height={sizeCalc(30, 60)}
						viewBox="0 0 60 60"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M40.5948 36.4431C40.316 36.1631 39.9844 35.9409 39.6189 35.7892C39.2535 35.6376 38.8615 35.5595 38.4656 35.5595C38.0697 35.5595 37.6778 35.6376 37.3123 35.7892C36.9469 35.9409 36.6152 36.1631 36.3364 36.4431C35.7779 37.0028 35.4644 37.7599 35.4644 38.5491C35.4644 39.3383 35.7779 40.0955 36.3364 40.6552L54.8695 59.1164C55.1483 59.3964 55.48 59.6186 55.8454 59.7703C56.2109 59.9219 56.6028 60 56.9987 60C57.3946 60 57.7866 59.9219 58.152 59.7703C58.5175 59.6186 58.8492 59.3964 59.1279 59.1164C59.6865 58.5567 60 57.7995 60 57.0104C60 56.2212 59.6865 55.464 59.1279 54.9043L40.5948 36.4431ZM44.2835 29.0049C46.6687 29.0028 48.9555 28.0572 50.6411 26.3761L59.1279 17.9222C59.6865 17.3625 60 16.6053 60 15.8161C60 15.027 59.6865 14.2698 59.1279 13.7101C58.8492 13.4301 58.5175 13.2079 58.152 13.0562C57.7866 12.9046 57.3946 12.8265 56.9987 12.8265C56.6028 12.8265 56.2109 12.9046 55.8454 13.0562C55.48 13.2079 55.1483 13.4301 54.8695 13.7101L46.3827 22.1641C45.8208 22.7204 45.0607 23.0327 44.2685 23.0327C43.4762 23.0327 42.7161 22.7204 42.1542 22.1641L52.7703 11.5892C53.3289 11.0295 53.6424 10.2724 53.6424 9.48316C53.6424 8.69398 53.3289 7.93685 52.7703 7.37715C52.4915 7.09716 52.1598 6.87493 51.7944 6.72327C51.429 6.57161 51.037 6.49353 50.6411 6.49353C50.2452 6.49353 49.8532 6.57161 49.4878 6.72327C49.1224 6.87493 48.7907 7.09716 48.5119 7.37715L37.9258 17.9222C37.3673 17.3625 37.0538 16.6053 37.0538 15.8161C37.0538 15.027 37.3673 14.2698 37.9258 13.7101L46.3827 5.2562C46.6966 4.9884 46.9516 4.65886 47.1316 4.28824C47.3116 3.91763 47.4127 3.51395 47.4287 3.10255C47.4446 2.69115 47.375 2.2809 47.2243 1.89757C47.0735 1.51423 46.8448 1.16607 46.5526 0.874946C46.2603 0.583824 45.9108 0.356023 45.526 0.20584C45.1411 0.055657 44.7293 -0.0136646 44.3163 0.00222605C43.9033 0.0181167 43.498 0.118877 43.126 0.298182C42.7539 0.477486 42.4231 0.731464 42.1542 1.04418L33.6674 9.4981C31.9826 11.1784 31.0363 13.4562 31.0363 15.8311C31.0363 18.206 31.9826 20.4837 33.6674 22.1641L30.0088 25.8682L25.3305 21.2679C26.6583 18.8809 27.1603 16.125 26.7593 13.4255C26.3582 10.726 25.0762 8.23313 23.1113 6.33161C18.7929 2.02997 7.60708 -2.77951 2.32904 2.56767C-2.949 7.91486 1.81923 18.9378 6.01767 23.2693C8.36229 25.6132 11.5146 26.9803 14.8344 27.093H15.2542C17.2818 27.0643 19.2667 26.5082 21.0121 25.4799L25.7204 30.0803L0.889574 54.8147C0.611931 55.0933 0.392081 55.4235 0.242576 55.7867C0.0930699 56.1499 0.0168368 56.5388 0.0182291 56.9313C0.0196215 57.3238 0.0986116 57.7122 0.25069 58.0743C0.402768 58.4364 0.624957 58.7651 0.904568 59.0417C1.18418 59.3183 1.51574 59.5373 1.88032 59.6862C2.24489 59.8351 2.63535 59.911 3.02939 59.9097C3.42342 59.9083 3.81333 59.8296 4.17684 59.6781C4.54035 59.5266 4.87035 59.3053 5.14799 59.0268L32.138 32.1415L37.8958 26.406C38.7365 27.2365 39.7334 27.8937 40.8296 28.3396C41.9257 28.7856 43.0994 29.0117 44.2835 29.0049ZM19.3027 19.4457C18.7409 20.002 18.0704 20.4375 17.3328 20.7253C16.5951 21.013 15.806 21.1469 15.0143 21.1185C13.2612 21.0433 11.6057 20.2937 10.396 19.0274C7.15725 15.8012 4.87809 8.48243 6.58746 6.7797C7.15522 6.35307 7.85672 6.14132 8.56672 6.18225C12.3942 6.48613 16.017 8.02823 18.8829 10.5735C20.1073 11.7019 20.8374 13.2643 20.916 14.924C20.9945 16.5836 20.4151 18.2076 19.3027 19.4457Z" fill={redColor} />
					</svg>
					<br />

					<Text className='heading'>
						<span style={{ fontSize: sizeCalc(25, 45) }}>{copy[lang].contact_us.title[0]}</span>
						<RenderIf condition={window.innerWidth < 700}>
							<br />
						</RenderIf>
						<RenderIf condition={window.innerWidth >= 700}>
							<span></span>
						</RenderIf>
						<span style={{ fontSize: sizeCalc(25, 45) }}>{copy[lang].contact_us.title[1]}</span>
					</Text>
					<br />
					<br />

					<Grid.Container>
						<Grid
							xs={12}
							md={6}
							direction='column'
							alignItems='flex-start'
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<svg
									width={sizeCalc(26, 34)}
									height={sizeCalc(32, 42)}
									viewBox="0 0 34 42"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M17 18.4594C17.8406 18.4594 18.6623 18.2129 19.3612 17.751C20.0601 17.2891 20.6048 16.6325 20.9265 15.8644C21.2482 15.0963 21.3323 14.2511 21.1683 13.4356C21.0044 12.6202 20.5996 11.8712 20.0052 11.2833C19.4108 10.6954 18.6536 10.295 17.8291 10.1328C17.0047 9.97063 16.1502 10.0539 15.3736 10.372C14.597 10.6902 13.9333 11.229 13.4663 11.9203C12.9993 12.6116 12.75 13.4243 12.75 14.2557C12.75 15.3706 13.1978 16.4398 13.9948 17.2282C14.7918 18.0165 15.8728 18.4594 17 18.4594ZM15.4913 32.9831C15.6888 33.1801 15.9238 33.3365 16.1828 33.4432C16.4417 33.5499 16.7195 33.6048 17 33.6048C17.2805 33.6048 17.5583 33.5499 17.8172 33.4432C18.0762 33.3365 18.3112 33.1801 18.5088 32.9831L27.2 24.3656C29.2186 22.37 30.5936 19.8271 31.151 17.0585C31.7083 14.2899 31.423 11.42 30.3311 8.81174C29.2393 6.20354 27.3899 3.9742 25.017 2.4057C22.644 0.837196 19.8541 0 17 0C14.1459 0 11.356 0.837196 8.98303 2.4057C6.61007 3.9742 4.76071 6.20354 3.66885 8.81174C2.577 11.42 2.2917 14.2899 2.84905 17.0585C3.40639 19.8271 4.78135 22.37 6.8 24.3656L15.4913 32.9831ZM6.86375 13.2889C7.00894 11.7903 7.49066 10.3427 8.27374 9.05183C9.05682 7.76092 10.1215 6.65929 11.39 5.82737C13.0564 4.74513 15.0065 4.16851 17 4.16851C18.9935 4.16851 20.9436 4.74513 22.61 5.82737C23.87 6.65644 24.9287 7.75139 25.7098 9.03348C26.4909 10.3156 26.9751 11.7529 27.1275 13.2422C27.2799 14.7315 27.0967 16.2356 26.5912 17.6465C26.0856 19.0574 25.2703 20.34 24.2038 21.402L17 28.5272L9.79625 21.402C8.72848 20.3503 7.91122 19.0764 7.40394 17.6729C6.89665 16.2695 6.71211 14.7718 6.86375 13.2889ZM31.875 37.7963H2.125C1.56141 37.7963 1.02091 38.0178 0.622398 38.4119C0.223884 38.8061 0 39.3407 0 39.8982C0 40.4556 0.223884 40.9902 0.622398 41.3844C1.02091 41.7786 1.56141 42 2.125 42H31.875C32.4386 42 32.9791 41.7786 33.3776 41.3844C33.7761 40.9902 34 40.4556 34 39.8982C34 39.3407 33.7761 38.8061 33.3776 38.4119C32.9791 38.0178 32.4386 37.7963 31.875 37.7963Z" fill={redColor} />
								</svg>

								<Spacer />

								<a
									style={styles.addressAndPhone}
									href='https://www.google.com.do/maps/place/La+Roca+Restaurant/@41.7805429,-71.4197347,15z/data=!4m5!3m4!1s0x0:0x7f5f99467e76953b!8m2!3d41.7805429!4d-71.4197347'
									target='_blank'
								>
									{copy[lang].contact_us.address}
								</a>
							</div>
							<br />

							<div style={{ display: 'flex', alignItems: 'center' }}>
								<svg
									width={sizeCalc(28, 37)}
									height={sizeCalc(28, 37)}
									viewBox="0 0 37 37"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M32.414 20.4089C32.0055 20.4089 31.5785 20.2786 31.17 20.1855C30.3428 20.0027 29.53 19.76 28.7378 19.4593C27.8764 19.145 26.9297 19.1613 26.0796 19.5051C25.2296 19.8488 24.5363 20.4958 24.1332 21.3213L23.7248 22.1593C21.9164 21.1504 20.2546 19.8973 18.7861 18.4351C17.3281 16.9622 16.0787 15.2957 15.0727 13.482L15.8525 12.9606C16.6757 12.5564 17.3207 11.8611 17.6635 11.0086C18.0063 10.1561 18.0225 9.20652 17.7092 8.34268C17.4144 7.5465 17.1725 6.73161 16.9851 5.90336C16.8923 5.49371 16.818 5.06543 16.7623 4.63715C16.5368 3.32555 15.8518 2.13777 14.8307 1.28773C13.8095 0.437688 12.5192 -0.0187582 11.1923 0.000590841H5.62229C4.82213 -0.00694411 4.02974 0.15852 3.29907 0.485718C2.56839 0.812916 1.91659 1.29417 1.38804 1.89671C0.859484 2.49925 0.466583 3.20893 0.236085 3.97745C0.00558614 4.74596 -0.0570989 5.55527 0.0522971 6.35026C1.04141 14.1512 4.59375 21.3993 10.1482 26.9497C15.7026 32.5001 22.9426 36.0364 30.7244 37H31.4299C32.7991 37.002 34.121 36.4982 35.1433 35.5848C35.7307 35.0579 36.1999 34.412 36.5199 33.6898C36.84 32.9676 37.0036 32.1855 36.9999 31.3952V25.8089C36.9772 24.5155 36.5076 23.2701 35.6712 22.2853C34.8348 21.3004 33.6836 20.6373 32.414 20.4089ZM33.3423 31.5814C33.342 31.8457 33.2855 32.107 33.1767 32.3478C33.0678 32.5886 32.9091 32.8034 32.711 32.9779C32.5036 33.1576 32.261 33.2918 31.9988 33.3719C31.7367 33.4521 31.4607 33.4764 31.1886 33.4434C24.2352 32.5493 17.7765 29.3589 12.8312 24.3757C7.88593 19.3924 4.73557 12.8998 3.87703 5.92198C3.84748 5.64922 3.87338 5.37329 3.95316 5.11085C4.03293 4.84841 4.16494 4.60492 4.34119 4.39508C4.51518 4.19646 4.72935 4.03727 4.96945 3.92811C5.20955 3.81895 5.47008 3.76231 5.73369 3.76198H11.3037C11.7355 3.75234 12.1571 3.89396 12.4959 4.16246C12.8348 4.43095 13.0698 4.80953 13.1604 5.23302C13.2346 5.74198 13.3275 6.24474 13.4389 6.7413C13.6533 7.72288 13.9388 8.6875 14.2929 9.62751L11.6936 10.8379C11.4713 10.9401 11.2714 11.0854 11.1053 11.2654C10.9392 11.4454 10.8102 11.6565 10.7257 11.8866C10.6411 12.1167 10.6027 12.3613 10.6127 12.6063C10.6227 12.8513 10.6809 13.092 10.7838 13.3144C13.4559 19.0547 18.0568 23.669 23.7805 26.3489C24.2325 26.5352 24.7395 26.5352 25.1915 26.3489C25.4231 26.2659 25.6359 26.1375 25.8176 25.9713C25.9992 25.8051 26.1462 25.6043 26.2498 25.3807L27.401 22.7738C28.3608 23.118 29.3404 23.404 30.3345 23.6303C30.8296 23.742 31.3309 23.8351 31.8384 23.9096C32.2607 24.0005 32.6381 24.2361 32.9059 24.576C33.1736 24.9158 33.3148 25.3387 33.3052 25.7717L33.3423 31.5814Z" fill={redColor} />
								</svg>

								<Spacer />

								<a
									style={styles.addressAndPhone}
									href={`tel:${copy[lang].contact_us.phone.replace(/[^0-9]/g, '')}`}
								>
									{copy[lang].contact_us.phone}
								</a>
							</div>
						</Grid>

						<RenderIf condition={window.innerWidth < 700}>
							<Spacer y={2} />
						</RenderIf>

						<Grid
							xs={12}
							md={6}
						>
							<svg
								width={sizeCalc(28, 42)}
								height={sizeCalc(28, 42)}
								viewBox="0 0 42 42"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M20.9895 0C9.387 0 0 9.3975 0 21C0 32.6025 9.387 42 20.9895 42C32.592 42 42 32.6025 42 21C42 9.3975 32.592 0 20.9895 0ZM21 37.8C11.718 37.8 4.2 30.282 4.2 21C4.2 11.718 11.718 4.2 21 4.2C30.282 4.2 37.8 11.718 37.8 21C37.8 30.282 30.282 37.8 21 37.8Z" fill={redColor} />
								<path d="M22.05 10.5H18.9V23.1L29.9145 29.715L31.5 27.132L22.05 21.525V10.5Z" fill={redColor} />
							</svg>

							<Spacer />

							<div style={{ width: '100%', maxWidth: 300 }}>
								<WeekSchedule
									openDays={schedule?.top?.days || []}
									openAt={schedule?.top?.openAt || ''}
									closeAt={schedule?.top?.closeAt || ''}
								/>

								<div style={styles.scheduleDivider} />

								<WeekSchedule
									openDays={schedule?.bottom?.days || []}
									openAt={schedule?.bottom?.openAt || ''}
									closeAt={schedule?.bottom?.closeAt || ''}
								/>
							</div>
						</Grid>
					</Grid.Container>

					<div style={{ maxWidth: 250, marginTop: 30 }}>
						<Text css={styles.deliveryBy}>DELIVERY BY</Text>
						<Grid.Container gap={1}>
							{deliveryApps.map(({ image, orderUrl }, index) => (
								<Grid xs={4} key={'delivery-app-' + index}>
									<a href={orderUrl} target='_blank' style={{ textDecoration: 'none' }}>
										<Image
											src={image}
											containerCss={{ margin: 0, borderRadius: 15 }}
											autoResize
										/>
									</a>
								</Grid>
							))}
						</Grid.Container>
					</div>
				</Grid>
			</Grid.Container>
		</section>
	)
}

const styles = {
	orderButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'bold',
		background: redColor,
		borderRadius: 5,
		height: sizeCalc(57, 80),
		fontSize: sizeCalc(20, 30),
		color: '#fff'
	},
	scheduleDivider: {
		width: 110,
		height: 5,
		background: primaryColor,
		margin: '30px 0'
	},
	deliveryBy: {
		fontSize: sizeCalc(11, 20),
		fontFamily: 'Manrope',
		letterSpacing: 8,
		color: secondaryColor
	},
	addressAndPhone: {
		fontSize: sizeCalc(19, 30),
		color: secondaryColor,
		fontFamily: 'Bitter',
		fontWeight: 400
	}
}

const deliveryApps = [
	{
		image: doordashLogo,
		orderUrl: 'https://www.doordash.com/store/277939?utm_source=mx_share_android'
	},
	{
		image: uberEatsLogo,
		orderUrl: 'https://www.order.store/store/la-roca-restaurant/PJY-7Fn9VrmN8HjLZoYHeQ'
	},
	{
		image: grubHubLogo,
		orderUrl: 'https://larocarestaurant.dine.online'
	}
];

export default ContactSection;
