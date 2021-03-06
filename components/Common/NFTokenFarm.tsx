import { INFToken } from 'interfaces/token'
import Button from './Button'
import Media from './Media'
import { CONTRACT } from 'services/near'

interface NFTokenFarmProps {
	token: INFToken
	stakeNFT: (tokenId: string) => void
	type: 'unstake' | 'stake'
	point: string
}

const NFTokenFarm = ({ token, stakeNFT, type, point }: NFTokenFarmProps) => {
	const tokenUrl = `https://paras.id/token/${CONTRACT.FARM}:${token.token_id}/${token.token_id}`
	const collectionUrl = `https://paras.id/collection/${CONTRACT.FARM}`

	return (
		<div className="flex justify-between mb-4 md:mb-0 p-3 border-2 border-borderGray rounded-xl h-[11rem] shadow-lg overflow-hidden">
			<div className="w-1/2 pr-4">
				<div className="w-full h-full">
					<Media
						url={"https://cloudflare-ipfs.com/ipfs/bafybeie3tapnsmwdzhrq6vzb6vpo623kxgominzaiyxh7igdrskk2drdj4/" + token.metadata.media}
						videoControls={false}
						videoMuted={true}
						videoLoop={true}
						className="w-full h-full object-contain"
					/>
				</div>
			</div>
			<div className="w-1/2 m-auto">
				<div className="overflow-ellipsis truncate">
					<a href={tokenUrl} target="_blank" rel="noreferrer">
						<p className="font-bold text-lg hover:opacity-80 inline">{token.metadata.title}</p>
					</a>
				</div>
				<Button
					className="px-6 mt-4"
					size="md"
					color={type === 'stake' ? 'blue' : 'blue-gray'}
					onClick={() => stakeNFT(token.token_id)}
				>
					{type === 'stake' ? 'Stake' : 'Unstake'}
				</Button>
			</div>
		</div>
	)
}

export default NFTokenFarm
