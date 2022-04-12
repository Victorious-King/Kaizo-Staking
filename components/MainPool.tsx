import dayjs from 'dayjs'
import { prettyBalance, toHumanReadableNumbers } from 'utils/common'
import Button from './Common/Button'
import { useCallback, useEffect, useState } from 'react'
import near, { CONTRACT, getAmount } from 'services/near'
import axios from 'axios'
import { GAS_FEE } from 'constants/gasFee'
import { useNearProvider } from 'hooks/useNearProvider'
import { IFarm, IPool, IReward } from 'interfaces'
import PoolLoader from './Common/PoolLoader'
import JSBI from 'jsbi'
import StakeNFTModal from './Modal/StakeNFTModal'
import UnstakeNFTModal from './Modal/UnstakeNFTModal'
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import { FunctionCallOptions } from 'near-api-js/lib/account'
import ReactTooltip from 'react-tooltip'
import IconInfo from './Icon/IconInfo'

interface IPoolProcessed {
	title: string
	totalStaked: number
	rewards: number
	claimableRewards: number
	media: string
	nftPoints:  string[]
}

interface PoolProps {
	type: string
	data: IPool
	staked?: string
	stakedNFT: string[]
}

interface storageData {
	total: string
	available: string
}

type TShowModal = 'stakeNFT' | 'unstakeNFT' | null

