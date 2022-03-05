import axios from 'axios'
import Button from 'components/Common/Button'
import { LogoBounce } from 'components/Common/Loader'
import Modal from 'components/Common/Modal'
import NFTokenFarm from 'components/Common/NFTokenFarm'
import PoolReward from 'components/Common/PoolReward'
import IconBack from 'components/Icon/IconBack'
import IconInfo from 'components/Icon/IconInfo'
import { apiFarmingURL } from 'constants/apiURL'
import { GAS_FEE } from 'constants/gasFee'
import { useNearProvider } from 'hooks/useNearProvider'
import { ModalCommonProps } from 'interfaces/modal'
import { INFToken } from 'interfaces/token'
import { FunctionCallOptions } from 'near-api-js/lib/account'
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import { useEffect, useState } from 'react'
import near, { CONTRACT, getAmount } from 'services/near'
import { hasReward, prettyBalance } from 'utils/common'

interface StakeNFTModalProps extends ModalCommonProps {
	claimableRewards: number
	nftPoints: string[]
}

interface IResponseCheckNFT {
	data: { results: INFToken[] }
}

const StakeNFTModal = (props: StakeNFTModalProps) => {
	const [ownedNFT, setOwnedNFT] = useState<INFToken[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [showInfoPool, setShowInfoPool] = useState<boolean>(false)

	const { accountId } = useNearProvider()

	useEffect(() => {
		const fetchOwnedNFT = async () => {
			ownedNFT.length === 0 && setIsLoading(true)
			try {
				const totalTokens = await near.nearViewFunction({
						contractName: CONTRACT.WRAP,
						methodName: `nft_tokens_for_owner`,
						args: {
							account_id: accountId,
							limit: 50,
						},
					})
				setOwnedNFT(totalTokens)
			} catch (error) {
				console.log(error)
			}
			setIsLoading(false)
		}

		if (props.show && accountId) {
			fetchOwnedNFT()
		}
	}, [props.show, accountId, ownedNFT.length])

	const stakeNFT = async (tokenId: string) => {
		try {
			const txs: {
				receiverId: string
				functionCalls: FunctionCallOptions[]
			}[] = []

			txs.push({
				receiverId: CONTRACT.WRAP,
				functionCalls: [
					{
						methodName: 'nft_transfer_call',
						contractId: CONTRACT.WRAP,
						args: {
							receiver_id: CONTRACT.FARM,
							token_id: tokenId,
							msg: '',
						},
						attachedDeposit: getAmount('1'),
						gas: getAmount(GAS_FEE[150]),
					},
				],
			})

			return await near.executeMultipleTransactions(txs)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<Modal isShow={props.show} onClose={props.onClose}>
				<div className="max-w-sm md:max-w-2xl w-full bg-parasGrey p-4 rounded-lg m-auto shadow-xl">
					<div className="flex items-center mb-4">
						<div className="w-1/5">
							<div className="inline-block cursor-pointer" onClick={props.onClose}>
								<IconBack />
							</div>
						</div>
						<div className="w-3/5 flex-1 text-center">
							<p className="font-bold text-xl text-white">Stake NFT</p>
							<p className="text-white text-sm -mt-1">{props.title}</p>
						</div>
						<div className="w-1/5 text-right">
							
						</div>
					</div>

					{isLoading ? (
						<div className="mt-4 w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center">
							<LogoBounce width={20} className="mb-4 opacity-50" />
						</div>
					) : (
						<div className="mt-4 h-[50vh] md:h-[60vh] overflow-y-scroll no-scrollbar">
							{ownedNFT.length !== 0 ? (
								<div className="md:grid md:grid-cols-2 md:gap-4">
									{ownedNFT.map((nft) => (
										<NFTokenFarm
											key={nft.token_id}
											token={nft}
											stakeNFT={stakeNFT}
											type="stake"
											point={'123'}
										/>
									))}
								</div>
							) : (
								<div className="w-full h-full flex items-center justify-center px-4 text-center">
									<div>
										<p>{"You don't have any Kaizo NFT"}</p>
										<a
											className="font-bold text-white opacity-100 border-b-2 border-transparent hover:border-gray-100"
											href="https://paras.id/collection/kaizofighters.tenk.near"
											target="_blank"
										>
											Buy NFT on Paras Marketplace
										</a>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</Modal>
		</>
	)
}

export default StakeNFTModal
