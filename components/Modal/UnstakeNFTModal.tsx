import axios from 'axios'
import { LogoBounce } from 'components/Common/Loader'
import Modal from 'components/Common/Modal'
import NFTokenFarm from 'components/Common/NFTokenFarm'
import PoolReward from 'components/Common/PoolReward'
import IconBack from 'components/Icon/IconBack'
import { apiParasUrl } from 'constants/apiURL'
import { GAS_FEE } from 'constants/gasFee'
import { useNearProvider } from 'hooks/useNearProvider'
import { ModalCommonProps } from 'interfaces/modal'
import { INFToken } from 'interfaces/token'
import { FunctionCallOptions } from 'near-api-js/lib/account'
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import { useEffect, useState } from 'react'
import near, { CONTRACT, getAmount } from 'services/near'
import { hasReward, prettyBalance } from 'utils/common'

interface UnstakeNFTModalProps extends ModalCommonProps {
	nftPoints: string[]
	claimableRewards: number
}

interface stakedResponse {
	[key: string]: string[]
}

const UnstakeNFTModal = (props: UnstakeNFTModalProps) => {
	const [stakedNFT, setStakedNFT] = useState<INFToken[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { accountId } = useNearProvider()

	useEffect(() => {
		const getStakedNFT = async () => {
			stakedNFT.length === 0 && setIsLoading(true)
			if (accountId) {

				const userStakedNFTData = await near.nearViewFunction({
					contractName: CONTRACT.FARM,
					methodName: `get_amount_by_owner`,
					args: {
						account_id: accountId,
					},
				})


				const stakedTokens: INFToken[] = [];
				for (const tokenId of userStakedNFTData) {
					const tokenInfo: INFToken = await near.nearViewFunction({
						contractName: CONTRACT.WRAP,
						methodName: `nft_token`,
						args: {
							token_id: tokenId,
						},
					})


					stakedTokens.push(tokenInfo)

				}
				
				setStakedNFT(stakedTokens)
			}
			setIsLoading(false)
		}

		if (props.show) {
			getStakedNFT()
		}
	}, [accountId, props.show, stakedNFT.length])

	const unstakeNFT = async (tokenId: string) => {
		try {
			const txs: {
				receiverId: string
				functionCalls: FunctionCallOptions[]
			}[] = []			

			txs.push({
				receiverId: CONTRACT.FARM,
				functionCalls: [
					{
						methodName: 'unstake',
						contractId: CONTRACT.FARM,
						args: {
							token_id: tokenId,
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
		<Modal isShow={props.show} onClose={props.onClose}>
			<div className="max-w-sm md:max-w-2xl w-full bg-parasGrey p-4 rounded-lg m-auto shadow-xl">
				<div className="flex items-center mb-4">
					<div className="w-1/5">
						<div className="inline-block cursor-pointer" onClick={props.onClose}>
							<IconBack />
						</div>
					</div>
					<div className="w-3/5 flex-1 text-center">
						<p className="font-bold text-xl text-white">Unstake NFT</p>
						<p className="text-white text-sm -mt-1">{props.title}</p>
					</div>
					<div className="w-1/5" />
				</div>

				{isLoading ? (
					<div className="mt-4 w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center">
						<LogoBounce width={20} className="mb-4 opacity-50" />
					</div>
				) : (
					<div className="mt-4 h-[50vh] md:h-[60vh] overflow-y-scroll no-scrollbar">
						{stakedNFT.length !== 0 ? (
							<div className="md:grid md:grid-cols-2 md:gap-4">
								{stakedNFT.map((nft) => (
									<NFTokenFarm
										key={nft.token_id}
										token={nft}
										stakeNFT={unstakeNFT}
										type="unstake"
										point={'123'}
									/>
								))}
							</div>
						) : (
							<div className="w-full h-full flex items-center justify-center px-4 text-center">
								<p>{"You haven't staked any NFT"}</p>
							</div>
						)}
					</div>
				)}
			</div>
		</Modal>
	)
}

export default UnstakeNFTModal
