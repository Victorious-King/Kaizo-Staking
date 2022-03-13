import Header from 'components/Common/Header'
import { useNearProvider } from 'hooks/useNearProvider'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import near, { CONTRACT } from 'services/near'
import { IPool } from 'interfaces'
import Head from 'components/Common/Head'
import MainPool from 'components/MainPool'
import Loader from 'components/Common/Loader'

interface IUserStaked {
	[key: string]: string
}

interface IUserStakedNFT {
	tokens: string[]
}

const Home: NextPage = () => {
	const { isInit, accountId } = useNearProvider()
	const [poolInfo, setPoolInfo] = useState<IPool>({title:'Kaizo Fighters', media:'123'})
	const [userStakedNFT, setUserStakedNFT] = useState<string[]>([])

	useEffect(() => {
		const getPoolInfo = async () => {
			const poolinfo: IPool = {title:'Kaizo Fighters', media:'123'}

			setPoolInfo(poolinfo)
		}

		if (isInit) {
			getPoolInfo()
		}
	}, [isInit])

	useEffect(() => {

		const getUserStakedNFTData = async () => {
		    
		    const userStakedNFTData = await near.nearViewFunction({
				contractName: CONTRACT.FARM,
				methodName: `get_amount_by_owner`,
				args: {
					account_id: accountId,
				},
			})

			setUserStakedNFT(userStakedNFTData)
		}

		if (accountId) {
			getUserStakedNFTData()
		}
	}, [accountId])

	if (!poolInfo) {
		return (
			<div>
				<Loader isLoading={true} />
			</div>
		)
	}

	return (
		<>
			<Head />
			<div className="bg-gray-900 min-h-screen pb-16 lg:pb-0">
				<Header />
				<div className="mt-4 max-w-6xl mx-auto" style={{ backgroundImage: `url(./Dojo_background.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
					<div className="md:max-w-md mx-auto p-4">
						<MainPool type="nft" data={poolInfo} stakedNFT={userStakedNFT} />
						<p className="text-white text-center text-sm mt-3">
							<span className="opacity-80">Buy Kaizo NFTs on </span>
							<a
								className="font-bold text-white opacity-100 border-b-2 border-transparent hover:border-gray-100"
								href="https://paras.id/collection/kaizofighters.tenk.near"
								target="_blank"
							>
								Paras Marketplace
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
