import Header from 'components/Common/Header'
import { useNearProvider } from 'hooks/useNearProvider'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import near, { CONTRACT } from 'services/near'
import { IPool } from 'interfaces'
import Head from 'components/Common/Head'
import TokenPool from 'components/TokenPool'
import Loader from 'components/Common/Loader'

interface IUserStaked {
	[key: string]: string
}

interface IUserStakedNFT {
	tokens: string[]
}

const Home: NextPage = () => {
	const { isInit, accountId } = useNearProvider()
	const [poolInfo, setPoolInfo] = useState<IPool>({title:'PreSale', media:'123'})
	const [userStakedNFT, setUserStakedNFT] = useState<string[]>([])

	useEffect(() => {
		const getPoolInfo = async () => {
			const poolinfo: IPool = {title:'PreSale', media:'123'}

			setPoolInfo(poolinfo)
		}

		if (isInit) {
			getPoolInfo()
		}
	}, [isInit])


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
				<div className="mt-4 max-w-6xl mx-auto" style={{ backgroundImage: `url(./Dojo_background.png)` }}>
					<div className="md:max-w-md mx-auto p-4">
						<TokenPool type="nft" data={poolInfo} stakedNFT={userStakedNFT} />
						<p className="text-white text-center text-sm mt-3">
							
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
