import { memo, useRef, useState, useMemo, useEffect } from 'react';
import { Card, Text, Button, Loading } from '@nextui-org/react';

import { useUploadImage } from '@/hooks/useImages';
import RenderIf from '@/components/RenderIf';

interface ContactCardProps {
	url: string;
	id: string;
}

const ContactCard = ({ url, id }: ContactCardProps) => {
	const fileInputRef = useRef<any>(null);
	const [newImageFile, setNewImageFile] = useState<File | null>(null);
	const [uploadImage, uploading] = useUploadImage();
	const imageUrl = useMemo(() => {
		if (newImageFile) {
			return URL.createObjectURL(newImageFile);
		}

		return url;
	}, [url, newImageFile]);

	useEffect(() => {
		if (!newImageFile) {
			return;
		}

		uploadImage({
			file: newImageFile,
			path: 'images',
			id
		})
	}, [newImageFile]);

	return (
		<>
			<input
				ref={fileInputRef}
				type='file'
				style={{ display: 'none' }}
				onChange={({ target }) => {
					const { files } = target;

					if (!files || files.length === 0) {
						setNewImageFile(null);
					}

					setNewImageFile(files![0]);
				}}
			/>
			<Card css={{ w: '100%', h: '500px' }}>
				<Card.Header
					css={{
						background: 'rgba(255, 255, 255, .4)',
						textAlign: 'center',
						justifyContent: 'center',
						position: 'absolute',
						zIndex: 1,
					}}
				>
					<Text size={16} b>Contacto</Text>
				</Card.Header>
				<Card.Body css={{ p: 0 }}>
					<Card.Image
						src={imageUrl}
						width='100%'
						height='100%'
						objectFit='cover'
						alt='Imagen de contacto'
					/>
				</Card.Body>
				<Card.Footer
					isBlurred
					css={{
						position: 'absolute',
						bgBlur: '#ffffff66',
						borderTop:
							'$borderWeights$light solid rgba(255, 255, 255, 0.2)',
						bottom: 0,
						zIndex: 1,
						justifyContent: 'center'
					}}
				>
					<Button
						flat
						auto
						rounded
						color='secondary'
						onClick={() => fileInputRef.current?.click()}
					>
						<Text
							css={{ color: 'inherit' }}
							size={12}
							weight='bold'
							transform='uppercase'
						>
							<RenderIf condition={uploading}>
								<Loading color='currentColor' size='sm' />
							</RenderIf>

							<RenderIf condition={!uploading}>
								Cambiar
							</RenderIf>
						</Text>
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default memo(ContactCard);
