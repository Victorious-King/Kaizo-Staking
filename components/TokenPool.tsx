import dayjs from 'dayjs'
import { prettyBalance, toHumanReadableNumbers, formatUnixTime } from 'utils/common'
import Button from './Common/Button'
import InputText from './Common/InputText'
import { useCallback, useEffect, useState } from 'react'
import near, { CONTRACT, getAmount } from 'services/near'
import axios from 'axios'
import { GAS_FEE } from 'constants/gasFee'
import { useNearProvider } from 'hooks/useNearProvider'
import { IFarm, IPool, IReward } from 'interfaces'
import PoolLoader from './Common/PoolLoader'
import JSBI from 'jsbi'
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import { FunctionCallOptions } from 'near-api-js/lib/account'
import ReactTooltip from 'react-tooltip'
import IconInfo from './Icon/IconInfo'
import BN from 'bn.js'


interface IPoolProcessed {
	title: string
	totalAmount: number
	currentAmount: number
	price: number
	claimableRewards: number
	media: string
	startTime: number
	endTime: number
}

interface PoolProps {
	type: string
	data: IPool
	staked?: string
	stakedNFT: string[]
}

type TShowModal = 'stakeNFT' | 'unstakeNFT' | null

const TokenPool = ({ data, staked, stakedNFT, type }: PoolProps) => {
	const { accountId, setCommonModal } = useNearProvider()
	const [poolProcessed, setPoolProcessed] = useState<IPoolProcessed | null>(null)
	const [showModal, setShowModal] = useState<TShowModal>(null)
	const [purchaseCnt, setPurchaseCnt] = useState(0);

	const getFarms = useCallback(async () => {


		console.log('accountId',accountId)
		
		const totalStakedData = await near.nearViewFunction({
			contractName: CONTRACT.PRESALE,
			methodName: `get_status`,
			args: {
				
			},
		})


		const unclaimedReward = await near.nearViewFunction({
			contractName: CONTRACT.PRESALE,
			methodName: `get_amount_by_owner`,
			args: {
				account_id: accountId,
			},
		})


		const tokenPrice = await near.nearViewFunction({
			contractName: CONTRACT.PRESALE,
			methodName: `get_token_price`,
			args: {

			},
		})

		const lockedPeriod = await near.nearViewFunction({
			contractName: CONTRACT.PRESALE,
			methodName: `get_locked_period`,
			args: {

			},
		})

		const token_reward_amount = 3;

		const poolData: IPoolProcessed = {
			title: "$Dojo Private Sale",
			media: "https://ipfs.fleek.co/ipfs/bafkreibp4kzksqsasgfrku4xabbig5fhqyaszktaql2knlfia3mus5mjcy",
			totalAmount: totalStakedData[1],
			currentAmount: totalStakedData[0],
			price: tokenPrice,
			claimableRewards: unclaimedReward,
			startTime: lockedPeriod[0],
			endTime: lockedPeriod[1],
		}

		setPoolProcessed(poolData)

		
	}, [data.title, accountId])

	const buyNow = async () => {
		if (!accountId) return

		const txs: {
			receiverId: string
			functionCalls: FunctionCallOptions[]
		}[] = []

		
		let deposited = poolProcessed ? new BN(poolProcessed.price.toLocaleString('fullwide', {useGrouping:false})) : new BN('0');
		deposited = deposited.mul(new BN(purchaseCnt.toString()))

		txs.push({
			receiverId: CONTRACT.PRESALE,
			functionCalls: [
				{
					methodName: 'buy',
					contractId: CONTRACT.PRESALE,
					args: {
						account_id: accountId,
						token_amount: purchaseCnt,
					},
					attachedDeposit: deposited,
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
			receiverId: CONTRACT.PRESALE,
			functionCalls: [
				{
					methodName: 'claim',
					contractId: CONTRACT.PRESALE,
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

	const updateAmount = (e: React.FormEvent<HTMLInputElement>) => {
		const newValue = (e.currentTarget as HTMLInputElement).value;

		setPurchaseCnt(parseInt(newValue,10));
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
						<p className="text-3xl font-bold text-center">{poolProcessed.title}</p>
						<div className="flex justify-between mt-4">
							<div>
								<p className="opacity-75">Total Amount - $Dojo</p>
								<p className="text-4xl font-semibold">
									{toHumanReadableNumbers(`${poolProcessed.totalAmount}`)}
								</p>
							</div>
							<div className="text-right">
								<p className="opacity-75">Total Sold - $Dojo</p>
								<p className="text-4xl font-semibold">
									{toHumanReadableNumbers(`${poolProcessed.currentAmount}`)}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="px-4 pb-4">
					<div>
						<div className="mt-4">
							<div className="flex justify-between">
								<div>
									<p className="opacity-75">Sale Start Date</p>
								</div>
								<div className="flex flex-col items-end">
									<p>{formatUnixTime(poolProcessed.startTime)}</p>
								</div>
							</div>
							<div className="flex justify-between mt-1">
								<div>
									<p className="opacity-75">Sale End Date</p>
								</div>
								<div className="text-right">
									<p>{formatUnixTime(poolProcessed.endTime)}</p>
								</div>
							</div>
						</div>
						<div className="mt-4">
							<div className="flex justify-between">
								<div>
									<p className="opacity-75">Token price</p>
								</div>
								<div className="flex flex-col items-end">
									<p>{poolProcessed.price / 1e24} Ⓝ / $Dojo</p>
								</div>
							</div>							
						</div>
						<div className="mt-4">
							
								<div className="flex justify-center -mx-4">
									<div className="flex justify-between w-2/3 px-4">
										<div>
											<p className="opacity-75"> Input the amount to purchase: </p>
										</div>
										<div className="w-3/4">
											<InputText
												type="number"
												min="0"
												onChange={updateAmount}
												value={purchaseCnt}
											/>
										</div>
									</div>
									<div className="w-1/3 px-4">
										<Button
											isDisabled={
												purchaseCnt<=0 || 
												Math.round(new Date().getTime()/1000) <= poolProcessed.startTime
											}
											isFullWidth
											className=""
											onClick={buyNow}
										>
											Purchase
										</Button>
									</div>
								</div>
							
						</div>
					</div>
					{accountId && (
						<div className="mt-4">
							Token Claim is available once then the private sale is finished.
							<div className="flex justify-between items-center p-2 bg-black bg-opacity-60 rounded-md overflow-hidden">
								<div className="w-2/3">
									<p className="opacity-75">Claimable Tokens</p>
									<p>{poolProcessed.claimableRewards} $Dojo</p>
								</div>
								<div className="w-1/3">
									<Button
										isDisabled={
											Number(poolProcessed.claimableRewards) <= 0 ||
											Math.round(new Date().getTime()/1000) <= poolProcessed.endTime
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

export default TokenPool
