import Loader from 'components/Common/Loader'
import LoginModal from 'components/Modal/LoginModal'
import React, { createContext, useContext, useEffect, useState } from 'react'
import near, { CONTRACT } from 'services/near'

interface INearContext {
	isInit: boolean
	accountId: string | null
	commonModal: TCommonModal
	setCommonModal: React.Dispatch<React.SetStateAction<TCommonModal>>
}

type TCommonModal = 'login' | null

const defaultValue: INearContext = {
	isInit: false,
	accountId: null,
	commonModal: null,
	setCommonModal: () => null,
}

export const NearContext = React.createContext<INearContext>(defaultValue)
export const useNearProvider = () => React.useContext(NearContext)

export const NearProvider = (props: { children: React.ReactNode }) => {
	const [isInit, setIsInit] = useState(false)
	const [accountId, setAccountId] = useState(null)
	const [commonModal, setCommonModal] = useState<TCommonModal>(null)

	useEffect(() => {
		near.init(() => {
			setIsInit(true)
			setAccountId(near.wallet.getAccountId())
		})
	}, [])

	const value: INearContext = {
		isInit,
		accountId,
		commonModal,
		setCommonModal,
	}

	return (
		<NearContext.Provider value={value}>
			<Loader isLoading={!isInit} />
			{props.children}
			<LoginModal show={commonModal === 'login'} onClose={() => setCommonModal(null)} />
		</NearContext.Provider>
	)
}