const MainPool = ({ data, staked, stakedNFT, type }: PoolProps) => {
	const { accountId, setCommonModal } = useNearProvider()
	const [poolProcessed, setPoolProcessed] = useState<IPoolProcessed | null>(null)
	const [showModal, setShowModal] = useState<TShowModal>(null)
	const [userStaked, setUserStaked] = useState<string | null>(null)
	const [storageReg, setStorageReg] = useState(false)

	const getFarms = useCallback(async () => {
		const totalStakedData = await near.nearViewFunction({
			contractName: CONTRACT.FARM,
			methodName: `get_status`,
			args: {
				
			},
		})
		const token_reward_amount = 3;
		try{
			const storageStatus: storageData = await near.nearViewFunction({
				contractName: CONTRACT.TOKEN,
				methodName: `storage_balance_of`,
				args: {
					account_id: accountId
				},
			})

			if(storageStatus) setStorageReg(true);
		

		

		//setStakedNFTCnt

		const unclaimedReward = await near.nearViewFunction({
			contractName: CONTRACT.FARM,
			methodName: `get_reward`,
			args: {
				from: accountId,
			},
		})
		
		const poolData: IPoolProcessed = {
			title: "Kaizo Fighers",
			media: "./BG image seq loop (30pfs)_00139.jpg",
			totalStaked: totalStakedData,
			rewards: token_reward_amount,
			claimableRewards: unclaimedReward,
			nftPoints: stakedNFT,
		}

		setPoolProcessed(poolData)
		} catch(e){
			setStorageReg(false);
			const poolData: IPoolProcessed = {
				title: "Kaizo Fighers",
				media: "./BG image seq loop (30pfs)_00139.jpg",
				totalStaked: totalStakedData,
				rewards: ,
				claimableRewards: 0,
				nftPoints: stakedNFT,
			}

			setPoolProcessed(poolData)
		}

		
	}, [data.title, accountId])

	const NFTPoolModal = () => {
		return (
			<>
				<StakeNFTModal
					nftPoints={poolProcessed && poolProcessed.nftPoints ? poolProcessed.nftPoints : []}
					claimableRewards={poolProcessed ? poolProcessed.claimableRewards : 0}
					title={data.title}
					show={showModal === 'stakeNFT'}
					onClose={() => setShowModal(null)}
				/>
				<UnstakeNFTModal
					nftPoints={poolProcessed && poolProcessed.nftPoints.length ? poolProcessed.nftPoints : []}
					claimableRewards={poolProcessed ? poolProcessed.claimableRewards : 0}
					title={data.title}
					show={showModal === 'unstakeNFT'}
					onClose={() => setShowModal(null)}
				/>
			</>
		)
	}

	const storageDeposit = async () => {
		if (!accountId) {
			alert('Login First');
			return;
		}

		const txs: {
			receiverId: string
			functionCalls: FunctionCallOptions[]
		}[] = []

		

		txs.push({
			receiverId: CONTRACT.TOKEN,
			functionCalls: [
				{
					methodName: 'storage_deposit',
					contractId: CONTRACT.FARM,
					args: {

					},
					attachedDeposit: getAmount("1250000000000000000000"),
					gas: getAmount(GAS_FEE[150]),
				},
			],
		})

		return await near.executeMultipleTransactions(txs)
	}

	const claimRewards = async () => {
		if (!accountId) return

		const txs: {
			receiverId: string
			functionCalls: FunctionCallOptions[]
		}[] = []

		

		txs.push({
			receiverId: CONTRACT.FARM,
			functionCalls: [
				{
					methodName: 'claim',
					contractId: CONTRACT.FARM,
					args: {

					},
					attachedDeposit: getAmount('1'),
					gas: getAmount(GAS_FEE[150]),
				},
			],
		})

		return await near.executeMultipleTransactions(txs)
	}

	const onClickActionButton = (type: TShowModal) => {
		if (!accountId) {
			setCommonModal('login')
			return
		}

		setShowModal(type)
	}

	useEffect(() => {
		if(accountId==null){ return }
			getFarms()
	}, [getFarms])

	if (!poolProcessed) {
		return <PoolLoader />
	}

	return (
		<div className="relative">
			<div className="bg-parasGrey text-white rounded-xl overflow-hidden shadow-xl">
				<ReactTooltip html={true} />
				{NFTPoolModal()}
				<div className="bg-center bg-no-repeat bg-black bg-opacity-40 p-4 relative">
					<div className="absolute inset-0 opacity-20">
						<div className="text-center h-full overflow-hidden">
							{poolProcessed.media && (
								<img
									className="w-full h-full"
									alt={poolProcessed.title}
									src={poolProcessed.media}
								/>
							)}
						</div>
					</div>
					<div className="relative">
						<p className="text-3xl font-bold text-center" style={{fontFamily:"SINGLE_FIGHTER"}}>{poolProcessed.title}</p>
						<div className="flex justify-between mt-4">
							<div>
								<p className="opacity-75">Total Staked</p>
								{type === 'nft' && (
									<p className="text-4xl font-semibold">
										{toHumanReadableNumbers(`${poolProcessed.totalStaked}`)} Kaizos
									</p>
								)}
							</div>
							<div className="text-right">
								
							</div>
						</div>
					</div>
				</div>

				<div className="px-4 pb-4">
					<div>
						<div className="mt-4">
							<div className="flex justify-between">
								
							</div>
						</div>
						<div className="mt-4">
							<div className="flex justify-between">
								<div>
									<p className="opacity-75">Reward per Week</p>
								</div>
								<div className="flex flex-col items-end">
									<p>{poolProcessed.rewards} $Dojo</p>
								</div>
							</div>
							{type === 'nft' && (
								<div className="flex justify-between mt-1">
									<div>
										<p className="opacity-75">Your Staked NFTs</p>
									</div>
									<div className="text-right">
										<p>{stakedNFT ? `${stakedNFT.length} Kaizos` : '-'} </p>
									</div>
								</div>
							)}
						</div>
						<div className="mt-4">
							{type === 'nft' && (
								<div className="flex justify-between -mx-4">
									<div className="w-1/2 px-4">
										<Button
											isFullWidth
											className=""
											onClick={() => onClickActionButton('stakeNFT')}
										>
											Stake NFT
										</Button>
									</div>
									<div className="w-1/2 px-4 text-right">
										<Button
											isFullWidth
											color="blue-gray"
											onClick={() => onClickActionButton('unstakeNFT')}
										>
											Unstake NFT
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>
					{!storageReg && (
						<div className="mt-4">
							<div className="flex justify-between items-center p-2 bg-black bg-opacity-60 rounded-md overflow-hidden">
								<div className="w-2/3">
									You need to be registered on Dojo Token.
								</div>
								<div className="w-1/3">
									<Button
										isFullWidth
										color="blue"
										onClick={storageDeposit}
									>
										storageDeposit
									</Button>
								</div>
							</div>
						</div>
					)}
					{accountId && (
						<div className="mt-4">
							<div className="flex justify-between items-center p-2 bg-black bg-opacity-60 rounded-md overflow-hidden">
								<div className="w-2/3">
									<p className="opacity-75">Claimable Rewards</p>
									<p>{poolProcessed.claimableRewards} Dojo</p>
								</div>
								<div className="w-1/3">
									<Button
										isDisabled={
											Number(poolProcessed.claimableRewards) <= 0 || !storageReg
										}
										isFullWidth
										color="green"
										onClick={claimRewards}
									>
										Claim
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default MainPool
