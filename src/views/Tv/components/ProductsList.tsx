import { Input } from '@nextui-org/react';

import { TvProductProps } from '@/types/tvProduct';
import { updateTvOption } from '@/services/tv';

const ProductsList = ({ products }: { products: TvProductProps[] }) => {
	return (
		<ul className='tv-list'>
			{products.map(({ name, id }) => (
					<li key={id}>
						<Input
							initialValue={name}
							animated={false}
							shadow={false}
							spellCheck={false}
							onChange={({ target }) => updateTvOption(id, target.value)}
						/>
					</li>
				))
			}
		</ul>
	)
}

export default ProductsList;
